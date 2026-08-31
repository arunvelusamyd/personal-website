# Payment Systems Across Singapore, Malaysia, India & Hong Kong: A Plain-English Reference Guide

*Reference guide · Added August 2026*

## TL;DR
- **Every one of these four markets has converged on the same three-tier plumbing** — a real-time gross settlement (RTGS) system for big-value payments, a batch/ACH system for bulk low-value payments, and a modern 24/7 instant retail rail — plus a domestic card scheme, a national QR standard, and a direct-debit mechanism; the differences are mostly in naming, ownership, and a few distinctive local features.
- **The single biggest structural trend is account-to-account (A2A) instant rails eating card volume in person-to-merchant (P2M) payments**, because A2A rails (PayNow, DuitNow, UPI, FPS) cost merchants near-zero versus 1.5–3.5% card MDR, and QR codes made A2A as easy to accept as cash.
- **Cross-border linking is happening fast but unevenly**: PayNow–UPI (live Feb 2023), PayNow–DuitNow (live Nov 2023), and Hong Kong–China Payment Connect (live 22 June 2025) are all live P2P links; the multilateral Project Nexus (headquartered in Singapore) is being built by a new entity, Nexus Global Payments, for a later go-live — announced but not yet live.

---

## How to read this guide: your three axes

Your framework is the right way to classify any payment. The key insight is that the three axes are **independent layers that stack on a single transaction**:

