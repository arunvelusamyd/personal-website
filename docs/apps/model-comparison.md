# AI Model Comparison

*Frontier and open-weight models compared on context, price, benchmarks and risk — and the parts of the picture nobody publishes.*

*Updated August 2026*

---

## How to read this

Two things in these tables are deliberately *not* filled in, and they mean different things:

- **Not published** — the lab has never disclosed the figure. This applies to **every parameter count and training-compute number for every closed model**. No amount of searching will find them.
- **—** — may well be public somewhere, but it did not surface in the research behind this page. Treat it as unverified, not as zero.

Prices are USD per million tokens for standard paid API usage. Anything dated moves fast: two OpenAI tiers were cut on 30 July 2026 and one Gemini rate expires in December, so check vendor docs before committing a budget.

---

## Snapshot — all 21 models

| Model | Context | In / Out per 1M | Headline benchmark | Best for |
|---|---|---|---|---|
| Claude Fable 5 | 1M | $10 / $50 | 95.0% SWE-bench Verified | Hardest coding work |
| Claude Opus 5 | 1M | $5 / $25 | — | Agentic coding, enterprise |
| Claude Sonnet 5 | 1M | $2 / $10 | — | Balanced default |
| Claude Haiku 4.5 | 200K | $1 / $5 | — | Fast, cheap tasks |
| GPT-5.6 Sol | 1.05M | $5 / $30 | 94.1% GPQA Diamond | Scientific reasoning |
| GPT-5.6 Terra | 1.05M | $2.50 / $15 | — | Mid-tier production |
| GPT-5.6 Luna | 1.05M | $1 / $6 | — | High volume |
| GPT-5.5 | — | $5 / $30 | 93.5% GPQA Diamond | Superseded by Sol |
| GPT-5.4 | — | $2.50 / $15 | 75% OSWorld | Computer use |
| GPT-5.4 Nano | — | $0.20 / $1.25 | — | Classification, extraction |
| Gemini 3.1 Pro | 1M | $2 / $12 ¹ | 94.1% GPQA Diamond | Scientific reasoning |
| Gemini 3.7 Flash | 1M | $0.75 / $3.75 ² | — | Grounded search |
| Gemini 3.6 Flash | 1M | $1.50 / $7.50 | — | Cached long context |
| Gemini 3.5 Flash-Lite | 1M | $0.30 / $2.50 | — | Budget + long context |
| DeepSeek V4 Pro | 1M | Weights free | 80.6% SWE-bench Verified | Open frontier reasoning |
| GLM-5.2 | — | Weights free | 81.0 Terminal-Bench | Open agentic coding |
| GLM-5.1 | — | Weights free | Opus-class on coding | Open coding |
| Qwen 3.7 | 128K ³ | Weights free | GPT-5.5-class reasoning | Open reasoning |
| Qwen 3.6 | — | Weights free | — | General chat |
| Llama 4 Maverick | — | Weights free | — | Long-horizon planning |
| Llama 3.3 70B | — | Weights free | — | Single-node self-host |

*¹ Up to 200K context; $4 / $18 above · ² Promotional through Dec 2026, then $1.50 / $7.50 · ³ 256K with YaRN on the 397B-A17B variant*

---

## Anthropic — Claude

| Model | ID | Context / max out | Price in / out | Notes |
|---|---|---|---|---|
| Fable 5 | `claude-fable-5` | 1M / 128K | $10 / $50 | Frontier tier; leads SWE-bench Verified |
| Opus 5 | `claude-opus-5` | 1M / 128K | $5 / $25 | Recommended default; May 2026 cutoff |
| Sonnet 5 | `claude-sonnet-5` | 1M / 128K | $2 / $10 | Introductory rate now permanent |
| Haiku 4.5 | `claude-haiku-4-5` | 200K / 64K | $1 / $5 | Smallest context in the lineup |

**Operational notes**

