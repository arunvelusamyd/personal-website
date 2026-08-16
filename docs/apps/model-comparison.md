# AI Model Comparison

*Frontier and open-weight models compared on context, price, scale, benchmarks and risk.*

*Updated August 2026*

---

<div class="table-responsive" markdown="1">

| Model | Provider | Context / max out | Price in / out per 1M | Parameters | Training compute | Benchmark | Capabilities | Resource | Operational risk | Provider share · MAU |
|---|---|---|---|---|---|---|---|---|---|---|
| Claude Fable 5 | Anthropic | 1M / 128K | $10 / $50 | Not published | Not published | 95.0% SWE-bench V · **SOTA** ⁸ | 8 / 8 | API only | 30-day retention required; refusals | 9.2% · 245M |
| Claude Opus 5 | Anthropic | 1M / 128K | $5 / $25 | Not published | Not published | — | 8 / 8 | API only | Refusals return HTTP 200 | 9.2% · 245M |
| Claude Sonnet 5 | Anthropic | 1M / 128K | $2 / $10 | Not published | Not published | — | 8 / 8 | API only | Tokenizer counts ~30% more | 9.2% · 245M |
| Claude Haiku 4.5 | Anthropic | 200K / 64K | $1 / $5 | Not published | Not published | — | 6 / 8 | API only | 200K context ceiling | 9.2% · 245M |
| GPT-5.6 Sol | OpenAI | 1.05M | $5 / $30 ¹ | Not published | Not published | 94.1% GPQA · **SOTA** (tied) | Multimodal | API only | No cut while tiers below fell | 53.9% ² · 1.11B |
| GPT-5.6 Terra | OpenAI | 1.05M | $2.50 / $15 | Not published | Not published | — | Multimodal | API only | Cut 20% on 30 Jul 2026 | 53.9% ² · 1.11B |
| GPT-5.6 Luna | OpenAI | 1.05M | $1 / $6 | Not published | Not published | — | Multimodal | API only | Cut 80% on 30 Jul 2026 | 53.9% ² · 1.11B |
| GPT-5.5 | OpenAI | — | $5 / $30 | Not published | Not published | 93.5% GPQA | Multimodal | API only | Sol's price, lower score | 53.9% ² · 1.11B |
| GPT-5.4 | OpenAI | — | $2.50 / $15 | Not published | Not published | 75.0% OSWorld-V ⁸ | Multimodal | API only | Deprecation clock | 53.9% ² · 1.11B |
| GPT-5.4 Nano | OpenAI | — | $0.20 / $1.25 | Not published | Not published | — | Text-first | API only | Low quality ceiling | 53.9% ² · 1.11B |
| Gemini 3.1 Pro | Google | 1M | $2 / $12 ³ | Not published | Not published | 94.1% GPQA · **SOTA** (tied) | Multimodal | API only | Preview; price doubles >200K | 27.9% · 662M |
| Gemini 3.7 Flash | Google | 1M | $0.75 / $3.75 ⁴ | Not published | Not published | — | Multimodal | API only | Promo rate doubles Dec 2026 | 27.9% · 662M |
| Gemini 3.6 Flash | Google | 1M | $1.50 / $7.50 ⁵ | Not published | Not published | — | Multimodal | API only | None material | 27.9% · 662M |
| Gemini 3.5 Flash-Lite | Google | 1M | $0.30 / $2.50 | Not published | Not published | — | Multimodal | API only | None material | 27.9% · 662M |
| DeepSeek V4 Pro | Open weight | 1M | Weights free | 1.6T / 49B active | Not published | 80.6% SWE-bench V ⁸ | Text + reasoning | Very high | You own serving + safety stack | — |
| GLM-5.2 | Open weight | — | Weights free | — | Not published | 81.0 Terminal-Bench ⁸ | Text + code | High | Check licence terms | — |
| GLM-5.1 | Open weight | — | Weights free | 744B / 40B active | Not published | Opus-class coding | Text + code | High | Trained on Huawei Ascend | — |
| Qwen 3.7 | Open weight | 128K ⁶ | Weights free | 397B sparse MoE ⁷ | Not published | GPT-5.5-class reasoning | Text · VL variants | High | Param figure from 3.5 sibling | — |
| Qwen 3.6 | Open weight | — | Weights free | — | Not published | — | Text | Moderate | Not a frontier contender | — |
| Llama 4 Maverick | Open weight | — | Weights free | 400B / 17B active | Not published | — | Text | Moderate | None material | — |
| Llama 3.3 70B | Open weight | — | Weights free | 70B dense | Not published | — | Text | Low | Older generation | — |

</div>

***SOTA** = the highest value **in this table** for that specific benchmark as of the update date, not an absolute claim; "open SOTA" leads among open-weight models only. Scores come from different dates and harnesses, so they are not a controlled head-to-head · "Not published" = the lab has never disclosed it, true of every parameter count and training-compute figure for every closed model · "—" = did not surface in the sources below · Capabilities scored against eight items: text, image input, ≥200K context, tool calling, structured outputs, extended reasoning, hosted code execution, hosted web search; only the Anthropic column was checked against first-party docs · Share and MAU are per provider, not per model (Similarweb, May 2026) · ¹ $0.50 cached input · ² a later mid-2026 reading puts this at 46.4% · ³ up to 200K context; $4 / $18 above · ⁴ promotional through Dec 2026, then $1.50 / $7.50 · ⁵ $0.15 cached input · ⁶ 256K with YaRN on the 397B-A17B variant · ⁷ figure carried over from the 3.5 generation · ⁸ contested or partial — see the per-model benchmark table below · Frontier 2026 training runs are estimated at 1e26–1e27 FLOP and $200M–$500M per run; GPT-4 was roughly 2e25 in 2023*

