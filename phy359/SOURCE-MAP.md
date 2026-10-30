# PHY359 来源与覆盖 / Sources and coverage

10 份 PDF，31 页；实际 PDF 页序与印刷页码分别标注。所有网页讲解、例题、交互和自测均为教学改编。Part 3/4 未提供。原始 PDF 只在本地保存，不在线发布。 / Ten PDFs, 31 pages; actual PDF and printed pages are distinguished. All web explanations, examples, interactions and quizzes are teaching adaptations. Parts 3/4 were not supplied. Original PDFs remain local.

## 01 神经网络：函数、层与指标 / Neural networks: functions, layers and indices

来源 / Source: `Part1/Lecture1.pdf` · PDF 1–2 · 印刷页 / printed pp. 1–2

| 主要小节 / Main topic | PDF page |
|---|---|
| 前向传播 / Forward propagation | 1 |
| 指标和维数 / Indices and dimensions | 2 |
| 参数与超参数 / Parameters and hyperparameters | 2 |

- 例题、模型与自测均为新增教学改编；出处对应主要概念，不表示原稿包含相同交互。 / Examples, models and quizzes are teaching additions. Sources support core concepts, not identical interactive material.

## 02 线性回归与正规方程 / Linear regression and normal equations

来源 / Source: `Part1/Lecture2.pdf` · PDF 1–4 · 印刷页 / printed pp. 3–6

| 主要小节 / Main topic | PDF page |
|---|---|
| 特征矩阵 / Feature matrix | 1 |
| 均方目标 / Mean-square objective | 2 |
| 指标求导 / Index derivatives | 3 |

- 讲义 PDF p.2 从平均损失展开到求和时省略 1/P；本课件始终保留它。正规方程不变，梯度与学习率需按尺度匹配。 / The expansion on PDF p.2 drops 1/P. This lesson retains it; normal equations are unchanged but gradients and learning rates must use matching scales.

## 03 秩、岭回归与正则化 / Rank, ridge regression and regularization

来源 / Source: `Part1/Lecture2.pdf` · PDF 4 · 印刷页 / printed pp. 6

| 主要小节 / Main topic | PDF page |
|---|---|
| 秩上界 / Rank bound | 4 |
| 统一正则化尺度 / Fix the regularization scale | 4 |
| 偏差与泛化 / Bias and generalization | 4 |

- 例题、模型与自测均为新增教学改编；出处对应主要概念，不表示原稿包含相同交互。 / Examples, models and quizzes are teaching additions. Sources support core concepts, not identical interactive material.

## 04 逻辑回归、似然与交叉熵 / Logistic regression, likelihood and cross-entropy

来源 / Source: `Part1/Lecture3.pdf` · PDF 1–3 · 印刷页 / printed pp. 7–9

| 主要小节 / Main topic | PDF page |
|---|---|
| Bernoulli 似然 / Bernoulli likelihood | 1 |
| logit 与概率 / Logit and probability | 2 |
| 熵与距离的边界 / Entropy and the limits of distance | 3 |

- PDF p.3（印刷 p.9）最后两式标为 −log L，实际写的是 log L 的符号。本页从 Bernoulli 定义重推，采用正的 softplus(z)−yz 和梯度 p−y；驻点不因整体换号而改变。 / The last two formulas on PDF p.3 (printed p.9) are labeled −log L but have log L signs. Re-deriving from Bernoulli gives softplus(z)−yz and gradient p−y. An overall sign does not change stationary points.
- 高熵表示给定概率模型下较大的平均惊讶度，不等于更多语义知识。p=0.5 的交叉熵基线为 log 2，并不意味着它是最大交叉熵。 / Higher entropy means greater average surprisal under the probability model, not greater semantic knowledge. The p=0.5 cross-entropy baseline log 2 is not a maximum cross-entropy.

## 05 梯度下降与反向传播 / Gradient descent and backpropagation

来源 / Source: `Part1/Lecture4.pdf` · PDF 1–3 · 印刷页 / printed pp. 10–12

| 主要小节 / Main topic | PDF page |
|---|---|
| 损失与更新 / Loss and update | 1 |
| 输出误差 / Output error | 1 |
| 隐藏层误差 / Hidden-layer error | 2 |

- PDF p.2–3 所说“单次前向”指可复用前向量，并非无需反向计算。本页明确区分前向缓存和反向扫图；可微运算无需都有符号闭式表达。 / The “single forward pass” wording on PDF pp.2–3 means forward quantities can be reused; backward work is still required. Differentiable operations need not all have symbolic closed forms.

## 06 核回归、插值与泛化 / Kernel regression, interpolation and generalization