- **Fable 5 requires 30-day data retention** and is unavailable under zero-data-retention. If your org runs ZDR, every request fails — check retention before debugging payloads.
- Safety classifiers on Fable 5 and Opus 5 can **decline a request**, returning HTTP 200 with a refusal stop reason rather than an error. Code that reads the first content block unconditionally breaks on it.
- Sonnet 5's tokenizer counts roughly **30% more tokens** than Sonnet 4.6 for the same text, so per-token pricing is not the whole cost story when migrating.
- Older aliases — Opus 4.8, 4.7, 4.6 and Sonnet 4.6 — remain active and can be pinned.

---

## OpenAI — GPT

| Model | Status | Context | Price in / out | Notes |
|---|---|---|---|---|
| GPT-5.6 Sol | GA 9 Jul 2026 | 1.05M | $5 / $30 | $0.50 cached input; no price cut |
| GPT-5.6 Terra | GA 9 Jul 2026 | 1.05M | $2.50 / $15 | Cut 20% on 30 Jul |
| GPT-5.6 Luna | GA 9 Jul 2026 | 1.05M | $1 / $6 | Cut 80% on 30 Jul |
| GPT-5.5 | Previous flagship | — | $5 / $30 | Powers ChatGPT Plus |
| GPT-5.4 | Two generations back | — | $2.50 / $15 | Best reported computer use |
| GPT-5.4 Nano | Budget tier | — | $0.20 / $1.25 | Cheapest option on this page |

**Operational notes**

- Luna's **80% cut** is the steepest single reduction here, and it landed three weeks before this page was compiled. Any cost model built before August 2026 is wrong.
- GPT-5.5 is priced identically to the newer Sol while scoring lower on GPQA — there is no cost argument for staying on it.
- GPT-5.4 is on a deprecation clock but still holds the highest reported OSWorld score, so computer-use workloads may have a reason to stay.

---

## Google — Gemini

| Model | Status | Context | Price in / out | Notes |
|---|---|---|---|---|
| Gemini 3.1 Pro | Preview | 1M | $2 / $12 | $4 / $18 above 200K context |
| Gemini 3.7 Flash | Newest speed tier | 1M | $0.75 / $3.75 | Promo ends Dec 2026; native grounding |
| Gemini 3.6 Flash | GA 21 Jul 2026 | 1M | $1.50 / $7.50 | $0.15 cached input — cheapest here |
| Gemini 3.5 Flash-Lite | GA 21 Jul 2026 | 1M | $0.30 / $2.50 | 1M context at budget pricing |

**Operational notes**

- **Every Gemini tier gets a 1M context window**, including Flash-Lite. No other provider offers long context at that price point.
- Gemini 3.1 Pro's input price **doubles above 200K context** — long-context bills are non-linear, which matters most on exactly the workloads you would pick a 1M window for.
- Gemini 3.7 Flash's listed rate is promotional and **doubles in December**. Budget at the post-promo rate.
- Gemini 2.0 Flash and Flash-Lite were shut down on 1 June 2026, and the 1.5 family now returns 404.

---

## Open weight — self-hostable

| Model | Parameters | Context | Benchmark | Serving footprint |
|---|---|---|---|---|
| DeepSeek V4 Pro | 1.6T total / 49B active | 1M | 80.6% SWE-bench Verified | Very high — multi-node |
| GLM-5.2 | — | — | 81.0 Terminal-Bench | High |
| GLM-5.1 | 744B total / 40B active | — | Opus-class on coding | High |
| Qwen 3.7 | 397B sparse MoE | 128K | GPT-5.5-class reasoning | High |
| Qwen 3.6 | — | — | — | Moderate |
| Llama 4 Maverick | 400B total / 17B active | — | — | Moderate |
| Llama 3.3 70B | 70B dense | — | — | Low — single node |

**Operational notes**

