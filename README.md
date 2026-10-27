# Physics Courses

静态物理课程网站。首页以卡片列出课程，目前提供 [PHY489 / 1489 粒子物理](phy489/)。课件可在浏览器直接打开，无需构建或后台服务。

## 本地浏览

打开仓库根目录的 `index.html`，从课程卡片进入课件；也可直接打开 `phy489/index.html`。请保留课程目录内的文件及相对路径。

## GitHub Pages 发布

将网站文件提交并推送到 `main`，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。工作流会在每次推送到 `main` 时发布，也可以在 Actions 页面手动运行。发布成功后，地址可从工作流的部署结果或 Pages 设置页面查看。

PHY489 原始 PDF 仅保留在本地：`phy489/courseware/` 已加入 Git 忽略规则，发布工作流也会排除该目录。线上课件保留出处和页码，但不提供 PDF 下载。

## 添加课程

在仓库根目录添加课程目录及其 `index.html`，然后在根目录的 `index.html` 中复制并修改一个课程卡片，链接使用相对路径。提交后，工作流会一起发布新课程。
