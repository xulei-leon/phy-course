# PHY359 双语内容稿 / Bilingual content manuscript

Generated from content/part1.js and part2.js by checks.cjs --export.

## 1. 神经网络：函数、层与指标 / Neural networks: functions, layers and indices

Source: Part1/Lecture1.pdf, PDF 1–2, printed 1–2.

### 直观问题 / Intuition question

一个网络如何用同一组参数处理不同样本？

How does one network use the same parameters on different samples?

### 讲解 / Explanation

网络是一族可调函数。输入首先必须编码成数；矩阵与偏置完成仿射变换，逐元素激活引入非线性。训练改变参数，样本只是函数的自变量。

A network is a family of adjustable functions. Inputs must first be encoded numerically. Matrices and biases make affine transformations; pointwise activations introduce nonlinearity. Training changes parameters, while samples are function arguments.

### 必要概念 / Concepts

**前向传播 / Forward propagation**

用 z 表示激活前的量，用 h 表示激活后的量；最后一层可直接输出，也可再接概率变换。

Write z for preactivations and h for activations. The final layer can output directly or feed a probability transformation.

$$
z^{(\ell)}_{i\alpha}=W^{(\ell)}_{ij}h^{(\ell-1)}_{j\alpha}+b_i^{(\ell)},\quad h^{(0)}_{j\alpha}=x_{j\alpha}
$$

**指标和维数 / Indices and dimensions**

拉丁指标标记神经元，α 标记样本，ℓ 标记层。对重复的神经元指标求和；样本指标只在明确写出的求和中收缩。

Latin indices label neurons, α samples, and ℓ layers. Repeated neuron indices are summed; sample indices are contracted only in an explicit sum.

$$
W^{(\ell)}\in\mathbb R^{n_\ell\times n_{\ell-1}},\quad b^{(\ell)}\in\mathbb R^{n_\ell}
$$

**参数与超参数 / Parameters and hyperparameters**

权重与偏置是被拟合的参数；深度、宽度和激活函数通常是预先选择的超参数。没有非线性时，多层仿射映射仍可合并为一个仿射映射。

Weights and biases are fitted parameters. Depth, widths and activation functions are usually chosen hyperparameters. Without nonlinear activations, stacked affine maps still collapse to one affine map.

### 公式推导 / Derivation

**一个隐藏神经元 / One hidden neuron**

取一维输入，先得到激活前的数。

For a scalar input, first compute its preactivation.

$$
z_1=wx+b
$$

**非线性激活 / Nonlinear activation**

tanh 将中间值限制在 −1 与 1 之间。

tanh bounds the hidden value between −1 and 1.

$$
h=\tanh(z_1)
$$

**线性读出 / Linear readout**

若把激活换成恒等函数，可以直接合并两层。

Replacing the activation by the identity collapses both layers.

$$
f(x)=vh+c;\qquad f_{\rm linear}(x)=vwx+(vb+c)
$$

### 例题 / Worked example

**数参数并计算 / Count parameters and evaluate**

1→1→1 网络有 w、b、v、c 共 4 个参数。取 x=1、w=2、b=0、v=3、c=1：先算 z₁=2，再算 tanh(2)≈0.9640，输出≈3.8921。线性激活则给 7。

A 1→1→1 network has four parameters: w,b,v,c. With x=1,w=2,b=0,v=3,c=1, first z₁=2, then tanh(2)≈0.9640, giving output≈3.8921. Linear activation gives 7.

### 交互模型 / Interactive model

同一网络，不同激活

One network, different activations

### 单位、假设与边界 / Units, assumptions and limits

教学模型 f(x)=vσ(wx+b)+c；输入、参数和输出均无量纲。比较 tanh、ReLU 与线性激活；没有训练或真实图像识别。

Teaching model f(x)=vσ(wx+b)+c. Inputs, parameters and outputs are dimensionless. Compare tanh, ReLU and linear activation; no training or real image recognition is performed.

### 自测 1 / Self-check 1

换一个样本是否自动改变 W？

Does a new sample automatically change W?

1. 是 / Yes
2. 否 / No

Answer: 2

所有样本共享参数；更新参数需要另一个训练步骤。

Parameters are shared; changing them requires a separate training update.

### 自测 2 / Self-check 2

没有非线性的多层网络能增加函数的非线性吗？

Do multiple layers without nonlinear activation create a nonlinear function?

1. 不能 / No
2. 能 / Yes

Answer: 1

仿射映射的复合仍为仿射映射。

A composition of affine maps is affine.

### 自学学习目标 / Self-study goals

- 按行列计算矩阵乘法，并检查网络每层维数。 / Compute matrix products row by column and check every layer dimension.
- 手算一个小网络，区分输入、参数和超参数。 / Evaluate a small network and distinguish inputs, parameters and hyperparameters.
- 解释为什么叠加线性层不能代替非线性激活。 / Explain why stacked linear layers cannot replace nonlinear activation.

本章先学会“读懂网络是一条什么计算规则”，不要求会训练。下一章把输出对参数线性的特殊情形拿出来，研究怎样由数据确定参数。

First learn to read a network as a computational rule; training is not yet required. The next chapter isolates models linear in their parameters and asks how data determine those parameters.

### 基础补习 / Foundation refresher

从一个数到向量和矩阵 / From one number to vectors and matrices

标量就是一个数，例如温度 20。向量是按固定顺序排列的一组数，例如二维位置 x=(2,−1)ᵀ。上标 T 表示转置：把横排改成竖排。顺序有意义；交换两个坐标通常改变输入。这里的向量首先是表示数据的有序容器，不要求它一定是空间中的力或速度。

A scalar is one number, such as a temperature of 20. A vector is an ordered collection, such as position x=(2,−1)ᵀ. The superscript T denotes transposition from a row to a column. Order matters: exchanging coordinates usually changes the input. A data vector need not represent a physical force or velocity.

矩阵是数的长方形表。m×n 表示 m 行、n 列，不是元素相乘。矩阵作用于向量时，每个输出是某一行与输入的对应分量乘积之和。2×3 矩阵需要三分量输入，产生两分量输出；内侧维数必须匹配，外侧维数给出结果的大小。

A matrix is a rectangular table. The notation m×n means m rows and n columns, not elementwise multiplication. Each output is the sum of products between one row and the input components. A 2×3 matrix maps a three-component input to a two-component output: inner dimensions must agree and outer dimensions specify the result.

$$
\begin{pmatrix}1&2\\-1&3\end{pmatrix}\begin{pmatrix}2\\-1\end{pmatrix}=\begin{pmatrix}1(2)+2(-1)\\-1(2)+3(-1)\end{pmatrix}=\begin{pmatrix}0\\-5\end{pmatrix}
$$

函数把允许的输入映射到输出。f(x;θ) 中分号只用来提醒读者：x 随样本变化，θ 在一次预测中固定。训练才改变 θ。相同输入和相同参数的确定性网络应产生相同输出；随机训练步骤并不使函数定义本身含糊。

A function maps permitted inputs to outputs. In f(x;θ), the semicolon reminds us that x varies between samples while θ stays fixed during a prediction. Training changes θ. A deterministic network must return the same output for identical input and parameters; randomness in training does not make its function definition ambiguous.

求和符号 Σ 表示把规定范围内的项加起来。ΣⱼWᵢⱼxⱼ 在固定 i 时遍历所有输入坐标 j。指标 i 是自由指标，决定正在算哪个输出；j 是哑指标，换成 k 不改变结果。样本指标 α 不应因为重复出现就擅自求和。

A summation sign adds terms over a stated range. For fixed i, ΣⱼWᵢⱼxⱼ runs through the input coordinates j. The free index i specifies the output, while the dummy index j can be renamed k without changing the value. A repeated sample index α must not be summed unless explicitly requested.

### 直观详解 / Motivation

设想用两个测量值预测一个连续量。最初可以写 f=w₁x₁+w₂x₂+b，每个权重表示某个输入对输出的线性贡献，b 调整整体基线。若目标对输入的反应在不同区域不同，一条平面就不够，需要先构造随输入变化的中间特征，再组合它们。

Suppose two measurements predict a continuous quantity. Start with f=w₁x₁+w₂x₂+b: each weight gives a linear contribution and b adjusts the baseline. If the target responds differently in different input regions, a plane is insufficient. Construct input-dependent intermediate features before combining them.

隐藏神经元不是必须对应真实物理对象。它是一个中间计算单元。学习时先问每一步接收什么、计算什么、输出几维，再讨论它是否学到了有用特征。会计算前向输出，是理解损失和反向传播的前提。

A hidden neuron need not correspond to a physical object. It is an intermediate computation. First ask what each operation receives, computes and returns; only then ask whether its features are useful. Evaluating a forward pass is the prerequisite for understanding losses and backpropagation.

### 概念详解 / Detailed concepts

#### 仿射与线性要区分

Distinguish affine from linear

严格的线性映射要求输入为零时输出也为零，并满足可加性和齐次性。Wx 是线性的，Wx+b 一般是仿射的。机器学习常把两者统称为线性层；这是一种术语习惯，不是对线性代数定义的修改。

A strictly linear map sends zero to zero and satisfies additivity and homogeneity. Wx is linear; Wx+b is generally affine. ML often calls both a linear layer. That terminology does not change the linear-algebra definition.

#### 激活逐元素作用

Activation acts elementwise

tanh 将每个坐标压到 (−1,1)，ReLU 将负数变成零并保留正数。它们不混合不同坐标；混合由权重矩阵完成。tanh 的饱和区表示输入继续增加时输出变化很小，第五章会看到这也使局部导数很小。

tanh maps each coordinate into (−1,1); ReLU replaces negative values by zero and retains positive values. Activations do not mix coordinates; matrices do. In tanh saturation, increasing the input changes the output very little. Chapter 5 connects this to small local derivatives.

| 符号 / Symbol | 含义与维数 / Meaning and dimension |
| --- | --- |
| x / h⁽⁰⁾ / x / h⁽⁰⁾ | 输入列向量，n₀×1 / Input column, n₀×1 |
| W⁽ℓ⁾、b⁽ℓ⁾ / W⁽ℓ⁾, b⁽ℓ⁾ | 共享参数，nℓ×nℓ₋₁ 与 nℓ×1 / Shared parameters, nℓ×nℓ₋₁ and nℓ×1 |
| z⁽ℓ⁾、h⁽ℓ⁾ / z⁽ℓ⁾, h⁽ℓ⁾ | 激活前与激活后列向量，均 nℓ×1 / Preactivation and activation columns, both nℓ×1 |

### 完整推导 / Complete derivation

先把两层的输入、参数和输出逐一写出，不把激活与矩阵乘法交换顺序。

Write the inputs, parameters and outputs of both layers without interchanging activation and matrix multiplication.

$$
z^{(1)}=W^{(1)}x+b^{(1)},\qquad h^{(1)}=\sigma(z^{(1)})
$$

$$
f(x)=W^{(2)}h^{(1)}+b^{(2)}=W^{(2)}\sigma(W^{(1)}x+b^{(1)})+b^{(2)}
$$

若 σ 是恒等函数，直接代入并用矩阵乘法的分配律。合并后输入仍只乘一次矩阵、加一次偏置，因此增加层数没有增加这族函数的表达形式。

For identity activation, substitute and distribute the matrix product. The input still meets only one matrix and one bias, so extra layers do not expand this function family.

$$
f=(W^{(2)}W^{(1)})x+(W^{(2)}b^{(1)}+b^{(2)})
$$

数参数时逐层相加：每个输出神经元有 nℓ₋₁ 个权重和一个偏置。不同样本复用这些数，所以参数总数不乘样本数。

Count parameters layer by layer: each output neuron has nℓ₋₁ weights and one bias. Samples reuse those numbers, so the count is not multiplied by sample count.

$$
N_{\rm parameters}=\sum_{\ell=1}^{L}n_\ell(n_{\ell-1}+1)
$$

### 实验任务 1 / Experiment task 1

**predict**

固定其他参数，w 从正变负会怎样？

Predict what changing positive w to negative w does.

**action**

重置后比较 w=2 与 −2，保持 b=c=0、v=1。

Reset and compare w=2 and −2 at b=c=0, v=1.

**record**

记录 x=1 输出及曲线左右方向。

Record f(1) and the curve orientation.

**explanation**

tanh 为奇函数，翻转 w 使关于原点的上升关系变为下降关系。

Because tanh is odd, reversing w turns an increasing origin-centered relation into a decreasing one.

### 实验任务 2 / Experiment task 2

**predict**

偏置 b 与输出偏置 c 是否做同一件事？

Do hidden bias b and output bias c do the same thing?

**action**

先改变 b，再重置并改变 c，使用 tanh。

Change b, then reset and change c using tanh.

**record**

比较转折位置与整条曲线的高度。

Compare transition location and overall height.

**explanation**

b 移动激活前的阈值；c 平移最终输出。饱和区与过渡区的变化方式不同。

b moves the preactivation threshold; c shifts the output. They affect transition and saturation regions differently.

### 实验任务 3 / Experiment task 3

**predict**

线性、ReLU 与 tanh 能表示怎样的形状？

What shapes can linear, ReLU and tanh activations produce?

**action**

固定参数依次切换三个激活选项。

Keep parameters fixed and switch through all three activations.

**record**

画出大致形状并注明是否有折点或饱和。

Sketch each shape and mark kinks or saturation.

**explanation**

线性为直线，ReLU 为折线，tanh 平滑且两端饱和；这里没有训练数据，不能据此断言哪种更准确。

Linear gives a line, ReLU a kinked line, and tanh a smooth saturating curve. Without training data this does not rank accuracy.

### 完整例题 1 / Worked example 1: 二维输入的完整前向计算 / A full forward pass with two inputs

题目：x=(1,2)ᵀ，W₁ 的两行为 (1,−1)、(2,0)，b₁=(0,1)ᵀ；隐藏层用 ReLU，输出为 (3,−2)h+1。先确认输入和两个隐藏神经元的维数。

Problem: x=(1,2)ᵀ; W₁ has rows (1,−1),(2,0), with b₁=(0,1)ᵀ. Use hidden ReLU and output (3,−2)h+1. First check dimensions: two inputs and two hidden neurons.

$$
z^{(1)}=(-1,3)^T,\quad h=(0,3)^T,\quad f=3(0)-2(3)+1=-5
$$

检查：输出层权重为 1×2，乘 2×1 的 h 得一个数。首层 4 个权重加 2 个偏置，输出层 2 个权重加 1 个偏置，共 9 个参数。

Check: the 1×2 output weights multiply a 2×1 hidden vector to give one number. The first layer has 4 weights and 2 biases; the output layer has 2 weights and 1 bias, totaling 9 parameters.

### 完整例题 2 / Worked example 2: 为什么两个线性层仍是一条直线 / Why two linear layers remain one line

题目：隐藏量 h=2x+3，输出 f=−h+4，不使用非线性。先代入 h，再合并 x 与常数项。

Problem: h=2x+3 and f=−h+4, without nonlinear activation. Substitute h, then collect variable and constant terms.

$$
f=-(2x+3)+4=-2x+1
$$

x=0 得 1，x=1 得 −1，与合并前逐层计算一致。四个参数可以有不同组合给同一函数；函数简单并不意味着分层参数的最优解容易求。

At x=0 the output is 1; at x=1 it is −1, matching separate evaluation. Different parameter combinations can define the same function. A simple function family does not make the layered parameter problem trivial.

### 开放练习 1 / Open exercise 1

3→2→1 的全连接网络共有几个参数？

How many parameters are in a fully connected 3→2→1 network?

Hint 1: 每个神经元都计一个偏置。 / Include one bias per neuron.

Hint 2: 分两层计算 n输出(n输入+1)。 / For each layer compute n_out(n_in+1).

Solution:

$$
2(3+1)+1(2+1)=8+3=11
$$

不能再乘样本数，参数是共享的。

Do not multiply by sample count: parameters are shared.

### 开放练习 2 / Open exercise 2

W 是 2×3，x 是 2×1，Wx 为什么不能直接计算？

Why is Wx undefined when W is 2×3 and x is 2×1?

Hint 1: 写出一行 W 中有几个元素。 / Count the entries in one row of W.

Hint 2: 一行必须与整个输入逐项配对。 / Each row must pair with the whole input.

Solution:

一行有三项而输入只有两项，内侧维数 3 与 2 不相等。不能通过补一个任意数修复；应核对特征编码或模型设计。

A row has three entries but the input has two. The inner dimensions 3 and 2 disagree. Do not invent a missing value; check feature encoding or model design.

### 开放练习 3 / Open exercise 3

把同一批输入重新排序会改变网络参数吗？会改变逐样本输出对应关系吗？

Does reordering a batch change parameters or the association between samples and outputs?

Hint 1: 区分预测与训练更新。 / Distinguish prediction from a training update.

Hint 2: 对每个输入分别应用同一函数。 / Apply the same function to each input.

Solution:

单纯预测时参数不变，输出随输入按相同顺序重排；每个输入仍对应原来的输出。若改变的是随机训练顺序，则更新路径可能改变，那是另一种操作。

During prediction parameters stay fixed and outputs reorder with their corresponding inputs. Each input keeps its output. Changing stochastic training order can change the update path, which is a different operation.

### 选择题补充解释 / Multiple-choice discussion

“是”把共享参数与样本混淆了。换样本改变 z、h 和输出；只有训练更新才改变 W。

“Yes” confuses shared parameters with samples. New inputs change z, h and outputs; only an update changes W.

选择“能”忽略了仿射映射可合并。增加层数本身不能代替非线性激活。

“Yes” overlooks closure of affine maps under composition. Depth alone cannot replace nonlinear activation.

### 章末复习 / Review

本章建立输入→仿射→激活→输出的计算链。第二章在固定特征后拟合线性读出，第五章沿这条链反向求参数导数。

This chapter builds the input→affine→activation→output chain. Chapter 2 fits a linear readout on fixed features; Chapter 5 differentiates backward through the chain.

- 把矩阵乘法当成逐元素乘法，或交换乘法顺序。 / Confusing matrix and elementwise multiplication or reversing product order.
- 把隐藏神经元数量与训练参数数量混为一谈。 / Confusing hidden-neuron count with parameter count.

- 能不看公式算出一个 2×2 矩阵乘向量。 / I can evaluate a 2×2 matrix–vector product.
- 能给网络每个中间量标维数。 / I can label every intermediate dimension.
- 能解释输入变化与训练更新的区别。 / I can distinguish changing inputs from training updates.

## 2. 线性回归与正规方程 / Linear regression and normal equations

Source: Part1/Lecture2.pdf, PDF 1–4, printed 3–6.

### 直观问题 / Intuition question

怎样一次求出所有线性参数，而不逐个试斜率？

How can we solve all linear parameters without trying slopes one by one?

### 讲解 / Explanation

“线性模型”指对可训练权重线性，特征本身可以是非线性函数。把偏置看成常数特征后，最小二乘成为一个矩阵问题；驻点不要求每个残差都为零。

A linear model is linear in trainable weights; its features may be nonlinear functions. Treating bias as a constant feature makes least squares a matrix problem. A stationary point does not require every residual to vanish.

### 必要概念 / Concepts

**特征矩阵 / Feature matrix**

采用 X 的每行一个样本，与讲义按列存样本的记法转置等价。平方、Fourier 模式也可作为固定特征。

Here X stores one sample per row, the transpose of the notes’ convention. Squares and Fourier modes can be fixed features.

$$
X_{\alpha j}=\phi_j(x_\alpha),\quad z=Xw,\quad \phi_0=1
$$

**均方目标 / Mean-square objective**

全章固定使用带 1/2 的平均平方误差。求和与平均不改变无正则化的最优点，却改变梯度尺度。

Use half the mean squared error throughout. Sums and means have the same unregularized minimizer but different gradient scales.

$$
L=\frac1{2P}\sum_\alpha(z_\alpha-y_\alpha)^2
$$

**指标求导 / Index derivatives**

用 ∂w_j/∂w_k=δjk 和乘积法则，最后每边只保留相同自由指标。多输出时每行权重独立求解。

Use ∂w_j/∂w_k=δjk and the product rule, keeping the same free indices on both sides. Each output row can be solved separately.

$$
\partial_{w_k}L=\frac1P\sum_\alpha X_{\alpha k}(X_{\alpha j}w_j-y_\alpha)
$$

### 公式推导 / Derivation

**写残差向量 / Write residuals**

残差是预测减标签。

Residuals are predictions minus labels.

$$
r=Xw-y
$$

**梯度为零 / Set the gradient to zero**

求导后将 X 的转置作用于残差。

Differentiation applies the transpose of X to the residuals.

$$
\nabla L=X^Tr/P=0\quad\Rightarrow\quad X^TXw=X^Ty
$$

**满列秩时求解 / Solve with full column rank**

可逆要求特征列独立；实际计算优先解方程或 QR/SVD，而非显式求逆。

Invertibility requires independent feature columns. Numerically solve the system or use QR/SVD rather than explicitly forming an inverse.

$$
w_*=(X^TX)^{-1}X^Ty
$$

### 例题 / Worked example

**残差正交而非逐个为零 / Orthogonal residuals need not vanish**

令 δ=0.6：Σx=0、Σx²=2、Σy=3.6、Σxy=2，得到 w=1、b=1.2。残差为 0.2,−0.4,0.2，半平均平方误差为 0.04；残差和与 x 加权和均为零。

With δ=0.6, Σx=0, Σx²=2, Σy=3.6, Σxy=2, so w=1,b=1.2. Residuals are 0.2,−0.4,0.2 and half MSE is 0.04. Both their sum and x-weighted sum vanish.

### 交互模型 / Interactive model

拟合三个点并观察残差

Fit three points and inspect residuals

### 单位、假设与边界 / Units, assumptions and limits

固定 x=−1,0,1，y=0,1+δ,2。仅改变中间标签；两参数直线的满秩解，所有坐标无量纲。图和误差为合成教学数据。

Fixed x=−1,0,1 and y=0,1+δ,2. Change only the middle label. This full-rank line fit has two parameters and dimensionless coordinates; data and errors are synthetic.

### 自测 1 / Self-check 1

用 x² 作为固定特征还算线性回归吗？

Is a fixed x² feature still compatible with linear regression?

1. 是 / Yes
2. 否 / No

Answer: 1

预测仍对可训练权重线性。

Predictions remain linear in trainable weights.

### 自测 2 / Self-check 2

最小二乘解一定逐点匹配吗？

Must a least-squares solution match every sample?

1. 一定 / Always
2. 不一定 / Not necessarily

Answer: 2

梯度为零只要求 Xᵀr=0。

Zero gradient requires only Xᵀr=0.

### 自学学习目标 / Self-study goals

- 把数据写成设计矩阵，标注每个量的维数。 / Write a design matrix and label all dimensions.
- 从标量求导和矩阵形式各推一次正规方程。 / Derive normal equations with scalar derivatives and matrix notation.
- 通过残差正交性检查最小二乘解。 / Check a least-squares solution using residual orthogonality.

第一章给出参数化函数，这一章让数据选择参数。我们先研究对权重线性的模型；第三章讨论特征相关时为什么解会失去唯一性。

Chapter 1 defined parameterized functions. Here data select their parameters, starting with models linear in weights. Chapter 3 examines loss of uniqueness when features are dependent.

### 基础补习 / Foundation refresher

求和、转置、平方长度与偏导 / Sums, transpose, squared length and partial derivatives

用 α 标记第几个样本，j 标记第几个特征。三点拟合直线时，每个样本的特征是 (xα,1)，最后的常数特征让截距也进入权重向量。采用 X 每行一个样本、w=(斜率,截距)ᵀ 的约定，避免在推导中来回转置。

Let α label samples and j features. For a line, each sample has features (xα,1); the constant feature includes the intercept in the weight vector. Store one sample per row of X and set w=(slope, intercept)ᵀ, keeping this convention throughout.

$$
X=\begin{pmatrix}-1&1\\0&1\\1&1\end{pmatrix},\quad w=\begin{pmatrix}m\\b\end{pmatrix},\quad Xw=\begin{pmatrix}-m+b\\b\\m+b\end{pmatrix}
$$

转置把行列互换，(Xᵀ)jα=Xαj。欧几里得范数的平方是各分量平方之和，不是分量先求和再平方。例如 r=(1,−1)ᵀ 的平方长度是 2，尽管分量和为零。平方损失因此不会让正负误差相互抵消。

Transposition exchanges rows and columns: (Xᵀ)jα=Xαj. A squared Euclidean norm sums component squares, not components before squaring. For r=(1,−1)ᵀ, its squared length is 2 although its component sum is zero. Squared loss therefore does not cancel positive and negative errors.

导数表示输入小变化时函数的变化率。对 wⱼ 求偏导时，其他权重保持不变。若 zα=ΣⱼXαⱼwⱼ，则 ∂zα/∂wₖ=Xαₖ；数据 X 在训练参数求导中是常量。链式法则说，先求损失对预测的导数，再乘预测对参数的导数。

A derivative measures response to a small change. For a partial derivative in wⱼ, keep other weights fixed. If zα=ΣⱼXαⱼwⱼ, then ∂zα/∂wₖ=Xαₖ; X is constant when differentiating parameters. The chain rule multiplies the loss derivative with respect to prediction by the prediction derivative with respect to the parameter.

$$
\frac{d}{du}\frac12(u-y)^2=u-y,\quad \frac{\partial}{\partial w_k}\frac12(z_\alpha-y_\alpha)^2=(z_\alpha-y_\alpha)X_{\alpha k}
$$

梯度将所有偏导收集成列向量。它与 w 同维；不是每个样本一个分量。Hessian 则是梯度再对参数求导得到的矩阵，本章后面用它判断驻点是不是最小值。

The gradient collects all parameter partial derivatives in a column. It has the same dimension as w, rather than one entry per sample. The Hessian differentiates this gradient once more; it will distinguish minima from other stationary points.

回看 / Review: Chapter 1 #foundation: 矩阵乘法与指标 / Matrix multiplication and indices

### 直观详解 / Motivation

若三次测量不恰好落在一条直线上，两参数直线通常无法同时满足三个方程。最小二乘不要求挑两个点后忽略第三点，而是明确规定：让所有竖直残差的平方和最小。这隐含 x 坐标作为给定输入；若 x 也有显著测量误差，需要另一个统计模型。

If three measurements do not lie on a line, a two-parameter line cannot generally satisfy all three equations. Least squares does not discard one point: it minimizes all squared vertical residuals. It treats x as a given input. Significant measurement error in x requires a different statistical model.

平方惩罚使大残差更重要，因此对离群值敏感。我们在这里先解决定义明确的优化问题，不把得到一条拟合线当成物理规律被证明，也不把训练残差直接当作未来误差。

Squaring makes large residuals influential, so least squares is sensitive to outliers. Solving this optimization problem does not prove a physical law or identify future prediction error with training residuals.

### 概念详解 / Detailed concepts

线性回归的“线性”指对待估参数线性。用 (1, x, x²) 当特征会拟合一条二次曲线，但系数仍可用线性回归求。若把两个待估参数相乘，例如 abx，则不是同样的线性参数问题。

“Linear” means linear in estimated parameters. Features (1, x, x²) fit a quadratic curve but still give linear regression in the coefficients. Multiplying unknown parameters, as in abx, changes the parameter problem.

| 量 / Quantity | 大小与含义 / Size and meaning |
| --- | --- |
| X / X | P×N；数据与固定特征 / P×N; data and fixed features |
| w / w | N×1；待估参数 / N×1; estimated weights |
| y、z、r / y, z, r | P×1；标签、预测、残差 / P×1; labels, predictions, residuals |
| Xᵀr / Xᵀr | N×1；残差对特征的相关量 / N×1; residual–feature correlations |

几何上，所有可实现预测 Xw 构成 X 的列空间。最小二乘把 y 投影到这个空间，剩余 r 与空间中的每一个特征列正交。正交是内积为零；不是每个残差为零，也不是每个权重为零。

Geometrically, achievable predictions Xw form the column space of X. Least squares projects y onto that space, leaving r orthogonal to every feature column. Orthogonality means zero inner product, not zero residual at every sample or zero weights.

### 完整推导 / Complete derivation

#### 标量路线：不要略过求和

Scalar route: retain the sum

$$
L=\frac1{2P}\sum_{\alpha=1}^P\left(\sum_{j=1}^NX_{\alpha j}w_j-y_\alpha\right)^2
$$

$$
\partial_{w_k}L=\frac1P\sum_\alpha\left(\sum_jX_{\alpha j}w_j-y_\alpha\right)X_{\alpha k}
$$

令每个 k 的偏导为零，把与 w 无关的数据移到右边；由于有限求和可以换序，得到 N 个线性方程。

Set each partial derivative to zero and move the data-only term right. Finite sums can be interchanged, yielding N linear equations.

$$
\sum_j\left(\sum_\alpha X_{\alpha k}X_{\alpha j}\right)w_j=\sum_\alpha X_{\alpha k}y_\alpha
$$

#### 矩阵路线：展开二次型

Matrix route: expand the quadratic form

$$
2PL=(Xw-y)^T(Xw-y)=w^TX^TXw-2w^TX^Ty+y^Ty
$$

XᵀX 对称，故二次项的梯度为 2XᵀXw；常数 yᵀy 不贡献导数。矩阵结果应与逐分量路线完全一致。

XᵀX is symmetric, so the quadratic gradient is 2XᵀXw; yᵀy is constant. The result must agree with the component derivation.

$$
\nabla L=\frac1P X^T(Xw-y),\quad H=\frac1P X^TX
$$

任意方向 u 都满足 uᵀHu=‖Xu‖²/P≥0，所以这是凸二次问题。满列秩时只有 u=0 才等号成立，最小值唯一。实际数值计算用解线性方程、QR 或 SVD，显式逆只是纸上表达。

For any u, uᵀHu=‖Xu‖²/P≥0, so the quadratic is convex. Full column rank makes equality possible only at u=0 and the minimizer unique. Numerically use a solve, QR or SVD; the explicit inverse is primarily notation.

### 实验任务 1 / Experiment task 1

**predict**

只改变中间标签，斜率会变吗？

Does moving only the middle label change slope?

**action**

依次取 δ=0、0.6、−0.6。

Set δ=0,0.6,−0.6 in turn.

**record**

记录 m、b、半 MSE。

Record m, b and half MSE.

**explanation**

对称 x 使 Σxy 不受中间点影响，斜率保持 1；截距随标签平均值改变。

Symmetric x makes Σxy independent of the middle label; slope stays 1 while intercept follows the label mean.

### 实验任务 2 / Experiment task 2

**predict**

中间偏移加倍，误差会加倍吗？

Does doubling the middle shift double loss?

**action**

比较 δ=0.5 与 1。

Compare δ=0.5 and 1.

**record**

记录残差表与损失比。

Record residuals and the loss ratio.

**explanation**

残差随 δ 线性变化，平方损失随 δ² 变化，因而变为四倍。

Residuals scale with δ and squared loss with δ², giving a factor of four.

### 实验任务 3 / Experiment task 3

**predict**

最优点的残差应满足什么？

What should optimal residuals satisfy?

**action**

选择任一非零 δ，读出三项残差。

Choose a nonzero δ and read the three residuals.

**record**

手算 Σr 与 Σxr。

Compute Σr and Σxr by hand.

**explanation**

两者都为零，分别对应常数特征与 x 特征的正规方程，而单项残差可以非零。

Both vanish, corresponding to the constant and x feature equations; individual residuals can remain nonzero.

### 完整例题 1 / Worked example 1: 三点拟合的全部步骤 / Every step of a three-point fit

题目：x=−1,0,1，y=0,1.6,2。写出上方 X 与 y，求 m、b，再核对残差。

Problem: x=−1,0,1 and y=0,1.6,2. Form X and y, solve m, b, and check residuals.

$$
X^TX=\begin{pmatrix}2&0\\0&3\end{pmatrix},\quad X^Ty=\begin{pmatrix}2\\3.6\end{pmatrix},\quad w=\begin{pmatrix}1\\1.2\end{pmatrix}
$$

$$
z=(0.2,1.2,2.2)^T,\quad r=(0.2,-0.4,0.2)^T,\quad L=(0.04+0.16+0.04)/6=0.04
$$

检查 Xᵀr=(0,0)ᵀ，且 Hessian 的两个特征值为 2/3、1，均为正，因此解唯一。这一步把“算出数”与“确认最优”联系起来。

Check Xᵀr=(0,0)ᵀ. The Hessian eigenvalues are 2/3 and 1, both positive, establishing uniqueness as well as giving numbers.

### 完整例题 2 / Worked example 2: 非线性曲线仍可线性拟合 / A nonlinear curve with linear coefficients

题目：已知 y=a+bx²，两个点 (0,1)、(2,9)。固定特征为 1 和 x²，而不是把 b 也藏入特征。

Problem: y=a+bx² at points (0,1),(2,9). Fix features 1 and x²; do not put the unknown b into a feature.

$$
X=\begin{pmatrix}1&0\\1&4\end{pmatrix},\quad a=1,\quad 1+4b=9\Rightarrow b=2
$$

检查两个残差都为零，且两列独立。函数对 x 非线性、对 a 和 b 线性，这两个陈述没有矛盾。

Both residuals vanish and the columns are independent. Nonlinearity in x is consistent with linearity in a, b.

### 开放练习 1 / Open exercise 1

r=(2,−2,1)ᵀ、P=3 时，半 MSE 是多少？

For r=(2,−2,1)ᵀ and P=3, find half MSE.

Hint 1: 先逐项平方，不先相加。 / Square components before summing.

Hint 2: 分母是 2P。 / The denominator is 2P.

Solution:

$$
L=(4+4+1)/6=1.5
$$

残差和为 1 与这个损失不同；不能用残差和判断拟合质量。

The residual sum is 1, which is a different quantity.

### 开放练习 2 / Open exercise 2

只拟合常数 b 给标签 1,2,6，求最优 b。

Fit only a constant b to labels 1,2,6.

Hint 1: 把特征列写成三个 1。 / Use a column of three ones.

Hint 2: ∂L/∂b=Σ(b−y)/3。 / Use ∂L/∂b=Σ(b−y)/3.

