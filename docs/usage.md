# Project Overview and Usage

Xingbo Fu's personal website, built with Next.js, TypeScript, and Tailwind CSS. Content is stored locally, and the build produces a static website.

All file paths below are relative to the repository root.

## Local Development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Updating Content

| Content | Files |
| --- | --- |
| Site information, social links, navigation, and favicon path | `content/config.toml` |
| Homepage sections and biography | `content/about.toml`, `content/bio.md` |
| News | `content/news.toml` |
| Publications | `content/publications.bib` |
| Tutorial listings and details | `content/tutorials.toml`, `content/tutorials/` |
| Teaching and academic service | `content/teaching.toml`, `content/services.toml` |
| Favicon and profile photo | `public/icon.png`, `public/xingbo-fu.jpg` |
| Tutorial PDFs, photos, logos, and fonts | `public/tutorials/`, `public/fonts/` |

Styles are defined in `src/app/globals.css`. Pages and components are located in `src/app/` and `src/components/`.

## Building and Deployment

```bash
npm run build
```

Run `npm start` to preview the built static website at http://localhost:3000. Run `npm run lint` to lint the code.

Deploy the generated `out/` directory to the root of your static hosting site. The build includes pages, images, fonts, and tutorial PDFs. Internal links use paths relative to the site root.

`.github/workflows/deploy.yml` automatically builds and deploys the website to GitHub Pages on pushes to `main`. You can also run the workflow manually from the Actions tab.

The target repository is `xbfu/xbfu.github.io`. Before the first deployment, select `GitHub Actions` under `Settings → Pages → Build and deployment → Source`. To continue using the custom domain, ensure that `Custom domain` is set to `www.xingbofu.com` and enable HTTPS.
