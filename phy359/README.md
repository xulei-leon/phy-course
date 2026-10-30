# PHY359 — 机器学习的物理 / Physics of Machine Learning

依据本地已提供 Part 1、Part 2 讲义制作的 16 章中英文双语交互课件，另含课程目录。打开 `index.html`，或从仓库首页进入。采用静态 HTML/CSS/JavaScript 和本地 KaTeX，无需构建、后台服务或联网。

## 课程范围

- Part 1：5 份 PDF，共 15 页，涵盖神经网络、指标、线性与岭回归、逻辑回归、交叉熵、反向传播、核方法与过参数化。
- Part 2：5 份 PDF，共 16 页，涵盖 GD 稳定性、稳定边缘、SGD、Hamilton 方程与动量、预条件、Muon、AdamW、变质量守恒方法、微正则测度和对称性。
- 依讲义顺序拆为 16 个独立章节。不是按文件机械分成十页，也不照搬其他课程的章节数。讲义只有 Part 1/2；NTK、扩散与 transformer 的后续部分没有完整材料，不声称覆盖。
- 课程中文、英文标题是教学概括，未独立核验目标学期的官方课程全名、完整 syllabus、作业或考核要求。网页不是官方配套答案。
- 讲解、三步展开推导、交互、步骤例题与自测是教学改编。模型不是物理实验或大型神经网络训练结果，不能推断真实性能或当前最先进水平。

完整小节、文件、实际 PDF 页序、印刷页与原稿疑点见 [SOURCE-MAP.md](SOURCE-MAP.md)。便于审阅的双语正文见 [content/lessons.md](content/lessons.md)。

| 章 | 主题 | 来源 |
|---|---|---|
| 01 | 神经网络：函数、层与指标 | Part 1 Lecture 1 |
| 02 | 线性回归与正规方程 | Part 1 Lecture 2 |
| 03 | 秩、岭回归与正则化 | Part 1 Lecture 2 |
| 04 | 逻辑回归、似然与交叉熵 | Part 1 Lecture 3 |
| 05 | 梯度下降与反向传播 | Part 1 Lecture 4 |
| 06 | 核回归、插值与泛化 | Part 1 Lecture 5 |
| 07 | 二次损失与 GD 稳定性 | Part 2 Lecture 1 |
| 08 | 变化的曲率与稳定边缘 | Part 2 Lecture 1 |
| 09 | SGD 与噪声方差 | Part 2 Lecture 2 |
| 10 | Hamilton 方程、阻尼与动量 | Part 2 Lecture 3 |
| 11 | 预条件与参数空间的尺度 | Part 2 Lecture 4 |
| 12 | 极分解与 Muon 更新方向 | Part 2 Lecture 4 |
| 13 | Adam、二阶矩与解耦衰减 | Part 2 Lecture 4 |
| 14 | 变质量与能量守恒轨迹 | Part 2 Lecture 5 |
| 15 | 微正则测度与低损失集中 | Part 2 Lecture 5 |
| 16 | 对称性、守恒量与优化边界 | Part 2 Lecture 5 |

每章沿用：直观问题 → 必要概念 → 公式推导 → 交互实验 → 例题 → 自测与解释。每章保留一个交互实验和两道带解释的选择题；另有可展开的基础补习、完整讲解、两道步骤例题、三个实验任务、三道开放练习与章末复习。

## 自学阅读方式

- 以基本代数和函数知识为起点。矩阵、偏导、概率、Hamilton 方程、SVD 与 delta 函数等在首次需要时讲解，后续章节提供“基础知识回看”链接。
- 默认保持简要正文，详解在原生折叠区域内。点击“展开本章讲解”可展开全部教学区域；“收起本章讲解”恢复精简阅读。两者都不主动打开提示或答案。
- 16 章新增 32 道完整步骤例题、48 个“预测—操作—记录—解释”实验任务、48 道开放练习。开放练习每题有两层提示和独立完整解答，不计入原选择题分数。
- 语言切换保留展开状态、提示／答案状态、实验输入和选择题评分。回看链接携带语言，进入后自动展开基础知识区域；不承诺跨页恢复所有阅读状态。
- 打印时自动展开完整教学区域，打印结束后恢复原折叠状态；练习提示与答案沿用读者原来的展开选择，不因整章展开而泄露答案。
- 内容按章节组保存在 `content/study-01-04.js` 等四个文件中；结构化段落、公式、表格、任务和练习由共享逻辑渲染与导出，不依赖额外库或联网。
- 自学补充标明为教学改编，不把新增基础知识说成原稿逐页内容。微正则章节额外说明密度的可积性，对称性章节区分恒质量与变质量角动量约束。

