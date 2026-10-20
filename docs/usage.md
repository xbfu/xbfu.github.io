# 项目介绍与使用说明

Xingbo Fu 的个人主页，基于 Next.js、TypeScript 和 Tailwind CSS，内容保存在本地，构建后输出静态网站。

以下文件路径均相对于仓库根目录。

## 本地运行

需要 Node.js 22 或以上版本。

```bash
npm install
npm run dev
```

打开 http://localhost:3000。

## 修改内容

| 内容 | 文件 |
| --- | --- |
| 站点信息、社交链接、导航和图标路径 | `content/config.toml` |
| 首页板块配置与个人介绍 | `content/about.toml`、`content/bio.md` |
| 最新动态 | `content/news.toml` |
| 论文列表 | `content/publications.bib` |
| 教程列表与详情 | `content/tutorials.toml`、`content/tutorials/` |
| 教学与学术服务 | `content/teaching.toml`、`content/services.toml` |
| 网站图标与头像 | `public/icon.png`、`public/xingbo-fu.jpg` |
| 教程 PDF、照片、Logo 与字体 | `public/tutorials/`、`public/fonts/` |

样式位于 `src/app/globals.css`，页面与组件位于 `src/app/` 和 `src/components/`。

## 构建与部署

```bash
npm run build
```

运行 `npm start` 可在 http://localhost:3000 预览构建后的静态网站；运行 `npm run lint` 检查代码。

将生成的 `out/` 目录部署到静态网站托管服务的站点根目录。页面、图片、字体和教程 PDF 均随构建输出，站内链接使用根路径。

`.github/workflows/deploy.yml` 会在推送到 `main` 后自动构建并部署到 GitHub Pages，也支持在 Actions 页面手动运行。

目标仓库为 `xbfu/xbfu.github.io`。首次部署前，在仓库的 `Settings → Pages → Build and deployment → Source` 中选择 `GitHub Actions`。继续使用自定义域名时，确认 `Custom domain` 为 `www.xingbofu.com`，并启用 HTTPS。