Solution:

$$
3b-9=0\Rightarrow b=3
$$

残差为 2,1,−3，和为零；平均标签就是常数模型的最小二乘解。

Residuals 2,1,−3 sum to zero; the mean label minimizes constant-model loss.

### 开放练习 3 / Open exercise 3

把所有样本复制一遍，平均损失、求和损失和最优参数分别如何变化？

Duplicate every sample: what happens to mean loss, summed loss and the minimizer?

Hint 1: 样本数与平方和同时加倍。 / Both count and squared-residual sum double.

Hint 2: 先考虑不加正则项的情况。 / First consider no regularizer.

Solution:

平均损失及其梯度不变，求和损失及其梯度加倍；无正则最优参数不变。有固定 λ 的求和岭目标则改变数据项与惩罚的比例，第三章必须重新匹配尺度。

Mean loss and its gradient stay unchanged; summed loss and its gradient double. The unregularized minimizer is unchanged. A summed ridge objective with fixed λ changes the data-to-penalty ratio, requiring the scaling discussed next.

### 选择题补充解释 / Multiple-choice discussion

选择“否”把对 x 的非线性误认为对系数的非线性；固定 x² 特征后系数仍只出现一次。

“No” confuses nonlinearity in x with nonlinearity in coefficients; fixed x² features leave coefficients linear.

选择“一定”把 N 个梯度方程误当成 P 个逐点方程。正规方程只要求残差与各特征列正交。

“Always” confuses N gradient equations with P interpolation equations. Normal equations require residual–feature orthogonality.

### 章末复习 / Review

正规方程把残差正交性、梯度为零和投影几何合为一件事。第三章补足 Gram 矩阵不可逆时的处理，第六章转到样本空间。

Normal equations unite residual orthogonality, zero gradient and projection. Chapter 3 handles singular Gram matrices; Chapter 6 moves to sample space.

- 把线性于输入与线性于参数混淆。 / Confusing linearity in inputs with linearity in parameters.
- 在推导途中漏掉 1/P，却仍沿用同一学习率尺度。 / Dropping 1/P while retaining an inconsistent learning-rate scale.

- 能写出一组数据的 X、y、w。 / I can form X, y, w for a dataset.
- 能逐分量推出 Xᵀr=0。 / I can derive Xᵀr=0 componentwise.
- 能解释小残差、零梯度和逐点插值的区别。 / I can distinguish small residuals, zero gradient and interpolation.

## 3. 秩、岭回归与正则化 / Rank, ridge regression and regularization

Source: Part1/Lecture2.pdf, PDF 4, printed 6.

### 直观问题 / Intuition question

特征比样本多时，无法求逆是否意味着无法预测？

When features outnumber samples, does a failed inverse prevent prediction?

### 讲解 / Explanation

P 个外积的和最多有 P 个独立方向。缺秩表示某些参数方向未被数据约束，而不是所有预测都无意义。岭项给这些方向曲率，使解唯一，同时引入偏差。

A sum of P outer products has at most P independent directions. Rank loss means some parameter directions are unconstrained, not that every prediction is meaningless. Ridge adds curvature, making the solution unique while introducing bias.

### 必要概念 / Concepts

**秩上界 / Rank bound**

N 是包括常数特征的参数数目。P<N 保证特征 Gram 矩阵奇异；P≥N 仍可能因特征相关而奇异。

N includes the constant feature. P<N forces singularity of the feature Gram matrix; P≥N can still be singular if features are dependent.

$$
\operatorname{rank}(X^TX)\leq\min(P,N)
$$

**统一正则化尺度 / Fix the regularization scale**

本页 λ 对应讲义的求和损失。等价的平均损失要把正则项也除以 P；这里连偏置一起惩罚，以吻合讲义。

Here λ follows the notes’ summed-loss convention. An equivalent mean objective divides the penalty by P too. Bias is penalized here, matching the notes.

$$
J=\frac12\|Xw-y\|^2+\frac\lambda2\|w\|^2
$$

**偏差与泛化 / Bias and generalization**

正则化降低参数幅度，但不能保证测试误差更小。λ 应由独立验证数据选择；训练误差和泛化误差要分开报告。

Regularization reduces weight magnitude but does not guarantee smaller test error. Choose λ with independent validation data and report training and generalization errors separately.

### 公式推导 / Derivation

**加入曲率 / Add curvature**

对岭目标求导。

Differentiate the ridge objective.

$$
\nabla J=X^T(Xw-y)+\lambda w
$$

**证明正定 / Prove positive definiteness**

对任何非零向量 u，λ>0 时二次型为正。

For any nonzero u, the quadratic form is positive when λ>0.

$$
u^T(X^TX+\lambda I)u=\|Xu\|^2+\lambda\|u\|^2>0
$$

**得到唯一解 / Obtain the unique solution**

λ=0 时仍需满秩，或改用伪逆与核方法。

At λ=0, full rank is still required, or use a pseudoinverse or kernel method.

$$
w_\lambda=(X^TX+\lambda I)^{-1}X^Ty
$$

### 例题 / Worked example

**λ=2 的闭式解 / Closed form at λ=2**

XᵀX=diag(2,3)，Xᵀy=(2,3)。加入 2I 后得到 w=2/4=0.5、b=3/5=0.6。参数更小，但已不再逐点匹配原来的直线。

XᵀX=diag(2,3) and Xᵀy=(2,3). Adding 2I gives slope 2/4=0.5 and intercept 3/5=0.6. Weights shrink, but predictions no longer interpolate the original line.

### 交互模型 / Interactive model

岭项如何收缩斜率和截距

How ridge shrinks slope and intercept

### 单位、假设与边界 / Units, assumptions and limits

固定三个点 (−1,0),(0,1),(1,2)，扫描求和目标的 λ≥0。偏置也正则化；本例原本满秩，用于隔离收缩效应，不是测试集性能实验。

Fixed points (−1,0),(0,1),(1,2); vary λ≥0 in the summed objective. Bias is also regularized. This already full-rank example isolates shrinkage and is not a test-set performance experiment.

### 自测 1 / Self-check 1

P>N 是否保证 Gram 可逆？

Does P>N guarantee an invertible Gram matrix?

1. 保证 / Yes
2. 不保证 / No

Answer: 2

重复或线性相关的特征仍造成缺秩。

Repeated or dependent features still cause rank loss.

### 自测 2 / Self-check 2

平均损失加 λ‖w‖²/2 与求和损失加同一个 λ 是否等价？

Does adding the same λ penalty to mean and sum losses give equivalent objectives?

1. 是 / Yes
2. 否 / No

Answer: 2

数据项相差 P，正则项也必须同步缩放。

The data term differs by P, so the penalty must scale too.

### 自学学习目标 / Self-study goals

- 用重复特征解释秩、零空间与非唯一解。 / Explain rank, null spaces and nonunique solutions using repeated features.
- 证明 λ>0 时岭目标有唯一解。 / Prove uniqueness of the ridge solution for λ>0.
- 区分参数收缩、训练误差和泛化，并匹配正则化尺度。 / Distinguish shrinkage, training error and generalization and match regularization scales.

上一章的逆矩阵表达含有条件：X 的列必须独立。本章研究这个条件不成立时数据究竟缺少什么信息，并说明岭项额外引入了什么偏好。

The inverse expression in Chapter 2 requires independent columns. Here we identify the information missing when this fails and the extra preference imposed by ridge.

### 基础补习 / Foundation refresher

独立方向、秩和特征值 / Independent directions, rank and eigenvalues

如果一个特征列能用其他列的倍数和表示，它没有提供新的线性方向。例如两列都等于 (1,2)ᵀ，无论分别给多少权重，预测只依赖权重的和。秩计数的是独立列方向数，不是非零元素数，也不是矩阵的列数本身。

A feature column adds no new linear direction if it is a combination of others. Two identical columns (1,2)ᵀ make predictions depend only on the sum of their weights. Rank counts independent column directions, not nonzero entries or simply columns.

$$
X=\begin{pmatrix}1&1\\2&2\end{pmatrix},\quad Xu=0\text{ for }u=(1,-1)^T
$$

所有满足 Xu=0 的向量构成零空间。若 w 能得到某个预测，w+tu 对任何实数 t 都给同一预测。因此仅观察训练输出无法区别这些参数；它们在未见样本上的预测却可能不同。最小范数解或岭项是选择规则，而不是数据额外测出了该方向。

Vectors satisfying Xu=0 form the null space. If w gives a prediction, so does w+tu for any real t. Training outputs cannot distinguish these parameters, though unseen predictions may differ. Minimum norm and ridge impose selection rules; they do not create observations in the missing direction.

对称矩阵的特征向量是作用后方向不变的向量，Au=du。特征值 d 给出沿该方向的伸缩。对 Gram 矩阵 M=XᵀX，有 uᵀMu=‖Xu‖²≥0，所以其特征值不能为负；零特征值对应数据看不到的参数方向。

An eigenvector retains its direction under a matrix: Au=du, where d is the stretch. For a Gram matrix M=XᵀX, uᵀMu=‖Xu‖²≥0, so eigenvalues are nonnegative. Zero eigenvalues identify parameter directions unseen by the data.

单位矩阵 I 保持每个向量不变，故 M+λI 把每个特征值从 d 增加到 d+λ。若 λ>0，原来的零方向也有正曲率，方程可以唯一求解。这是正则化保证可逆的原因。

The identity leaves vectors unchanged, so M+λI shifts every eigenvalue d to d+λ. With λ>0 even former zero directions acquire positive curvature, giving a unique solve. This explains the invertibility guarantee.

回看 / Review: Chapter 2 #foundation: 设计矩阵、范数与梯度 / Design matrices, norms and gradients

### 直观详解 / Motivation

如果同一传感器被重复记录两次，拟合程序可以把贡献分配给任一列。程序返回某组数字不等于两组权重都可由数据单独确定。岭回归偏好整体平方幅度较小的参数；在对称重复列中，它会平均分配贡献。

If one sensor is recorded twice, a fit can assign its contribution to either column. A numerical output does not mean each weight is individually identifiable. Ridge prefers smaller total squared magnitude, distributing contribution equally across symmetric duplicates.

代价是引入偏差：即便原来可以完全拟合，惩罚权重也可能让训练残差增加。偏差是否换来更小测试误差依赖数据噪声与目标，不能仅凭“矩阵变好求”来保证。

The price is bias: penalizing weights can increase training residuals even when interpolation was possible. Whether this lowers test error depends on noise and the target, not merely an easier matrix solve.

### 概念详解 / Detailed concepts

P<N 时，N 个特征向量被放在只有 P 维的样本空间中，必然相关。但 P≥N 只是允许独立，不保证独立。重复列、常数为零的列，或由其他列组合出的列都可能使秩不足。

For P<N, N feature columns live in P-dimensional sample space and must be dependent. P≥N permits, but does not ensure, independence. Duplicated, zero or linearly combined columns can still cause rank loss.

本课件的 λ 乘在求和目标上，且偏置也被惩罚。若要让偏置不收缩，应明确用一个对角惩罚矩阵替换 I；那是另一个模型，不能把它的结果与本实验混用。

Here λ belongs to a summed objective and penalizes the bias too. Excluding the bias requires a specified diagonal penalty matrix instead of I, a different model whose results must not be mixed with this experiment.

$$
\frac{1}{2P}\|Xw-y\|^2+\frac{\lambda}{2P}\|w\|^2=\frac1P J_{\rm sum}
$$

训练集用于选参数，验证集用于选择 λ 等超参数，测试集在选择完成后评估。反复根据测试误差调 λ 会把测试集变成隐含验证集，不能再当独立检验。

Training data fit parameters; validation selects λ and other hyperparameters; test data evaluate the final choice. Repeatedly tuning λ on test error makes the test set an implicit validation set.

### 完整推导 / Complete derivation

$$
J=\tfrac12(Xw-y)^T(Xw-y)+\tfrac\lambda2w^Tw
$$

由上一章数据项梯度，再对每项 wⱼ²/2 求导，增加 λw。

Use the previous data gradient and differentiate each wⱼ²/2 to add λw.

$$
\nabla J=X^TXw-X^Ty+\lambda w=0
$$

$$
(X^TX+\lambda I)w=X^Ty
$$

对任意非零 u，下面的式子严格为正，所以 Hessian 正定，唯一驻点是全局最小值。注意论证需要 λ>0，而不是仅仅 λ≥0。

For nonzero u the next expression is strictly positive, so the Hessian is positive definite and the sole stationary point is the global minimizer. This needs λ>0, not merely λ≥0.

$$
u^T(X^TX+\lambda I)u=\|Xu\|^2+\lambda\|u\|^2>0
$$

在 M 的特征方向上，解的分母是 d+λ。小 d 方向受到更强的相对收缩；因此岭项不仅缩放一个总步长，还改变不同方向的估计。

In an eigenmode of M the solution denominator is d+λ. Small-d directions undergo stronger relative shrinkage, so ridge changes directional estimation rather than merely one overall step size.

$$
u_i^Tw_\lambda=\frac{u_i^TX^Ty}{d_i+\lambda}
$$

### 实验任务 1 / Experiment task 1

**predict**

λ 增大是否只改变斜率？

Does increasing λ change only slope?

**action**

比较 λ=0、2、10。

Compare λ=0,2,10.

**record**

记录斜率、截距、训练损失。

Record slope, intercept and training loss.

**explanation**

两项都收缩，因为两项都被惩罚；训练残差通常增大。

Both shrink because both are penalized; training residuals increase.

### 实验任务 2 / Experiment task 2

**predict**

λ→0 的结果是否连续？

Does the result approach λ=0 continuously?

**action**

从 λ=1 逐步降低到 0。

Reduce λ from 1 to 0.

**record**

检查是否趋近 w=1、b=1。

Check convergence to slope 1 and intercept 1.

**explanation**

本实验满列秩，零岭极限就是普通最小二乘；这不证明任意缺秩模型的普通逆存在。

This design has full column rank, so its zero-ridge limit is ordinary least squares. It does not establish an ordinary inverse for singular designs.

### 实验任务 3 / Experiment task 3

**predict**

较小权重是否就是更好的泛化？

Do smaller weights demonstrate better generalization?

**action**

取较大 λ，比较图中拟合与原直线。

Use a large λ and compare the fitted and original lines.

**record**

写下本页有哪些数据、没有哪些数据。

List data present and absent here.

**explanation**

只有合成训练数据，无独立验证或测试集，所以只能判断收缩与训练拟合。

Only synthetic training data are present; without validation or test data, conclusions concern shrinkage and training fit.

### 完整例题 1 / Worked example 1: 重复特征为何有无穷多个解 / Why duplicated features have infinitely many solutions

题目：一个样本 X=(1,1)，标签 2。零误差要求 w₁+w₂=2，例如 (2,0)、(1,1)、(0,2)。

Problem: one sample X=(1,1), label 2. Zero error requires w₁+w₂=2, including (2,0),(1,1),(0,2).

$$
w_1^2+w_2^2=\frac{(w_1+w_2)^2+(w_1-w_2)^2}{2}
$$

固定和为 2 时，平方范数在差为零时最小，最小范数插值解是 (1,1)。加入 λ>0 后由对称性 w₁=w₂=t，2t−2+λt=0，得到 t=2/(2+λ)，训练输出略小于 2。

At fixed sum 2, the norm is minimized by zero difference, giving the minimum-norm interpolant (1,1). With λ>0, symmetry gives equal weights t and 2t−2+λt=0, hence t=2/(2+λ); prediction is below 2.

### 完整例题 2 / Worked example 2: 对角 Gram 的岭收缩 / Ridge shrinkage with a diagonal Gram matrix

$$
M=\operatorname{diag}(2,3),\quad X^Ty=(2,3)^T,\quad\lambda=2
$$

分别解 (2+2)m=2 与 (3+2)b=3，得到 m=0.5、b=0.6。两方向原始曲率不同，因此收缩比例分别为 1/2 和 3/5，并非同一倍数。

Solve (2+2)m=2 and (3+2)b=3 to obtain m=0.5, b=0.6. Their original curvatures differ, so shrinkage factors are 1/2 and 3/5, not a common multiplier.

把结果代回正规方程即可核对。若改用平均数据损失而不缩放惩罚，参数会不同。

Substitute into the regularized normal equations to check. Switching only the data term to a mean changes the solution.

### 开放练习 1 / Open exercise 1

M=diag(0,4)，加 λ=0.5 后特征值是多少？

For M=diag(0,4), find eigenvalues after adding λ=0.5.

Hint 1: I 在每个特征方向上都是 1。 / I acts as 1 in every eigenmode.

Hint 2: 不是只改变零特征值。 / The shift applies to nonzero modes too.

Solution:

$$
d_\lambda=(0.5,4.5)
$$

两个值都正，条件数为 9；λ=0 时该矩阵不可逆。

Both are positive; the spectral condition number is 9. At λ=0 the matrix is singular.

### 开放练习 2 / Open exercise 2

样本复制两遍，求和岭目标应如何改变 λ 才保持解？

After duplicating all samples, how must summed-scale λ change to preserve the solution?

Hint 1: 数据项变成原来的两倍。 / The data term doubles.

Hint 2: 让整个目标乘同一个正数。 / Scale the whole objective by one positive constant.

Solution:

令新 λ=2λ，整个目标变为原来的两倍，最优点不变；λ 固定则相对正则化减弱。

Set new λ=2λ so the entire objective doubles and the minimizer stays fixed. Keeping λ fixed weakens relative regularization.

### 开放练习 3 / Open exercise 3

P=10、N=2 是否一定能求普通逆？构造反例。

Does P=10, N=2 guarantee an ordinary inverse? Give a counterexample.

Hint 1: 数量只是秩的上界。 / Counts give only a rank bound.

Hint 2: 令两列完全相同。 / Choose identical columns.

Solution:

取 X 两列都为全 1 列，秩为 1，M 的两行相同，故奇异。增加重复观测不能创造一个新的特征方向。

Take both columns to be all ones. Rank is 1 and M has identical rows, hence is singular. Repeating observations does not create a feature direction.

### 选择题补充解释 / Multiple-choice discussion

“保证”忽略列之间可能相关；秩条件与矩阵尺寸条件不能互换。

“Yes” ignores dependent columns; rank and size conditions are distinct.

“是”只缩放了数据项，没有缩放惩罚，改变了二者相对权重。

“Yes” rescales only the data term, changing its weight relative to the penalty.

### 章末复习 / Review

秩描述数据能约束哪些参数方向；岭项为其余方向加入选择偏好。第六章将把同一问题写成样本之间的相似度。

Rank describes directions constrained by data; ridge adds a preference in the remaining directions. Chapter 6 rewrites the problem using sample similarities.

- 认为样本多于特征就保证可逆。 / Assuming more samples than features guarantees invertibility.
- 认为岭回归保证测试误差下降，或忘记偏置是否被惩罚。 / Assuming ridge guarantees lower test error, or forgetting whether bias is penalized.

- 能构造一个 Xu=0 的非零方向。 / I can construct a nonzero direction with Xu=0.
- 能证明加 λI 后正定。 / I can prove positivity after adding λI.
- 能把求和与平均的 λ 换算一致。 / I can convert λ consistently between sum and mean losses.

## 4. 逻辑回归、似然与交叉熵 / Logistic regression, likelihood and cross-entropy

Source: Part1/Lecture3.pdf, PDF 1–3, printed 7–9.

### 直观问题 / Intuition question

如何让一个无界的线性输出表示概率？

How can an unbounded linear output represent a probability?

### 讲解 / Explanation

先对数几率建线性模型，再用 sigmoid 转成概率。最大似然把“使观察到的标签更可能”转成可微分的目标。交叉熵衡量预测分布与标签的匹配，不等于预测分布自身的熵。

Model log-odds linearly, then map through sigmoid. Maximum likelihood turns “make observed labels more probable” into a differentiable objective. Cross-entropy measures agreement with labels; it is not the prediction distribution’s own entropy.

### 必要概念 / Concepts

**Bernoulli 似然 / Bernoulli likelihood**

标签 y∈{0,1}，不同样本在给定模型后按条件独立处理。抛硬币 4 次正面、2 次反面的极大似然估计为 2/3。

Labels are y∈{0,1}; observations are treated as conditionally independent given the model. Four heads and two tails give the maximum-likelihood estimate 2/3.

$$
\mathcal L=\prod_\alpha p_\alpha^{y_\alpha}(1-p_\alpha)^{1-y_\alpha}
$$

**logit 与概率 / Logit and probability**

线性的是 logit，而不是概率本身。sigmoid 在有限输入下严格落在 0 与 1 之间。

The logit, rather than the probability, is linear. At finite input sigmoid lies strictly between 0 and 1.

$$
z=b+w\cdot x=\log\frac p{1-p},\qquad p=\frac1{1+e^{-z}}
$$

**熵与距离的边界 / Entropy and the limits of distance**

用自然对数，信息单位为 nat。H(q,p)=H(q)+D_KL(q‖p)，KL 非负但不是对称的度量。二元熵最大为 log 2；交叉熵没有这个上界。

Natural logs give information in nats. H(q,p)=H(q)+D_KL(q‖p); KL is nonnegative but not a symmetric metric. Binary entropy has maximum log 2, whereas cross-entropy is unbounded.

$$
H(p)=-\sum_i p_i\log p_i,\quad H(q,p)=-\sum_i q_i\log p_i
$$

### 公式推导 / Derivation

**取负对数 / Take the negative log**

把概率的乘积化为损失的和。

Convert the product of probabilities to a sum of losses.

$$
\ell=-y\log p-(1-y)\log(1-p)
$$

**用 logit 重写 / Rewrite in logits**

保留正负号，防止把最大化误写为最小化。实现采用稳定的 softplus。

Keep the signs consistent so minimization does not become maximization. The implementation uses stable softplus.

$$
\ell(z,y)=\log(1+e^z)-yz
$$

**链式求导 / Differentiate by the chain rule**

单样本 logit 梯度是预测减标签，参数梯度再乘特征。

The per-sample logit gradient is prediction minus label; multiply by features for parameter gradients.

$$
\frac{\partial\ell}{\partial z}=p-y,\quad\frac{\partial\ell}{\partial w_j}=(p-y)x_j
$$

### 例题 / Worked example

**错误且自信的预测 / A confident wrong prediction**

取 y=1、z=−2：p≈0.1192，ℓ=log(1+e²)≈2.1269，梯度 p−1≈−0.8808。沿负梯度增加 z 会降低损失；z=0 时 ℓ=log 2≈0.6931。

For y=1,z=−2, p≈0.1192, loss=log(1+e²)≈2.1269 and gradient≈−0.8808. Moving along the negative gradient increases z and lowers loss. At z=0, loss is log 2≈0.6931.

### 交互模型 / Interactive model

概率、损失和梯度

Probability, loss and gradient

### 单位、假设与边界 / Units, assumptions and limits

单个 Bernoulli 标签；扫描 logit z∈[−12,12]。显示无量纲概率、以 nat 计的损失与对 z 的梯度，不估计真实数据准确率。

One Bernoulli label; scan logit z∈[−12,12]. Displays dimensionless probability, loss in nats and the gradient with respect to z. It does not estimate real-data accuracy.

### 自测 1 / Self-check 1

y=1 且 p→0 时，交叉熵怎样变化？

For y=1 and p→0, what happens to cross-entropy?

1. 趋于 0 / Tends to 0
2. 无界增大 / Grows without bound
3. 止于 log 2 / Stops at log 2

Answer: 2

−log p 在 p→0 时发散。

−log p diverges as p→0.

### 自测 2 / Self-check 2

z=0、y=1 时梯度 ∂ℓ/∂z 是多少？

At z=0,y=1, what is ∂ℓ/∂z?

1. −1/2 / −1/2
2. +1/2 / +1/2

Answer: 1

sigmoid(0)=1/2，因此 p−y=−1/2。

sigmoid(0)=1/2, so p−y=−1/2.

### 自学学习目标 / Self-study goals

- 从 Bernoulli 概率写出似然和负对数似然。 / Build a Bernoulli likelihood and its negative logarithm.
- 逐步计算 sigmoid、交叉熵与 logit 梯度。 / Compute sigmoid, cross-entropy and logit gradients step by step.
- 区分熵、交叉熵和 KL，解释自信错误为何损失很大。 / Distinguish entropy, cross-entropy and KL and explain costly confident errors.

回归预测数值，分类预测标签概率。我们仍使用线性读出，但在概率解释下选择不同的输出变换和损失，为第五章的分类反传做准备。

Regression predicts values; classification predicts label probabilities. Keep a linear readout but change its output map and loss to obtain a probability model, preparing for classification backpropagation.

### 基础补习 / Foundation refresher

条件概率、似然与自然对数 / Conditional probability, likelihood and natural logarithms

概率介于 0 与 1 之间，互斥且穷尽的结果概率之和为 1。二元标签 Y 只取 0 或 1，Bernoulli 分布用一个数 p 描述：P(Y=1)=p，P(Y=0)=1−p。这里的 p 不是标签本身，也不是样本中正类所占比例的定义。

Probabilities lie between 0 and 1 and sum to 1 over exhaustive disjoint outcomes. A Bernoulli label Y is 0 or 1, with P(Y=1)=p and P(Y=0)=1−p. The parameter p is neither an observed label nor, by definition, the observed positive fraction.

P(Y=1|X=x) 表示已知输入为 x 时正类的概率；不同 x 可以有不同概率。似然则固定已观察数据，把同一个概率表达看成参数的函数。它可以比较参数，却不是“参数为真的概率”，除非额外指定先验并使用 Bayes 规则。

P(Y=1|X=x) is the positive probability given x and may vary with x. A likelihood fixes observed data and views their probability as a function of parameters. It compares parameters but is not a probability distribution over parameters without a prior and Bayes’ rule.

独立样本的联合概率相乘，小概率乘积容易极小。自然对数 log 以 e 为底，满足 log(ab)=log a+log b，且严格递增，所以最大化乘积等价于最大化对数。再取负号，便改写为最小化问题。

Independent observation probabilities multiply, often making a very small number. The natural log uses base e and obeys log(ab)=log a+log b. Because it increases strictly, maximizing a product is equivalent to maximizing its log; a minus sign converts this into minimization.

$$
p^y(1-p)^{1-y}=\begin{cases}p,&y=1\\1-p,&y=0\end{cases},\quad\frac{d}{dp}\log p=1/p
$$

几率 p/(1−p) 比较成功与失败，不同于 p。p=0.8 的几率为 4，而不是 0.8。logit 是几率的自然对数，可取任意实数。这使线性模型不必直接输出一个被限制在 [0,1] 的量。

Odds p/(1−p) compare success with failure and differ from probability. At p=0.8 the odds are 4. The logit is the logarithm of odds and can be any real number, allowing an unconstrained linear model.

回看 / Review: Chapter 2 #foundation: 偏导与链式求导 / Partial derivatives and the chain rule

### 直观详解 / Motivation

若用直线直接拟合 0/1 标签，预测可以小于 0 或大于 1，不能作为概率。把线性量解释为 logit 后，sigmoid 自动把它映射到合法范围，同时允许概率随输入平滑变化。阈值 0.5 只是将概率变成类别的一个决策规则，不是概率模型的全部。

A line fitted directly to binary labels can predict outside [0,1]. Modeling logits and applying sigmoid gives valid, smoothly varying probabilities. Thresholding at 0.5 is one decision rule, not the entire probability model.

两次分类都可能答错，但把真实类别概率预测为 0.49 与 0.001 的后果不同。交叉熵会强烈惩罚第二种自信错误，因此损失与准确率不能互相替代。

Two predictions can both be wrong while assigning true-class probabilities 0.49 and 0.001. Cross-entropy penalizes the latter much more strongly, so loss and accuracy are not interchangeable.

### 概念详解 / Detailed concepts

对事件概率 p，惊讶度定义为 −log p。确定会发生的事件为零惊讶度，很罕见的事件惊讶度很大。对真实分布 q 求平均，若用正确 q 编码得到 H(q)，若误用模型 p 得到 H(q, p)。自然对数的信息单位为 nat。

Surprisal is −log p: a certain event gives zero, and a rare event gives a large value. Averaging under a true distribution q gives H(q) when using q, or H(q, p) when using model p. Natural logs give units of nats.

$$
H(q, p)=H(q)+D_{\rm KL}(q\|p),\quad D_{\rm KL}(q\|p)=\sum_iq_i\log\frac{q_i}{p_i}
$$

当 q 固定，最小化交叉熵等价于最小化 KL。KL 非负，但不对称，也不满足一般距离的三角不等式。本章不依赖完整不等式证明来使用 BCE；至少要能直接核对两者的代数关系。

For fixed q, minimizing cross-entropy minimizes KL. KL is nonnegative but asymmetric and not a metric. Using BCE does not require the full inequality proof here, but verify the displayed algebraic identity.

二元熵在 p=0.5 时达到 log 2，这是分布自身的不确定性。对错误标签趋于确定时，交叉熵反而无界。0 log 0 的熵项按极限定义为零；真实事件概率被模型设为零时，交叉熵发散，不能把两种情况混同。

Binary entropy reaches log 2 at p=0.5, describing uncertainty within a distribution. Cross-entropy instead diverges for a confident wrong prediction. Entropy uses the limit 0 log 0=0; assigning model probability zero to an event with positive true probability gives infinite cross-entropy.

### 完整推导 / Complete derivation

从 logit 定义出发解出 p，而不是把 sigmoid 当作必须记忆的黑箱。

Solve the logit definition for p rather than treating sigmoid as a black box.

$$
e^z=p/(1-p)\Rightarrow p=e^z(1-p)\Rightarrow p=\frac{e^z}{1+e^z}
$$

$$
1-p=\frac1{1+e^z},\quad\log p=z-\log(1+e^z)
$$

在单样本负对数似然中逐项代入，两个系数 y 与 1−y 加起来为 1。

Substitute term by term into the negative log-likelihood. The coefficients y and 1−y sum to 1.

$$
\ell=-y[z-\log(1+e^z)]+(1-y)\log(1+e^z)=\log(1+e^z)-yz
$$

$$
\partial_z\ell=\frac{e^z}{1+e^z}-y=p-y,\quad \partial_z^2\ell=p(1-p)\ge0
$$

$$
z=w^Tx+b\Rightarrow\nabla_w\ell=(p-y)x,\quad\partial_b\ell=p-y
$$

大正 z 直接计算 eᶻ 会溢出。稳定实现用 max(z,0)+log(1+exp(−|z|))−yz，与原式数学等价；稳定数值计算并不改变目标。

Direct eᶻ can overflow. The equivalent stable form is max(z,0)+log(1+exp(−|z|))−yz; numerical stabilization does not change the objective.

### 实验任务 1 / Experiment task 1

**predict**

y=1 时 z 增加会如何改变损失？

For y=1, how should increasing z affect loss?

**action**

取 z=−2、0、2。

Set z=−2,0,2.

**record**

记录 p、损失与梯度符号。

Record p, loss and gradient sign.

**explanation**

p 增加、损失减小，梯度 p−1 始终为负，指示应增大 z。

p rises and loss falls; the negative gradient p−1 indicates increasing z.

### 实验任务 2 / Experiment task 2

**predict**

换标签后两条损失曲线有什么对称性？

What symmetry appears after changing the label?

**action**

将 y 从 1 换到 0，并对照 z 与 −z。

Switch y from 1 to 0 and compare z with −z.

**record**

比较 ℓ(z,1) 与 ℓ(−z,0)。

Compare ℓ(z,1) and ℓ(−z,0).

**explanation**

两者相等，因为交换二元类别相当于反转 logit。

They agree: exchanging binary classes reverses the logit.

### 实验任务 3 / Experiment task 3

**predict**

错误且非常自信时，损失与梯度都会无界吗？

Do both loss and gradient diverge for a confident error?

**action**

y=1，逐步把 z 降到 −12。

Set y=1 and reduce z to −12.

**record**

比较损失增长与梯度接近的值。

Compare loss growth with the limiting gradient.

**explanation**

损失约为 −z，无界增长；对 logit 的梯度趋于 −1，仍有界。不要把损失与其导数混为一谈。

Loss grows approximately as −z, while its logit gradient approaches −1 and stays bounded.

### 完整例题 1 / Worked example 1: 从六次投币求参数 / Estimate a parameter from six tosses

观察 4 次正面、2 次反面，假设独立且共享正面概率 p。先写指定序列的似然，不额外乘排列数，因为已给出序列。

Observe four heads and two tails, assuming independence and shared head probability p. Write the likelihood of the specified sequence without an extra combinatorial factor.

$$
\log\mathcal L=4\log p+2\log(1-p),\quad 4/p-2/(1-p)=0\Rightarrow p=2/3
$$

二阶导数为 −4/p²−2/(1−p)²<0，故为内部最大值。若只给正面个数，组合因子与 p 无关，最优点仍相同。

The second derivative is negative, establishing the interior maximum. For a count-only observation a combinatorial factor is needed, but it is independent of p and leaves the maximizer unchanged.

### 完整例题 2 / Worked example 2: 损失、梯度与一次更新 / Loss, gradient and one update

令 x=2、w=0、b=0、y=1，因此 z=0、p=0.5、损失 log 2。只更新 w，学习率 0.1。

Let x=2, w=b=0, y=1, giving z=0, p=0.5 and loss log 2. Update only w at rate 0.1.

$$
\partial_w\ell=(0.5-1)2=-1,\quad w_{\rm new}=0.1,\quad z_{\rm new}=0.2
$$

新概率约 0.5498，新损失约 0.5981，比 0.6931 小。这里必须乘特征 x，不能直接把 logit 梯度当成所有参数的梯度。

The new probability is about 0.5498 and loss about 0.5981, below 0.6931. The feature factor x is essential: the logit derivative is not every parameter derivative.

### 开放练习 1 / Open exercise 1

p=0.8 时，y=1 和 y=0 的损失分别是多少？

At p=0.8, find losses for y=1 and y=0.

Hint 1: 分别使用 −log p 与 −log(1−p)。 / Use −log p and −log(1−p).

Hint 2: 自然对数结果用 nat 表示。 / Use nats for natural logarithms.