来源 / Source: `Part1/Lecture5.pdf` · PDF 1–3 · 印刷页 / printed pp. 13–15

| 主要小节 / Main topic | PDF page |
|---|---|
| 两个 Gram 矩阵 / Two Gram matrices | 1 |
| 原始—对偶恒等式 / Primal–dual identity | 2 |
| 双下降与 NTK 的边界 / Limits of double descent and NTK | 3 |

- PDF p.2 的“总能记忆”须加核满秩等条件。本页使用岭恒等式和满行秩极限，补足从不可逆 M 转向可逆 K 的论证。 / The p.2 “always memorize” statement requires conditions such as full kernel rank. The ridge identity and full-row-rank limit supply the missing justification for moving from singular M to invertible K.

## 07 二次损失与梯度下降稳定性 / Quadratic loss and GD stability

来源 / Source: `Part2/Part2_Lecture1.pdf` · PDF 1–2 · 印刷页 / printed pp. 1–2

| 主要小节 / Main topic | PDF page |
|---|---|
| 误差坐标 / Error coordinates | 1 |
| Hessian 的模式 / Hessian modes | 2 |
| 正、零、负曲率 / Positive, zero and negative curvature | 2 |

- 例题、模型与自测均为新增教学改编；出处对应主要概念，不表示原稿包含相同交互。 / Examples, models and quizzes are teaching additions. Sources support core concepts, not identical interactive material.

## 08 变化的曲率与稳定边缘 / Changing curvature and the edge of stability

来源 / Source: `Part2/Part2_Lecture1.pdf` · PDF 2–5 · 印刷页 / printed pp. 2–5

| 主要小节 / Main topic | PDF page |
|---|---|
| Taylor 展开 / Taylor expansion | 2 |
| 研究观察与定理 / Observation versus theorem | 3 |
| 诊断曲率 / Diagnose curvature | 3 |

- 讲义“无效化大量二次近似文献”的表述过强。本页只说明局部固定二次模型的适用边界；未核验讲义引用的 2026 年语言模型论文，也不据此宣称当前最先进结果。 / The notes’ broad claim about invalidating quadratic literature is too strong. This lesson states the limit of a fixed local quadratic model. The cited 2026 language-model paper was not independently checked and is not used for a current state-of-the-art claim.

## 09 随机梯度下降与噪声方差 / Stochastic gradient descent and noise variance

来源 / Source: `Part2/Part2_Lecture2.pdf` · PDF 1–2 · 印刷页 / printed pp. 6–7

| 主要小节 / Main topic | PDF page |
|---|---|
| 小批量与 epoch / Mini-batches and epochs | 1 |
| 简化噪声 / Simplified noise | 1 |
| 连续极限的尺度 / Continuum scaling | 2 |

- 讲义 p.1 将求和损失与平均小批量梯度交替记号化；本页统一为平均梯度。q 固定时 η→0 得梯度流，并不代表所有缩放方式下随机性都消失。 / The p.1 notation alternates between summed loss and mean mini-batch gradients. This lesson uses mean gradients consistently. At fixed q, η→0 gives gradient flow; other scalings can retain randomness.

## 10 Hamilton 方程、阻尼与动量 / Hamilton equations, damping and momentum

来源 / Source: `Part2/Part2_Lecture3.pdf` · PDF 1–3 · 印刷页 / printed pp. 8–10

| 主要小节 / Main topic | PDF page |
|---|---|
| Hamilton 动力学 / Hamiltonian dynamics | 1 |
| 显式含时的技巧 / Explicit-time construction | 1 |
| 离散重球法 / Discrete heavy-ball method | 2 |

- 保留讲义从阻尼方程到离散算法的思路；有限步算法的 η 是定义后的系数，连续极限不能只令 dt→0 而保持所有系数任意不变。动量没有全局最优化保证。 / The notes’ damping-to-discrete construction is retained. The finite-step η is a defined coefficient; a continuum limit requires consistent coefficient scaling. Momentum gives no global optimization guarantee.

## 11 预条件与参数空间的尺度 / Preconditioning and parameter-space scales

来源 / Source: `Part2/Part2_Lecture4.pdf` · PDF 1 · 印刷页 / printed pp. 11

| 主要小节 / Main topic | PDF page |
|---|---|
| 椭圆谷 / Elliptic valley | 1 |
| 正定预条件 / Positive-definite preconditioning | 1 |
| 坐标度量 / Coordinate metrics | 1 |

- 讲义 p.1 用 gIJ 同时讨论度量与预条件；本页写 P 作为更新算子，明确几何最速下降使用逆度量。 / The notes use gIJ in discussing both metrics and preconditioners. This page calls the update operator P and states that geometric steepest descent uses the inverse metric.

