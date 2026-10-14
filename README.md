# MysGln's Wiki

独立个人 Wiki，记录日常学习、阅读理解和实践经验。使用 VitePress 1.6.4，和硬壳教学 Wiki 分开维护。

- 网站：https://mysgln.github.io/personal-wiki/
- 仓库：https://github.com/MysGln/personal-wiki

## 启动与停止

```sh
cd ~/Projects/personal-wiki
npm ci       # 首次安装或依赖变更时运行
npm run dev
```

浏览器访问 http://127.0.0.1:4176/ 。停止时在这个终端按 `Ctrl+C`。修改 Markdown 会自动更新页面。

```sh
npm run build
npm run preview
```

构建结果在 `.vitepress/dist/`。

## 写一篇记录

在项目根目录，把模板复制到对应分类：

```sh
cp templates/note.md notes/my-first-note.md
# 或放到 experience/ 目录
```

编辑文件顶部的信息，并填写正文：

```yaml
---
title: 文章标题
date: '2026-10-15'
description: 简短摘要
record: true
---
```

日期使用带引号的 `YYYY-MM-DD`。正文第一个 `#` 标题与 `title` 保持一致。

- `notes/`：学习笔记。
- `experience/`：实践经验。
- 首页自动显示最近六篇，可按分类筛选；归档自动按年份排列。
- `drafts/`：本地草稿，不进入构建与 Git；完成后移到正式目录。
- `templates/`：写作模板，不作为网页发布。

站点全文搜索使用浏览器端本地索引，不需要额外搜索服务。

开发预览中新建文章后，如果搜索未更新，重启 `npm run dev` 即可；每次正式构建都会重新生成完整索引。

## 修改样式

- `.vitepress/config.mts`：站点标题、导航、搜索。
- `.vitepress/theme/typography.css`：正文 Kalam、标题 Merienda One、代码 Fira Mono，以及字号和行距。
- `.vitepress/theme/style.css`：个人 Wiki 的蓝灰配色、阅读面板与记录列表。
- `public/fonts/`：本地字体及开放许可证。中文使用系统回退字体。

只借鉴 JYY Wiki 的字体搭配与阅读感，首页采用自己的分类入口、记录筛选和时间归档。

## Git 维护

```sh
git status
git add notes/my-first-note.md
git commit -m "添加学习笔记"
```

运行 `git push` 上传更新，GitHub Actions 会自动构建并发布网站。

## 部署配置

已准备 GitHub Pages 工作流 `.github/workflows/deploy-pages.yml`，每次推送 `main` 都自动构建发布。Pages 需要在仓库设置中启用 GitHub Actions；基础路径从平台自动读取。

同时保留 `vercel.json`，以后可以直接把同一个仓库导入 Vercel，输出目录是 `.vitepress/dist`。Vercel 部署时不设置 `VITEPRESS_BASE`。

初始版本只包含首页、分类、归档与关于页，尚未添加个人文章。

## 初始验收

已用临时文章验证分类筛选、中文全文搜索、跨年归档、长标题和代码块；已检查 390、768、1440px 布局及深色模式。临时文章已删除，正式站点没有虚构记录。

依赖审计目前报告 Vite/esbuild 开发工具链的 3 项告警（2 moderate、1 high），VitePress 1.6.4 尚无自动修复版本。Pages 发布的是静态文件，本地预览只监听 127.0.0.1；后续升级 VitePress 时复核。
