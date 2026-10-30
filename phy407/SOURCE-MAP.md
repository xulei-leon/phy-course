# PHY407 来源与覆盖 / Sources and coverage

本表引用本地提供的第 1–6 讲材料。PDF 页为实际文件页序（从 1 开始），不是幻灯片页号。来源文件不在线发布；本表不包含原图或原文整页。章节拆分、双语说明、例题、代码和实验均为教学改编。

12 份 PDF 共 113 页，加一份 HTML 示例；不推断尚未提供的后续讲次。部分标题页、空白输出单元和装饰页保留在来源范围中，但不作为独立知识点。

## 01 Python 生态与可复用计算 / The Python ecosystem and reusable computation

讲次 / Lecture: 1

- `lec01/introPythonEcosystem.pdf` — The Python Ecosystem — Ramses van Zon, SciNet, October 2019 — PDF pp. 1–6

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 标准库、包与环境 / Standard library, packages and environments | 1 |
| 脚本、交互解释器与 notebook / Scripts, REPL and notebooks | 2 |
| 语法检查与求值 / Syntax checking and evaluation | 3 |
| 模块、命名空间与导入 / Modules, namespaces and imports | 5 |

采用约定与疑点 / Conventions and issues:

- 来源 PDF 为 6 页图像型课件，已按图像检查。2019 年包数量和网址是历史信息，不当作当前统计。
- The six-page source contains image-based slides and was visually inspected. Package counts and URLs from 2019 are historical, not current statistics.
- 闰年函数的完整逻辑为教学补全，使用公历规则，不把它外推为所有历史历法。
- The completed leap-year function is a teaching addition using the Gregorian rule, not every historical calendar.

## 02 高性能计算与并行效率 / High-performance computing and parallel efficiency

讲次 / Lecture: 1

- `lec01/Intro to High Performance Computing.pdf` — Introduction to Supercomputing — Bruno C. Mundim, SciNet, September 2024 — PDF pp. 1–31

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 硬件与内存模型 / Hardware and memory models | 3 |
| 吞吐量、加速比与效率 / Throughput, speedup and efficiency | 14 |
| 强扩展与弱扩展 / Strong and weak scaling | 19 |
| 局部性、负载与共享资源 / Locality, load and shared resources | 21 |

采用约定与疑点 / Conventions and issues:

- PDF 10 的排名、核心数及内存配置属于原稿历史示例，未复核，网页不把它们列为当前性能事实。
- Rankings, core counts and memory specifications on PDF p.10 are historical source examples, not verified current performance claims.
- PDF 20 的 f(N) 随规模减小是部分问题的模型，不是所有算法的定理；PDF 26 的“无人使用 GUI”是课堂强调，不是普遍事实。
- The decreasing f(N) on p.20 models some problems, not every algorithm. The “nobody uses a GUI” statement on p.26 is emphasis, not a universal fact.

## 03 Git 与计算的可复现记录 / Git and reproducible computational records

讲次 / Lecture: 1

- `lec01/Intro to Version Control with Git.pdf` — Introduction to GIT Version Control — James Willis, SciNet, November 2023 — PDF pp. 1–10

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 仓库、快照和历史 / Repository, snapshots and history | 1 |
| 工作区、暂存区和提交 / Working tree, index and commits | 8 |
| 分支、合并与冲突 / Branches, merges and conflicts | 7 |
| 记录什么，排除什么 / What to record and exclude | 10 |

采用约定与疑点 / Conventions and issues:

- 来源是 64 张幻灯片中的 10 页摘录，PDF 页序与幻灯片编号不同；本页引用实际 PDF 页。暂存区的详细推演是教学补充。
- The source is a ten-page selection from a 64-slide deck. References use actual PDF pages, not slide numbers. The detailed index trace is a teaching addition.

## 04 整数、浮点数与有限精度 / Integers, floating point and finite precision

讲次 / Lecture: 1