---

## Benchmark scores by model

<div class="table-responsive" markdown="1">

| Model | Licence | TB 2.0 | TB 2.1 | OSWorld-V | ARC-AGI-2 | HLE | GPQA | SWE-bench V |
|---|---|---|---|---|---|---|---|---|
| Claude Mythos 5 | Closed | **88.0%** | — | **85.0%** | — | **64.5%** | — | — |
| Claude Fable 5 | Closed | 84.3% | — | **85.0%** | — | **64.5%** | — | 95.0% ⁹ |
| Claude Opus 5 | Closed | — | 89.1% | — | — | — | — | **97.00%** |
| Claude Sonnet 5 | Closed | 80.4% | — | 81.2% | — | 57.4% | — | — |
| Claude Opus 4.8 | Closed | 74.6% | — | 83.4% | — | 57.9% | — | — |
| Claude Opus 4.7 (Adaptive) | Closed | — | — | 78.0% | 75.8% | 54.7% | — | — |
| Claude Opus 4.6 | Closed | — | — | — | — | 53.0% | 91.3% | — |
| GPT-5.6 Sol (xhigh) | Closed | — | **89.5%** | — | — | — | **94.1%** | — |
| GPT-5.5 | Closed | 82.0% | — | 78.7% | **85.0%** | — | 93.5% | — |
| GPT-5.5 Pro | Closed | — | — | — | — | 57.2% | — | — |
| GPT-5.4 | Closed | — | — | 75.0% | — | — | — | — |
| GPT-5.4 Pro | Closed | — | — | — | 83.3% | 58.7% | — | — |
| GPT-5.2 | Closed | — | — | — | 52.9% | — | — | — |
| Gemini 3.1 Pro | Closed | — | — | — | 77.1% | — | **94.1%** | — |
| Gemini 3.7 Flash | Closed | — | 85.8% | — | — | — | — | — |
| Gemini 3.5 Flash | Closed | 76.2% | — | 78.4% | 72.1% | — | — | — |
| Gemini 3 Pro Deep Think | Closed | — | — | — | 45.1% | — | — | — |
| Gemini 3 Pro | Closed | — | — | — | 31.1% | — | — | — |
| Grok 4.6 (high) | Closed | — | 88.4% | — | — | — | — | — |
| Grok 4.20 | Closed | — | — | — | 53.3% | — | — | — |
| Sakana Fugu-Ultra | Closed | 82.1% | — | — | — | — | — | — |
| Sakana Fugu | Closed | 80.2% | — | — | — | — | — | — |
| Holo3-122B-A10B | Closed | — | — | 78.8% | — | — | — | — |
| Muse Spark | Closed | — | — | — | 42.5% | — | — | — |
| DeepSeek V4 Pro 0813 | Open | — | 87.9% | — | — | — | — | 96.40% ⁹ |
| Qwen3.8 Max | Open | — | 86.6% | — | — | — | — | — |
| GLM-5.2 | Open | 81.0% | — | — | — | 54.7% | — | — |
| GLM-5.1 | Open | — | — | — | — | 52.3% | — | — |
| Holo3-35B-A3B | Open | — | — | 82.6% | — | — | — | — |
| Ornith-1.0-397B | Open | 77.5% | — | — | — | — | — | — |
| Kimi K3 | Open | — | — | — | — | — | — | 93.40% |

</div>

***Bold** = highest retrieved score in that column · "—" = the model does not appear in the slice of that leaderboard retrieved here, which is **not** a zero and not an absence of capability — most of these leaderboards publish only a top-10 view, and the SWE-bench Verified column is the thinnest of all — its full ranking was behind a bot check, so only the widely-reported top scores are shown · **TB 2.0 and TB 2.1 are different benchmarks**, which is why GLM-5.2 leads open weights on one and DeepSeek V4 Pro 0813 leads on the other · ⁹ SWE-bench Verified is contested: a second source puts Claude Fable 5 first at 95.0% and DeepSeek V4 Pro at 80.6%, a 16-point spread most likely explained by the dated `0813` snapshot versus the base model · Scores are configuration-dependent — effort setting and model snapshot are part of the result, so they are named in the Model column where the source gave them · MMLU is omitted: saturated above 88% across the frontier, it no longer differentiates · BenchLM's weighted composite category indices are also omitted — they are not raw scores, and its published top-3 lists are internally inconsistent · Sources: [awesome-llm-bench](https://github.com/leoncuhk/awesome-llm-bench) mirror of [BenchLM](https://benchlm.ai/), synced 16 Aug 2026 (TB 2.0, OSWorld-V, ARC-AGI-2 and HLE tables updated 7 Jul 2026); [Artificial Analysis](https://artificialanalysis.ai/evaluations/terminalbench-v2-1) for TB 2.1, 14 Aug 2026; [llm-stats](https://llm-stats.com/benchmarks/swe-bench-verified) for SWE-bench Verified*

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
- [SWE-bench Verified Leaderboard — llm-stats](https://llm-stats.com/benchmarks/swe-bench-verified)
- [Terminal-Bench v2.1 Leaderboard — Artificial Analysis](https://artificialanalysis.ai/evaluations/terminalbench-v2-1)
- [awesome-llm-bench — daily-synced mirror of BenchLM leaderboards](https://github.com/leoncuhk/awesome-llm-bench)

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