Solution:

分别约为 0.2231 与 1.6094。概率本身不变，观察到的标签不同，负对数似然也不同。

They are approximately 0.2231 and 1.6094. The model probability is unchanged but the observed label changes its negative log-likelihood.

### 开放练习 2 / Open exercise 2

q=(0.25,0.75)、p=(0.5,0.5)，求 H(q)、H(q, p) 和 KL。

For q=(0.25,0.75), p=(0.5,0.5), find entropy, cross-entropy and KL.

Hint 1: 先按 q 加权每个对数。 / Weight each log term by q.

Hint 2: KL 等于交叉熵减熵。 / KL equals cross-entropy minus entropy.

Solution:

H(q)≈0.5623，H(q, p)=log 2≈0.6931，KL≈0.1308。交换 q 与 p 后一般不会得到同一 KL。

H(q)≈0.5623, H(q, p)=log 2≈0.6931, KL≈0.1308. Swapping q and p generally changes KL.

### 开放练习 3 / Open exercise 3

把 p=0.5 称为“最大交叉熵”有什么错误？

What is wrong with calling p=0.5 the maximum cross-entropy?

Hint 1: 固定真实标签 y=1。 / Fix true label y=1.

Hint 2: 比较 p=0.5 与 p=0.001。 / Compare p=0.5 and p=0.001.

Solution:

对应损失为 0.6931 与 6.9078，后一项更大，且 p→0 可继续增大。log 2 是二元熵上界与随机猜测的交叉熵基线，不是交叉熵上界。

Losses are 0.6931 and 6.9078, and grow further as p→0. log 2 is the binary-entropy maximum and the uniform-prediction cross-entropy baseline, not a cross-entropy maximum.

### 选择题补充解释 / Multiple-choice discussion

“趋零”适用于预测正确且自信；“止于 log 2”把熵上界误用于交叉熵。

“Zero” describes correct confident predictions; “log 2” incorrectly transfers an entropy bound to cross-entropy.

正的 1/2 对应相反标签 y=0；本题 p−y=0.5−1。

Positive 1/2 corresponds to y=0; here p−y=0.5−1.

### 章末复习 / Review

概率模型确定似然，取负对数确定损失，再经链式法则给出参数梯度。这条路线将在第五章扩展到多层网络。

A probability model defines likelihood, negative logarithms define loss, and the chain rule gives parameter gradients. Chapter 5 extends this route to multilayer networks.

- 遗漏负号，沿增加负对数似然的方向更新。 / Dropping the minus sign and ascending negative log-likelihood.
- 把概率、几率、logit 和分类阈值当成一个量。 / Treating probability, odds, logit and a classification threshold as one quantity.

- 能由 logit 定义解出 sigmoid。 / I can derive sigmoid from log-odds.
- 能逐项推导 ℓ=softplus(z)−yz。 / I can derive ℓ=softplus(z)−yz term by term.
- 能解释熵和交叉熵不同的上界性质。 / I can explain the different boundedness of entropy and cross-entropy.

## 5. 梯度下降与反向传播 / Gradient descent and backpropagation

Source: Part1/Lecture4.pdf, PDF 1–3, printed 10–12.

### 直观问题 / Intuition question

参数有上百万个，怎样避免每个参数重新跑一次网络？

With millions of parameters, how can we avoid rerunning the network for each derivative?

### 讲解 / Explanation

前向计算缓存中间激活，反向计算把损失对输出的敏感度逐层传回。一次反向扫过计算图就能复用局部导数，通常只需常数倍前向计算量。

The forward pass caches activations; the backward pass propagates loss sensitivity from outputs to earlier layers. One reverse sweep reuses local derivatives, typically costing a constant multiple of a forward evaluation.

### 必要概念 / Concepts

**损失与更新 / Loss and update**

梯度下降是参数更新规则，反向传播是计算梯度的方法；两者职责不同。小步长沿负梯度局部降低可微损失。

Gradient descent updates parameters; backpropagation computes gradients. They are distinct operations. A sufficiently small negative-gradient step locally decreases a differentiable loss.

$$
\theta_{t+1}=\theta_t-\eta\nabla_\theta L
$$

**输出误差 / Output error**

平方误差对输出的导数为 z−y；softmax 与交叉熵配对也给 q−y。softmax 用减去最大 logit 的实现避免溢出。

Squared error gives output derivative z−y. Softmax paired with cross-entropy gives q−y. Subtracting the largest logit before exponentiation avoids overflow.

$$
q_i=\frac{e^{z_i}}{\sum_j e^{z_j}},\quad \delta_i^{(L)}=q_i-y_i
$$

**隐藏层误差 / Hidden-layer error**

反向传播是链式法则。对逐元素激活，先乘转置权重再乘激活导数；ReLU 的零点要选择次梯度约定。

Backpropagation is the chain rule. For pointwise activations, multiply by transposed weights and then activation derivatives. ReLU requires a subgradient convention at zero.

$$
\delta^{(\ell)}=\big((W^{(\ell+1)})^T\delta^{(\ell+1)}\big)\odot\sigma'(z^{(\ell)})
$$

### 公式推导 / Derivation

**定义标量网络 / Define a scalar network**

对单个样本选择光滑 tanh 激活与半平方损失。

Use smooth tanh and half squared loss for one sample.

$$
h=\tanh(wx+b),\quad z=vh+c,\quad \ell=(z-y)^2/2
$$

**从输出传回 / Propagate backward**

令 e=z−y，则先求输出层与隐藏层的敏感度。

Let e=z−y, then compute output and hidden sensitivities.

$$
\partial_v\ell=eh,\quad\partial_c\ell=e,\quad\partial_h\ell=ev
$$

**得到首层梯度 / Obtain the first-layer gradient**

tanh′=1−tanh²；w 与 b 的局部导数分别为 x 和 1。

tanh′=1−tanh²; the local derivatives for w and b are x and 1.

$$
\partial_w\ell=ev(1-h^2)x,\quad\partial_b\ell=ev(1-h^2)
$$

### 例题 / Worked example

**一个可手算的反传 / A hand-checkable backward pass**

w=0、y=1 时，h=z=0、e=−1。故 ∂wℓ=−1、∂bℓ=−1、∂vℓ=0、∂cℓ=−1。η=0.1 时若只更新 w，则 w 变成 0.1。

At w=0,y=1, h=z=0 and e=−1. Thus ∂wℓ=−1, ∂bℓ=−1, ∂vℓ=0 and ∂cℓ=−1. Updating only w at η=0.1 makes w=0.1.

### 交互模型 / Interactive model

链式导数与有限差分

Chain-rule derivative and finite difference

### 单位、假设与边界 / Units, assumptions and limits

固定 x=1、b=0、v=1、c=0，改变 w 和标签 y。解析梯度与中心差分 h=10⁻⁵ 比较；这是小型数值核验，不是训练精度测量。

Fix x=1,b=0,v=1,c=0; change w and label y. Compare the analytic gradient with a central difference at h=10⁻⁵. This checks a small numerical example, not training accuracy.

### 自测 1 / Self-check 1

反向传播是否等于梯度下降？

Is backpropagation the same as gradient descent?

1. 是 / Yes
2. 否 / No

Answer: 2

前者算梯度，后者用梯度更新。

One computes gradients; the other uses them for updates.

### 自测 2 / Self-check 2

tanh 饱和时 1−h² 很小，会怎样？

What happens when tanh saturates and 1−h² is small?

1. 传回的梯度可能变小 / Backward gradients may shrink
2. 梯度必定变大 / Gradients must grow

Answer: 1

局部导数因子会压缩敏感度。

The local derivative factor reduces sensitivity.

### 自学学习目标 / Self-study goals

- 沿计算图从输出反向求每个局部导数。 / Differentiate backward through a computational graph.
- 手算一个多神经元网络的前向和反向传播。 / Evaluate forward and backward passes in a multi-neuron network.
- 检查梯度维数，并用有限差分判断实现错误。 / Check gradient dimensions and use finite differences to detect mistakes.

第四章给出损失对 logit 的导数，本章把它传回每层权重。反向传播本身不选择学习率，也不改变参数；算完梯度后优化器才更新参数。

Chapter 4 gave derivatives with respect to logits. Now propagate them to every weight. Backpropagation neither selects a learning rate nor updates parameters; an optimizer acts afterward.

### 基础补习 / Foundation refresher

链式法则、计算图与局部敏感度 / Chain rule, computation graphs and local sensitivity

若 u=g(w)、L=f(u)，w 的变化先影响 u，再影响 L。因此 dL/dw=(dL/du)(du/dw)。例如 u=2w+1、L=u²/2，在 w=1 时 u=3，导数是 3×2=6，而不是只取 3 或 2。链上的每条依赖关系都必须计算。

If u=g(w), L=f(u), changes in w affect u and then L, giving dL/dw=(dL/du)(du/dw). For u=2w+1, L=u²/2 at w=1, u=3 and the derivative is 3×2=6, not 3 or 2. Every dependency on the path matters.

如果一个变量沿两条路径影响损失，各路径贡献必须相加。计算图的节点保存运算结果，有向边表示依赖。前向按依赖顺序算节点，反向按相反顺序累加敏感度。共享参数在多个样本或位置使用时，贡献也要累加。

When a variable affects loss along two paths, add their contributions. Graph nodes store operation results and directed edges encode dependencies. Evaluate nodes forward in dependency order and accumulate sensitivities in reverse. Shared parameters also collect contributions from all their uses.

$$
L=f(u_1(w), u_2(w))\Rightarrow\frac{dL}{dw}=\frac{\partial L}{\partial u_1}\frac{du_1}{dw}+\frac{\partial L}{\partial u_2}\frac{du_2}{dw}
$$

向量到向量的导数可写成 Jacobian，元素 Jij=∂zᵢ/∂hⱼ。反向传播通常无需存完整 Jacobian：只需把已知的损失梯度乘上它的转置。梯度传回输入时用转置，是由指标收缩方向决定，不是可任选的记号。

A vector-to-vector derivative is a Jacobian Jij=∂zᵢ/∂hⱼ. Backprop usually avoids storing the whole matrix, applying its transpose to a known loss gradient instead. The transpose follows from index contraction, not an optional notation.

ReLU 在零点不可微；实现必须约定取哪个次梯度。本章完整手算用激活前值严格为正或光滑 tanh，避开这个约定点。有限差分也应避免跨越折点，否则解析次梯度和差分可能合理地不一致。

ReLU is nondifferentiable at zero, requiring a subgradient convention. Worked examples use positive preactivations or smooth tanh. Finite-difference checks should also avoid kinks, where a chosen subgradient and a crossing difference can legitimately disagree.

回看 / Review: Chapter 1 #foundation: 网络维数与前向计算 / Network dimensions and forward evaluation; Chapter 2 #foundation: 偏导与梯度 / Partial derivatives and gradients; Chapter 4 #foundation: 分类损失与 logit / Classification losses and logits

### 直观详解 / Motivation

逐个参数扰动需要许多次前向计算。反向方法从一个标量损失出发，只传播“这个中间量多一点会让损失变多少”。一层的结果被后续层复用，局部敏感度也能复用，节省的是重复计算而不是省略链式法则。

Perturbing each parameter requires many forward evaluations. Reverse mode starts from one scalar loss and propagates how a small change to each intermediate affects it. Reusing intermediates and sensitivities eliminates repeated work without omitting the chain rule.

梯度大不代表该参数的物理重要性一定更高，它还依赖尺度、损失归一化和参数化。检查时先看数值导数与解析导数是否一致，再讨论优化速度。

Large gradients do not automatically mean greater physical importance; scale, normalization and parameterization matter. First verify analytic derivatives against numerical ones, then discuss optimization speed.

### 概念详解 / Detailed concepts

$$
z=Wh+b,\quad\delta_z=\nabla_zL\Rightarrow\nabla_WL=\delta_z h^T,\quad\nabla_bL=\delta_z,\quad\nabla_hL=W^T\delta_z
$$

若 W 为 m×n，则 δz 为 m×1，δzhᵀ 为 m×n，与 W 同形；Wᵀδz 为 n×1，与 h 同形。外积产生权重梯度，内侧收缩产生传回前层的梯度。

For W of size m×n, δz is m×1, δzhᵀ is m×n like W, and Wᵀδz is n×1 like h. The outer product gives weight gradients; contraction gives input gradients.

$$
h_i=\sigma(z_i)\Rightarrow\delta_{z_i}=\delta_{h_i}\sigma'(z_i)
$$

单样本损失先得到各参数梯度，再按训练目标求和或取平均。若损失定义为平均，反向得到的批梯度也必须除以 P。softmax 配交叉熵时 δ=q−y；平方损失时 δ=z−y，不能随意交换。

Compute per-sample gradients and sum or average according to the objective. A mean loss requires division by P. Softmax with cross-entropy gives δ=q−y; squared loss gives δ=z−y. They are not interchangeable.

### 完整推导 / Complete derivation

对原实验的标量链 w→a=wx+b→h=tanh a→z=vh+c→L，先缓存 a, h, z，再从 L 开始反传。

For the scalar chain w→a=wx+b→h=tanh a→z=vh+c→L, cache a, h, z and differentiate backward.

$$
e=z-y,\quad\partial_zL=e,\quad\partial_vL=eh,\quad\partial_cL=e
$$

$$
\partial_hL=ev,\quad\partial_aL=ev(1-h^2)
$$

$$
\partial_wL=ev(1-h^2)x,\quad\partial_bL=ev(1-h^2)
$$

多层时相同规则反复应用。对每个隐藏层，先把后层误差乘转置权重，再逐元素乘激活导数。

For multiple layers repeat the same rule: multiply the later error by transposed weights and then apply the activation derivative elementwise.

$$
\delta^{(\ell)}=((W^{(\ell+1)})^T\delta^{(\ell+1)})\odot\sigma'(z^{(\ell)})
$$

中心差分比较 L(w+h) 与 L(w−h)，两次完整评估中只改变同一个参数。h 过大有截断误差，过小有相消舍入；差异小是实现核对证据，不是所有输入上正确的证明。

A central difference evaluates L(w+h) and L(w−h), perturbing only the same parameter. Large h gives truncation error; tiny h gives cancellation. Agreement is a local implementation check, not proof for every input.

$$
g_{\rm FD}=\frac{L(w+h)-L(w-h)}{2h}
$$

### 实验任务 1 / Experiment task 1

**predict**

w=0、y=1 时导数是什么符号？

What is the gradient sign at w=0, y=1?

**action**

重置并比较解析值与差分值。

Reset and compare analytic and finite-difference values.

**record**

记下输出、梯度与绝对差。

Record output, gradient and absolute difference.

**explanation**

梯度为 −1，两个算法应接近；沿负梯度应增大 w。

The gradient is −1; both calculations should agree, indicating an increase in w.

### 实验任务 2 / Experiment task 2

**predict**

tanh 饱和能否造成小梯度？

Can tanh saturation suppress gradients?

**action**

保持 y=0，比较 w=0.5 与 4。

Keep y=0 and compare w=0.5 with 4.

**record**

比较输出变化和梯度幅度。

Compare output response and gradient magnitude.

**explanation**

饱和时 1−h² 很小，即便输出误差不为零，首层梯度仍可能很小。

In saturation 1−h² is small, so first-layer gradients can be small despite nonzero output error.

### 实验任务 3 / Experiment task 3

**predict**

标签等于预测时会怎样？

What happens when label matches prediction?

**action**

取 w=0，依次选 y=−1、0、1。

At w=0 choose y=−1,0,1.

**record**

记录梯度符号是否翻转。

Record whether gradient sign reverses.

**explanation**

误差 e 控制方向；匹配时梯度为零，标签越过预测时方向翻转。

The error e controls direction: matching gives zero, and crossing the prediction reverses the gradient.

### 完整例题 1 / Worked example 1: 一个标量链的全部梯度 / All gradients of a scalar chain

令 x=1, w=b=c=0, v=1, y=1。前向 a=h=z=0，损失 1/2。逐层局部导数为 e=−1、∂z/∂h=1、tanh′(0)=1。

Take x=1, w=b=c=0, v=1, y=1. The forward pass gives a=h=z=0 and loss 1/2. Local factors are e=−1,∂z/∂h=1, tanh′(0)=1.

$$
(\partial_wL,\partial_bL,\partial_vL,\partial_cL)=(-1,-1,0,-1)
$$

只更新 w 与同时更新三个非零梯度参数会产生不同的新输出。核对时应明确比较的是同一种更新规则，不能把梯度算法与更新范围混在一起。

Updating only w differs from updating all three nonzero-gradient parameters. A comparison must specify the update rule and which parameters move.

### 完整例题 2 / Worked example 2: 两个隐藏神经元的矩阵反传 / Matrix backpropagation with two hidden neurons

取 x=(1,2)ᵀ，W₁=I、b₁=0，ReLU 隐藏层，输出权重 v=(1,−1)ᵀ、c=0，目标 y=0。两个预激活均为正，所以激活导数均为 1。

Let x=(1,2)ᵀ, W₁=I, b₁=0, hidden ReLU, output weights v=(1,−1)ᵀ, c=0, y=0. Both preactivations are positive, so activation derivatives are 1.

$$
h=(1,2)^T,\quad z=-1,\quad e=-1,\quad\nabla_vL=eh=(-1,-2)^T
$$

$$
\delta_1=ev=(-1,1)^T,\quad\nabla_{W_1}L=\delta_1x^T=\begin{pmatrix}-1&-2\\1&2\end{pmatrix}
$$

偏置梯度为 δ₁，输出偏置梯度为 −1。检查 W₁ 的梯度仍为 2×2；扰动 W₁ 的第一行第一列 h，损失应变化约 −h。

The hidden bias gradient is δ₁ and output bias gradient is −1. The weight gradient is 2×2; perturbing its first entry by h should change loss by about −h.

### 开放练习 1 / Open exercise 1

z=3w+2，L=z²/2，w=0 时 dL/dw 是多少？

For z=3w+2, L=z²/2, w=0, find dL/dw.

Hint 1: 先算 z，再乘局部斜率。 / Evaluate z then multiply local slope.

Hint 2: dL/dz=z，dz/dw=3。 / Use dL/dz=z and dz/dw=3.

Solution:

$$
dL/dw=2\cdot3=6
$$

### 开放练习 2 / Open exercise 2

一个参数在两条路径上各贡献 2 和 −0.5，如何合并？

A shared parameter has path contributions 2 and −0.5. How are they combined?

Hint 1: 多元链式法则对路径求和。 / The multivariable chain rule adds paths.

Hint 2: 不要相乘两个完整路径贡献。 / Do not multiply whole-path contributions.

Solution:

梯度为 1.5。反向累加器应加上各次使用的贡献，否则共享权重会算错。

The gradient is 1.5. The reverse accumulator adds contributions from every use of a shared weight.

### 开放练习 3 / Open exercise 3

W 为 3×2，h 为 2×1，损失为标量；写出三个梯度的维数。

For W of size 3×2, h of size 2×1 and scalar loss, give gradient dimensions.

Hint 1: 参数梯度与对应参数同形。 / A gradient has the parameter’s shape.

Hint 2: 用 δhᵀ 与 Wᵀδ 检查。 / Check δhᵀ and Wᵀδ.

Solution:

∇WL 为 3×2，∇bL 为 3×1，∇hL 为 2×1。δ 为 3×1，外积与转置收缩分别给出这些维数。

∇WL is 3×2,∇bL is 3×1,∇hL is 2×1. With δ of size 3×1, the outer product and transpose contraction give these shapes.

### 选择题补充解释 / Multiple-choice discussion

“是”混淆求导与更新；反传也可被 Adam 等其他优化器使用。

“Yes” confuses differentiation with updating; Adam and other optimizers also use backprop.

“必定变大”忽略 1−h² 因子的抑制，梯度还取决于误差与权重。

“Must grow” ignores suppression by 1−h²; errors and weights also affect gradients.

### 章末复习 / Review

反传计算梯度，优化器使用梯度。第七章研究更新步长，第九章研究批采样，第十三章研究如何累计梯度历史。

Backprop computes gradients; optimizers use them. Chapter 7 studies rates, Chapter 9 batch sampling and Chapter 13 gradient history.

- 忘记乘输入或激活导数，或忘记共享路径贡献求和。 / Omitting inputs, activation derivatives or sums over shared paths.
- 在计算完所有梯度前就原地更新权重，导致各梯度来自不同状态。 / Updating weights before all gradients are computed, mixing parameter states.

- 能画出标量计算图并标每条局部导数。 / I can annotate a scalar computation graph.
- 能计算 δhᵀ 并检查维数。 / I can compute δhᵀ and check dimensions.
- 能解释差分核对失败的几种原因。 / I can explain several causes of failed finite-difference checks.

## 6. 核回归、插值与泛化 / Kernel regression, interpolation and generalization

Source: Part1/Lecture5.pdf, PDF 1–3, printed 13–15.

### 直观问题 / Intuition question

能否只计算样本的相似度，而不显式存储所有特征？

Can we use sample similarities without explicitly storing every feature?

### 讲解 / Explanation

原始形式在特征空间求解，核形式在样本空间求解。过参数化时，样本 Gram 矩阵有机会满秩，即使特征 Gram 矩阵必然缺秩。训练集插值与测试集泛化仍是两个问题。

The primal solves in feature space; the kernel form solves in sample space. In overparameterized settings the sample Gram matrix may have full rank even when the feature Gram matrix cannot. Training interpolation and test generalization remain separate questions.

### 必要概念 / Concepts

**两个 Gram 矩阵 / Two Gram matrices**

核是特征内积，满足半正定性。对新样本构造与训练集的相似度向量。

A kernel is a feature inner product and is positive semidefinite. For a new sample form its similarity vector against training data.

$$
M=X^TX\in\mathbb R^{N\times N},\quad K=XX^T\in\mathbb R^{P\times P}
$$

**原始—对偶恒等式 / Primal–dual identity**

λ>0 时恒等式合法；λ→0 的满行秩极限给最小范数插值解，不能先假定一个不存在的逆。

For λ>0 the identity is valid. Its λ→0 full-row-rank limit gives the minimum-norm interpolant; do not start by assuming a nonexistent inverse.

$$
(X^TX+\lambda I)^{-1}X^T=X^T(XX^T+\lambda I)^{-1}
$$

**双下降与 NTK 的边界 / Limits of double descent and NTK**

讲义双下降图是定性现象，不是所有数据的定理。NTK 是后续部分的预告，当前材料没有完整推导；本实验使用 Gaussian 核，不是 NTK 训练复现。

The notes’ double-descent sketches describe a qualitative phenomenon, not a theorem for all data. NTK is a preview without a full derivation here. This experiment uses a Gaussian kernel and does not reproduce NTK training.

### 公式推导 / Derivation

**对偶系数 / Dual coefficients**

设权重处于训练特征张成空间 w=Xᵀa。

Take weights in the span of training features, w=Xᵀa.

$$
(K+\lambda I)a=y
$$

**核预测 / Kernel prediction**

仅用新点与训练点的内积即可读出预测。

Only inner products between the new point and training points are needed.

$$
f(x_*)=k_*^T(K+\lambda I)^{-1}y
$$

**训练点插值 / Training interpolation**

λ=0 且 K 可逆时才得到精确标签；重复输入配冲突标签无法插值。

Exact labels follow only at λ=0 with invertible K. Duplicate inputs with conflicting labels cannot be interpolated.

$$
f_A=KK^{-1}y=y
$$

### 例题 / Worked example

**会记忆不等于会外推 / Memorization does not imply extrapolation**

λ=0、ℓ=0.7 时三个互异输入的 Gaussian 核可逆，因此 f(−1)=1、f(0)=0、f(1)=1。远离这三点时 k*→0，预测趋于 0，而目标 x² 增长；精确训练拟合未保证外推。

With λ=0 and ℓ=0.7, the Gaussian Gram matrix of these distinct inputs is invertible, so predictions at −1,0,1 are 1,0,1. Far away, k*→0 and prediction tends to zero while x² grows. Exact training fit does not guarantee extrapolation.

### 交互模型 / Interactive model

核宽度与训练点之外的预测

Kernel width and predictions away from data

### 单位、假设与边界 / Units, assumptions and limits

固定三点 x=−1,0,1、y=x²。k(x,x′)=exp[−(x−x′)²/(2ℓ²)]，ℓ 与坐标同为无量纲；λ 是求和尺度的岭项。虚线 x² 只是已知教学目标，不代表真实测试分布。

Three points x=−1,0,1 with y=x². k(x,x′)=exp[−(x−x′)²/(2ℓ²)] with dimensionless ℓ and coordinates; λ is a summed-scale ridge penalty. Dashed x² is a known teaching target, not a real test distribution.

### 自测 1 / Self-check 1

训练误差为零能证明泛化好吗？

Does zero training error prove good generalization?

1. 能 / Yes
2. 不能 / No

Answer: 2

未见样本的分布和目标还需独立检验。

Unseen samples and their distribution require independent evaluation.

### 自测 2 / Self-check 2

P<N 保证 K 可逆吗？

Does P<N guarantee invertibility of K?

1. 不保证 / No
2. 保证 / Yes

Answer: 1

样本特征仍可能相关或重复。

Sample feature vectors may still be dependent or duplicated.

### 自学学习目标 / Self-study goals

- 区分特征 Gram 与样本 Gram 的维数和秩。 / Distinguish dimensions and ranks of feature and sample Gram matrices.
- 用相同数据手算原始与核形式预测。 / Compute primal and kernel predictions on the same data.
- 说明插值所需条件，识别泛化与双下降叙述的边界。 / State interpolation conditions and the limits of generalization and double-descent claims.

第三章用正则化处理缺秩。本章换一个计算视角：参数空间太大时，可以先在样本空间求系数。改变表达形式不增加数据，也不自动消除泛化误差。

Chapter 3 handled singularity through regularization. Now change computational viewpoint: solve in sample space when parameter space is large. Re-expression adds neither data nor a guarantee of generalization.

### 基础补习 / Foundation refresher

内积、相似度和两种空间 / Inner products, similarity and two spaces

两个同维向量的内积是对应分量乘积之和。内积越大可能表示方向更接近，也可能只是向量更长；未经归一化的内积不是纯角度。特征映射 φ 把原始输入变成向量，核函数 k(x, x′)=φ(x)ᵀφ(x′) 比较的是映射后的数据。

The inner product sums corresponding component products. A large value can mean closer directions or simply greater lengths; an unnormalized inner product is not purely angular. A feature map φ converts inputs to vectors and k(x, x′)=φ(x)ᵀφ(x′) compares those mapped representations.