- `lec01/Integer and Floating-Point precision.pdf` — Numerics — Ramses van Zon, PHY1610, Winter 2026, selected slides — PDF pp. 1–17

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 进位制和整数范围 / Bases and integer ranges | 4 |
| 浮点结构和舍入 / Floating-point structure and rounding | 10 |
| 相消、溢出与下溢 / Cancellation, overflow and underflow | 12 |
| 按尺度判断相等 / Compare at a suitable scale | 17 |

采用约定与疑点 / Conventions and issues:

- PDF 6“所有整数可精确表示”应限于类型范围；PDF 11、16 的下界为正规数下界，未包含次正规数。网页按 IEEE 二进制格式补全这两个条件。
- The “all integers” statement on p.6 is restricted to the type’s range. Lower bounds on pp.11,16 describe normal numbers and omit subnormals; the web lesson states these conditions.
- PDF 17 的“绝不测试浮点相等”是经验提醒，不是无例外规则。采用尺度相关容差；binary32 的 u=2^−24，epsilon=2^−23。
- The p.17 “never test equality” warning is a heuristic, not an exceptionless rule. Use scale-aware tolerances; binary32 has u=2^−24 and epsilon=2^−23.

## 05 舍入、截断与算法稳定性 / Rounding, truncation and algorithm stability

讲次 / Lecture: 2

- `lec02/Lecture2-NumericalErrors.pdf` — Lecture 2 — Numerical Errors — PDF pp. 1–4

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 区分误差来源 / Separate error sources | 1 |
| 数据类型与 epsilon / Types and epsilon | 2 |
| 复相量的精确演化 / Exact phasor evolution | 3 |
| Euler 的系统性增长 / Systematic Euler growth | 4 |

采用约定与疑点 / Conventions and issues:

- PDF 3–4 把旋转增幅放在舍入累积标题下，但可由 Euler 放大因子在精确算术中推得；本页明确归为离散算法误差。原代码打印 kΔt 少记一步，本页用 NΔt。
- Although pp.3–4 place rotation growth under roundoff accumulation, the Euler factor predicts it in exact arithmetic; it is identified here as discretization error. The source prints kΔt one step short; this lesson uses NΔt.

## 06 向量化与可信计时 / Vectorization and credible timing

讲次 / Lecture: 2

- `lec02/Lecture2-VectorizationTiming.pdf` — Lecture 2 — Vectorization & Timing — PDF pp. 1–3

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 数组表达式与循环 / Array expressions and loops | 1 |
| 公平比较相同工作 / Compare equal work | 1 |
| 重复、预热与统计 / Repetition, warm-up and statistics | 2 |
| 墙钟时间与 CPU 时间 / Wall and CPU time | 3 |

采用约定与疑点 / Conventions and issues:

- PDF 1 的循环按整行调用 NumPy，本页保留此区别；PDF 2 的历史计时仅说明方法，不据其承诺固定性能倍率。
- The row-level NumPy loop on p.1 is distinguished explicitly. Historical timings on p.2 illustrate methodology, not a promised speedup.

## 07 梯形、Simpson 与积分误差 / Trapezoidal and Simpson rules with integration error

讲次 / Lecture: 2

- `lec02/Lecture2-SimpleDiffInt.pdf` — Lecture 2 — Simple Numerical Integration & Differentiation, §§1.1–1.4 — PDF pp. 1–4

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 节点、步长与矩形和 / Nodes, step size and rectangle sums | 1 |
| 复合梯形 / Composite trapezoidal rule | 2 |
| 复合 Simpson / Composite Simpson rule | 3 |
| 倍增估计与停止 / Doubling estimates and stopping | 4 |

采用约定与疑点 / Conventions and issues:

- 来源 PDF 4 用“1st/3rd-order rule”称呼梯形与 Simpson。本课件统一使用全局误差阶 2/4，同时说明其多项式精确次数 1/3，避免混淆。
- The p.4 “1st/3rd-order rule” terminology is replaced with global error orders 2/4, distinguishing polynomial exactness degrees 1/3.
- 奇数 Simpson 分段不会通过丢弃区间处理；实验限定偶数 N。
- Odd Simpson panel counts are not handled by dropping part of the domain; the experiment requires even N.

