# PHY407 — Computational Physics / 计算物理

17 个独立章节、17 个交互实验、51 道带答案解释的自测，以及课程目录页。依据当前提供的第 1–6 讲材料制作，**完成范围是这些材料，不代表完整学期课程**。直接打开 [index.html](index.html)，无需构建、联网、安装 Python 或后台服务。

## 学习方式

每章按「直观问题 → 必要概念 → 公式推导 → 交互实验 → 例题 → 自测与解释」组织。Git 和 Python 生态章节用逻辑或状态推演说明方法，不编造物理推导。通过侧栏和底部上一章／下一章导航；首尾均可返回目录。

中文和英文均提供完整正文、控件、答案与解释。切换语言保留本页实验参数、已选答案、评分与推导展开状态；章节链接携带语言，不承诺刷新或跨章保存实验数值。实验有重置按钮；非法或空白数值不进入计算，并标记 `aria-invalid`。小屏图表和表格可横向滚动，菜单可用 Escape 关闭，控件支持键盘。

## 资料与覆盖

本地 `courseware/lec01` 至 `lec06` 含 12 份 PDF，合计 113 页，以及 `FFT-WorkedExample.html`。Python 生态 PDF 无可提取正文，制作时实际渲染检查了全部 6 页。其余材料核对了文本、公式及重点页面。按讲次顺序编排；同讲内的章节拆分属于教学组织，不是官方章节编号。

| 章 | 主题 | 讲次 |
|---|---|---|
| 01 | Python 生态、接口、模块与命名空间 | 1 |
| 02 | HPC、架构、扩展性、局部性、调度 | 1 |
| 03 | Git、暂存、提交、分支与复现 | 1 |
| 04 | 整数、浮点、相消、容差 | 1 |
| 05 | 数值误差与 Euler 旋转稳定性 | 2 |
| 06 | 向量化、公平计时、墙钟与 CPU 时间 | 2 |
| 07 | 梯形、Simpson、误差倍增估计 | 2 |
| 08 | 前后向与中心差分、舍入平衡 | 2 |
| 09 | Newton–Cotes、Romberg、Gauss–Legendre | 3 |
| 10 | 线性与多项式插值、样条、外推、多维工具 | 3 |
| 11 | 拟合、最小二乘、设计矩阵与残差 | 4 |
| 12 | 消元、主元、LU、病态与残差 | 4 |
| 13 | 特征值、QR 相似迭代、eig/eigh | 4 |
| 14 | 固定点、Newton、割线、二分与混合方法 | 5 |
| 15 | 驻点、黄金分割、全局与多维优化边界 | 5 |
| 16 | Fourier 系列、DFT/iDFT、采样、混叠与泄漏 | 6 |
| 17 | radix-2 FFT、八点蝶形、复用与二维变换 | 6 |

完整逐主题页码见 [SOURCE-MAP.md](SOURCE-MAP.md)。每章显示实际 PDF 页序（从 1 开始），不是原始幻灯片编号。原始 HTML 用小节标题定位，没有虚构 PDF 页码。来源引用不代表逐字翻译或重刊原图；讲解、推导扩展、代码参考、例题、自测和可视化均为独立教学改编。

## 科学与数值约定

- IEEE binary32 有 24 位有效精度、epsilon=2^-23、u=2^-24；binary64 对应 53、2^-52、2^-53。区分最小正规值和次正规值、Python 任意精度整数与 NumPy 定宽整数。binary32 实验通过 `Math.fround` 对输入与结果舍入。
- Euler 旋转的增幅来自离散放大因子，即使精确算术也存在；不是把明显增长归因于机器舍入。误差传播不自动假设独立随机。
- 梯形与 Simpson 的全局误差阶分别为 2、4，区别于多项式精确次数 1、3。Simpson 只接受偶数个小区间。Richardson 与 Romberg 需要光滑性和渐近误差展开。
- 中心差分修正为 −h²f‴/6；源文 PDF 5 的 −h²f‴/3 已更正。极小步长可因 x+h=x 而失败。
- Gauss 实验是固定两点求积；Romberg 为有限层教学实现。展示最后梯形的调用数和实际实现总调用数，说明嵌套节点复用可节省调用。未实现完整 QUADPACK 自适应积分。
- 插值余项含 f″(ξ)/2；标准三次样条 C² 连续。实验比较重心多项式和分段线性，不冒称实现三次样条。采样最大误差不等于严格全区间上界。
- 拟合使用确定性合成扰动，扰动幅度不是标准差，不提供统计置信区间。线性拟合对自变量误差可忽略、等权等条件作了说明。
- PA=LU 明确置换；主元不能消除病态性。数值解与存储矩阵残差分开；实验限制 ε≥10^-12，不把更小 ε 舍入成奇异的情形隐藏成成功。
- 特征值实验使用明确 2×2 解析矩阵族和直接残差，不声称运行 NumPy 或完整 QR。eigh 仅适用于 Hermitian/实对称输入；不能假设特定库驱动总使用 QR。
- 求根实验最多 30 步，明确区分残差达标、预算耗尽、过小导数和域外停止。预算耗尽不是收敛。二分只要求连续变号，不要求区间内恰有一个根。
- 黄金分割实验使用严格单谷二次函数，误差保障依赖单谷假设；不把局部优化说成全局保证。
- DFT 正向负指数、逆向正指数并除 N；频率为 k/(NΔt)，观察窗不重复终点。单边幅值对 DC/Nyquist 不翻倍。逆变换恢复样本不等于排除混叠或恢复连续细节。
- radix-2 FFT 用位反序及蝶形复用，N=8 分三层、每层四个蝶形。中间层不是最终频谱。二维矩形 M×N 的逆式使用 km/M+ℓn/N，归一化 1/(MN)。
- Python/Git 代码是阅读参考，不在网页执行。HPC 与向量化计时图是明确假设的成本模型，不是本机、集群或 NumPy 性能实测。历史排名、硬件配置和包数量不作为当前事实。