$$
\phi(x)=(1, x)^T\Rightarrow k(x, x')=1+xx'
$$

X 的行是样本特征。XᵀX 比较特征列，在 N 维参数空间作用；XXᵀ 比较样本行，在 P 维样本空间作用。两个矩阵一般不等大，但非零特征值相同。它们拥有不同的零空间，所以一个奇异时另一个可能可逆。

Rows of X are sample features. XᵀX compares feature columns and acts in N-dimensional parameter space; XXᵀ compares sample rows and acts in P-dimensional sample space. Sizes usually differ, but nonzero eigenvalues agree. Their null spaces differ, so one may be invertible while the other is singular.

核矩阵必须对称半正定。任意实系数 c 都要满足 cᵀKc≥0；对内积核，这是 ‖Σαcαφ(xα)‖²。随便指定一张“相似度表”不一定满足这个条件，也不一定能对应特征内积。

A kernel matrix is symmetric positive semidefinite: cᵀKc≥0 for every real c. For an inner-product kernel this equals ‖Σαcαφ(xα)‖². An arbitrary similarity table need not satisfy this condition.

$$
c^TKc=\left\|\sum_\alpha c_\alpha\phi(x_\alpha)\right\|^2\ge0
$$

本实验选 Gaussian 核。它相似于局部邻域：距离远大于 ℓ 时相似度很小，距离为零时为 1。ℓ 是相似性长度，不是学习率。即使没有显式列出特征向量，也可直接计算 Gram 矩阵与预测。

The experiment uses a Gaussian kernel: similarity is small at distances much larger than ℓ and equals 1 at zero distance. ℓ is a similarity length, not a learning rate. Predictions can be computed without explicitly listing the feature vectors.

回看 / Review: Chapter 2 #foundation: 设计矩阵和转置 / Design matrices and transpose; Chapter 3 #foundation: 秩与零空间 / Rank and null spaces

### 直观详解 / Motivation

如果只有几十个样本却有很多特征，求 N×N 方程可能比求 P×P 方程更昂贵。核表达把训练标签的影响系数放在样本上；预测时再根据新点与训练点的相似度加权。系数未必为正，故这种加权不是概率平均。

With few samples and many features, an N×N solve may cost more than a P×P solve. Kernel coefficients attach influence to training labels, and new predictions combine sample similarities. Coefficients may be negative, so this is not necessarily a probability-weighted average.

样本很多时 P×P 也会昂贵；核方法没有消除存储与求解成本。本章只介绍等价表达，不把它当作任何规模都更快的通用替代。

For many samples a P×P matrix is expensive too. Kernel methods do not eliminate storage or solving costs; this is an equivalent formulation, not an always-faster replacement.

### 概念详解 / Detailed concepts

P<N 时若 X 满行秩，K 可逆，可找到训练插值的最小范数权重。重复输入、依赖特征或冲突标签会破坏条件。参数多只是允许插值，不保证插值。

When P<N and X has full row rank, K is invertible and gives minimum-norm interpolating weights. Duplicate inputs, dependent features or conflicting labels can break this. Overparameterization permits, rather than guarantees, interpolation.

训练误差衡量已参与选择参数的点，泛化误差涉及未见分布。图中虚线 x² 是明确给定的教学目标，能比较本例误差，但不能把这三个点的结果外推到所有自然数据。

Training error concerns points used to choose parameters; generalization concerns unseen distributions. The dashed x² curve is a specified teaching target for this example, not evidence about all natural data.

双下降是某些模型在接近插值阈值时误差先升后降的现象，依赖特征谱、噪声、样本和正则化。NTK 仅是原稿对后续部分的预告；Gaussian 核并非自动等于任意网络的 NTK。

Double descent occurs in some models when error rises and falls around an interpolation threshold, depending on feature spectra, noise, data and regularization. NTK is only a later-topic preview; the Gaussian kernel is not automatically a network’s NTK.

### 完整推导 / Complete derivation

先取 λ>0，以保证下面两种逆都存在；不要从一个不可逆的特征 Gram 的逆开始。

Start with λ>0 so both inverses exist rather than assuming an inverse of a singular feature Gram matrix.

$$
(X^TX+\lambda I_N)X^T=X^T(XX^T+\lambda I_P)
$$

$$
(X^TX+\lambda I_N)^{-1}X^T=X^T(K+\lambda I_P)^{-1}
$$

令 a=(K+λI)⁻¹y，原始权重就是 Xᵀa。对新点用其特征行乘权重，内积组合成核向量。

Set a=(K+λI)⁻¹y; primal weights are Xᵀa. Multiplying by a new feature row collects inner products into the kernel vector.

$$
f(x_*)=\phi(x_*)^TX^Ta=k_*^Ta
$$

$$
f_A=K(K+\lambda I)^{-1}y
$$

满行秩时令 λ→0，训练预测变成 y。对应 w=XᵀK⁻¹y 与零空间正交，因此是在所有插值参数中范数最小的一个；这只选择参数，不证明未见点准确。

With full row rank, λ→0 gives training predictions y. The weights XᵀK⁻¹y are orthogonal to the null space, hence minimum norm among interpolants. This selects parameters without proving unseen accuracy.

### 实验任务 1 / Experiment task 1

**predict**

λ=0 时改变 ℓ 会破坏三个训练点插值吗？

At λ=0, does changing ℓ destroy interpolation here?

**action**

比较 ℓ=0.3、0.7、1.5。

Compare ℓ=0.3,0.7,1.5.

**record**

记录训练点和 x=2 处的曲线。

Record behavior at training points and x=2.

**explanation**

互异输入的 Gaussian Gram 在这些参数下可逆，训练点仍匹配；外部曲线却显著不同。

The Gaussian Gram is invertible for these distinct inputs, preserving training fit while changing outside predictions.

### 实验任务 2 / Experiment task 2

**predict**

加入岭项后是否还精确插值？

Does ridge preserve exact interpolation?

**action**

固定 ℓ=0.7，把 λ 从 0 调至 1。

Fix ℓ=0.7 and increase λ from 0 to 1.

**record**

观察 x=0 和 x=±1 附近。

Observe x=0 and x=±1.

**explanation**

正则化通常牺牲精确标签匹配，换取较小系数；不能再使用 KK⁻¹y=y。

Regularization generally sacrifices exact label matching for smaller coefficients; KK⁻¹y=y no longer applies.

### 实验任务 3 / Experiment task 3

**predict**

很窄的核如何填补样本之间的空隙？

How does a narrow kernel behave between samples?

**action**

取最小 ℓ，观察三个训练点之间和之外。

Choose the smallest ℓ and examine gaps and extrapolation.

**record**

把预测与虚线目标的差异画下来。

Sketch differences from the target.

**explanation**

局部相似度迅速衰减，训练点之外可能接近零；记住三个值不等于学会整个 x² 函数。

Local similarities decay quickly, allowing predictions near zero away from data; memorizing three values does not recover the whole x² function.

### 完整例题 1 / Worked example 1: 原始与对偶表达给同一预测 / Primal and dual give the same prediction

取训练输入 0,1，特征 (1, x)，标签 1,3，λ=0。先直接解截距与斜率得 w=(1,2)ᵀ。

Take inputs 0,1, features (1, x), labels 1,3,λ=0. Directly solve intercept and slope to obtain w=(1,2)ᵀ.

$$
K=\begin{pmatrix}1&1\\1&2\end{pmatrix},\quad K^{-1}=\begin{pmatrix}2&-1\\-1&1\end{pmatrix},\quad a=K^{-1}y=(-1,2)^T
$$

$$
x_*=2:\quad k_*=(1,3)^T,\quad f=k_*^Ta=-1+6=5
$$

原始形式也给 1+2×2=5。负系数 −1 没有违反概率规则，因为 a 不是概率。

The primal also gives 1+2×2=5. The coefficient −1 is valid because a is not a probability.

### 完整例题 2 / Worked example 2: 多个参数、一个样本的最小范数解 / Minimum norm with one sample and several weights

取 X=(1,1)、y=2，K=2。核解 a=1，w=Xᵀa=(1,1)ᵀ，训练输出为 2。

Take X=(1,1), y=2, K=2. Then a=1, w=Xᵀa=(1,1)ᵀ and the training output is 2.

$$
X^TX=\begin{pmatrix}1&1\\1&1\end{pmatrix}\text{ is singular},\qquad XX^T=(2)\text{ is invertible}
$$

对新特征 (1,−1)，预测为 0；另一个插值解 w=(2,0) 则预测 2。训练数据无法决定哪个预测接近真实目标。

A new feature vector (1,−1) gets prediction 0; another interpolant w=(2,0) predicts 2. Training data alone do not decide which is closer to the unknown target.

### 开放练习 1 / Open exercise 1

φ(x)=(1, x)，计算 k(2,3)、k(2,2)。

For φ(x)=(1, x), compute k(2,3) and k(2,2).

Hint 1: 展开特征内积。 / Expand the feature inner product.

Hint 2: 不要把核误当距离。 / Do not treat the kernel as a distance.

Solution:

分别为 7 和 5。自相似度不一定为 1；Gaussian 核的单位对角是它自己的性质。

The values are 7 and 5. Self-similarity need not equal 1; the unit diagonal is a property of the Gaussian kernel.

### 开放练习 2 / Open exercise 2

P=3、N=100，M 和 K 分别多大？谁必定奇异？

For P=3, N=100, give sizes of M and K and identify a necessarily singular one.

Hint 1: X 是 P×N。 / X is P×N.

Hint 2: rank≤min(P, N)。 / Rank is at most min(P, N).

Solution:

M 为 100×100，秩至多 3，必定奇异；K 为 3×3，可能可逆，但依赖样本特征是否独立。

M is 100×100 with rank at most 3, hence singular. K is 3×3 and may be invertible if sample features are independent.

### 开放练习 3 / Open exercise 3

两个完全相同输入分别标为 0 与 1，确定性核函数能同时精确拟合吗？

Can a deterministic kernel model interpolate identical inputs labeled 0 and 1?

Hint 1: 同一输入必须有同一输出。 / Identical inputs have identical outputs.

Hint 2: 对应 Gram 两行相同。 / Their Gram rows coincide.

Solution:

不能。K 缺秩且标签冲突。岭回归能给折中解，却不能使同一确定函数在同一点取两个值。

No. K is singular and labels conflict. Ridge can compromise but cannot make one deterministic function take two values at the same point.

### 选择题补充解释 / Multiple-choice discussion

“能”没有考虑未见分布；零训练误差仅说明训练点被匹配。

“Yes” ignores the unseen distribution; zero training error only establishes training-point agreement.

“保证”忽略重复输入和特征依赖。维数允许满秩不等于实际满秩。

“Yes” ignores duplicates and feature dependence. Dimensions allowing full rank do not ensure it.

### 章末复习 / Review

原始与核形式是同一线性特征模型的两个视角；正则化让等价推导合法，零岭极限再连接插值。

Primal and kernel forms are two views of one linear feature model; regularization legitimizes the identity before the zero-ridge interpolation limit.

- 认为任意相似度表都是合法正定核。 / Assuming every similarity table is a valid positive-semidefinite kernel.
- 把训练插值当成泛化证明，或把核系数当作概率。 / Treating interpolation as proof of generalization or kernel coefficients as probabilities.

- 能说出 M、K 的维数。 / I can state the dimensions of M and K.
- 能手算一个两点核预测。 / I can calculate a two-point kernel prediction.
- 能列出插值需要的条件。 / I can state the conditions required for interpolation.

## 7. 二次损失与梯度下降稳定性 / Quadratic loss and GD stability

Source: Part2/Part2_Lecture1.pdf, PDF 1–2, printed 1–2.

### 直观问题 / Intuition question

沿下坡方向走，为什么还可能越走越远？

Why can downhill steps move farther and farther from the minimum?

### 讲解 / Explanation

梯度只描述当前位置的局部斜率。有限步长可能跨过谷底，并在下一步以更大幅度返回。二次势给出精确的离散放大因子，不需要连续近似。

The gradient gives only the local slope. A finite step can overshoot the valley and return with growing amplitude. A quadratic potential gives an exact discrete amplification factor without a continuum approximation.

### 必要概念 / Concepts

**误差坐标 / Error coordinates**

对 a>0 的一维二次函数，极小点为 −b/a。围绕极小点平移可以去掉线性项。

For a one-dimensional quadratic with a>0, the minimum is −b/a. Shifting to the error removes the linear term.

$$
L(x)=\tfrac12ax^2+bx+c,\quad e=x+b/a
$$

**Hessian 的模式 / Hessian modes**

实对称 Hessian 可正交对角化。正定二次损失的每个特征方向独立演化，最大特征值给出最严格限制。

A real symmetric Hessian has orthogonal eigenmodes. Each mode of a positive-definite quadratic evolves independently; the largest eigenvalue gives the tightest restriction.

$$
e_{i,t+1}=(1-\eta a_i)e_{i,t}
$$

**正、零、负曲率 / Positive, zero and negative curvature**

零曲率方向不被收缩；负曲率方向的因子大于 1，说明驻点不稳定，不能把它当作正定最小值。

Zero-curvature directions do not contract. Negative curvature gives a factor above 1, indicating an unstable stationary point rather than a positive-definite minimum.

### 公式推导 / Derivation

**代入更新 / Insert the update**

对二次函数的梯度是精确线性函数。

The quadratic gradient is exactly linear.

$$
x_{t+1}=x_t-\eta(ax_t+b)
$$

**迭代误差 / Iterate the error**

平移后递推成为几何级数。

After shifting, the recursion is geometric.

$$
e_t=(1-\eta a)^t e_0
$$

**要求收缩 / Require contraction**

严格小于 1 才渐近收敛；边界 ηa=2 是等幅交替而非收敛。

Asymptotic convergence requires a strict contraction. At ηa=2 the error alternates without shrinking.

$$
|1-\eta a|<1\iff0<\eta a<2
$$

### 例题 / Worked example

**三个步长 / Three learning rates**

a=2。η=0.25 时因子 0.5，单调收缩；η=0.75 时因子 −0.5，交替收缩；η=1 时因子 −1，xₜ=(−1)ᵗ，不收敛。η>1 则幅度增长。

For a=2, η=0.25 gives factor 0.5 and monotone contraction. η=0.75 gives −0.5 and alternating contraction. At η=1, xₜ=(−1)ᵗ does not converge. Larger rates cause growing amplitudes.

### 交互模型 / Interactive model

跨越稳定边界

Cross the stability boundary

### 单位、假设与边界 / Units, assumptions and limits

无量纲 L=ax²/2，x₀=1，最多 20 次精确离散迭代。曲率 a>0；图显示带符号的 x，而非损失，便于辨别振荡。

Dimensionless L=ax²/2 with x₀=1 and at most 20 exact discrete steps. Curvature a>0; the plot shows signed x rather than loss to reveal oscillation.

### 自测 1 / Self-check 1

ηa=2 时是否渐近收敛到零？

At ηa=2, does the error converge to zero?

1. 是 / Yes
2. 否 / No

Answer: 2

一般初值给等幅交替。

A generic initial error alternates at constant amplitude.

### 自测 2 / Self-check 2

正定多维二次函数的限制由谁决定？

What sets the restriction for a positive-definite multidimensional quadratic?

1. 最小特征值 / Smallest eigenvalue
2. 最大特征值 / Largest eigenvalue

Answer: 2

所有特征方向都要满足 ηaᵢ<2。

Every eigenmode must satisfy ηaᵢ<2.

### 自学学习目标 / Self-study goals

- 从更新式推导误差的几何递推。 / Derive the geometric error recursion from the update.
- 区分单调收敛、振荡收敛、边界和发散。 / Distinguish monotone and oscillatory convergence, boundaries and divergence.
- 把一维结论推广到对称正定 Hessian 的各个模式。 / Extend scalar results to modes of a symmetric positive-definite Hessian.

前面求到了梯度，现在研究如何使用它。最小二乘是二次目标，因此可精确分析步长；第八章再检查固定二次近似对非线性目标的限制。

Having computed gradients, examine their use. Least squares is quadratic and permits exact rate analysis; Chapter 8 examines the limits of a fixed quadratic approximation.

### 基础补习 / Foundation refresher

斜率、曲率和几何级数 / Slope, curvature and geometric sequences

函数的一阶导数描述斜率，二阶导数描述斜率如何变化。对 L=ax²/2，斜率 ax 在 x<0 为负、x>0 为正，曲率恒为 a。梯度下降减去斜率，所以两侧都朝向零，但有限步可能跨过零。

The first derivative describes slope and the second how slope changes. For L=ax²/2, the slope ax is negative on the left and positive on the right; curvature is a. Subtracting the slope points toward zero on both sides, but a finite step can overshoot.

递推 eₜ₊₁=ueₜ 表示每次将误差乘相同因子。重复代入得到 eₜ=uᵗe₀。如果 |u|<1，幅度逐次缩小；u<0 使符号交替。如果 |u|>1，除非恰好 e₀=0，幅度增长。边界 |u|=1 不能按收敛区处理。

The recursion eₜ₊₁=ueₜ multiplies error by a constant factor, giving eₜ=uᵗe₀. For |u|<1 amplitudes shrink, with alternating signs for u<0. For |u|>1 generic nonzero errors grow. The boundary |u|=1 is not part of the convergent region.

收敛速度也有精确定义：若每步误差幅度至多乘固定的 ρ<1，达到原误差的千分之一需要 ρᵗ≤0.001。取对数可估算迭代次数，ρ 接近 1 时会很慢；“稳定”只保证最终收缩，不保证有限预算内足够准确。

A contraction factor ρ<1 also quantifies speed. Reducing error by a thousand requires ρᵗ≤0.001, so logarithms estimate the step count. Near ρ=1 convergence is slow: stability alone does not ensure adequate accuracy within a finite budget.

$$
e_0\to ue_0\to u^2e_0\to\cdots,\qquad\lim_{t\to\infty}|u|^t=0\text{ if }|u|<1
$$

多变量的 Hessian Hᵢⱼ=∂²L/(∂xᵢ∂xⱼ) 汇集二阶导数。对光滑实函数它是对称的。一个特征向量就是曲率不混合到其他方向的模式。正特征值沿该方向呈谷形，负值呈山脊形，零值则二阶项不给恢复力。

The Hessian Hᵢⱼ collects second derivatives and is symmetric for a smooth real function. Eigenvectors identify directions without curvature mixing. Positive eigenvalues give valley directions, negative values give ridge directions, and zero values give no quadratic restoring force.

回看 / Review: Chapter 2 #foundation: 偏导、梯度和二次损失 / Derivatives, gradients and quadratic loss; Chapter 3 #foundation: 特征值与独立方向 / Eigenvalues and independent directions

### 直观详解 / Motivation

在陡坡上，同样长度的梯度步会更大。学习率 η 控制“把斜率转换为位移”的比例；只看 η 大小不能判断稳定，必须把它与目标曲率相乘。将整个损失乘 100 而不改变 η，会把有效步幅也放大 100 倍。

On steeper terrain the same learning rate gives larger displacement. η converts slope into movement; stability depends on η times curvature, not η alone. Multiplying the entire loss by 100 without changing η also multiplies the effective step by 100.

振荡不等于发散。参数反复越过最小值但越过幅度逐次减小，仍可收敛。应分别观察位置误差和损失，而非看到符号变化就宣告失败。

Oscillation is not divergence: repeatedly crossing the minimum with shrinking amplitude still converges. Inspect both parameter errors and loss rather than declaring failure from a sign change.

### 概念详解 / Detailed concepts

$$
L=\tfrac12ax^2+bx+c,\quad a>0,\quad x_*=-b/a
$$

a 控制曲率，b 决定最小值位置，c 只把图上下平移，梯度不依赖 c。误差 e=x−x* 消去最小值的位置，让不同 b 的问题共享同一稳定条件。

a controls curvature, b sets the minimum location, and c shifts the graph vertically without changing gradients. The error e=x−x* removes location and gives the same stability condition for different b.

正定多维二次目标要求每个特征方向都收缩。最大特征值限制稳定步长，最小正特征值则影响最慢方向的收敛。最大与最小值比例很大时，一个方向允许的安全步长可能让另一个方向移动缓慢。

A positive-definite quadratic requires every eigenmode to contract. The largest eigenvalue restricts stability, while the smallest positive eigenvalue controls a slow direction. Strong anisotropy can make a safe rate inefficient elsewhere.

若 Hessian 有负特征值，它描述的驻点不是严格谷底。沿负曲率方向离开驻点不等于数值算法必然坏了；它也可能正是在逃离鞍点。

A negative Hessian eigenvalue means the stationary point is not a strict minimum. Leaving along negative curvature may represent escape from a saddle rather than a numerical defect.

### 完整推导 / Complete derivation

$$
x_{t+1}=x_t-\eta(ax_t+b)
$$

$$
e_{t+1}=x_t+b/a-\eta a(x_t+b/a)=(1-\eta a)e_t
$$

$$
e_t=(1-\eta a)^te_0,\quad L(x_t)-L(x_*)=\tfrac a2(1-\eta a)^{2t}e_0^2
$$

求渐近收敛要解两个不等式：−1<1−ηa 和 1−ηa<1。a>0 时相当于 0<ηa<2。

Solve both inequalities −1<1−ηa and 1−ηa<1. For a>0 they give 0<ηa<2.

$$
0<\eta a<1:\text{ monotone};\quad1<\eta a<2:\text{ alternating}
$$

ηa=1 时一步到达二次模型的极小值。ηa=2 时 e 每步变号而幅度不变。多维取 H=QDQᵀ，并在 Q 基底展开 e，即把矩阵递推分成独立标量递推。

At ηa=1 the scalar quadratic reaches its minimum in one step; at ηa=2 the sign reverses with unchanged magnitude. In several dimensions, expand e in H=QDQᵀ eigenvectors to separate scalar recursions.

$$
e_{t+1}=(I-\eta H)e_t\Rightarrow\tilde e_{i, t+1}=(1-\eta d_i)\tilde e_{i, t},\quad0<\eta<2/d_{\max}
$$

### 实验任务 1 / Experiment task 1

**predict**

相同 a 下，哪种 η 给单调与交替收缩？

Which rates give monotone or alternating contraction?

**action**

取 a=2，比较 η=0.25、0.75。

At a=2 compare η=0.25 and 0.75.

**record**

记录前四步 x 和幅度比。

Record the first four x values and amplitude ratios.

**explanation**

因子分别为 0.5 和 −0.5，幅度同速缩小而符号行为不同。

Factors 0.5 and −0.5 shrink equally but have different signs.

### 实验任务 2 / Experiment task 2

**predict**

边界 ηa=2 会收敛吗？

Does ηa=2 converge?

**action**

取 a=2、η=1，再稍增 η。

Use a=2,η=1, then increase η slightly.

**record**

比较每次过零后的幅度。

Compare successive crossing amplitudes.

**explanation**

边界等幅交替；超过边界一般增长。仅观察有限几步可能误判缓慢发散。

The boundary alternates at fixed amplitude; above it generic amplitudes grow, perhaps slowly over a short window.

### 实验任务 3 / Experiment task 3

**predict**

保持 ηa 相同能否保持轨迹？

Does fixed ηa preserve this trajectory?

**action**

比较 a=1、η=1 与 a=2、η=0.5。

Compare a=1,η=1 with a=2,η=0.5.

**record**

记录 x₁ 和后续位置。

Record x₁ and later positions.

**explanation**

两者 ηa=1，都一步到零；损失值的尺度仍随 a 不同。

Both have ηa=1 and reach zero immediately, though their loss scales differ.

### 完整例题 1 / Worked example 1: 有线性项的误差递推 / Error recursion with a linear term

L=x²−4x+7，对应 a=2、b=−4，最小点 x*=2。取 x₀=0、η=0.25，因子为 0.5。

L=x²−4x+7 has a=2, b=−4, x*=2. At x₀=0,η=0.25 the factor is 0.5.

$$
e_0=-2,\quad e_1=-1,\quad e_2=-0.5\Rightarrow x_1=1,\ x_2=1.5
$$

直接更新 x₁=0−0.25(−4)=1，核对一致。c=7 不出现在递推中。

Directly, x₁=0−0.25(−4)=1, confirming the result; c=7 never enters the recursion.

### 完整例题 2 / Worked example 2: 两个曲率方向的限制 / Restrictions from two curvatures

L=(x²+10y²)/2，η=0.3、初值 (1,1)。不要只检查 x 方向。

For L=(x²+10y²)/2,η=0.3, initial (1,1), do not check only x.

$$
u_x=0.7,\quad u_y=-2\Rightarrow (x_t, y_t)=(0.7^t,(-2)^t)
$$

x 收敛，y 发散，所以整个算法不收敛。最大曲率 10 要求 η<0.2；若改为 0.1，y 一步归零而 x 每步乘 0.9。

x converges while y diverges, so the full iteration fails. Maximum curvature 10 requires η<0.2. At η=0.1, y vanishes immediately while x contracts by 0.9.

### 开放练习 1 / Open exercise 1

a=4、η=0.4 时是哪一种行为？

Classify behavior at a=4,η=0.4.

Hint 1: 先求 1−ηa。 / Compute 1−ηa.

Hint 2: 分别看符号与绝对值。 / Separate sign and magnitude.

Solution:

因子 −0.6，交替收敛；损失差每步乘 0.36。

The factor is −0.6: alternating convergence, with loss gap multiplied by 0.36.

### 开放练习 2 / Open exercise 2

a=2、η=0 能收敛到一般极小点吗？

Does a=2,η=0 converge from a generic initial point?

Hint 1: 更新没有位移。 / There is no update displacement.

Hint 2: 区分初值恰好最优与一般初值。 / Distinguish an optimal initial point from a generic one.

Solution:

一般不能，xₜ=x₀。稳定条件的下界必须严格大于零；恰好初值最优只是特殊情况。

Generally no: xₜ=x₀. The rate lower bound is strict; starting at the optimum is a special case.

### 开放练习 3 / Open exercise 3

把损失乘常数 c>0，怎样调 η 保持同一轨迹？

If loss is multiplied by c>0, how should η change to preserve the path?

Hint 1: 梯度也乘 c。 / The gradient also gains c.

Hint 2: 让 η∇L 保持相同。 / Keep η∇L unchanged.

Solution:

$$
\eta_{\rm new}=\eta/c
$$

这解释了求和与平均损失下学习率不能机械照搬。

This explains why rates cannot be copied unchanged between summed and mean losses.

### 选择题补充解释 / Multiple-choice discussion

“是”把等幅交替当成逐步缩小；ηa=2 不满足严格不等式。

“Yes” mistakes constant-amplitude alternation for contraction; ηa=2 is excluded.

最小值影响慢模式，但限制共同步长的是最大值。

The smallest eigenvalue influences slow modes; the largest restricts the common rate.

### 章末复习 / Review

稳定性是放大因子的问题；曲率谱把多维问题拆成这些因子。第十一章的预条件将改变有效曲率谱。

Stability concerns amplification factors; curvature spectra provide one per mode. Chapter 11 changes the effective spectrum by preconditioning.

- 把振荡当作发散，或把边界算进收敛区。 / Equating oscillation with divergence or including boundaries in convergence.
- 只检查一个方向，忽略最大曲率。 / Checking one direction but ignoring maximum curvature.

- 能由更新推出误差递推。 / I can derive the error recursion.
- 能计算稳定区间及边界。 / I can compute the stability interval and boundaries.
- 能解释特征值如何限制多维步长。 / I can explain eigenvalue restrictions on multidimensional steps.

## 8. 变化的曲率与稳定边缘 / Changing curvature and the edge of stability

Source: Part2/Part2_Lecture1.pdf, PDF 2–5, printed 2–5.

### 直观问题 / Intuition question

真实网络的局部曲率越过 2/η，能直接断言训练发散吗？

If a network’s local curvature exceeds 2/η, must training diverge?

### 讲解 / Explanation

固定二次模型的 Hessian 不变；网络沿轨迹的 Hessian 会变。局部阈值是诊断指标，不能自动成为非线性训练的全局判据。讲义引用的稳定边缘现象中，损失振荡而包络仍可能下降。

A fixed quadratic has a constant Hessian; a network’s Hessian changes along its trajectory. The local threshold is a diagnostic, not an automatic global criterion for nonlinear training. In the cited edge-of-stability observations, loss oscillates while its envelope may decrease.

### 必要概念 / Concepts

**Taylor 展开 / Taylor expansion**

二阶项只在局部有效；有限步可能进入另一段曲率。

The second-order expansion is local; a finite step may reach a region with different curvature.

$$
\Delta L\approx-\eta\|g\|^2+\tfrac12\eta^2g^THg
$$

**研究观察与定理 / Observation versus theorem**

讲义 p.3–5 引用 arXiv:2103.00065 的实验图。它们不是本课件生成的数据，也不保证所有架构、批量和损失都出现相同行为。

The notes cite experimental figures from arXiv:2103.00065 on pp.3–5. These are not data generated here and do not guarantee the same behavior across all architectures, batch sizes or losses.

**诊断曲率 / Diagnose curvature**

sharpness 通常指 Hessian 最大特征值。对本页单变量模型就是 L″(x)，图中与 2/η 比较。

Sharpness usually means the largest Hessian eigenvalue. In this scalar model it is L″(x), compared against 2/η.

### 公式推导 / Derivation

**选择光滑非二次势 / Choose a smooth nonquadratic potential**

采用教学四次势，它不是神经网络。

Use a teaching quartic, not a neural network.

$$
L(x)=x^2/2+x^4/4
$$

**计算变化曲率 / Compute changing curvature**

梯度与 Hessian 都随位置变化。

Both gradient and Hessian depend on position.

$$
g=x+x^3,\quad S=1+3x^2
$$

**比较沿途值 / Compare along the trajectory**

每步重新计算 S；初始值不代表整条轨迹。

Recompute S at each step; the initial value does not describe the entire trajectory.

$$
x_{t+1}=x_t-\eta(x_t+x_t^3)
$$

### 例题 / Worked example

**超过局部阈值仍可下降 / A local threshold can be exceeded while loss falls**

η=0.6、x₀=1 时 S₀=4>2/η≈3.333。更新给 x₁=1−0.6×2=−0.2；损失由 0.75 降至 0.0204，曲率降至 1.12。固定初始二次近似不能描述这一步的全程。

With η=0.6,x₀=1, S₀=4>2/η≈3.333. The update gives x₁=−0.2; loss falls from 0.75 to 0.0204 and curvature to 1.12. A fixed initial quadratic approximation cannot describe the entire step.

### 交互模型 / Interactive model

非二次轨迹的局部 sharpness

Local sharpness along a nonquadratic trajectory

### 单位、假设与边界 / Units, assumptions and limits

四次势、x₀=1、20 步，η∈[0.05,0.8]。画 Sₜ 与 2/η；这用于比较固定与变化曲率，不声称复现讲义的网络稳定边缘实验。全部无量纲。

Quartic potential, x₀=1, 20 steps, η∈[0.05,0.8]. Plot Sₜ and 2/η to compare fixed and changing curvature. This does not reproduce the notes’ neural-network experiment. All quantities are dimensionless.

### 自测 1 / Self-check 1

固定二次模型和非线性模型的 Hessian 是否都恒定？

Are Hessians constant in both quadratic and nonlinear models?

1. 是 / Yes
2. 只有固定二次模型必定恒定 / Only the fixed quadratic guarantees this

Answer: 2

非线性模型的二阶导数通常随位置变化。

Nonlinear second derivatives generally vary with position.

### 自测 2 / Self-check 2

本页四次势图是否复现了大型网络训练？

Does this quartic plot reproduce large-network training?

1. 否 / No
2. 是 / Yes

Answer: 1

它只是解释局部曲率限制的教学反例。

It is a teaching counterexample about local curvature criteria.

### 自学学习目标 / Self-study goals

- 解释局部 Taylor 近似的作用范围与余项。 / Explain the locality and remainder of a Taylor approximation.
- 用非二次例子区分瞬时曲率与整个更新区间的曲率。 / Distinguish instantaneous curvature from curvature over a finite step.
- 正确阅读稳定边缘的研究观察，不把教学曲线当作网络复现。 / Interpret edge-of-stability observations without treating a toy curve as network replication.

上一章的 Hessian 恒定，因而稳定条件是精确的。本章保留这个结论，同时追问：当每一步走到不同曲率区域时，哪些推论仍成立？

The previous chapter had a constant Hessian, making its criterion exact. Now retain that result while asking which implications survive when each step reaches different curvature.

### 基础补习 / Foundation refresher

Taylor 展开是附近的近似 / Taylor expansion is a local approximation

在位置 x 的附近，用函数值、斜率和曲率拼出一条近似抛物线。位移 s 越大，高阶项越可能重要。“二阶近似”不是把原函数在全空间替换成抛物线的许可证。对四次函数可以直接展开并看到遗漏项。

Near x, combine function value, slope and curvature into a local parabola. Larger displacement makes higher terms more important. A second-order approximation is not a global replacement; a quartic lets us inspect omitted terms explicitly.

$$
L(x+s)=L(x)+L'(x)s+\tfrac12L''(x)s^2+\text{higher terms}
$$

梯度的 Lipschitz 上界 Lg 是某个区域内曲率绝对值的统一上界，不是起点的某一个曲率。若路径经过的整个区域满足此上界，才能用一个统一的下降引理约束有限步。最大特征值作为起点诊断量，不自动提供这样的区域保证。

A gradient Lipschitz bound Lg controls curvature throughout a region, not just at one point. A descent lemma for a finite step needs a bound over the path region. A local largest eigenvalue alone does not provide that guarantee.

$$
L(\theta-\eta g)\le L(\theta)-\eta(1-\eta L_g/2)\|g\|^2
$$

这条式子在有上述统一光滑性界时给 η<2/Lg 的充分下降条件；它不是所有非线性轨迹的必要条件。充分条件不满足，只能说这条保障没有给出结论，不能立刻推出相反结果。

Under the stated regional smoothness bound, η<2/Lg suffices for descent. It is not necessary for every nonlinear trajectory. Failure of a sufficient condition removes a guarantee; it does not establish the opposite conclusion.

回看 / Review: Chapter 7 #foundation: 曲率与离散稳定条件 / Curvature and discrete stability

### 直观详解 / Motivation

把真实损失地形想成坡度不断变化的道路。出发点的抛物线告诉你刚开始的加速度趋势，却不能代替整段道路。梯度下降一步可能越过谷底后落在很平缓的位置，初始曲率高于固定二次阈值也可能仍然降低损失。

Imagine terrain whose slope changes along the road. The starting parabola describes immediate curvature but not the entire route. A gradient step may cross the minimum and land in a flatter region, reducing loss despite exceeding an initial quadratic threshold.

讲义的稳定边缘研究更具体：某些网络训练中，sharpness 接近或略高于 2/η，短期损失振荡而较长时间包络下降。本页四次势只解释为何固定二次结论不能直接外推，不证明这种网络现象普遍发生。

The cited research concerns particular network runs where sharpness approaches or slightly exceeds 2/η while loss oscillates around a decreasing envelope. The quartic only explains why a fixed-quadratic conclusion cannot be generalized automatically; it does not establish that network behavior universally.

### 概念详解 / Detailed concepts

sharpness 在此指 Hessian 的最大特征值；在标量四次模型中就是 S=L″。损失低不必曲率小，曲率大也不等于当前梯度大：函数值、一阶导和二阶导描述不同信息。

Sharpness here is the largest Hessian eigenvalue, or L″ for the scalar toy. Low loss need not mean small curvature, and high curvature need not mean a large current gradient. Values, slopes and curvatures are different.

观察算法时应同时记录学习率、损失定义与归一化、梯度、曲率和迭代次数。将求和损失换成平均损失会缩放 Hessian；未说明尺度的“sharpness=某数”无法与另一实验直接比较。

Record rates, loss definitions and normalization, gradients, curvature and steps. Switching sums to means rescales Hessians, so sharpness numbers without scale conventions are not directly comparable.

本章没有下载或复制论文图，也未开展真实模型训练。原稿图的来源保留为 arXiv:2103.00065；关于更多架构与新论文的陈述仍需独立证据，不能由本实验提供。

No paper figures are downloaded or copied and no real network is trained. The source attribution arXiv:2103.00065 is retained. Claims about other architectures or newer papers require independent evidence.

### 完整推导 / Complete derivation

$$
L=x^2/2+x^4/4,\quad g=x+x^3,\quad S=1+3x^2
$$

代入任意位移 s，精确展开到四次项；这里不是渐近符号，所以能核对近似缺了多少。

Expand exactly in a displacement s through fourth order, allowing a direct check of omitted terms.

$$
L(x+s)-L(x)=(x+x^3)s+\tfrac12(1+3x^2)s^2+xs^3+s^4/4
$$

$$
s=-\eta g\Rightarrow\Delta L=-\eta g^2+\tfrac12\eta^2Sg^2-\eta^3xg^3+\eta^4g^4/4
$$

如果只保留前两项，会得到“局部 ηS<2”的建议；完整有限步还含后两项，其符号与大小不能被忽略。

Retaining only the first two terms suggests ηS<2 locally. A finite step also includes the last terms, whose sizes and signs matter.

$$
x_0=1,\ \eta=0.6:\ g_0=2,\ S_0=4,\ s=-1.2,\ x_1=-0.2
$$

$$
L_0=0.75,\quad L_1=0.0204,\quad\Delta L=-0.7296
$$

起点二阶项给 −2.4+2.88=0.48，甚至预测增加；高阶项 −1.728+0.5184 修正为真实下降。这是对固定局部近似的反例，不是对二次模型数学结论的反例。

The initial quadratic predicts −2.4+2.88=0.48, an increase. Higher terms −1.728+0.5184 recover the true decrease. This challenges that fixed local approximation, not the exact quadratic theorem.

### 实验任务 1 / Experiment task 1

**predict**

η=0.6 时，初始 S 与阈值谁大？

At η=0.6, is initial S above the threshold?

**action**

取 η=0.6，读第一步损失与曲率曲线。

Choose η=0.6 and read first-step loss and curvature.

**record**

记录 S₀、2/η、L₁。

Record S₀,2/η, L₁.

**explanation**

4>3.333，但 L₁=0.0204；变化曲率使固定起点推论不适用。

4>3.333, yet L₁=0.0204. Changing curvature invalidates the fixed-start extrapolation.

### 实验任务 2 / Experiment task 2

**predict**

η 改变时阈值曲线如何变化？

How does the threshold change with η?

**action**

比较 η=0.2 与 0.8。

Compare η=0.2 and 0.8.

**record**

分别记录阈值及沿途 S。

Record thresholds and trajectory sharpness.

**explanation**

阈值为 10 与 2.5；S 曲线也因轨迹改变而变化，不能只移动阈值而假设路径固定。

Thresholds are 10 and 2.5; changing η also changes the trajectory and S, not just the threshold.

### 实验任务 3 / Experiment task 3

**predict**

曲率在训练过程中是否固定？

Does curvature stay fixed along this run?

**action**

选定一个 η，比较最初和末尾曲率。

Fix η and compare initial and final curvature.

**record**

解释为何逐步接近 1。

Explain approach toward 1.

**explanation**

当 x→0，S=1+3x²→1；这不是网络 sharpness 必须增大的模型。

As x→0, S→1. This toy does not impose growing network sharpness.

### 完整例题 1 / Worked example 1: 有限步的二阶近似误差 / Second-order error at a finite step

沿用 x=1、η=0.6。起点二次模型预测新损失 0.75+0.48=1.23；真实值为 0.0204，相差 1.2096。

At x=1,η=0.6 the fixed quadratic predicts loss 1.23; the actual value is 0.0204, differing by 1.2096.

差异恰为后两项之和 −1.2096。位移 1.2 与起点尺度相当，不能当作很小的局部扰动。

The omitted terms sum to −1.2096. A displacement of 1.2 is comparable to the initial scale, not a tiny local perturbation.

### 完整例题 2 / Worked example 2: 小步长时近似为何更可靠 / Why a smaller step improves locality

同一 x=1，η=0.1，s=−0.2。二阶预测 ΔL=−0.4+0.08=−0.32，高阶修正为 −0.008+0.0004=−0.0076。

At x=1,η=0.1, s=−0.2. The quadratic predicts ΔL=−0.32; higher terms contribute −0.0076.

$$
x_1=0.8,\quad L_1=0.4224,\quad\Delta L=-0.3276
$$

近似与真实值接近，但不是完全相同；缩小步长降低截断误差，不代表整体训练一定更快。

The approximation is close, not exact. Smaller steps improve local accuracy without guaranteeing faster training.

### 开放练习 1 / Open exercise 1

x=2 时四次模型的 g 与 S 分别是多少？

Find quartic-model g and S at x=2.

Hint 1: 分别使用一阶、二阶导。 / Use first and second derivatives separately.

Hint 2: 2³=8，3×2²=12。 / 2³=8 and 3×2²=12.

Solution:

g=10，S=13。起点二次阈值为 η<2/13，但不是非线性有限步收敛的完整判据。

g=10, S=13. The starting quadratic suggests η<2/13, not a complete nonlinear convergence criterion.

### 开放练习 2 / Open exercise 2

为什么单次损失上升不必意味着训练整体发散？

Why need one loss increase not imply overall divergence?

Hint 1: 区分一个步与长期序列。 / Distinguish one step from a long sequence.

Hint 2: 检查包络和幅度是否增长。 / Inspect the envelope and amplitudes.

Solution:

序列可以振荡并总体下降，也可以持续增长。须查看较长序列及参数、曲率等诊断；不能只凭一次上升或一次下降下结论。

A sequence can oscillate while decreasing overall or grow persistently. Examine a longer run and parameter/curvature diagnostics; one change cannot decide the whole behavior.

### 开放练习 3 / Open exercise 3

L₁< L₀ 能证明这个算法对所有初值都稳定吗？

Does L₁<L₀ prove stability for all initial values?

Hint 1: 一次例子只覆盖一个状态。 / One example covers one state.

Hint 2: 四次模型在远处曲率可很大。 / Quartic curvature grows far away.

Solution:

不能。需约束初值、步长和经过区域。四次势的曲率没有全局有限上界，不能从单个成功步得出任意初值的统一保证。

No. Conditions on initialization, rate and traversed region are needed. Quartic curvature is globally unbounded, so one successful step gives no uniform guarantee.

### 选择题补充解释 / Multiple-choice discussion

一般非线性目标的 Hessian 依赖位置，只有固定二次目标必定恒定。

A nonlinear Hessian generally depends on position; a fixed quadratic guarantees constancy.

选择“是”把单变量教学对照与真实训练实验混淆。

“Yes” confuses a scalar teaching comparison with a real training experiment.

### 章末复习 / Review

固定二次模型给精确判据，Taylor 模型给局部近似，研究训练曲线给特定实验观察。三者证据层次不同，需一起阅读。

Fixed quadratics give exact criteria, Taylor models local approximations, and training curves specific empirical observations; these are distinct evidence types.

- 把充分条件失效误当作一定发散。 / Inferring divergence from failure of a sufficient condition.
- 把本页四次势称为真实网络稳定边缘复现。 / Calling this quartic a replication of network edge-of-stability experiments.

- 能写出四次势的精确位移展开。 / I can expand the quartic exactly after a displacement.
- 能解释起点曲率与区域上界的区别。 / I can distinguish point curvature from a regional bound.
- 能区分定理、教学反例和研究观察。 / I can distinguish theorem, toy counterexample and empirical observation.

## 9. 随机梯度下降与噪声方差 / Stochastic gradient descent and noise variance

Source: Part2/Part2_Lecture2.pdf, PDF 1–2, printed 6–7.

### 直观问题 / Intuition question

小批量梯度无偏，为什么参数不会精确停在最小值？

If mini-batch gradients are unbiased, why do parameters not settle exactly at the minimum?

### 讲解 / Explanation

无偏只约束平均更新，不意味着每次更新相同。有限学习率把梯度噪声持续注入参数；收缩和噪声注入达到平衡时留下非零方差。

Unbiasedness constrains the average update, not each update. At finite learning rate, gradient noise continually perturbs parameters. Contraction and noise injection can balance at nonzero variance.

### 必要概念 / Concepts

**小批量与 epoch / Mini-batches and epochs**

均匀采样的小批量均值估计全数据平均梯度。遍历一次训练集称一个 epoch；不放回分批会使步骤间相关，不能直接套用独立噪声模型。

A uniformly sampled mini-batch mean estimates the full mean gradient. One pass is an epoch. Sampling without replacement correlates steps, so an independent-noise model is not automatic.

$$
\hat g_B=|B|^{-1}\sum_{\alpha\in B}\nabla\ell_\alpha
$$

**简化噪声 / Simplified noise**

本模型假设条件均值为零、条件方差 q 为常数，初值确定。真实 SGD 噪声可能非 Gaussian 且依赖状态。

Assume conditionally zero-mean noise with constant conditional variance q and a deterministic initial value. Real SGD noise may be non-Gaussian and state dependent.

$$
x_{t+1}=ux_t-\eta\xi_t,\quad u=1-\eta a
$$

**连续极限的尺度 / Continuum scaling**

每步噪声方差为 η²q，令物理时间增量为 η，则单位时间方差为 ηq，固定 q 时趋零。非平凡扩散需额外尺度假设。

The per-step noise variance is η²q. With time increment η, variance per unit time is ηq and vanishes at fixed q. Nontrivial diffusion needs an additional scaling assumption.

### 公式推导 / Derivation

**一阶矩 / First moment**

条件均值为零消去噪声项。

Conditional zero mean removes the noise term.

$$
\mathbb E[x_t]=u^t x_0
$$

**方差递推 / Variance recursion**

交叉项因条件均值假设消失。

The cross term vanishes by conditional zero mean.

$$
V_{t+1}=u^2V_t+\eta^2q,\quad V_0=0
$$

**稳定态 / Stationary variance**

仅在 |u|<1 时几何级数收敛。

The geometric sum converges only when |u|<1.

$$
V_\infty=\frac{\eta^2q}{1-u^2}=\frac{\eta q}{a(2-\eta a)}
$$

### 例题 / Worked example

**η=0.5 的噪声地板 / Noise floor at η=0.5**

取 a=q=1，则 u=0.5，均值按 0.5ᵗ 衰减。V∞=0.5/(2−0.5)=1/3。把学习率降为 0.1，则 V∞=1/19，下降但收敛速度也改变。

For a=q=1, u=0.5 and the mean decays as 0.5ᵗ. V∞=0.5/(2−0.5)=1/3. Reducing η to 0.1 gives V∞=1/19, reducing noise while changing convergence speed.

### 交互模型 / Interactive model

平均收敛与残余波动

Mean convergence and residual fluctuations

### 单位、假设与边界 / Units, assumptions and limits

a=1、x₀=1，q 为每步梯度噪声方差。精确画出均值与标准差，不抽取随机轨迹；无需 Gaussian 分布，但要求上述条件矩假设。参数均无量纲。

a=1,x₀=1; q is gradient-noise variance per step. Plot exact mean and standard deviation, not sampled paths. Gaussianity is unnecessary, but the conditional-moment assumptions are required. All quantities are dimensionless.

### 自测 1 / Self-check 1

均值趋零是否要求方差趋零？

Does a vanishing mean force variance to vanish?

1. 不要求 / No
2. 要求 / Yes

Answer: 1

固定学习率可留下非零稳定方差。

A fixed learning rate can leave stationary variance.

### 自测 2 / Self-check 2

公式 V∞ 能用于 ηa=2 吗？

Can V∞ be used at ηa=2?

1. 能 / Yes
2. 不能 / No

Answer: 2

分母为零，稳定几何级数条件失效。

The denominator vanishes and the stable-series condition fails.

### 自学学习目标 / Self-study goals

- 计算离散随机变量的期望与方差，区分条件与无条件平均。 / Compute discrete expectations and variances and distinguish conditional averages.
- 逐步推导 SGD 的均值、有限步方差与稳态方差。 / Derive SGD means, finite-step variance and stationary variance.
- 解释有限学习率噪声地板和连续极限的尺度。 / Explain finite-rate noise floors and continuum scaling.

第七章的误差每步乘固定因子；现在每步还加入随机扰动。平均收敛与每次运行的波动必须分别讨论，为后面动量和自适应历史量打基础。

Chapter 7 multiplied errors by a fixed factor. Now add random perturbations each step, separating mean convergence from run-to-run variability before studying momentum and adaptive histories.

### 基础补习 / Foundation refresher

期望、方差与条件平均 / Expectation, variance and conditional means

随机变量是由随机结果决定的数。若 ξ 以相同概率取 −1 和 1，期望 Eξ=0，但每次取值都不是零。期望是按概率加权的平均，不代表每次运行都会经过平均轨迹。

A random variable is a number determined by a random outcome. If ξ is equally likely −1 or 1, Eξ=0 although no draw equals zero. Expectation is a probability-weighted average, not the path followed by every run.

$$
\mathbb E[X]=\sum_i p_ix_i,\quad\operatorname{Var}(X)=\mathbb E[(X-\mathbb EX)^2]=\mathbb E[X^2]-(\mathbb EX)^2
$$

标准差是方差的平方根，与 X 同单位；方差的单位是 X 的平方。上例 ξ 的方差为 1。无偏估计表示平均等于目标，不表示方差小，也不表示每次估计都正确。

Standard deviation is the square root of variance and has the same units as X; variance has squared units. The example ξ has variance 1. Unbiasedness means the average equals the target, not low variability or correctness of every estimate.

条件期望 E[ξₜ|xₜ]=0 表示在知道当前状态后，当前噪声仍然均值为零。它比仅有 Eξₜ=0 更能控制交叉项：当前状态虽然随机，但 xₜξₜ 的平均仍可通过先对噪声平均消去。

Conditional zero mean E[ξₜ|xₜ]=0 means noise is mean-zero even after the current state is known. This controls cross terms more strongly than unconditional zero mean: average over current noise first to eliminate xₜξₜ.

$$
\mathbb E[x_t\xi_t]=\mathbb E\{x_t\mathbb E[\xi_t|x_t]\}=0
$$

几何和 1+r+⋯+rⁿ⁻¹ 在 r≠1 时等于 (1−rⁿ)/(1−r)。把和乘 r 再相减便可证明。只有 |r|<1，n→∞ 时才变成 1/(1−r)。稳定态推导不能跳过这个限制。

For r≠1, the finite geometric sum is (1−rⁿ)/(1−r), proved by multiplying the sum by r and subtracting. Only |r|<1 allows an infinite sum 1/(1−r). The stationary derivation must retain this restriction.

回看 / Review: Chapter 4 #foundation: 概率与条件概率 / Probability and conditional probability; Chapter 7 #foundation: 误差递推与稳定性 / Error recursion and stability

### 直观详解 / Motivation

小批量只看部分样本，节省每步计算，但梯度随所选样本波动。若样本独立同分布，批均值仍无偏；若分批规则偏向某一类别或时间段，可能连无偏也不成立。实际训练的洗牌分批与独立有放回采样也不完全相同。

Mini-batches save per-step work but gradients vary with chosen samples. Independent identically distributed samples give an unbiased batch mean. Sampling that favors a class or time interval may introduce bias. Shuffled batches are not identical to independent sampling with replacement.

靠近极小值时真实梯度减小，但采样噪声未必同步消失。固定步长不断注入扰动，因此平均位置可接近最优，而参数仍在附近波动。

Near a minimum, the true gradient shrinks while sampling noise may persist. A fixed rate keeps injecting perturbations, allowing a converged mean with fluctuating parameters.

### 概念详解 / Detailed concepts

定义 L 为平均单样本损失，小批量也取平均，才有 Eĝ=∇L。同一数据若一边用求和梯度、一边用平均梯度，它们差一个样本数，不能称为同一个估计量。

Use mean sample loss and mean mini-batch gradients so Eĝ=∇L. A summed full gradient and averaged batch gradient differ by sample count and cannot be called identical estimands.

对独立且方差 σ² 的单样本梯度，B 个样本平均后的方差为 σ²/B。无放回采样有有限总体修正，连续批之间还会相关；本页简单模型仅规定条件均值零、条件方差 q 恒定，不推断所有真实噪声都满足它。

For independent gradients of variance σ², a B-sample mean has variance σ²/B. Sampling without replacement adds finite-population corrections and correlations. This toy assumes zero conditional mean and constant conditional variance q, without asserting they describe every real run.

可以枚举短轨迹来理解“平均轨迹”。取 a=q=1、η=0.5，噪声每次独立取 ±1，x₀=1。第一步位置等概率为 0 与 1；第二步四条等概率路径的位置为 −0.5、0.5、0、1。它们的平均是 0.25，二阶矩 0.375，方差 0.3125，与矩递推一致，但没有一条路径必须等于平均。

Enumerate short paths to understand the mean. Let a=q=1,η=0.5, x₀=1 with independent noise ±1. Step one is equally likely 0 or 1; step two has four equally likely values −0.5,0.5,0,1. Their mean is 0.25, second moment 0.375, and variance 0.3125, matching the moment recursion without requiring any individual path to equal its mean.

图中均值和标准差是模型的精确矩，不是一次抽样轨迹。Gaussian 分布不是推导所必需；需要的是所列条件矩与稳定性。

The plotted mean and standard deviation are exact moments, not one sampled path. Gaussianity is unnecessary; the conditional-moment and stability assumptions are essential.

### 完整推导 / Complete derivation

$$
\hat g_t=ax_t+\xi_t,\quad x_{t+1}=ux_t-\eta\xi_t,\quad u=1-\eta a
$$

$$
\mathbb E[x_{t+1}|x_t]=ux_t\Rightarrow\mu_t=u^tx_0
$$

先平方再平均，交叉项用条件零均值消去，而不是无理由地认为所有项独立。

Square and average, eliminating the cross term by conditional zero mean rather than assuming every quantity is independent.

$$
\mathbb E[x_{t+1}^2]=u^2\mathbb E[x_t^2]-2u\eta\mathbb E[x_t\xi_t]+\eta^2q
$$

$$
V_{t+1}=u^2V_t+\eta^2q,\quad V_t=u^{2t}V_0+\eta^2q\sum_{j=0}^{t-1}u^{2j}
$$

$$
V_0=0:\quad V_t=\eta^2q\frac{1-u^{2t}}{1-u^2},\quad |u|<1
$$

$$
V_\infty=\frac{\eta q}{a(2-\eta a)}
$$

若把一次迭代的时间设为 dt=η，每步噪声位移方差为 η²q，除以 dt 后为 ηq，固定 q 时趋零。要得到非平凡扩散，必须规定另一个噪声或时间缩放，不能直接把 ξ 改名为 Brownian 噪声。

With time increment dt=η, noise displacement variance per step is η²q and per unit time ηq, vanishing at fixed q. Nontrivial diffusion needs an additional scaling, not merely renaming ξ as Brownian noise.

### 实验任务 1 / Experiment task 1

**predict**

q 增大是否改变均值？

Does increasing q change the mean?

**action**

固定 η=0.5，比较 q=0、1、2。

Fix η=0.5 and compare q=0,1,2.

**record**

记录均值与稳态方差。

Record mean and stationary variance.

**explanation**

均值不变，方差随 q 线性增加；标准差按 √q 增加。

The mean stays fixed; variance scales with q and standard deviation with √q.

### 实验任务 2 / Experiment task 2

**predict**

接近 η=2 时噪声会怎样？

What happens near η=2?

**action**

比较 η=0.5、1.5、1.95，保持 q=1。

Compare η=0.5,1.5,1.95 at q=1.

**record**

记录稳定态方差与第 60 步方差是否接近。

Compare stationary and step-60 variances.

**explanation**

稳定态方差增大，靠近边界时收敛也变慢，60 步未必足够接近稳态。

The stationary variance rises and near-boundary convergence slows, so 60 steps may not reach stationarity.

### 实验任务 3 / Experiment task 3

**predict**

噪声为零时应回到哪个模型？

Which model should zero noise recover?

**action**

设 q=0，分别取 η<1 与 η>1。

Set q=0 and choose rates below and above 1.

**record**

记录标准差与均值符号。

Record standard deviation and mean signs.

**explanation**

标准差恒零，均值正是确定性 GD；η>1 时交替收缩。

Standard deviation is zero and the mean is deterministic GD, alternating for η>1.

### 完整例题 1 / Worked example 1: 前两步的方差与噪声地板 / The first two variances and the noise floor

a=q=1、η=0.5、x₀=1。u=0.5，初值确定，所以 V₀=0。

Take a=q=1,η=0.5, x₀=1, u=0.5 and deterministic V₀=0.

$$
\mu_1=0.5,\ \mu_2=0.25;\quad V_1=0.25,\quad V_2=0.25(0.25)+0.25=0.3125
$$

$$
V_\infty=0.25/(1-0.25)=1/3
$$

第二步 E[x²]=V+μ²=0.375，不能把均值平方 0.0625 误当作二阶矩。

At step 2, E[x²]=V+μ²=0.375; the squared mean 0.0625 is not the second moment.

### 完整例题 2 / Worked example 2: 批量增大的方差收益 / Variance reduction from a larger batch

设独立单样本梯度方差为 4，B=4 则 q=1，B=16 则 q=0.25。仍取 a=1、η=0.5。

Assume independent single-sample gradient variance 4. Then B=4 gives q=1 and B=16 gives q=0.25, at a=1,η=0.5.

$$
V_\infty(B=4)=1/3,\quad V_\infty(B=16)=1/12
$$

方差变为四分之一，标准差只减半。每步计算量也增加，不能只用迭代步数比较训练总成本。

Variance is quartered but standard deviation only halved. Per-step work increases, so iteration counts alone cannot compare total training cost.

### 开放练习 1 / Open exercise 1

ξ 等概率取 −2、2，求均值和方差。

If ξ is equally likely −2 or 2, find mean and variance.

Hint 1: 对两个取值按 1/2 加权。 / Weight both values by 1/2.

Hint 2: 方差用 Eξ²−(Eξ)²。 / Use Eξ²−(Eξ)².

Solution:

均值 0，二阶矩 4，方差 4。零均值不等于没有噪声。

Mean 0, second moment 4, variance 4. Zero mean is not absence of noise.

### 开放练习 2 / Open exercise 2

a=2、η=0.25、q=2，求稳态方差。

Find stationary variance for a=2,η=0.25, q=2.

Hint 1: 先检查 ηa<2。 / Check ηa<2.

Hint 2: 代入 ηq/[a(2−ηa)]。 / Use ηq/[a(2−ηa)].

Solution:

$$
V_\infty=\frac{0.25(2)}{2(2-0.5)}=1/6
$$

### 开放练习 3 / Open exercise 3

ηa=2、q>0 时，方差会恒定吗？

At ηa=2 and q>0, is variance constant?

Hint 1: 此时 u²=1。 / Here u²=1.

Hint 2: 直接使用递推，不能代发散的稳态公式。 / Use the recursion, not the singular stationary formula.

Solution:

$$
V_{t+1}=V_t+\eta^2q\Rightarrow V_t=V_0+t\eta^2q
$$

方差线性增长；边界不是稳定态。

Variance grows linearly; there is no stationary variance at the boundary.

### 选择题补充解释 / Multiple-choice discussion

均值约束位置中心，方差约束散布，二者不是同一个量。

Mean specifies a center and variance a spread; they are distinct quantities.

边界处几何比为 1，不能使用稳定无穷级数。

At the boundary the geometric ratio is 1 and the convergent infinite series is unavailable.

### 章末复习 / Review

SGD 同时有收缩与噪声注入。固定步长的长期波动由二者平衡决定，减小步长同时改变速度与噪声尺度。

SGD combines contraction and noise injection. Their balance sets long-run variability; rate reductions change both speed and noise scale.

- 把均值轨迹当成某一次运行的轨迹。 / Treating a mean trajectory as a single run.
- 把方差和二阶矩混淆，或在不稳定区使用稳态公式。 / Confusing variance with second moment or using stationary formulas outside stability.

- 能计算 Eξ、Eξ² 与 Varξ。 / I can compute Eξ, Eξ² and Varξ.
- 能解释交叉项消失的条件。 / I can explain why the cross term vanishes.
- 能推有限步方差再取稳定极限。 / I can derive finite-step variance before taking its stable limit.

## 10. Hamilton 方程、阻尼与动量 / Hamilton equations, damping and momentum

Source: Part2/Part2_Lecture3.pdf, PDF 1–3, printed 8–10.

### 直观问题 / Intuition question

给参数加一个速度变量，为何可能加速，也可能振荡？

Why can adding a velocity accelerate optimization or create oscillations?

### 讲解 / Explanation

速度保存先前更新的方向，阻尼逐渐遗忘旧信息。物理类比帮助构造算法，但离散学习率与动量仍需稳定性检查；动量并不保证逃出所有局部极小点。

Velocity retains information about earlier directions; damping gradually forgets it. The physical analogy helps construct an algorithm, but discrete learning rates and momentum still need stability checks. Momentum does not guarantee escape from all local minima.

### 必要概念 / Concepts

**Hamilton 动力学 / Hamiltonian dynamics**

标准动能加势能产生位置和动量的两条一阶方程。

Kinetic plus potential energy gives two first-order equations for position and momentum.

$$
\dot q=\partial_pH,\quad\dot p=-\partial_qH,\quad H=p^2/(2m)+L(q)
$$

**显式含时的技巧 / Explicit-time construction**

给动能与势能乘相反指数后，可消去 p 得到阻尼方程；此时 H 本身不守恒。

Opposite time-dependent exponentials on kinetic and potential terms yield a damped equation after eliminating p. This Hamiltonian is not conserved.

$$
H=e^{-2\gamma t}p^2/(2m)+e^{2\gamma t}L(q)\Rightarrow\ddot q+2\gamma\dot q+\nabla L/m=0
$$

**离散重球法 / Discrete heavy-ball method**

先更新速度，再用新速度更新位置。μ 越接近 1，记忆越长；它不是机械动量 p 的数值。

Update velocity first, then position with the new velocity. As μ approaches 1, memory lasts longer. The coefficient μ is not the mechanical momentum p.

$$
v_{t+1}=\mu v_t-\eta\nabla L(x_t),\quad x_{t+1}=x_t+v_{t+1}
$$

### 公式推导 / Derivation

**用位置消去速度 / Eliminate velocity**

由上一更新得 vₜ=xₜ−xₜ₋₁。

The previous update gives vₜ=xₜ−xₜ₋₁.

$$
x_{t+1}=x_t+\mu(x_t-x_{t-1})-\eta ax_t
$$

**特征多项式 / Characteristic polynomial**

在二次势上令 xₜ∝rᵗ。

For a quadratic, substitute xₜ proportional to rᵗ.

$$
r^2-(1+\mu-\eta a)r+\mu=0
$$

**稳定区域 / Stable region**

0≤μ<1 时两根在单位圆内要求如下；μ=0 恢复普通 GD。

For 0≤μ<1, both roots lie inside the unit disk under this condition. μ=0 recovers GD.

$$
0<\eta a<2(1+\mu)
$$

### 例题 / Worked example

**先算两步 / Compute two steps**

a=2、η=0.1、μ=0.9。第一步 v₁=−0.2、x₁=0.8；第二步 v₂=0.9(−0.2)−0.1×2×0.8=−0.34，x₂=0.46。

For a=2,η=0.1,μ=0.9, the first step gives v₁=−0.2,x₁=0.8. Next v₂=0.9(−0.2)−0.1×2×0.8=−0.34, giving x₂=0.46.

### 交互模型 / Interactive model

动量与普通 GD 的轨迹

Momentum and ordinary GD trajectories

### 单位、假设与边界 / Units, assumptions and limits

L=x²/2，x₀=1、v₀=0，40 步；用完全相同的 η 比较 GD 与重球法。无量纲示例，不比较实际训练墙钟时间。

L=x²/2,x₀=1,v₀=0,40 steps. Compare GD and heavy-ball at the same η. Dimensionless example; no real training wall-clock speed comparison.

### 自测 1 / Self-check 1

μ=0 时更新变成什么？

What does μ=0 give?

1. 普通 GD / Ordinary GD
2. 完全不更新 / No update

Answer: 1

新速度只剩 −η∇L。

The new velocity is simply −η∇L.

### 自测 2 / Self-check 2

μ 很大是否一定更快？

Does larger μ always converge faster?

1. 是 / Yes
2. 否 / No

Answer: 2

记忆可能造成过冲和长时间振荡。

Memory can cause overshoot and persistent oscillations.

### 自学学习目标 / Self-study goals

- 由 Hamilton 方程还原 Newton 方程。 / Recover Newton’s equation from Hamilton’s equations.
- 推导阻尼方程到重球迭代的系数换算。 / Derive coefficients connecting damped motion and heavy-ball iteration.
- 用特征根判断动量的振荡与稳定性。 / Use characteristic roots to assess momentum oscillation and stability.

普通 GD 只保存位置；动量额外保存历史速度。本章借物理方程解释这个变量，同时明确有限步算法与连续动力学之间的区别。

GD retains position only; momentum adds a history variable. Mechanics motivates it, but finite-step algorithms and continuous dynamics must remain distinct.

### 基础补习 / Foundation refresher

速度、动量、力与 Hamiltonian / Velocity, momentum, force and Hamiltonian

若位置 q 随时间变化，速度是 q 的时间导数，写作 q̇；加速度是 q̈。恒定质量 m 的机械动量 p=mv。势能 V(q) 的负梯度给力 F=−∇V；在一维，位于势能上升方向的粒子受到反方向力。Newton 方程是 mq̈=F。

Velocity is the time derivative q̇ and acceleration q̈. For constant mass m, mechanical momentum is p=mv. Force is the negative potential gradient F=−∇V. Newton’s equation is mq̈=F.

$$
H(q, p)=p^2/(2m)+V(q),\quad\dot q=\partial_pH=p/m,\quad\dot p=-\partial_qH=-V'(q)
$$

H 称为 Hamiltonian，此处等于动能加势能。把二阶位置方程写成位置和动量的两条一阶方程，必须同时给初始 q 和 p。已知位置并不足以决定未来运动，因为还不知道向哪里、以多快速度移动。

The Hamiltonian here is kinetic plus potential energy. Replacing a second-order position equation with two first-order equations requires both initial q and p. Position alone does not determine motion without its direction and speed.

阻尼力与速度相反，可写成 −2mγq̇，其中 γ≥0。机械能 E=mq̇²/2+V 的变化率为 −2mγq̇²≤0。这个机械能不同于下面人为引入的显式含时 Hamiltonian；二者不能用同一字母混淆。

A damping force opposes velocity, −2mγq̇ with γ≥0. Mechanical energy E=mq̇²/2+V changes at rate −2mγq̇²≤0. This differs from the explicitly time-dependent Hamiltonian introduced below.

指数 e⁻²ᵞᵗ 随时间衰减；微分时导数要多乘 −2γ。这一简单乘积求导正是消去动量时出现阻尼项的原因，不需要预先假定“有动量就会找到全局最优”。

The exponential e⁻²ᵞᵗ decays and contributes a factor −2γ on differentiation. That product-rule term generates damping when momentum is eliminated, without any assumption that momentum finds a global optimum.

回看 / Review: Chapter 7 #foundation: 二次模型与几何递推 / Quadratics and geometric recursion; Chapter 9 #foundation: 均值与噪声的区别 / Mean behavior and noise

### 直观详解 / Motivation

狭长谷底里普通 GD 可以左右反复，动量在连续多步同方向时积累更新，在方向反转时仍保留旧运动趋势。因此它既可能加速，也可能过冲。动量系数 μ 描述记忆保留比例；机械动量 p 则是状态，两者不是同一个量。

In a narrow valley GD may zigzag. Momentum accumulates consistent directions while retaining motion when gradients reverse, so it can accelerate or overshoot. The coefficient μ is a memory-retention factor; mechanical momentum p is a state variable.

物理球可以跨过浅坑，但这只是启发。任意非凸损失上，摩擦、初值与离散误差都影响结果，不能由球的类比推出全局最优保证。

A physical ball can cross shallow wells, but that is motivation, not a guarantee. Damping, initialization and discretization all affect nonconvex outcomes.

### 概念详解 / Detailed concepts

本页算法中的 v 定义为每步位移，不是以秒为单位的物理速度。令物理速度为 u、时间步为 h，则 v=hu。保持这一区分才能正确换算学习率。

Here algorithmic v denotes displacement per iteration, not physical velocity in units per second. With physical velocity u and time step h, v=hu. This distinction is essential for rate conversion.

$$
u_{t+1}=(1-2\gamma h)u_t-(h/m)\nabla L(q_t),\quad q_{t+1}=q_t+hu_{t+1}
$$

用新速度更新位置是具体离散约定。若改用旧速度，会得到不同的有限步算法，即使 h→0 时对应相同连续方程。

Updating position with the new velocity is a specific discretization. Using the old velocity gives a different finite-step algorithm even when the continuum limit agrees.

特征根还解释振荡的包络。若根是复共轭而 μ=0.81，它们的模为 0.9，位置可以周期换号但幅度约按 0.9ᵗ 衰减。连续方程中的摩擦系数与离散根的位置并非同一个数；步长增大时，即使连续系统有阻尼，离散算法仍可不稳定。

Characteristic roots explain oscillation envelopes. Complex-conjugate roots at μ=0.81 have magnitude 0.9, allowing sign changes with an envelope near 0.9ᵗ. Continuous friction and discrete roots are different quantities; a large discretization step can destabilize even damped continuous dynamics.

μ=0 时每步忘记旧位移，回到 GD；μ 接近 1 则保留较长记忆。SGD 动量只把梯度换成小批量估计，并没有消除采样噪声。

At μ=0 old displacement is forgotten and GD is recovered. Near μ=1 memory persists. Stochastic momentum replaces gradients with mini-batch estimates without removing noise.

### 完整推导 / Complete derivation

$$
H(q, p, t)=e^{-2\gamma t}p^2/(2m)+e^{2\gamma t}L(q)
$$

$$
\dot q=e^{-2\gamma t}p/m,\quad\dot p=-e^{2\gamma t}\nabla L
$$

对第一式再求时间导数，用乘积法则并代入第二式。

Differentiate the first equation with the product rule and substitute the second.

$$
\ddot q=e^{-2\gamma t}\dot p/m-2\gamma e^{-2\gamma t}p/m=-\nabla L/m-2\gamma\dot q
$$

$$
v_{t+1}=\mu v_t-\eta\nabla L(q_t),\quad\mu=1-2\gamma h,\quad\eta=h^2/m
$$

这里 η=h²/m，因为 v=hu；若文献把 v 定义成物理速度，则梯度系数是 h/m，且位置更新还要乘 h。固定 h=1 会掩盖这个区别。

Here η=h²/m because v=hu. If a source defines v as physical velocity, its gradient coefficient is h/m and the position update retains h. Setting h=1 hides this distinction.

$$
L=ax^2/2:\quad x_{t+1}=(1+\mu-\eta a)x_t-\mu x_{t-1}
$$

$$
r^2-(1+\mu-\eta a)r+\mu=0
$$

复共轭根的模为 √μ；实根也须各自位于单位圆内。对 0≤μ<1，稳定区为 0<ηa<2(1+μ)，端点对应根到达 +1 或 −1。

Complex-conjugate roots have magnitude √μ; real roots must also lie inside the unit circle. For 0≤μ<1, stability requires 0<ηa<2(1+μ), with endpoints reaching +1 or −1.

### 实验任务 1 / Experiment task 1

**predict**

μ=0 应与哪条曲线重合？

Which curve should μ=0 match?

**action**

设 μ=0，改变 η。

Set μ=0 and vary η.

**record**

对照重球和 GD。

Compare heavy-ball and GD.

**explanation**

两者逐步相同，因为旧速度被完全忘记。

They agree step by step because old displacement is forgotten.

### 实验任务 2 / Experiment task 2

**predict**

更多记忆是否总是更好？

Is longer memory always better?

**action**

固定 η=0.2，比较 μ=0、0.5、0.95。

At η=0.2 compare μ=0,0.5,0.95.

**record**

比较过零次数和末尾幅度。

Compare crossings and final amplitudes.

**explanation**

记忆更强可以产生较久振荡；不能凭某次过零较早就断言总收敛更快。

Longer memory can sustain oscillation; an earlier zero crossing alone does not establish faster convergence.

### 实验任务 3 / Experiment task 3

**predict**

改变学习率时能保持同样轨迹吗？

Does changing η preserve the trajectory?

**action**

固定 μ，比较小 η 和较大 η。

Fix μ and compare small and larger η.

**record**

记录第一步、峰值和 40 步后位置。

Record the first step, peaks and step-40 position.

**explanation**

μ 与 η 联合决定特征根，所以不能单独用“动量大”描述稳定性。

μ and η jointly determine characteristic roots and stability.

### 完整例题 1 / Worked example 1: 两步动量更新 / Two momentum updates

a=2、η=0.1、μ=0.9，x₀=1、v₀=0。先算梯度，再更新速度，再更新位置。

Take a=2,η=0.1,μ=0.9, x₀=1, v₀=0. Compute gradient, then velocity, then position.

$$
v_1=-0.2,\ x_1=0.8;\quad v_2=0.9(-0.2)-0.1(1.6)=-0.34,\ x_2=0.46
$$

若误用旧速度，第一步位置将不变，与本算法不符。

Using the old velocity would leave the first position unchanged, contradicting this algorithm.

### 完整例题 2 / Worked example 2: 从时间步换算算法系数 / Convert a physical time step to algorithm coefficients

取 h=0.1、m=2、γ=1，则 μ=0.8。算法位移形式的 η=0.01/2=0.005，而物理速度式的梯度系数为 h/m=0.05。

For h=0.1, m=2,γ=1,μ=0.8. The displacement-form η is 0.005; the velocity-form gradient coefficient is 0.05.

二者不矛盾：位置更新再乘 h。以零初速度、单位梯度核对，速度变化 −0.05，位移变化 −0.005。

They agree because position multiplies velocity by h. From zero velocity under unit gradient, velocity changes by −0.05 and displacement by −0.005.

### 开放练习 1 / Open exercise 1

μ=0、η=0.2、梯度 3、当前位置 1，求新位置。

With μ=0,η=0.2, gradient 3, current position 1, find the next position.

Hint 1: 旧 v 项为零。 / Old v contributes zero.

Hint 2: v新=−ηg。 / v_new=−ηg.

Solution:

新 v=−0.6，新位置=0.4，正是 GD。

New v=−0.6 and position=0.4, exactly GD.

### 开放练习 2 / Open exercise 2

a=1、μ=0.5，稳定学习率区间是什么？

For a=1,μ=0.5, give the stable rate interval.

Hint 1: 使用严格上界 2(1+μ)。 / Use the strict bound 2(1+μ).

Hint 2: 边界不含在内。 / Exclude endpoints.

Solution:

$$
0<\eta<3
$$

区间内部仍可振荡；稳定与单调不是同义词。

Oscillation can occur inside the interval; stability is not monotonicity.

### 开放练习 3 / Open exercise 3

无阻尼 μ=1 时可一般性渐近收敛吗？

At undamped μ=1, is generic asymptotic convergence guaranteed?

Hint 1: 两个特征根的积为 μ。 / The product of roots is μ.

Hint 2: 若两根模都小于 1，其乘积模也小于 1。 / Two strictly contracting roots must have product magnitude below 1.

Solution:

不能，两根乘积为 1，无法同时严格收缩。能量保持的运动可持续振荡，不自动静止在极小点。

No: the product is 1, preventing both roots from contracting strictly. Conserving motion can oscillate indefinitely rather than settle.

### 选择题补充解释 / Multiple-choice discussion

“完全不更新”忽略了当前梯度仍产生新速度。

“No update” ignores the current gradient contribution.

“是”忽略过冲和特征根；较大 μ 不保证更快。

“Yes” ignores overshoot and characteristic roots; larger μ need not be faster.

### 章末复习 / Review

连续阻尼解释记忆来源，离散特征根决定有限步稳定性。优化变量的定义和时间尺度必须与系数一起说明。

Continuous damping motivates memory; discrete roots decide finite-step stability. State definitions and time scales must accompany coefficients.

- 把 μ 当机械动量，或混用速度与每步位移。 / Treating μ as mechanical momentum or mixing velocity with displacement.
- 把物理类比当作全局最优定理。 / Treating a mechanics analogy as a global optimization theorem.

- 能由 Hamilton 方程消去 p。 / I can eliminate p from Hamilton’s equations.
- 能说明 η=h²/m 来自何处。 / I can explain η=h²/m.
- 能按正确顺序算两步更新。 / I can compute two updates in the correct order.

## 11. 预条件与参数空间的尺度 / Preconditioning and parameter-space scales

Source: Part2/Part2_Lecture4.pdf, PDF 1, printed 11.

### 直观问题 / Intuition question

狭长的损失谷中，为何一个统一步长不够理想？

Why can one shared learning rate be inefficient in a narrow valley?

### 讲解 / Explanation

陡方向限制步长，平缓方向则推进缓慢。预条件矩阵重新缩放梯度，让不同方向的有效曲率更接近。它改变更新规则，需区分度量张量和把梯度映成方向的逆度量。

Steep directions constrain the rate while shallow directions progress slowly. A preconditioner rescales gradients to bring effective curvatures closer. Distinguish a metric tensor from the inverse metric that maps derivatives into update directions.

### 必要概念 / Concepts

**椭圆谷 / Elliptic valley**

曲率比 κ=a₂/a₁ 衡量这个正定二次模型的各向异性，不是一般非凸训练难度的全部。

The ratio κ=a₂/a₁ describes anisotropy of this positive-definite quadratic, not every aspect of nonconvex training difficulty.

$$
L=\tfrac12(x^2+\kappa y^2)
$$

**正定预条件 / Positive-definite preconditioning**

对称正定 P 保证一阶方向导数为负（梯度非零时）。有限步仍可能过大。

A symmetric positive-definite P gives a negative directional derivative for nonzero gradients. A finite step may still be too large.

$$
\Delta\theta=-\eta P\nabla L,\quad\nabla L^T\Delta\theta=-\eta\nabla L^TP\nabla L<0
$$

**坐标度量 / Coordinate metrics**

球坐标线元含 r² 与 r²sin²θ；用该几何定义最速下降时，方向需使用逆度量，不能把两者混为一谈。

The spherical line element contains r² and r²sin²θ. Steepest descent under that geometry uses the inverse metric, so the two tensors must not be conflated.

$$
ds^2=dr^2+r^2d\vartheta^2+r^2\sin^2\vartheta\,d\varphi^2
$$

### 公式推导 / Derivation

**原始曲率 / Original curvature**

初始值取 (1,1)，两个方向更新率不同。

Start at (1,1); the directions have different contraction factors.

$$
x_{t+1}=(1-\eta)x_t,\quad y_{t+1}=(1-\eta\kappa)y_t
$$

**理想对角缩放 / Ideal diagonal scaling**

本例 Hessian 已知，可取其逆作教学对照。

The Hessian is known here, so its inverse is an idealized comparison.

$$
P=\operatorname{diag}(1,1/\kappa)
$$

**统一有效曲率 / Equal effective curvature**

预条件后两个方向有同一放大因子。

After preconditioning both directions share the same factor.

$$
P\nabla L=(x,y)^T,\quad (x_t,y_t)=(1-\eta)^t(1,1)
$$

### 例题 / Worked example

**κ=10 / κ=10**

η=0.1 时，普通 GD 一步给 (0.9,0)；理想预条件但使用同一 η 得 (0.9,0.9)。它未必在第一步损失更小；预条件的价值是允许另选更大稳定步长，例如 η=1 一步到零。

At η=0.1, raw GD gives (0.9,0) in one step, while ideal preconditioning at the same η gives (0.9,0.9). It need not have smaller first-step loss. Its advantage is allowing a larger stable rate, such as η=1 reaching zero immediately.

### 交互模型 / Interactive model

比较各向异性与理想预条件

Compare anisotropy and ideal preconditioning

### 单位、假设与边界 / Units, assumptions and limits

κ∈[1,30]，η=1/κ，初值 (1,1)，40 步。画原始与预条件损失；使用已知精确 Hessian 仅为教学对照，不代表昂贵高维模型能免费得到它。

κ∈[1,30],η=1/κ,initial (1,1),40 steps. Plot raw and preconditioned loss. The exact known Hessian is an ideal teaching comparison, not a free resource in high-dimensional models.

### 自测 1 / Self-check 1

P 正定是否保证任意有限步都下降？

Does positive-definite P guarantee descent for any finite step?

1. 保证 / Yes
2. 不保证 / No

Answer: 2

一阶下降不消除有限步长限制。

First-order descent does not remove finite-step restrictions.

### 自测 2 / Self-check 2

理想预条件是否总能廉价获得？

Is ideal preconditioning always cheap to obtain?

1. 不是 / No
2. 是 / Yes

Answer: 1

高维 Hessian 的存储与求解可能昂贵。

High-dimensional Hessian storage and solves can be expensive.

### 自学学习目标 / Self-study goals

- 从等高线和特征值解释各向异性。 / Explain anisotropy using contours and eigenvalues.
- 推导正定预条件方向与逆度量的关系。 / Derive a positive-definite preconditioned direction and its inverse-metric interpretation.
- 公平比较相同步长和重新调步长后的算法。 / Compare algorithms fairly at equal and retuned rates.

第七章的最大曲率限制所有方向。本章重新缩放方向，使陡与缓方向不必使用同样的原始尺度；第十二章进一步处理矩阵梯度的奇异值。

The largest curvature constrained all directions in Chapter 7. Rescale directions so steep and shallow modes need not retain their original relative scales. Chapter 12 then treats matrix-gradient singular values.

### 基础补习 / Foundation refresher

等高线、条件数与几何度量 / Contours, conditioning and geometric metrics

等高线是函数值相同的点。L=(x²+κy²)/2 的等高线满足 x²+κy²=常数，κ>1 时在 y 方向更窄，因为 y 改变同样大小会带来更大损失变化。狭长谷中的梯度常朝向陡壁，而不是直接朝着沿谷的最短路线。

Contours connect equal function values. For L=(x²+κy²)/2, they satisfy x²+κy²=constant and are narrower along y when κ>1. The same y displacement changes loss more. In a narrow valley the gradient can point toward steep walls rather than directly along the valley.

$$
H=\operatorname{diag}(1,\kappa),\quad\kappa(H)=d_{\max}/d_{\min}=\kappa
$$

这里 κ(H) 是正定矩阵的谱条件数，描述曲率比例；它不等于所有非凸目标难度。原始梯度的方向还依赖坐标单位，若把米改成毫米，坐标偏导会改变。比较参数更新必须明确坐标与度量。

Here κ(H) is a spectral condition number describing curvature ratios, not universal nonconvex difficulty. Raw derivatives also depend on coordinate units: converting meters to millimeters changes coordinate derivatives. Updates need explicit coordinates and metrics.

度量矩阵 M 定义小位移的平方长度 dθᵀM dθ；M 对称正定才给正常的正长度。球坐标里角位移的实际长度随半径增长，因此线元中出现 r²，而不是所有坐标都用相同平方权重。

A metric M defines squared displacement dθᵀM dθ and must be symmetric positive definite for positive lengths. In spherical coordinates angular displacements correspond to longer distances at larger radii, explaining r² terms in the line element.

梯度偏导 g 是损失的变化信息；在给定几何中寻找下降方向，需要用逆度量把它转换为方向。这解释了为什么不能直接拿球坐标度量表当成梯度更新的预条件矩阵。

The coordinate derivative g specifies loss changes. Converting it into steepest-descent motion under a chosen geometry uses the inverse metric. A spherical metric table is therefore not directly the update preconditioner.

回看 / Review: Chapter 3 #foundation: 特征值与正定性 / Eigenvalues and positive definiteness; Chapter 7 #foundation: 多维稳定条件 / Multidimensional stability

### 直观详解 / Motivation

不同方向的安全步长可能差很多。理想预条件用较小比例处理陡方向，让原本小曲率方向不再被陡方向拖慢。但如果保留原来极小的 η 不调整，改好的几何并不自动给更大的实际位移。

Safe rates can differ greatly by direction. Ideal preconditioning scales steep directions down, allowing shallow directions to avoid their restriction. But retaining an unnecessarily tiny η does not automatically exploit the improved geometry.

本实验特意比较相同 η，可能看到理想预条件第一步反而损失更大。这不是公式错误，而是说明“比较时固定什么”决定结论。

The experiment fixes the same η, so ideal preconditioning can have larger first-step loss. This is not an error; conclusions depend on what a comparison holds fixed.

### 概念详解 / Detailed concepts

$$
d=-Pg,\quad P=P^T>0\Rightarrow g^Td=-g^TPg<0\quad(g\ne0)
$$

这只保证充分小步的一阶下降；有限步仍受有效 Hessian 限制。对常数 P，P H 与对称矩阵 P¹ᐟ²H P¹ᐟ² 相似，因此正定二次模型仍可用其正特征值讨论稳定性。

This gives first-order descent for sufficiently small steps, not unrestricted finite-step descent. For constant P, PH is similar to symmetric P¹ᐟ²HP¹ᐟ², allowing positive eigenvalue analysis on positive-definite quadratics.

理想 P=H⁻¹ 对二次函数消除曲率比例。但高维精确 Hessian 的构造、存储和求解很昂贵；对角近似省成本，也会忽略方向耦合。非凸 H 还可能不正定，不能未经处理直接作为下降预条件。

Ideal P=H⁻¹ removes quadratic anisotropy, but high-dimensional Hessian construction, storage and solves are expensive. Diagonal approximations save work while ignoring couplings. A nonconvex Hessian may be indefinite and not give a descent preconditioner.

### 完整推导 / Complete derivation

在固定度量下，最小化线性损失变化 gᵀd，同时限制 dᵀMd=1。用乘子 ν 把约束加入目标。

Minimize the linear loss change gᵀd subject to dᵀMd=1 using multiplier ν.

$$
\mathcal F=g^Td+\tfrac\nu2(d^TMd-1),\quad\nabla_d\mathcal F=g+\nu Md=0
$$

$$
d=-\nu^{-1}M^{-1}g\quad\Rightarrow\quad P=M^{-1}
$$

整体正比例吸收进学习率。对本例直接写出梯度和理想 P，核对两个方向是否得到同一个因子。

Absorb positive scale into the rate. For this toy compute the gradient and ideal P and check equal contraction factors.

$$
g=(x,\kappa y)^T,\quad P=\operatorname{diag}(1,1/\kappa),\quad Pg=(x, y)^T
$$

$$
\theta_{t+1}=(1-\eta)\theta_t,\quad0<\eta<2
$$

原始 GD 的条件是 η<2/κ。预条件后可以选择与 κ 无关的步长，这才是理想例子的潜在收益，而不是相同 η 下每一步都更优。

Raw GD requires η<2/κ; preconditioning permits rates independent of κ. That is the potential benefit, not dominance at every step at identical η.

### 实验任务 1 / Experiment task 1

**predict**

κ=1 时两种方法是否相同？

Are methods identical at κ=1?

**action**

将 κ 设为 1。

Set κ=1.

**record**

记录共同 η 与第一步损失。

Record the shared rate and first-step losses.

**explanation**

P=I、η=1，二者一步到零。

P=I and η=1, so both reach zero in one step.

### 实验任务 2 / Experiment task 2

**predict**

κ=10、相同 η=0.1 时谁第一步损失更小？

At κ=10 and shared η=0.1, which has smaller first-step loss?

**action**

取 κ=10，观察两条损失曲线。

Set κ=10 and inspect both losses.

**record**

记录两种第一步损失，并手算坐标。

Record losses and compute coordinates.

**explanation**

原始为 (0.9,0)，预条件为 (0.9,0.9)；相同步长时预条件不占优。

Raw gives (0.9,0); preconditioning gives (0.9,0.9), so it does not dominate at that rate.

### 实验任务 3 / Experiment task 3

**predict**

理想预条件重新取 η=1 会怎样？

What if ideal preconditioning is retuned to η=1?

**action**

保留页面 κ=10；这一步在纸上计算，不是页面另一个控件。

Keep κ=10 and compute this hypothetical retuning on paper; there is no separate rate control here.

**record**

分别算原始与预条件更新。

Compute both updates.

**explanation**

预条件一步到零，原始 y 乘 −9 发散。调参后的稳定上界差异才展示了益处。

Preconditioning reaches zero; raw y multiplies by −9. The retuned stability difference shows the benefit.

### 完整例题 1 / Worked example 1: 共同小步长的公平解释 / Interpret the equal-small-rate comparison

κ=10，η=0.1，初值 (1,1)。原始损失初值 5.5，第一步为 0.405。预条件第一步为 (0.9,0.9)，损失 4.455。

For κ=10,η=0.1, initial (1,1), loss begins at 5.5. Raw GD gives first loss 0.405; preconditioning gives (0.9,0.9) and loss 4.455.

$$
L_{\rm raw}(t)=\tfrac12(0.9)^{2t}\ (t\ge1),\quad L_{\rm pre}(t)=5.5(0.9)^{2t}
$$

这组固定率比较中后者始终较大，不能用宣传式“必然加速”解释曲线；需要允许重新选择 η 后再比较。

At this fixed rate the latter remains larger. Explaining it as inevitable acceleration is wrong; compare retuned rates separately.

### 完整例题 2 / Worked example 2: 各向异性调整后的有效谱 / The effective spectrum after scaling

H=diag(2,20)，取 P=diag(1/2,1/20)。原始最大曲率 20，要求 η<0.1。

Let H=diag(2,20), P=diag(1/2,1/20). Raw maximum curvature 20 requires η<0.1.

$$
PH=I,\quad\eta=1\Rightarrow\theta_1=(I-PH)\theta_0=0
$$

这是精确二次目标和精确逆 Hessian 的理想例子，不应当作任意非线性训练的一步求解方法。

This uses an exact quadratic and exact inverse Hessian, not a one-step solution for arbitrary nonlinear training.

### 开放练习 1 / Open exercise 1

g=(2,3)ᵀ、P=diag(1,0.5)，求方向 d 和 gᵀd。

For g=(2,3)ᵀ, P=diag(1,0.5), find d and gᵀd.

Hint 1: 方向是 −Pg。 / Use d=−Pg.

Hint 2: 再与 g 做内积。 / Then take the inner product with g.

Solution:

$$
d=(-2,-1.5)^T,\quad g^Td=-4-4.5=-8.5
$$

### 开放练习 2 / Open exercise 2

若 P=diag(1,−1)，仍总是下降吗？

Does P=diag(1,−1) always give descent?

Hint 1: 选择只沿第二方向的梯度。 / Choose a gradient only along the second direction.

Hint 2: 计算 gᵀ(−Pg)。 / Compute gᵀ(−Pg).

Solution:

取 g=(0,1)ᵀ，方向 d=(0,1)ᵀ，内积为 +1，反而上升。正定条件不能省略。

For g=(0,1)ᵀ, d=(0,1)ᵀ and the directional derivative is +1. Positive definiteness is essential.

### 开放练习 3 / Open exercise 3

为何不能只用迭代次数比较精确 Hessian 法和 GD？

Why are iteration counts insufficient to compare exact Hessian methods with GD?

Hint 1: 每步都要花计算资源。 / Each step consumes resources.

Hint 2: 还需存储和解方程。 / Account for storage and solves.

Solution:

精确 Hessian 构造与求解可能比一次梯度昂贵许多；应比较总时间、内存、精度和求解可靠性，而非仅步数。

Exact Hessian construction and solving can cost far more than one gradient. Compare total time, memory, accuracy and reliability, not just step count.

### 选择题补充解释 / Multiple-choice discussion

有限步包含高阶变化，正的一阶下降方向不能消除步长上界。

A finite step includes higher-order changes; first-order descent does not remove a rate bound.

精确 Hessian 既需构造又需存储和求解，教学模型的低成本不是一般情况。

An exact Hessian must be built, stored and solved; this toy’s low cost is not general.

### 章末复习 / Review

预条件通过改变几何重新分配更新方向尺度；是否加速取决于有效谱、步长选择和计算成本。

Preconditioning changes geometry and directional scales; speed depends on the effective spectrum, rates and cost.

- 混淆度量 M 与更新矩阵 M⁻¹。 / Confusing metric M with update matrix M⁻¹.
- 认为正定就允许任意步长，或认为相同 η 下必然更快。 / Assuming positive definiteness allows any rate or guarantees dominance at identical η.

- 能画出椭圆等高线并识别陡方向。 / I can identify steep directions from elliptic contours.
- 能证明正定 P 给一阶下降。 / I can prove first-order descent for positive P.
- 能区分几何改善和实际计算加速。 / I can distinguish improved geometry from computational speedup.

## 12. 极分解与 Muon 更新方向 / Polar decomposition and Muon update directions

Source: Part2/Part2_Lecture4.pdf, PDF 1–2, printed 11–12.

### 直观问题 / Intuition question

能否去掉矩阵梯度的奇异值差异，保留方向？

Can we remove singular-value anisotropy from a matrix gradient while retaining directions?

### 讲解 / Explanation

极分解把矩阵拆成方向与伸缩。Muon 类更新把非零奇异值变成约 1，常作用在动量矩阵上。它是矩阵级处理，与逐元素除以梯度幅度不同。

Polar decomposition separates directions from stretching. Muon-style updates map nonzero singular values toward 1, often acting on a momentum matrix. This is a matrix operation, distinct from elementwise gradient normalization.

### 必要概念 / Concepts

**紧致 SVD / Compact SVD**

取秩为 r 的 G=UᵣΣᵣVᵣᵀ，只对非零奇异值求逆平方根。

Use the rank-r compact SVD G=UᵣΣᵣVᵣᵀ, inverting only nonzero singular values.

$$
P=U_rV_r^T
$$

**矩形与缺秩 / Rectangular and rank-deficient cases**

满行秩宽矩阵满足 PPᵀ=I；满列秩高矩阵满足 PᵀP=I。缺秩时得到子空间投影，不是两个方向都有完整单位矩阵。

A wide full-row-rank matrix has PPᵀ=I; a tall full-column-rank matrix has PᵀP=I. Rank deficiency gives subspace projectors, not full identities in both spaces.

**动量和衰减 / Momentum and decay**

讲义先累计动量，再近似求极因子，最后衰减权重。本实验仅计算一个 2×2 极因子，不实现完整生产 Muon、Newton–Schulz 或优化器基准。

The notes accumulate momentum, approximate its polar factor, then decay weights. This experiment computes only a 2×2 factor, not production Muon, Newton–Schulz iteration or an optimizer benchmark.

$$
V_{t+1}=\mu V_t+G_t,\quad W_{t+1}=(1-\eta\lambda)W_t-\eta\operatorname{polar}(V_{t+1})
$$

### 公式推导 / Derivation

**对角例子 / Diagonal example**

取可正可负的两个对角值，先算 GGᵀ。

Allow positive or negative diagonal entries and compute GGᵀ.

$$
G=\operatorname{diag}(s_1,s_2),\quad GG^T=\operatorname{diag}(s_1^2,s_2^2)
$$

**正平方根保留绝对值 / The positive square root uses absolute values**

非零 s 的逆平方根为 1/|s|，不是 1/s。

For nonzero s, the inverse square root is 1/|s|, not 1/s.

$$
(GG^T)^{-1/2}=\operatorname{diag}(|s_1|^{-1},|s_2|^{-1})
$$

**得到带符号方向 / Obtain signed directions**

用伪逆约定将零奇异方向置零；旋转左奇异向量不改变结论。

Use a pseudoinverse convention to set zero singular directions to zero. Rotating the left singular vectors preserves this conclusion.

$$
P=\operatorname{diag}(\operatorname{sign}s_1,\operatorname{sign}s_2)
$$

### 例题 / Worked example

**负特征值不能丢符号 / Do not discard negative signs**

G=diag(−3,2)，GGᵀ=diag(9,4)，逆平方根为 diag(1/3,1/2)。相乘得到 P=diag(−1,1)，并非 I。若首项为零，P=diag(0,1)，则 PᵀP 是投影。

G=diag(−3,2) gives GGᵀ=diag(9,4) and inverse square root diag(1/3,1/2). Thus P=diag(−1,1), not I. If the first entry is zero, P=diag(0,1) and PᵀP is a projector.

### 交互模型 / Interactive model

正、负、零方向的极因子

Polar factors with positive, negative and zero directions

### 单位、假设与边界 / Units, assumptions and limits

G=R(φ)diag(s₁,s₂)，2×2 无量纲矩阵。图比较 G 与 P 的两列范数；φ 用度。零值采用 Moore–Penrose 支撑子空间约定，秩改变处不连续。

Dimensionless 2×2 G=R(φ)diag(s₁,s₂). Compare column norms of G and P; φ is in degrees. At zero use the Moore–Penrose support convention, discontinuous at rank changes.

### 自测 1 / Self-check 1

G=diag(−3,2) 的极因子是 I 吗？

Is the polar factor of diag(−3,2) the identity?

1. 是 / Yes
2. 否 / No

Answer: 2

方向中的负号必须保留。

The negative directional sign must remain.

### 自测 2 / Self-check 2

缺秩时用伪逆得到什么？

What does a pseudoinverse give at rank loss?

1. 支撑子空间上的部分等距 / A partial isometry on the support
2. 总是全单位矩阵 / Always the full identity

Answer: 1

零奇异方向不被人为补成有效梯度。

Zero singular directions are not invented as nonzero gradients.

### 自学学习目标 / Self-study goals

- 区分特征值、奇异值和正交矩阵。 / Distinguish eigenvalues, singular values and orthogonal matrices.
- 逐步求正定、不定、矩形与缺秩例子的极因子。 / Compute polar factors for positive, indefinite, rectangular and rank-deficient examples.
- 说明本实验与完整 Muon 优化器的区别。 / Distinguish this experiment from a complete Muon optimizer.

上一章用矩阵缩放梯度向量。这里把某一层的梯度本身视作矩阵，处理其奇异方向的伸缩，而不是只逐坐标除法。

The last chapter scaled gradient vectors. Here treat a layer’s gradient itself as a matrix and modify stretching along singular directions rather than only coordinatewise scaling.

### 基础补习 / Foundation refresher

正交、SVD、平方根与伪逆 / Orthogonality, SVD, square roots and pseudoinverses

向量内积为零叫正交，长度为 1 叫归一。方阵 Q 的列既正交又归一时，QᵀQ=QQᵀ=I，称正交矩阵；旋转和反射都是例子。它保持长度，但不保证保持每个坐标的符号。

Vectors are orthogonal when their inner product is zero and normalized when length is 1. A square Q with orthonormal columns satisfies QᵀQ=QQᵀ=I. Rotations and reflections preserve length but need not preserve coordinate signs.

特征分解要求方阵；实对称矩阵可用正交特征向量写成 ODOᵀ，D 可含负数。SVD 适用于任意实 m×n 矩阵，用左、右两组方向和非负伸缩量分解作用。奇异值永远非负，不等同于一般矩阵的特征值。

Eigenvalue decomposition concerns square matrices. A real symmetric matrix has ODOᵀ with possibly negative eigenvalues. SVD applies to any real m×n matrix and separates left/right directions from nonnegative stretches. Singular values are nonnegative, not general eigenvalues.

$$
G=U_r\Sigma_rV_r^T,\quad U_r\in\mathbb R^{m\times r},\quad V_r\in\mathbb R^{n\times r},\quad\Sigma_r=\operatorname{diag}(\sigma_1,\ldots,\sigma_r)>0
$$

这是只保留非零奇异值的紧致形式，r 是秩。对于对角 G=diag(−3,2)，奇异值是 3 和 2，负号由左右方向承担。不能因为奇异值非负就把原来的负方向删掉。

This compact form retains r nonzero singular values. For diag(−3,2), singular values are 3 and 2 while directions carry the negative sign. Nonnegative singular values do not remove negative directions.

对正半定对称矩阵 A，正平方根把每个非负特征值 d 变成 √d；逆平方根只在 d>0 的方向取 1/√d。若 d=0，普通逆不存在，支撑子空间伪逆把该方向置零。这是明确的数学延拓，不是宣称存在普通逆。

For symmetric positive-semidefinite A, its positive square root maps eigenvalues d to √d. The inverse root uses 1/√d only for d>0. Zero eigenvalues have no ordinary inverse; a support pseudoinverse sets them to zero, an explicit extension rather than an ordinary inverse.

$$
(s^2)^{1/2}=|s|,\quad s\ne0:\ (s^2)^{-1/2}s=\operatorname{sign}(s)
$$

回看 / Review: Chapter 1 #foundation: 矩阵乘法与维数 / Matrix products and dimensions; Chapter 3 #foundation: 特征值与秩 / Eigenvalues and rank; Chapter 11 #foundation: 正定预条件 / Positive-definite preconditioning

### 直观详解 / Motivation

一个矩阵可以沿某个方向放大 100 倍、沿另一个方向只放大 1 倍。极因子保留方向关系，把非零奇异伸缩都换成 1。结果不是简单把整个矩阵除以一个范数，也不是逐元素取符号；这三种操作一般不同。

A matrix can stretch one direction by 100 and another by 1. Its polar factor retains directional structure while replacing nonzero singular stretches by 1. This differs from division by one global norm and from elementwise sign.

Muon 类方法通常处理累计的动量矩阵，再结合学习率、权重衰减与数值近似。这里精确处理一种 2×2 家族，帮助理解方向归一化，不据此比较生产训练速度或效果。

Muon-style methods typically process accumulated momentum and combine rates, decay and numerical approximations. This exact 2×2 family explains directional normalization without benchmarking production speed or quality.

### 概念详解 / Detailed concepts

宽矩阵 m<n 且满行秩时，极因子的行正交，PPᵀ=Iₘ；高矩阵 m>n 且满列秩时，列正交，PᵀP=Iₙ。一般不能同时成立，否则两个空间维数须相同。

A wide full-row-rank factor has PPᵀ=Iₘ; a tall full-column-rank factor has PᵀP=Iₙ. Both cannot generally hold unless the dimensions agree.

缺秩时 P 是部分等距：在有信号的子空间保持长度，在零空间仍为零。PᵀP 与 PPᵀ 都是相应投影矩阵。它没有替零梯度方向凭空创造一个有效方向。

At rank loss P is a partial isometry: lengths are preserved on the signal subspace and zero directions remain zero. PᵀP and PPᵀ are projectors, not necessarily full identities.

极因子改变更新的谱结构，却不保留原梯度每个方向的相对幅度。是否改善训练是算法与任务的问题，不能从“奇异值都为 1”推出通用最优性。

The polar factor changes update spectra and removes relative singular amplitudes. Training benefit depends on algorithm and task; unit singular values do not imply universal optimality.

### 完整推导 / Complete derivation

$$
GG^T=U_r\Sigma_r^2U_r^T
$$

在支撑子空间取逆平方根，然后与 G 相乘，Σ 的非零伸缩恰好相消。

Take the support inverse square root and multiply by G; nonzero stretches cancel.

$$
[(GG^T)^\dagger]^{1/2}=U_r\Sigma_r^{-1}U_r^T
$$

$$
P=[(GG^T)^\dagger]^{1/2}G=U_rV_r^T
$$

$$
PP^T=U_rU_r^T,\quad P^TP=V_rV_r^T
$$

当 r=m 时第一个投影成为 Iₘ，当 r=n 时第二个成为 Iₙ。方阵且满秩时两个都为单位矩阵。对称不定 G=ODOᵀ 则得到 O sign(D)Oᵀ，而不是总得到 I。

When r=m the first projector is Iₘ; when r=n the second is Iₙ. A full-rank square factor has both. For symmetric indefinite G=ODOᵀ, the factor is O sign(D)Oᵀ, not always I.

$$
G=R(\varphi)\operatorname{diag}(s_1, s_2)\Rightarrow P=R(\varphi)\operatorname{diag}(\operatorname{sign}s_1,\operatorname{sign}s_2)
$$

### 实验任务 1 / Experiment task 1

**predict**

把正 s₁ 加倍会把 P 的列范数加倍吗？

Does doubling positive s₁ double the P-column norm?

**action**

固定 s₂=2、φ=0，比较 s₁=1、2、4。

At s₂=2,φ=0 compare s₁=1,2,4.

**record**

记录 G 与 P 的第一列范数和矩阵值。

Record first-column norms and matrix entries.

**explanation**

G 范数变化，P 的非零方向范数保持 1。

G changes scale but the nonzero P-column norm remains 1.

### 实验任务 2 / Experiment task 2

**predict**

s₁ 从正变负是否只改变长度？

Does crossing from positive to negative s₁ change only length?

**action**

比较 s₁=3、−3。

Compare s₁=3 and −3.

**record**

查看 P 的第一列符号。

Inspect the first P-column signs.

**explanation**

长度保持 1，方向翻转；忽略符号会得到错误更新。

Length stays 1 while direction reverses; discarding signs gives a wrong update.

### 实验任务 3 / Experiment task 3

**predict**

s₁=0 时 P 还正交吗？

Is P still a full orthogonal matrix at s₁=0?

**action**

取 s₁=0，旋转 φ 并查看表格。

Set s₁=0 and vary φ while reading the table.

**record**

记录秩和两个列范数。

Record rank and column norms.

**explanation**

秩降为 1，零列仍零。旋转不能恢复丢失的奇异方向。

Rank falls to 1 and the zero column stays zero; rotation cannot restore a lost singular direction.

### 完整例题 1 / Worked example 1: 正定与不定方阵逐项计算 / Positive and indefinite square examples

先取 G=diag(3,2)。GGᵀ=diag(9,4)，逆平方根为 diag(1/3,1/2)，P=I。再把第一项换成 −3，GGᵀ 不变，但最后乘 G 后必须保留负号。

First G=diag(3,2) gives GGᵀ=diag(9,4), inverse root diag(1/3,1/2), and P=I. Replacing 3 by −3 leaves GGᵀ unchanged but retains the negative sign in the final product.

$$
G=\operatorname{diag}(-3,2)\Rightarrow P=\operatorname{diag}(-1,1),\quad P^TP=I
$$

后者是反射，也是正交矩阵。正交不等于所有对角都为正。

The latter is a reflection and is orthogonal; orthogonality does not require positive diagonal entries.

### 完整例题 2 / Worked example 2: 矩形和缺秩的两个对照 / Rectangular and rank-deficient comparisons

$$
G=\begin{pmatrix}3&0&0\\0&2&0\end{pmatrix}\Rightarrow P=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}
$$

