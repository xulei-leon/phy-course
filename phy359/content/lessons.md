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