## 08 数值微分与最佳步长 / Numerical differentiation and step-size balance

讲次 / Lecture: 2

- `lec02/Lecture2-SimpleDiffInt.pdf` — Lecture 2 — Simple Numerical Integration & Differentiation, §§1.5–1.8 — PDF pp. 5–6

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 前向与后向差分 / Forward and backward differences | 5 |
| 中心差分 / Central differences | 5 |
| 截断与舍入竞争 / Truncation and rounding compete | 6 |
| 边界、高阶与偏导 / Boundaries, higher order and partial derivatives | 5 |

采用约定与疑点 / Conventions and issues:

- PDF 5 最后一行把中心差分修正写成 −h²f‴/3；由前一行再除 2h 可核验应为 −h²f‴/6，本页更正并展示推导。
- The final central correction on p.5 reads −h²f‴/3; division of the preceding line by 2h gives −h²f‴/6. This lesson corrects it with the derivation.

## 09 Romberg 与 Gauss 求积 / Romberg and Gaussian quadrature

讲次 / Lecture: 3

- `lec03/AdvancedIntegrals.pdf` — More Advanced Numerical Integration Techniques — PDF pp. 1–7

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| Newton–Cotes 家族 / The Newton–Cotes family | 1 |
| Romberg 表 / The Romberg table | 3 |
| Gauss–Legendre 节点与权重 / Gauss–Legendre nodes and weights | 4 |
| 区间变换与库函数 / Interval mapping and library functions | 5 |

采用约定与疑点 / Conventions and issues:

- PDF 4 称 Legendre 为 orthonormal；标准 P_n 满足积分 P_n²=2/(2n+1)，故只是正交。由 P₀=1 的平方积分为 2 即可反证归一。
- The p.4 “orthonormal” wording is corrected: standard P_n have squared norm 2/(2n+1), not 1. P₀=1 already has squared norm 2.
- 网页仅实现固定两点 Gauss 与有限层 Romberg 教学演示，不宣称复现 SciPy 的完整自适应算法。
- Only fixed two-point Gauss and finite-depth Romberg are implemented here, not SciPy’s complete adaptive algorithms.

## 10 插值、外推与样条 / Interpolation, extrapolation and splines

讲次 / Lecture: 3

- `lec03/Interpolation.pdf` — Interpolation — PDF pp. 1–4

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 线性插值与余项 / Linear interpolation and remainder | 1 |
| Lagrange 多项式 / Lagrange polynomials | 2 |
| 分段多项式与三次样条 / Piecewise polynomials and cubic splines | 2 |
| 多维数据与外推 / Multidimensional data and extrapolation | 3 |

采用约定与疑点 / Conventions and issues:

- PDF 1 余项省略 1/2 并把 ξ 写成 x；本页以标准插值余项更正。PDF 2 把 CubicSpline 描述为斜率突变，实际其定义为 C² 分段三次；与一般分段多项式、C¹ Hermite 区分。
- The p.1 remainder omits 1/2 and writes x in place of ξ; this lesson uses the standard remainder. The p.2 slope-jump description of CubicSpline is corrected using its C² definition, distinct from arbitrary pieces and C¹ Hermite.

## 11 最小二乘拟合与残差 / Least-squares fitting and residuals

讲次 / Lecture: 4

- `lec04/FittingSolvingLinear.pdf` — Prof’s notes on fitting — PDF pp. 1–2
- `lec04/FittingSolvingLinear.pdf` — Fitting as solving linear systems — PDF pp. 10–10

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 目标函数与权重 / Objective and weights | 1 |
| 设计矩阵与线性参数 / Design matrix and linear parameters | 10 |
| 残差、过拟合与可复现数据 / Residuals, overfitting and reproducible data | 2 |
| 系数顺序与库函数 / Coefficient order and libraries | 2 |

采用约定与疑点 / Conventions and issues:

