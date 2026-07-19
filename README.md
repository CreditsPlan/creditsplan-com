# CreditsPlan

**国际 AI 编程订阅方案对比与决策平台**

[https://creditsplan.com](https://creditsplan.com)

## 简介

CreditsPlan 是一个面向 AI 开发者的订阅决策平台，提供国际主流 AI Coding 产品的结构化对比，涵盖价格、配额、支持模型和使用条件等维度。所有数据均来自官方来源，并提供价格历史追踪与变更通知。

## 主要功能

- **方案对比** — 按价格、配额、模型、使用条件等维度结构化对比各 AI 编程订阅方案
- **品牌专页** — 各品牌（Qoder、Z-AI、BytePlus、OpenCode 等）独立介绍页
- **方案详情** — 每个订阅方案提供独立的详情页面
- **价格历史** — 记录并追踪各方案的价格变动（`price-history.json` / `price-changes.xml`）
- **变更日志** — 平台数据与功能的更新记录（`changelog.html`）
- **新闻资讯** — AI 编程领域相关新闻聚合（`news.html`）
- **方法论** — 公开数据采集与对比方法论说明（`methodology.html`）
- **多语言** — 支持中英文切换（i18n）
- **暗色模式** — 支持亮色 / 暗色主题切换

## 技术栈

| 层面 | 技术 |
|------|------|
| 样式 | Tailwind CSS |
| 脚本 | 原生 JavaScript (ES Modules) |
| 数据 | 静态 JSON (`data.json`) |
| 部署 | 纯静态站点，无需后端 |

## 项目结构

```
├── index.html              # 首页 — 方案对比总览
├── data.json               # 核心数据文件（模型 & 方案）
├── price-history.json      # 价格历史记录
├── price-changes.xml       # 价格变更 RSS
├── changelog.json          # 变更日志数据
│
├── brands/                 # 品牌专页
│   ├── qoder/
│   ├── z-ai/
│   ├── byteplus/
│   └── opencode-go/
│
├── plans/                  # 方案详情页
│   ├── qoder-pro/
│   ├── z-ai-glm-coding-pro/
│   └── ...
│
├── js/                     # JavaScript 模块
│   ├── app.js              # 应用入口
│   ├── plans.js            # 方案对比页逻辑
│   ├── plans-page.js       # 方案列表页渲染
│   ├── plans-detail.js     # 方案详情页渲染
│   ├── plans-table.js      # 对比表格组件
│   ├── plans-filters.js    # 筛选器
│   ├── brands.js           # 品牌页逻辑
│   ├── news.js             # 新闻页逻辑
│   ├── i18n.js             # 国际化
│   ├── theme.js            # 主题切换
│   └── shared/             # 共享工具模块
│
├── assets/                 # 静态资源（字体、图标）
├── styles.tailwind.*.css   # Tailwind 编译产物
├── sitemap.xml             # 站点地图
└── robots.txt              # 爬虫规则
```

## 本地开发

本项目为纯静态站点，无需构建工具或包管理器，直接用任意 HTTP 服务器托管即可：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .
```

然后在浏览器访问 `http://localhost:8000`。

## 数据说明

- 核心数据存储在 `data.json`，包含模型信息和各订阅方案的定价、配额等字段
- 价格数据以美元为单位，标注数据来源与汇率换算说明
- 所有数据均标注官方来源链接，确保可验证

## 许可证

本项目仅供学习与参考使用。所有品牌名称、商标和产品信息归各自所有者所有。