PPᵀ=I₂，而 PᵀP=diag(1,1,0)，是三维中的二维投影。若改为 G=diag(0,2)，支撑逆平方根为 diag(0,1/2)。

PPᵀ=I₂, while PᵀP=diag(1,1,0), a two-dimensional projector in three dimensions. For G=diag(0,2), the support inverse root is diag(0,1/2).

$$
G=\operatorname{diag}(0,2)\Rightarrow P=\operatorname{diag}(0,1),\quad P^TP=PP^T=\operatorname{diag}(0,1)
$$

普通逆根在零方向不存在；这里使用的是已经声明的伪逆约定。

The ordinary inverse root does not exist on the zero direction; the declared pseudoinverse convention is being used.

### 开放练习 1 / Open exercise 1

G=diag(−4,−1)，求 P。

Find P for G=diag(−4,−1).

Hint 1: 先平方得到正数。 / Square entries first.

Hint 2: 最后再乘原 G。 / Multiply by the original G at the end.

Solution:

$$
P=\operatorname{diag}(-1,-1)=-I
$$

不能把正平方根写成 diag(−4,−1)。

The positive square root is not diag(−4,−1).

### 开放练习 2 / Open exercise 2

3×2 满列秩极因子，哪个乘积必为单位矩阵？

For a 3×2 full-column-rank polar factor, which product is necessarily identity?