## 使用和资源

- `chapter-01.html` 至 `chapter-16.html` 是独立入口；底部上一章／下一章连接全课程，左侧提供目录，手机通过目录按钮展开。
- 语言切换保留本页实验值、选项、评分与展开推导；章节链接携带语言。重载或跨章节不保存实验数值。浏览器禁用存储时也可切换语言。
- 数字可用滑块、键盘或数值框修改。无效值显示提示，保留上一次有效计算；重置恢复全部默认值。
- 图中显示单位、坐标轴、图例与简化条件；手机可在图表区域横向滚动，正文不横向溢出。支持可见焦点、跳至正文与 Escape 关闭目录。
- 公式资源共用 `../phy489/assets/katex/`（KaTeX 0.16.22，MIT License）；应保留仓库目录结构。学习不请求 CDN、远程字体或后端。
- 原始 PDF 只放在 `courseware/`，已加入 `.gitignore`，Pages 打包排除。网页仅在 `file:` 环境生成本地 PDF 链接；发布模式仅显示出处和页码。
- 学习不执行 Python、Node 或 Git；下面的 Node 命令仅供维护者验证。

## 科学约定与修正

1. 各模型为无量纲教学模型，角度控件明确使用度，内部三角函数转为弧度。未定义统一物理 SI 单位。
2. 回归以 X 每行一个样本。无正则半 MSE 使用 1/(2P)；岭参数采用半求和损失加 λ‖w‖²/2，连偏置一起惩罚。平均损失应同步除以 P。
3. Part 1 Lecture 3 PDF p.3 的末尾负对数似然符号与标签不符；本课件从 Bernoulli 定义推得 softplus(z)−yz 与梯度 p−y。熵上界 log 2 不等于交叉熵上界。
4. 反向传播明确包含前向缓存和反向扫图。核插值要求相应 Gram 满秩；以岭恒等式／最小范数极限补足过参数化推导，未保证泛化或双下降。
5. GD 的 0<ηa<2 是固定正曲率二次模型条件。非线性四次势只用于解释变化的曲率，没有复现 arXiv:2103.00065 的网络实验。讲义中的 2026 年引用与性能叙述未作为当前事实。
6. SGD 为平均梯度，条件均值零、条件方差 q 常数。精确矩递推不要求 Gaussian，但也不能直接解释所有实际批处理噪声。
7. 预条件算子 P 与几何度量区分；几何最速下降使用逆度量。动量不保证全局最优。
8. Muon 例子的正平方根保留绝对值：对称不定 G 的极因子是 sign(G)，不是恒等矩阵。矩形、缺秩均说明维数条件；零奇异方向采用支撑子空间伪逆。仅演示极因子，不实现完整生产 Muon。
9. AdamW 加入来源略去的偏差修正和 ε=10⁻⁸；v 是二阶原始矩。零当前梯度不消除历史动量与衰减。
10. 守恒轨迹使用解析解，不宣称某个数值积分器精确保能。x=0 的变质量奇点不跨越；微正则测度只是形式密度，需另验归一化、遍历性和区域体积。对称破缺力矩是教学例子，不是语言模型改进证据。

## 自检

```bash
node phy359/checks.cjs --export
node phy359/checks-study-math.cjs
node phy359/checks-browser.cjs /absolute/path/to/playwright [chromium-executable]
```

第一条验证简要与详解内容、双语、来源、250 个公式（原有 85 个与新增 165 个）、390 组模型组合，并重新生成来源表与完整双语内容稿。第二条独立核算新增例题与关键推导。第三条在隔离 Chromium 中把全部 HTTPS 请求映射到仓库本地静态文件，模拟 `/phy-course/` 子路径；不启动服务器、不访问外网，也不导航 `file://`。它是渲染／交互验证，不是文件协议原生浏览验证。

实际验证结果和限制见 [verification.md](verification.md)。

## English quick start

Open `index.html` directly and choose English. Keep this folder and `../phy489/assets/katex/` together. Sixteen chapters cover only the ten supplied lecture PDFs in Parts 1/2. Concise summaries are supplemented by expandable foundations, full derivations, 32 worked examples, 48 guided experiment tasks and 48 open exercises with separate hints and solutions. The 32 original multiple-choice questions remain. Bulk expansion never opens answers; language switching preserves reading and experiment state. This is an independent adaptation, not official answers or a complete course syllabus. Original PDFs remain local and are excluded from publication. Language changes preserve the current page state; chapter navigation preserves language but resets model values.
