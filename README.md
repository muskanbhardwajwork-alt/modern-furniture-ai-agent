# Modern Furniture Co. AI Analytics Agent

An executive dashboard with a built-in AI agent that lets non-technical managers ask business questions in plain English and get verified answers, recommendations and a one-page briefing.

Built as a proof of concept for **BUSM2725 AI and Analytics for Business Applications** (RMIT University, Assessment 2, 2026) using the course's Modern Furniture Co. operations simulator data.

![Dashboard](docs/screenshots/dashboard.jpg)

**Live app:** https://modern-furniture-co.ai.studio

## The business problem

Modern Furniture Co. earned $4.99M over two years but kept just $208,536, a 4.2% net margin, and 3 of 8 quarters ran at a loss. The causes sit in its own records, but managers had to wait days for reports.

| Priority | Challenge | Key finding |
|---|---|---|
| 1 | Cost control | Wages are 62% of costs and fixed at ~$365k a quarter while revenue swings $462k–$760k |
| 2 | Sales conversion | 689 of 1,166 quotes lost (59.1%) |
| 3 | Production and delivery | 13.7% of orders late; every late spike came when 14–17 orders were in progress vs a usual 8 |
| 4 | Staffing and skills | Late rate after maker resignations 16.4% vs 3.0% for designers |
| 5 | Reputation | No ratings recorded; no customer ordered twice |

## How it works

**Gemini interprets the question; code calculates every figure.**

1. The user asks a question in plain English
2. Gemini Flash chooses which calculation tool to run and for which dates (keyword fallback if Gemini is unavailable)
3. JavaScript calculates the answer from all 7 data files, so figures are never estimated by the AI
4. The answer shows key figures, a chart, recommendations and how it was calculated
5. The user can explore the filtered dashboard, test a decision in the what-if planner, or export a briefing

For open questions ("How can we improve profit?"), Gemini writes advice using only 26 facts calculated in code, and any sentence containing a figure not in those facts is removed before display.

![What-if planner](docs/screenshots/what-if-planner.jpg)

## Features

- Six KPI cards and seven charts, all filterable by period and product
- AI agent with seven tools: bottleneck, profitability, staffing and skills, demand, costs, what-if scenarios, company advice
- What-if scenario planner (wages, timber, overheads, prices, late penalties)
- Product scorecard
- One-click executive briefing (print / save as PDF)
- Honest refusal when the data can't answer a question
- Data integrity code shown in the footer, so any change to the embedded data is visible

## Data

All seven simulator files are embedded in `index.html` (6,169 records, Jan 2025 – Jan 2027):

| File | Records | Used for |
|---|---|---|
| orders_data | 1,166 | Sales, production hours, delivery, margins |
| financial_ledger | 2,508 | Revenue, wages, timber, overheads |
| hr_events_log | 215 | Resignations |
| hr_roster | 24 | Staff roles and skill |
| design_log | 490 | Designer skill vs late deliveries |
| inventory_log | 600 | Timber consumption |
| customers_data | 1,166 | Repeat customers |

Reconciling orders against ledger payments showed late penalties apply only to the final 50% payment, correcting the penalty cost from $62,236 to **$31,118**.

## Testing

| Test | Result |
|---|---|
| Automated browser tests vs independent Python calculations | 231 of 231 correct |
| Same questions asked three times | 9 of 9 identical |
| Manual Excel spot-check | 460 delivered, 63 late, 689 lost, Sideboard margin $9,556 all matched |
| AI fact-check with invented figures | Removed automatically |
| Peer testing | Feedback led to recommendations on every answer |

## Run it

- **Without AI:** open `index.html` in a browser. The dashboard works fully and the agent answers core questions using keyword matching.
- **With Gemini:** create an app in Google AI Studio (Build mode), paste `index.html`, and add `gemini.example.ts` as `gemini.ts`. AI Studio supplies the API key at runtime. Never commit a real key.

## Tech stack

Google AI Studio · Gemini Flash (Gemini API) · JavaScript · Chart.js · PapaParse

## Limitations

Simulated data; stage hours follow a fixed 20/30/40/10 split; no queue times or customer ratings; some findings rest on small samples; what-if scenarios assume demand is unchanged.

## AI use

Claude (Anthropic) helped draft the code and run the validation; Gemini described the dataset fields and runs inside the agent; Google AI Studio builds and hosts the app. Problem framing, tool evaluation, design direction and verification were my own.

## Author

Muskan Bhardwaj · Master of Business Information Technology, RMIT University