Hint 1: 检查乘积维数。 / Check product dimensions.

Hint 2: r=n=2。 / Here r=n=2.

Solution:

PᵀP=I₂，PPᵀ 是 3×3 秩 2 投影，不可能等于 I₃。

PᵀP=I₂, while PPᵀ is a rank-2 3×3 projector and cannot be I₃.

### 开放练习 3 / Open exercise 3

G=0 时按支撑伪逆约定应更新到哪个极因子？

For G=0, what factor follows the support pseudoinverse convention?

Hint 1: 没有任何非零奇异方向。 / There are no nonzero singular directions.

Hint 2: 不要任意补一个正交基作为梯度。 / Do not invent an orthogonal basis as a gradient.

Solution:

P=0。某些矩阵分解的延拓可选非唯一正交补，但本课件明确选择零支撑更新，不凭零梯度产生运动。

P=0. Other decompositions may choose nonunique orthogonal extensions, but this course chooses a zero support update without inventing motion from zero gradients.

### 选择题补充解释 / Multiple-choice discussion

“是”把对称误当正定；diag(−3,2) 的负方向必须保留。

“Yes” confuses symmetry with positive definiteness; the negative direction remains.

“全单位矩阵”忽略秩；伪逆保留已有支撑而不补全梯度方向。

“Full identity” ignores rank; the pseudoinverse retains existing support.

### 章末复习 / Review

SVD 把矩阵作用拆成方向与非负伸缩；极因子去掉伸缩但保留支撑。它与逐元素自适应更新不同，下一章对照 Adam。

SVD separates directions and nonnegative stretches; polar normalization removes stretches while retaining support. The next chapter contrasts elementwise adaptive updates.

