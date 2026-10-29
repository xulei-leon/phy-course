# PHY456H1 — Quantum Mechanics II

24 页中英文双语交互课件，另含课程目录页。直接打开 `index.html`；也可从仓库首页进入。学习无需联网、构建或后台服务。每页包含直观问题、必要概念、三步推导、交互模型、步骤例题与两道带解释的自测。

## 范围与来源

查阅日期：2026-10-29。

- [S1：多伦多大学文理学院课程目录](https://artsci.calendar.utoronto.ca/course/phy456h1)：先修 PHY356H1，24L/12T；两种绘景、WKB、变分、定态微扰、自旋、角动量加法、含时微扰、散射。
- [S2：多伦多大学物理系课程说明](https://www.physics.utoronto.ca/undergraduate/current-and-prospective-students/undergraduate-courses/quantum-mechanics-ii/)：补充全同粒子系统等主题。
- [R1：MIT 8.05 公开讲义目录](https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/pages/lecture-notes/)：动力学、自旋、张量积、角动量与角动量加法的延伸阅读。
- [R2：MIT 8.06 公开教学目录](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/pages/video-lectures/)：近似方法、含时微扰、散射与全同粒子的延伸阅读。

S1/S2 仅用于确认课程主题，未提供各页具体推导或例题。本课件为独立教学改编，不是学校官方出版物或对当学期讲义的逐页复现。24 页顺序、讲解、例题、交互和自测均为新增内容。R1/R2 是延伸阅读，不是多伦多大学指定教材，不表示本次已逐页核对全部 MIT 讲义。未取得目标学期完整 syllabus；逐周安排、指定教材、考核比例和实际覆盖深度待核实。

## 24 页结构

| 页 | 内容 | 范围关系 |
|---|---|---|
| 01 | 量子态、基底与测量 | 先修复习与桥接 |
| 02 | 幺正演化与相对相位 | 量子动力学 |
| 03 | 海森堡绘景与 Ehrenfest 定理 | 量子动力学 |
| 04 | WKB 局部波长与转折点 | WKB |
| 05 | WKB 量子化与束缚态 | WKB 应用 |
| 06 | 隧穿与指数灵敏度 | WKB／势垒应用 |
| 07 | 变分原理及上界 | 变分法 |
| 08 | 氢原子的变分长度尺度 | 变分应用 |
| 09 | 非简并一阶、二阶微扰 | 定态微扰 |
| 10 | 简并微扰与避免交叉 | 定态微扰 |
| 11 | 受静力的谐振子 | 定态微扰应用 |
| 12 | 自旋与 Stern–Gerlach 测量 | 电子自旋 |
| 13 | 自旋进动与旋转 | 电子自旋 |
| 14 | 角动量代数与阶梯算符 | 角动量复习／桥接 |
| 15 | 单态与三重态 | 角动量加法 |
| 16 | 自旋—轨道耦合 | 角动量应用 |
| 17 | 相互作用绘景与跃迁振幅 | 含时微扰 |
| 18 | 周期驱动与有限时间线宽 | 含时微扰应用 |
| 19 | 费米黄金规则与态密度 | 含时微扰应用 |
| 20 | 概率流与散射截面 | 基础散射 |
| 21 | 分波、相移与低能散射 | 散射教学拓展 |
| 22 | Born 近似与高斯势 | 散射教学拓展 |
| 23 | 交换与不可区分性 | S2 补充主题 |
| 24 | 自旋、空间对称性与泡利原理 | S2 补充主题 |

## 科学约定与内容边界

- 非相对论量子力学；普通三维玻色子／费米子。没有从非相对论理论“证明”相对论自旋—统计定理。
- 各页单独定义单位。振子单位、库仑单位与散射波数单位不能混用；不是全课程统一取所有常数为 1。
- WKB 量子化限于两个简单平滑转折点。矩形势垒的指数估计明确与精确匹配解比较，未将突变边界称为平滑转折点。
- 定态微扰先检查相关能隙；简并态先对角化投影微扰。外力谐振子是教学模型，不等于完整氢原子 Stark 效应。
- 自旋进动定义 H=ℏΩσz/2；实际电子磁矩符号需另行映射。Stern–Gerlach 仅是理想投影测量模型。
- 周期驱动矩阵元是余弦前系数，RWA 中保留 1/2；黄金规则中 ρ 是每单位能量的态数。明确区分离散终态振荡与连续谱速率。
- 散射采用短程势、单位入射平面波、弹性单通道；Born 傅里叶积分不放额外 2π 因子。高斯势实验只给相对形状，不能验证近似有效。
- 全同粒子交换完整的空间与自旋坐标。非正交轨道对称化保留重叠归一化；完整同态费米子双占据显示禁止。
- 24 页是独立网页的计数，不代表打印后恰好 24 张纸。未编造学校讲义页码、考题、成绩比例或实验数据。

## 文件与使用

- `chapter-01.html` 至 `chapter-24.html`：24 个独立入口。
- `content/01-06.js` 等四个文件：完整双语正文；`content/lessons.md`：便于审阅的合并内容稿。
- `assets/course.js`：在既有 PHY489 课件界面基础上改编的导航、语言、公式、自测逻辑。
- `assets/experiments.js`：24 个交互模型。
- 共享离线公式资源使用 `../phy489/assets/katex/`（KaTeX 0.16.22，MIT License），因此应保留仓库目录结构。没有外部字体、脚本或资源请求。
- 来源是用户主动点击才访问的外部链接；学习本身不依赖这些网页。
- 语言切换保留当前输入、已展开推导、选项及反馈。章节链接携带语言；页面重载和跨章节不承诺保存实验数值。
- 运行 `node phy456/checks.cjs` 做结构、双语、公式、物理关系和边界检查；维护工具使用 Node，学习无需 Node。

浏览器与验证的实际覆盖见 [verification.md](verification.md)。

## English quick start

Open `index.html` directly, choose English, and keep the repository folders together. There are 24 lesson pages plus a contents page. All lessons include concepts, derivations, a live model, a worked example and two explained questions. No server or network is required. This is an independent teaching adaptation based on official topic listings, not official U of T courseware. Term-specific scope and assessment remain unverified.