- PDF 1 二次式注释误用 linfit，应使用 quadfit；PDF 2“二次项非常接近零”依赖随机数据，不能先验保证。本页只对实际生成的数据报告残差。
- The quadratic comment on p.1 incorrectly names linfit instead of quadfit. The p.2 near-zero quadratic claim depends on the random realization and is not guaranteed; this lesson reports results only for its generated data.

## 12 线性方程、主元与条件数 / Linear systems, pivoting and conditioning

讲次 / Lecture: 4

- `lec04/FittingSolvingLinear.pdf` — Solving linear systems: Gaussian elimination, LU and conditioning — PDF pp. 2–7

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 消元与回代 / Elimination and back substitution | 2 |
| 部分主元 / Partial pivoting | 3 |
| 带置换的 LU / LU with permutation | 5 |
| 条件数与残差 / Condition number and residual | 6 |

采用约定与疑点 / Conventions and issues:

- PDF 4 的近零主元示例与代码输入不完全对应；网页使用明确矩阵，不补猜原意。PDF 5 未写置换，网页写成 PA=LU。
- The near-zero pivot wording on p.4 does not fully match its code; this lesson uses explicit matrices without guessing the intended input. The p.5 LU relation is extended to PA=LU with pivoting.
- PDF 6 把病态概括为算法失败。本页区分条件性与稳定性：病态不必抛错，小残差也不保证小前向误差。
- The p.6 failure description is qualified: ill-conditioning need not raise an exception, and small residuals do not guarantee small forward error.

## 13 特征值、QR 与对称性 / Eigenvalues, QR and symmetry

讲次 / Lecture: 4

- `lec04/FittingSolvingLinear.pdf` — QR decomposition for eigensystems — PDF pp. 7–10

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 特征向量与矩阵作用 / Eigenvectors and matrix action | 7 |
| QR 相似迭代 / QR similarity iteration | 8 |
| 正确选择 eig 和 eigh / Choose eig and eigh appropriately | 9 |
| 残差、迹与行列式 / Residual, trace and determinant | 10 |

采用约定与疑点 / Conventions and issues:

- PDF 8 的示例末行误写 V@L，本页使用 V@D；PDF 10 写 AV≠ΛV，比较对象应为 AV 与 VΛ。网页明确乘法顺序。
- The p.8 example’s V@L should be V@D. On p.10 the comparison should be AV versus VΛ, not ΛV; multiplication order is explicit here.
- PDF 8 把 eigh 一概说成 QR 实现并不准确，具体驱动可不同。本页只解释 QR 相似思想，不断言库的固定后端算法。
- The p.8 claim that eigh is always a QR implementation is not general: drivers differ. This lesson explains QR similarity without asserting a fixed library backend.

## 14 非线性求根与收敛判断 / Nonlinear roots and convergence checks

讲次 / Lecture: 5

- `lec05/NonlinearEquations.pdf` — Finding roots of nonlinear equations — PDF pp. 1–4

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 固定点松弛 / Fixed-point relaxation | 1 |
| Newton、割线与 Halley / Newton, secant and Halley | 2 |
| 连续性与二分保障 / Continuity and bisection safeguards | 3 |
| 混合方法和停止准则 / Hybrid methods and stopping rules | 4 |

采用约定与疑点 / Conventions and issues:

- PDF 3“只支持单个括住的根”“偶数个根找不到”的说法过强；采用连续变号的标准保障。PDF 2、7 的 scipy.optimization 应为 scipy.optimize。
- The p.3 single-root and even-root restrictions are too strong; the lesson uses the standard continuous sign-change guarantee. scipy.optimization on pp.2,7 should be scipy.optimize.

## 15 一维优化与黄金分割 / One-dimensional optimization and golden-section search

讲次 / Lecture: 5