- 把 (s²)⁻¹ᐟ² 误写成 1/s，丢掉负号。 / Replacing (s²)⁻¹ᐟ² by 1/s and losing signs.
- 对矩形矩阵同时声称 PPᵀ 与 PᵀP 都为单位矩阵。 / Claiming both polar products are identities for rectangular matrices.

- 能解释奇异值为何非负。 / I can explain nonnegative singular values.
- 能计算四类极因子例子。 / I can compute all four classes of examples.
- 能说明本实验没有实现哪些完整优化器步骤。 / I can identify which full-optimizer steps are absent.

## 13. Adam、二阶矩与解耦衰减 / Adam, second moments and decoupled decay

Source: Part2/Part2_Lecture4.pdf, PDF 2–3, printed 12–13.

### 直观问题 / Intuition question

梯度的移动平均除以平方平均的平方根，改变了什么？

What changes when a gradient average is divided by a root mean square?

### 讲解 / Explanation

Adam 按坐标积累一阶与二阶原始矩，让更新依赖梯度历史与尺度。AdamW 再把权重衰减从自适应梯度项中解耦。二阶矩不是减去均值平方后的统计方差。

Adam accumulates coordinatewise first and second raw moments, making updates depend on gradient history and scale. AdamW decouples weight decay from adaptive gradient updates. The second moment is not variance with the squared mean removed.

### 必要概念 / Concepts

**指数移动平均 / Exponential moving averages**

从零初始化会使早期均值偏小，标准算法使用偏差修正。β₁、β₂ 越接近 1，记忆越长。

Zero initialization biases early averages toward zero; the standard algorithm uses bias correction. Larger β₁ and β₂ retain longer memory.

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\quad v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2
$$

**偏差修正与 ε / Bias correction and epsilon**

每个坐标单独除法；ε 防止零分母。本实验取 ε=10⁻⁸，β₂=0.999。

Division is coordinatewise; ε prevents zero denominators. This experiment uses ε=10⁻⁸ and β₂=0.999.

$$
\hat m_t=m_t/(1-\beta_1^t),\quad\hat v_t=v_t/(1-\beta_2^t)
$$

**AdamW 衰减 / AdamW decay**

解耦衰减直接乘参数，与把 L2 惩罚放进自适应梯度一般不等价。它是正则化方法，不保证更好的泛化。

Decoupled decay directly scales weights. It is generally different from adding L2 to an adaptively normalized gradient. It is regularization, not a guarantee of better generalization.

$$
\theta_t=(1-\eta\lambda)\theta_{t-1}-\eta\hat m_t/(\sqrt{\hat v_t}+\epsilon)
$$

### 公式推导 / Derivation

**恒定梯度的累积 / Accumulate a constant gradient**

几何级数给出零初始化时的期望尺度。

A geometric series gives the scale under zero initialization.

$$
m_t=(1-\beta_1^t)g,\quad v_t=(1-\beta_2^t)g^2
$$

**修正后近似符号步 / Corrected approximate sign step**

梯度非零且 ε 可忽略时，恒定梯度给约为 sign(g) 的方向。

For nonzero constant g and negligible ε, the normalized direction is approximately sign(g).

$$
\hat m_t/\sqrt{\hat v_t}=g/|g|
$$

**只剩衰减 / Decay alone**

这里须无梯度且历史动量也为零；有历史时即使当前 g=0 仍可继续更新。

This requires no gradient and no stored moments. With history, a zero current gradient can still produce a step.

$$
\theta_t=(1-\eta\lambda)^t\theta_0
$$

### 例题 / Worked example

**第一次更新 / First update**

η=0.1、λ=0.1、x₀=1 时 g₁=1，修正后 m̂₁=v̂₁=1。x₁≈(1−0.01)−0.1=0.89。x=0 且所有历史为零时，ε 保证更新仍为零。

With η=0.1,λ=0.1,x₀=1, g₁=1 and corrected moments are both 1. Thus x₁≈0.99−0.1=0.89. At x=0 with zero history, epsilon keeps the update well defined and zero.

### 交互模型 / Interactive model

AdamW 与同学习率 GD

AdamW and GD at the same learning rate

### 单位、假设与边界 / Units, assumptions and limits

L=x²/2，x₀=1，m₀=v₀=0，40 步；标准偏差修正与 ε=10⁻⁸，β₂=0.999。GD 对照也加同样解耦衰减。所有量无量纲，结果不构成真实网络排名。

L=x²/2,x₀=1,m₀=v₀=0,40 steps; standard bias correction, ε=10⁻⁸,β₂=0.999. The GD comparison has the same decoupled decay. All quantities are dimensionless; this is not a network ranking.

### 自测 1 / Self-check 1

v 是中心化方差吗？

Is v a centered variance?

1. 是 / Yes
2. 否，是二阶原始矩 / No, it is a raw second moment

Answer: 2

没有减去 m²。

The squared mean is not subtracted.

### 自测 2 / Self-check 2

当前梯度为零时参数一定不动吗？

Must parameters stop when the current gradient is zero?

1. 一定 / Always
2. 不一定 / Not necessarily

Answer: 2

历史动量和衰减仍可能改变参数。

Stored momentum and decay can still change parameters.

### 自学学习目标 / Self-study goals

- 手算指数移动平均及初始化修正。 / Compute exponential averages and initialization correction.
- 区分原始二阶矩与方差。 / Distinguish raw second moments from variance.
- 通过数值例子比较 AdamW 衰减和耦合 L2 惩罚。 / Compare AdamW decay with coupled L2 using numerical examples.

动量保存梯度历史，Adam 另加一个平方梯度历史。它主要逐坐标缩放，不等于上一章的矩阵极分解；AdamW 再独立衰减参数。

Momentum retains gradient history; Adam adds squared-gradient history. It scales coordinates rather than computing a matrix polar factor. AdamW additionally decays weights separately.

### 基础补习 / Foundation refresher

指数平均为何需要修正 / Why exponential averages need correction

指数移动平均 mₜ=βmₜ₋₁+(1−β)gₜ 给最近梯度较高权重，旧梯度的权重随年龄按 β 的幂衰减。β=0 只记当前梯度，β 越接近 1，记忆越长。它不是把过去所有值等权平均。

An exponential average mₜ=βmₜ₋₁+(1−β)gₜ gives greater weight to recent gradients; older weights decay as powers of β. β=0 retains only the current value and larger β gives longer memory. This is not an equal-weight running mean.

$$
m_t=(1-\beta)\sum_{j=1}^t\beta^{t-j}g_j\quad(m_0=0)
$$

这些系数的和是 1−βᵗ，不是 1。若所有梯度恒为 g，早期 m 就会比 g 小；除以 1−βᵗ 消除零初始化的权重缺口。梯度均值随时间变化时，这不是“对当前梯度无偏”的保证，只是标准初始化修正。

Weights sum to 1−βᵗ rather than 1, so constant gradients produce a small early m. Dividing by 1−βᵗ corrects the missing initialization weight. For changing gradient means this does not guarantee an unbiased estimate of the current gradient.

v 平均的是 g²，称原始二阶矩。统计方差是 E[g²]−(E[g])²；算法里 v 没有减去 m²，而且两个平均通常使用不同 β。直接称 v 为方差会误导分母的含义。

v averages g², a raw second moment. Variance is E[g²]−(E[g])². Adam neither subtracts m² nor generally uses the same β for both averages, so calling v variance is misleading.

除法和平方都逐坐标进行。小常数 ε 防止分母为零；它与第十六章表示各向异性的 ε 没有关系。梯度极小时 ε 也会影响更新幅度，所以“永远精确等于符号函数”不成立。

Squaring and division are coordinatewise. ε prevents zero denominators and is unrelated to Chapter 16’s anisotropy parameter. At tiny gradients ε affects step magnitudes, so updates are not always exact sign functions.

回看 / Review: Chapter 9 #foundation: 期望、方差与几何级数 / Expectation, variance and geometric sums; Chapter 10 #foundation: 动量与更新顺序 / Momentum and update order

### 直观详解 / Motivation

两个坐标的梯度尺度可能相差很多。除以历史平方平均的平方根，可以减小幅度尺度的影响，但也改变优化几何。历史平均带来迟滞：梯度改变方向后，m 可能仍保留旧符号。

Coordinates may have very different gradient scales. Dividing by a historical root-mean-square reduces some scale effects but changes geometry. History also introduces lag: m can retain its old sign after the gradient changes direction.

Adam、GD 与 Muon 在一个小模型上的排序不能代表所有任务。比较要固定目标、计算预算、调参规则、初始化和评估标准；本实验只是核对更新规律。

A toy-model ranking does not establish a ranking across tasks. Comparisons need objectives, budgets, tuning, initialization and evaluation rules; the live model checks update behavior only.

### 概念详解 / Detailed concepts

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\quad v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2
$$

AdamW 的衰减项直接乘权重。耦合 L2 惩罚则先把 λθ 加进梯度，再进入 m、v 与自适应归一化。对普通无动量 GD 二者可等价，对 Adam 一般不等价。

AdamW multiplies weights directly by a decay factor. Coupled L2 adds λθ to the gradient before moment accumulation and adaptive normalization. They can coincide for plain GD but generally differ for Adam.

即使当前 gₜ=0，只要旧 m 非零，参数仍可能更新；即使 m=v=0，AdamW 也可能因衰减移动参数。必须分别检查梯度、历史和衰减。

A zero current gradient does not stop movement if old m remains. Even with zero moments, AdamW decay can move parameters. Inspect current gradients, history and decay separately.

### 完整推导 / Complete derivation

对恒定 g，连续代入递推，把系数合成几何和。

For constant g, expand the recursion and sum the geometric weights.

$$
m_t=(1-\beta_1^t)g,\quad v_t=(1-\beta_2^t)g^2
$$

$$
\hat m_t=\frac{m_t}{1-\beta_1^t},\quad\hat v_t=\frac{v_t}{1-\beta_2^t}
$$

$$
\theta_t=(1-\eta\lambda)\theta_{t-1}-\eta\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
$$

若恒定 g≠0 且 ε 相比 |g| 可忽略，方向近似 g/|g|。若 g=0 且历史为零，分子为零，带 ε 的分母仍合法。

For nonzero constant g with negligible ε, the normalized direction is approximately g/|g|. At zero gradient and zero history, the numerator is zero and ε keeps the denominator valid.

$$
\theta_t=(1-\eta\lambda)^t\theta_0\quad\text{when gradients and histories vanish}
$$

仅衰减递推要满足 |1−ηλ|<1 才收缩；通常还选择 0≤ηλ<1 以避免符号翻转。衰减不等于数据项损失每步都下降。

Decay alone contracts when |1−ηλ|<1; typically 0≤ηλ<1 avoids sign reversal. Weight decay does not imply decreasing data loss at every step.

### 实验任务 1 / Experiment task 1

**predict**

β₁=0 是否就与 GD 相同？

Does β₁=0 make AdamW identical to GD?

**action**

将 β₁ 设为 0，保留 β₂=0.999 的内置设置。

Set β₁=0, retaining the built-in β₂=0.999.

**record**

比较两条轨迹。

Compare the trajectories.

**explanation**

仍有平方梯度历史和自适应分母，不是普通 GD。

Squared-gradient history and adaptive denominators remain, so it is not GD.

### 实验任务 2 / Experiment task 2

**predict**

衰减增大是否总使数据损失更快下降？

Does larger decay always lower data loss faster?

**action**

固定 η、β₁，比较 λ=0 与 0.5。

Fix η,β₁ and compare λ=0 with 0.5.

**record**

记录过零、振荡与末尾参数。

Record crossings, oscillation and final parameters.

**explanation**

本例最小点也在零，衰减偏好与目标一致；一般目标不在零时可产生偏差，不能泛化。

Here zero is both the target and decay preference; other objectives can acquire bias.

### 实验任务 3 / Experiment task 3

**predict**

较大记忆是否能使参数越过最小点？

Can longer memory carry parameters past the minimum?

**action**

比较 β₁=0、0.9、0.95。

Compare β₁=0,0.9,0.95.

**record**

记录梯度换号后是否仍有同向运动。

Record movement after gradient sign changes.

**explanation**

m 需要时间响应新梯度，惯性与归一化共同决定轨迹。

m takes time to respond; inertia and normalization jointly determine the path.

### 完整例题 1 / Worked example 1: 恒定梯度前两步的修正 / Correcting the first two constant-gradient steps

使用独立教学梯度序列 g₁=g₂=2，β₁=0.9、β₂=0.99，m₀=v₀=0；这里不是页面二次目标随 x 改变的梯度。

Use a separate teaching sequence g₁=g₂=2,β₁=0.9,β₂=0.99, m₀=v₀=0. Unlike the live quadratic, this sequence is specified constant.

$$
m_1=0.2,\ v_1=0.04;\quad m_2=0.38,\ v_2=0.0796
$$

$$
\hat m_2=0.38/0.19=2,\quad\hat v_2=0.0796/0.0199=4
$$

学习率 0.1、无衰减且忽略 ε 时，每步减 0.1。未修正 m₂/√v₂≈1.347，与修正后的 1 不同。

At rate 0.1 with no decay and negligible ε, each step subtracts 0.1. The uncorrected ratio m₂/√v₂≈1.347 differs from the corrected 1.

### 完整例题 2 / Worked example 2: 零数据梯度下的两种正则化 / Two regularization rules at zero data gradient

θ₀=1、η=0.1、λ=0.1、历史为零，当前数据梯度为零。AdamW 只做衰减得到 0.99。

Take θ₀=1,η=0.1,λ=0.1, zero history and zero data gradient. AdamW gives 0.99 from decay alone.

若改为耦合 L2，第一步总梯度为 λθ=0.1，修正 m̂=0.1、v̂=0.01，自适应方向约为 1，故得到约 0.9。相同 λ 在两种规则中并不产生同一运动。

With coupled L2, total first gradient is 0.1; corrected moments are 0.1 and 0.01, giving normalized direction about 1 and new weight about 0.9. The same λ does not produce the same motion.

### 开放练习 1 / Open exercise 1

β=0.5，梯度 2、0，m₀=0，求 m₁、m₂ 与修正 m̂₂。

For β=0.5, gradients 2,0, m₀=0, find m₁, m₂ and corrected m̂₂.

Hint 1: 每步一半旧值、一半当前值。 / Each step averages old and current equally.

Hint 2: 第二步修正除以 1−0.5²。 / At step two divide by 1−0.5².

Solution:

m₁=1、m₂=0.5、m̂₂=2/3。当前梯度为零，历史仍非零。

m₁=1, m₂=0.5, m̂₂=2/3. A zero current gradient leaves nonzero history.

### 开放练习 2 / Open exercise 2

若随机梯度以相同概率取 ±1，原始二阶矩和方差是多少？

For equally likely gradients ±1, find raw second moment and variance.

Hint 1: 均值为零。 / The mean is zero.

Hint 2: 对比恒定梯度 +1。 / Compare with constant gradient +1.

Solution:

随机 ±1 的二阶矩=1、方差=1；恒定 +1 的二阶矩也为 1，但方差为 0。这说明二阶矩不能直接叫方差。

For random ±1, both are 1. Constant +1 also has second moment 1 but variance 0, showing why the quantities differ.

### 开放练习 3 / Open exercise 3

无梯度无历史，ηλ=0.2，三步后 θ/θ₀ 是多少？

With no gradients or history and ηλ=0.2, find θ/θ₀ after three steps.

Hint 1: 只剩几何衰减。 / Only geometric decay remains.

Hint 2: 每步乘 0.8。 / Multiply by 0.8 per step.

Solution:

$$
\theta_3/\theta_0=0.8^3=0.512
$$

### 选择题补充解释 / Multiple-choice discussion

v 没有减去均值平方；常量梯度的方差为零但 v 不为零。

v does not subtract a squared mean; constant gradients have zero variance but nonzero v.

历史与衰减是另外两个运动来源，不能只看当前梯度。

History and decay are additional sources of motion beyond the current gradient.

### 章末复习 / Review

Adam 用历史矩估计逐坐标尺度，AdamW 将权重衰减单独放到更新中。初始化修正、ε、更新时间编号都是算法定义的一部分。

Adam uses historical moments for coordinate scales; AdamW separates decay. Initialization correction, epsilon and time indexing are part of the algorithm.

- 把 v 称为中心方差，或忘记偏差修正。 / Calling v centered variance or omitting initialization correction.
- 认为零当前梯度就不会更新。 / Assuming zero current gradient prevents movement.

- 能手算前两步 m 与 v。 / I can calculate two moment updates.
- 能解释 1−βᵗ 的来源。 / I can derive the 1−βᵗ factor.
- 能用例子区分 AdamW 与耦合 L2。 / I can distinguish AdamW from coupled L2 with an example.

## 14. 变质量与能量守恒轨迹 / Variable mass and energy-conserving trajectories

Source: Part2/Part2_Lecture5.pdf, PDF 1, printed 14.

### 直观问题 / Intuition question

能量守恒时，参数速度仍能在低损失区域变慢吗？

Can parameters slow near low loss while energy remains conserved?

### 讲解 / Explanation

将损失放入位置相关的质量，而不直接作为势能：质量增大可以让同一能量对应更小速度。守恒的是定义出的 Hamiltonian，不是参数的速度、动量或机器学习损失。

Place loss into a position-dependent mass rather than directly into a potential. Greater mass allows lower speed at the same energy. The conserved quantity is the defined Hamiltonian, not velocity, momentum or ML loss.

### 必要概念 / Concepts

**正质量定义 / Positive mass**

取 V=x²/2，m=V⁻ᵞ，限定 x>0、γ>0；x=0 的质量奇异，不能直接跨越。

Take V=x²/2 and m=V⁻ᵞ with x>0,γ>0. The mass is singular at x=0; crossing cannot be assumed.

$$
H(x,p)=\frac{p^2}{2m(x)},\quad m(x)=(x^2/2)^{-\gamma}
$$

**Hamilton 方程 / Hamilton equations**

位置依赖质量使动量也随位置改变，不是自由粒子匀速运动。

Position-dependent mass changes momentum too; this is not constant-speed free motion.

$$
\dot x=p/m,\quad\dot p=m'p^2/(2m^2)
$$

**数值与解析守恒 / Numerical versus analytic conservation**

连续方程守恒不意味着任意离散算法精确保能。本页使用解析轨迹检验关系，不冒充完整能量守恒训练器。

Continuous conservation does not make every discretization exactly energy preserving. This page checks analytic trajectories rather than implementing a complete conserving trainer.

### 公式推导 / Derivation

**消去动量 / Eliminate momentum**

由 p=mẋ 求二阶方程。

Use p=mẋ to obtain the second-order equation.