各章页末保留来源疑点与处理依据。更正依据是本章展示的代数推导、类型定义或输入契约；没有据不确定的原稿推测课程官方答案。

## 文件与发布

- `chapter-01.html` 至 `chapter-17.html`：独立入口；`content/*.js`：双语正文及来源。
- `assets/models.js`：纯数值算法；`experiments.js`：控件和可视化数据；`course.js`、`course.css`：界面。
- 沿用已确认的浅色学术讲义布局；本地 KaTeX 及字体复用 `../phy489/assets/katex/`（KaTeX 0.16.22，MIT）。需保留整个仓库的相对目录结构，不能单独移动 `phy407/` 后丢掉公式资源。
- 无 fetch、ES module、CDN 或运行时网络请求。CSP 禁止网络连接。仅在 `file://` 下提供本地来源链接；HTTP/HTTPS 下只显示出处与页码。
- `phy407/courseware/` 整目录受 `.gitignore` 与 Pages 的 rsync 排除规则保护，不提交、不打包发布源 PDF 或源 HTML。仓库首页已加入课程卡片，链接适用 Pages 仓库子路径。

## 维护验证

```sh
node phy407/checks.cjs
node phy407/checks-browser.cjs /absolute/path/to/playwright /absolute/path/to/chromium
```

第一项不需要额外测试包，检查内容、公式、数值算法、边界和离线资源。第二项需要维护者现有 Playwright 和 Chromium，直接打开 file URL，断网执行桌面／手机检查，并通过请求拦截模拟 HTTPS 仓库子路径；不启动服务器。截图写入系统临时目录。它们是软件和数值验证，不是真实硬件或物理实验验收。

## 本次核验（2026-10-30）

- `node phy407/checks.cjs` 通过：17 章、69 个双语主题、51 题、88 条 KaTeX 公式、157 组模型状态；解析不变量、误差收敛、主元、FFT/DFT 与 3×4 二维变换核对通过。
- 实际 Chromium 通过 `file://` 完成 72 次页面加载（18 页 × 双语 × 桌面／手机）、132 次控件变更；未答／答错／答对、语言保留状态、推导展开、重置、非法与空输入、原生范围键、导航、菜单 Escape 和禁用存储均通过。
- 1440×1000 与 390×844 下所有页面双语检查无整页横向溢出；另检查 320px 英文 FFT 页。离线浏览未发起 HTTP 请求，未出现页面脚本或控制台错误；本地公式和字体正常加载。
- 通过浏览器请求拦截模拟 `/phy-course/phy407/` 的 HTTPS 路径，核对仓库子路径链接与私有资料链接抑制；这不是部署到真实 Pages 后的验收。
- 已实际查看桌面目录、英文差分实验、FFT 实验与中文手机采样实验截图，检查布局、字体、图轴、控件和导航。沿用既有讲义设计；没有新增图片概念稿。
- Browser 插件／对应 skill 未提供，因此使用现有 Playwright 与已安装 Chromium；默认匹配的 Chromium 版本缺失，显式选择现有 headless Chromium。没有安装前端依赖或启动服务器。
- 未验证 Safari、Firefox、屏幕阅读器和真实移动设备；没有执行 Python、Git 教学命令、HPC 测速或真实物理实验。未提交、推送或部署。

## English quick start

Open `index.html` and choose **English**. The 17 chapters cover the supplied lecture 1–6 materials, not an entire unprovided semester. Each has six learning stages, an interactive teaching model, a worked example, three explained questions and source notes. Language switching preserves current-page state. Python/Git snippets are for reading; the browser executes JavaScript only.

Keep the repository structure and shared offline KaTeX assets. No server or network is needed. Source PDFs and the original FFT notebook export remain local and are excluded from Git and Pages packaging. Synthetic data, performance assumptions and mathematical demonstrations are explicitly distinguished from measurements. The maintenance checks separately exercise numerical invariants and actual browser behavior.
