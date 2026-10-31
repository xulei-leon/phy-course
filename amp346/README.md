# APM346 — 偏微分方程 / Partial Differential Equations

8 个独立章节、12 个交互实验、25 道完整例题、64 道章内练习及 4 道跨章综合题。直接打开 [index.html](index.html)，无需构建、联网或后台服务。

目录 `amp346/` 保留已有命名；课程编号按全部本地资料采用 **APM346**。内容依据 36 页整理笔记中的 8 个主章，覆盖现有 10 份讲义（85 页，2026-09-14 至 2026-10-19）。这是已提供资料的课件，不能代表完整学期或未提供大纲。

## 学习与交互

面向学过微积分的 PDE 初学者。每章提供 3 项学习目标、按需前置复习、教学补充讲解、至少 3 道完整例题（第三章 4 道），以及 3 道概念、3 道数值计算、1 道论证和 1 道迁移题。第 3、4、6、8 章另有阶段综合题。例题给出选法理由与验证；全部练习提供两级提示、解答和常见错误说明。首页列出学习依赖与复习入口。

选择题和数值题自动评分（数值绝对误差 ≤0.00001，直接输入数值，不解析公式）；论证、迁移和综合题先输入思路，才能查看解答并自评。自动评分只统计每章 6 道客观题，不把文字自评计入自动分数。答错客观题进入复习列表，答对不会自动移除已有复习标记；可取消勾选。文字题依据自评或手动勾选记录。

章完成标记由用户手动设置。带版本号的 `apm346-study-v1` 本地记录仅保存完成标记和待复习题目 ID，不保存输入草稿、实验参数或已展开解答。不承诺 file:// 在不同浏览器、路径、设备间共享；存储禁用或写入失败会显示未保存提示，当前页仍可使用。清除入口重置全部学习记录，不清空本页作答与实验。

每章按「直观问题 → 必要概念 → 公式推导 → 交互实验 → 例题 → 自测与解释」排列。侧栏选择章节，底部上一章／下一章衔接，首尾返回目录。语言切换保留本页全部实验参数、已选答案、评分和已展开推导；跨章或刷新后实验重置。语言通过链接传递，存储被禁用时仍可使用。

中文与英文均有完整讲解、控件、结果说明、题目、答案和解释。数字输入与范围滑块同步；空值、超界值及不符合步长的数值标为 `aria-invalid`，保留上次有效计算。实验支持重置与原生键盘操作，小屏图表可横向滚动，菜单可用 Escape 关闭，焦点可见。

| 章 | 内容 | 实验 |
|---|---|---|
| 01 | PDE 分类、通解、初边值 | 线性与非线性可加性／数乘性缺陷 |
| 02 | 线性 ODE、分部积分、散度定理 | 积分因子精确解；矩形四边通量 |
| 03 | 常系数、指数、有理、圆特征线、零阶项 | 四族特征线；沿特征线衰减；数据曲线横截与相容性 |
| 04 | 输运与初始线回溯 | 轮廓平移及 x–t 回溯 |
| 05 | 波动、d’Alembert、依赖域与支集 | 位移与速度项、有限传播锥 |
| 06 | 两种能量证明、额外储能 | 固定端驻波三项能量 |
| 07 | 弱最大／最小值原理与扰动证明 | 有正负温差的解析热模态 |
| 08 | 五性质、阶跃、热核、卷积、初值极限 | 热核与阶跃；高斯初值卷积 |

详细来源与原文疑点见 [SOURCE-MAP.md](SOURCE-MAP.md)。每个概念显示整理 PDF 的实际页序，章节页末列原稿文件和页码。原稿文件名 Oct 2 的内部手写日期为 Oct 1，未改名。制作时读取整理 TeX/PDF 文本及原有逐页来源表，并渲染查看重点公式页；没有声称本次逐页重新目读全部 85 页原始扫描。

## 数学约定与边界

- 右端为零不等于线性；uₜ+uuₓ=0 不满足线性叠加。试探函数实验检查算子恒等式，不把试探函数冒称为齐次解。
- 矩形外通量顶边为 +F₂、左边为 −F₁；依据 F·n 与散度定理，纠正原文符号冲突。
- 有理特征线用不变量 −1/y−x²，单独补 y=0；奇点断开绘图。圆 x²+y²=C≥0 的半径为 √C，C<0 明示无实圆；不把轴上的方程推成全局独立性。
- 零阶项存在时 u 沿特征线演化，不能一律称常值。3、2 系数保留，强迫项未解原题的补充积分明确标为教学改编。
- 波动采用全直线、常数 c>0。φ′ 项在完整初速度检查中相消；依赖区间端点一致为 x₀±ct₀。紧支集只保证传播锥外为零，不保证锥内处处非零。
- 紧支集 b=(1−(x/R)²)³ 在支集端点为 C²；波动速度积分用多项式原函数。模型没有反射边界和有限差分时间步进。
- K、P≥0，允许为零。真实弦能量需乘线密度；页面展示归一化能量。实验驻波采用有限区间固定端，明确区别于原文全直线衰减假设。
- 最大／最小值原理只证明弱界，包含顶边单侧导数和 ε→0 步骤；不照搬缺少条件的强原理措辞。热模态仅作实例演示。
- 热核仅在 k,t>0 计算，t=0 为分布极限。阶跃 Q(0,t)=1/2，初始跳点指定值不改变卷积。erf 用 320 小区间 Simpson 积分，截断 |z|≤8；它是有限精度教学实现。
- 热核图轴随 σ=√(2kt) 缩放，±5σ 图窗不包含严格全部质量；单位质量为解析结论。高斯卷积实验用闭式解，允许光滑初值 t=0。
- 卷积和求导需收敛及交换操作条件；补充有界连续初值的支配收敛证明。全直线唯一性限定在每个有限时间条带上有界的经典解类，不声称无增长限制唯一性。
- 所有轮廓、参数与实验均为教学模型，无真实温度、弦振动、污染物或硬件测量；新增讲解、例题、自测与证明扩展并非官方答案。

