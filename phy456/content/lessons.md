# PHY456H1 — 24 页双语内容稿

独立教学改编；来源与内容边界见 README.md。每一编号对应一个独立网页，不是打印页数。

---

## 01 · 量子态、基底与测量 / States, bases and measurement

### 直观问题 / Intuition

同一个电子，为什么沿 z 方向测量确定，沿 x 方向却随机？

Why can the same electron have a definite z measurement but a random x measurement?

量子态包含对所有测量的预测；某一测量基底中的确定性，不代表在其他基底中也确定。先把态展开，再对振幅取模平方，不能先把振幅当概率。

A state predicts all measurements. Certainty in one measurement basis does not imply certainty in another. Expand the state first, then square amplitude magnitudes; amplitudes are not probabilities.

### 必要概念 / Concepts

### 态与整体相位 / States and global phase

归一化态的内积为 1。乘共同相位不改变任何测量概率；相对相位则会改变其他基底中的干涉。

A normalized state has unit norm. A common phase changes no measurement probability; a relative phase can change interference in another basis.

$$
|\psi\rangle=\cos\frac\theta2|+z\rangle+e^{i\phi}\sin\frac\theta2|-z\rangle
$$

### 投影与 Born 规则 / Projection and the Born rule

理想投影测量的概率由投影算符给出。测量后态要重新归一化；简并结果投影到整个本征子空间。

An ideal projective measurement uses projectors. The post-measurement state must be renormalized; a degenerate outcome projects onto the full eigenspace.

$$
P(a)=\langle\psi|\Pi_a|\psi\rangle
$$

### 基底不是另一种物理态 / A basis is a representation

同一态在不同基底下有不同坐标。改变写法不等于施加物理旋转；旋转态是一个主动的幺正操作。

The same state has different coordinates in different bases. Rewriting coordinates is not applying a physical rotation; rotating a state is an active unitary operation.

### 公式推导 / Derivation

### 写出 x 本征态 / Write the x eigenstate

在 z 基底中取正相位约定。

Choose the positive-phase convention in the z basis.

$$
|+x\rangle=(|+z\rangle+|-z\rangle)/\sqrt2
$$

### 计算振幅 / Compute the amplitude

内积是复数，先相加再取模。

The inner product is complex; add before taking its modulus.

$$
\langle+x|\psi\rangle=\frac{\cos(\theta/2)+e^{i\phi}\sin(\theta/2)}{\sqrt2}
$$

### 展开模平方 / Expand the squared modulus

交叉项留下相对相位的余弦。

The cross term retains the cosine of the relative phase.

$$
P(+x)=\frac{1+\sin\theta\cos\phi}{2},\quad P(-x)=1-P(+x)
$$

### 交互实验 / Interactive model

改变相对相位，观察测量概率

Change relative phase and measure

纯自旋 1/2 态；θ、φ 以度输入。理想测量无退相干，显示理论概率而非随机实验计数。

Pure spin-1/2 states; enter θ and φ in degrees. Ideal measurements without decoherence; outputs are theoretical probabilities, not experimental counts.

### 输入与范围 / Controls and ranges

- 极角 θ（度） / Polar angle θ (degrees): 0–180, step 1, default 90
- 相对相位 φ（度） / Relative phase φ (degrees): 0–360, step 1, default 0

### 例题 / Worked example

### 同一 z 分布，不同 x 分布 / Same z distribution, different x distribution

取 θ=90°。φ=0° 时为 |+x⟩，P(+x)=1；φ=90° 时 P(+x)=1/2。两者的 z 正负概率始终各为 1/2，说明仅知道一个基底的概率不足以重建态。

Set θ=90°. At φ=0° the state is |+x⟩ and P(+x)=1; at φ=90°, P(+x)=1/2. Both have equal z probabilities. Probabilities in a single basis do not reconstruct a state.

### 自测与解释 / Self-check

1. 整体相位会改变测量概率吗？ / Does a global phase change measurement probabilities?

   A. 会 / Yes
   B. 不会 / No

答案 / Answer: B

共同相位在振幅模平方中相消。

A common phase cancels in squared amplitude magnitudes.

2. |+z⟩ 测量 Sx 得到正值的概率？ / What is the probability of positive Sx in |+z⟩?

   A. 1 / 1
   B. 0 / 0
   C. 1/2 / 1/2

答案 / Answer: C

在 x 基底中两个振幅的模均为 1/√2。

Both x-basis amplitudes have magnitude 1/√2.

---

## 02 · 幺正演化与相对相位 / Unitary evolution and relative phase

### 直观问题 / Intuition

能量不随时间变化，量子态还能变化吗？

Can a quantum state change while its energy distribution stays constant?

能量本征态只积累整体相位；不同能量的叠加态积累相对相位，因此其他观测量可以振荡。能量分布不变与态不变是不同陈述。

An energy eigenstate acquires only a global phase. A superposition of different energies acquires relative phase, so other observables can oscillate. A constant energy distribution does not mean a constant state.

### 必要概念 / Concepts

### 薛定谔方程 / The Schrödinger equation

哈密顿量决定封闭系统的时间演化。厄米性保证范数守恒；这里不讨论测量过程和开放系统。

The Hamiltonian generates closed-system evolution. Hermiticity preserves the norm. Measurement processes and open systems are outside this model.

$$
i\hbar\partial_t|\psi(t)\rangle=H|\psi(t)\rangle
$$

### 时间无关的 H / Time-independent H

只有 H 不随时间变化时，演化可直接写为普通指数。一般含时 H 需要时间排序，不能随意交换不同时刻的 H。

For time-independent H, evolution is an ordinary exponential. A general time-dependent H requires time ordering because Hamiltonians at different times need not commute.

$$
U(t)=e^{-iHt/\hbar},\quad U^\dagger U=I
$$

### 相位差设定时钟 / Energy gaps set a clock

两能级的相位差由能隙决定。给 H 加常数只改变共同相位，不改变这个系统内部的测量概率。

A two-level relative phase is set by the energy gap. Adding a constant to H changes only a common phase and leaves internal measurement probabilities unchanged.

### 公式推导 / Derivation

### 按能量基展开 / Expand in energy eigenstates

选择两个正交本征态，初态等权。

Choose two orthogonal energy eigenstates with equal initial weights.

$$
|\psi(0)\rangle=(|0\rangle+|1\rangle)/\sqrt2
$$

### 分别演化 / Evolve each component

线性性让每一项积累自己的相位。

Linearity lets each term acquire its own phase.

$$
|\psi(t)\rangle=\frac{e^{-iE_0t/\hbar}|0\rangle+e^{-iE_1t/\hbar}|1\rangle}{\sqrt2}
$$

### 投回初态 / Project onto the initial state

扣去整体相位，返回概率由能隙 ΔE 决定。

Remove a common phase; the return probability depends on ΔE.

$$
P_{\rm return}(t)=\cos^2\frac{(E_1-E_0)t}{2\hbar}
$$

### 交互实验 / Interactive model

能隙与返回概率

Energy gap and return probability

能量单位 E*，时间单位 ℏ/E*；初态为等权叠加。封闭两能级、时间无关 H，图中 τ=tE*/ℏ。

Energy unit E*, time unit ℏ/E*. Equal initial superposition; closed two-level system with constant H. The graph uses τ=tE*/ℏ.

### 输入与范围 / Controls and ranges

- 能隙 ΔE/E* / Gap ΔE/E*: 0–4, step 0.05, default 2
- 时间 τ=tE*/ℏ / Time τ=tE*/ℏ: 0–10, step 0.05, default 1

### 例题 / Worked example

### 第一次正交 / First orthogonal state

取 ΔE=2E*。第一次返回概率为零要求 ΔE t/(2ℏ)=π/2，故 t=πℏ/(2E*)；完整返回周期为 πℏ/E*。这里不是能量测量概率在振荡。

Let ΔE=2E*. The first zero requires ΔE t/(2ℏ)=π/2, so t=πℏ/(2E*); the return period is πℏ/E*. The energy-measurement probabilities themselves do not oscillate.

### 自测与解释 / Self-check

1. 给所有能量加同一个常数会改变返回概率吗？ / Does shifting every energy by the same constant change the return probability?

   A. 会 / Yes
   B. 不会 / No

答案 / Answer: B

返回概率只含能量差。

Only energy differences enter.

2. 单个能量本征态的返回概率是多少？ / What is the return probability for one energy eigenstate?

   A. 始终为 1 / Always 1
   B. 周期变成 0 / Periodically 0

答案 / Answer: A

它仅积累整体相位。

It acquires only a global phase.

---

## 03 · 海森堡绘景与 Ehrenfest 定理 / Heisenberg picture and Ehrenfest theorem

### 直观问题 / Intuition

把时间变化从态转移到算符，会改变物理预测吗？

Does moving time dependence from states to operators change predictions?

两种绘景是同一个演化的不同记账方式。必须同时变换态和算符，才能比较同一初态、同一测量。Ehrenfest 定理联系量子期望值与经典方程，但不保证任意波包都沿经典轨迹运动。

The two pictures keep track of the same evolution differently. Transform both states and operators to compare the same preparation and measurement. Ehrenfest connects expectation values to classical equations, but arbitrary wave packets need not follow classical trajectories.

### 必要概念 / Concepts

### 绘景变换 / Picture transformation

以初始时刻为参考，海森堡态固定，算符随幺正变换演化。

Using the initial time as reference, the Heisenberg state is fixed and operators evolve unitarily.

$$
A_H(t)=U^\dagger(t)A_SU(t)
$$

### 对易子产生动力学 / Commutators generate dynamics

若薛定谔算符本身显含时间，必须保留偏导项。H 与自身对易不意味着所有量都守恒。

Retain the explicit derivative when the Schrödinger operator itself depends on time. H commuting with itself does not make all observables conserved.

$$
\frac{dA_H}{dt}=\frac{i}{\hbar}[H_H,A_H]+\left(\frac{\partial A_S}{\partial t}\right)_H
$$

### 经典极限的条件 / Conditions for classical behavior

一般有 ⟨V′(x)⟩≠V′(⟨x⟩)。谐振子势的导数是线性的，所以期望值方程恰好闭合；这并不消除量子涨落。

Generally ⟨V′(x)⟩ differs from V′(⟨x⟩). A harmonic potential has a linear derivative, so expectation-value equations close exactly; quantum fluctuations still remain.

### 公式推导 / Derivation

### 位置方程 / Position equation

对 H=p²/(2m)+V(x) 使用正则对易关系。

Use the canonical commutator for H=p²/(2m)+V(x).

$$
[x,p]=i\hbar\quad\Rightarrow\quad\frac{d\langle x\rangle}{dt}=\frac{\langle p\rangle}{m}
$$

### 动量方程 / Momentum equation

势能与动量的对易子给出力。

The potential-momentum commutator gives the force.

$$
\frac{d\langle p\rangle}{dt}=-\langle V'(x)\rangle
$$

### 谐振子闭合 / Close the oscillator equations

代入 V=mω²x²/2 得到精确的期望值解。

Insert V=mω²x²/2 to obtain an exact expectation-value solution.

$$
\langle x(t)\rangle=x_0\cos\omega t+\frac{p_0}{m\omega}\sin\omega t
$$

### 交互实验 / Interactive model

期望值的相空间轨迹

Expectation values in phase space

谐振子取 m=ω=ℏ=1，以振子长度和动量为单位。只画一阶矩，不表示完整波函数或单次粒子轨迹。

Oscillator units m=ω=ℏ=1. Only first moments are plotted; this is neither the full wave function nor a single-particle trajectory.

### 输入与范围 / Controls and ranges

- 初始位置 ⟨x⟩/ℓ / Initial position ⟨x⟩/ℓ: -2–2, step 0.1, default 1
- 初始动量 ⟨p⟩ℓ/ℏ / Initial momentum ⟨p⟩ℓ/ℏ: -2–2, step 0.1, default 0
- 时间 ωt / Time ωt: 0–6.28, step 0.01, default 1.57

### 例题 / Worked example

### 四分之一周期 / Quarter of a period

取 x₀=1、p₀=0、m=ω=1。t=π/2 时 ⟨x⟩=0，⟨p⟩=−1。动能与势能的一阶矩贡献交换；完整平均能量还包含方差项。

With x₀=1, p₀=0 and m=ω=1, at t=π/2 we have ⟨x⟩=0 and ⟨p⟩=−1. The first-moment kinetic and potential contributions exchange; the full mean energy also contains variance terms.

### 自测与解释 / Self-check

1. 两种绘景的测量期望值是否相同？ / Are expectation values identical in both pictures?

   A. 相同 / Yes
   B. 总是不同 / Always different

答案 / Answer: A

