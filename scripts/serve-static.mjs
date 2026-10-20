import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

const root = resolve('out');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json',
};

if (!existsSync(join(root, 'index.html'))) {
  console.error('Missing out/index.html. Run npm run build before npm start.');
  process.exit(1);
}
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error('PORT must be an integer between 0 and 65535.');
  process.exit(1);
}

function insideRoot(file) {
  const path = relative(root, file);
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

function sendStatus(response, status, message, headers = {}, head = false) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  response.end(head ? undefined : message);
}

async function sendFile(file, status, request, response) {
  const resolved = await realpath(file);
  if (!insideRoot(resolved)) throw new Error('Path outside static output');
  const info = await stat(resolved);
  if (!info.isFile()) throw new Error('Not a file');

  let start = 0;
  let end = info.size - 1;
  if (status === 200 && request.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (!match || (!match[1] && !match[2])) {
      sendStatus(response, 416, 'Invalid byte range', { 'Content-Range': `bytes */${info.size}` }, request.method === 'HEAD');
      return;
    }
    start = match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]));
    end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= info.size) {
      sendStatus(response, 416, 'Invalid byte range', { 'Content-Range': `bytes */${info.size}` }, request.method === 'HEAD');
      return;
    }
    status = 206;
    response.setHeader('Content-Range', `bytes ${start}-${end}/${info.size}`);
  }

  response.writeHead(status, {
    'Content-Type': mimeTypes[extname(resolved).toLowerCase()] || 'application/octet-stream',
    'Content-Length': Math.max(0, end - start + 1),
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD' || info.size === 0) {
    response.end();
    return;
  }
  const stream = createReadStream(resolved, { start, end });
  stream.on('error', () => response.destroy());
  response.on('close', () => stream.destroy());
  stream.pipe(response);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendStatus(response, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
    return;
  }
  let url;
  let pathname;
  try {
    url = new URL(request.url || '/', 'http://localhost');
    pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('\0')) throw new Error('Invalid path');
  } catch {
    sendStatus(response, 400, 'Invalid URL', {}, request.method === 'HEAD');
    return;
  }
  try {
    let file = resolve(root, `.${pathname}`);
    if (!insideRoot(file)) throw new Error('Path outside static output');
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
        response.end();
        return;
      }
      file = join(file, 'index.html');
    }
    await sendFile(file, 200, request, response);
  } catch {
    try {
      await sendFile(join(root, '404.html'), 404, request, response);
    } catch {
      sendStatus(response, 404, 'Not found', {}, request.method === 'HEAD');
    }
  }
});

server.on('error', (error) => {
  console.error(`Static preview failed: ${error.message}`);
  process.exit(1);
});
server.listen(port, host, () => {
  console.log(`Static preview: http://${host}:${server.address().port}`);
});