$$
\ddot x+\frac{m'}{2m}\dot x^2=0\Rightarrow\ddot x-\frac\gamma x\dot x^2=0
$$

**选择向内能量分支 / Choose the inward branch**

设 H=1/2，则 |ẋ|=1/√m。x₀=2，取负速度。

At H=1/2, |ẋ|=1/√m. Start at x₀=2 and choose the inward direction.

$$
\dot x=-C x^\gamma,\quad C=2^{-\gamma/2}
$$

**积分轨迹 / Integrate the trajectory**

γ=1 时指数衰减；γ≠1 时仅在括号为正时适用。

For γ=1 the solution decays exponentially. For γ≠1 the bracket must remain positive.

$$
x(t)=\begin{cases}2e^{-t/\sqrt2},&\gamma=1\\{}[2^{1-\gamma}-(1-\gamma)Ct]^{1/(1-\gamma)},&\gamma\ne1\end{cases}
$$

### 例题 / Worked example

**γ=1 / γ=1**

C=1/√2，t=1 时 x=2e⁻¹ᐟ√²≈0.9861。m=2/x²≈2.0566，p=−√m≈−1.4341，H=p²/(2m)=0.5。x 下降时 p 的绝对值反而增加。

C=1/√2. At t=1, x=2e⁻¹ᐟ√²≈0.9861, m=2/x²≈2.0566 and p≈−1.4341. Then H=p²/(2m)=0.5. As x falls, the magnitude of p increases.

### 交互模型 / Interactive model

固定能量，速度下降

Fixed energy and decreasing speed

### 单位、假设与边界 / Units, assumptions and limits

无量纲，H=1/2、x₀=2，γ∈[0.5,2]、0≤t≤1，范围避开有限时奇点。画解析 x(t)，并显示随轨迹计算的 p、H；不是数值积分的守恒证明。

Dimensionless H=1/2,x₀=2,γ∈[0.5,2],0≤t≤1, avoiding finite-time singularities. Plot analytic x(t) and compute p and H along it; this is not proof of a numerical integrator’s conservation.

### 自测 1 / Self-check 1

能量守恒是否要求 p 恒定？

Does energy conservation require constant p?

1. 是 / Yes
2. 否 / No

Answer: 2

质量随位置变化，p 也会改变。

Position-dependent mass allows changing momentum.

### 自测 2 / Self-check 2

任意离散积分都精确保能吗？

Does every discrete integrator conserve energy exactly?

1. 不会 / No
2. 会 / Yes

Answer: 1

离散误差可破坏连续守恒律。

Discretization error can violate a continuous invariant.

### 自学学习目标 / Self-study goals

- 由位置相关质量推导 Hamilton 方程和二阶方程。 / Derive Hamilton and second-order equations for position-dependent mass.
- 分离变量求三种 γ 区间的轨迹并检查初值。 / Solve trajectories by separation for three γ regimes and check initial values.
- 区分解析守恒、离散误差与奇点处的失效。 / Distinguish analytic conservation, discretization error and singular breakdown.

动量算法通过阻尼损失机械能，这里改成连续时间守恒的人工 Hamiltonian。质量随损失变大而变小、随损失降低而增大，使同一能量对应不同速度。

Momentum used damping to dissipate mechanical energy. Now use an artificial conserving Hamiltonian whose mass increases as loss decreases, giving changing speed at fixed energy.

### 基础补习 / Foundation refresher

沿轨迹求导与分离变量 / Differentiating along a trajectory and separating variables

H(x, p) 的偏导固定另一个变量；沿运动轨迹的总导数则同时考虑 x(t) 和 p(t)。这是两变量链式法则。若 H 显含时间，还必须加 ∂H/∂t。

Partial derivatives of H(x, p) hold the other variable fixed. A total derivative along x(t), p(t) changes both, using the multivariable chain rule. Explicit time dependence adds ∂H/∂t.

$$
\frac{dH}{dt}=\partial_xH\dot x+\partial_pH\dot p+\partial_tH
$$

一阶微分方程 ẋ=f(x) 规定任意时刻的速度。若 f 不为零，可以写 dx/f(x)=dt，再在初始位置到当前位置、初始时间到当前时间之间积分。积分常数由初始条件决定，不应任意省略。

An ODE ẋ=f(x) specifies instantaneous velocity. Where f is nonzero, write dx/f(x)=dt and integrate between initial and current values. Initial conditions determine the integration constant.

$$
\int x^{-\gamma}dx=\begin{cases}x^{1-\gamma}/(1-\gamma),&\gamma\ne1\\\log x,&\gamma=1\end{cases}\quad(x>0)
$$

这里 x、t、p 和 H 都采用无量纲教学单位。V=x²/2 用来定义质量 m=V⁻ᵞ，不再直接加在 H 里作为势能。这与普通 H=p²/(2m)+V 是不同模型，不能套用恒质量自由粒子的动量守恒。

All quantities use dimensionless teaching units. V=x²/2 defines mass m=V⁻ᵞ rather than being added as potential energy. This differs from H=p²/(2m)+V; constant-mass free-particle momentum conservation does not apply.

当 x→0，质量发散。我们只在 x>0 解方程；把一个公式画到零点后另一侧，需要另行定义动力学和变量，而不是让数值程序跨过去就算成功。

Mass diverges as x→0. Solve only on x>0; extending through the singularity needs a separate definition of dynamics, not merely a numerical crossing.

回看 / Review: Chapter 10 #foundation: Hamilton 方程与时间导数 / Hamilton equations and time derivatives

### 直观详解 / Motivation

恒定 H=p²/(2m) 意味着 |p|=√(2mH)，但速度 |ẋ|=|p|/m=√(2H/m)。因此质量增大时，动量幅度可以增加而速度降低。能量、动量和速度是三个不同量。

Fixed H=p²/(2m) gives |p|=√(2mH) but speed √(2H/m). Increasing mass can increase momentum magnitude while lowering speed. Energy, momentum and velocity are distinct.

守恒不代表优化：一维轨迹也可以选朝外运动的分支。这里明确选 x₀=2 与负动量，才得到向低损失方向的轨迹。实际高维算法还涉及探索、遍历与对称性，下一两章才讨论。

Conservation alone is not optimization: an outward branch also exists. Selecting x₀=2 and negative momentum gives inward motion. Higher-dimensional exploration, ergodicity and symmetry require the next chapters.

### 概念详解 / Detailed concepts

$$
m(x)=(x^2/2)^{-\gamma},\quad H=p^2/(2m),\quad x>0,\ \gamma>0
$$

m′ 表示对 x 求导，而 ẋ 表示对时间求导，两者不能混用。质量随时间的变化为 m′(x)ẋ。H 中 1/m 的导数带负号，这个负号再被 Hamilton 的 ṗ=−∂xH 抵消。

m′ differentiates x, while ẋ differentiates time. Along the path, dm/dt=m′(x)ẋ. Differentiating 1/m introduces a minus sign, canceled by ṗ=−∂xH.

即使把两条 Hamilton 方程都用 Euler 法离散，更新后的 H 也通常只近似等于原 H。连续证明依赖同一时刻的导数恰好相消；有限位移会产生更高阶项。若想评估保能算法，需要实际计算不同步长的能量误差、长期漂移和奇点处理，而不是只检查解析公式。

Even Euler discretization of both Hamilton equations generally preserves H only approximately. The continuous proof cancels derivatives at one instant; finite displacement adds higher-order terms. Evaluating a conserving algorithm requires energy error versus step size, long-run drift and singularity handling, not only an analytic formula.

γ<1、γ=1、γ>1 分别对应有限时间到达奇点、指数接近、幂律接近。页面只显示 t≤1，避开允许 γ 范围中的奇点；它没有实现奇点处延拓。

The regimes γ<1,γ=1,γ>1 respectively give finite-time arrival at the singularity, exponential approach and power-law approach. The page uses t≤1 to avoid singularities and implements no continuation there.

### 完整推导 / Complete derivation

$$
\dot x=p/m,\quad\dot p=\frac{m'p^2}{2m^2}
$$

再求 ẋ 的导数；第二项来自分母质量随位置变化。

Differentiate ẋ again; the second term comes from changing mass in the denominator.

$$
\ddot x=\dot p/m-pm'\dot x/m^2=\frac{m'}{2m}\dot x^2-\frac{m'}m\dot x^2=-\frac{m'}{2m}\dot x^2
$$

$$
m'/m=-2\gamma/x\Rightarrow\ddot x-\gamma\dot x^2/x=0
$$

直接核对守恒：把两条 Hamilton 方程代入总导数，两个交叉乘积相消。

Check conservation by substituting Hamilton equations into the total derivative; cross products cancel.

$$
\dot H=(-m'p^2/(2m^2))(p/m)+(p/m)(m'p^2/(2m^2))=0
$$

$$
H=1/2,\ p<0\Rightarrow\dot x=-2^{-\gamma/2}x^\gamma=-Cx^\gamma
$$

$$
\gamma\ne1:\quad x^{1-\gamma}=2^{1-\gamma}-(1-\gamma)Ct
$$

$$
\gamma=1:\quad\log(x/2)=-t/\sqrt2\Rightarrow x=2e^{-t/\sqrt2}
$$

把 t=0 代回应给 x=2。γ<1 的括号在 t*=2¹⁻ᵞ/[(1−γ)C] 为零；γ>1 时括号随时间增大而指数为负，所以只在无限时间趋零。

At t=0 verify x=2. For γ<1 the bracket vanishes at t*=2¹⁻ᵞ/[(1−γ)C]. For γ>1 it grows with a negative exponent, approaching zero only at infinite time.

### 实验任务 1 / Experiment task 1

**predict**

位置减小时动量幅度一定减小吗？

Must momentum magnitude shrink as x falls?

**action**

固定 γ=1，将 t 从 0 调到 1。

At γ=1 increase t from 0 to 1.

**record**

记录 x、p、H，手算速度 p/m。

Record x, p, H and compute p/m.

**explanation**

x 减小、|p| 增大、速度幅度减小而 H 不变。

x falls,|p| rises, speed falls and H stays fixed.

### 实验任务 2 / Experiment task 2

**predict**

γ=2 的解能手算吗？

Can γ=2 be evaluated by hand?

**action**

取 γ=2，比较 t=0、0.5、1。

Set γ=2 and compare t=0,0.5,1.

**record**

核对 x=2/(1+t)。

Check x=2/(1+t).

**explanation**

结果分别为 2、4/3、1；有理函数给出独立核对。

Values 2,4/3,1 independently check the rational solution.

### 实验任务 3 / Experiment task 3

**predict**

页面 H 恒定证明了数值积分器保能吗？

Does constant displayed H verify a numerical integrator?

**action**

比较多个 γ 的轨迹和说明。

Compare curves and model notes for several γ.

**record**

说明数据来自解析公式还是逐步积分。

Identify whether values come from formulas or numerical integration.

**explanation**

本页直接代解析解，故只核对连续模型关系，没有检验某积分器的离散误差。

The page evaluates analytic solutions, checking continuous relations rather than an integrator’s discrete errors.

### 完整例题 1 / Worked example 1: γ=1 的状态与守恒量 / State and invariant for γ=1

x₀=2、H=0.5、t=1。先算位置，再用位置求质量，最后由负能量分支求 p。

At x₀=2, H=0.5, t=1, compute x, mass and then negative-branch momentum.

$$
x=2e^{-1/\sqrt2}\approx0.98614,\quad m=2/x^2\approx2.0566,\quad p=-\sqrt m\approx-1.4341
$$

速度 p/m≈−0.6973，H=p²/(2m)=0.5。质量增大并不违反能量守恒，因为动量同时变化。

Velocity p/m≈−0.6973 and H=0.5. Increasing mass is consistent with fixed energy because momentum changes too.

### 完整例题 2 / Worked example 2: γ=2 的幂律接近 / Power-law approach for γ=2

$$
C=1/2,\quad x^{-1}=1/2+t/2\Rightarrow x=2/(1+t)
$$

t=1 时 x=1、m=4、p=−2、速度=−0.5、H=0.5。求导 ẋ=−2/(1+t)²，与 −x²/2 完全一致。

At t=1, x=1, m=4, p=−2, speed=−0.5, H=0.5. Differentiating gives ẋ=−2/(1+t)², exactly −x²/2.

### 开放练习 1 / Open exercise 1

H=1/2，质量从 1 变为 4，|p| 与速度如何变？

At H=1/2, if mass rises from 1 to 4, how do |p| and speed change?

Hint 1: |p|=√m。 / Use |p|=√m.

Hint 2: 速度=|p|/m。 / Speed is |p|/m.

Solution:

|p| 从 1 增至 2，速度从 1 降至 1/2；两次 H 都为 1/2。

|p| rises from 1 to 2 and speed falls from 1 to 1/2; both energies equal 1/2.

### 开放练习 2 / Open exercise 2

γ=0.5 时是否有限时间到达 x=0？求 t*。

For γ=0.5, is arrival at x=0 finite? Find t*.

Hint 1: C=2⁻¹ᐟ⁴。 / C=2⁻¹ᐟ⁴.

Hint 2: 令 x¹⁻ᵞ 的表达为零。 / Set the expression for x¹⁻ᵞ to zero.

Solution:

$$
t_*=\frac{\sqrt2}{(1/2)2^{-1/4}}=2^{7/4}\approx3.3636
$$

到达的是模型的奇点，不能直接声称 p 与 m 在此有限或继续穿过。

This is arrival at a singularity, not a claim that m, p remain finite or a crossing is defined.

### 开放练习 3 / Open exercise 3

把初始 p 改成正数，能量仍守恒，是否仍朝最小值走？

With positive initial p and conserved energy, does motion still approach the minimum?

Hint 1: ẋ=p/m。 / Use ẋ=p/m.

Hint 2: x>0 时 V=x²/2 随 x 增大。 / For x>0, V=x²/2 increases with x.

Solution:

不一定；本一维分支向外移动，使 V 增大。守恒量本身不选择下降方向，也不提供优化保证。

No. This scalar branch moves outward and increases V. Conservation alone neither selects descent nor guarantees optimization.

### 选择题补充解释 / Multiple-choice discussion

质量变化时 p 也会变化，固定 H 约束的是 p²/m。

With varying mass, p changes too; fixed H constrains p²/m.

连续恒等式不能消除离散误差；本页使用解析解而非积分器。

A continuous identity does not eliminate discretization error; the page uses analytic solutions.

### 章末复习 / Review

连续守恒约束状态之间的关系，解析解展示这种约束；数值算法与高维优化仍需另行检验。

Continuous conservation constrains states and analytic solutions illustrate it; numerical algorithms and high-dimensional optimization need separate checks.

- 把 p、速度和能量当成同一个不变量。 / Conflating momentum, speed and energy.
- 忽略分母质量的导数，或跨过奇点继续套公式。 / Omitting mass derivatives or continuing formulas across singularities.

- 能完整写出 dH/dt。 / I can write the complete total derivative of H.
- 能解 γ=1 与 γ≠1 的分离变量方程。 / I can separate and solve both γ cases.
- 能说明解析演示没有验证哪些实际算法性质。 / I can identify algorithm properties not verified by analytic demonstrations.

## 15. 微正则测度与低损失集中 / Microcanonical measure and low-loss concentration

Source: Part2/Part2_Lecture5.pdf, PDF 2, printed 15.

### 直观问题 / Intuition question

低损失处的相空间体积更大，是否就保证训练找到全局最小值？

Does greater phase-space weight near low loss guarantee finding the global minimum?

### 讲解 / Explanation

在固定能量面上积分掉动量，会得到参数空间的形式权重。高维指数可以强烈偏好低损失，但只有可归一化、可遍历且采样有效等条件满足时，才能把权重解释为长期访问频率。

Integrating momentum on a fixed-energy shell gives a formal parameter-space weight. Its high-dimensional exponent can favor low loss strongly, but interpreting it as visitation frequency requires normalizability, ergodicity and effective sampling.

### 必要概念 / Concepts

**Hamiltonian 与定义域 / Hamiltonian and domain**

本页沿用来源记号 V=(L−L₀)ᵞ，不与上一页的势 V=x²/2 混淆。要求 L>L₀、E>0、n≥1。

Here V=(L−L₀)ᵞ follows this source page; it is not the previous page’s V=x²/2. Require L>L₀,E>0,n≥1.

$$
H(\theta,\pi)=V(\theta)|\pi|^2
$$

**测度不是已归一化概率 / Measure is not normalized probability**

μ 是密度权重，必须再除有限归一化常数。奇点附近发散并不自动给合法概率分布。

μ is a density weight and needs a finite normalization constant. A divergence near a singularity does not automatically define a probability distribution.

$$
\mu(\theta)=\int d^n\pi\,\delta(V|\pi|^2-E)
$$

**遍历假设 / Ergodic hypothesis**

守恒能量只限制可达集合，不保证轨迹探索整个能量面；额外守恒量还可把轨迹困在子流形。

Energy conservation restricts the accessible set but does not ensure exploration of the whole shell. Additional invariants can confine motion to a submanifold.

### 公式推导 / Derivation

**改用径向动量 / Radial momentum**

n 维动量积分的体积元为 rⁿ⁻¹dr dΩ。

The n-dimensional momentum volume element is rⁿ⁻¹dr dΩ.

$$
\mu=\operatorname{Vol}(S^{n-1})\int_0^\infty r^{n-1}\delta(Vr^2-E)\,dr
$$

**处理 delta 函数 / Handle the delta function**

唯一正根为 √(E/V)，Jacobian 为 2√(EV)。

The positive root is √(E/V) and the Jacobian is 2√(EV).

$$
\delta(Vr^2-E)=\frac{\delta(r-\sqrt{E/V})}{2\sqrt{EV}}
$$

**得到损失幂律 / Obtain the loss power law**

常数与 θ 无关，比较两处时可消去。

The prefactor is independent of θ and cancels in ratios.

$$
\mu=\frac{\pi^{n/2}E^{(n-2)/2}}{\Gamma(n/2)}(L-L_0)^{-n\gamma/2}
$$

### 例题 / Worked example

**密度比而非命中率 / Density ratio, not success probability**

n=4、γ=1、r=2 时 μ₂/μ₁=2⁻²=1/4，log₁₀ 比值≈−0.6021。n=100 时比值为 2⁻⁵⁰，偏好更强；但不能由此计算一次训练找到最优解的概率。

At n=4,γ=1,r=2, μ₂/μ₁=2⁻²=1/4, so its base-10 log is about −0.6021. At n=100 the ratio is 2⁻⁵⁰. This stronger preference does not give the probability that one training run reaches an optimum.

### 交互模型 / Interactive model

维数如何放大密度比

How dimension amplifies density ratios

### 单位、假设与边界 / Units, assumptions and limits

比较两个点的正损失差 Δ=L−L₀；r=Δ₂/Δ₁>0。显示 log₁₀(μ₂/μ₁)，避免高维溢出；这是点密度比，不含区域体积，也未归一化。

Compare positive loss gaps Δ=L−L₀ at two points, with r=Δ₂/Δ₁>0. Display log₁₀(μ₂/μ₁) to avoid high-dimensional overflow. This is a point-density ratio, without regional volumes or normalization.

### 自测 1 / Self-check 1

μ 发散就一定可以归一化吗？

Does divergent μ guarantee normalizability?

1. 否 / No
2. 是 / Yes

Answer: 1

需检查整个定义域的积分。

One must check the integral over the full domain.

### 自测 2 / Self-check 2

固定 E 的守恒本身能证明遍历吗？

Does conservation of E alone establish ergodicity?

1. 能 / Yes
2. 不能 / No

Answer: 2

轨迹可能被其他守恒量或动力学结构限制。

Other invariants or dynamical structures can restrict trajectories.

### 自学学习目标 / Self-study goals

- 解释密度、区域概率与归一化的区别。 / Distinguish density, regional probability and normalization.
- 利用 delta 函数的变量代换推导动量积分。 / Derive the momentum integral using delta-function substitution.
- 检查低损失奇点附近的可积性与遍历假设。 / Check integrability near low-loss singularities and the ergodic assumption.

上一章在一维固定能量上计算轨迹。本章改问：如果高维能量面被充分探索，参数位置在形式上会得到怎样的权重？这个“如果”需要保留。

The last chapter computed a scalar fixed-energy trajectory. Now ask what formal parameter weights arise if a high-dimensional energy shell is sufficiently explored. The conditional assumption matters.

### 基础补习 / Foundation refresher

密度、delta 函数与球壳体积 / Densities, delta functions and spherical shells

连续变量在一个精确点的概率通常为零，概率密度乘很小的体积才近似给该区域概率。两个点的密度比只比较局部单位体积权重，不比较两个有限区域的总质量。密度可以大于 1，并不违反概率上界。

A continuous variable usually has zero probability at an exact point. Density times a small volume approximates regional probability. A point-density ratio compares local weight per unit volume, not total mass in finite regions. A density may exceed 1 without violating probability bounds.

$$
Z=\int\mu(\theta)d\theta,\quad p(\theta)=\mu(\theta)/Z\quad\text{only if }0<Z<\infty
$$

Dirac delta 不是普通的在零点无穷大函数，而是通过积分定义的选择规则：∫f(x)δ(x−a)dx=f(a)。若把自变量伸缩 a 倍，尖峰面积必须保持 1，所以产生 1/|a|；一般简单根也需要对应斜率的绝对值。

The Dirac delta is defined by its integration rule ∫f(x)δ(x−a)dx=f(a), not as an ordinary infinite-valued function. Rescaling its argument requires 1/|a| to preserve unit area. A general simple root similarly contributes an absolute-slope factor.

$$
\delta(f(r))=\sum_{f(r_i)=0}\frac{\delta(r-r_i)}{|f'(r_i)|}
$$

二维薄圆环面积约为周长 2πr 乘厚度 dr，三维薄球壳体积约为 4πr²dr。n 维对应角向单位球面面积乘 rⁿ⁻¹dr；高维体积并不是简单的 dr。忽略这个因子会给出错误的维数依赖。

A thin 2D ring has area 2πr dr and a 3D shell volume 4πr²dr. In n dimensions the radial volume is unit-sphere area times rⁿ⁻¹dr. Ignoring this factor gives the wrong dimension dependence.

一般单位球面面积为 2πⁿᐟ²/Γ(n/2)。Gamma 函数可用积分 Γ(s)=∫₀∞tˢ⁻¹e⁻ᵗdt 定义；Γ(1)=1、Γ(1/2)=√π。这里先用 n=1、2 的直接积分核对，再把该标准球面公式用于一般 n，不要求先掌握全部特殊函数理论。

The unit-sphere area is 2πⁿᐟ²/Γ(n/2), with Γ(s)=∫₀∞tˢ⁻¹e⁻ᵗdt,Γ(1)=1 and Γ(1/2)=√π. First verify n=1,2 directly, then use this standard sphere formula; a full special-functions course is not required.

回看 / Review: Chapter 9 #foundation: 概率、期望与方差 / Probability, expectation and variance; Chapter 14 #foundation: Hamiltonian 与守恒能量 / Hamiltonian and conserved energy

### 直观详解 / Motivation

固定能量不代表每个参数位置拥有相同相空间体积。给定 θ 后，还要数有多少动量状态满足同一能量。把动量积分掉，参数依赖便进入 μ(θ)，因此低损失处可能拥有更大的形式密度。

Fixed energy does not mean equal phase-space weight for every parameter position. At fixed θ, count momentum states satisfying the energy constraint. Integrating them out produces θ-dependent μ, which can favor low loss.

若某处权重无限大而总积分也无限大，就不能简单除以一个“无穷归一化常数”得到概率。算法长期访问频率还取决于是否能探索相关能量面；守恒律只给约束，不给探索保证。

If weights and total integral diverge, you cannot normalize by an “infinite constant.” Long-run visitation also depends on exploring the energy shell. Conservation constrains exploration but does not guarantee it.

### 概念详解 / Detailed concepts

$$
\Delta(\theta)=L(\theta)-L_0>0,\quad V=\Delta^\gamma,\quad H=V|\pi|^2,\quad E>0
$$

本页 π 是 n 维共轭动量，数学常数 π 也出现在球面面积中，需靠位置区分。V 是损失差的幂，不是上一章直接写的 x²/2。L₀ 的选择决定 Δ 是否严格为正；分数幂不能随意作用在负数上。

Here π denotes an n-dimensional momentum, and the constant π also appears in sphere areas. V is a power of the loss gap, not the previous x²/2. The choice of L₀ determines positivity; fractional powers cannot be applied arbitrarily to negative gaps.

微正则分布按能量壳 δ(H−E) 计数。使用它作为时间访问分布，需要相关动力学在可达能量面上具有足够探索性；额外守恒量可能把轨迹限制在更小集合。

The microcanonical measure weights the shell δ(H−E). Interpreting it as a time-visitation distribution requires adequate exploration on the accessible shell; extra invariants may restrict motion to a smaller set.

### 完整推导 / Complete derivation

$$
\mu(\theta)=\int_{\mathbb R^n}d^n\pi\,\delta(V|\pi|^2-E)
$$

$$
=A_{n-1}\int_0^\infty r^{n-1}\delta(Vr^2-E)dr,\quad A_{n-1}=\frac{2\pi^{n/2}}{\Gamma(n/2)}
$$

只在 r≥0 积分，唯一正根 r₀=√(E/V)。对 f=Vr²−E，导数在根处为 2Vr₀=2√(EV)。

Radial integration is nonnegative, with one positive root r₀=√(E/V). Its argument derivative is 2Vr₀=2√(EV).

$$
\mu=A_{n-1}\frac{(E/V)^{(n-1)/2}}{2\sqrt{EV}}=\frac{\pi^{n/2}}{\Gamma(n/2)}E^{(n-2)/2}V^{-n/2}
$$

$$
\mu=C(E, n)\Delta^{-n\gamma/2},\quad\frac{\mu_2}{\mu_1}=\left(\frac{\Delta_2}{\Delta_1}\right)^{-n\gamma/2}
$$

密度比能消去常数，却不能证明归一化。若非退化最小值附近 Δ∝ρ²，其中 ρ 是参数空间到最小点的距离，则参数径向积分如下。这里的 ρ 不要与前面动量半径 r 混淆。

A ratio removes constants but does not prove normalization. Near a nondegenerate minimum with Δ∝ρ², where ρ is parameter-space distance, the local radial integral follows. Distinguish ρ from momentum radius r.

$$
\int_0^\varepsilon\rho^{n-1}\rho^{-n\gamma}d\rho=\int_0^\varepsilon\rho^{n(1-\gamma)-1}d\rho
$$

当 γ≥1 且 L₀ 恰等于该最小损失，这个局部积分发散。即使 γ<1 局部可积，还要检查远处与整个定义域。令 L₀ 更低可以避开这个零间隙奇点，但仍不自动保证全局可积。

For γ≥1 with L₀ equal to that minimum, this local integral diverges. For γ<1, local integrability still leaves tails and the full domain to check. Choosing a lower L₀ avoids that zero-gap singularity but does not ensure global integrability.

### 实验任务 1 / Experiment task 1

**predict**

两点损失差相同时，密度比是多少？

What is the ratio at equal loss gaps?

**action**

设 r=1，改变 n 和 γ。

Set ratio r=1 and vary n,γ.

**record**

记录对数密度比。

Record the log density ratio.

**explanation**

始终为 0，即密度比为 1；维数不能打破相同间隙的相等。

It stays 0, meaning ratio 1; dimension does not distinguish equal gaps.

### 实验任务 2 / Experiment task 2

**predict**

n 增大怎样改变对低损失的偏好？

How does larger n affect low-loss preference?

**action**

固定 γ=1、r=2，比较 n=4 与 100。

At γ=1, r=2 compare n=4 and 100.

**record**

记录 log₁₀ 密度比及其差。

Record log₁₀ ratios and their difference.

**explanation**

从约 −0.6021 降至 −15.0515；这是点密度比，不是训练成功率。

It falls from about −0.6021 to −15.0515, a point-density ratio rather than training success probability.

### 实验任务 3 / Experiment task 3

**predict**

交换两个点会怎样？

What happens when points are exchanged?

**action**

比较 r=2 与 0.5，保持 n、γ。

Compare r=2 and 0.5 at fixed n,γ.

**record**

检查对数读数是否互为相反数。

Check whether log readings change sign.

**explanation**

密度比取倒数，对数变号；没有发生新的归一化计算。

Ratios invert and logs change sign, without any new normalization.

### 完整例题 1 / Worked example 1: 一维动量积分直接核对 / Direct verification in one momentum dimension

n=1 时 π 有正负两个根 ±√(E/V)，每个根都贡献相同的 1/(2√EV)。不能只取正根，因为此时尚未改用径向变量。

At n=1, momentum has roots ±√(E/V), each contributing 1/(2√EV). Both are needed before radial reduction.

$$
\mu=1/\sqrt{EV}
$$

一般公式用 Γ(1/2)=√π 也给同一结果。对 E=1、V=4，μ=1/2。

The general formula with Γ(1/2)=√π agrees. E=1, V=4 gives μ=1/2.

### 完整例题 2 / Worked example 2: 二维积分及归一化反例 / Two-dimensional integral and a normalization counterexample

$$
n=2:\quad\mu=2\pi\frac{\sqrt{E/V}}{2\sqrt{EV}}=\pi/V
$$

取 γ=1、Δ=ρ²，则 μ∝ρ⁻²；参数平面面积元为 2πρdρ，原点附近总质量含 ∫dρ/ρ，按对数发散。

With γ=1,Δ=ρ², the density scales as ρ⁻². Parameter-plane area is 2πρdρ, so local total mass contains ∫dρ/ρ and diverges logarithmically.

这不否定形式密度推导，而是说明从密度到概率还缺条件。有限截断区域、正损失下界或算法修正都需明确说明，不能默默加入。

This does not invalidate the formal density, but shows missing conditions for a probability distribution. Cutoffs, positive gap bounds or algorithm modifications must be specified, not silently assumed.

### 开放练习 1 / Open exercise 1

n=4、γ=1、Δ₂/Δ₁=3，密度比是多少？

For n=4,γ=1,Δ₂/Δ₁=3, find the density ratio.

Hint 1: 指数为 −nγ/2。 / The exponent is −nγ/2.

Hint 2: 常数在比值中消去。 / Constants cancel in the ratio.

Solution:

$$
\mu_2/\mu_1=3^{-2}=1/9
$$

### 开放练习 2 / Open exercise 2

δ(3x−6) 的积分选择规则是什么？

What is the integration rule for δ(3x−6)?

Hint 1: 根是 2。 / The root is 2.

Hint 2: 需要斜率绝对值的倒数。 / Include the inverse absolute slope.

Solution:

$$
\delta(3x-6)=\tfrac13\delta(x-2),\quad\int f(x)\delta(3x-6)dx=f(2)/3
$$

### 开放练习 3 / Open exercise 3

已知某点密度为另一点的 100 倍，能推断附近区域概率也是 100 倍吗？

Does a 100-fold point-density ratio imply a 100-fold regional probability ratio?

Hint 1: 区域还需要体积。 / Region volumes matter.

Hint 2: 密度在整个区域内可能变化。 / Density may vary within each region.

Solution:

不能。只有足够小、体积相同且区域内密度近似常数时，才有局部近似；归一化常数还必须有限。

No. A local approximation needs sufficiently small equal volumes with nearly constant densities, and a finite normalization constant.

### 选择题补充解释 / Multiple-choice discussion

发散既可能局部可积也可能不可积，必须实际检查积分。

A divergent density can be integrable or nonintegrable; inspect its integral.

能量壳可能被额外不变量分割，守恒本身不证明遍历。

Additional invariants can restrict motion within the shell; conservation does not prove ergodicity.

### 章末复习 / Review

积分动量得到形式参数密度；归一化和遍历是另两道检查，不能由低损失处密度大直接跳过。

Momentum integration gives a formal parameter density. Normalization and ergodicity are separate checks not bypassed by large low-loss density.

- 漏掉 delta 的 Jacobian 或球壳 rⁿ⁻¹。 / Omitting the delta Jacobian or radial rⁿ⁻¹ factor.
- 把密度集中、可归一化与轨迹会访问当成同一命题。 / Conflating density concentration, normalizability and actual visitation.

- 能直接核对 n=1、2。 / I can verify n=1,2 directly.
- 能解释点密度比不等于区域概率比。 / I can distinguish point and regional ratios.
- 能检查简单幂律奇点的可积性。 / I can check integrability of a simple power singularity.

## 16. 对称性、守恒量与优化边界 / Symmetry, conserved quantities and optimization limits

Source: Part2/Part2_Lecture5.pdf, PDF 2–3, printed 15–16.

### 直观问题 / Intuition question

优化中的守恒量，为什么有时反而妨碍靠近低损失区？

Why can an additional invariant obstruct movement toward low loss?

### 讲解 / Explanation

连续对称性限制动力学可走的方向。旋转不变的 Hamiltonian 保持角动量，轨迹可能无法径直向内。破坏旋转对称性可产生力矩，同时仍保留时间平移对称性与能量守恒。

Continuous symmetries constrain dynamics. A rotationally invariant Hamiltonian conserves angular momentum, which can obstruct radial motion. Breaking rotation symmetry introduces torque while preserving time-translation symmetry and energy conservation.

### 必要概念 / Concepts

**循环坐标 / Cyclic coordinates**

若 H 不依赖 qᵢ，其共轭动量 pᵢ 守恒；这是 Hamilton 方程的直接结果。

If H does not depend on qᵢ, its conjugate momentum pᵢ is conserved, directly by Hamilton’s equations.

$$
\partial_{q_i}H=0\Rightarrow\dot p_i=0
$$

**旋转生成元 / Rotation generator**

二维角动量 J=xpᵧ−ypₓ，等于极坐标中的共轭角动量 pφ。旋转不变时 φ 是循环坐标。

In two dimensions J=xpᵧ−ypₓ is conjugate to the polar angle φ. With rotation invariance, φ is cyclic.

$$
\dot J=-\partial_\varphi H
$$

**材料边界 / Scope of the materials**

来源把此思想联系到语言模型，但没有提供训练代码、数据或完整基准。本课件止于已提供 Part 1/2；Part 3 的 NTK 与 Part 4 的扩散、transformer 仅作预告。

The source connects this idea to language models but provides no training code, data or complete benchmark. This courseware covers supplied Parts 1/2. Part 3 NTK and Part 4 diffusion/transformers remain previews.

### 公式推导 / Derivation

**带角向变化的教学 Hamiltonian / A teaching Hamiltonian with angular dependence**

取 r>0、|ε|<1，使质量因子为正。

Take r>0 and |ε|<1 to keep the mass factor positive.

$$
H=\tfrac12[r^2(1+\epsilon\cos2\varphi)]^\gamma|p|^2
$$

**对角度求偏导 / Differentiate with respect to angle**

固定 r 与极坐标共轭动量；|p|²=pᵣ²+J²/r² 无显式 φ。

Hold r and polar canonical momenta fixed; |p|²=pᵣ²+J²/r² has no explicit φ.

$$
\dot J=\gamma\epsilon r^{2\gamma}|p|^2\sin2\varphi(1+\epsilon\cos2\varphi)^{\gamma-1}
$$

**分别检查两种守恒 / Check two invariants separately**

ε=0 时力矩处处为零；ε≠0 破坏旋转对称，但 H 无显式时间仍守恒。

At ε=0 the torque vanishes everywhere. Nonzero ε breaks rotation symmetry, but H remains conserved because it has no explicit time dependence.

$$
\epsilon=0\Rightarrow\dot J=0;\qquad\partial_tH=0\Rightarrow dH/dt=0
$$

### 例题 / Worked example

**相同能量结构，不同角动量变化 / Conserved energy with changing angular momentum**

ε=0 时任意 φ 都有 J̇=0。取 ε=0.3、φ=45°，sin(90°)=1，因此 J̇=0.3。H 仍不显含时间；角动量变化不等于能量不守恒。

At ε=0, J̇=0 for every angle. For ε=0.3,φ=45°, sin(90°)=1 and J̇=0.3. H remains explicitly time independent; changing angular momentum does not imply changing energy.

### 交互模型 / Interactive model

破坏旋转对称，产生力矩

Break rotational symmetry and create torque

### 单位、假设与边界 / Units, assumptions and limits

取 r=1、|p|=1、γ=1，改变各向异性 ε 和角度 φ（度）。画瞬时 J̇=εsin(2φ)，不积分完整轨道，不宣称改进真实网络性能；全部无量纲。

Set r=1,|p|=1,γ=1; vary anisotropy ε and angle φ in degrees. Plot instantaneous J̇=εsin(2φ). No full orbit is integrated and no network performance improvement is claimed. All quantities are dimensionless.

### 自测 1 / Self-check 1

旋转对称被破坏后，能量一定不守恒吗？

Does broken rotational symmetry necessarily destroy energy conservation?

1. 是 / Yes
2. 否 / No

Answer: 2

能量与时间平移对称性相关。

Energy conservation is tied to time-translation symmetry.

### 自测 2 / Self-check 2

J̇ 在一个角度恰好为零，能证明旋转对称吗？

Does zero torque at one angle prove rotational symmetry?

1. 不能 / No
2. 能 / Yes

Answer: 1

对称性要求 Hamiltonian 对所有角度无依赖。

Symmetry requires angle independence everywhere, not at a single point.

### 自学学习目标 / Self-study goals

- 由 Hamilton 方程证明循环坐标对应动量守恒。 / Prove momentum conservation for cyclic coordinates.
- 直接计算角动量导数，区分旋转与时间平移对称性。 / Compute angular-momentum derivatives and distinguish rotation from time-translation symmetry.
- 解释额外守恒量如何限制探索，而对称破缺为何不保证遍历。 / Explain restricted exploration and why symmetry breaking does not ensure ergodicity.

上一章的微正则解释需要动力学充分探索。本章研究探索可能受到哪些守恒量限制，并回顾整门课中“推导、模型和实验观察”的不同角色。

The previous chapter’s microcanonical interpretation required sufficient exploration. Examine how invariants restrict it and review the roles of derivations, models and empirical observations throughout the course.

### 基础补习 / Foundation refresher

对称性、循环坐标和角动量 / Symmetry, cyclic coordinates and angular momentum

对称性表示做某类变换后数学规律不变。平移把位置整体加一个数，旋转改变方向而保持长度，时间平移改变时间原点。三种变换不同，相关的守恒量也不同，不能因为都叫对称性就混用。

A symmetry leaves the mathematical rule unchanged under a transformation. Translation shifts positions, rotation changes direction while preserving length, and time translation shifts the time origin. These are different symmetries with different conserved quantities.

在正则坐标 (qᵢ, pᵢ) 中，若 H 不显含某个 qᵢ，就称该坐标循环。Hamilton 方程直接给 ṗᵢ=−∂H/∂qᵢ=0。qᵢ 仍可变化；守恒的是它的共轭动量。

In canonical coordinates (qᵢ, pᵢ), a coordinate absent from H is cyclic. Hamilton’s equation gives ṗᵢ=0 directly. The coordinate may still change; it is its conjugate momentum that stays fixed.

$$
J=xp_y-yp_x,\quad\frac{dJ}{dt}=\dot xp_y+x\dot p_y-\dot yp_x-y\dot p_x
$$

二维角动量 J 表示绕原点的旋转运动，与极坐标角 φ 的共轭动量相同。笛卡尔动量范数在极坐标中为 pᵣ²+J²/r²。对 φ 求偏导时应固定正则变量 r、pᵣ、J，不是固定任意混合坐标。

The planar angular momentum J is conjugate to polar angle φ. Cartesian momentum norm becomes pᵣ²+J²/r². Differentiate φ while holding canonical variables r, pᵣ, J fixed, not an arbitrary mixed set of variables.

如果 Hamiltonian 不显含时间，dH/dt=0；如果它不依赖 φ，J̇=0。这两个条件可以独立成立。一个方向受力矩并不自动意味着能量被摩擦耗散。

Time independence gives dH/dt=0; angle independence gives J̇=0. These conditions can hold separately. Torque does not automatically imply dissipative energy loss.

回看 / Review: Chapter 10 #foundation: Hamilton 方程 / Hamilton equations; Chapter 14 #foundation: 沿轨迹求导与能量 / Trajectory derivatives and energy; Chapter 15 #foundation: 能量面与遍历假设 / Energy shells and ergodicity

### 直观详解 / Motivation

固定能量 E 给一个可达壳面；再固定 J，会把允许状态限制到两者的交集。额外约束可以减少访问范围，但具体是否形成径向屏障取决于 Hamiltonian。本课程不能把恒质量球的直觉直接套到所有变质量模型。

Fixing energy E restricts states to a shell; fixing J restricts them to an intersection. Extra constraints reduce accessibility, but a radial barrier depends on the Hamiltonian. Constant-mass ball intuition must not be transferred blindly to every variable-mass model.

破坏旋转对称性使 J 可以变化，因而解除这一特定约束。但系统仍可能有其他不变量、规则轨道或不充分探索，不能据此宣布已经遍历或必定训练更好。

Breaking rotation symmetry allows J to change and removes that particular restriction. Other invariants, regular orbits or poor exploration may remain, so neither ergodicity nor better training follows automatically.

### 概念详解 / Detailed concepts

$$
H=\tfrac12 A(r,\varphi)|p|^2,\quad A=[r^2(1+\epsilon\cos2\varphi)]^\gamma
$$

r>0、|ε|<1 保证括号正。γ 控制损失因子的幂，ε 控制角向各向异性。页面取 γ=1、r=1、|p|=1，只计算指定状态的瞬时力矩，未解完整轨道。

r>0 and |ε|<1 keep the factor positive. γ controls the power and ε angular anisotropy. The page fixes γ=r=|p|=1 and calculates instantaneous torque at specified states, not a full trajectory.

ε=0 时 H 对所有 φ 都相同，这是旋转对称。ε≠0 但 φ 恰为 0° 或 90° 时，力矩也可为零；一个点上的零导数不等于整个函数没有角度依赖。

At ε=0, H is independent of all angles. For nonzero ε, torque can still vanish at particular angles such as 0° or 90°. A zero derivative at a point does not establish global angle independence.

本章的对称破缺模型是教学补充。来源提及语言模型性能，但没有在仓库中提供相应数据或基准；它不能成为本页图形的实验证据。

This anisotropic model is a teaching addition. Source claims about language-model performance lack corresponding data or benchmarks here and are not evidence generated by this plot.

### 完整推导 / Complete derivation

先验证一般循环坐标结论，再对具体角向因子求导。

First verify cyclic-coordinate conservation, then differentiate the angular factor.

$$
\partial_{q_i}H=0\Rightarrow\dot p_i=0,\quad\dot J=-\partial_\varphi H
$$

$$
\partial_\varphi(1+\epsilon\cos2\varphi)=-2\epsilon\sin2\varphi
$$

$$
\partial_\varphi H=-\gamma\epsilon r^{2\gamma}|p|^2\sin2\varphi(1+\epsilon\cos2\varphi)^{\gamma-1}
$$

$$
\dot J=\gamma\epsilon r^{2\gamma}|p|^2\sin2\varphi(1+\epsilon\cos2\varphi)^{\gamma-1}
$$

负号来自 Hamilton 方程，抵消对余弦求导的负号。页面固定值后简化为 εsin(2φ)，控件度数在计算时先转弧度。

Hamilton’s minus sign cancels the cosine derivative’s minus sign. The displayed setting reduces to εsin(2φ), with degrees converted to radians.

$$
\dot H=\sum_i(\partial_{q_i}H\partial_{p_i}H-\partial_{p_i}H\partial_{q_i}H)+\partial_tH=0
$$

最后一式只用时间无显式依赖，与 ε 是否为零无关。所以允许 J 改变与 H 守恒没有矛盾。

The last equality needs time independence, not ε=0. Changing J is consistent with conserving H.

### 实验任务 1 / Experiment task 1

**predict**

对称时所有角度的力矩都是多少？

What is torque at every angle in the symmetric case?

**action**

设 ε=0，将 φ 从 0° 调到 180°。

Set ε=0 and vary φ over 0°–180°.

**record**

记录曲线与读数。

Record the curve and output.

**explanation**

处处为零，才与全局角度独立相符。

It vanishes everywhere, consistent with global angle independence.

### 实验任务 2 / Experiment task 2

**predict**

同一 ε 下，45° 与 135° 的力矩有什么关系？

How do torques at 45° and 135° compare?

**action**

取 ε=0.3，分别设置两角度。

Set ε=0.3 and both angles.

**record**

记录符号与幅度。

Record signs and magnitudes.

**explanation**

分别为 +0.3 与 −0.3；两个角向区域的 J 变化方向相反。

They are +0.3 and −0.3, showing opposite changes in J.

### 实验任务 3 / Experiment task 3

**predict**

0° 力矩为零能证明对称吗？

Does zero torque at 0° prove symmetry?

**action**

保持 ε=0.3，比较 0° 与 45°。

At ε=0.3 compare 0° and 45°.

**record**

记录两个值并说明函数是否处处为零。

Record both values and whether the function vanishes everywhere.

**explanation**

0° 是一个驻角，45° 非零；旋转对称仍然被破坏。

0° is a stationary angle, but 45° is not; rotation symmetry is broken.

### 完整例题 1 / Worked example 1: 时间无关但角动量变化 / Time independence with changing angular momentum

取 γ=1、r=1、|p|=1、ε=0.3、φ=45°。cos90°=0，sin90°=1。

Take γ=r=|p|=1,ε=0.3,φ=45°. Then cos90°=0, sin90°=1.

$$
H=\tfrac12,\quad\dot J=0.3
$$

这只给该状态的瞬时导数。下一时刻 r、p 和 φ 可能改变，不能把 J̇=0.3 外推成整段轨迹的恒定斜率。

These are instantaneous values. Later r, p and φ can change; do not extrapolate torque as a constant along the whole path.

### 完整例题 2 / Worked example 2: 传统角动量屏障及其适用边界 / A traditional angular-momentum barrier and its limits

对恒质量中心自由 Hamiltonian H=(pᵣ²+J²/r²)/(2m)，固定非零 J 与能量 E，径向动量平方非负给半径下界。

For constant-mass central free H=(pᵣ²+J²/r²)/(2m), nonnegative radial kinetic energy gives a radius bound at fixed J, E.

$$
E\ge J^2/(2mr^2)\Rightarrow r\ge |J|/\sqrt{2mE}
$$

但若 m=2/r²，角向能量 J²/(2mr²)=J²/4 不再随 r 发散。这说明额外守恒量虽限制状态，是否阻碍径向靠近仍须检查具体模型；不能把恒质量屏障当通用定理。

For m=2/r², the angular energy is J²/4 and no longer diverges as r→0. Extra invariants restrict states, but radial obstruction depends on the model; the constant-mass barrier is not universal.

### 开放练习 1 / Open exercise 1

H=p²/2 完全不依赖 q，q 是否不动？

If H=p²/2 is independent of q, must q remain fixed?

Hint 1: 循环坐标守恒的是 p。 / The conserved variable is p.

Hint 2: 还要算 q̇=∂pH。 / Also evaluate q̇=∂pH.

Solution:

p 恒定，q̇=p，一般仍匀速运动。只有 p=0 时 q 才不变。

p is constant and q̇=p, so q generally moves uniformly; only p=0 fixes q.

### 开放练习 2 / Open exercise 2

ε=0.4、φ=30°，页面条件下 J̇ 是多少？

At ε=0.4,φ=30°, find the page-model torque.

Hint 1: 使用 sin(2φ)。 / Use sin(2φ).

Hint 2: sin60°=√3/2。 / sin60°=√3/2.

Solution:

$$
\dot J=0.4\sqrt3/2\approx0.34641
$$

### 开放练习 3 / Open exercise 3

移除一个守恒量能证明遍历或全局优化吗？

Does removing one invariant prove ergodicity or global optimization?

Hint 1: 还有哪些动力学限制可能存在？ / What other dynamical restrictions may remain?

Hint 2: 区分解除必要障碍与证明充分条件。 / Distinguish removing an obstruction from proving sufficient conditions.

Solution:

不能。还可能有其他守恒量、不连通能量面、规则轨道或极慢混合。需要独立的数学分析或明确定义的实验，且算法性能还取决于目标和资源。

No. Other invariants, disconnected shells, regular orbits or slow mixing may remain. Independent analysis or specified experiments are needed, and performance also depends on objectives and resources.

### 选择题补充解释 / Multiple-choice discussion

旋转与时间平移是不同对称性，H 无显式时间依赖仍可守恒。

Rotation and time translation are different symmetries; time-independent H can remain conserved.

单点驻值不是处处角度独立；必须检查整个函数。

A stationary point does not establish angle independence everywhere.

### 章末复习 / Review

全课程从函数和数据开始，经损失、求导与优化，最后回到动力学和统计解释。每个跨越都要检查假设：可逆、稳定、无偏、可积或可遍历。

The course moves from functions and data through loss, differentiation and optimization to dynamics and statistical interpretation. Each bridge has assumptions: invertibility, stability, unbiasedness, integrability or ergodicity.

- 把某个角度力矩为零当作旋转对称。 / Mistaking zero torque at one angle for rotation symmetry.
- 认为破坏旋转就破坏能量守恒，或解除一个约束就保证遍历。 / Assuming broken rotation destroys energy conservation or guarantees ergodicity.

- 能从循环坐标直接推出守恒量。 / I can derive an invariant from a cyclic coordinate.
- 能逐步求角向导数并检查符号。 / I can differentiate the angular factor and check signs.
- 能说明现有材料支持哪些结论、没有验证哪些结论。 / I can distinguish supported conclusions from unverified ones.