- Mixture-of-Experts is now the default architecture for serious open releases. **Active** parameters drive serving cost, not total — Llama 4 Maverick holds 400B weights but activates only 17B, which is what makes it economical.
- GLM-5.1 was **trained entirely on domestic Huawei Ascend silicon**. Relevant if your procurement screens training-hardware provenance.
- Qwen 3.7's 397B figure carries over from its 3.5-generation sibling — confirm against the 3.7 model card before quoting it.
- Weights being free is not the same as cheap. You own the serving infrastructure and the entire safety, abuse and evaluation stack a hosted API otherwise provides.
- Open weights have closed most of the gap for standard tasks. Commercial models still lead on frontier reasoning, multimodal work and safety-critical applications.

---

## Capabilities

Scored against a fixed eight-item checklist: text, image input, context ≥200K, tool calling, structured outputs, extended reasoning, hosted code execution, hosted web search.

| Family | Modalities | Agentic features | Verified against |
|---|---|---|---|
| Claude Fable 5 / Opus 5 / Sonnet 5 | Text, image, PDF | All eight | First-party docs |
| Claude Haiku 4.5 | Text, image, PDF | Six of eight | First-party docs |
| GPT-5.6 family | Multimodal | Vendor-claimed | Not verified here |
| GPT-5.4 Nano | Text-first | Vendor-claimed | Not verified here |
| Gemini 3.x family | Multimodal | Vendor-claimed | Not verified here |
| DeepSeek / GLM / Qwen / Llama | Text (Qwen adds VL variants) | Varies by build | Not verified here |

Only the Anthropic column was checked against first-party documentation while compiling this page. The rest reflect vendor positioning, not an audit.

---

## What nobody publishes

Four of the dimensions people most want to compare are simply not available for closed models:

- **Parameter counts.** Anthropic, OpenAI and Google have never disclosed them for any current model. Only open-weight releases give real numbers.
- **Training compute.** Same — no lab publishes the figure for a current frontier model. The estimates below are third-party.
- **Energy or carbon per query.** No provider in this table publishes it. Any figure you find elsewhere is an estimate built on the same undisclosed compute numbers.
- **Per-model traffic.** Usage is reported per assistant product, never split by model.

Any table that fills these cells with confident numbers for a closed model is guessing.

---

## Training-compute economics

- **1e26 – 1e27 FLOP** is the estimated band for 2026 frontier training runs, with named cost ranges of **$200M – $500M** for the GPT-5 and Gemini Ultra class.
- **The anchors:** GPT-4 trained at roughly 2e25 FLOP in 2023. Claude 3.5 Sonnet sits near 3e25; Gemini 1.5 Ultra closer to 1e26. Everything current is one to two orders of magnitude above GPT-4.
- **Growth is decelerating.** Compute scaled 4–5× per year from 2018 to 2024, and near 10× per year for leading-lab releases. The brake now is power, capital and data — not silicon.
- **The field is widening.** Models above 1e26 FLOP: about 10 by 2026, a projected 80 by 2028, and over 200 by 2030. Frontier capability stops being scarce.

---

## Adoption and web traffic

Measured per assistant product. Similarweb data for May 2026 unless noted.

| Product | Monthly visits | Share of chatbot visits | Monthly active users | Year-over-year |
|---|---|---|---|---|
| ChatGPT | 5.6B | 53.9% ¹ | 1.11B | −25.1 pts share |
| Gemini | 2.9B | 27.9% | 662M | +450% visits |
| Claude | 952.6M | 9.2% ² | 245M | +855% visits |

*¹ A later mid-2026 reading puts this at 46.4%; both are shown rather than averaged · ² 8.2% of consumer visits specifically*

- **ChatGPT held 76–79% through mid-2025**, then lost 25 points of share in nine months, crossing below 50% for the first time in June 2026.
- **Gemini is the steadiest climber**, roughly doubling share every two quarters since mid-2025 — distribution through existing Google surfaces is the mechanism.
- **Claude made the sharpest recent move**, from 3.4% in February to 9.2% in May 2026, and wins roughly **70% of new enterprise deals** contested against OpenAI. Consumer share understates its commercial position.

---

## Choosing