幺正变换在完整内积中相消。

The unitary transformations cancel in the full inner product.

2. 任意势都有 ⟨V′(x)⟩=V′(⟨x⟩) 吗？ / Does every potential satisfy ⟨V′(x)⟩=V′(⟨x⟩)?

   A. 有 / Yes
   B. 没有 / No

答案 / Answer: B

非线性力通常依赖更高阶矩。

Nonlinear forces generally depend on higher moments.

---

## 04 · WKB：局部波长与转折点 / WKB: local wavelength and turning points

### 直观问题 / Intuition

势能缓慢变化时，能否把波函数看作波长缓慢变化的波？

In a slowly varying potential, can a wave function have a slowly varying wavelength?

WKB 把相位梯度解释为局部动量，同时调节振幅以保持通量。缓慢变化是相对于局部波长而言；经典转折点处动量为零，普通 WKB 必然失效，需要连接公式。

WKB interprets the phase gradient as local momentum and adjusts amplitude to preserve flux. Slow variation is measured against the local wavelength. At a classical turning point momentum vanishes, so ordinary WKB fails and connection formulas are needed.

### 必要概念 / Concepts

### 允许区与禁阻区 / Allowed and forbidden regions

E>V 时局部动量为实数，解振荡；E<V 时用正的衰减率 κ 描述指数解。禁阻区不等于波函数为零。

For E>V the momentum is real and solutions oscillate. For E<V a positive κ describes exponentials. A forbidden region does not imply a zero wave function.

$$
k(x)=\sqrt{2m(E-V)}/\hbar,\qquad\kappa(x)=\sqrt{2m(V-E)}/\hbar
$$

### 振幅与通量 / Amplitude and flux

对单向行波，流密度与 k|ψ|² 成正比，所以振幅随 1/√k 变化。驻波是两支行波的叠加。

For a traveling wave the current is proportional to k|ψ|², so amplitude varies as 1/√k. A standing wave combines two traveling branches.

$$
\psi_\pm\simeq\frac{C_\pm}{\sqrt{k(x)}}e^{\pm i\int^x k(s)ds}
$$

### 局部有效性 / Local validity

要求波数在一个局部波长内只改变很少。简单平滑转折点附近用 Airy 函数连接；突变势阶不能直接套平滑连接式。

Require little change of wave number over a local wavelength. Airy functions connect across a simple smooth turning point. An abrupt potential step does not obey that smooth connection rule.

$$
|k'|/k^2\ll1
$$

### 公式推导 / Derivation

### 振幅—相位代入 / Insert amplitude and phase

把实振幅 A 与快速相位 S 分开，收集不同量级。

Separate real amplitude A and rapid phase S and collect orders.