- `lec05/NonlinearEquations.pdf` — Finding minima/maxima; Golden Ratio search; global and multidimensional optimization — PDF pp. 4–7

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 驻点不等于最小值 / Stationary is not necessarily minimal | 4 |
| 黄金分割的单峰假设 / Unimodality for golden search | 5 |
| 停止、端点与库函数 / Stopping, endpoints and libraries | 4 |
| 全局与多维的边界 / Limits in global and multiple dimensions | 7 |

采用约定与疑点 / Conventions and issues:

- 来源把 global optimization 的目标说成“绝对值最大”，这不是一般最小化定义。网页使用目标函数的最小值；不把局部搜索说成全局保证。
- The source’s “largest absolute value” wording is not the general minimization objective. This lesson minimizes the specified function and does not present local search as a global guarantee.

## 16 Fourier 系列、DFT 与采样 / Fourier series, DFT and sampling

讲次 / Lecture: 6

- `lec06/Fourier Transforms.pdf` — Fourier Transforms — October 18, 2026, §§0.1–0.3 — PDF pp. 1–5

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 周期展开与符号约定 / Periodic expansions and sign conventions | 1 |
| DFT 与物理频率 / DFT and physical frequencies | 2 |
| 对称性、正弦与余弦 / Symmetry, sine and cosine transforms | 3 |
| 采样、泄漏与逆变换 / Sampling, leakage and inversion | 4 |

采用约定与疑点 / Conventions and issues:

- PDF 1 热流式缺负号；PDF 2 连续变换符号与前后系列不一致，且频率缺 Δx 尺度。本页统一采用 NumPy 的正向负指数约定，明确频率单位。
- The p.1 heat-flow equation omits a minus sign. The p.2 continuous-transform signs differ from neighboring sections and omit the Δx frequency scale. This lesson consistently uses NumPy’s forward-negative convention and physical units.
- PDF 5 将逆 DFT 的精确性归因于误差补偿，网页用单位根正交性证明；这不等于连续 Fourier 积分无误差。
- Rather than the p.5 error-compensation explanation, inversion is proved via roots-of-unity orthogonality. It does not imply error-free continuous Fourier integration.

## 17 FFT 蝶形、复用与二维变换 / FFT butterflies, reuse and two-dimensional transforms

讲次 / Lecture: 6

- `lec06/Fourier Transforms.pdf` — Fourier Transforms, §§0.4–0.6 — PDF pp. 5–8
- `lec06/FFT-WorkedExample.html` — FFT-WorkedExample — N=8; Writing the pairings; Calculating the Fourier coefficients — HTML section anchors: Example with N=8; Writing the pairings; Calculating the Fourier coefficients

| 主题 / Topic | PDF 页 / PDF page |
|---|---|
| 偶奇分解与蝶形 / Even–odd decomposition and butterflies | 5 |
| 三层八点实例 / An eight-point, three-stage example | 6 |
| 位反序与迭代合并 / Bit reversal and iterative combination | 7 |
| 二维可分离变换 / Separable two-dimensional transforms | 7 |
| 算法复杂度与库函数 / Complexity and library routines | 8 |

采用约定与疑点 / Conventions and issues:

- PDF 7 的二维求和指标重复使用 k，逆式 km 分母误写 N，本页改为 m 求和、km/M。用 3×4 矩形网格回环测试核对。
- On p.7 the 2D sum reuses k as a summation index, and the inverse km term divides by N. This lesson uses summation over m and km/M, checked on a 3×4 rectangular grid.
- HTML 示例的 First bisection 上限写 3 却展开 8 项，Third step 多处 j+4 与 j+2 不一致，Last step 的奇子项和末项下标也不一致。网页采用本章两条蝶形式及可核对表，不沿用这些笔误。
- The HTML example’s First bisection uses upper limit 3 but expands eight terms; Third step mixes j+4 and j+2; Last step has inconsistent odd-term and final indices. This lesson uses the two explicit butterfly equations and checked tables instead.
- 历史操作数只是数量级说明；不把 Nlog₂N 与 N² 的比值称为真实硬件加速比。
- Historical operation counts describe scaling; the ratio of Nlog₂N and N² is not claimed as measured hardware speedup.