| Job | Pick |
|---|---|
| Agentic coding | **Claude Opus 5** — near-frontier at half Fable 5's price |
| Absolute hardest coding | **Claude Fable 5** — 95.0% SWE-bench Verified, at 2× the cost |
| Scientific reasoning | **Gemini 3.1 Pro** or **GPT-5.6 Sol** — tied at 94.1% GPQA |
| High-volume classification | **GPT-5.4 Nano** at $0.20 / $1.25 |
| Long-context RAG | **Gemini 3.6 Flash** — $0.15 cached input |
| Budget work needing 1M context | **Gemini 3.5 Flash-Lite** |
| Computer use | **GPT-5.4** — highest reported OSWorld at 75% |
| Self-hosted, single node | **Llama 3.3 70B** — deepest tooling ecosystem |
| Self-hosted, frontier-adjacent | **GLM-5.2** or **DeepSeek V4 Pro** |

---

## Caveats

- **The benchmarks are not a controlled head-to-head.** Scores come from different reporting dates, harnesses and vendors. MMLU is saturated above 88% across the frontier and no longer separates anything.
- **Prices moved twice in July 2026.** Treat every figure here as a starting point for your own check, not a quote.
- **Serving footprints are estimates**, inferred from active and total parameter counts rather than measured. Real memory depends on quantisation, batch size and context length.
- **Preview status matters.** Gemini 3.1 Pro is still preview, so it carries no stability guarantee.

---

## Related

For the underlying taxonomy — how machine learning, deep learning and generative AI models relate to each other — see [AI Models at a Glance](../../ai-models/).

---

## Sources

**Anthropic**

- [Pricing — Claude Platform Docs](https://platform.claude.com/docs/en/about-claude/pricing)
- [Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)
- [Claude API Pricing, August 2026 — BenchLM](https://benchlm.ai/anthropic/api-pricing)

**OpenAI**

- [OpenAI API Pricing 2026 — DevTk.AI](https://devtk.ai/en/blog/openai-api-pricing-guide-2026/)
- [OpenAI API Pricing 2026 — Morph](https://www.morphllm.com/openai-api-pricing)

**Google**

- [Gemini Developer API pricing — Google AI for Developers](https://ai.google.dev/gemini-api/docs/pricing)
- [Google Gemini API Pricing 2026 — DevTk.AI](https://devtk.ai/en/blog/gemini-api-pricing-guide-2026/)

**Benchmarks**

- [LLM Leaderboard, August 2026 — BenchLM](https://benchlm.ai/)
- [GPQA Leaderboard 2026 — PricePerToken](https://pricepertoken.com/leaderboards/benchmark/gpqa)
- [SWE-bench Pro Leaderboard 2026 — Morph](https://www.morphllm.com/swe-bench-pro)

**Open weights**

- [DeepSeek V4 Pro — Modular](https://www.modular.com/models/deepseek-v4-pro)
- [Kimi K3 vs DeepSeek V4 Pro vs GLM-5.2 — DeepInfra](https://deepinfra.com/blog/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2)
- [Best Open-Source LLMs 2026 — BuildFastWithAI](https://www.buildfastwithai.com/blogs/collection/open-source-llms)

**Traffic and adoption**

- [AI Search Stats 2026 — Similarweb](https://www.similarweb.com/blog/marketing/geo/gen-ai-stats/)
- [ChatGPT's market share slips below 50% — TechCrunch](https://techcrunch.com/2026/06/16/chatgpts-market-share-slips-below-50-for-first-time/)
- [AI Chatbot Market Fractures — Enterprise DNA](https://enterprisedna.co/resources/news/ai-chatbot-market-share-fracturing-gemini-claude-2026/)

**Training compute**

- [Frontier open models may surpass 1e26 FLOP — Epoch AI](https://epoch.ai/data-insights/open-models-threshold)
- [Frontier AI training cost trajectory 2026 — Deluair](https://deluair.com/consultancy/insights/frontier-ai-training-cost-2026)
- [Trends in Frontier AI Model Count — GovAI](https://www.governance.ai/research-paper/trends-in-frontier-ai-model-count-a-forecast-to-2028)
