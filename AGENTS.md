# 项目协作说明

## 代码检索与协作

<!-- codebase-memory-mcp:start -->
# Codebase Knowledge Graph (codebase-memory-mcp)

This project uses codebase-memory-mcp to maintain a knowledge graph of the codebase.
ALWAYS prefer MCP graph tools over grep/glob/file-search for code discovery.

## Priority Order
1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace who calls a function or what it calls
3. `get_code_snippet` — read specific function/class source code
4. `query_graph` — run Cypher queries for complex patterns
5. `get_architecture` — high-level project summary

## When to fall back to grep/glob
- Searching for string literals, error messages, config values
- Searching non-code files (Dockerfiles, shell scripts, configs)
- When MCP tools return insufficient results
<!-- codebase-memory-mcp:end -->

默认由主 agent 完成开发，尽量不使用 subagents。只有在有充分、具体的理由，且预期收益明显超过协调成本时，才允许使用 subagents；启用前须说明理由、任务边界与必要性，并将数量控制在必要的最小范围。不得仅因任务可拆分或工具可用就启用 subagents。

## 原始课件制作提示词

以下提示词来自对话“制作 PHY489 双语交互课件”，保留原文作为制作课件的依据。其中 `var/` 是原对话的输出位置；本项目的当前目录和发布要求见下文。

```text
var/PHY489_Detailed_Notes.pdf，制作本课程的 web 课件。
用 Build Web Apps 插件。
每个独立的章节采用同一个学习顺序：直观问题 → 必要概念 → 公式推导 → 交互实验 → 例题 → 自测与解释。
每一个独立章节一个独立page。不同章节的页面之间采用类似PPT的结构组织（使用下一页、上一页按钮）。
中英文双语内容，网页上有语言切换按钮
关键的重点学习内容，采用交互式网页。
不要使用后台服务（python， Nodejs）启动网页，而是用浏览器打开index.html的方式启动页面。
课件输出到独立目录中， var/ 下子目录。

先采用codex“计划模式”生成设计方案，遇到不确认的事项，提供推荐方案让我选择。
```

## 已确认的 PHY489 课件要求

- 以提供的课程笔记为内容依据，覆盖其 20 个编号主章节，按原顺序组织，保留主要小节和 PDF 页码；每章独立 HTML 页面，课程首页提供目录和章节入口。
- 每章依次包含直观问题、必要概念、公式推导、交互实验、例题、自测与解释。没有适合推导的公式时，应说明并联系相关物理关系，不编造推导。
- 中英文均提供完整的讲解、控件标签、题目、答案和解释；切换语言时保留当前章节、实验状态和答案。
- 每章至少一个与重点相符的交互实验，输入改变时更新结果，说明模型的单位、适用条件和简化假设。例题包含步骤和结果；自测提交后显示答案与解释。标明新增内容属于教学改编。
- 对原文中的疑似错误、不一致和未完成内容保留出处并明确标注。采用修正或约定时给出可核验依据；未确定的内容保持待核实。历史数据和假设不自动当作当前实验事实。
- 使用已确认的浅色学术讲义风格：左侧章节目录、清晰的公式和图表、语言切换，以及底部上一章／下一章导航。视觉草图中的示意内容不能替代真实课程资料。
- 使用静态 HTML、CSS 和 JavaScript、本地公式渲染和相对路径，复用样式与导航逻辑；网页可直接通过 `file://` 打开并离线学习，不依赖后台服务。交互控件与文字应为真实网页元素。
- 支持桌面和手机宽度、键盘操作及可见焦点。验证章节结构、双语一致性、原文出处、公式、交互计算、边界输入、例题和自测；检查章节导航、语言切换、离线资源以及桌面和移动端显示。说明实际验证方式和未完成的检查，不能将静态检查当作浏览器或物理实验验证。

## 当前项目与发布约束

- 本仓库支持多门课程；仓库根目录 `index.html` 以平铺卡片列出课程，每门课程使用独立目录与入口。当前课程为 `phy489/`。添加课程时更新首页卡片，并保持适用于 GitHub Pages 仓库子路径的相对链接。
- 网站通过 GitHub Actions 发布到 GitHub Pages，同时保留本地直接打开的使用方式。不要为了浏览课件引入后台服务。
- PHY489 原始 PDF 不能发布。它仅存放在本地 `phy489/courseware/`；该目录必须保持 Git 忽略和 Pages 打包排除。不要提交、推送或以其他方式公开 PDF；线上仅显示出处和页码，本地可使用原文链接。
- `phy489/` 的 `README.md` 说明课程结构、内容边界和自检方法。更改课件时保留已有课程内容和明确列出的科学约定；新增课程的章节数、资料来源和输出目录应依据其实际材料与用户要求确定，不要照搬 PHY489 的特定数字。