- **Axis 1 (Parties)** = the *business relationship*. Who is paying whom: P2P (person-to-person), P2M (person-to-merchant), B2B, B2C, C2B, and the government variants G2C (e.g. welfare payouts), C2G (taxes), G2B, B2G. This is about economic roles, not technology.
- **Axis 2 (Rail type)** = the *network* that physically carries the money: A2A (bank account to bank account), Card rails (Visa/Mastercard/domestic schemes), Wallet/SVF (stored-value like Octopus, Touch 'n Go, GrabPay), MTO (money-transfer operators like Wise), messaging-only (SWIFT, which moves *instructions*, not money), and CBDC (central-bank digital money).
- **Axis 3 (Settlement model)** = *how the banks square up* behind the scenes: RTGS (each payment settled individually, in real time, in central-bank money), ACH/batch/DNS (payments bundled and netted, settled later — "deferred net settlement"), and Instant retail rails (customer gets money in seconds, but banks settle the net later — a hybrid).

**Why "A2A" is a rail-type but "P2P/P2M" are party-types, and how they stack:** Imagine you PayNow S$20 to a hawker. Axis 1 says this is **P2M** (you, a person, paying a merchant). Axis 2 says the rail is **A2A** (money moves bank account → bank account via FAST). Axis 3 says settlement is **instant retail** (hawker sees it in seconds; the banks net off and settle across MEPS+ later). The same P2M payment, if you tapped a Visa card instead, would keep Axis 1 = P2M but switch Axis 2 to **Card rails** and Axis 3 to **deferred settlement** through the card scheme. So one payment always carries one value from each axis — the party relationship is fixed by *who's transacting*, while the rail and settlement are engineering choices that can change even for the identical economic transaction.

---

## Part 1 — Core concepts, explained simply

### ACH vs RTGS vs Instant payments

Think of three ways banks can move money between each other:

**RTGS (Real-Time Gross Settlement)** — Every payment is settled **one at a time** ("gross," meaning no bundling) and **immediately**, moving real central-bank money from the paying bank's account at the central bank to the receiving bank's account. Because it's central-bank money and happens instantly, the payment is **final and irrevocable** the moment it settles — no take-backs. This is expensive (each payment consumes liquidity in real time) so it's reserved for **high-value and time-critical** payments: interbank transfers, big corporate settlements, securities settlement. Examples: MEPS+ (SG), RENTAS (MY), RTGS (IN), CHATS (HK).

**ACH / Batch / DNS (Deferred Net Settlement)** — Payments are **collected into batches** during the day and **netted** — if Bank A owes Bank B $100m and B owes A $90m, only the **net $10m** actually changes hands at a scheduled settlement time. This is cheap and efficient for **high-volume, low-value, non-urgent** payments: salaries, bill collections, direct debits. The trade-off is time (funds arrive hours or a day later) and **settlement risk** (between the moment of the payment and the netted settlement, a bank could fail — see below). Examples: GIRO/IBG (SG), IBG (MY), NACH/ECS (IN), ECG autopay (HK).

**Instant / real-time retail rails** — The clever hybrid built in the last decade. The **customer experience is instant** (money available in seconds, 24/7/365), but banks don't do a full RTGS settlement on every tiny payment — instead they track obligations and **settle the net later** across the RTGS system (often several times a day or into a prefunded account). This gives consumers instant speed with the system efficiency of netting. Examples: FAST/PayNow (SG), RPP/DuitNow (MY), IMPS/UPI (IN), FPS (HK).

**Cost and value tiers (rule of thumb):** RTGS = high cost per item, unlimited/very high value, low volume. ACH = very low cost, low-to-mid value, high volume. Instant = low cost, low-to-mid value (retail limits apply), very high volume.

**Reversibility/finality:** RTGS payments are final and irrevocable on settlement. Instant "push" payments are also effectively irrevocable once sent (which is why scams are a problem — you can't claw the money back). ACH direct debits (pull) *can* be disputed and reversed within a window.

### Push (credit transfer) vs Pull (direct debit)

- **Push = credit transfer.** *You* instruct your bank to send money out. You are in control; you initiate. PayNow, FAST, UPI send, NEFT, RTGS are all push. Risk model: the payer must get the details right, and once pushed it's gone — good for the payee (certain funds), risky for the payer (mistakes/scams hard to reverse).
- **Pull = direct debit.** You give a *biller* a standing **mandate** (permission) to reach into your account and take money — your electricity company, your gym. GIRO/DDA (SG), DuitNow AutoDebit (MY), NACH debit/ECS (IN), autopay/ECG (HK) are pull. Risk model flips: the payee initiates, so there must be a mandate, and consumers get **dispute and reversal rights** if the biller takes the wrong amount. This is why direct debit has consumer-protection rules that push payments don't.

Modern instant rails now add a "**request to pay**" flavour — DuitNow Request, UPI collect request, PayNow's request feature — where the payee *asks* and the payer *approves*. This looks like a pull to the user but is technically a push the payer authorises, combining the convenience of pull with the safety of push.

### Clearing vs settlement vs authorization

Three distinct steps that get combined or separated depending on the rail:

- **Authorization** = "is this payment good?" — checking the payer has funds/credit and approving the transaction. On cards, this is a real-time yes/no at the moment you tap.
- **Clearing** = exchanging the transaction details between the two banks and working out who owes whom.
- **Settlement** = the actual movement of money to discharge the obligation.

On **RTGS**, authorization + clearing + settlement are effectively **one instantaneous combined event**. On **card rails**, they are deliberately **separated in time**: you get authorization in a second at the till (so you can walk out with your goods), but clearing and settlement happen hours-to-days later in batches — this separation is *why* a card "pending" charge can differ from the final amount, and why refunds take days. On **instant A2A rails**, authorization and clearing are instant (customer sees funds) but settlement between banks is deferred and netted.

### Gross vs net settlement, netting, settlement risk, liquidity

- **Gross settlement** = each payment settled individually and in full. Safe (no build-up of exposure) but **liquidity-hungry** — a bank needs enough cash at the central bank to cover every payment as it goes.
- **Net settlement (multilateral netting)** = many payments among many banks are offset so only net positions settle. **Liquidity-efficient** (a fraction of the cash is needed) but creates **settlement risk**: between netting and final settlement, if one bank fails, others are exposed to the unsettled net amounts. Central banks manage this with collateral, prefunding, caps, and loss-sharing rules.
- The **liquidity vs risk trade-off** is the core tension in payments design: RTGS minimises risk but demands liquidity; DNS minimises liquidity need but concentrates risk. Instant rails try to get the best of both, often via **prefunded net positions** so the operator is never exposed.

---

## Part 2 — Every payment system, market by market

For each system: **what it is · operator · rail type · settlement · push/pull · limits · parties · why it exists · name origin.**

### SINGAPORE

**Regulator:** Monetary Authority of Singapore (MAS) — Singapore's central bank and integrated financial regulator. **Key operators:** Banking Computer Services (BCS, a subsidiary of NETS) operates FAST and PayNow; the Association of Banks in Singapore (ABS) owns the PayNow and FAST schemes; NETS is owned by a consortium of local banks.

**MEPS+ (MAS Electronic Payment System Plus)**
- *What/rail/settlement:* Singapore's **RTGS** system and the backbone of the whole payment system — A2A, gross, real-time, final. Also settles Singapore Government Securities (SGS) on a delivery-versus-payment basis.
- *Operator:* MAS. *Push/pull:* push. *Value:* high-value/wholesale, no upper limit. *Parties:* interbank, B2B, government.
- *Why it exists:* to settle large-value and time-critical interbank payments in central-bank money with zero settlement risk, and to be the plumbing through which MAS conducts monetary policy. Banks hold current accounts (with reserve and RTGS sub-accounts) at MAS.
- *Name:* "MAS Electronic Payment System" — the "Plus" denotes the upgraded second-generation system that replaced the original MEPS. MAS has an ongoing programme to modernise MEPS+ (efficiency, ISO 20022, cross-border readiness).

**FAST (Fast And Secure Transfers)**
- *What/rail/settlement:* the **instant retail** A2A rail — 24/7, near-instant credit transfers between participating banks and eligible non-bank financial institutions. Settlement is deferred/netted back to MEPS+.
- *Operator:* BCS; scheme owned by ABS. *Push/pull:* push. *Launched:* 2014. *Value:* public transaction limit up to **S$200,000** per transfer (bank-set daily limits apply). *Parties:* P2P, P2M, B2B, B2C.
- *Why it exists:* before FAST, interbank transfers took a day (via GIRO batch); FAST gave Singapore round-the-clock instant transfers to match the digital economy.
- *Name:* literally "Fast And Secure Transfers."

**PayNow**
- *What/rail/settlement:* not a separate rail — it's a **proxy addressing layer sitting on top of FAST**. It lets you send to a mobile number, NRIC/FIN, UEN (business ID), or VPA instead of an account number. Underlying movement is FAST (instant A2A).
- *Operator:* system operated by BCS, scheme owned by ABS, governed by an ABS PayNow Steering Committee. *Launched:* 10 July 2017 (banks); 8 February 2021 (non-bank FIs). *Push/pull:* push. *Value:* up to S$200,000 per transfer, subject to bank daily limits. *Parties:* P2P, P2M (incl. **PayNow Corporate** for businesses via UEN).
- *Proxy types:* **mobile number, NRIC/FIN** (national ID), **UEN** (Unique Entity Number, for companies), and **VPA** (Virtual Payment Address, used by non-bank e-wallets, e.g. `+651234567#XNAP`).
- *Adoption:* by end-2022, 7.6 million registered proxies, 311 million transactions worth S$123 billion; over 300,000 businesses registered. (From 6 June 2024, PayNow shows recipient names with masked letters to fight impersonation scams, replacing nicknames.)
- *Why it exists:* to make instant transfers as easy as knowing someone's phone number, and to give merchants a near-free alternative to cards.
- *Name:* marketing name — "pay now," i.e. instantly.

**GIRO / IBG (Interbank GIRO)**
- *What/rail/settlement:* the **batch/ACH** rail — bulk low-value credit and debit transfers, netted and settled the same or next day. *Rail:* A2A. *Settlement:* deferred net.
- *Operator:* BCS. *Push/pull:* both — GIRO credit (push, e.g. salaries) and GIRO debit (pull, e.g. bill collection under a DDA mandate). *Parties:* B2C, C2B, B2B, G2C.
- *Why it exists:* the workhorse for recurring bulk payments (salaries, CPF, utility bills, insurance premiums) where cost matters more than speed.
- *Name:* "GIRO" comes from the European giro tradition (from Italian/Greek for "circle/circulation" of money); IBG = Interbank GIRO.

**eGIRO (electronic GIRO)**
- *What:* a **digital, automated version of GIRO mandate setup**. Traditionally, setting up a GIRO arrangement meant paper forms and weeks of waiting; eGIRO lets customers set up direct-debit mandates online/in-app in near-real-time across banks and billers.
- *Why it exists:* to kill the paper-form friction in onboarding direct debits. *Name:* "electronic GIRO."

**Direct Debit Authorisation (DDA)**
- *What:* the **mandate** you give a biller to pull funds from your account via GIRO. Pull model, with consumer dispute rights. Parties: C2B/B2B recurring.

**CTS (Cheque Truncation System)**
- *What:* clears **cheques electronically** by transmitting a cheque's image and data rather than physically moving the paper. *Operator:* BCS. *Settlement:* batch/net.
- *Why it exists:* to speed up and cut the cost of cheque clearing (from days to next-day). Cheque usage is declining sharply; Singapore has announced plans to phase out corporate cheques.
- *Name:* "truncation" = stopping the physical cheque's journey and replacing it with a digital image.

**NETS (Network for Electronic Transfers)**
- *What:* Singapore's **domestic card and payments scheme**, owned by a consortium of local banks (DBS, OCBC, UOB). Multiple products:
  - **NETS EFTPOS / NETS Debit** — the domestic debit card scheme; when you tap your bank ATM card at a shop, it can route over NETS rather than Visa/Mastercard, at lower cost to merchants. (EFTPOS = Electronic Funds Transfer at Point Of Sale.)
  - **NETS QR** — QR-based acceptance (part of SGQR).
  - **NETS FlashPay** — a **stored-value (SVF)** contactless card (CEPAS standard) for transit and small retail; max load S$500.
  - **NETS Prepaid** — an account-based prepaid card (launched Nov 2022) for tourists without a local bank account.
- *Why it exists:* domestic card sovereignty and low-cost local card acceptance (see Part 3 on why countries build domestic schemes).
- *Name:* "Network for Electronic Transfers."

**eNETS**
- *What:* the **online payment gateway** version of NETS — lets you pay from your bank account for e-commerce and government (via internet banking debit). Rail: A2A via bank. Parties: C2B/C2G.

**SGQR and SGQR+**
- *What:* **SGQR** is Singapore's single unified QR standard (launched 2018) — one QR label at the merchant that many schemes/wallets can read (PayNow, NETS, GrabPay, and international wallets), built on the EMVCo QR standard. **SGQR+** is the upgraded next step letting a merchant sign up with **one acquirer** and accept many more payment schemes through a single QR, improving interoperability.
- *Why it exists:* to end "QR clutter" (merchants displaying a dozen different QR stickers) with one standard code. *Name:* "Singapore Quick Response."

**EZ-Link & SimplyGo**
- *What:* **EZ-Link** is the transit stored-value card (CEPAS). **SimplyGo** is the newer **account-based ticketing** system (launched 2019) that also lets contactless bank cards be used directly for transit fares. In 2024, LTA reversed a plan to retire legacy EZ-Link/NETS FlashPay cards after public pushback — the old card-based system now runs in parallel with SimplyGo.
- *Why they exist:* fast, offline-capable fare payment (millions of taps a day need sub-second speed) — and SimplyGo migrates transit onto open bank cards.

**MAS innovation projects:**
- **Project Ubin (2016–2020):** a five-phase MAS/industry experiment using blockchain/DLT for clearing and settlement (wholesale). It proved tokenised SGD interbank settlement, PvP and DvP were feasible, and directly spawned **Partior**.
- **Partior:** a live blockchain-based cross-border clearing-and-settlement network, a joint venture of DBS, J.P. Morgan, Standard Chartered and Temasek, born out of Ubin — settles cross-border payments in commercial-bank money atomically.
- **Project Orchid:** MAS's exploration of a **retail CBDC** and, more importantly, **"Purpose Bound Money" (PBM)** — programmable digital SGD where conditions (e.g. escrow, vouchers, rewards) are encoded. MAS published the Orchid Blueprint; trials involved Grab, UOB, Amazon, DBS, HSBC and others. MAS has said retail CBDC is not urgent for Singapore but continues exploring; it is also developing wholesale CBDC for interbank settlement.
- **Global Layer One (GL1):** an MAS-led initiative to build an open, permissioned, shared DLT network for tokenised financial assets used by regulated institutions — a "foundational layer" for tokenisation with major global banks participating.

### MALAYSIA

**Regulator:** Bank Negara Malaysia (BNM). **Operator:** **PayNet (Payments Network Malaysia Sdn Bhd)** — the national payments umbrella, formed 1 August 2017 from the merger of **MEPS (Malaysian Electronic Payment System)** and **MyClear (Malaysian Electronic Clearing Corporation)**. BNM is PayNet's single largest shareholder, alongside 11 Malaysian financial institutions (Maybank, CIMB, Public Bank, RHB, etc.). PayNet is not-for-dividend — surplus is reinvested. PayNet reported 8.44 billion digital payment transactions in 2025.

**RENTAS (Real-time Electronic Transfer of Funds and Securities)**
- *What/rail/settlement:* Malaysia's **RTGS** system (introduced 1999) — high-value A2A gross real-time settlement, plus scripless securities settlement (DvP). *Operator:* PayNet (under BNM). *Push/pull:* push. *Parties:* interbank, B2B, government.
- *Why it exists:* same as any RTGS — final settlement of large-value/time-critical payments in central-bank money. BNM has introduced **RENTAS+** to enable 24/7 interbank settlement and to settle DuitNow flows in real time.
- *Name:* "Real-time Electronic Transfer of Funds and Securities."

**RPP (Real-time Retail Payments Platform)**
- *What/rail/settlement:* the modern **instant retail** platform (built by ACI, launched 2018) that hosts DuitNow and interoperable QR. Replaced the older ATM-switch-based "Instant Transfer." *Operator:* PayNet. *Settlement:* deferred net into RENTAS.
- *Why it exists:* BNM/PayNet wanted an open, agile, ISO 20022-based real-time platform to catalyse innovation beyond the legacy Instant Transfer system.
- *Name:* descriptive — "Real-time Retail Payments Platform."

**DuitNow Transfer**
- *What:* the **instant A2A transfer** service on RPP — send to a **DuitNow ID** (mobile number or NRIC/business registration number) or account number, instantly, 24/7. *Push.* Parties: P2P, P2M, B2B, B2C.
- *Why it exists:* Malaysia's answer to PayNow/UPI — instant, proxy-addressed, low-cost transfers.
- *Name:* **"Duit" is the Malay word for "money"** — so "DuitNow" = "money now." The whole DuitNow family shares this branding.

**DuitNow QR**
- *What:* Malaysia's **national QR standard** (EMVCo-based) — one interoperable QR that accepts payment from any participating bank app or e-wallet (Touch 'n Go, GrabPay, Boost, etc.). *Operator:* PayNet. Parties: P2M mostly.
- *Why it exists:* unify fragmented wallet QRs into one national standard.

**DuitNow AutoDebit**
- *What:* the modern **direct-debit (pull)** service on RPP — recurring collections with an electronic mandate, replacing paper-based direct debit. Parties: C2B/B2B recurring.
- *Why it exists:* digital, instant-setup direct debits for subscriptions, loans, insurance.

**DuitNow Request (Request to Pay)**
- *What:* payee sends a **payment request**; payer approves in-app. Technically a payer-authorised push. Parties: P2P, P2M, B2B.
- *Why it exists:* safe "pull-like" collection without giving away debit mandates.

**IBG (Interbank GIRO)**
- *What/rail/settlement:* Malaysia's **batch/ACH** credit-transfer system across 42 participating banks — low-cost, deferred net settlement, funds typically same/next day. *Operator:* PayNet. Parties: B2C, B2B, G2C.
- *Why it exists:* cheap bulk payments (salaries, bulk disbursements) where speed is secondary.

**FPX (Financial Process Exchange)**
- *What:* a **direct-from-bank online payment gateway** — during e-commerce/government checkout, you're redirected to your internet banking to authorise a real-time debit. Rail: A2A. Parties: C2B, C2G, B2B.
- *Why it exists:* enable trusted, real-time online bank payments (huge for e-commerce and government portals where card penetration was historically lower).
- *Name:* "Financial Process Exchange."

**JomPAY**
- *What:* the **national bill-payment scheme** — pay any registered biller from your banking app using a "Biller Code." Rail: A2A. Parties: C2B.
- *Why it exists:* a single standard for bill payments across all banks. *Name:* "Jom" is Malay colloquial for "let's go" — "JomPAY" = "let's pay."

**MyDebit**
- *What:* Malaysia's **domestic debit card scheme** — POS payments routed over the national network rather than international schemes, at lower cost. *Operator:* PayNet. Parties: P2M.
- *Why it exists:* domestic card sovereignty and low-cost debit. *Name:* "My" = Malaysia (also the country code .my) + debit.

**eSPICK (Electronic Cheque Clearing System)**
- *What:* Malaysia's **cheque truncation** system — electronic image-based cheque clearing. *Operator:* PayNet. *Settlement:* batch/net.
- *Why it exists:* speed up and cut costs of cheque clearing as cheque volumes decline.
- *Name:* electronic version of SPICK (the earlier cheque-clearing system).

**MEPS IBFT and the MEPS ATM network**
- *What:* **MEPS** was the legacy card/ATM switch (now folded into PayNet). **IBFT (Interbank Funds Transfer)** was the earlier instant ATM/online transfer service (the "Instant Transfer" that RPP/DuitNow replaced). The **shared ATM network** (10,000+ ATMs) still lets customers of participating banks withdraw across banks.
- *Name:* MEPS = Malaysian Electronic Payment System; IBFT = Interbank Funds Transfer.

**E-wallets:** **Touch 'n Go / TNG eWallet** (the dominant wallet, originally the transit card; TNG Digital is a JV with Ant Group), **Boost** (Axiata), **GrabPay MY** — all stored-value facilities (SVF) that interoperate via DuitNow QR. Parties: P2M, P2P.

### INDIA

**Regulators/operators:** **RBI (Reserve Bank of India)** operates the wholesale/large-value systems (RTGS, NEFT) and is the ultimate regulator. **NPCI (National Payments Corporation of India)** — a not-for-profit "umbrella organisation for retail payments," set up in 2008 by RBI and the Indian Banks' Association under the Payment and Settlement Systems Act 2007, owned by a consortium of banks — operates the retail rails (UPI, IMPS, RuPay, NACH, AePS, BBPS, FASTag, CTS). **NIPL (NPCI International Payments Limited)** is NPCI's international arm exporting UPI and RuPay abroad. **CCIL (Clearing Corporation of India Limited)** is the central counterparty for government securities, forex and money markets.

**RTGS (Real-Time Gross Settlement)**
- *What/rail/settlement:* India's RTGS — A2A, gross, real-time, final; **24/7 since December 2020**. *Operator:* RBI. *Push.* *Value:* minimum ₹2 lakh, no upper limit. Parties: B2B, interbank, high-value.
- *Why it exists:* real-time final settlement of large-value payments. *Name:* generic RTGS.

**NEFT (National Electronic Funds Transfer)**
- *What/rail/settlement:* the **batch/deferred-net** credit-transfer system — now settles in **half-hourly batches, 24/7**. *Operator:* RBI. *Push.* No minimum/maximum (RBI level). Parties: P2P, B2B, B2C.
- *Why it exists:* nationwide interbank retail credit transfers; predates and complements IMPS/UPI. *Name:* "National Electronic Funds Transfer."

**IMPS (Immediate Payment Service)**
- *What/rail/settlement:* the **instant retail** A2A rail launched by NPCI in November 2010 — 24/7 instant interbank transfers, the first to break RTGS/NEFT banking-hours limits. *Operator:* NPCI. *Push.* Typical limit ₹5 lakh. Parties: P2P, P2M.
- *Why it exists:* to provide 24/7 real-time interbank transfers before UPI existed; still the settlement backbone under many UPI/wallet flows. *Name:* "Immediate Payment Service."

**UPI (Unified Payments Interface)**
- *What/rail/settlement:* the **crown jewel** — an open, instant A2A system (launched April 2016) that layers a **standard API and proxy addressing (VPA/UPI ID)** over bank accounts, letting any UPI app pay any other. Supports both **push (send)** and **pull (collect request)**. *Operator:* NPCI. *Value:* generally ₹1 lakh/day, raised to ₹2 lakh–₹5 lakh for specific categories (e.g. capital markets, insurance, healthcare). Parties: P2P, P2M, C2B, B2B.
- *Scale:* processed **18.4 billion transactions worth over ₹24.04 lakh crore in June 2025 alone** (~613 million/day); 675+ banks live. UPI now accounts for **84% of India's digital retail payments**, per the NPCI–Boston Consulting Group report launched at Global Fintech Fest 2025, which noted UPI "today facilitates over 20 billion transactions each month" (an earlier, widely-cited "~75%" figure traces to PwC's 2022-23 estimate in *The Indian Payments Handbook 2022-27*). Live in 8 international markets.
- *Feature family:*
  - **UPI Lite** — an on-device wallet for tiny payments **without a PIN and without hitting the bank's core systems**, so it works fast/offline. Per-transaction limit raised to ₹1,000 and wallet limit to ₹5,000.
  - **UPI 123Pay** — UPI for **feature phones** (no smartphone/internet) via IVR/missed-call/app; per-transaction limit raised to ₹10,000.
  - **UPI AutoPay** — recurring **mandates** (subscriptions, SIPs, bills) on UPI — a pull-style e-mandate.
  - **UPI Circle** — lets a primary user **delegate** UPI use to a secondary user (e.g. family member) with limits — sharing access to one bank account.
  - **Credit line on UPI** — pay directly from a **pre-sanctioned bank credit line** (from August 2025), not just deposits.
  - **RuPay credit card on UPI** — link a RuPay credit card to UPI and pay by QR; standard limit typically ₹1 lakh/day (₹5,000 in first 24 hours after linking).
