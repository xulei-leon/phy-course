# APM346 source coverage / 资料覆盖

The existing directory is named `amp346`; every supplied document identifies the course as **APM346**. The web course uses that document code. Its eight pages follow the eight numbered main chapters of the detailed notes. This covers the supplied lectures only, not an unprovided semester syllabus.

保留用户已有目录 `amp346/`；课程编号按资料采用 **APM346**。课件 8 章与整理笔记 8 个主章一一对应，不据此声称覆盖完整学期。所有讲解、图表、展开推导、例题和自测为教学改编，未重刊原始扫描图。

Page references are **physical PDF page order, starting at 1**. The detailed notes have 36 pages: cover 1, contents 2–4, body 5–36 (printed body labels 1–32). Original handwritten page numbers are not used. Each concept on the web links to its actual detailed-note page when opened locally.

所有 PDF 页码均为从 1 起的文件实际页序。整理笔记共 36 页，正文位于 5–36，正文印刷页码为 1–32；不把它们或手写页码混用。

| Web chapter / 网页章 | Detailed notes / 整理 PDF | Major subsection coverage / 保留内容 |
|---|---|---|
| 01 Classification and data | 5–7 | 1.1 linearity/nonlinearity/zero RHS; 1.2 ODE constant families, uₓ=0, uₓₓ=0, uₓᵧ=0; 1.3 ODE initial data, finite-rod Dirichlet/Neumann, wave data |
| 02 ODE and divergence | 8–10 | 2.1 homogeneous/forced ODE, variable-coefficient integrating factor; 2.2 integration by parts, domain/disk normals, divergence, rectangle four-edge verification |
| 03 First-order PDE | 11–17 | 3.1 general form, three methods, directional derivative, coordinate Jacobian, auxiliary data; 3.2 constant cubic, exponential, rational/missing axis/poles, general prescription, circular curves; 3.3 zeroth-order term, selected solution, unsolved forcing |
| 04 Transport | 18–19 | 4.1 translated profile, sign of c, chain-rule check; 4.1.1 characteristic backtrace to t=0 |
| 05 Wave | 20–23 | 5.1 tension/density/dimensions; 5.2 operator factorization; 5.3 coordinate derivatives; 5.4 F/G data and d’Alembert; 5.5 dependence/influence, compact support |
| 06 Energy | 24–26 | 6.1 energy and decay; 6.2 direct differentiation; 6.3 multiply by uₜ, local flux, nonnegative components; 6.4 a²u storage |
| 07 Maximum principle | 27–29 | 7.1 time order and ODE analogy; 7.2 parabolic boundary/weak bounds; 7.3 extrema; 7.4 failed argument, εx² perturbation, boundary/interior/top-edge proof, ε limit and minimum |
| 08 Whole-line heat | 30–36 | 8.1 direct method; 8.2 translation, linearity, derivatives, convolution, scaling; 8.3 step/similarity/ODE/integrating factor/Gaussian integral; 8.4 kernel/convolution/trace/class; 8.5 kernel mass/evenness/smoothness |

The private `courseware/Notes/apm346_detailed_source_map.md` supplies the earlier per-original-page transcription map. It was consulted as source metadata, not treated as fresh verification evidence. The current course uses these ten originals (85 physical pages total):

以下为本地 10 份原稿（共 85 页）。表中交叉引用与整理笔记的原有逐页来源表核对；历史核验记录不等于本次重新核验。

| Original filename / 原稿文件 | Pages | Web destinations |
|---|---:|---|
| APM346F-Mon Sept 14, 2026.pdf | 12 | 01–02; p.12 is a heading-only transition into 03 |
| APM346F-Thu Sept 17, 2026pdf.pdf | 6 | 03, constant coefficients and auxiliary data |
| APM346 September 21.pdf | 19 | 03, variable-coefficient examples and exceptions |
| APM346F-Thu-Sep 24, 2026.pdf | 5 | 03–04, zeroth-order term and transport |
| APM346F-Mon Sept 28, 2026.pdf | 10 | 05, wave formula and dependence |
| APM346F-Thu Oct 2, 2026.pdf | 4 | 05, influence/support; internal handwritten date is October 1 |
| APM346F-Mon Oct 5, 2026.pdf | 10 | 06–07, energy and diffusion/extrema |
| APM346F-Thursday Oct. 8, 2026.pdf | 5 | 07, perturbation and top-edge proof |
| APM346F-Thu Oct 15, 2026.pdf | 5 | 08, five properties and step reduction |
| APM346F-Mon Oct 19, 2026.pdf | 9 | 08, Gaussian integral, convolution and kernel |

No downloadable source links are rendered on HTTP/HTTPS. The complete `courseware/` folder, including PDFs, TeX, the private source map and original figures, is excluded from Git and Pages packaging. The public map deliberately uses filenames and page references only.