## 文件、离线与资料保护

- `chapter-01.html` 至 `chapter-08.html` 是独立入口，`content/*.js` 存双语正文。
- `assets/models.js` 存纯数学模型；`experiments.js` 存实验配置与图表数据；`course.js`、`course.css` 沿用现有浅色学术讲义设计。
- 复用 `../phy489/assets/katex/` 的 KaTeX 0.16.22（MIT，许可证保留）。必须保留仓库相对目录，不能单独复制课程后丢弃共享公式和字体。
- `content/study.js` 是教学补充数据；`assets/study-ui.js` 处理多题型、提示、自评和本地记录；`assets/study.css` 扩展现有讲义样式。
- 无 CDN、fetch、ES module、运行时网络请求；CSP 禁止网络连接。网页不运行 Python/Node 服务。
- 原始资料全部留在 `courseware/`，包含 PDF、TeX、私有来源表和原图。`.gitignore` 与 Pages 打包均排除整目录。默认只显示出处及页码，避免当前缺少原稿时产生失效链接。维护者恢复完整私有资料并核验路径后，可在本地脚本中设置 `window.APM_LOCAL_SOURCES=true` 恢复 file:// 原文链接；HTTP/HTTPS 始终只显示出处。
- 仓库首页新增课程卡片；所有课程和资源链接兼容 GitHub Pages 的仓库子路径。当前任务仅完成本地开发，不自动推送或发布。

## 维护验证

```sh
node amp346/checks.cjs
node amp346/checks-browser.cjs /absolute/path/to/playwright /absolute/path/to/chromium
```

第一项无需额外测试包，检查双语结构、来源、公式、离线资源、数值边界与独立数学不变量。第二项使用维护者已有的 Playwright/Chromium，直接打开 `file://`，断网检查桌面／手机、交互及语言状态，并以请求拦截模拟 HTTPS 仓库子路径；不启动服务器。截图输出到系统临时目录。实际核验结果见 [verification.md](verification.md)。

## English quick start

Open `index.html` directly and select **English**. The eight chapters follow the supplied notes, with six learning stages per page, twelve analytic experiments, 25 worked examples, 64 chapter exercises and four integrated problems. Language switching preserves current-page controls, answers, scores and revealed derivations; reloads and chapter changes reset experiment state.

Keep the repository structure and shared offline KaTeX assets. No server, installation or network is needed to study. Sources remain local and excluded from Git/Pages. The web materials are teaching adaptations; exact examples, quadrature checks and browser tests are distinct from physical measurements and from a full-semester curriculum claim.

## 2026-10-31 教学扩展的来源与边界

当前工作区没有 `courseware/`。本轮保留原网页 47 个主题的既有页码映射，未重新核对 10 份原稿和整理笔记。补充内容没有附加原讲义页码，也不作为官方答案；公开参考仅为可选阅读链接，不是运行依赖：

- [Stanford Math 220A, First-order equations](https://web.stanford.edu/class/math220a/handouts/firstorder.pdf)，§2.1–2.2：非特征数据与局部坐标反解的条件。
- [Stanford Math 220B, Heat equation](https://web.stanford.edu/class/math220b/handouts/HEATEQN.pdf)，§2.8：有限域弱最大值原理与唯一性、全空间增长条件。

带源项的新增题由显示的链式法则和积分因子直接推导，并以独立差分回代核对。波动能量唯一性限定足够光滑解、给定初值及消去端点通量的条件。有限域比较原理不直接推广到全直线。阶跃、示性函数题区分积分公式与经典解正则性。新横截实验仅模拟 uₓ+uᵧ=0、直线 γ(r)=(r,mr)、g=r 或 0 的无量纲常系数模型；近相切敏感性不是任意 PDE 的全局结论。卷积权重图三条曲线量纲不同，图窗有限，解值使用高斯闭式公式。

源文件存在性检查在资料缺失时明确输出 `NOT VERIFIED`；这不等于已完成原稿复核。恢复 `courseware/` 后同一命令会检查来源文件存在性，但逐页内容核对仍需单独完成。