- *Why it exists:* to create open, interoperable, near-free instant retail payments at population scale — the payments layer of India Stack. *Name:* "Unified Payments Interface" — *unified* because it unifies many banks/apps behind one interface.

**NACH (National Automated Clearing House)**
- *What/rail/settlement:* the **batch/ACH** system for bulk repetitive payments — **NACH Credit** (salaries, dividends, subsidies, DBT) and **NACH Debit** (loan EMIs, SIPs, insurance, utility mandates). *Operator:* NPCI (launched 2013). *Push and pull.* Parties: B2C, C2B, G2C.
- *Why it exists:* to consolidate and automate India's bulk-payment/direct-debit needs on one national platform, replacing fragmented ECS. *Name:* "National Automated Clearing House."

**ECS (Electronic Clearing Service) — legacy**
- *What:* the **predecessor to NACH** — the older bulk credit/debit clearing, now largely migrated to NACH. Kept for reference; being phased out.

**APBS (Aadhaar Payment Bridge System) & DBT (Direct Benefit Transfer)**
- *What:* **APBS** routes government benefit payments to citizens using their **Aadhaar number as the account address** (Aadhaar-mapped bank account), so the government doesn't need beneficiaries' bank details — just their Aadhaar. This is the engine of **DBT**, the policy of paying subsidies/welfare straight into bank accounts (cutting leakage and middlemen). *Operator:* NPCI. Parties: **G2C**. Push.
- *Why it exists:* to deliver welfare directly and eliminate ghost beneficiaries and leakage. *Name:* "Aadhaar Payment Bridge System."

