# PHY460 — Nonlinear Physics / 非线性物理

13 个独立章节页面，另含课程目录页；中文和英文均可完整学习。直接打开 `index.html`，或从仓库首页进入。学习无需联网、构建、Node、Python 或后台服务。

## 学习方式

- 每章按直观问题、必要概念、公式推导、交互实验、例题、自测与解释的顺序组织。
- 侧栏选择章节，页脚按笔记顺序导航；第一章向前、最后一章向后均返回目录。
- 推导逐步展开；打印时全部展开。每章一个实验区（部分有模型选择和多幅联动图）、一个步骤例题、三道带解释的自测，共 39 题。
- 语言切换保留当前参数、答案、评分、推导展开状态。章节链接携带语言参数；本地存储被禁用也能学习。不承诺刷新或跨章保存实验数值。
- 小屏菜单可展开，Escape 关闭并返回按钮焦点。图表和长公式可横向滚动；控件可用键盘操作。真实浏览器验收限制见下文。

## 资料范围

依据本地 `courseware/PHY460_Detailed_Notes.pdf`（当前文件 103 页、13 章），对应 LaTeX 正文、`phy460_detailed_source_map.md` 和 `phy460_detailed_uncertainties.md`。标题页标注 2026-10-24；本地交付说明记录了 2026-10-25 的插图更新。

网页覆盖当前 PDF 书签中的 68 个章内主题（包括若干重要三级小节），按整理版原顺序组织；保留 141 个原稿来源锚点的页码映射。覆盖并不意味着逐字重刊 103 页或复制全部原图。原图以文字解释和根据方程重新生成的教学图替代；不公开源 PDF、扫描件、源资料备份或打包文件。

这是一份独立教学改编，双语解释、展开推导、数值图、例题与自测不是官方配套答案。来源中裁切、涂改、疑似错误和相互矛盾的公式／图示在相应章节单独披露。已明确更正的 E27 和 action→energy 按已解决项处理。没有虚构当学期教学安排或实验事实。

| 章 | 主题 | 整理版实际 PDF 页 |
|---|---|---|
| 01 | 动力系统、向量场与一维稳定性 | 5–10 |
| 02 | 局部存在唯一性及一维实例 | 11–15 |
| 03 | 一维分岔与物理实例 | 16–23 |
| 04 | 不完美对称性与尖点灾变 | 24–29 |
| 05 | 圆周流、受驱摆与时间尺度 | 30–33 |
| 06 | 二维线性流分类 | 34–45 |
| 07 | 二维非线性系统与稳定性 | 46–50 |
| 08 | 平面向量场指标 | 51–57 |
| 09 | 映射度与指标应用 | 58–64 |
| 10 | 极限环及闭轨排除判据 | 65–74 |
| 11 | 二维及高维分岔 | 75–85 |
| 12 | Hopf 与周期轨道全局变化 | 86–93 |
| 13 | 恒力矩受驱摆与返回映射 | 94–103 |

PDF 页码是从 1 开始的实际文件页序，区别于印刷页码和手写页号。各主题显示整理版起始页，页尾折叠来源表保留原稿文件、实际原稿页、手写页号与整理版对应页。完整小节对应见 [SOURCE-MAP.md](SOURCE-MAP.md)。

## 科学与数值约定

- 各实验使用明确说明的无量纲状态和时间。第五章的时间单位为 A=b/(mgℓ)；不能把不同模型中的参数或时间直接比较。
- 一维稳定性用 f′，二维双曲固定点用 Jacobian 特征值实部。零特征值或纯虚特征值的非线性结论需更高阶信息；线性中心与极限环不同。
- 梯度流采用 ẋ=−V′，统一从方程求势能符号。次临界叉形实验包含 −x⁵ 饱和项；次临界 Hopf 实验是未加 −r⁵ 的局部模型，逃逸不代表一个大稳定环。
- 指标使用逆时针围道和向量方向；结点／中心／螺旋 +1，鞍点 −1。围道经过已知零点、场幅太小或采样角增量过大时，不输出指标。
- Hopf 稳定半径是 √μ；周期采用角速度绝对值。角速度为零的径向平衡圆是固定点族，不是周期轨道。无限周期极坐标模型限制 r>0。
- 第十三章为恒力矩驱动，非周期驱动的混沌摆。返回截面取正向下一整圈；未在时间窗内返回的值留空。相图在圆柱切缝处分段，不能跨缝连出假轨迹。
- 数值轨迹采用 RK4，步长和观察窗在实验上说明。积分有步数、非有限值和域边界保护，截断会显示提示。方向箭头归一化只表达方向，不表达速度大小。
- RK4 并非自适应误差控制算法。收敛测试覆盖代表性解析／非线性模型与返回事件；极近分岔点、极长暂态和全局同宿临界曲线未获严格数值认证。

## 文件与离线资源

- `chapter-01.html` 至 `chapter-13.html`：独立章节入口。
- `content/01-04.js`、`05-09.js`、`10-13.js`：双语教学正文、推导、例题与题目。
- `content/sources.js`：当前 PDF 的章节／小节页码及原稿来源映射，不含原稿图片或 PDF 内容。
- `assets/course.js`、`course.css`：独立界面逻辑；沿用 PHY489 的已确认设计，不改变其他课程。
- `assets/models.js`：无 DOM 的数值函数；`experiments.js`：控件定义和实验数据。
- 公式复用 `../phy489/assets/katex/` 的 KaTeX 0.16.22、离线字体与 MIT License。因此应保留仓库目录结构，不能只移动 `phy460/` 而丢掉该依赖。
- 无运行时 fetch、ES 模块加载或外部 CDN。页面 CSP 禁止网络连接。通过 file 协议显示本地原稿链接；HTTP/HTTPS 下只显示来源文字，不提供资料下载。
- `courseware/` 整目录受 Git 忽略及 Pages 打包排除规则保护。

## 维护检查

```sh
node phy460/checks.cjs
node phy460/checks-dom.cjs /absolute/path/to/jsdom
```

第一项无需外部测试依赖；第二项需要维护者提供 jsdom，但不会启动浏览器或服务器。内容数据与模型变更后应运行两者。来源页码变更时，需要重新核对 PDF 书签、来源映射和 `SOURCE-MAP.md`，不能仅按 TeX 行号更新。

本次真实浏览器检查受工具安全策略阻挡，桌面／手机截图、实际字体、溢出及原生键盘行为尚未验收。详见 [verification.md](verification.md)。静态检查、DOM 模拟和数学验证不能冒充浏览器或物理实验验证。

## English quick start

Open `index.html` directly and choose **English**. Keep the repository structure, including the shared offline KaTeX resources in `phy489/assets/katex/`. No server, network connection or installation is required to study. Each of the 13 chapters includes six learning stages, a live model, a worked example and three explained questions. Language switching preserves the current page’s state.

The supplied 103-page notes define the coverage. All explanatory text, expanded derivations, examples and experiments are teaching adaptations, not official answers or measured data. Sources and unresolved inconsistencies are identified on each chapter. Original PDFs and related private materials remain local and are excluded from Git and Pages packaging. Automated DOM and numerical checks have been run; real-browser desktop/mobile visual verification is still pending due to the browser tool’s file-URL restriction.