$$
\psi=Ae^{iS/\hbar},\quad (S')^2\simeq2m(E-V)
$$

### 虚部确定振幅 / Use the imaginary part

下一阶要求概率通量不随位置变化。

The next order enforces a position-independent current.

$$
2A'S'+AS''=0\Rightarrow A\propto1/\sqrt{|S'|}
$$

### 检查误差尺度 / Check the error scale

忽略 A 的二阶导数；靠近 k=0 时这个层级不再成立。

Neglect the second derivative of A; the hierarchy fails near k=0.

$$
|A''|\ll k^2|A|
$$

### 交互实验 / Interactive model

检查线性势的 WKB 指标

Check WKB validity in a linear potential

无量纲坐标 ξ，方程 ψ″+[ε−v(ξ)]ψ=0，取 v=sξ、ε=2。仅采样允许区 ξ∈[0,1]，s≤1.8；指标小是必要的局部检查，不是全局误差保证。

Dimensionless ξ with ψ″+[ε−v(ξ)]ψ=0, v=sξ and ε=2. Sample only ξ∈[0,1], s≤1.8. A small indicator is a local check, not a global error guarantee.

### 输入与范围 / Controls and ranges

- 势斜率 s / Potential slope s: 0–1.8, step 0.02, default 1
- 位置 ξ / Position ξ: 0–1, step 0.01, default 0.5

### 例题 / Worked example

### 离转折点有多远？ / How far from the turning point?

取 s=1、ξ=1，k=1、|k′|=1/2，指标为 0.5，不能称为远小于 1。ξ→2 时 k→0，指标发散，说明必须换用转折点近似。

For s=1 and ξ=1, k=1 and |k′|=1/2, giving an indicator of 0.5, not much smaller than 1. As ξ→2, k→0 and the indicator diverges, requiring a turning-point approximation.

### 自测与解释 / Self-check

1. 简单转折点处普通 WKB 是否有效？ / Is ordinary WKB valid at a simple turning point?

   A. 有效 / Yes
   B. 失效 / No

答案 / Answer: B

k=0 破坏缓变层级并使 WKB 振幅发散。

k=0 breaks the hierarchy and makes the WKB amplitude diverge.

2. 行波振幅与哪个量成正比？ / What is the traveling-wave amplitude proportional to?

   A. √k / √k
   B. 1/√k / 1/√k

答案 / Answer: B

这使 k|ψ|² 保持不变。

This keeps k|ψ|² constant.

---

## 05 · WKB 量子化与束缚态 / WKB quantization and bound states

### 直观问题 / Intuition

经典粒子可有连续能量，为什么束缚态只允许某些能量？

Why do bound states allow selected energies while classical motion allows a continuum?

左右边界对同一个波函数提出相位匹配条件。两个平滑转折点各带来连接相位，形成半整数修正。边界类型很重要：无限高墙不能直接当作平滑转折点。

The two boundaries impose phase matching on one wave function. Two smooth turning points contribute connection phases and a half-integer correction. Boundary type matters: an infinite wall is not a smooth turning point.

### 必要概念 / Concepts

### 作用量积分 / The action integral

在允许区两端 x₁、x₂ 满足 E=V。用动量积分衡量波函数累积的相位。

The allowed-region endpoints satisfy E=V. The momentum integral measures accumulated phase.

$$
\int_{x_1}^{x_2}p(x)dx=(n+\tfrac12)\pi\hbar,\quad n=0,1,\ldots
$$

### 半整数的来源 / Origin of the half integer

连接到两侧衰减解要求匹配相位。这里限于一维、两个简单平滑转折点；径向问题和硬墙有不同处理。

Matching to decaying solutions on both sides fixes the phase. This formula assumes one dimension and two simple smooth turning points; radial problems and hard walls require different treatment.

### 近似不等于总有误差 / An approximation can be exact in special cases

谐振子的 WKB 能级恰好等于精确结果，但并不说明其 WKB 波函数在转折点也精确。

Harmonic-oscillator WKB energies happen to be exact; the WKB wave functions still fail at turning points.

### 公式推导 / Derivation

### 求谐振子转折点 / Find oscillator turning points

设 V=mω²x²/2。

Let V=mω²x²/2.

$$
x_{1,2}=\mp a,\quad a=\sqrt{2E/(m\omega^2)}
$$

### 计算半椭圆面积 / Evaluate the half-ellipse area

相空间轨道是椭圆；从左到右积分给出半个封闭作用量。

The phase-space orbit is an ellipse; the left-to-right integral is half the closed action.

$$
\int_{-a}^{a}\sqrt{2mE-m^2\omega^2x^2}\,dx=\pi E/\omega
$$

### 施加量子化条件 / Impose quantization

与相位条件联立即得零点能。

Combine with phase matching to obtain zero-point energy.

$$
E_n=\hbar\omega(n+\tfrac12)
$$

### 交互实验 / Interactive model

量子数、转折点与能量

Quantum number, turning point and energy

谐振子单位 ℏ=ω=m=1，n 为非负整数。显示能级与势阱、经典转折点，不将曲线解释为粒子实际轨迹。

Oscillator units ℏ=ω=m=1, with nonnegative integer n. Shows energy levels, potential and classical turning points, not actual particle paths.

### 输入与范围 / Controls and ranges

- 量子数 n / Quantum number n: 0–8, step 1, default 2

### 例题 / Worked example

### 第二激发态 / Second excited state

n=2 时 E=2.5ℏω。用振子长度 ℓ=√(ℏ/mω)，转折点为 x=±√5 ℓ。不要把“第二激发态”误写成 n=1。

For n=2, E=2.5ℏω. In oscillator length ℓ=√(ℏ/mω), turning points are x=±√5 ℓ. The second excited state has n=2, not n=1.

### 自测与解释 / Self-check

1. 此处半整数条件适用于哪种边界？ / Which boundaries fit this half-integer rule?

   A. 两个平滑简单转折点 / Two simple smooth turning points
   B. 任意硬墙 / Any hard walls

答案 / Answer: A

连接相位依赖边界类型。

Connection phases depend on boundary type.

2. 谐振子 WKB 能级准确意味着转折点波函数也准确吗？ / Do exact oscillator WKB energies imply exact turning-point wave functions?

   A. 意味着 / Yes
   B. 不意味着 / No

答案 / Answer: B

局部 WKB 振幅仍在转折点发散。

The local WKB amplitude still diverges at a turning point.

---

## 06 · 隧穿与指数灵敏度 / Tunneling and exponential sensitivity

### 直观问题 / Intuition

只增加一点势垒宽度，透射率为什么可能下降几个数量级？

Why can a small increase in barrier width suppress transmission by orders of magnitude?

禁阻区中的波函数随作用量指数衰减。透射率是振幅的模平方，因此指数多一个因子 2。指数趋势很有用，但前因子和转折点匹配仍决定精度。

A wave function decays exponentially with forbidden-region action. Transmission is a squared amplitude, producing a factor of two in the exponent. The trend is useful, but prefactors and boundary matching still matter.

### 必要概念 / Concepts

### 势垒作用量 / Barrier action

对两个转折点之间的禁阻区积分，κ 为正。

Integrate positive κ across the forbidden region between turning points.

$$
K=\int_{x_1}^{x_2}\kappa(x)dx,\quad T\sim e^{-2K}
$$

### 矩形势垒作为对照 / A rectangular-barrier comparison

矩形势垒有突变边界，采用精确匹配解作参照。单纯指数忽略边界前因子，不是平滑连接公式的直接应用。

A rectangular barrier has abrupt boundaries. Use exact matching as the reference. The bare exponential omits a boundary prefactor and is not a direct smooth-connection result.

$$
T_{\rm exact}=\left[1+\frac{V_0^2\sinh^2(\kappa a)}{4E(V_0-E)}\right]^{-1}
$$

### 何时可信 / When the estimate is useful

厚势垒 K≫1 时指数支配数量级；靠近势垒顶端或薄势垒时，应检查完整解。透射率不能大于 1。

For K≫1 the exponent controls the scale. Near the barrier top or for thin barriers, check the full solution. Transmission cannot exceed one.

### 公式推导 / Derivation

### 禁阻区求解 / Solve inside the barrier

矩形势垒内 V₀>E，波函数是指数函数。

Inside V₀>E the solutions are exponentials.

$$
\psi''=\kappa^2\psi,\quad\kappa=\sqrt{2m(V_0-E)}/\hbar
$$

### 传播衰减 / Propagate the decay

穿过宽度 a，衰减支振幅乘 e⁻κa。

Across width a, the decaying-branch amplitude gains e⁻κa.

$$
|A_{\rm out}/A_{\rm in}|\sim e^{-\kappa a}
$$

### 转为通量比 / Convert to a flux ratio

两侧势相同，速度相同，所以概率流比等于振幅模平方比。

Equal exterior potentials give equal velocities, so the flux ratio is the squared amplitude ratio.

$$
T\sim e^{-2\kappa a},\qquad\Delta\ln T\simeq-2\kappa\Delta a
$$

### 交互实验 / Interactive model

指数估算与精确透射率

Exponential estimate versus exact transmission

定义 ℓ*=ℏ/√(2mV₀)，输入宽度 a/ℓ* 和 ε=E/V₀∈(0,1)。静态一维矩形势垒、两侧 V=0；不包含时间测量或多体作用。

Use ℓ*=ℏ/√(2mV₀), width a/ℓ* and ε=E/V₀∈(0,1). Static one-dimensional rectangular barrier with V=0 outside; no tunneling-time or many-body model.

### 输入与范围 / Controls and ranges

- 能量 ε=E/V₀ / Energy ε=E/V₀: 0.05–0.95, step 0.01, default 0.5
- 宽度 a/ℓ* / Width a/ℓ*: 0–8, step 0.05, default 3

### 例题 / Worked example

### 宽度增加一个衰减长度 / Add one decay length

若 κa=3，指数估计 T=e⁻⁶≈0.00248。宽度增加 1/κ 后 T=e⁻⁸≈0.000335，比值 e⁻²≈0.135。绝对值仍需边界前因子修正。

For κa=3, the exponential estimate is e⁻⁶≈0.00248. Adding width 1/κ gives e⁻⁸≈0.000335, a ratio e⁻²≈0.135. Absolute values still need the boundary prefactor.

### 自测与解释 / Self-check

1. 透射概率的指数是什么？ / What exponent appears in the transmission probability?

   A. −K / −K
   B. −2K / −2K

答案 / Answer: B

振幅取模平方使指数加倍。

Squaring the amplitude doubles the exponent.

2. 矩形势垒的裸指数包含完整边界匹配吗？ / Does the bare exponential contain full rectangular-barrier matching?

   A. 包含 / Yes
   B. 不包含 / No

答案 / Answer: B

还缺少边界前因子。

The boundary prefactor is omitted.

---

## 07 · 变分原理：为什么是上界？ / Variational principle: why an upper bound?

### 直观问题 / Intuition

不知道精确波函数，也能保证一个能量估计不会低于基态吗？

Can an approximate wave function give an energy guaranteed not to lie below the ground state?

归一化试探态在能量本征基中的权重都是非负数，平均能量不可能低于最低本征值。优化参数让上界更紧，但不会自动证明波函数处处准确。

A normalized trial state has nonnegative weights in the energy basis. Its mean energy cannot fall below the lowest eigenvalue. Optimizing tightens the bound but does not establish pointwise accuracy of the wave function.

### 必要概念 / Concepts

### Rayleigh 商 / The Rayleigh quotient

试探态必须满足哈密顿量定义域与边界条件，并有有限能量。未归一化时必须除以范数。

A trial state must satisfy the Hamiltonian domain and boundary conditions and have finite energy. Divide by its norm if it is unnormalized.

$$
E[\psi]=\frac{\langle\psi|H|\psi\rangle}{\langle\psi|\psi\rangle}\ge E_0
$$

### 参数优化 / Parameter optimization

先选满足物理约束的函数族，再求能量最小值。函数族太小会限制精度；局部极小也可能不是该函数族中的最低值。

Choose a physically admissible family, then minimize its energy. A restricted family limits accuracy; a local minimum may not be the family’s lowest value.

### 激发态需要额外约束 / Excited states need constraints

任意试探态只给基态上界。估计激发态需对更低的精确态正交，或使用适当的子空间极小极大原理。

An arbitrary trial state bounds only the ground energy. Excited states require orthogonality to lower exact states or an appropriate subspace min-max construction.

### 公式推导 / Derivation

### 展开试探态 / Expand the trial state

为便于证明，假设离散本征态完备；连续谱可用谱积分推广。

Assume a complete discrete basis for the proof; a spectral integral extends it to continua.

$$
|\psi\rangle=\sum_nc_n|n\rangle,\quad\sum_n|c_n|^2=1
$$

### 计算能量平均 / Compute the energy average

正交性消去不同能量本征态之间的交叉项。

Orthogonality removes cross terms.

$$
E[\psi]=\sum_n|c_n|^2E_n
$$

### 逐项与基态比较 / Compare every term to the ground energy

每个 Eₙ−E₀ 都非负；相等时态完全位于基态子空间。

Every Eₙ−E₀ is nonnegative; equality requires support entirely in the ground eigenspace.

$$
E[\psi]-E_0=\sum_n|c_n|^2(E_n-E_0)\ge0
$$

### 交互实验 / Interactive model

高斯试探态的宽度

Width of a Gaussian trial state

谐振子单位 m=ω=ℏ=1，ψα=(α/π)^(1/4)exp(−αx²/2)，α>0。此函数族恰好包含精确基态。

Oscillator units m=ω=ℏ=1, ψα=(α/π)^(1/4)exp(−αx²/2), α>0. This family contains the exact ground state.

### 输入与范围 / Controls and ranges

- 宽度参数 α / Width parameter α: 0.2–4, step 0.02, default 2

### 例题 / Worked example

### 过窄与过宽 / Too narrow and too broad

高斯态有 ⟨p²⟩=α/2、⟨x²⟩=1/(2α)，故 E=(α+1/α)/4。α=2 给 E=0.625；令导数为零得 α=1、Emin=0.5。

The Gaussian has ⟨p²⟩=α/2 and ⟨x²⟩=1/(2α), so E=(α+1/α)/4. At α=2, E=0.625. Setting the derivative to zero gives α=1 and Emin=0.5.

$$
\frac{dE}{d\alpha}=\frac14(1-\alpha^{-2})
$$

### 自测与解释 / Self-check

1. 普通变分能量给基态的什么界？ / What bound does a trial energy give on the ground energy?

   A. 上界 / Upper bound
   B. 下界 / Lower bound

答案 / Answer: A

能量是各本征值的非负加权平均。

It is a nonnegative weighted average of eigenvalues.

2. 未归一化试探态可以直接用 ⟨ψ|H|ψ⟩ 吗？ / Can an unnormalized state use ⟨ψ|H|ψ⟩ alone?

   A. 可以 / Yes
   B. 必须除以范数平方 / Divide by the squared norm

答案 / Answer: B

否则任意缩放态就能改变数值。

Otherwise arbitrary rescaling changes the value.

---

## 08 · 变分应用：氢原子的长度尺度 / Variational application: the hydrogen length scale

### 直观问题 / Intuition

电子为什么不无限靠近质子以降低势能？

Why does an electron not collapse onto the proton to lower its potential energy?

压缩波函数降低库仑势能，却提高动能。两者对长度的依赖不同，竞争给出稳定的原子尺度。这里的解释基于能量计算，不把不确定关系当成完整推导。

Compressing the wave function lowers Coulomb energy but raises kinetic energy. Their different length dependences select a stable atomic scale. The argument uses an energy calculation, not the uncertainty relation as a substitute for a derivation.

### 必要概念 / Concepts

### 模型和约化质量 / Model and reduced mass

采用非相对论点电荷库仑模型，用电子—质子约化质量 μ；忽略自旋、精细结构和辐射修正。

Use a nonrelativistic point-charge Coulomb model with reduced mass μ; omit spin, fine structure and radiative corrections.

$$
H=-\frac{\hbar^2}{2\mu}\nabla^2-\frac{C}{r},\quad C=\frac{e^2}{4\pi\epsilon_0}
$$

### 指数试探态 / Exponential trial state

取球对称无节点试探态，α 是逆长度。它满足无穷远衰减并可归一化。

Choose a spherical nodeless trial state; α is inverse length. It decays at infinity and is normalizable.

$$
\psi_\alpha(r)=(\alpha^3/\pi)^{1/2}e^{-\alpha r}
$$

### 单位定义 / Units

定义有效玻尔半径 a*=ℏ²/(μC)，能量单位 E*=μC²/ℏ²。用约化质量时与无限重原子核的数值略有差别。

Define a*=ℏ²/(μC) and E*=μC²/ℏ². Reduced-mass values differ slightly from the infinite-nuclear-mass convention.

### 公式推导 / Derivation

### 求径向平均 / Compute radial averages

用球坐标体积元 4πr²dr，不能漏掉 r²。

Use the spherical volume element 4πr²dr; do not omit r².

$$
\langle1/r\rangle=\alpha,\quad\langle T\rangle=\hbar^2\alpha^2/(2\mu)
$$

### 组合能量 / Combine energies

动能随 α² 增长，吸引势能随 −α 变化。

Kinetic energy grows as α² and attraction as −α.

$$
E(\alpha)=\frac{\hbar^2\alpha^2}{2\mu}-C\alpha
$$

### 优化长度 / Optimize the length

对 α 求导并检查二阶导数为正。

Differentiate and check positive second derivative.

$$
\alpha_*=\mu C/\hbar^2=1/a_*,\quad E_{\min}=-\mu C^2/(2\hbar^2)
$$

### 交互实验 / Interactive model

压缩原子：动能与势能的竞争

Compress an atom: kinetic versus potential energy

输入 q=αa*>0，输出能量单位 E*。无限空间中的库仑两体问题；此试探函数恰好给出该模型精确基态。

Enter q=αa*>0; energies are in E*. Coulomb two-body problem in infinite space; this trial family happens to give the exact ground state of this model.

### 输入与范围 / Controls and ranges

- 逆长度 q=αa* / Inverse length q=αa*: 0.1–3, step 0.02, default 1

### 例题 / Worked example

### 两倍逆长度 / Twice the inverse length

q=2 时 T/E*=2、V/E*=−2，总能量为 0。q=1 时总能量 −1/2，说明进一步压缩并不继续降低能量。最优处 2T+V=0。

At q=2, T/E*=2 and V/E*=−2, so E=0. At q=1, E/E*=−1/2. Further compression does not keep lowering energy. At the optimum 2T+V=0.

### 自测与解释 / Self-check

1. α 的量纲是什么？ / What are the units of α?

   A. 长度 / Length
   B. 逆长度 / Inverse length

答案 / Answer: B

指数 αr 必须无量纲。

The exponent αr is dimensionless.

2. 原子被无限压缩时哪项最终主导？ / Which term dominates under unlimited compression?

   A. 正动能 α² / Positive kinetic α²
   B. 负势能 −α / Negative potential −α

答案 / Answer: A

二次增长快于一次增长。

Quadratic growth overtakes linear growth.

---

## 09 · 非简并定态微扰：一阶与二阶 / Nondegenerate perturbation theory: first and second order

### 直观问题 / Intuition

微小耦合没有对角元，为什么能级仍会移动？

Why can a small coupling shift energies even when it has zero diagonal elements?

一阶修正读取对角元，二阶修正反映态与其他能级的混合。能级间隔小会放大混合，判断“小微扰”必须比较耦合与相关能隙。

First order reads diagonal elements; second order captures mixing with other levels. Small gaps amplify mixing. A perturbation is small only relative to the relevant energy separations.

### 必要概念 / Concepts

### 展开约定 / Expansion convention

写 H=H₀+λV，V 具有能量量纲，λ 为无量纲参数。本页要求所研究能级非简并。

Write H=H₀+λV with energy-valued V and dimensionless λ. The level studied here must be nondegenerate.

$$
E_n=E_n^{(0)}+\lambda E_n^{(1)}+\lambda^2E_n^{(2)}+\cdots
$$

### 能量修正 / Energy corrections

一阶是 V 在未扰动态中的期望值。二阶求和排除 n 本身。

First order is the expectation of V in the unperturbed state. The second-order sum excludes n.

$$
E_n^{(1)}=V_{nn},\quad E_n^{(2)}=\sum_{m\ne n}\frac{|V_{mn}|^2}{E_n^{(0)}-E_m^{(0)}}
$$

### 控制参数与基态符号 / Control parameter and ground-state sign

要求相关 |λVmn| 远小于能隙。基态的二阶分母为负，所以其二阶修正非正；激发态不具有同样的统一符号。

Relevant |λVmn| must be much smaller than gaps. Ground-state denominators are negative, so its second-order shift is nonpositive. Excited states have no universal sign.

### 公式推导 / Derivation

### 收集一阶项 / Collect first-order terms

将能量和态的展开代入本征方程。

Insert the energy and state expansions into the eigenvalue equation.

$$
(H_0-E_n^{(0)})|n^{(1)}\rangle=-(V-E_n^{(1)})|n^{(0)}\rangle
$$

### 投影到其他态 / Project onto other states

选取 ⟨n⁰|n¹⟩=0 的中间归一化约定。

Choose intermediate normalization ⟨n⁰|n¹⟩=0.

$$
\langle m^{(0)}|n^{(1)}\rangle=\frac{V_{mn}}{E_n^{(0)}-E_m^{(0)}}\quad(m\ne n)
$$

### 回代二阶能量 / Insert into second-order energy

二阶投影得到虚混合的能量修正。

The second-order projection gives the mixing energy.

$$
E_n^{(2)}=\langle n^{(0)}|V|n^{(1)}\rangle
$$

### 交互实验 / Interactive model

二能级精确解与二阶近似

Exact two-level solution versus second order

取 H/E*=[[0,g],[g,1]]，g 为实无量纲耦合。比较较低能级 E− 与 −g²；g 接近 1 时不再是小参数。

Use H/E*=[[0,g],[g,1]] with real dimensionless coupling g. Compare the lower eigenvalue E− with −g². Coupling near one is not small.

### 输入与范围 / Controls and ranges

- 耦合 g / Coupling g: 0–1, step 0.01, default 0.1

### 例题 / Worked example

### 无一阶修正的能级移动 / A shift without a first-order term

g=0.1 时一阶为零，二阶为 −0.01E*。精确值 (1−√1.04)E*/2≈−0.009902E*，误差约 9.8×10⁻⁵E*。

At g=0.1 the first-order shift vanishes and second order gives −0.01E*. The exact value (1−√1.04)E*/2≈−0.009902E*, an error about 9.8×10⁻⁵E*.

### 自测与解释 / Self-check

1. 基态的二阶能量修正通常是什么符号？ / What sign does the ground-state second-order correction have?

   A. 非正 / Nonpositive
   B. 总是正 / Always positive

答案 / Answer: A

其他本征能量都不低于基态，分母为负。

Other levels lie above the nondegenerate ground level, giving negative denominators.

2. 能隙趋于零时可以继续使用该公式吗？ / Can this formula be used as the gap vanishes?

   A. 可以 / Yes
   B. 需改用简并处理 / Use degenerate treatment

答案 / Answer: B

小分母使展开失去控制。

Small denominators invalidate the expansion.

---

## 10 · 简并微扰与避免交叉 / Degenerate perturbation and avoided crossings

### 直观问题 / Intuition

简并子空间里，应该先选哪一组态做微扰展开？

Which states should be chosen inside a degenerate subspace before expanding?

未扰动哈密顿量无法区分简并态，微扰会挑出合适的线性组合。先在简并子空间对角化微扰，再处理与外部能级的弱耦合。

The unperturbed Hamiltonian cannot distinguish degenerate states. The perturbation selects appropriate combinations. Diagonalize it inside the degenerate subspace before treating weak coupling to external levels.

### 必要概念 / Concepts

### 投影到简并空间 / Project into the degenerate space

P 投影到共同能量 E₀ 的子空间。一阶能量修正是 PVP 的本征值，而非任意基底中的对角元。

P projects onto the eigenspace at E₀. First-order shifts are eigenvalues of PVP, not diagonal entries in an arbitrary basis.

$$
W_{ab}=\langle a|V|b\rangle
$$

### 有效二能级 / Effective two-level model

扣去共同能量后，实耦合模型包含失谐 Δ 和耦合 g。Δ 与 g 在本模型中都是能量。

After removing a common energy, a real two-level model has detuning Δ and coupling g, both energy-valued here.

$$
H_{\rm eff}=\begin{pmatrix}\Delta/2&g\\g&-\Delta/2\end{pmatrix}
$$

### 交叉取决于耦合 / Crossings depend on coupling

同一对称性扇区内允许的非零耦合通常打开能隙。若对称性迫使 g=0，真实交叉仍可能存在。

An allowed nonzero coupling generally opens a gap. If symmetry forces g=0, a true crossing can remain.

### 公式推导 / Derivation

### 写特征方程 / Write the characteristic equation

求 det(H−EI)=0。

Set det(H−EI)=0.

$$
E^2-\Delta^2/4-g^2=0
$$

### 求能量和最小间隔 / Find energies and minimum gap

最小间隔在 Δ=0，等于 2|g|。

The minimum gap occurs at Δ=0 and equals 2|g|.

$$
E_\pm=\pm\sqrt{(\Delta/2)^2+g^2}
$$

### 求被选择的组合 / Find the selected combinations

当 Δ=0 且 g>0，对称态和反对称态分别具有 ±g。

At Δ=0 and g>0, symmetric and antisymmetric combinations have energies ±g.

$$
|\pm\rangle=(|a\rangle\pm|b\rangle)/\sqrt2
$$

### 交互实验 / Interactive model

调节失谐，观察避免交叉

Tune detuning and observe avoided crossings

所有能量以 E* 为单位，封闭实对称二能级模型。曲线是静态能谱，不模拟扫场过程中的跃迁。

All energies in E*. Closed real symmetric two-level model. Curves are static spectra, not transition dynamics during a sweep.

### 输入与范围 / Controls and ranges

- 耦合 g/E* / Coupling g/E*: 0–0.8, step 0.02, default 0.2
- 失谐 Δ/E* / Detuning Δ/E*: -2–2, step 0.02, default 0

### 例题 / Worked example

### 简并点的劈裂 / Splitting at degeneracy

令 Δ=0、g=0.2E*。本征值为 ±0.2E*，间隔 0.4E*。任意选用 |a⟩、|b⟩ 的对角元都为零，会漏掉一阶劈裂。

Set Δ=0 and g=0.2E*. Eigenvalues are ±0.2E* with gap 0.4E*. Using only the zero diagonal entries in |a⟩, |b⟩ misses the first-order splitting.

### 自测与解释 / Self-check

1. 简并空间中先做什么？ / What comes first in a degenerate space?

   A. 对角化 PVP / Diagonalize PVP
   B. 除以零能隙 / Divide by the zero gap

答案 / Answer: A

简并展开要先确定适当的零阶态。

First select the appropriate zeroth-order states.

2. g≠0 时最小能隙？ / What is the minimum gap for g≠0?

   A. |g| / |g|
   B. 2|g| / 2|g|

答案 / Answer: B

两个能量在 Δ=0 分别为 ±|g|。

At Δ=0 the energies are ±|g|.

---

## 11 · 微扰应用：受静力的谐振子 / Application: an oscillator under a static force

### 直观问题 / Intuition

对称势阱中的基态 ⟨x⟩=0，外场为何仍使能量改变？

If the symmetric ground state has ⟨x⟩=0, why does a static field still shift its energy?

线性微扰的对角元因宇称为零，但波函数会偏移。精确配方结果与二阶微扰一致，是检查符号、单位和选择定则的简单模型。

Parity makes a linear perturbation’s diagonal element vanish, but the wave function shifts. Completing the square agrees with second-order perturbation and checks signs, units and selection rules.

### 必要概念 / Concepts

### 明确外力符号 / Define the force sign

定义势能微扰为 −Fx，所以正 F 使平衡点向正 x 移动。若映射到电场，需另行考虑粒子电荷符号。

Define the perturbation as −Fx, so positive F shifts equilibrium toward positive x. Mapping to an electric field requires the charge sign.

$$
H=\frac{p^2}{2m}+\frac12m\omega^2x^2-Fx
$$

### 宇称与一阶项 / Parity and first order

未扰动本征态具有确定宇称，x 为奇算符，因此一阶能量修正为零。

Unperturbed eigenstates have definite parity and x is odd, so the first-order energy correction vanishes.

$$
\langle n|x|n\rangle=0
$$

### 可精确求解的检验 / An exactly soluble check

外力保持曲率不变，只移动势阱中心并降低势能零点，所以所有能级移动相同。

The force leaves the curvature unchanged, shifts the well center and lowers its energy offset. Every level shifts equally.

### 公式推导 / Derivation

### 配方移动坐标 / Complete the square

引入新的平衡点 x₀。

Introduce the new equilibrium x₀.

$$
x_0=F/(m\omega^2),\quad V=\tfrac12m\omega^2(x-x_0)^2-\frac{F^2}{2m\omega^2}
$$

### 读取精确能谱 / Read the exact spectrum

平移不改变谐振子的能级间距。

Translation leaves oscillator spacings unchanged.

$$
E_n=\hbar\omega(n+\tfrac12)-F^2/(2m\omega^2)
$$

### 用二阶验证基态 / Verify the ground shift at second order

x 只连接基态与第一激发态，分母为 −ℏω。

x connects the ground state only to n=1; the denominator is −ℏω.

$$
\Delta E_0^{(2)}=\frac{F^2|\langle1|x|0\rangle|^2}{-\hbar\omega}=-\frac{F^2}{2m\omega^2}
$$

### 交互实验 / Interactive model

移动势阱而保持能级间距

Shift the well while preserving level spacings

m=ω=ℏ=1，F 以 ℏω/ℓ 为单位，ℓ=√(ℏ/mω)。用精确平移解；这是电场响应的教学类比，不是氢原子的完整 Stark 效应。

Use m=ω=ℏ=1 and force unit ℏω/ℓ, ℓ=√(ℏ/mω). Exact translated solution. A teaching analogy for field response, not the full hydrogen Stark effect.

### 输入与范围 / Controls and ranges

- 外力 F（振子单位） / Force F (oscillator units): -1–1, step 0.02, default 0.4

### 例题 / Worked example

### F=0.4 的基态 / Ground state for F=0.4

振子单位下 x₀=0.4，能移为 −0.08，故 E₀=0.42。第一激发态为 1.42，能隙仍是 1。

In oscillator units x₀=0.4 and the shift is −0.08, so E₀=0.42. The first excited energy is 1.42 and the gap remains one.

### 自测与解释 / Self-check

1. 一阶为零能否说明所有修正为零？ / Does a zero first-order term imply all corrections vanish?

   A. 能 / Yes
   B. 不能 / No

答案 / Answer: B

本例有非零二阶修正。

This model has a nonzero second-order shift.

2. 静力使本例能级间距如何变化？ / How does the force change level spacings here?

   A. 不变 / Unchanged
   B. 减半 / Halved

答案 / Answer: A

曲率和 ω 均未改变。

Curvature and ω remain unchanged.

---

## 12 · 电子自旋与 Stern–Gerlach 测量 / Electron spin and Stern–Gerlach measurement

### 直观问题 / Intuition

先选出 z 向上的态，再沿倾斜方向测量，会得到什么？

After selecting z-up, what happens when measuring along a tilted axis?

自旋是内禀角动量，不能用电子表面刚体自转解释。沿任意方向测量自旋 1/2 都只有两个结果，但概率随测量轴与制备方向的夹角改变。

Spin is intrinsic angular momentum, not a rigid rotation of an electron surface. Measuring spin-1/2 along any axis gives two outcomes, with probabilities set by the angle between preparation and measurement axes.

### 必要概念 / Concepts

### Pauli 表示 / Pauli representation

在 z 基底中 Sᵢ=ℏσᵢ/2。Pauli 矩阵是无量纲的，自旋算符才有角动量单位。

In the z basis Sᵢ=ℏσᵢ/2. Pauli matrices are dimensionless; spin operators carry angular-momentum units.

$$
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

### 沿任意轴测量 / Measurement along any axis

单位向量 n 定义投影轴。两个本征值为 ±ℏ/2，与方向无关。

A unit vector n defines the measurement axis. Eigenvalues are ±ℏ/2 for every direction.

$$
S_n=\frac\hbar2\,\mathbf n\cdot\boldsymbol\sigma,\quad\Pi_\pm=\frac{I\pm\mathbf n\cdot\boldsymbol\sigma}{2}
$$

### 序贯测量 / Sequential measurements

理想筛选后的态取决于最后一次测量结果。插入不同方向的测量会改变后续统计，不能把其当成读取预存的三个经典分量。

An ideally filtered state depends on the last outcome. Inserting another-axis measurement changes later statistics; it does not merely read three pre-existing classical components.

### 公式推导 / Derivation

### 设定几何方向 / Set the geometry

令 n 与 z 的夹角为 θ，方位角不影响 z-up 的概率。

Let n make polar angle θ with z; azimuth does not affect a z-up input.

$$
\mathbf n=(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)
$$

### 计算投影概率 / Compute the projector probability

用 ⟨+z|σz|+z⟩=1，其他两项为零。

Use expectation one for σz and zero for σx and σy.

$$
P(+n|+z)=\langle+z|\Pi_+|+z\rangle=(1+\cos\theta)/2
$$

### 检查两结果 / Check both outcomes

半角公式让几何关系更清楚。

Half-angle identities expose the geometry.

$$
P_+=\cos^2(\theta/2),\quad P_-=\sin^2(\theta/2)
$$

### 交互实验 / Interactive model

旋转测量轴

Rotate the measurement axis

θ 以度输入，初态固定 |+z⟩。模拟理想自旋投影概率；Stern–Gerlach 是概念模型，不模拟自由电子束装置或磁场梯度。

θ is in degrees; input state is |+z⟩. Ideal spin-projection probabilities. Stern–Gerlach is a conceptual model, not a free-electron apparatus or field-gradient simulation.

### 输入与范围 / Controls and ranges

- 测量夹角 θ（度） / Measurement angle θ (degrees): 0–180, step 1, default 60

### 例题 / Worked example

### 60° 的分析器 / An analyzer at 60°

θ=60° 时 P+=3/4、P−=1/4。平均自旋为 (ℏ/2)(P+−P−)=ℏ/4。单次结果仍只能是 ±ℏ/2，不是 ℏ/4。

At θ=60°, P+=3/4 and P−=1/4. The mean spin is (ℏ/2)(P+−P−)=ℏ/4. Each individual result remains ±ℏ/2, never ℏ/4.

### 自测与解释 / Self-check

1. 沿任意方向测量自旋 1/2，可能结果？ / What outcomes can spin-1/2 have along any axis?

   A. ±ℏ/2 / ±ℏ/2
   B. 任意连续值 / Any continuous value

答案 / Answer: A

方向改变本征态和概率，不改变本征值。

Direction changes eigenstates and probabilities, not eigenvalues.

2. 平均值一定是某次测量的可能结果吗？ / Must a mean value be a possible individual outcome?

   A. 一定 / Yes
   B. 不一定 / No

答案 / Answer: B

ℏ/4 的平均值就是反例。

A mean of ℏ/4 is a counterexample.

---

## 13 · 自旋进动与旋转 / Spin precession and rotations

### 直观问题 / Intuition

沿 x 制备的自旋放进 z 向磁场后，为什么测量概率会振荡？

Why does an x-prepared spin show oscillating probabilities in a z-directed field?

磁场使两个 z 分量积累不同相位，Bloch 向量在横向平面转动。自旋量的旋转角有半角结构；转过 2π 后态矢量变号，但孤立态的测量概率不变。

The field gives the two z components different phases, rotating the Bloch vector in the transverse plane. Spinor rotations contain a half angle: a 2π rotation changes its sign but leaves isolated-state probabilities unchanged.

### 必要概念 / Concepts

### 明确频率约定 / Specify the frequency convention

取 H=ℏΩσz/2，Ω 为有符号角频率。映射 H=−μ·B 时须保留磁矩的符号，不能默认电子与正磁矩方向相同。

Use H=ℏΩσz/2 with signed angular frequency Ω. For H=−μ·B keep the magnetic-moment sign; an electron need not precess like a positive moment.

$$
U_z(t)=e^{-i\Omega t\sigma_z/2}
$$

### Bloch 向量 / The Bloch vector

对初态 |+x⟩，横向自旋转动，纵向分量始终为零。

For initial |+x⟩ the transverse spin rotates while the longitudinal component stays zero.

$$
\langle\boldsymbol\sigma\rangle=(\cos\Omega t,\sin\Omega t,0)
$$

### 2π 与 4π / 2π and 4π

整体负号不改变单一路径的概率。要观察相对的旋量相位，需与未旋转的参考支路干涉。

A global minus sign leaves single-path probabilities unchanged. Observing a relative spinor phase requires interference with an unrotated reference branch.

### 公式推导 / Derivation

### 利用 σz²=I / Use σz²=I

将指数的奇次和偶次项分别求和。

Sum odd and even powers separately.

$$
U_z=I\cos(\Omega t/2)-i\sigma_z\sin(\Omega t/2)
$$

### 作用于 x-up / Act on x-up

在 z 基底中两振幅相位相反。

The two z-basis amplitudes have opposite phases.

$$
|\psi(t)\rangle=(e^{-i\Omega t/2}|+z\rangle+e^{i\Omega t/2}|-z\rangle)/\sqrt2
$$

### 计算 x 测量 / Compute an x measurement

投回 |+x⟩ 后取模平方。

Project back onto |+x⟩ and square.

$$
P(+x,t)=\cos^2(\Omega t/2)
$$

### 交互实验 / Interactive model

自旋旋转角与返回概率

Spin rotation angle and return probability

输入旋转角 χ=Ωt，以度表示。固定 H 方向、无退相干、初态 |+x⟩；不是辐射阻尼或磁共振装置仿真。

Enter rotation angle χ=Ωt in degrees. Fixed Hamiltonian axis, no decoherence, initial |+x⟩. No radiation damping or magnetic-resonance apparatus model.

### 输入与范围 / Controls and ranges

- 旋转角 χ（度） / Rotation χ (degrees): 0–720, step 1, default 90

### 例题 / Worked example

### 半圈与整圈 / Half and full turns

χ=180° 时得到 −i|−x⟩，与 |−x⟩ 仅差整体相位，返回概率为 0；χ=360° 时得到 −|+x⟩，返回概率为 1；χ=720° 时态矢量也恢复原值。

At χ=180° the state is −i|−x⟩, equivalent to |−x⟩ up to a global phase, with zero return probability. At 360° it is −|+x⟩ with probability one. At 720° the spinor itself returns.

### 自测与解释 / Self-check

1. 旋转 2π 后孤立态的概率是否改变？ / Do isolated-state probabilities change after 2π?

   A. 改变 / Yes
   B. 不改变 / No

答案 / Answer: B

共同负号在概率中相消。

The common minus sign cancels in probabilities.

2. 本页进动时 ⟨σz⟩ 是多少？ / What is ⟨σz⟩ during this precession?

   A. 0 / 0
   B. 1 / 1

答案 / Answer: A

两个 z 分量权重相等且不变。

The two z weights are equal and unchanged.

---

## 14 · 角动量代数与阶梯算符 / Angular-momentum algebra and ladder operators

### 直观问题 / Intuition

为什么固定总角动量时，z 分量只有有限多个值？

Why are there finitely many z components at fixed total angular momentum?

角动量分量互不对易。阶梯算符把 m 每次改变 1，而态的范数必须非负，这迫使阶梯在两端终止。量子角动量的大小不是 mℏ。

Angular-momentum components do not commute. Ladder operators change m by one, and nonnegative state norms force the ladder to terminate. The total magnitude is not mℏ.

### 必要概念 / Concepts

### 共同本征态 / Simultaneous eigenstates

J² 与 Jz 对易，但不同分量之间不对易。

J² commutes with Jz, whereas distinct components do not commute.

$$
J^2|jm\rangle=\hbar^2j(j+1)|jm\rangle,\quad J_z|jm\rangle=\hbar m|jm\rangle
$$

### 量子数范围 / Quantum-number ranges

一般角动量 j 可为非负整数或半整数，m 从 −j 到 j。轨道角动量的 l 则必须为整数。

General j is a nonnegative integer or half integer, with m from −j to j. Orbital angular momentum l must be integer.

$$
m=-j,-j+1,\ldots,j,\qquad\dim=2j+1
$$

### 阶梯的振幅 / Ladder amplitudes

阶梯系数是振幅并带 ℏ 单位；平方范数不是在未指定实验下的跃迁率。

Ladder coefficients are amplitudes with ℏ units. Their squared norms are not transition rates without a specified interaction.

$$
J_\pm|jm\rangle=\hbar\sqrt{j(j+1)-m(m\pm1)}|j,m\pm1\rangle
$$

### 公式推导 / Derivation

### 确定升降方向 / Determine the ladder direction

由对易子可知作用后 m 改变 ±1。

The commutator shows that m changes by ±1.

$$
[J_z,J_\pm]=\pm\hbar J_\pm
$$

### 求平方范数 / Find the squared norm

使用 J∓J± 的代数恒等式。

Use the algebraic identity for J∓J±.

$$
J_-J_+=J^2-J_z^2-\hbar J_z
$$

### 要求阶梯终止 / Require termination

顶端升算符为零，底端降算符为零。

Raising vanishes at the top and lowering at the bottom.

$$
\|J_+|jm\rangle\|^2=\hbar^2(j-m)(j+m+1)
$$

### 交互实验 / Interactive model

走过角动量阶梯

Explore an angular-momentum ladder

取 j=2，输入整数 m∈[−2,2]。显示 J± 系数除以 ℏ，以及 J²/ℏ²；不将两个系数归一化为概率。

Set j=2 and choose integer m∈[−2,2]. Outputs are J± coefficients divided by ℏ and J²/ℏ². The coefficients are not normalized probabilities.

### 输入与范围 / Controls and ranges

- 磁量子数 m（j=2） / Magnetic quantum number m (j=2): -2–2, step 1, default 0

### 例题 / Worked example

### j=1 的中间态 / The middle state for j=1

对 |1,0⟩，J+ 和 J− 的系数均为 √2ℏ；对 |1,1⟩，J+=0。所有三个态的 J² 都为 2ℏ²。

For |1,0⟩ both ladder coefficients are √2ℏ; for |1,1⟩ raising gives zero. All three states have J²=2ℏ².

### 自测与解释 / Self-check

1. j=3/2 子空间维数？ / What is the dimension for j=3/2?

   A. 3 / 3
   B. 4 / 4

答案 / Answer: B

维数为 2j+1=4。

The dimension is 2j+1=4.

2. 轨道 l 能否取 1/2？ / Can orbital l be 1/2?

   A. 能 / Yes
   B. 不能 / No

答案 / Answer: B

普通三维单值轨道波函数对应整数 l。

Ordinary single-valued orbital wave functions have integer l.

---

## 15 · 角动量加法：单态与三重态 / Adding angular momenta: singlet and triplet

### 直观问题 / Intuition

两个自旋 1/2 相加，为什么总自旋既可能是 1，也可能是 0？

Why can two spin-1/2 systems combine to total spin one or zero?

组合态位于张量积空间，不是简单把两次测量结果当作经典箭头相加。总角动量测量将四维空间分解为三维三重态与一维单态。

The composite state lives in a tensor-product space. Adding classical measurement arrows is insufficient. Total angular momentum splits the four-dimensional space into a three-dimensional triplet and one-dimensional singlet.

### 必要概念 / Concepts

### 两套基底 / Two bases

直积基标记各自的 m；耦合基标记总 j、m。两套完整基底通过幺正变换联系。

The product basis labels each m; the coupled basis labels total j,m. A unitary transformation relates the two complete bases.

$$
\mathbf J=\mathbf J_1+\mathbf J_2,\quad j=|j_1-j_2|,\ldots,j_1+j_2
$$

### 四个耦合态 / The four coupled states

最高权态 |↑↑⟩ 只能有 j=1。降阶得到对称的 m=0 态，其正交补为反对称单态。

The highest-weight |↑↑⟩ has j=1. Lowering produces the symmetric m=0 state; its orthogonal complement is the antisymmetric singlet.

$$
|1,0\rangle=(|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle)/\sqrt2,\quad |0,0\rangle=(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2
$$

### 量子相关 / Quantum correlations

单态的总自旋为零，但个体沿任意轴的测量仍随机。测量结果有反相关，不能推出每个自旋都没有角动量。

The singlet has zero total spin, while each individual measurement is random along any axis. Anticorrelation does not mean each subsystem lacks angular momentum.

### 公式推导 / Derivation

### 从最高权态开始 / Start from the highest weight

总降算符为两部分之和。

The total lowering operator is a sum.

$$
J_-|1,1\rangle=(J_{1-}+J_{2-})|\uparrow\uparrow\rangle
$$

### 比较归一化系数 / Compare normalization factors

左侧系数 √2ℏ，右侧两项各为 ℏ。

The left coefficient is √2ℏ and each right term has ℏ.

$$
\sqrt2\hbar|1,0\rangle=\hbar(|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle)
$$

### 建立正交补 / Construct the orthogonal complement

反对称组合归一化且与三重态正交。

The antisymmetric combination is normalized and orthogonal to the triplet.

$$
|\uparrow\downarrow\rangle=(|1,0\rangle+|0,0\rangle)/\sqrt2
$$

### 交互实验 / Interactive model

相对相位选择总自旋

Relative phase selects total spin

态为 (|↑↓⟩+exp(iφ)|↓↑⟩)/√2，φ 以度输入。两个可区分自旋先作代数练习；全同粒子的空间部分需在第 24 页加入。

State (|↑↓⟩+exp(iφ)|↓↑⟩)/√2, with φ in degrees. Treat distinguishable spins for this algebra exercise; identical-particle spatial symmetry is added on page 24.

### 输入与范围 / Controls and ranges

- 相对相位 φ（度） / Relative phase φ (degrees): 0–360, step 1, default 0

### 例题 / Worked example

### 直积态的总自旋测量 / Total spin in a product state

对 |↑↓⟩，投影到 |1,0⟩ 与 |0,0⟩ 的振幅均为 1/√2，所以各有 1/2 概率。Jz=0 并不唯一确定 J²。

For |↑↓⟩, amplitudes onto |1,0⟩ and |0,0⟩ are both 1/√2, giving equal probabilities. Jz=0 does not determine J².

### 自测与解释 / Self-check

1. 两自旋 1/2 的空间维数？ / What is the two-spin-1/2 space dimension?

   A. 2 / 2
   B. 4 / 4

答案 / Answer: B

维数相乘：2×2=4。

Dimensions multiply: 2×2=4.

2. 单态交换两个自旋标签后怎样？ / What happens when the singlet spin labels are exchanged?

   A. 变号 / Changes sign
   B. 不变 / Unchanged

答案 / Answer: A

两个相反符号项互换。

The opposite-sign terms interchange.

---

## 16 · 角动量应用：自旋—轨道耦合 / Application: spin-orbit coupling

### 直观问题 / Intuition

同一轨道角动量 l，加入自旋后为什么会分裂成两组能量？

Why can one orbital angular momentum split into two energy groups after adding spin?

自旋—轨道相互作用取决于 L 与 S 的量子关联。用总 J² 的本征态可直接对角化 L·S，避免把角动量当成有确定方向的经典矢量。

Spin-orbit coupling depends on quantum correlations between L and S. Total-J eigenstates diagonalize L·S directly, without assigning definite classical directions to both angular momenta.

### 必要概念 / Concepts

### 有效模型 / Effective model

取 Hso=(A/ℏ²)L·S，A 是能量参数。真实原子中 A 来自径向平均及具体势；此处不声称计算完整精细结构。

Use Hso=(A/ℏ²)L·S with energy-valued A. In atoms A comes from a radial average and a specified potential. This is not a complete fine-structure calculation.

### 改用总角动量 / Use total angular momentum

对固定 l、s，J²、L²、S² 可同时对角化。

For fixed l,s, J², L² and S² can be diagonalized together.

$$
\mathbf L\cdot\mathbf S=\frac12(J^2-L^2-S^2)
$$

### 简并度与符号 / Degeneracy and sign

每个 j 支有 2j+1 个 m 态。A 的符号决定哪支更低；不能只凭“平行”一词判断。

Each j branch has 2j+1 m states. The sign of A determines the lower branch; a classical word such as parallel is insufficient.

### 公式推导 / Derivation

### 展开 J² / Expand J²

两个不同空间的角动量分量相互对易。

Components acting on different spaces commute.

$$
(\mathbf L+\mathbf S)^2=L^2+S^2+2\mathbf L\cdot\mathbf S
$$

### 代入本征值 / Insert eigenvalues

耦合能量直接由量子数给出。

The coupling energy follows from the quantum numbers.

$$
\Delta E_j=\frac A2[j(j+1)-l(l+1)-s(s+1)]
$$

### 取 s=1/2 / Set s=1/2

l≥1 时有两支；l=0 只有 j=1/2，耦合为零。

For l≥1 there are two branches. At l=0 only j=1/2 exists and the coupling vanishes.

$$
\Delta E_{l+1/2}=Al/2,\quad\Delta E_{l-1/2}=-A(l+1)/2
$$

### 交互实验 / Interactive model

两支能级与简并度

Two branches and degeneracies

固定 l=1、s=1/2，A/E* 为输入。只包含 L·S 项，没有外磁场、径向计算或相对论动能修正。

Fix l=1,s=1/2 and vary A/E*. Only the L·S term is included; no external field, radial calculation or relativistic kinetic correction.

### 输入与范围 / Controls and ranges

- 耦合 A/E* / Coupling A/E*: -1–1, step 0.02, default 0.4

### 例题 / Worked example

### p 态的自旋—轨道劈裂 / Spin-orbit splitting of p states

l=1、s=1/2 时 j=3/2 的位移为 A/2、简并度 4；j=1/2 的位移为 −A、简并度 2。A>0 时两支相差 3A/2，加权能量位移总和为零。

For l=1,s=1/2, j=3/2 shifts by A/2 with degeneracy four; j=1/2 shifts by −A with degeneracy two. For A>0 the gap is 3A/2. The degeneracy-weighted shifts sum to zero.

### 自测与解释 / Self-check

1. L·S 可以用哪组算符表示？ / Which operators express L·S?

   A. J²、L²、S² / J², L², S²
   B. 只有 Jz / Only Jz

答案 / Answer: A

由 J=L+S 的平方恒等式得到。

Expand J=L+S squared.

2. l=0 时本模型的 L·S 能移？ / What is the L·S shift for l=0?

   A. 0 / 0
   B. A / A

答案 / Answer: A

轨道角动量为零。

The orbital angular momentum vanishes.

---

## 17 · 相互作用绘景与跃迁振幅 / Interaction picture and transition amplitudes

### 直观问题 / Intuition

外场随时间变化时，怎样把已知自由演化与新跃迁分开？

How can known free evolution be separated from new transitions under a time-dependent field?

相互作用绘景先去掉 H₀ 的演化，再让 V 决定系数如何变化。一阶结果是来自不同时刻的复振幅相加，积分中的相位决定相长还是相消。

The interaction picture removes H₀ evolution and lets V change the coefficients. First order adds complex amplitudes from different times; their phases determine constructive or destructive interference.

### 必要概念 / Concepts

### 绘景定义 / Picture definition

取时间无关 H₀，令 U₀=exp(−iH₀t/ℏ)。相互作用绘景的态与相互作用都要变换。

Take constant H₀ with U₀=exp(−iH₀t/ℏ). Transform both the state and interaction.

$$
|\psi_I\rangle=U_0^\dagger|\psi_S\rangle,\quad V_I=U_0^\dagger V_SU_0
$$

### 一阶展开 / First-order expansion

积分方程中以初态替换积分内的未知态，得到一阶振幅。

Replace the unknown state inside the integral equation by the initial state to obtain first order.

$$
i\hbar\partial_t|\psi_I\rangle=V_I(t)|\psi_I\rangle
$$

### 振幅阶数与概率阶数 / Amplitude order versus probability order

对 f≠i，一阶振幅产生二阶小量的概率。不能把一阶振幅直接作为概率；大概率时必须检查更高阶和幺正性。

For f≠i a first-order amplitude gives a second-order-small probability. An amplitude is not a probability. Large probabilities require higher orders and a unitarity check.

### 公式推导 / Derivation

### 积分形式 / Integral form

从初始时刻 0 积分。

Integrate from time zero.

$$
|\psi_I(t)\rangle=|i\rangle-\frac i\hbar\int_0^tV_I(t')|\psi_I(t')\rangle dt'
$$

### 投影到终态 / Project onto the final state

用 H₀ 本征基，ωfi=(Ef−Ei)/ℏ。

Use H₀ eigenstates with ωfi=(Ef−Ei)/ℏ.

$$
c_f^{(1)}(t)=-\frac i\hbar\int_0^t V_{fi}(t')e^{i\omega_{fi}t'}dt'
$$

### 短时常耦合 / Short-time constant coupling

短于相位变化时间时，指数近似为 1。

For times short compared with phase variation, replace the exponential by one.

$$
P_{i\to f}\simeq |V_{fi}|^2t^2/\hbar^2
$$

### 交互实验 / Interactive model

短时近似与精确两能级结果

Short-time approximation and exact two-level dynamics

共振二能级 H=gE*σx，τ=tE*/ℏ。比较 (gτ)² 与 sin²(gτ)；仅 gτ≪1 时一阶振幅近似受控。

Resonant two-level H=gE*σx, τ=tE*/ℏ. Compare (gτ)² with sin²(gτ). First-order amplitudes are controlled only for gτ≪1.

### 输入与范围 / Controls and ranges

- 耦合 g / Coupling g: 0–0.5, step 0.01, default 0.2
- 时间 τ / Time τ: 0–5, step 0.05, default 1

### 例题 / Worked example

### 短时误差 / Short-time error

取 gτ=0.2，微扰概率为 0.04，精确值 sin²0.2≈0.03947。若 gτ=2，近似给 4，超出概率上限，说明近似失效。

At gτ=0.2 perturbation gives 0.04, while sin²0.2≈0.03947. At gτ=2 it predicts four, exceeding the probability limit and signaling failure.

### 自测与解释 / Self-check

1. 一阶跃迁振幅通常给出几阶概率？ / A first-order transition amplitude gives probability of which order?

   A. 一阶 / First
   B. 二阶 / Second

答案 / Answer: B

模平方使小参数阶数加倍。

Taking the squared magnitude doubles the order.

2. 近似概率大于 1 应如何解释？ / How should an approximate probability above one be interpreted?

   A. 近似失效 / Approximation failure
   B. 物理允许 / Physically allowed

答案 / Answer: A

精确幺正演化不会给出大于 1 的概率。

Exact unitary evolution cannot give probability above one.

---

## 18 · 周期驱动、共振与有限时间线宽 / Periodic driving, resonance and finite-time width

### 直观问题 / Intuition

为什么有限时长的驱动也能激发略微失谐的跃迁？

Why can a finite-duration drive excite a slightly off-resonant transition?

有限时间积分不会产生无限尖锐的频率选择。相位不断累积，失谐大时不同时刻的振幅互相抵消；持续时间越长，主峰越窄。

A finite time integral cannot select an infinitely sharp frequency. Detuning accumulates phase and cancels contributions from different times. A longer drive narrows the main peak.

### 必要概念 / Concepts

### 驱动约定 / Drive convention

设 Vfi(t)=Vfi cosωt。近共振且弱驱动时，保留缓慢项，定义 Δ=ωfi−ω。这里的 Vfi 是余弦前的矩阵元。

Let Vfi(t)=Vfi cosωt. For weak near-resonant driving keep the slow term and define Δ=ωfi−ω. Here Vfi is the matrix element before the cosine.

### 旋转波近似 / Rotating-wave approximation

忽略频率 ωfi+ω 的快振荡项，需要驱动尺度和失谐相对载频足够小；它与小跃迁概率条件不同。

Dropping the fast ωfi+ω term requires drive and detuning scales small relative to the carrier frequency. This differs from the small-transition-probability condition.

### 有限时长谱形 / Finite-duration line shape

定义 sinc x=sinx/x 且 sinc0=1。共振极限必须连续取值，不应在程序中除以零。

Define sinc x=sinx/x with sinc0=1. Evaluate the resonant limit continuously rather than dividing by zero.

$$
P^{(1)}\simeq\left(\frac{|V_{fi}|t}{2\hbar}\right)^2\mathrm{sinc}^2(\Delta t/2)
$$

### 公式推导 / Derivation

### 拆开余弦 / Split the cosine

与自由演化相位相乘后有快慢两项。

Multiplying by the free phase produces slow and fast terms.

$$
e^{i\omega_{fi}t}\cos\omega t=\tfrac12[e^{i(\omega_{fi}-\omega)t}+e^{i(\omega_{fi}+\omega)t}]
$$

### 积慢相位 / Integrate the slow phase

保留近共振项并计算有限积分。

Keep the near-resonant term and integrate.

$$
\int_0^te^{i\Delta t'}dt'=e^{i\Delta t/2}\,t\,\mathrm{sinc}(\Delta t/2)
$$

### 计算概率与零点 / Compute probability and zeros

模平方去掉共同相位；第一零点在 |Δ|=2π/t。

The common phase cancels; first zeros occur at |Δ|=2π/t.

$$
|\Delta|t/2=\pi\quad\Rightarrow\quad |\Delta|=2\pi/t
$$

### 交互实验 / Interactive model

脉冲时长与频谱宽度

Pulse duration and spectral width

输入 τ=t/t*，失谐 δ=Δt*，固定 |Vfi|t*/ℏ=0.08。显示弱驱动 RWA 一阶概率及主峰；最大时长使共振概率≤0.16。

Use τ=t/t* and detuning δ=Δt*. Fix |Vfi|t*/ℏ=0.08. Shows first-order weak-drive RWA probabilities; the longest pulse keeps resonant probability ≤0.16.

### 输入与范围 / Controls and ranges

- 脉冲时长 τ / Pulse duration τ: 1–10, step 0.1, default 5
- 失谐 δ=Δt* / Detuning δ=Δt*: -5–5, step 0.05, default 0

### 例题 / Worked example

### 第一零点 / First zero

t=10t* 时，第一零点为 |Δ|=0.6283/t*。时长加倍，第一零点距共振减半；在微扰有效期间，共振峰高增大四倍。

At t=10t*, the first zero is |Δ|=0.6283/t*. Doubling duration halves that distance from resonance; while perturbation remains valid, the peak height grows fourfold.

### 自测与解释 / Self-check

1. 脉冲更长时主峰如何变化？ / How does a longer pulse change the main peak?

   A. 变窄 / Narrower
   B. 变宽 / Broader

答案 / Answer: A

零点间距与 1/t 成正比。

Zero spacing scales as 1/t.

2. sinc0 的连续极限？ / What is the continuous value of sinc0?

   A. 0 / 0
   B. 1 / 1

答案 / Answer: B

由 sinx/x 的极限得到。

It follows from the limit of sinx/x.

---

## 19 · 费米黄金规则与态密度 / Fermi’s golden rule and density of states

### 直观问题 / Intuition

单个终态的概率随 t² 增长，为什么连续终态常给出恒定跃迁率？

Why can a continuum give a constant transition rate when a single-state probability grows as t²?

时间变长使共振峰升高，同时使频率窗口变窄。对连续终态求和后，面积只随时间线性增长。黄金规则需要一段中间时间窗口：足以解析连续谱，又短到初态尚未明显耗尽。

A longer time raises the resonant peak while narrowing its frequency window. Summing over a continuum leaves an area linear in time. The rule needs an intermediate window: long enough to resolve the continuum but short enough to avoid appreciable depletion.

### 必要概念 / Concepts

### 态密度的单位 / Density-of-states units

ρ(E) 是每单位能量的终态数，已经包含所选通道的简并因子。计数约定必须与矩阵元归一化一致。

ρ(E) counts final states per unit energy and includes the chosen channel degeneracies. Its convention must match matrix-element normalization.

### 黄金规则 / The golden rule

对静态弱耦合到连续谱，使用能量守恒处的矩阵元与态密度。周期驱动还需吸收或发射的能量条件及傅里叶分量因子。

For a static weak coupling to a continuum, evaluate the matrix element and density at conserved energy. A periodic drive adds absorption/emission energies and Fourier-component factors.

$$
\Gamma=\frac{2\pi}{\hbar}|M_{fi}|^2\rho(E_i)
$$

### 失效情形 / When it fails

稀疏离散谱、强耦合、短时、阈值附近的快速变化或明显耗尽都需要更完整处理。Γ 是率，寿命或线宽需按相应模型定义。

Sparse discrete spectra, strong coupling, very short times, rapidly varying thresholds and depletion require fuller treatment. Γ is a rate; lifetimes and linewidths require the corresponding model.

### 公式推导 / Derivation

### 先对终态求和 / Sum over final states

将离散求和替换为能量积分。

Replace the sum by an energy integral.

$$
P(t)\simeq\int dE\,\rho(E)\frac{|M(E)|^2t^2}{\hbar^2}\mathrm{sinc}^2\frac{(E-E_i)t}{2\hbar}
$$

### 利用窄峰面积 / Use the narrow-peak area

在峰宽内把 ρ|M|² 当常数，用积分 ∫sinc²u du=π。

Treat ρ|M|² as constant across the peak and use ∫sinc²u du=π.

$$
P(t)\simeq\frac{2\pi}{\hbar}|M(E_i)|^2\rho(E_i)t
$$

### 取概率增长率 / Read the probability growth rate

线性斜率给 Γ；这一步没有证明所有时刻指数衰减。

The slope gives Γ; this alone does not prove exponential decay at all times.

$$
\Gamma=P(t)/t,\qquad P\ll1
$$

### 交互实验 / Interactive model

耦合、态密度与速率

Coupling, density and rate

ℏ=E*=1 的无量纲单位；M/E* 与 ρE* 为输入，输出 Γℏ/E*。只显示黄金规则率和短时线性概率，不假定任意长时间有效。

Dimensionless ℏ=E*=1. Enter M/E* and ρE*; output Γℏ/E*. Shows golden-rule rate and short-time linear probability, with no claim of validity at arbitrary times.

### 输入与范围 / Controls and ranges

- 矩阵元 M/E* / Matrix element M/E*: 0–0.05, step 0.001, default 0.02
- 态密度 ρE* / Density of states ρE*: 0.1–5, step 0.1, default 3

### 例题 / Worked example

### 耦合翻倍 / Double the coupling

取 M/E*=0.02、ρE*=3，Γℏ/E*=2π×0.0004×3≈0.00754。矩阵元翻倍后率增至四倍；态密度翻倍只使率翻倍。

For M/E*=0.02 and ρE*=3, Γℏ/E*=2π×0.0004×3≈0.00754. Doubling M quadruples the rate; doubling the density only doubles it.

### 自测与解释 / Self-check

1. 黄金规则率对矩阵元如何依赖？ / How does the rate depend on the matrix element?

   A. |M| / |M|
   B. |M|² / |M|²

答案 / Answer: B

来自跃迁振幅的模平方。

It comes from the squared transition amplitude.

2. 能否不检查就用于单个离散终态？ / Can it be used unchecked for one discrete final state?

   A. 能 / Yes
   B. 不能 / No

答案 / Answer: B

连续谱积分和中间时间窗口是关键条件。

The continuum sum and intermediate-time window are essential.

---

## 20 · 散射态、概率流与截面 / Scattering states, current and cross sections

### 直观问题 / Intuition

探测器记录角分布，怎样把计数变成与入射束强度无关的量？

How can angular counts be converted into a quantity independent of incident beam strength?

用散射通量除以入射通量，得到具有面积量纲的截面。散射振幅是复数，既包含角分布也包含相位；截面只看到其模平方的一部分信息。

Divide scattered flux by incident flux to obtain an area-valued cross section. The complex amplitude contains both angular structure and phase; its squared magnitude retains only part of that information.

### 必要概念 / Concepts

### 远场边界条件 / Far-field boundary condition

对三维短程势的弹性散射，远处是平面入射波加向外球面波。长程 Coulomb 势需要修改渐近处理。

For elastic scattering by a short-range three-dimensional potential, the far field is an incident plane wave plus an outgoing spherical wave. Long-range Coulomb scattering needs modified asymptotics.

$$
\psi\sim e^{ikz}+f(\theta,\phi)\frac{e^{ikr}}r
$$

### 概率流 / Probability current

波函数的归一化与流的单位必须保持一致。入射振幅取 1 时，流为 ℏk/m。

Keep wave-function normalization and current units consistent. Unit incident amplitude gives current ℏk/m.

$$
\mathbf j=\frac\hbar m\operatorname{Im}(\psi^*\nabla\psi)
$$

### 微分与总截面 / Differential and total cross sections

同一弹性通道的出入速度相同。非弹性通道一般要保留速度比。

Incident and outgoing speeds agree in this elastic channel. Inelastic channels generally require a velocity ratio.

$$
\frac{d\sigma}{d\Omega}=|f|^2,\quad\sigma=\int|f|^2d\Omega
$$

### 公式推导 / Derivation

### 求散射径向流 / Find radial scattered current

只保留远处球面波的主导径向项。

Keep the leading radial term of the outgoing wave.

$$
j_r\simeq\frac{\hbar k}{m}\frac{|f|^2}{r^2}
$$

### 乘探测面积 / Multiply by detector area

立体角 dΩ 对应球面面积 r²dΩ。

Solid angle dΩ covers area r²dΩ.

$$
d\dot N\propto j_rr^2d\Omega
$$

### 除以入射通量 / Divide by incident flux

距离因素相消，得到与 r 无关的散射面积。

The distance cancels, leaving an r-independent area.

$$
d\sigma=\frac{j_rr^2}{j_{\rm in}}d\Omega=|f|^2d\Omega
$$

### 交互实验 / Interactive model

各向同性散射的角接受度

Angular acceptance in isotropic scattering

教学模型 f=a，a 是长度；显示 σ/a² 和锥角 θ≤θmax 内的比例。固定弹性通道，不含探测效率和多次散射。

Teaching model f=a, with length a. Shows σ/a² and the fraction inside θ≤θmax. One elastic channel; no detector efficiency or multiple scattering.

### 输入与范围 / Controls and ranges

- 接受锥角 θmax（度） / Acceptance cone θmax (degrees): 0–180, step 1, default 60

### 例题 / Worked example

### 前向 60° 圆锥 / A forward 60° cone

各向同性时总截面 4πa²。0≤θ≤60° 的立体角为 2π(1−cos60°)=π，接受比例为 1/4；不是角度比 60/180。

An isotropic amplitude gives total cross section 4πa². The cone 0≤θ≤60° has solid angle 2π(1−cos60°)=π, so its fraction is 1/4, not 60/180.

### 自测与解释 / Self-check

1. f 的量纲是什么？ / What are the units of f?

   A. 长度 / Length
   B. 面积 / Area

答案 / Answer: A

|f|² 的量纲为面积。

|f|² has area units.

2. 球面立体角元包含什么？ / What factor belongs in the solid-angle element?

   A. sinθ dθ dφ / sinθ dθ dφ
   B. 只有 dθ / Only dθ

答案 / Answer: A

球面面积的纬度因子为 sinθ。

The spherical area element contains sinθ.

---

## 21 · 分波、相移与低能散射 / Partial waves, phase shifts and low-energy scattering

### 直观问题 / Intuition

球对称势的散射，为什么可以拆成不同角动量的波？

Why can scattering by a central potential be separated into angular-momentum channels?

中心势保持轨道角动量，每个 l 通道的径向波被势能改变相位。低能时离心势抑制较高 l，常由 s 波主导，但阈值共振可能改变简单估计。

A central potential preserves orbital angular momentum. Each l channel acquires a radial phase shift. At low energy the centrifugal barrier suppresses higher l, often leaving s-wave dominance, with threshold resonances requiring care.

### 必要概念 / Concepts

### 分波展开 / Partial-wave expansion

对无吸收的中心短程势，弹性 S 矩阵每个通道是单位模相位。

For a central short-range potential without absorption, each elastic S-matrix channel has unit modulus.

$$
S_l=e^{2i\delta_l},\quad f(\theta)=\frac1k\sum_l(2l+1)e^{i\delta_l}\sin\delta_l\,P_l(\cos\theta)
$$

### 总截面 / Total cross section

Legendre 多项式的正交性消去积分中的跨 l 项。微分截面中不同分波仍可干涉。

Legendre orthogonality removes cross-l terms after angular integration. Distinct partial waves still interfere in the differential cross section.

$$
\sigma=\frac{4\pi}{k^2}\sum_l(2l+1)\sin^2\delta_l
$$

### s 波极限 / The s-wave limit

仅保留 l=0 时角分布各向同性，单通道截面不超过 4π/k²。低能散射长度 a 定义 δ₀≈−ka。

Keeping only l=0 gives isotropy and a channel bound 4π/k². The low-energy scattering length a is defined by δ₀≈−ka.

### 公式推导 / Derivation

### 读取 s 波振幅 / Read the s-wave amplitude

P₀=1，不依赖散射角。

P₀=1 is angle independent.

$$
f_0=e^{i\delta_0}\sin\delta_0/k
$$

### 对角度积分 / Integrate over angles

常量在整个球面的积分产生 4π。

An angular constant integrates over 4π.

$$
\sigma_0=4\pi\sin^2\delta_0/k^2
$$

### 低能展开 / Take the low-energy expansion

在有限非共振散射长度、|ka|≪1 时。

For finite nonresonant a and |ka|≪1.

$$
\sin\delta_0\simeq-ka\Rightarrow\sigma_0\to4\pi a^2
$$

### 交互实验 / Interactive model

相移与幺正上限

Phase shift and the unitarity bound

固定波数 k，以 1/k 为长度单位；输入 s 波相移 δ₀（度），输出 σ₀k²。只包含单个弹性分波。

Fix k and use length unit 1/k. Enter s-wave phase shift δ₀ in degrees; output σ₀k². Only one elastic partial wave is included.

### 输入与范围 / Controls and ranges

- 相移 δ₀（度） / Phase shift δ₀ (degrees): 0–180, step 1, default 90

### 例题 / Worked example

### 最大 s 波截面 / Maximum s-wave cross section

δ₀=90° 时 sin²δ₀=1，σ₀=4π/k²；δ₀=0° 时该分波没有散射。δ₀ 与 δ₀+π 给相同 S₀。

At δ₀=90°, σ₀=4π/k². At zero phase shift this channel does not scatter. δ₀ and δ₀+π give the same S₀.

### 自测与解释 / Self-check

1. 纯 s 波角分布是什么？ / What is a pure s-wave angular distribution?

   A. 各向同性 / Isotropic
   B. 只向前 / Forward only

答案 / Answer: A

P₀=1。

P₀=1.

2. 无吸收弹性分波的 |Sl|？ / What is |Sl| for an elastic channel without absorption?

   A. 1 / 1
   B. 0 / 0

答案 / Answer: A

由幺正性保证。

Unitarity fixes its modulus.

---

## 22 · Born 近似与势的空间结构 / Born approximation and spatial structure of a potential

### 直观问题 / Intuition

角分布如何反映散射势的空间尺度？

How does an angular distribution encode the spatial scale of a scattering potential?

弱散射中，不同位置的贡献带有动量转移相位。Born 振幅是势的空间傅里叶变换，因此宽势与窄势会产生不同的角分布。近似可靠性仍需要弱散射检查。

For weak scattering, contributions from different positions carry momentum-transfer phases. The Born amplitude is a spatial Fourier transform of the potential, linking spatial width to angular width. Its validity still requires weak-scattering checks.

### 必要概念 / Concepts

### 归一化约定 / Normalization convention

采用入射波振幅为 1 的三维非相对论约定。傅里叶变换中不放额外 2π 因子。

Use the three-dimensional nonrelativistic convention with unit incident amplitude and no extra 2π factors inside the Fourier transform.

$$
f_B(\mathbf q)=-\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf q\cdot\mathbf r}V(\mathbf r)d^3r
$$

### 动量转移 / Momentum transfer

q 是波矢差的大小，真实动量转移为 ℏq。弹性散射有 q=2k sin(θ/2)。

q is the magnitude of the wave-vector transfer; momentum transfer is ℏq. Elastic scattering has q=2k sin(θ/2).

### 高斯势与条件 / Gaussian potential and conditions

取 V=V₀exp(−r²/(2a²))。实验只画角分布的归一化形状；V₀ 的大小决定是否允许采用 Born 近似。低能时 m|V₀|a²/ℏ²≪1 是一个保守的充分尺度检查。

Use V=V₀exp(−r²/(2a²)). The experiment shows only normalized angular shape; V₀ controls validity. At low energy m|V₀|a²/ℏ²≪1 is a conservative sufficient scale check.

### 公式推导 / Derivation

### 计算高斯变换 / Transform the Gaussian

三维积分分解为三个一维高斯积分。

Factor the integral into three one-dimensional Gaussian integrals.

$$
\int e^{-i\mathbf q\cdot\mathbf r}e^{-r^2/(2a^2)}d^3r=(2\pi)^{3/2}a^3e^{-a^2q^2/2}
$$

### 得到振幅 / Obtain the amplitude

带入归一化约定。

Insert the chosen normalization.

$$
f_B=-\sqrt{2\pi}\frac{mV_0a^3}{\hbar^2}e^{-a^2q^2/2}
$$

### 归一化角分布 / Normalize the angular distribution

取模平方并除以前向值。

Square and divide by the forward value.

$$
\frac{|f_B(\theta)|^2}{|f_B(0)|^2}=e^{-4(ka)^2\sin^2(\theta/2)}
$$

### 交互实验 / Interactive model

势宽与前向峰

Potential width and the forward peak

输入 ka；显示高斯势一阶 Born 截面的相对角形状，无量纲且不预测绝对截面。不从图形自动推断 Born 近似有效。

Enter ka; display the dimensionless relative angular shape for a Gaussian potential in first Born approximation, not an absolute cross section. The shape alone does not establish validity.

### 输入与范围 / Controls and ranges

- 尺度 ka / Scale ka: 0–3, step 0.05, default 1
- 散射角 θ（度） / Scattering angle θ (degrees): 0–180, step 1, default 90

### 例题 / Worked example

### 90° 相对前向强度 / Intensity at 90° relative to forward

ka=1 时，θ=90° 给 exp(−2)≈0.1353；θ=180° 给 exp(−4)≈0.0183。ka 增大时前向峰变窄，但其绝对高度还依赖 V₀ 与 a。

For ka=1, θ=90° gives exp(−2)≈0.1353 and θ=180° gives exp(−4)≈0.0183. Increasing ka narrows the forward peak; its absolute height also depends on V₀ and a.

### 自测与解释 / Self-check

1. 本页 q 是动量还是波矢差？ / Is q a momentum or a wave-vector transfer?

   A. 波矢差 / Wave-vector transfer
   B. 动量 / Momentum

答案 / Answer: A

真实动量转移为 ℏq。

Momentum transfer is ℏq.

2. 仅有归一化角形状能否验证 Born 近似？ / Can normalized angular shape alone validate Born approximation?

   A. 能 / Yes
   B. 不能 / No

答案 / Answer: B

还要检查势强度与散射尺度。

Potential strength and scattering scales must also be checked.

---

## 23 · 全同粒子：交换与不可区分性 / Identical particles: exchange and indistinguishability

### 直观问题 / Intuition

两个全同粒子的标签互换，为什么不能产生一个可区分的新物理状态？

Why does swapping labels of identical particles not create a distinguishable physical state?

标签用于计算，不能当作可追踪的物理身份。交换算符对整个多粒子态作用；三维普通玻色子与费米子分别选取对称和反对称扇区。对称化不是经典地把两种标签分配的概率相加。

Labels aid calculation but are not trackable physical identities. Exchange acts on the entire multiparticle state. Ordinary three-dimensional bosons and fermions occupy symmetric and antisymmetric sectors. Symmetrization adds amplitudes rather than classical probabilities for label assignments.

### 必要概念 / Concepts

### 交换算符 / Exchange operator

交换两套完整单粒子坐标，包括位置与自旋。交换两次恢复原态，P₁₂²=I，交换本征值为 ±1。

Exchange complete single-particle coordinates, including position and spin. Exchanging twice restores the state: P₁₂²=I, giving eigenvalues ±1.

### 非正交轨道的归一化 / Normalization for nonorthogonal orbitals

对归一化单粒子轨道 a、b，令 s=⟨a|b⟩。交换项使归一化因子依赖重叠。

For normalized orbitals a,b define s=⟨a|b⟩. Exchange terms make normalization depend on overlap.

$$
\Psi_\pm=\frac{a(1)b(2)\pm b(1)a(2)}{\sqrt{2(1\pm|s|^2)}}
$$

### 排斥的是完整单粒子态 / Exclusion concerns a complete single-particle state

两个费米子不能占据相同的完整单粒子态；只有空间轨道相同但自旋不同，并不违反此原则。

Two fermions cannot occupy the same complete single-particle state. Sharing a spatial orbital with different spin does not violate this principle.

### 公式推导 / Derivation

### 交换两个直积项 / Exchange product terms

P₁₂ 互换 a(1)b(2) 与 b(1)a(2)。

P₁₂ interchanges the two products.

$$
P_{12}[a(1)b(2)\pm b(1)a(2)]=\pm[a(1)b(2)\pm b(1)a(2)]
$$

### 计算范数 / Compute the norm

交叉项各贡献 |s|²。

Each cross term contributes |s|².

$$
\|ab\pm ba\|^2=2(1\pm|s|^2)
$$

### 考察相同态极限 / Examine the identical-state limit

a=b 时反对称分子为零，无法归一化；这表示该双占据态被禁止，而非一个可归一化的零概率态。

For a=b the antisymmetric numerator vanishes and cannot be normalized. That occupancy is forbidden; it is not a normalized zero-probability state.

$$
a(1)a(2)-a(1)a(2)=0
$$

### 交互实验 / Interactive model

重叠如何影响交换态归一化

How overlap affects exchange normalization

输入 r=|⟨a|b⟩|∈[0,1]，显示未归一化对称/反对称态的范数平方。r=1 时反对称态不存在，程序明确显示禁止而不除零。

Enter r=|⟨a|b⟩|∈[0,1]. Outputs are squared norms of unnormalized symmetric/antisymmetric combinations. At r=1 the antisymmetric state is forbidden and no division by zero is performed.

### 输入与范围 / Controls and ranges

- 轨道重叠的模 r / Orbital overlap magnitude r: 0–1, step 0.01, default 0.6

### 例题 / Worked example

### 正交与重叠轨道 / Orthogonal and overlapping orbitals

s=0 时分母均为 √2；|s|=0.6 时对称分母为 √2.72≈1.649，反对称为 √1.28≈1.131。若轨道完全相同，费米子还可借助不同自旋形成不同的完整单粒子态。

At s=0 both denominators are √2. At |s|=0.6 they are √2.72≈1.649 and √1.28≈1.131. Equal spatial orbitals can still support fermions with different spin in distinct complete single-particle states.

### 自测与解释 / Self-check

1. 全同粒子交换时包括自旋坐标吗？ / Does identical-particle exchange include spin coordinates?

   A. 包括 / Yes
   B. 不包括 / No

答案 / Answer: A

必须交换整个单粒子状态。

Exchange acts on complete single-particle coordinates.

2. 重叠为 1 时反对称双占据态能否归一化？ / Can the antisymmetric double-occupancy state be normalized at overlap one?

   A. 能 / Yes
   B. 不能 / No

答案 / Answer: B

分子为零，该占据被排除。

The numerator vanishes and the occupancy is excluded.

---

## 24 · 自旋、空间对称性与泡利原理 / Spin, spatial symmetry and the Pauli principle

### 直观问题 / Intuition

两个电子可以占据同一空间轨道，为什么又说费米子不能占据同一态？

How can two electrons share a spatial orbital if fermions cannot share a state?

泡利原理约束空间与自旋合在一起的总态。自旋反对称单态可以配空间对称态；自旋对称三重态必须配空间反对称态。相同空间轨道的两个电子因此只能形成自旋单态。

The Pauli principle constrains the full spatial-spin state. An antisymmetric spin singlet can accompany a symmetric spatial state; a symmetric triplet requires an antisymmetric spatial state. Two electrons in the same spatial orbital therefore form a spin singlet.

### 必要概念 / Concepts

### 总交换符号 / Total exchange sign

此处只讨论空间与自旋可分离的双电子态。若存在自旋—轨道纠缠，应直接检查整个态的反对称性。

Here spatial and spin factors are separable. With spin-orbit entanglement, check antisymmetry of the full state directly.

$$
P_{12}(\Phi\chi)=-\Phi\chi
$$

### Slater 行列式 / Slater determinant

对正交归一化的完整单粒子轨道 u、v，行列式自动给出交换负号。两个轨道相同则两列相同，行列式为零。

For orthonormal complete single-particle orbitals u,v, a determinant enforces the exchange minus sign. Equal orbitals give identical columns and a zero determinant.

$$
\Psi=\frac1{\sqrt2}\begin{vmatrix}u(1)&v(1)\\u(2)&v(2)\end{vmatrix}
$$

### 交换不等于新增基本力 / Exchange is not an extra fundamental force

对称性改变允许态与相关性。无相互作用的费米子也受占据约束；原子中的实际交换能还涉及哈密顿量矩阵元。

Symmetry changes allowed states and correlations. Noninteracting fermions still obey occupancy constraints; actual atomic exchange energies also involve Hamiltonian matrix elements.

### 公式推导 / Derivation

### 自旋单态与三重态 / Spin singlet and triplet

单态交换为负，三重态交换为正。

The singlet is odd and the triplet even under exchange.

$$
\chi_s=(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2
$$

### 配对空间对称性 / Pair spatial symmetry

两个交换符号的乘积必须为负。

The product of exchange signs must be negative.

$$
\Phi_+\chi_s\;\text{or}\;\Phi_-\chi_t
$$

### 应用于同一轨道 / Apply to a shared orbital

空间乘积 φ(r₁)φ(r₂) 是对称的，只允许搭配单态。

The product φ(r₁)φ(r₂) is symmetric and can only accompany the singlet.

$$
\Psi=\phi(\mathbf r_1)\phi(\mathbf r_2)\chi_s
$$

### 交互实验 / Interactive model

检验空间—自旋组合是否允许

Check allowed spatial-spin combinations

选择空间与自旋的交换符号，输出总符号及双电子态是否允许。模型是离散的对称性检查，不计算原子能量或热力学分布。

Select spatial and spin exchange signs. Outputs give the total sign and whether a two-electron state is allowed. This discrete symmetry check computes neither atomic energies nor thermal distributions.

### 输入与范围 / Controls and ranges

- 空间交换符号 / Spatial exchange sign: 对称 +1 / Symmetric +1; 反对称 −1 / Antisymmetric −1
- 自旋态 / Spin state: 单态 −1 / Singlet −1; 三重态 +1 / Triplet +1

### 例题 / Worked example

### 一维盒中的两电子 / Two electrons in a one-dimensional box

令单粒子 Eₙ=n²E₁，无相互作用。自旋单态允许两电子都占 n=1，总能量 2E₁；三重态要求反对称空间态，最低占 n=1、2，总能量 5E₁。差异来自允许态约束，本例没有电子间排斥。

Let Eₙ=n²E₁ for noninteracting particles. A spin singlet permits both electrons in n=1, giving 2E₁. A triplet requires an antisymmetric spatial state, whose lowest occupations are n=1,2, giving 5E₁. The difference is an allowed-state constraint; electron repulsion is absent.

### 自测与解释 / Self-check

1. 同一空间轨道内的两电子可形成哪种自旋态？ / Which spin state can two electrons sharing one spatial orbital form?

   A. 单态 / Singlet
   B. 三重态 / Triplet

答案 / Answer: A

对称空间态必须配反对称自旋态。

A symmetric spatial state requires an antisymmetric spin state.

2. 无相互作用费米子还需遵守泡利原理吗？ / Do noninteracting fermions still obey Pauli exclusion?

   A. 需要 / Yes
   B. 不需要 / No

答案 / Answer: A

交换反对称性不是相互作用强度的结果。

Exchange antisymmetry does not depend on interaction strength.

本页采用三维普通电子的反对称化公设。自旋—统计关系的相对论证明、任意子和完整多体统计不在本课件范围；官网未给出全同粒子的当学期讲授深度。

This page uses antisymmetrization for ordinary three-dimensional electrons. Relativistic spin-statistics proofs, anyons and full many-body statistics are outside scope; the official page does not specify this topic’s term-specific depth.