**AePS (Aadhaar Enabled Payment System)**
- *What:* lets people **withdraw cash, check balance and make payments using Aadhaar + fingerprint** at a "business correspondent" (a local agent with a micro-ATM) — no card, no smartphone, no PIN. *Operator:* NPCI. Parties: financial inclusion (rural, unbanked).
- *Why it exists:* banking access for the last mile — where there are no branches or ATMs, an agent with a fingerprint reader becomes the bank. *Name:* "Aadhaar Enabled Payment System."

**BBPS (Bharat Bill Payment System)**
- *What:* a **unified, interoperable bill-payment platform** — pay any biller (utilities, telecom, insurance, loans, education, taxes) through any BBPS-enabled app/bank. *Operator:* NPCI (via NBBL). Parties: C2B.
- *Why it exists:* one trusted standard for bills across the country. *Name:* "Bharat" = India (in Hindi).

**CTS (Cheque Truncation System)**
- *What:* electronic image-based **cheque clearing** (operated by NPCI on RBI's behalf). *Settlement:* net. Cheque volumes declining.

**RuPay**
- *What:* India's **domestic card scheme** (debit, credit, prepaid). *Operator:* NPCI. Parties: P2M. Now integrated with UPI (RuPay credit card on UPI).
- *Why it exists:* card sovereignty, lower cost, data localisation, and financial inclusion (RuPay debit cards issued on Jan Dhan accounts). *Name:* portmanteau of **"Rupee" + "Payment."**

**Bharat QR**
- *What:* an **interoperable card-based QR** (built with Visa/Mastercard/RuPay/NPCI) for card-account QR payments — predates and complements UPI QR. *Name:* "Bharat" = India.

**NETC FASTag (National Electronic Toll Collection)**
- *What:* **RFID-sticker-based electronic toll payment** on highways, linked to a prepaid/bank account. *Operator:* NPCI. Parties: C2B/C2G.
- *Why it exists:* eliminate cash queues at toll plazas. *Name:* "FASTag" = fast + RFID tag; NETC = National Electronic Toll Collection.

**NFS (National Financial Switch)**
- *What:* the **interbank ATM network** connecting India's ATMs (the country's largest). *Operator:* NPCI (took it over from IDRBT in 2009).
- *Why it exists:* let any bank's card work at any bank's ATM. *Name:* "National Financial Switch."

**e-RUPI**
- *What:* a **prepaid digital voucher** (launched 2 August 2021 by NPCI) delivered by SMS/QR, redeemable without a bank account, app, or internet, for a specific purpose (e.g. a vaccination or subsidy). **It is NOT a currency and NOT the CBDC** — it just moves existing rupees for an earmarked purpose. Parties: G2C, B2C.
- *Why it exists:* targeted, leak-proof, purpose-bound benefit delivery. *Name:* "electronic rupee (voucher)."

**e₹ / Digital Rupee (CBDC)**
- *What:* the **RBI's central bank digital currency** — actual digital legal tender. Two pilots run in parallel: **wholesale (e₹-W)**, launched 1 November 2022 (secondary-market government-securities settlement), and **retail (e₹-R)**, launched 1 December 2022. *Operator:* RBI.
- *Status:* by end-March 2025 the retail pilot had expanded to **17 banks and about 6 million users**, with e-rupee in circulation up **334% during 2024-25** (roughly ₹1,016 crore by March 2025 — still a tiny fraction of banknotes). Wholesale scope was widened to include standalone primary dealers.
- *Why it exists:* a sovereign digital currency for the digital age; potential efficiency in settlement and programmable money. *Name:* "e₹" = electronic rupee.

**India Stack / DPI (Digital Public Infrastructure) & the JAM trinity**
- *What:* **India Stack** is the layered set of open APIs — **identity (Aadhaar), payments (UPI/RuPay/IMPS), and data (Account Aggregator, DigiLocker)** — that lets private and public services plug in at population scale. **DPI** is the broader concept: public digital "roads" for identity, money, and data.
- *JAM trinity:* **J**an Dhan (mass no-frills bank accounts), **A**adhaar (biometric digital ID, 1.44 billion+ enrolments by 2026), and **M**obile — the three foundations that, together, let the government put a verifiable identity, a bank account, and a phone in every citizen's hands, enabling DBT and UPI to work at scale.
- *Why it matters:* this is what makes India distinctive — payments are built on a public identity-and-data foundation, enabling financial inclusion (welfare to bank accounts, banking by fingerprint) that pure payment rails elsewhere don't attempt.

### HONG KONG

**Regulator:** Hong Kong Monetary Authority (HKMA) — the central banking institution. **Operator:** **HKICL (Hong Kong Interbank Clearing Limited)** — a private company **jointly owned 50/50 by the HKMA and the Hong Kong Association of Banks (HKAB)** — operates the clearing and settlement systems on a cost-recovery basis. Distinctive feature: **four parallel currency RTGS systems**.

**CHATS (Clearing House Automated Transfer System)** — Hong Kong's **RTGS**, but uniquely in **four currencies**, each with its own **Settlement Institution (SI)**:
- **HKD CHATS** (launched Dec 1996) — SI is the **HKMA** (central-bank money); all licensed banks hold settlement accounts at HKMA.
- **USD CHATS** (launched 21 Aug 2000) — SI is **The Hongkong and Shanghai Banking Corporation (HSBC)**.
- **EUR CHATS** (launched 28 Apr 2003) — SI is **Standard Chartered Bank (Hong Kong)**.
- **RMB CHATS** (launched 6 Mar 2006) — SI is **Bank of China (Hong Kong)**.
- *Rail/settlement:* A2A, gross, real-time, final. Non-HKD systems settle in **commercial-bank money** (the SI is a commercial bank), not central-bank money. They support **PvP** (for FX, e.g. USD/HKD, RMB/HKD, EUR/HKD, and via CLS) and **DvP** (for securities via CMU and CCASS). Operating hours 08:30–18:30, and USD/EUR/RMB run on HK holidays (except 1 Jan).
- *Why four systems exist:* to let Hong Kong settle major foreign-currency and offshore-RMB transactions **during Asian hours** without waiting for New York or Europe — reinforcing HK's role as a regional settlement hub and the leading offshore RMB centre.
- *Name:* "Clearing House Automated Transfer System."

**FPS (Faster Payment System)**
- *What/rail/settlement:* Hong Kong's **instant retail** rail (launched September 2018) — 24/7 real-time transfers connecting **banks and stored-value facilities (SVFs)** on one platform, in **both HKD and RMB**. Operated as an extension of HKD CHATS. *Operator:* HKICL. *Push.* Uses proxies (mobile number, email, FPS ID) and QR. Parties: P2P, P2M, B2B, bill payments (incl. government), wallet top-ups.
- *Adoption:* per RTHK (20 June 2025), "the number of FPS users approaches 17 million, with one million new accounts being set up in the first five months of the year" — more than Hong Kong's population, since one person can register multiple accounts.
- *Why it exists:* instant, free, interoperable retail payments across banks *and* e-wallets. *Name:* "Faster Payment System."

**ECG (Electronic Clearing)**
- *What/rail/settlement:* the **batch/ACH** engine — clears and nets bulk low-value electronic items, with net positions settling through HKD CHATS. *Operator:* HKICL. Item types include **autopay-in/autopay-out** (direct credits/debits — salaries, direct debits), **EPSCO** items (EPS point-of-sale), **JETCO** items, **credit-card** items, **MPF** (Mandatory Provident Fund) items, and **CCASS/IAH/SCI** securities-related items. Push and pull.
- *Why it exists:* the low-cost workhorse for recurring mass payments (payroll, direct debits, card settlement). *Name:* "Electronic Clearing (House)."

**CLG (Cheque/paper Clearing)**
- *What:* clearing of **paper instruments (cheques)** in HKD, USD and RMB. *Operator:* HKICL. *Settlement:* net. Declining.
- *Name:* "(Cheque) Clearing."

**EPS (Easy Pay System)**
- *What:* Hong Kong's long-standing **domestic debit scheme** — pay directly from your bank account at POS using your ATM/bank card (and EPSCO items clear via ECG). Parties: P2M.
- *Why it exists:* domestic low-cost debit at the point of sale, established long before contactless/QR. *Name:* "Easy Pay System."

