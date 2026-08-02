# CreditsPlan

**English | [中文](README_zh-CN.md)**

<p align="center">
  <a href="https://www.creditsplan.com/"><img src="./logo.webp" alt="CreditsPlan Logo" width="120"></a>
</p>

<p align="center">
  <b>International AI Coding Plan Comparison & Subscription Decision Platform</b>
</p>

<p align="center">
  <a href="https://www.creditsplan.com/">Website</a> ·
  <a href="https://creditsplan.cn/">CN Site</a> ·
  <a href="https://www.creditsplan.com/methodology.html">Methodology</a> ·
  <a href="https://www.creditsplan.com/changelog.html">Changelog</a> ·
  <a href="https://www.creditsplan.com/price-changes.xml">Price Changes RSS</a>
</p>

---

## Overview

CreditsPlan is a subscription decision platform for AI developers, providing structured, source-verified comparisons of international AI Coding plans across **price, quota, supported models, and usage conditions**, with official source verification, price history, and change tracking.

This repository is the static site publish mirror for [creditsplan.com](https://www.creditsplan.com/). Issues for data corrections and suggestions are welcome.

## Data Highlights

- ✅ **Official Source Verified**: Every plan's price, quota, and purchase status is cross-checked against the vendor's official page with source links
-  **Last Verified Date**: Each record shows the verification date for transparency
- 📈 **Price History Tracking**: Price changes are archived (`price-history.json`) and published via [RSS](https://www.creditsplan.com/price-changes.xml)
- 🌍 **International Coverage**: Plans priced in USD with multi-language support (English / Chinese)

## Core Pages

| Page | Description |
| --- | --- |
| [Plan Comparison](https://www.creditsplan.com/) | Cross-brand AI Coding plan structured comparison table with filtering and export |
| [Brands](https://www.creditsplan.com/brands/) | Verified brand index and brand detail pages |
| [Models](https://www.creditsplan.com/model) | API model price comparison (input/output/cache pricing, context length, etc.) |
| [Advisor](https://www.creditsplan.com/advisor/) | Value calculator: rank plans by cost per 1k calls based on your usage |
| [AI News](https://www.creditsplan.com/news.html) | Market and pricing news |
| [Methodology](https://www.creditsplan.com/methodology.html) | Data verification methods, update frequency, and correction channels |
| [Changelog](https://www.creditsplan.com/changelog.html) | Data and price update records |

## Covered Brands

Currently includes: Qoder, Z.ai (GLM), BytePlus, OpenCode, ChatGPT, Claude, Google Antigravity, Grok, Cursor, Trae, StepFun, StreamLake, Ollama, GitHub Copilot, and more — continuously updated.

## Directory Structure

```
.
├── index.html              # Homepage: plan comparison table
├── brands/                 # Brand index and brand detail pages
├── plans/                  # Plan detail pages (static SEO pages)
├── compare/                # Head-to-head brand comparison pages
├── rankings/               # Cheapest plans ranking
├── reports/                # Monthly price reports
├── news.html               # AI news
── methodology.html        # Methodology
├── changelog.html          # Changelog
├── data.json               # Core plan and model data
├── changelog.json          # Changelog data
├── price-history.json      # Price history data
├── price-changes.xml       # Price changes RSS
├── sitemap.xml             # Sitemap
├── llms.txt                # LLM-friendly site description
├── js/                     # Frontend scripts (native ES Modules, no framework)
│   └── shared/             # Shared utility modules for brands, plans, models
└── assets/                 # Fonts and brand icon resources
```

## Tech Stack

- Pure static site: native HTML + ES Module JavaScript, no frontend framework
- Styling: Tailwind CSS (pre-compiled with content hashes)
- Data-driven: pages render from `data.json` and other JSON files
- Dark/light theme toggle
- i18n: English / Chinese language switching

## Machine-Readable Data

- [`data.json`](https://www.creditsplan.com/data.json): structured plan and model data
- [`price-history.json`](https://www.creditsplan.com/price-history.json): price history
- [`sitemap.xml`](https://www.creditsplan.com/sitemap.xml): all indexable pages
- [`price-changes.xml`](https://www.creditsplan.com/price-changes.xml): price changes RSS
- [`llms.txt`](https://www.creditsplan.com/llms.txt): LLM-friendly site description

## Copyright & License

- Pages and code: All Rights Reserved, for browsing, learning, and reference only. Unauthorized mirroring or competing sites are prohibited.
- Data files (`data.json` / `price-history.json` etc.): [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) — non-commercial attribution allowed, no commercial use or derivative works.
- See [LICENSE](./LICENSE); brand names and trademarks belong to their respective owners.

## Citation & Feedback

- When citing prices, please note the **plan name and verification date**, and state that the vendor's official site is authoritative.
- Data corrections / collaboration suggestions:
  - Submit a [GitHub Issue](https://github.com/CreditsPlan/creditsplan-com/issues)
  - Email: feedback@creditsplan.com

## Related Sites

- International: [creditsplan.com](https://www.creditsplan.com/) (this repo, USD settlement)
- CN: [creditsplan.cn](https://creditsplan.cn/) (CNY settlement plans)