HTTP/HTTPS 页面只显示文件名和页码，不生成原稿下载链接。原始 PDF、TeX、私有来源表和原图均留在 `courseware/`，整目录受 Git 忽略与 Pages 排除保护。

| Source issue / 原文疑点 | Location | Web convention / 网页处理 |
|---|---|---|
| U1 finite interval versus “Infinite domains” | Sep 14 p.6; notes 7 | Distinguish domains explicitly; do not infer intended diagram |
| U2 top and left flux signs | Sep 14 p.11; notes 10 | Use top +F₂ and left −F₁, verified by outward normals and divergence |
| U3 unscoped uₓ=0 annotation | Sep 17 p.3; notes 12 | Use a uₓ+b uᵧ=0; no general uₓ=0 claim |
| U4, U7 axis statements treated as global | Sep 21 pp.12,18; notes 15–16 | Axis restrictions only; rational axis is characteristic, circular axis is not |
| U5 inconsistent rational invariant | Sep 21 p.13; notes 15 | Use −1/y−x², not −x−1/y²; verify its characteristic derivative |
| U6 rational diagram labels/poles | Sep 21 p.14; notes 15 | C<0 poles ±√(−C), C>0 no poles; notes already record earlier diagram correction |
| Additional radius sign inconsistency | notes 16 | x²+y²=C≥0 has radius √C, not √(−C); follows directly from circle equation |
| U8 missing 3,2 coefficients | Sep 24 p.2; notes 17 | Keep 3uₓ+2uᵧ+u=0 and verify selected solution |
| U9 forced equation has no supplied solution | Sep 24 p.3; notes 17 | Preserve status; give labeled teaching extension along characteristics |
| U10 c² omitted in second derivative | Sep 28 p.5; notes 21 | Keep c² on both terms, derive −4c²vξη |
| U11 abbreviated velocity check | Sep 28 p.9; notes 22 | Include φ′ terms before cancellation at t=0 |
| U12–U14 time/point/derivative notation | Sep 28 p.10; Oct 2 pp.1–2; notes 22–23 | Use t₀ consistently, ∂²/∂x² and data at x₁; retain filename/date distinction |
| U15 strict positivity | Oct 5 p.5; notes 25 | K,P≥0, allow zero |
| U16 strong-principle wording without qualifications | Oct 5 p.9; notes 28 | Prove weak bound only; do not claim whole future rectangle constant |
| U17 missing spatial denominator square | Oct 8 p.2; notes 28–29 | Use uₓₓ |
| U18 “arbitrary” convolution weight | Oct 15 pp.3–4; notes 31 | Require convergence and differentiation-under-integral conditions |
| U19 jump value | Oct 15 pp.4–5, Oct 19 p.1; notes 32,34 | Q(0,t)=1/2 for t>0; recover initial data away from jump |
| U20 Qₜ sign | Oct 19 p.1; notes 32 | Negative sign by chain rule |
| U21 rescaled Gaussian exponent | Oct 19 p.5; notes 34 | e⁻ᶻ² after y=√(4k)z |
| U22 integration-by-parts sign | Oct 19 p.7; notes 35 | −[Qφ] boundary term; it vanishes under the stated decay |
| U23 trace-limit interchange not justified | Oct 19 pp.7–8; notes 35 | Supply a separate bounded-continuous-data dominated-convergence proof |
| U24 unrestricted uniqueness statement | Oct 19 p.8; notes 35 | Specify bounded classical solutions on finite time strips; no unrestricted growth claim |

Teaching additions include the linearity defect experiment; affine flux model; transversality condition; forced characteristic integral; C² compact bump and its polynomial antiderivative; fixed-end standing-mode energy; exact Dirichlet heat mode; Gaussian initial-data convolution/variance; and the dominated-convergence trace proof. These follow the displayed algebra and are not official exercise solutions.

教学新增模型、例题、自测及上述补充证明均非官方配套答案；解析验证只证明所列模型的相应性质，不是物理实验验收。


## Self-study revision / 自学扩展（2026-10-31）

本轮基于既有网页补充，原始 `courseware/` 在当前检出中缺失；上文页码和原稿覆盖为保留的历史映射，未重新核验。新增学习目标、复习卡、推导说明、例题、练习与实验任务统一标为教学补充，不赋予原稿页码。当前数量为 25 道例题、64 道章内练习、4 道综合题、12 个实验。

公开核对：Stanford Math 220A `firstorder.pdf` §2.1–2.2 的非特征条件；Stanford Math 220B `HEATEQN.pdf` §2.8 的有限域弱原理与唯一性条件。链接见 README 和页面出处区；无需下载即可离线学习。源项公式、多项式波动例、驻波能量和高斯卷积是独立代数教学示例，另有数值残差／积分核对。公开参考不替代缺失原稿的核验。