**JETCO (Joint Electronic Teller Company)**
- *What:* a **shared ATM network** (and card scheme) owned by a consortium of banks — the interbank ATM switch (the alternative to HSBC/Hang Seng's ETC network). Also runs JETCO Pay. Parties: cash access, P2P.
- *Name:* "Joint Electronic Teller Company."

**Octopus**
- *What:* the iconic **stored-value (SVF) contactless card**, launched 1 September 1997 — one of the world's first contactless e-money systems, originally for transit, now near-universal for retail small payments. Max load HK$3,000. Per Octopus Cards Limited's corporate profile, "98% of people in Hong Kong aged 15 to 64 possess Octopus," with more than 24 million Octopus cards and products in circulation. Operated by Octopus Cards Limited (owned by transit operators). Now also does QR (via the Octopus app) and connects to FPS for top-ups. Parties: P2M, transit.
- *Why it exists:* fast, offline, small-value transit and retail payments. *Name:* "Octopus" (八達通, "eight arrivals/reach everywhere") — branding, evoking many uses/tentacles.

**e-Cheque**
- *What:* a **digitally-signed electronic cheque** — a PDF-based cheque you issue and deposit online, clearing via HKICL. Bridges the cheque habit into the digital world.

**CMU (Central Moneymarkets Unit)**
- *What:* HK's **central securities depository and settlement system** for debt securities (bonds, bills), operated by HKICL on HKMA's behalf; links to CHATS for DvP. Parties: B2B/interbank securities.
- *Why it exists:* safe settlement of debt securities against payment. *Name:* "Central Moneymarkets Unit."

**HK unified QR / FPS QR (HKQR)**
- *What:* Hong Kong's **unified QR standard** — one QR that carries multiple payment schemes (FPS, and via banks/wallets), so a merchant needs only one code. Parties: P2M.
- *Why it exists:* end QR clutter and drive FPS merchant acceptance.

**Payment Connect (HK–Mainland China)**
- *What:* the **live** cross-border link (launched **22 June 2025**) connecting HK's **FPS** to Mainland China's **IBPS (Internet Banking Payment System)** for real-time small-value P2P remittances using just a mobile number or account number. Six institutions from each side at launch. HK–Mainland limit: **up to HK$10,000/day per account, HK$200,000/year**; Mainland–HK subject to China's US$50,000/person annual FX quota.
- *Why it exists:* seamless real-time cross-boundary remittances, deepening HK–Mainland financial integration and HK's offshore-RMB role.

**e-HKD / e-HKD+ (CBDC)**
- *What:* HKMA's CBDC exploration. Project e-HKD began June 2021; in **September 2024** HKMA started **Phase 2 and renamed it "Project e-HKD+"** (11 groups of firms exploring tokenised-asset settlement, programmability, offline payments). HKMA published the **Phase 2 report on 28 October 2025**, completing the pilot and concluding that **the immediate priority is wholesale, not retail** — no public retail launch; preparatory groundwork for a possible future retail e-HKD to conclude around H1 2026. HKMA CE Eddie Yue said the e-HKD "has gradually been used in more wholesale applications by financial institutions."
- Related wholesale/tokenisation work under **Project Ensemble** (HKMA's wholesale sandbox for tokenised deposits and asset settlement).
- *Why it exists:* keep HK "well-prepared" for digital money; support tokenisation and cross-border settlement. *Name:* "electronic Hong Kong Dollar."

---

## Part 3 — Cards, in detail

### The four-party model
A card payment involves four parties plus the network:
1. **Cardholder** — you.
2. **Issuer** — the bank that gave you the card (carries your credit risk, funds rewards).
3. **Merchant** — the shop.
4. **Acquirer** — the merchant's bank/processor that "acquires" the transaction.
The **card network (Visa, Mastercard, RuPay, etc.)** sits in the middle as **switch + rulebook** — it routes the messages between acquirer and issuer and sets the rules and fees. (An "on-us" transaction where issuer = acquirer is the three-party exception; American Express is classically a three-party model.)

### Authorization vs clearing vs settlement (why separated)
When you tap: an **authorization** request flies from merchant → acquirer → network → issuer, which checks funds and says yes/no in ~1 second — this is what lets you leave with your goods. But the **money doesn't move yet**. Later (usually end-of-day batches), **clearing** exchanges the final transaction data, and **settlement** moves the net funds from issuer to acquirer (minus fees). They're separated because doing full settlement in real time on billions of small payments would be impossibly liquidity-heavy — batching and netting is far cheaper. The side-effect: "pending" vs "posted" amounts, delayed refunds, and the ability to tip/adjust after authorization.

### Interchange, MDR, scheme fees — who pays whom
When a customer pays $100 by card, the merchant doesn't get $100. They get $100 minus the **MDR (Merchant Discount Rate)** — the all-in fee, typically **1.5%–3.5%**. The MDR splits three ways:
- **Interchange fee** (the biggest slice, ~1.8%) — paid by the **acquirer to the issuer**. This compensates the issuer for credit risk, fraud, and **funds your rewards/cashback**. Set by the network, not negotiable.
- **Scheme fees** (~0.13–0.15%) — paid to the **card network** (Visa/Mastercard) for running the switch. Not negotiable.
- **Acquirer markup** (~0.4–0.5%) — the acquirer's/processor's margin. The **only negotiable part**.
So: merchants effectively subsidise cardholder rewards through interchange. This is exactly why rewards cards exist (higher interchange = richer rewards), why regulators cap interchange in some markets, and why merchants love near-zero-cost A2A rails.

### Credit vs debit vs prepaid
- **Credit** — issuer lends you money; highest interchange; rewards-rich.
- **Debit** — pulls straight from your bank account; lower interchange (often capped).
- **Prepaid** — you load funds first (like a stored-value card); used for gifting, payroll, the unbanked.

### Chargebacks and the dispute lifecycle
A **chargeback** is the cardholder's right to dispute a charge (fraud, goods not received, wrong amount) and have the issuer **forcibly reverse** it. Lifecycle: cardholder disputes → issuer raises chargeback → acquirer/merchant can **represent** (contest with evidence) → possible **arbitration** by the network. This buyer-protection is a key card advantage over irrevocable push A2A payments — and a key reason cards persist for high-value/risky purchases even as A2A wins small P2M.

### Push-to-card: AFT, OCT, and the money-movement products
Card networks added the ability to **push money to a card** (not just pull from it at a till):
- **AFT (Account Funding Transaction)** = a **pull** — funds are pulled *from* a card to fund a wallet/account or to source funds for a transfer.
- **OCT (Original Credit Transaction)** = a **push** — funds are credited (pushed) *to* a recipient's card. This is the core of card-based payouts, refunds, and remittances.
- An **AFTR** is the reversal of an AFT.
- Combine them — AFT to collect, OCT to disburse — and you can move money card-to-card entirely on card rails, no bank account details needed, across 200+ countries.
- **Visa Direct** (Visa) and **Mastercard Move** (Mastercard's umbrella, formerly **Mastercard Send / MoneySend**) are the productised versions, reaching billions of card endpoints. **Fast Funds** is Visa's designation for OCTs delivered to the recipient within ~30 minutes (where the issuer supports real-time posting).
- *Why it matters:* this is how gig-economy payouts, instant refunds, insurance disbursements and many remittances now reach people "instantly to your debit card." Typical network fee ~$0.05–0.15 per OCT; P2P push often capped (e.g. default $2,500).

### Domestic card schemes and WHY countries build them
Countries build their own card schemes for **sovereignty** (not depending on foreign networks that could be switched off or sanctioned), **cost** (domestic interchange far lower than Visa/Mastercard), **data localisation** (keep transaction data onshore), and **financial inclusion** (issue cheap debit to everyone). Examples:
- **NETS (Singapore)**, **MyDebit (Malaysia)**, **RuPay (India)**, **EPS (Hong Kong)** — the four in scope.
- **UnionPay (China)** — the giant domestic-turned-global scheme, dominant in China and widely accepted across Asia.
- **Jaywan (UAE)** — the UAE's new domestic scheme (built with technical input from India's RuPay/NPCI) — a good comparator showing the trend of countries launching sovereign schemes.

### ISO 8583 vs ISO 20022
- **ISO 8583** is the decades-old messaging standard for **card transactions** (authorization/clearing messages between terminals, acquirers, networks, issuers). Compact, fixed-field.
- **ISO 20022** is the modern, data-rich XML/structured standard now used by RTGS, instant rails and cross-border (see Part 6). Cards still largely run ISO 8583, though networks are modernising.

### How card rails compete with A2A instant rails
Economically, card P2M costs the merchant 1.5–3.5% MDR; A2A rails like PayNow/DuitNow/UPI/FPS cost merchants **near zero** (often free for small merchants). A2A also settles to the merchant's bank account without a card-scheme intermediary. QR made A2A as easy to accept as putting up a sticker. So A2A is **eating card volume in low-margin, high-frequency P2M** (hawkers, small retail, bills). Cards retain advantages in **credit, rewards, chargeback protection, and cross-border acceptance** — so the battleground is P2M debit-like spending, where A2A is winning fast in these four markets.

---

## Part 4 — QR payments

**QR is an *initiation method*, not a rail.** A QR code is just a convenient way to carry payment details (who to pay, how much) so a phone camera can read them and kick off a payment — the money still travels over an underlying rail (A2A, card, or wallet). The same merchant QR could route a PayNow (A2A) or a card or a wallet payment.

- **Static vs dynamic:** a **static** QR is a fixed sticker (merchant ID only; customer types the amount) — cheap, reusable, but you must enter the sum. A **dynamic** QR is generated per transaction with the amount embedded (shown on a screen/printed on a bill) — faster, less error-prone, better for larger merchants.
- **Merchant-presented vs customer-presented:** **merchant-presented** = the shop shows the QR, you scan it (most common in Asia). **Customer-presented** = your app shows a QR, the merchant scans you (common at supermarket tills, and how Alipay/WeChat often work).
- **EMVCo QR standard:** EMVCo (owned by the big card networks) publishes the **global technical specification** for how payment QR codes encode data. National standards are **built on top of EMVCo** so codes are consistent and interoperable.
- **National QR standards:** **SGQR / SGQR+** (Singapore), **DuitNow QR** (Malaysia), **UPI QR** and **Bharat QR** (India — UPI QR for A2A, Bharat QR for card accounts), **FPS QR / HKQR** (Hong Kong). All EMVCo-based, all aiming for "one code, many schemes."
- **Card-network QR vs closed-loop wallet QR vs national A2A QR:** **National A2A QR** (DuitNow, UPI, FPS QR) routes bank-to-bank at near-zero cost and is interoperable across all participating apps. **Closed-loop wallet QR** (Alipay, WeChat Pay) keeps the money inside the wallet's ecosystem (top-up in, spend within) — great UX, but a walled garden. **Card-network QR** (Bharat QR, UnionPay QR) routes over card rails with card economics. The policy push across all four markets is toward **open, interoperable national A2A QR** and away from fragmented closed loops.

---

## Part 5 — Cross-border payments

### Correspondent banking (the traditional way)
Banks don't have accounts everywhere, so to send money abroad they use **correspondent banks**. Your bank holds a **nostro** account ("our account with them") at a foreign bank, and that foreign bank holds a **vostro** ("your account with us") relationship. A payment hops through a **chain of intermediaries**, each taking a fee and a slice of time, each doing its own compliance checks. That's **why cross-border is slow (days), expensive, and opaque** — the World Bank's *Remittance Prices Worldwide* (Issue Q3 2025) put the global average cost of sending remittances at **6.36% in Q3 2025**, down from 6.49% earlier in the year. **De-risking** — big banks cutting correspondent relationships to avoid compliance risk — has *reduced* the number of corridors, making some routes even harder and pricier.

### SWIFT = messaging, not money
**SWIFT is a messaging network** — it carries the *instruction* ("pay X to Y"), not the money itself. The money still moves via correspondent accounts.
- **MT vs MX:** legacy **MT** messages (e.g. MT103 for a customer credit transfer) are being replaced by **MX** messages in **ISO 20022** format (richer, structured data).
- **SWIFT gpi** (global payments innovation) added speed, end-to-end tracking (a "tracker"), and fee transparency to correspondent payments — a major improvement, but still riding the correspondent rails.

### FX conversion — where it happens
In a cross-border flow, the currency conversion happens **at a point in the chain where a bank holds both currencies** — often the correspondent/intermediary bank, or the beneficiary bank. In modern linked instant rails and MTOs, the FX is done **up front and transparently** (you see the rate before sending). This is a big part of why linked rails and MTOs are cheaper — fewer hands, transparent FX.

### Linked instant rails (the new way) — live status
- **PayNow–UPI (Singapore ↔ India):** **LIVE since 21 February 2023** — described as the world's first cloud-based real-time payment linkage with non-bank participation. Expanded on 17 July 2025 to **19 Indian banks**. Indian outbound capped (originally ~S$1,000/day). Send using UPI ID (to India) or mobile/VPA (to Singapore).
- **PayNow–DuitNow (Singapore ↔ Malaysia):** **LIVE since 17 November 2023** (following the QR link of 31 March 2023). P2P up to **S$1,000 / RM3,000 daily**. First linkage to include non-bank FIs on both sides. P2P/remittance between the two was S$2.3bn/RM7.8bn in 2022.
- **FPS–IBPS "Payment Connect" (Hong Kong ↔ Mainland China):** **LIVE since 22 June 2025**. HK→Mainland up to HK$10,000/day, HK$200,000/year.
- **PromptPay linkages:** the **Thailand–Singapore PromptPay–PayNow link was the world's first cross-border fast-payment connection**; Thailand–Malaysia (PromptPay–DuitNow) also live. (Thailand's PromptPay is its own national instant rail.)

### QR interoperability across ASEAN (ASEAN Payment Connectivity)
Under the **Regional Payment Connectivity (RPC)** initiative, bilateral QR links let travellers pay with their home app abroad: **DuitNow QR ↔ QRIS (Indonesia) ↔ PromptPay (Thailand) ↔ PayNow/NETS QR (Singapore) ↔ QR Ph (Philippines)** and more. Per the Joint Statement of the 13th ASEAN Finance Ministers' and Central Bank Governors' Meeting, there were **29 QR and P2P instant-payment linkages** established within ASEAN and with external partners as of December 2025, with **QR-code payments reaching 36.2 million transactions (US$716.4 million) and P2P transfers 1.6 million transactions (US$305.7 million)**. Malaysia recorded 11.8 million cross-border QR transactions worth RM967 million in H1 2025.

### Project Nexus and mBridge
- **Project Nexus** (BIS Innovation Hub, headquartered in Singapore) is a **multilateral hub** to connect national instant-payment systems with a single standard connection instead of dozens of bilateral links — a hub-and-spoke model. Phase 3 blueprint completed July 2024; founding participants are **India, Malaysia, the Philippines, Singapore, and Thailand** (with Indonesia as observer). In **2025 these central banks incorporated Nexus Global Payments (NGP)** to bring it to live implementation — **announced/in-build, not yet live**; a 2026 rollout has been discussed.
- **mBridge** is a **wholesale multi-CBDC platform** (PBOC's Digital Currency Institute, HKMA, Bank of Thailand, Central Bank of the UAE, and Saudi Central Bank) for instant cross-border settlement in central-bank digital currencies. It reached **Minimum Viable Product in June 2024** (Saudi Arabia joined as a full participant the same day); **BIS exited on 31 October 2024** (framed by BIS GM Agustín Carstens as a "graduation," not political), and the founding central banks continue to run it — in practice heavily RMB-denominated.

### The G20 Roadmap for Enhancing Cross-border Payments
The G20 (via the Financial Stability Board and CPMI) set a **roadmap with 2027 targets** to make cross-border payments faster, cheaper, more transparent and more inclusive — commonly cited targets include **cost** (global average retail remittance cost ≤3%, and no corridor above 5%), **speed** (75% of cross-border payments credited within one hour), **access**, and **transparency**. Every linkage above is explicitly justified as contributing to these targets.

### MTOs — how they *actually* move money
Money-transfer operators like **Wise** and **Western Union** mostly **don't send money across borders at all**. They hold **local accounts (or agents) in both countries** and use **netting**: when you "send" from Singapore to India, Wise takes your SGD locally and pays out INR from its India pool locally; periodically it rebalances the pools. This local-in/local-out + netting model (plus transparent upfront FX) is why MTOs are far faster and cheaper than correspondent banking.

### CIPS and its relevance to Hong Kong
**CIPS (Cross-Border Interbank Payment System)**, launched by the **People's Bank of China in October 2015**, is China's dedicated **RMB cross-border clearing and settlement** system. Unlike SWIFT (messaging only), CIPS **settles in RMB directly**, removing the need for USD intermediation. In 2024 it processed **8.2169 million transactions worth RMB 175.49 trillion (~US$24.47 trillion), up 24.25% in volume and 42.60% in value year-on-year**, with **168 direct and 1,461 indirect participants across 119 countries/regions**. It's central to **Hong Kong's role as the leading offshore RMB hub** — HK routes and clears vast RMB flows, and RMB CHATS interoperates with the offshore RMB market.

### PvP, CLS, DvP
- **PvP (Payment versus Payment):** the two legs of an FX trade settle **simultaneously or not at all** — eliminating "Herstatt" risk (paying out one currency and not receiving the other). HK's CHATS supports PvP across its currency systems.
- **CLS (Continuous Linked Settlement):** the global multi-currency PvP utility that settles FX for the major currencies; CLS Bank has access to HKD CHATS.
- **DvP (Delivery versus Payment):** the securities equivalent — the security is **delivered only if payment is made**, simultaneously. Used in MEPS+/SGS, RENTAS securities, CMU/CCASS.

### Remittance corridors relevant to these markets
- **Singapore → India** (huge; the PayNow–UPI corridor targets this).
- **Singapore → Malaysia** (very high volume; PayNow–DuitNow).
- **Malaysia → Indonesia / Bangladesh / Philippines** (migrant-worker corridors).
- **Hong Kong → Mainland China** (Payment Connect; and offshore RMB).
- **Gulf → India** and **Singapore → Philippines/Indonesia** also material.

---

## Part 6 — Messaging standards and technical layer

### ISO 20022 — what it is and why it matters
ISO 20022 is a **common, structured, data-rich messaging language** for payments and securities. Versus the old terse formats, it carries far more structured information (full remittance details, structured addresses, purpose codes) — enabling better automation, compliance/screening, and fewer errors. It's becoming the **lingua franca** across RTGS systems, instant rails, and cross-border.
- **Global cross-border (SWIFT CBPR+):** the MT–MX **coexistence period ended 22 November 2025** — after which core cross-border **payment instruction** messages (MT103, MT202, etc.) must be ISO 20022 (MX); some ancillary messages and gpi tracking (MT199/MT299) have deferred/later retirement dates (into 2026–2028), and structured-address and exceptions-and-investigations changes continue through 2026–2028.
- **Per market:** all four regulators have adopted or aligned to ISO 20022 for their RTGS/modern rails — **MAS (MEPS+ modernisation), BNM/PayNet (RPP built ISO 20022-native), RBI (RTGS/NEFT ISO-aligned), HKMA (CHATS)**. Malaysia's RPP and India's/Singapore's modern instant rails were designed with rich ISO 20022 data from the start; legacy RTGS systems are migrating in step with SWIFT's global timeline.

### ISO 8583 for cards
Cards still run on **ISO 8583** (the compact card-authorization/clearing standard) — a separate world from ISO 20022, though networks are gradually modernising.

### SWIFT MT vs MX
**MT** = the legacy message types (FIN). **MX** = the ISO 20022 XML messages (e.g. pacs.008 replaces MT103 bank-to-bank, pacs.009 for MT202, pain.001 for customer payment initiation). The industry-wide shift is MT → MX.

### API access & open banking per market
- **Singapore — SGFinDex:** a public-infrastructure **financial data exchange** (using MyInfo/national digital identity) that lets individuals consolidate their financial data across banks and government with consent. Plus extensive API access to FAST/PayNow via banks and aggregators.
- **Hong Kong — Open API Framework:** HKMA's phased **Open API framework** for banks (product info → applications → account info → transactions), enabling third-party access with consent.
- **India — Account Aggregator (AA) framework:** an RBI-regulated, consent-based **data-sharing** layer (part of India Stack) letting users share financial data across institutions via licensed Account Aggregators — plus UPI's open API model that lets any app plug into the rail.
- **Malaysia — Open Finance:** BNM has published an **open data/open finance** framework driving API-based data sharing and payment initiation.

### Proxy resolution / addressing services
Instant rails use a **proxy database** (a directory/lookup) that maps a friendly alias (mobile number, ID, UEN, VPA, email) to an underlying bank account. When you send, your app sends a **lookup request** to the central proxy directory (e.g. PayNow's, run by BCS), which returns the resolved account and the payee's name (for confirmation) — then the payment is routed over the instant rail. This is what lets you "pay a phone number." Cross-border links (PayNow–UPI etc.) work by connecting these proxy-resolution services across countries.

---

## Part 7 — Comparative synthesis

### Master comparison table

| Tier | Singapore | Malaysia | India | Hong Kong |
|---|---|---|---|---|
| **RTGS (high-value, gross)** | MEPS+ | RENTAS / RENTAS+ | RTGS (RBI) | CHATS (HKD/USD/EUR/RMB) |
| **Batch / ACH (bulk, netted)** | GIRO / IBG (+eGIRO) | IBG | NACH (+legacy ECS) | ECG (autopay) |
| **Instant retail (24/7)** | FAST + PayNow | RPP + DuitNow | IMPS + UPI | FPS |
| **Cheque clearing** | CTS | eSPICK | CTS | CLG (+ e-Cheque) |
| **Domestic card scheme** | NETS | MyDebit | RuPay | EPS |
| **National QR standard** | SGQR / SGQR+ | DuitNow QR | UPI QR / Bharat QR | HKQR / FPS QR |
| **Direct debit (pull)** | GIRO debit / DDA | DuitNow AutoDebit | NACH Debit | ECG autopay-out |
| **Stored-value / transit** | EZ-Link, NETS FlashPay, SimplyGo | Touch 'n Go | (wallets/PPI) | Octopus |
| **Regulator** | MAS | BNM | RBI | HKMA |
| **Main operator** | ABS/BCS (+NETS) | PayNet | NPCI (retail) / RBI (wholesale) | HKICL |
| **CBDC status** | Project Orchid (retail, exploratory) | (exploratory) | e₹ pilots live (retail+wholesale) | e-HKD+ (wholesale priority, no retail launch) |

### Why every market converges on the same three-tier structure
Because the **same three needs are universal**: (1) a safe way to settle big/urgent payments with no settlement risk — **RTGS**; (2) a cheap way to move huge volumes of small recurring payments — **batch/ACH**; (3) an instant, always-on way for consumers to pay each other and merchants — **instant retail**. The differences come from **history** (when each was built and on what technology), **ownership model** (central-bank-run vs bank-consortium vs dedicated operator), **policy goals** (India's financial-inclusion overlay; HK's multi-currency hub role), and **branding**.

### Regulators and operators per market
- **Singapore:** MAS (regulator) · ABS (scheme owner of FAST/PayNow) · BCS (operator) · NETS (domestic card/QR).
- **Malaysia:** BNM (regulator + largest PayNet shareholder) · PayNet (single umbrella operator for RENTAS, RPP/DuitNow, FPX, JomPAY, MyDebit, IBG, eSPICK).
- **India:** RBI (regulator + operator of RTGS/NEFT) · NPCI (retail: UPI, IMPS, RuPay, NACH, AePS, BBPS, FASTag, CTS) · NIPL (international) · CCIL (securities/FX CCP).
- **Hong Kong:** HKMA (regulator + HKD settlement institution) · HKICL (operator, 50/50 HKMA-HKAB) · commercial settlement institutions for USD (HSBC), EUR (StanChart HK), RMB (BOCHK).

### What makes each market distinctive
- **Hong Kong:** **four parallel currency RTGS systems** (HKD central-bank money; USD/EUR/RMB in commercial-bank money via HSBC/StanChart/BOCHK), reflecting its role as an FX and offshore-RMB settlement hub in Asian hours; live **Payment Connect** to Mainland China.
- **India:** payments built on **DPI / India Stack and the JAM trinity**, with unique financial-inclusion rails (**APBS/DBT** for welfare, **AePS** for biometric banking without cards/phones) and the world's largest instant rail (**UPI**).
- **Singapore:** the **cross-border hub** — first-mover on real-time linkages (PayNow–UPI, PayNow–DuitNow), host of **Project Nexus/NGP**, and a tokenisation/CBDC laboratory (Ubin → Partior, Orchid, GL1).
- **Malaysia:** the **unified PayNet umbrella** — a single national operator running nearly the entire stack under BNM, giving unusually tidy governance and coordinated rollout (DuitNow family).

### Trends
- **Decline of cheques** — CTS/eSPICK/CLG volumes shrinking; corporate-cheque phase-outs announced.
- **Rise of A2A instant** — UPI/PayNow/DuitNow/FPS are the growth engines, eating card P2M.
- **CBDC pilots** — India's e₹ live (~6m retail users); HK's e-HKD+ tilting wholesale; Singapore exploring retail via Orchid but not urgent.
- **Tokenised deposits & shared ledgers** — Partior, Project Ensemble (HK), GL1 (SG), mBridge — the wholesale frontier.
- **Card vs A2A tension** — the defining competitive dynamic: near-zero-cost A2A rails vs card economics/rewards/protection.

---

## Part 8 — Glossary / acronym reference

**Parties (Axis 1)**
- **P2P** — person to person. **P2M** — person to merchant. **B2B** — business to business. **B2C** — business to consumer. **C2B** — consumer to business. **G2C** — government to citizen (welfare, subsidies). **C2G** — citizen to government (taxes, fees). **G2B / B2G** — government–business.

**Rail types (Axis 2)**
- **A2A** — account-to-account (bank rails). **Card rails** — Visa/Mastercard/domestic schemes. **SVF** — stored-value facility (e-money/wallet: Octopus, TNG, FlashPay). **MTO** — money-transfer operator (Wise, Western Union). **SWIFT** — messaging network (instructions, not money). **CBDC** — central bank digital currency.

**Settlement models (Axis 3)**
- **RTGS** — real-time gross settlement. **DNS** — deferred net settlement (batch/ACH). **Instant retail** — customer-instant, bank-netted-later. **Netting / multilateral netting** — offsetting many obligations to a net figure. **PvP** — payment vs payment. **DvP** — delivery vs payment. **CLS** — Continuous Linked Settlement (FX PvP utility). **Settlement risk / Herstatt risk** — risk a counterparty fails before settling.

**National schemes — Singapore**
- **MEPS+** — MAS Electronic Payment System Plus (RTGS). **FAST** — Fast And Secure Transfers (instant A2A). **PayNow** — proxy layer over FAST. **GIRO/IBG** — Interbank GIRO (batch). **eGIRO** — electronic GIRO mandate setup. **DDA** — Direct Debit Authorisation. **CTS** — Cheque Truncation System. **NETS** — Network for Electronic Transfers (domestic card/QR/FlashPay/Prepaid). **eNETS** — online bank-payment gateway. **SGQR/SGQR+** — Singapore Quick Response standard. **EZ-Link / SimplyGo** — transit SVF / account-based ticketing. **UEN** — Unique Entity Number (business ID proxy). **VPA** — Virtual Payment Address.

**National schemes — Malaysia**
- **RENTAS** — Real-time Electronic Transfer of Funds and Securities (RTGS). **RPP** — Real-time Retail Payments Platform. **DuitNow** — instant A2A ("duit" = money). **DuitNow QR / AutoDebit / Request**. **IBG** — Interbank GIRO (batch). **FPX** — Financial Process Exchange (online banking gateway). **JomPAY** — national bill payment. **MyDebit** — domestic debit scheme. **eSPICK** — Electronic cheque clearing. **MEPS** — Malaysian Electronic Payment System (legacy switch). **IBFT** — Interbank Funds Transfer. **MyClear** — Malaysian Electronic Clearing Corporation (merged into PayNet). **TNG** — Touch 'n Go.

**National schemes — India**
- **RTGS / NEFT** — RBI's high-value / batch rails. **IMPS** — Immediate Payment Service. **UPI** — Unified Payments Interface (+ **UPI Lite**, **UPI 123Pay**, **UPI AutoPay**, **UPI Circle**). **NACH** — National Automated Clearing House. **ECS** — Electronic Clearing Service (legacy). **APBS** — Aadhaar Payment Bridge System. **DBT** — Direct Benefit Transfer. **AePS** — Aadhaar Enabled Payment System. **BBPS** — Bharat Bill Payment System. **CTS** — Cheque Truncation System. **RuPay** — domestic card scheme ("Rupee"+"Payment"). **Bharat QR** — card-based QR. **NETC FASTag** — National Electronic Toll Collection. **NFS** — National Financial Switch (ATMs). **e-RUPI** — prepaid voucher (not CBDC). **e₹** — Digital Rupee (CBDC). **VPA/UPI ID** — proxy address.

**National schemes — Hong Kong**
- **CHATS** — Clearing House Automated Transfer System (RTGS ×4 currencies). **FPS** — Faster Payment System (instant). **ECG** — Electronic Clearing (batch). **CLG** — (cheque) paper clearing. **EPS** — Easy Pay System (domestic debit). **EPSCO** — EPS point-of-sale items. **JETCO** — Joint Electronic Teller Company (ATM network). **Octopus** — SVF contactless card. **CMU** — Central Moneymarkets Unit (securities depository). **HKQR** — unified QR. **MPF** — Mandatory Provident Fund. **CCASS** — Central Clearing and Settlement System (equities). **e-HKD / e-HKD+** — CBDC pilot.

**Institutions / operators**
- **MAS** — Monetary Authority of Singapore. **ABS** — Association of Banks in Singapore. **BCS** — Banking Computer Services. **BNM** — Bank Negara Malaysia. **PayNet** — Payments Network Malaysia. **RBI** — Reserve Bank of India. **NPCI** — National Payments Corporation of India. **NIPL** — NPCI International Payments Limited. **CCIL** — Clearing Corporation of India. **HKMA** — Hong Kong Monetary Authority. **HKICL** — Hong Kong Interbank Clearing Limited. **HKAB** — Hong Kong Association of Banks. **PBOC** — People's Bank of China. **BIS / BISIH** — Bank for International Settlements / Innovation Hub. **NGP** — Nexus Global Payments.

**Cross-border mechanisms**
- **Correspondent banking / nostro / vostro** — the intermediary-chain model. **SWIFT gpi** — global payments innovation (tracking, speed). **Payment Connect** — FPS–IBPS (HK–China). **PayNow–UPI / PayNow–DuitNow / PromptPay links** — bilateral instant links. **RPC** — Regional Payment Connectivity (ASEAN). **Project Nexus** — BIS multilateral hub. **mBridge** — multi-CBDC wholesale platform. **CIPS** — Cross-Border Interbank Payment System (RMB). **G20 Roadmap** — cross-border enhancement targets. **QRIS / PromptPay / QR Ph / KHQR / VietQR** — other ASEAN national QR standards.

**Card world**
- **Issuer / acquirer / cardholder / merchant** — the four parties. **Network/scheme** — Visa/Mastercard/RuPay etc. (switch + rulebook). **MDR** — Merchant Discount Rate. **Interchange** — issuer's slice. **Scheme fee** — network's slice. **Chargeback** — cardholder dispute reversal. **AFT** — Account Funding Transaction (pull). **OCT** — Original Credit Transaction (push). **AFTR** — AFT reversal. **Visa Direct / Mastercard Move (ex-Send/MoneySend)** — push-to-card products. **Fast Funds** — Visa's ~30-min OCT posting. **EFTPOS** — Electronic Funds Transfer at Point Of Sale. **UnionPay / Jaywan** — other domestic schemes. **CEPAS** — Contactless e-Purse Application Standard (SG SVF cards).

**Messaging standards**
- **ISO 20022 / MX** — modern structured standard (pacs.008, pacs.009, pain.001). **ISO 8583** — card messaging. **MT** — legacy SWIFT message types (MT103, MT202). **CBPR+** — Cross-Border Payments and Reporting Plus (SWIFT's ISO 20022 usage guidelines). **SGFinDex / Open API / Account Aggregator / Open Finance** — open-data frameworks (SG/HK/IN/MY).

---

## Recommendations (how to use this map, and what to watch)

**Stage 1 — anchor your mental model on the three-tier spine.** For any new system you encounter in any market, first slot it into RTGS / batch / instant, then note its rail type and party types. This instantly tells you its cost, speed, finality and risk profile before you read a single spec. Benchmark that would change your thinking: if a "new" system doesn't fit the three tiers, it's almost certainly a *layer* (a proxy service like PayNow, an initiation method like QR, or an addressing/API overlay) rather than a rail.

**Stage 2 — for commercial/strategy work, treat A2A vs card economics as the central question.** When advising merchants or building product, default to the assumption that **P2M debit-like spend migrates to A2A** (near-zero MDR) while credit, rewards, chargeback-protected, and cross-border acceptance stay on cards. Threshold to revisit: if a market caps interchange hard (making cards cheaper) or if A2A adds credit + dispute rights (as India's credit-line-on-UPI and RuPay-on-UPI now do), the card moat narrows further — watch UPI's credit features as the leading indicator.

**Stage 3 — for cross-border, always separate "announced" from "live."** Only rely on links you can confirm are in production: **live today** = PayNow–UPI, PayNow–DuitNow, PromptPay–PayNow, PromptPay–DuitNow, and HK–China Payment Connect. **Not yet live** = Project Nexus/NGP (multilateral hub). Benchmark that would change the landscape: Nexus going live would make bilateral links partly redundant and is the single biggest thing to monitor for 2026; a public retail e-HKD or a materially larger e₹ circulation would signal CBDCs moving from pilot to infrastructure.

**Stage 4 — for technical/operations readiness, ISO 20022 is the near-term hard deadline.** The SWIFT cross-border MT–MX coexistence ended 22 November 2025; ensure any cross-border messaging you touch is MX-native, and note the follow-on 2026–2028 milestones (structured addresses, exceptions & investigations, remaining MT retirements). For cards, ISO 8583 remains the world you operate in.

---

## Caveats
- **Figures are point-in-time and grow fast.** UPI (~18.4bn txns/month, 84% of India's digital retail payments), CIPS (RMB 175.49tn in 2024), FPS (~17m users), and ASEAN RPC volumes all change quarter to quarter; treat them as of mid-to-late 2025.
- **"Live vs announced" changes frequently** — cross-border linkages and CBDC phases are the fastest-moving items; always re-verify against the central bank/operator before relying on status.
- **Transaction limits are frequently bank-set, not just scheme-set.** PayNow's S$200,000 scheme limit, for instance, is subject to each bank's own daily caps; UPI's ₹1 lakh general limit has many category exceptions. Confirm the specific institution's limits for operational decisions.
- **Some secondary figures carry lower confidence.** mBridge's often-quoted transaction totals come from journalistic estimates, not official BIS/PBOC data; Project Ensemble specifics were not independently confirmed here and should be checked directly on the HKMA site. The G20 Roadmap targets are widely cited but the precise numeric thresholds should be verified against the FSB's latest published targets.
- **Name etymologies** for marketing-led brands (PayNow, DuitNow, JomPAY, Octopus) are descriptive/promotional rather than formal acronyms; the acronym expansions given for the technical systems (MEPS+, RENTAS, CHATS, FAST, etc.) are the official ones.
