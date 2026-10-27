# PHY489/1489 双语交互课件

双击 `index.html`，使用当前版本 Chrome、Edge 或 Firefox 打开。无需联网、安装依赖或启动服务。公式字体使用相对路径；原笔记 PDF 只保存在本地，不随 Git 或网站发布。

## 学习方法

- 首页与左侧目录可选择全部 20 章；页脚按 PDF 顺序切换章节，最后一章返回目录。
- 每章依次包含直观问题、必要概念、逐步展开推导、交互实验、教学例题、自测与解释。
- 中文／English 切换保留本页实验和答案；章节链接携带语言选择。文件协议的存储权限因浏览器而异，当前会话不依赖存储可用性。
- 本地打开时，若本地提供了原笔记 PDF，可点击页码查看原图、完整表格和相应原文；线上只显示出处和页码。打印会自动展开全部推导。

## 内容与约定

来源：`courseware/PHY489_Detailed_Notes.pdf`，PHY489/1489: Detailed Notes，Fall 2026；Source notes: Prof. Michael Luke, University of Toronto。原始 PDF 保持不变。课程重组、双语讲解、展开的推导、例题、互动实验和自测均为教学改编，并非教师原题答案或官方配套课件。

覆盖边界为所提供的 125 页、20 个主章节，止于 QED 的旋量和双线性规则；导论预告的后续主题未被补造为额外章节。章节中的原文疑点栏记录采用的符号、修正依据与未解决问题。历史数值不被标成当前实验数据。数值模型的假设、单位与限制显示在对应实验上方。

度规使用 (+,−,−,−)。除有明确 c、ℏ 的表达式外，自然单位采用 ℏ=c=1。电磁与强耦合使用有理化约定 α=e²/(4π)、αs=gs²/(4π)，避免与笔记中不同的电荷定义混用。CP 干涉模型明确采用 A=1+r exp[i(δ+φ)] 与 Ā=1+r exp[i(δ−φ)]。

## 文件

- `chapter-01.html` 至 `chapter-20.html`：独立章节入口。
- `content/`：可编辑的双语课程内容与题目。
- `assets/course.js`、`course.css`：共享界面、语言切换、导航、自测和图表。
- `assets/experiments.js`：20 个实验及数值模型；不会发起网络请求。
- `assets/katex/`：KaTeX 0.16.22、离线字体及 MIT 许可证。
- `design/approved-concept.png`：已确认的视觉基础；按用户确认替换示意目录并采用六步顺序。
- `checks.cjs`：内容结构、资源链接、公式与关键物理数值自检（维护时可运行 `node checks.cjs`；学习无需 Node）。
- `design/verification.md`：验证结果及真实浏览器验收受限的具体说明。

## English quick start

Open `index.html` directly in a current Chrome, Edge or Firefox browser. Keep the course files together. No server, network or installation is needed. Select **English** at the top; chapter links preserve the language choice. Each of the 20 chapter files is an independent entry point. Experiments and equations work offline. The source PDF is kept locally and is not published with the website.

This is a teaching adaptation of the supplied notes, not an official course publication. Source discrepancies, historical data, conventions and model limitations are identified on the relevant pages. The source PDF remains unchanged. Local KaTeX is MIT licensed; see `assets/katex/LICENSE`.