## 12 极分解与 Muon 更新方向 / Polar decomposition and Muon update directions

来源 / Source: `Part2/Part2_Lecture4.pdf` · PDF 1–2 · 印刷页 / printed pp. 11–12

| 主要小节 / Main topic | PDF page |
|---|---|
| 紧致 SVD / Compact SVD | 1 |
| 矩形与缺秩 / Rectangular and rank-deficient cases | 1 |
| 动量和衰减 / Momentum and decay | 2 |

- PDF p.1 把 (D²)⁻¹ᐟ² 写成 D⁻¹，只有 D 正定才成立。一般对称矩阵应取 |D|⁻¹，极因子是 sign(G)。矩形 UVᵀ 要用紧致维数与秩条件，不能称所有矩形矩阵为方阵正交矩阵。 / PDF p.1 replaces (D²)⁻¹ᐟ² by D⁻¹, valid only for positive D. In general use |D|⁻¹ and polar factor sign(G). Rectangular UVᵀ needs compact dimensions and rank conditions; a rectangular factor is not a square orthogonal matrix.
- 来源关于最先进水平、年份、引用数与个人任职的表述未作当前事实使用。 / Source claims about state of the art, age, citation counts and personal affiliations are not used as current facts.

## 13 Adam、二阶矩与解耦衰减 / Adam, second moments and decoupled decay

来源 / Source: `Part2/Part2_Lecture4.pdf` · PDF 2–3 · 印刷页 / printed pp. 12–13

| 主要小节 / Main topic | PDF page |
|---|---|
| 指数移动平均 / Exponential moving averages | 2 |
| 偏差修正与 ε / Bias correction and epsilon | 2 |
| AdamW 衰减 / AdamW decay | 3 |

- 讲义省略偏差修正与 ε。本页将其作为标准实现补全，并明确 v 是原始二阶矩。符号更新只在 β₁=β₂=0、非零梯度且忽略 ε 时精确成立。 / The notes omit bias correction and epsilon. These are added as standard implementation details; v is a raw second moment. The exact sign update requires β₁=β₂=0, nonzero gradient and negligible epsilon.

## 14 变质量与能量守恒轨迹 / Variable mass and energy-conserving trajectories

来源 / Source: `Part2/Part2_Lecture5.pdf` · PDF 1 · 印刷页 / printed pp. 14

| 主要小节 / Main topic | PDF page |
|---|---|
| 正质量定义 / Positive mass | 1 |
| Hamilton 方程 / Hamilton equations | 1 |
| 数值与解析守恒 / Numerical versus analytic conservation | 1 |

- 讲义的“到 Mathematica”未给完整求解。本页补出一维解析解，属于教学补全。γ<1 时存在有限到达时间，零点处原变量质量奇异，不能无说明继续积分。 / The notes’ “to Mathematica” step lacks a complete solution. The scalar analytic solution here is a teaching addition. For γ<1 arrival occurs in finite time, where the original mass is singular; continuation needs separate treatment.

## 15 微正则测度与低损失集中 / Microcanonical measure and low-loss concentration

来源 / Source: `Part2/Part2_Lecture5.pdf` · PDF 2 · 印刷页 / printed pp. 15

| 主要小节 / Main topic | PDF page |
|---|---|
| Hamiltonian 与定义域 / Hamiltonian and domain | 2 |
| 测度不是已归一化概率 / Measure is not normalized probability | 2 |
| 遍历假设 / Ergodic hypothesis | 2 |

- 本页保留讲义的微正则推导，但不把形式测度当作已证明可采样的分布。L₀ 选择、奇点、区域体积和遍历性均影响实际算法。 / The source derivation is retained without treating its formal measure as a proven sampleable distribution. L₀, singularities, region volumes and ergodicity all matter in an actual algorithm.

## 16 对称性、守恒量与优化边界 / Symmetry, conserved quantities and optimization limits

来源 / Source: `Part2/Part2_Lecture5.pdf` · PDF 2–3 · 印刷页 / printed pp. 15–16

| 主要小节 / Main topic | PDF page |
|---|---|
| 循环坐标 / Cyclic coordinates | 2 |
| 旋转生成元 / Rotation generator | 3 |
| 材料边界 / Scope of the materials | 3 |

- 讲义关于对称破缺改善语言模型的陈述视为来源中的研究叙述，未在本仓库复现。本页力矩模型是单独标注的教学改编。 / Source statements about symmetry breaking improving language models are treated as research claims in the notes, not reproduced in this repository. The torque model is a separately labeled teaching adaptation.

