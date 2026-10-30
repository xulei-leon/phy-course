# APM346 verification / 核验记录

Date / 日期：2026-10-30（Asia/Shanghai）

完成范围为已提供 10 份讲义与整理笔记的 8 个主章，非完整学期大纲验收。以下软件检查、数学验证、源资料核对与物理实验相互区分。

## 内容与数值检查

运行 `node amp346/checks.cjs`，通过：

- 8 章、47 个有出处的双语概念主题、24 道双语解释题、85 条可由本地 KaTeX 解析的展示公式。
- 11 个实验的 345 组默认、单变量边界、选项与组合角点状态，读数及图表坐标均有效。有理奇点以断点表达，负 C 圆明示不存在。
- 独立差分核对积分因子 ODE、带零阶项 PDE、波动 PDE 及其初始位移／速度、热核 PDE；核对波动紧支集外严格为零。
- 解析四边通量与面积积分、特征线不变量、正负热模态的极值界、热核质量与方差、阶跃跳点值、erf 已知参考值、驻波直接空间能量积分。
- 各章双语字段、来源文件、相对资源、字体、CSP、首页入口及资料排除规则。

共享入口回归：`node phy407/checks.cjs` 和 `node phy456/checks.cjs` 均通过。仓库首页 6 张课程卡片链接逐一检查通过，`git diff --check` 通过。未把这些局部回归说成全仓库所有浏览器与课程重验。

## 实际浏览器检查

环境：已有 Playwright + Chromium headless shell 1248，1440×1000、390×844、320×740。当前会话未提供 Browser 插件/对应 skill，因此使用现有 Playwright；未安装依赖、未启动开发服务器。网页直接通过 `file:///…/amp346/index.html` 及独立章节入口加载，浏览器上下文断网；截图阶段启用 reduced-motion，避免在平滑滚动的中间帧取证。

运行：

```sh
node amp346/checks-browser.cjs \
  /Users/xulei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
  /Users/xulei/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-x64/chrome-headless-shell
```

| Check / 检查 | Result / 结果与证据 |
|---|---|
| 页面身份与正文 | 全部 9 页标题包含 APM346；中英文文档语言正确；8 个侧栏章入口，每章 6 个学习段 |
| 空白页／错误覆盖层 | 页面有主标题、正文、题目和真实控件；无加载错误或框架错误覆盖层 |
| 控制台与资源 | 无页面脚本错误、控制台错误或失败资源；离线检查未发起 HTTP/HTTPS 请求 |
| 公式与 DOM | 无 KaTeX 错误；展开全部推导后仍正常；无重复元素 ID、无断裂本页锚点 |
| 自测 | 各章分别检查未答、全对、部分答错，得到相应解释和 3/3、2/3 分数 |
| 语言与状态 | 切换语言保留同页所有实验数值、曲线路径、已选答案、评分、已展开步骤；多实验章分别检查 |
| 控件与边界 | 172 次边界或选项变更；空值、超界、不合步长输入不进入计算，有双语可见错误提示；重置有效 |
| 键盘与导航 | 原生范围键更新配对数值；菜单 Escape 关闭并恢复焦点；下一章和末页返回目录传递语言 |
| 响应式 | 双语桌面／手机共 36 次页面加载，另 9 页全覆盖 320px 英文窄屏；无整页横向溢出，图表局部横向滚动 |
| 特征线异常状态 | C=−1 有理 SVG 路径至少分为 3 段；切换圆且 C<0 显示无实圆 |
| 无存储状态 | 禁用 localStorage 后仍可加载并切换语言 |
| 本地出处 | 所有原稿链接目标存在，页码按物理 PDF 页序 |
| 托管子路径 | 请求拦截模拟 HTTPS `/phy-course/amp346/`，从根卡片进入且所有课程链接保留子路径；所有页面抑制私有资料链接 |

另用实际浏览器定点验证了：非法输入保持上次有效结果，切换语言后错误说明同步；手机图表获得焦点后通过原生 ArrowRight 实际横向滚动。

## 视觉复核

沿用现有 PHY407/PHY489 的浅色学术讲义设计：白色正文、浅灰侧栏、深蓝文字、青色强调、固定顶栏和底部导航。没有改变已确认视觉方向，未新建 Image Gen 概念稿。检查参考是仓库已有设计系统和本次实际渲染。

已通过 `view_image` 目视检查桌面课程目录、英文特征线／热核实验，以及手机波动实验。检查了五类要素：标题与中英文字体层级；侧栏和顶／底栏空间；控件及可见焦点；图轴／图例／奇点分支；小屏折行与局部滚动。未观察到文字遮挡、整页溢出、公式损坏或明显布局缺陷。首页标题和卡片用语与内容数据一致；没有新增产品指标、无关模块或营销内容。

自动截图保存在操作系统临时目录（`amp346-browser-*`）；不把截图和临时测试脚本加入网站。维护脚本可重新生成截图。图表较宽时在手机上局部横向滑动是明确的设计取舍。

## 原始资料保护

`git check-ignore amp346/courseware/Notes/apm346_Detailed_Notes.pdf` 命中忽略规则；`git ls-files amp346/courseware` 无输出。实际从 Pages 工作流提取 rsync 参数并打包到临时目录，确认包内不存在 `amp346/courseware/` 或 APM346 PDF，课程入口和共享 KaTeX 存在。整个源目录（包括 TeX、原图、私有来源表）均未进入打包结果。

## 范围和限制

- 仅完成本地开发与检查；未 Git 提交、推送或部署到真实 GitHub Pages。请求拦截测试不是生产部署验收。
- 未验证 Safari、Firefox、真实手机、屏幕阅读器或完整辅助技术体验。
- 本次读取整理笔记正文及既有来源映射并查看重点渲染页，未声称逐页重新目读全部 85 页手写原稿。
- 数学模型及误差检查均是教学软件验证，没有进行真实弦、热、流体或硬件实验。
- 热核／驻波等解析例子不等于一般 PDE 数值求解器；erf 为明确有限精度的 Simpson 实现。唯一性与极值原理按课件所列解类和假设理解。

English: all eight supplied chapters are complete as local bilingual courseware. Mathematical/content checks and actual offline Chromium checks passed. Hosted repository paths were simulated without a server. Safari, Firefox, assistive technologies, real-device/physical experiments and production deployment remain outside this verification.
