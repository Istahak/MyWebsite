---
title: "Speak AI Coding: The Words Behind Every Agent, in Bangla"
excerpt: "Tokens, context windows, harnesses, hallucination, the dumb zone, handoffs and AFK agents. Every AI coding term explained in plain Bangla and English, with diagrams, worked examples and everyday analogies."
date: "2026-11-04"
category: "Guide"
tags: ["AI Coding","LLM","Claude Code","Agents","Bangla"]
published: true
---
AI coding tools feel like magic until they fail. Then you hear words like **context window, harness, hallucination and compaction**, and nobody explains them. This page explains **71 of those words, in Bangla and English**, so you can read your tools, your bills and your bugs clearly.

AI coding tool যতক্ষণ ঠিক চলে, ততক্ষণ জাদুর মতো লাগে। ভুল হলেই আসে context window, harness, hallucination, compaction এর মতো শব্দ। **এই পাতায় ৭১টা শব্দ সহজ বাংলা আর ইংরেজিতে বোঝানো হয়েছে**, যাতে আপনি নিজের tool, বিল আর bug পরিষ্কার বুঝতে পারেন।

> [!NOTE]
> **How to read each term / প্রতিটা শব্দ কীভাবে পড়বেন**
>
> - **In one line / এক লাইনে:** the meaning, in both languages.
> - **Bullets:** why it matters, in Bangla with the English technical words kept as they are.
> - **উপমা / Analogy:** an everyday picture from life in Bangladesh.
> - **কাজে / In practice:** what to do with it tomorrow.
>
> The terms build on each other, so reading from the top works best. শুরু থেকে পড়লে প্রতিটা শব্দ আগেরটার উপর দাঁড়ায়। Looking for one word? Jump to the [quick lookup table](#quick-lookup--দ্রুত-খোঁজা).

---

## The big picture · বড় ছবি

The whole dictionary in three lines:

1. **A model remembers nothing and learns nothing while you use it.** Everything must be sent again on every request. **Model কিছু মনে রাখে না**, প্রতিবার সব নতুন করে পাঠাতে হয়।
2. **What is not in the context does not exist for the model**, and a crowded context makes it worse. **যা context-এ নেই, model তা জানে না।** আর context বেশি ভরলে কাজ খারাপ হয়।
3. **So the real skill is managing context:** put in what the task needs, keep out the rest, and write durable knowledge into files. **আসল দক্ষতা হলো context ঠিক রাখা।**

<figure class="diagram">
<svg viewBox="0 0 560 300" role="img" aria-label="A model plus a harness makes an agent. A session contains turns, and each turn can contain several requests to the model provider.">
  <rect class="node down" x="20" y="20" width="140" height="70" rx="10"/>
  <text x="90" y="44">Model</text><text class="note" x="90" y="70">next token</text>
  <text x="185" y="55">+</text>
  <rect class="node" x="210" y="20" width="150" height="70" rx="10"/>
  <text x="285" y="44">Harness</text><text class="note" x="285" y="70">tools + prompt</text>
  <text x="385" y="55">=</text>
  <rect class="node up" x="410" y="20" width="130" height="70" rx="10"/>
  <text x="475" y="44">Agent</text><text class="note" x="475" y="70">does the work</text>
  <rect class="node skip" x="20" y="120" width="520" height="170" rx="12"/>
  <text class="start" x="36" y="142">Session</text><text class="note start" x="120" y="142">one whole sitting</text>
  <rect class="node" x="40" y="160" width="480" height="115" rx="10"/>
  <text class="start" x="56" y="180">Turn</text><text class="note start" x="110" y="180">your message + the full reply</text>
  <rect class="node down" x="60" y="200" width="130" height="55" rx="8"/><text x="125" y="227">request</text>
  <rect class="node down" x="215" y="200" width="130" height="55" rx="8"/><text x="280" y="227">request</text>
  <rect class="node down" x="370" y="200" width="130" height="55" rx="8"/><text x="435" y="227">request</text>
</svg>
<figcaption>An agent is a model inside a harness. One session holds many turns, and one turn can make many requests to the provider. Agent মানে harness-এ মোড়া model।</figcaption>
</figure>

---

## 1. The model · মডেল নিজে

What a model is, how it runs, and where the money goes. **Model কী, কীভাবে চলে, আর টাকা কোথায় খরচ হয়।**

### AI · এআই

> [!NOTE]
> **এক কথায়:** "AI" হলো **একটা চলমান লেবেল**, কোনো নির্দিষ্ট প্রযুক্তির নাম না। কম্পিউটার যা নতুন করে পারছে, নামটা সেদিকেই আঙুল তোলে।
>
> **In short:** "AI" is **a label that keeps moving**. It points at whatever computers can newly and impressively do, not at one fixed technology.

#### ব্যাপারটা কী?

"Model" বললে একটা নির্দিষ্ট জিনিস বোঝায়, "token" বললেও তাই। **কিন্তু "AI" বললে ঠিক কী বোঝায়?** আসলে কিছুই নির্দিষ্ট না। আজ শব্দটা LLM-এর দিকে আঙুল তোলে, কিন্তু আগে তুলেছে একদম অন্য জিনিসের দিকে। কোনো কৌশল ভরসা করার মতো কাজ করা শুরু করলেই মানুষ তার নতুন নাম দেয়, যেমন "শুধু search" বা "শুধু statistics"। **তখন "AI" নামটা পরের অমীমাংসিত সমস্যায় সরে যায়।** একে বলে AI effect।

#### কোন যুগে "AI" মানে কী ছিল

| যুগ | তখন "AI" মানে |
|---|---|
| ১৯৫০-এর দশক | প্রতীক দিয়ে যুক্তি, দাবার মতো খেলার program |
| ১৯৮০-এর দশক | expert system, হাতে লেখা হাজার হাজার if-then নিয়ম |
| ১৯৯০-এর দশক | খেলার search। Deep Blue ১৯৯৭ সালে Kasparov-কে হারায় |
| ২০০০-এর দশক | spam filter, recommender। তখন নাম ছিল "machine learning" |
| ২০১০-এর দশক | deep learning, ছবি চেনা |
| ২০২০-এর দশক | LLM আর chatbot |

#### একটা কাজ ধরে দেখি

আপনার ম্যানেজার বললেন: *"AI দিয়ে আমাদের release note লেখানো যায়?"* এই প্রশ্নকে কাজের প্রশ্ন বানাতে হলে:

1. **প্রথমে বুঝুন** "AI" এখানে কিছুই ঠিক করে দিচ্ছে না। এটা spec না, শুধু একটা ইচ্ছা।
2. **Input ঠিক করুন।** Release note-এর কাঁচামাল হলো merged PR আর commit message। এগুলো context-এ ঢুকবে।
3. **Model আর harness বাছুন।** এমন harness লাগবে, যে git history পড়তে পারে। Model শুধু লেখা বানায়।
4. **প্রশ্নটা নতুন করে লিখুন:** "Git history পড়তে পারে এমন harness-এ একটা LLM দিয়ে release note-এর খসড়া বানানো যায়?"

**খেয়াল করুন: নতুন প্রশ্নের উত্তর "হ্যাঁ" বা "না" বলা যায়।** পুরনো প্রশ্নে কেউ কারও কথা ধরতে পারছিল না।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| "AI পারে না" একটা পরিষ্কার দাবি | দাবিটার ভেতরে **একটা লুকানো সময় আছে।** কেউ ১৯৮০-র expert system ভাবছে, কেউ গত মাসের LLM। |
| "AI hallucinate করছে" বলা ঠিক | কোন অংশ ভুল করছে, তা বলা হয়নি। আসলে **model আন্দাজ করছে।** হয়তো context-এ দরকারি তথ্যই ছিল না। |
| AI মানে সব সময় LLM | আজ তাই। কাল **নামটা অন্য কিছুতে সরে যাবে**, যেমন আগে বারবার সরেছে। |

**উপমা / Analogy:** নব্বইয়ের দশকে "আধুনিক ফোন" মানে ছিল রঙিন স্ক্রিনের নোকিয়া। এখন মানে স্মার্টফোন। **শব্দ একই, জিনিস বদলে গেছে।** *"Modern phone" meant a colour Nokia in the 1990s and means a smartphone today. Same words, different thing.*

> [!TIP]
> **কাজে লাগান:**
>
> - Technical কথায় "AI" না বলে **কোন অংশের কথা বলছেন, সেটা বলুন:** model, harness, agent নাকি context।
> - তর্ক আটকে গেলে **"AI" শব্দটা বদলে সঠিক নামটা বসান।** তর্কের অর্ধেক এতেই মিটে যায়।
> - "AI coding" নামটা অনুশীলনের লেবেল হিসেবে ঠিক আছে। শুধু যন্ত্রের আচরণ ব্যাখ্যা করতে এটা ব্যবহার করবেন না।

**সম্পর্কিত শব্দ:** [Model](#model--মডেল) · [Harness](#harness--হার্নেস) · [Agent](#agent--এজেন্ট) · [Context](#context--কনটেক্সট)

---

### Model · মডেল

> [!NOTE]
> **এক কথায়:** Model হলো **শুধু প্রশিক্ষিত parameter-এর সমষ্টি।** সে নিজে কিছু করতে পারে না, তাকে harness দিয়ে ঘিরতে হয়।
>
> **In short:** A model is **just the trained parameters**. All it can do is predict the next token, so it needs a harness to be useful.

#### ব্যাপারটা কী?

Claude Code-এ আপনি ফাইল বদলাতে বলেন, আর ফাইল বদলে যায়। তাই মনে হয় model নিজেই সব করছে। **আসলে model ফাইল খুলতে পারে না, command চালাতে পারে না, web দেখতে পারে না, গতকালের কথাও মনে রাখে না।** প্রতি request-এ সে শুধু token নেয় আর token ফেরত দেয়। Agent-এর মতো যা কিছু দেখেন, তা **harness অনেকগুলো prediction পরপর চালিয়ে** বানায়।

#### Model-এর স্তর

| স্তর | কেমন | কখন নেবেন |
|---|---|---|
| বড় model | সবচেয়ে বুদ্ধিমান, কিন্তু ধীর আর দামি | plan, কঠিন debugging |
| ছোট model | দ্রুত আর সস্তা, কিন্তু কম সক্ষম | যান্ত্রিক edit, সহজ কাজ |

#### একটা কাজ ধরে দেখি

একটা session-এ আপনার দুটো কাজ:

1. **৪০টা ফাইলে একটা function-এর নাম বদলাতে হবে।** কাজ যান্ত্রিক, তাই ছোট model নিলেন।
2. কাজ দ্রুত আর সস্তায় শেষ হলো।
3. **এবার একটা race condition।** ছোট model তিনবার চেষ্টা করেও ঠিক করতে পারল না।
4. `/model` দিয়ে বড় model-এ গেলেন। **Session বদলাতে হলো না,** context একই থাকল।
5. এবার bug-টা ধরা পড়ল।

**খেয়াল করুন: model বাছা একটা সিদ্ধান্ত, আর সেটা কাজ ধরে ধরে বদলানো যায়।** তবে বড় model-এ যাওয়ার আগে একবার দেখুন, context-এ দরকারি ফাইল ছিল কিনা।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model মানে Claude Code | Claude Code একটা **harness।** Model তার ভেতরের একটা অংশ। |
| বড় model সব কাজে ভালো | বড় model **ধীর আর দামি।** সহজ কাজে টাকা আর সময় নষ্ট। |
| Model খারাপ উত্তর দিয়েছে, মানে model খারাপ | বেশিরভাগ খারাপ উত্তরের কারণ **context বা harness।** একই model অন্য setup-এ একদম অন্যরকম চলে। |

**উপমা / Analogy:** Model হলো একজন দক্ষ রাঁধুনির মাথা। **চুলা, হাঁড়ি আর বাজার না থাকলে সে কিছুই রাঁধতে পারে না।** *The model is a skilled cook's brain. Without a stove, pots and groceries, it cannot cook anything.*

> [!TIP]
> **কাজে লাগান:**
>
> - কঠিন plan বা কঠিন bug হলে **বড় model**, যান্ত্রিক কাজে ছোট model। **এতে usage-ও বাঁচে।**
> - "Model খারাপ" বলার আগে দেখুন **তাকে কী দেওয়া হয়েছিল।** System prompt আর tool ভুল থাকলে model বদলে লাভ হয় না।

**সম্পর্কিত শব্দ:** [Parameters](#parameters--প্যারামিটার) · [Harness](#harness--হার্নেস) · [Agent](#agent--এজেন্ট) · [Next-token prediction](#next-token-prediction--নেক্সট-টোকেন-প্রেডিকশন)

---

### Parameters · প্যারামিটার

> [!NOTE]
> **এক কথায়:** Parameter হলো model-এর ভেতরের সংখ্যা। **Model যা "জানে", সব এখানেই**, আর training-এর পর এগুলো আর বদলায় না।
>
> **In short:** Parameters are **the numbers inside a model**, set during training and fixed afterwards. Everything the model "knows" lives in them.

#### ব্যাপারটা কী?

Model-এর ভেতরে তাহলে আছে কী? কোনো fact-এর database না, কোনো lookup table-ও না। **আছে শুধু সংখ্যা,** প্রায়ই কয়েক শ কোটি। এদের আরেক নাম weights। Context-এর token এই সংখ্যাগুলোর ভেতর দিয়ে গুণ হয়ে যায়, আর পরের token-এর আন্দাজ বেরিয়ে আসে। সংখ্যাগুলো এমনভাবে সাজানো যে হিসাবের ফল **সাধারণত কাজের হয়।** Training শেষ হলে এগুলো জমে যায়। আপনি session-এ যা-ই করুন, এরা বদলায় না।

#### একটা উদাহরণ

ধরুন আপনি model-কে বললেন: *"আমাদের `formatTaka()` function দিয়ে এই দামগুলো দেখাও।"*

- JavaScript-এর `Array.prototype.map` model **মুখস্থ জানে।** ওটা training-এর লেখায় অসংখ্যবার ছিল, তাই parameter-এ জমেছে। একে বলে parametric knowledge।
- `formatTaka()` আপনার টিমের নিজস্ব function। ওটা কোনো parameter-এ নেই, তাই model **চেনেই না।** আন্দাজে একটা কিছু লিখে ফেলবে।
- ফাইলটা context-এ দিলেই সে ঠিকঠাক ব্যবহার করে। Parameter বদলায়নি, **শুধু হাতের কাছে তথ্য এসেছে।**

**খেয়াল করুন: model-এর জ্ঞান parameter-এ, আপনার project-এর জ্ঞান context-এ।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model-এর ভেতরে fact-এর database আছে | **শুধু সংখ্যা আছে।** Fact খুঁজে আনা হয় না, সংখ্যার হিসাব থেকে বেরোয়। |
| আমার সংশোধন model-কে শেখায় | Session-এ parameter **কখনো বদলায় না।** প্রতিটা session একই সংখ্যায় চলে। |
| Project-এর জন্য model fine-tune করা উচিত | Parameter বদলালে **আসলে একটা আলাদা model তৈরি হয়।** একটা project-এর জন্য codebase context-এ দেওয়া প্রায় সব সময় সস্তা। |

**উপমা / Analogy:** পুরনো রাঁধুনির লবণের "আন্দাজ"। সে মেপে দেয় না, হাতের আন্দাজে দেয়। **ওই আন্দাজ বছরের পর বছর রেঁধে তৈরি, কোনো বইয়ে লেখা নেই।** *An old cook's hand sense for salt. It came from years of cooking and is written in no book.*

> [!TIP]
> **কাজে লাগান:**
>
> - "আমাদের codebase দিয়ে model fine-tune করি?" প্রায় সব সময় উত্তর না। **Codebase context-এ দেওয়াই সস্তা আর সহজ।**
> - Model কিছু না জানলে **দোষ parameter-কে না দিয়ে** ভাবুন, এই তথ্য context-এ পৌঁছেছে কিনা।

**সম্পর্কিত শব্দ:** [Model](#model--মডেল) · [Training](#training--ট্রেনিং) · [Inference](#inference--ইনফারেন্স) · [Knowledge cutoff](#knowledge-cutoff--নলেজ-কাটঅফ)

---

### Training · ট্রেনিং

> [!NOTE]
> **এক কথায়:** Training হলো **parameter ঠিক করার একবারের ব্যয়বহুল কাজ।** এটা provider করে, আপনি করতে পারবেন না।
>
> **In short:** Training is **the one-time, expensive process that sets the parameters**. The model provider does it, not you.

#### ব্যাপারটা কী?

Model এত কিছু জানে কীভাবে? Training-এ তাকে বিশাল পরিমাণ লেখা দেখানো হয়। প্রতিবার সে পরের token আন্দাজ করে, আর **আসল token-এর দিকে parameter সামান্য সরানো হয়।** এটা লক্ষ কোটি token ধরে চলে। কোনো fact বা নিয়ম আলাদা করে জমা হয় না। **ভালো আন্দাজ করতে শিখতে গিয়ে যা জমে, সেটাই model-এর "জ্ঞান"।**

#### Training-এর দুই ধাপ

| ধাপ | কী | আপনার জানা দরকার? |
|---|---|---|
| Pre-training | মূল বড় রান, বিশাল লেখা থেকে | না, দৈনন্দিন কাজে লাগে না |
| Post-training | পরের পরিমার্জন, যেমন নির্দেশ মানা আর নিরাপত্তা | না, একই কথা |

#### একটা কাজ ধরে দেখি

গত মাসে আপনি একটা library-র নতুন major version-এ গেছেন। এরপর:

1. আপনি লিখলেন: *"নতুন API দিয়ে এই page-টা লেখো।"*
2. Model **পুরনো version-এর মতো** code লিখল।
3. কারণ training একটা নির্দিষ্ট সময়ে শেষ হয়েছে। **নতুন version model দেখেইনি।**
4. আপনি library-র নতুন docs context-এ দিলেন।
5. এবার model নতুন API-তেই লিখল।

**খেয়াল করুন: model-কে শেখানোর রাস্তা আপনার হাতে নেই, কিন্তু context-এ দেওয়ার রাস্তা আছে।** আর context-ই একমাত্র জিনিস, যা আপনি নিয়ন্ত্রণ করেন।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model আমার কাজ থেকে শিখে বড় হচ্ছে | Training আগেই শেষ। **এখন যা হয়, তা inference,** তাতে কিছু শেখা হয় না। |
| Training-এ fact আর নিয়ম মুখস্থ করানো হয় | কিছুই আলাদা করে জমা হয় না। **জ্ঞান আসে আন্দাজ ভালো করার পার্শ্বফল হিসেবে।** |
| Internal API বোঝাতে model-কে train করতে হবে | সেটা provider-এর কয়েক মাসের কাজ। **Docs context-এ দেওয়াই আপনার হাতের উপায়।** |

**উপমা / Analogy:** ওস্তাদের কাছে দশ বছর কাজ শেখা। শেখা শেষ, এখন সে দোকান চালায়। **নতুন কিছু জানাতে আবার দশ বছর পড়ানো যায় না, হাতে একটা কাগজ ধরিয়ে দিতে হয়।** *Ten years of apprenticeship under an ustad. You cannot redo that for one new fact, so you hand over a note instead.*

> [!TIP]
> **কাজে লাগান:**
>
> - **"Model-কে শেখাও" না, "context-এ দাও"।** Internal API বোঝাতে docs লোড করুন।
> - নতুন library বা framework-এর কাজে model পুরনো কথা বললে **আগে তার knowledge cutoff-এর কথা ভাবুন।**

**সম্পর্কিত শব্দ:** [Parameters](#parameters--প্যারামিটার) · [Inference](#inference--ইনফারেন্স) · [Knowledge cutoff](#knowledge-cutoff--নলেজ-কাটঅফ) · [Context](#context--কনটেক্সট)

---

### Inference · ইনফারেন্স

> [!NOTE]
> **এক কথায়:** Model ব্যবহার করার প্রতিবারই inference। **প্রতি request-এ model চলে, আর বিল আসে token ধরে।**
>
> **In short:** Inference is **running the trained model to produce output**. It happens on every request, and you pay per token.

#### ব্যাপারটা কী?

Training একবার হয়ে গেছে। তাহলে প্রতিবার model চালালে খরচ হয় কেন? কারণ **প্রতিটা request-এ model provider-এর hardware-এ আবার চলে।** এটাই inference। Training সংখ্যা লেখে, inference শুধু সেই জমানো সংখ্যা **পড়ে** আপনার context-এর উপর চালায়। কিছু ফেরত লেখা হয় না।

<figure class="diagram">
<svg viewBox="0 0 560 140" role="img" aria-label="Training writes the parameters once. The parameters stay frozen. Inference reads them on every request.">
  <defs><marker id="1a-inference-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node up" x="20" y="30" width="120" height="50" rx="10"/><text x="80" y="55">Training</text>
  <path class="arrow" d="M142 55 L186 55" marker-end="url(#1a-inference-arrow)"/>
  <rect class="node" x="190" y="30" width="140" height="50" rx="10"/><text x="260" y="55">Parameters</text>
  <path class="arrow" d="M332 55 L376 55" marker-end="url(#1a-inference-arrow)"/>
  <rect class="node down" x="380" y="30" width="140" height="50" rx="10"/><text x="450" y="55">Inference</text>
  <text class="note" x="80" y="105">writes, once</text>
  <text class="note" x="260" y="105">frozen</text>
  <text class="note" x="450" y="105">reads, every request</text>
</svg>
<figcaption>Training writes the numbers once, inference only reads them. Training একবার সংখ্যা লেখে, inference প্রতি request-এ শুধু পড়ে।</figcaption>
</figure>

#### একটা কাজ ধরে দেখি

1. Model আপনার code-এ `var` লিখল। আপনি বললেন: *"`const` ব্যবহার করো।"* সে ঠিক করে দিল।
2. পরদিন নতুন session খুললেন। **Model আবার `var` লিখল।**
3. কারণ inference-এ parameter-এ কিছু ফেরত লেখা হয় না। সে আপনাকে অবহেলা করেনি, **ওই কথোপকথন থেকে শেখার ক্ষমতাই তার নেই।**
4. আপনি `CLAUDE.md`-তে লিখে দিলেন: "`const` ব্যবহার করো, `var` না।"
5. এখন harness ফাইলটা প্রতি request-এ context-এ জুড়ে দেয়, আর ভুলটা আর হয় না।

**খেয়াল করুন: ধারাবাহিকতা আসে model-এর বাইরে থেকে,** context window বা memory system দিয়ে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Training-এর পর model চালানো প্রায় বিনামূল্যে | Training-এর চেয়ে সস্তা, কিন্তু **model ব্যবহারের প্রধান খরচ এটাই।** |
| একটা message মানে একটা inference-এর খরচ | Agent ডজনখানেক tool call করলে **প্রতিটা যাওয়া-আসায় আলাদা inference-এর বিল।** |
| Model আজ শিখল, কাল মনে রাখবে | Inference-এ কিছু লেখা হয় না। **কাল আবার একই ভুল হতে পারে।** |

**উপমা / Analogy:** রাঁধুনি রান্না শিখেছে একবার (training)। কিন্তু **প্রতিটা অর্ডার রাঁধতে গ্যাস আর সময় লাগে (inference),** আর বিল আসে প্রতি অর্ডারে। *The cook learned once (training), but every order costs gas and time (inference). You pay per order.*

> [!TIP]
> **কাজে লাগান:**
>
> - স্থায়ী সংশোধন **`CLAUDE.md`-এ লিখুন।** কথোপকথনে বললে সেটা শুধু ওই session-এ টেকে।
> - Context ছোট রাখা **শুধু মানের না, খরচেরও প্রশ্ন।** প্রতি request পুরো context-এর উপর চলে।

**সম্পর্কিত শব্দ:** [Training](#training--ট্রেনিং) · [Parameters](#parameters--প্যারামিটার) · [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Memory system](#memory-system--মেমোরি-সিস্টেম)

---

### Effort · এফর্ট

> [!NOTE]
> **এক কথায়:** Effort হলো **উত্তর দেওয়ার আগে model কতক্ষণ ভাববে, সেই নব।**
>
> **In short:** Effort is **a dial for how long the model thinks** before it answers. More thinking costs more and takes longer.

#### ব্যাপারটা কী?

Model লেখা শুরুর আগে কি ভাবে? হ্যাঁ, আর কতক্ষণ ভাববে, সেটা আপনি ঠিক করতে পারেন। এটাই effort। প্রতিটা request-এ আলাদা করে সেট হয়। ভাবনাটাও token হিসেবে এক এক করে লেখা হয়, তাই **বেশি effort মানে বেশি খরচ আর বেশি দেরি।** Harness প্রায়ই ভাবনাটা লুকিয়ে রাখে, কিন্তু **না দেখলেও সেটা output token হিসেবে বিল হয়।**

#### Effort-এর স্তর

| স্তর | কোন কাজে |
|---|---|
| Low | যান্ত্রিক edit, lookup, একটাই পরিষ্কার পথ আছে এমন কাজ |
| Medium | রোজকার coding, সাধারণ default |
| High | কঠিন bug, design সিদ্ধান্ত, বহু ধাপের plan |
| Max | সবচেয়ে কঠিন সমস্যা, যেখানে ভুল উত্তর ফেরানো ব্যয়বহুল |

#### একটা কাজ ধরে দেখি

একটা concurrency bug নিয়ে আপনি আটকে আছেন:

1. আপনি default effort-এ bug-টা বোঝালেন। Model একটা fix দিল, কিন্তু **কাজ হলো না।**
2. আবার বোঝালেন, আবার ভুল। তৃতীয়বারও তাই।
3. এটা ভাবনা-নির্ভর bug, আর **default setting-এ model একটা পথ বেছে নেওয়ার আগে যথেষ্ট ভাবছে না।**
4. আপনি effort High করলেন। Model এবার race-এর আসল কারণ ধরল।
5. Bug ঠিক হওয়ার পর পরের যান্ত্রিক rename-টা আবার Low-তে করলেন।

**খেয়াল করুন: effort কাজ দেখে ঠিক হয়, পুরো session দেখে না।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Effort সব সময় বেশি রাখাই নিরাপদ | এক লাইনের rename-এ Max দিলে **লম্বা ভাবনার পরও ফল Low-র সমান।** শুধু টাকা আর সময় যায়। |
| Effort কম দিলে শুধু উত্তর ছোট হয় | কঠিন সমস্যায় কম দিলে উত্তর **আত্মবিশ্বাসী কিন্তু ভাসা ভাসা হয়।** দেখতে ঠিক, পরে খরচ বাড়ায়। |
| যে ভাবনা দেখা যায় না, তা বিনামূল্যে | ভাবনা **output token হিসেবে বিল হয়,** দেখুন বা না দেখুন। |

**উপমা / Analogy:** পরীক্ষায় MCQ-তে এক মিনিট ভাবলেই হয়, সৃজনশীল প্রশ্নে আগে ভেবে কাঠামো সাজাতে হয়। **MCQ-তে আধা ঘণ্টা ভাবা সময় নষ্ট।** *An MCQ needs a minute, a creative question needs planning. Half an hour on an MCQ is waste.*

> [!TIP]
> **কাজে লাগান:**
>
> - **একই bug তিনবার বুঝিয়েও ঠিক না হলে effort বাড়ান।** Claude Code-এ effort level বদলানো যায়।
> - যে অংশ সত্যিই কঠিন, শুধু সেখানে বাড়ান। **আশেপাশের যান্ত্রিক কাজে আবার কমিয়ে দিন।**

**সম্পর্কিত শব্দ:** [Model](#model--মডেল) · [Output tokens](#output-tokens--আউটপুট-টোকেন) · [Inference](#inference--ইনফারেন্স) · [Token](#token--টোকেন)

---

### Token · টোকেন

> [!NOTE]
> **এক কথায়:** Token হলো **model-এর পড়া আর লেখার একক।** বিল, গতি আর context-এর জায়গা, সবই token-এ মাপা হয়।
>
> **In short:** A token is **the unit a model reads and writes**, about three quarters of an English word on average.

#### ব্যাপারটা কী?

Model কি আমাদের মতো অক্ষর বা শব্দ পড়ে? না। **Tokenizer লেখাকে আগে ছোট ছোট টুকরোর সারিতে ভেঙে ফেলে,** আর model শুধু সেই টুকরোই দেখে। Output-ও আসে এক টুকরো করে। টুকরোর তালিকা স্থির, training-এর আগেই শেখা। মোটামুটি হিসাব: **এক হাজার token প্রায় ৭৫০ ইংরেজি শব্দ।** চেনা শব্দ এক token, বিরল বা লম্বা শব্দ ভেঙে কয়েক token।

<figure class="diagram">
<svg viewBox="0 0 560 170" role="img" aria-label="The word function is one token. A hash of the same length is split into four tokens.">
  <text class="start" x="20" y="50">common word</text>
  <rect class="node down" x="200" y="30" width="110" height="40" rx="8"/><text x="255" y="50">function</text>
  <text class="note" x="500" y="50">1 token</text>
  <text class="start" x="20" y="110">hash</text>
  <rect class="node up" x="200" y="90" width="50" height="40" rx="8"/><text x="225" y="110">a3</text>
  <rect class="node up" x="260" y="90" width="50" height="40" rx="8"/><text x="285" y="110">f9</text>
  <rect class="node up" x="320" y="90" width="50" height="40" rx="8"/><text x="345" y="110">c2</text>
  <rect class="node up" x="380" y="90" width="50" height="40" rx="8"/><text x="405" y="110">e1</text>
  <text class="note" x="500" y="110">4 tokens</text>
  <text class="note" x="280" y="155">same length, very different token count</text>
</svg>
<figcaption>An example split: the real split depends on the tokenizer. একই দৈর্ঘ্যের দুটো লেখা, token সংখ্যা আলাদা।</figcaption>
</figure>

#### Token দিয়ে কী কী মাপা হয়

| কী | কীভাবে token-এ মাপা হয় |
|---|---|
| বিল | input আর output token আলাদা করে |
| গতি | প্রতি সেকেন্ডে কত token, কারণ output এক token করে আসে |
| Context window | একটা নির্দিষ্ট token সংখ্যা, ফাইলের token-ই ঠিক করে কতটা ঢুকবে |

#### একটা উদাহরণ

আপনার কাছে দুটো ফাইল আছে, দুটোরই দৈর্ঘ্য সমান।

- প্রথমটা সাধারণ source code। `function`, `return`, `const` এগুলো চেনা শব্দ, **কম token নেয়।**
- দ্বিতীয়টা একটা minified bundle, ভরা hash আর অদ্ভুত নামে। **কুচি কুচি হয়ে অনেক বেশি token খায়।**

দ্বিতীয় ফাইলটা context-এ দিলে window-র অনেকটা জায়গা চলে যাবে, অথচ দেখতে ছোট। **নিয়মটা হলো:** যে লেখা tokenizer-এর উৎসে বারবার ছিল, সে ছোট করে লেখা হয়। যা ছিল না, সেটা ভেঙে যায়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Token মানে শব্দ | Token আর শব্দের সীমানা মেলে না। **আসল একক token প্রতি সেকেন্ড আর token প্রতি ডলার।** |
| ছোট দেখতে ফাইল মানে কম token | Hash, base64 আর minified output **একেকটা "শব্দে" অনেক token খায়।** |
| Model অক্ষর দেখে | Model **অক্ষর বা শব্দ দেখেই না।** ঢোকার সময় সবই token হয়ে যায়। |

**উপমা / Analogy:** মোবাইল ডেটার MB। বিল, গতি আর প্যাকেজের সীমা, সবই MB-তে। **ছোট দেখতে একটা ভিডিও অনেক MB খেতে পারে।** *Like mobile data in MB: bill, speed and package limit all use it, and a short-looking video can eat a lot.*

> [!TIP]
> **কাজে লাগান:**
>
> - **বিশাল log, minified ফাইল বা JSON dump পুরোটা পড়াবেন না।** শুধু দরকারি অংশ দিন।
> - Prompt কত বড় হবে জানতে চাইলে **tokenizer দিয়ে মেপে দেখুন।** চোখের আন্দাজে ভরসা করবেন না।

**সম্পর্কিত শব্দ:** [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Output tokens](#output-tokens--আউটপুট-টোকেন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Next-token prediction](#next-token-prediction--নেক্সট-টোকেন-প্রেডিকশন)

---

### Next-token prediction · নেক্সট-টোকেন প্রেডিকশন

> [!NOTE]
> **এক কথায়:** Model আসলে একটাই কাজ করে: **context দেখে একটা token বাছে, জুড়ে দেয়, আবার চালায়।**
>
> **In short:** Next-token prediction is **the only thing a model does**: look at the context, pick one token, append it, repeat.

#### ব্যাপারটা কী?

Model উত্তর লেখে, code লেখে, এমনকি tool চালানোর অনুরোধও লেখে। তাহলে কি তার ভেতরে আলাদা আলাদা ক্ষমতা আছে? না। **সবই একই কাজ:** এক token বাছো, context-এ জুড়ে দাও, আবার চালাও। বাক্য, tool call, হাজার লাইনের ফাইল, সবই এক token করে তৈরি। প্রতিটা ধাপে model **vocabulary-র প্রতিটা token-এর জন্য একটা সম্ভাবনা** বের করে, তারপর তার থেকে একটা বাছে।

#### একটা কাজ ধরে দেখি

ধরুন context-এ শুধু এটুকু আছে: `The capital of Bangladesh is`

1. Context-এর token parameter-এর ভেতর দিয়ে যায়।
2. বেরোয় সম্ভাবনার তালিকা: `Dhaka` অনেক বেশি সম্ভাব্য, `Chittagong` খুব কম।
3. তালিকা থেকে **একটা token বাছা হয়।** সম্ভবত `Dhaka`, কিন্তু সব সময় না।
4. বাছা token context-এর শেষে জুড়ে যায়, আর লুপ **একটু লম্বা context নিয়ে আবার চলে।**
5. এভাবে শেষ token পর্যন্ত যায়।

**খেয়াল করুন: বাছাইয়ের ধাপে এলোমেলোভাব আছে,** তাই একই prompt-এ প্রতিবার আলাদা উত্তর আসতে পারে। এটা পদ্ধতির নিজের অংশ, উপরে বসানো কোনো bug না।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model token লেখার আগে দেখে নেয় সেটা সত্য কিনা | সে শুধু দেখে token **সম্ভাব্য কিনা।** Hallucination-এর মূল কারণ এটাই। |
| Agent "ঠিক করে" কোন tool চালাবে | সবই next-token prediction। **Tool call একটা সাজানো string,** যা harness output থেকে পড়ে চালায়। |
| শুরুতে ভুল করলে model পরে শুধরে নেবে | Token লিখে ফেললে ফেরা যায় না, তাই **শুরুর একটা আত্মবিশ্বাসী বাক্য পুরো উত্তর ভুল দিকে নিতে পারে।** |

**উপমা / Analogy:** ফোনের কীবোর্ডে পরের শব্দের suggestion। "আসসালামু" লিখলে "আলাইকুম" দেখায়। **Model হলো এরই অনেক অনেক বড় রূপ।** *Your phone keyboard's next-word suggestion, scaled up enormously.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent "tool চালানোর সিদ্ধান্ত নেয়" ভাববেন না। **Tool call-ও শুধু token, harness সেটা পড়ে চালায়।**
> - Model-এর আত্মবিশ্বাসী সুরকে প্রমাণ ধরবেন না। **সে সম্ভাব্য token বাছে, সত্য না।** গুরুত্বপূর্ণ দাবি test বা source দিয়ে যাচাই করুন।
> - Output এক token করে আসে, তাই **generation-এর গতিই যেকোনো agent-এর গতির নিচের সীমা।**

**সম্পর্কিত শব্দ:** [Token](#token--টোকেন) · [Non-determinism](#non-determinism--নন-ডিটারমিনিজম) · [Hallucination](#hallucination--হ্যালুসিনেশন) · [Tool call](#tool-call--টুল-কল)

---

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="Tokens 'The cat sat on the' go into the model, which scores candidates for the next token: mat 71 percent, floor 12 percent, sofa 6 percent.">
  <defs><marker id="d2-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="84" y="20" width="72" height="40" rx="6"/><text x="120" y="40">The</text>
  <rect class="node" x="164" y="20" width="72" height="40" rx="6"/><text x="200" y="40">cat</text>
  <rect class="node" x="244" y="20" width="72" height="40" rx="6"/><text x="280" y="40">sat</text>
  <rect class="node" x="324" y="20" width="72" height="40" rx="6"/><text x="360" y="40">on</text>
  <rect class="node" x="404" y="20" width="72" height="40" rx="6"/><text x="440" y="40">the</text>
  <path class="arrow" marker-end="url(#d2-arrow)" d="M280 62 L280 92"/>
  <rect class="node down" x="210" y="95" width="140" height="40" rx="8"/><text x="280" y="115">Model</text>
  <path class="arrow" marker-end="url(#d2-arrow)" d="M280 137 L280 160"/>
  <text class="start" x="100" y="180">mat</text><rect class="up" x="160" y="172" width="213" height="16"/><text class="note start" x="381" y="180">71%</text>
  <text class="start" x="100" y="206">floor</text><rect class="down" x="160" y="198" width="36" height="16"/><text class="note start" x="204" y="206">12%</text>
  <text class="start" x="100" y="232">sofa</text><rect class="down" x="160" y="224" width="18" height="16"/><text class="note start" x="186" y="232">6%</text>
</svg>
<figcaption>The model scores every possible next token. One is picked, added to the input, and the loop runs again. That is all a model does. Model শুধু পরের token আন্দাজ করে, বারবার।</figcaption>
</figure>

### Non-determinism · নন-ডিটারমিনিজম

> [!NOTE]
> **এক কথায়:** Non-determinism হলো **একই prompt-এ প্রতিবার আলাদা উত্তর আসতে পারা**, আপনার কোড একটুও না বদলালেও।
>
> **In short:** Non-determinism means **the same input can give a different output**, even when nothing in your setup changed.

#### ব্যাপারটা কী?

কাল যে prompt-এ চমৎকার উত্তর পেলেন, আজ সেটাই দিয়ে পেলেন এলোমেলো কিছু। **Model কি খারাপ হয়ে গেল?** সাধারণত না। প্রতিটা ধাপে model পরের token-এর একটা সম্ভাবনার তালিকা বানায়, আর সেখান থেকে **লটারির মতো একটা token বাছা হয়।** শুরুর একটা token আলাদা হলে বাকি পুরো উত্তর অন্য পথে চলে যায়।

<figure class="diagram">
<svg viewBox="0 0 560 210" role="img" aria-label="A list of next-token odds: return 55 percent, throw 25 percent, yield 15 percent. Run 1 picks return, run 2 picks throw.">
  <defs><marker id="1b-nondeterminism-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="note" x="190" y="16">next-token odds</text>
  <text class="start" x="20" y="50">return 55%</text><rect class="node down" x="130" y="35" width="220" height="30" rx="6"/>
  <text class="start" x="20" y="100">throw 25%</text><rect class="node up" x="130" y="85" width="100" height="30" rx="6"/>
  <text class="start" x="20" y="150">yield 15%</text><rect class="node" x="130" y="135" width="60" height="30" rx="6"/>
  <path class="arrow" d="M358 50 L395 50" marker-end="url(#1b-nondeterminism-arrow)"/>
  <path class="arrow" d="M238 100 L395 100" marker-end="url(#1b-nondeterminism-arrow)"/>
  <rect class="node down" x="400" y="30" width="150" height="40" rx="8"/><text x="475" y="50">run 1: return</text>
  <rect class="node up" x="400" y="80" width="150" height="40" rx="8"/><text x="475" y="100">run 2: throw</text>
  <text class="note" x="280" y="192">same prompt, different pick each run</text>
</svg>
<figcaption>একই তালিকা থেকে প্রতিবার আলাদা token বাছা হতে পারে (সংখ্যাগুলো উদাহরণ)। The same odds can produce a different pick on every run (numbers are illustrative).</figcaption>
</figure>

#### কেন উত্তর বদলায়

| কারণ | কী ঘটে |
|---|---|
| Sampling | সম্ভাবনা ধরে token বাছা হয়। ইচ্ছা করেই একটু randomness রাখা হয়, নইলে লেখা একঘেয়ে হয়। |
| শিকল-প্রভাব | প্রতিটা token আগেরগুলোর উপর দাঁড়ায়। তাই শুরুর একটা আলাদা token পুরো পথ বদলে দেয়। |
| Provider-এর hardware | অনেকের request একসাথে চলে। হিসাবের খুব ছোট পার্থক্যে দুই কাছাকাছি token-এর ফল উল্টে যায়। |

#### একটা কাজ ধরে দেখি

আপনি agent-কে বললেন: *"এই function-এ null check যোগ করো।"*

1. **প্রথমবার** agent দুই লাইন যোগ করল, test pass করল।
2. সন্ধ্যায় **একই prompt** আবার দিলেন। এবার সে পুরো function নতুন করে লিখল, আর একটা test ভাঙল।
3. মনে হলো, model খারাপ হয়ে গেছে। কিন্তু দুটো আসলে **দুটো আলাদা দান।**
4. Session `/clear` করে আবার দিলেন। তৃতীয়বারে কাজ ঠিক হলো।
5. এবার **test চালিয়ে** দেখে নিলেন, কারণ একবার ঠিক হওয়া মানে পরেরবারও ঠিক হবে, এমন নিশ্চয়তা নেই।

**খেয়াল করুন: একটা খারাপ ফল মানে শুধু একটা খারাপ দান।** আবার চেষ্টা করা আর test দিয়ে যাচাই করা, দুটোই বৈধ কৌশল।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| একবার ঠিক কাজ করেছে, পরেরবারও করবে | কোনো নিশ্চয়তা নেই। **Automated check দিয়ে খারাপ ফল ধরতে হয়।** |
| কয়েকবার খারাপ হলে model খারাপ হয়ে গেছে | বেশিরভাগ সময় এটা **স্বাভাবিক ওঠানামা।** মানুষ সবখানে প্যাটার্ন দেখে। |
| সব randomness বন্ধ করার কোনো setting আছে | **পুরোটা বন্ধ করার switch নেই।** Provider-এর দিকেও ছোট পার্থক্য থেকে যায়। |

**উপমা / Analogy:** মায়ের রান্না। একই রেসিপি, একই হাত, তবু রোজ স্বাদ একটু আলাদা। **একদিন খারাপ হলে মা রান্না ভুলে যাননি।** *Mum's cooking: same recipe, same hands, a slightly different taste every day. One bad day does not mean she forgot how to cook.*

> [!TIP]
> **কাজে লাগান:**
>
> - উত্তর খারাপ এলে কারণ খোঁজার আগে **একবার আবার চেষ্টা করুন।**
> - Agent-এর কাজ **test দিয়ে যাচাই করুন**, শুধু চোখে দেখে ভরসা করবেন না।

**সম্পর্কিত শব্দ:** [Next-token prediction](#next-token-prediction--নেক্সট-টোকেন-প্রেডিকশন) · [Token](#token--টোকেন) · [Model](#model--মডেল) · [Automated check](#automated-check--অটোমেটেড-চেক)

---

### Model provider · মডেল প্রোভাইডার

> [!NOTE]
> **এক কথায়:** Model provider হলো **যে service আপনার হয়ে model চালায়**, তাই rate limit, slowdown আর outage এখান থেকেই আসে, model থেকে না।
>
> **In short:** A model provider is **the service that runs the model for you**, so rate limits, slowdowns and outages come from here, not from the model.

#### ব্যাপারটা কী?

Claude Code চালাতে গিয়ে হঠাৎ "rate limit" error এল। আপনার কোড ঠিক, `CLAUDE.md` ঠিক, তাহলে দোষ কার? **অনেক সময় provider-এর।** Model আসলে চলে provider-এর hardware-এ। **Harness নিজে model চালায় না**, সে network দিয়ে token পাঠায় আর prediction ফেরত নেয়। তাই এক গোছা সমস্যা এখানেই থাকে, যেমন rate limit, ক্ষমতা কমে যাওয়া আর outage।

#### Remote বনাম local provider

| | Remote provider | Local provider |
|---|---|---|
| উদাহরণ | Anthropic, OpenAI, Google | Ollama, LM Studio, llama.cpp |
| Model কোথায় চলে | দূরের service-এ | আপনার নিজের মেশিনে |
| ক্ষমতা | সেরা model পাওয়া যায় | ছোট model, ক্ষমতা কম |
| ডেটা | provider-এর কাছে যায় | মেশিনের বাইরে যায় না |
| খরচ | token প্রতি বিল | token প্রতি বিল নেই |

#### একটা কাজ ধরে দেখি

বিকেলে agent দিয়ে কাজ করছেন। হঠাৎ প্রতিটা turn-এ error আসতে লাগল।

1. আপনার প্রথম সন্দেহ নিজের setup: `CLAUDE.md`, hook, permission। কিন্তু সকালে এগুলো ঠিকই চলছিল।
2. **Provider-এর status page** খুললেন। সেখানে লেখা, capacity নিয়ে সমস্যা চলছে।
3. আপনি কিছুক্ষণ অপেক্ষা করলেন। চাইলে `/model` দিয়ে অন্য model-এও যেতে পারতেন।
4. সমস্যা মিটলে আগের session-ই আবার চলল, কিছু বদলাতে হয়নি।

**খেয়াল করুন: নিজের setup ঘাঁটার আগে status page দেখা এক মিনিটের কাজ।** অথচ এতে ঘণ্টাখানেক বাঁচতে পারে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Error এলে model বা harness-এর দোষ | **Rate limit, ক্ষমতা কমা আর outage provider-এর।** মানুষ ভুল করে দোষ দেয় model-কে। |
| Provider আর model-এর নির্মাতা একই কোম্পানি | সবসময় না। **Bedrock, Vertex বা OpenRouter অন্যের বানানো model-ও চালায়।** |
| Local provider সবদিকে ভালো | **নিয়ন্ত্রণ বাড়ে, ক্ষমতা কমে।** নিজের hardware-এ যে model ধরে, তা সেরার চেয়ে অনেক ছোট। |

**উপমা / Analogy:** বিদ্যুৎ অফিস, যেমন DESCO বা পল্লী বিদ্যুৎ। আপনার বাসার wiring নিখুঁত হলেও লোডশেডিংয়ে পাখা ঘোরে না। **দোষ wiring-এর না।** *The power company: your house wiring can be perfect, but during load-shedding the fan still stops. The wiring is not at fault.*

> [!TIP]
> **কাজে লাগান:**
>
> - প্রতি turn-এ error আসছে বা agent মাঝপথে আটকে গেছে? **আগে provider-এর status page দেখুন।**
> - দাম, cache-এর ছাড় আর কোন model পাওয়া যাবে, সব **provider ঠিক করে।** বিল বুঝতে তার pricing page পড়ুন।

**সম্পর্কিত শব্দ:** [Harness](#harness--হার্নেস) · [Model provider request](#model-provider-request--মডেল-প্রোভাইডার-রিকোয়েস্ট) · [Model](#model--মডেল) · [Input tokens](#input-tokens--ইনপুট-টোকেন)

---

### Harness · হার্নেস

> [!NOTE]
> **এক কথায়:** Harness হলো **model-কে ঘিরে থাকা সব যন্ত্রপাতি**, যা একটা model-কে কাজের agent বানায়।
>
> **In short:** A harness is **everything around the model that turns it into an agent**: tools, prompts, permissions and memory. Claude Code, Cursor and Codex CLI are harnesses.

#### ব্যাপারটা কী?

Model নিজে শুধু লেখা পড়ে আর লেখা লেখে। সে ফাইল খুলতে পারে না, terminal-এ command চালাতে পারে না, এমনকি আপনার আগের message-ও মনে রাখে না। **তাহলে Claude Code কীভাবে আপনার code পড়ে, test চালায়, ফাইল বদলায়?** উত্তর: harness। Model শুধু বলে "এই ফাইলটা পড়তে চাই"। **আসল কাজটা করে harness।**

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="The model sits in the middle. Around it the harness provides the system prompt, context, memory, tools, permissions and hooks.">
  <rect class="node skip" x="20" y="20" width="520" height="210" rx="16"/>
  <text class="start" x="36" y="38">Harness</text>
  <path class="edge" d="M190 80 L220 112 M190 125 L220 125 M190 170 L220 138 M370 80 L340 112 M370 125 L340 125 M370 170 L340 138"/>
  <rect class="node" x="40" y="60" width="150" height="40" rx="8"/><text x="115" y="80">system prompt</text>
  <rect class="node" x="40" y="105" width="150" height="40" rx="8"/><text x="115" y="125">context</text>
  <rect class="node" x="40" y="150" width="150" height="40" rx="8"/><text x="115" y="170">memory</text>
  <rect class="node" x="370" y="60" width="150" height="40" rx="8"/><text x="445" y="80">tools</text>
  <rect class="node" x="370" y="105" width="150" height="40" rx="8"/><text x="445" y="125">permissions</text>
  <rect class="node" x="370" y="150" width="150" height="40" rx="8"/><text x="445" y="170">hooks</text>
  <rect class="node down" x="220" y="100" width="120" height="50" rx="10"/><text x="280" y="125">Model</text>
  <text class="note" x="280" y="212">the model writes text, the harness does the rest</text>
</svg>
<figcaption>Model মাঝখানে, চারপাশের সবকিছু harness। The model sits in the middle; everything around it is the harness.</figcaption>
</figure>

#### Harness-এর ভেতরে কী কী থাকে

| অংশ / Part | কী করে | Claude Code-এ উদাহরণ |
|---|---|---|
| System prompt | প্রতি request-এর শুরুতে স্থায়ী নির্দেশ জোড়ে | built-in prompt আর আপনার `CLAUDE.md` |
| Tools | Model-এর হয়ে আসল কাজ করে | `Read`, `Edit`, `Bash` |
| Permissions | কোন কাজের আগে আপনার অনুমতি লাগবে, ঠিক করে | permission mode, `settings.json` |
| Context | প্রতি request-এ কী যাবে আর কখন compact হবে, ঠিক করে | autocompact, `/compact` |
| Memory | Session পেরিয়ে কিছু মনে রাখার ব্যবস্থা | memory ফাইল |
| Hooks | নির্দিষ্ট মুহূর্তে আপনার নিজের script চালায় | কোনো ফাইল edit-এর পরে formatter |

#### একটা কাজ ধরে দেখি

আপনি লিখলেন: *"test-টা fail করছে, ঠিক করো।"* তারপর যা যা হয়:

1. **Harness** আপনার message-এর সাথে system prompt আর `CLAUDE.md` জুড়ে model-কে পাঠায়।
2. **Model** লেখে: "`npm test` চালাতে চাই।" এটা শুধু একটা লেখা অনুরোধ, মানে tool call।
3. **Harness** permission দেখে, command চালায়, আর test-এর output model-কে ফেরত পাঠায়।
4. **Model** ফাইল পড়তে চায়, তারপর edit করতে চায়। প্রতিবার harness কাজটা করে, দরকার হলে আগে আপনার অনুমতি নেয়।
5. **Model** আর কোনো tool না চাইলে harness উত্তরটা আপনাকে দেখায়।

**খেয়াল করুন: পুরো কাজে model একটা command-ও নিজে চালায়নি।** সে শুধু লিখেছে, বাকি সব করেছে harness।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Claude.ai আর Claude Code একই জিনিস | Model একই হতে পারে, কিন্তু **harness আলাদা।** Claude Code-এ ফাইল আর terminal-এর tool আছে, Claude.ai-তে নেই। তাই আচরণও আলাদা। |
| আজ agent খারাপ চলছে, মানে model খারাপ হয়ে গেছে | প্রায়ই বদলেছে **harness:** নতুন system prompt, নতুন tool, বা permission-এর নতুন default। |
| `CLAUDE.md` model-কে শেখায় | Model কিছুই শেখে না। **Harness ফাইলটা পড়ে প্রতি request-এ জুড়ে দেয়।** |

**উপমা / Analogy:** একই ইঞ্জিন বাসের বডিতে বসালে বাস, ট্রাকের বডিতে বসালে ট্রাক। Steering, meter, সিট, মালের জায়গা, সব আলাদা। **ইঞ্জিন হলো model, বাকি সব harness।** *The same engine becomes a bus or a truck depending on the body built around it.*

> [!TIP]
> **কাজে লাগান:**
>
> - কাল আর আজকের আচরণ আলাদা লাগলে **আগে harness-এর পরিবর্তন খুঁজুন:** update, নতুন setting, নতুন tool।
> - `CLAUDE.md`, permission আর hook **harness-কে দেওয়া নির্দেশ।** Agent-এর আচরণ বদলাতে চাইলে এখানেই হাত দিন।

**সম্পর্কিত শব্দ:** [Model](#model--মডেল) · [Agent](#agent--এজেন্ট) · [System prompt](#system-prompt--সিস্টেম-প্রম্পট) · [Tool call](#tool-call--টুল-কল)

---

### Model provider request · মডেল প্রোভাইডার রিকোয়েস্ট

> [!NOTE]
> **এক কথায়:** Model provider request হলো **harness থেকে provider-এ একবার যাওয়া আর ফেরত আসা।** একটা প্রশ্নে অনেক request হতে পারে, আর বিল হয় request ধরে।
>
> **In short:** A model provider request is **one round trip from the harness to the provider**. One question can trigger many, and billing counts them one by one.

#### ব্যাপারটা কী?

একটা ছোট প্রশ্ন করলেন, অথচ usage-এ অনেক token খরচ। **কোথায় গেল?** আপনার একটা message আসলে একটা request না। Agent প্রতিবার tool চালালে একটা নতুন request যায়। আর model-এর স্মৃতি নেই, তাই **প্রতিটা request-এ system prompt, পুরো কথোপকথন আর সব tool result আবার যায়।** Provider একটা request-এর উত্তরে শুধু একটাই জিনিস ফেরত দেয়: হয় tool call, নয় শেষ উত্তর।

<figure class="diagram">
<svg viewBox="0 0 560 260" role="img" aria-label="The harness sends three requests to the provider. Each carries a bigger context. The provider answers with a tool call twice and a final answer last.">
  <defs><marker id="1b-modelproviderrequest-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="20" y="15" width="120" height="230" rx="12"/><text x="80" y="130">Harness</text>
  <rect class="node down" x="420" y="15" width="120" height="230" rx="12"/><text x="480" y="130">Provider</text>
  <text class="note" x="280" y="36">request 1: context</text>
  <path class="arrow" d="M150 48 L410 48" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <path class="arrow" d="M410 64 L150 64" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <text class="note" x="280" y="80">tool call: grep</text>
  <text class="note" x="280" y="108">request 2: bigger context</text>
  <path class="arrow" d="M150 120 L410 120" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <path class="arrow" d="M410 136 L150 136" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <text class="note" x="280" y="152">tool call: edit</text>
  <text class="note" x="280" y="180">request 3: bigger still</text>
  <path class="arrow" d="M150 192 L410 192" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <path class="arrow" d="M410 208 L150 208" marker-end="url(#1b-modelproviderrequest-arrow)"/>
  <text class="note" x="280" y="224">final answer</text>
</svg>
<figcaption>একটা turn-এ তিনটা request, প্রতিবার context বড় হয়। One turn, three requests, and the context grows each time.</figcaption>
</figure>

#### Turn বনাম request

| | Turn | Request |
|---|---|---|
| মানে | আপনার সাথে একবার কথা | harness আর provider-এর একবার যাওয়া-আসা |
| শুরু করে | আপনি | harness |
| এক turn-এ কয়টা | একটাই | একটা শিকলে অনেকগুলো |
| বিলের একক | না | হ্যাঁ |

#### একটা কাজ ধরে দেখি

আপনি লিখলেন: *"checkout button-এর লেখা বদলে 'Pay now' করো।"* এটা এক turn।

1. **Request 1:** harness context পাঠায়। Provider ফেরত দেয় একটা tool call: "পুরনো লেখাটা `grep` দিয়ে খোঁজো।"
2. Harness grep চালায়, তারপর **আগের সব কিছু আর grep-এর result সহ** request 2 পাঠায়। উত্তর: "এই লাইনটা edit করো।"
3. Harness edit করে, তারপর **আরও বড় context নিয়ে** request 3 পাঠায়।
4. এবার provider ফেরত দেয় শেষ উত্তর: "লেখা বদলে দিয়েছি।"

**খেয়াল করুন: এক turn, তিনটা request, আর তিনবারই পুরো context গেছে।** টাকা খরচ হয়েছে তিনবারের হিসাবে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| একটা message মানে একটা request | **প্রতিটা tool result আরেকটা request ডেকে আনে।** |
| খরচ আমার message-এর সমান | **খরচ = request-এর সংখ্যা × প্রতিটার context-এর আকার।** |
| Provider আগের request মনে রাখে | **Provider দুই request-এর মাঝে কিছুই রাখে না।** তাই সবটা আবার পাঠাতে হয়। Prefix cache শুধু দাম কমায়। |

**উপমা / Analogy:** এমন এক ওস্তাদকে ফোন করা, যার কিছু মনে থাকে না। প্রতিবার **শুরু থেকে সব বলতে হয়**, তারপর নতুন প্রশ্ন। দশবার ফোন মানে দশবার পুরো গল্প। *Calling an ustad who remembers nothing: every call you retell the whole story first, then ask the new question.*

> [!TIP]
> **কাজে লাগান:**
>
> - ছোট প্রশ্নে অনেক token গেলে **turn না, request গুনুন।** Tool call-এর সংখ্যা দেখলেই কারণ বোঝা যায়।
> - কাজ শেষ হলে `/clear` করুন, যাতে **পরের কাজের প্রতিটা request ছোট context** নিয়ে যায়।

**সম্পর্কিত শব্দ:** [Turn](#turn--টার্ন) · [Tool call](#tool-call--টুল-কল) · [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Prefix cache](#prefix-cache--প্রিফিক্স-ক্যাশ)

---

### Input tokens · ইনপুট টোকেন

> [!NOTE]
> **এক কথায়:** Input token হলো **প্রতি request-এ model-কে পাঠানো সবকিছু।** প্রতিটার দাম কম, কিন্তু মোট হিসাবে এটাই সাধারণত বিলের বড় অংশ।
>
> **In short:** Input tokens are **everything sent to the model on each request**. Each one is cheap, but together they are usually most of the bill.

#### ব্যাপারটা কী?

বিল অনেক, অথচ agent প্রায় কিছুই লেখেনি। এমন হয় কেন? কারণ **বিল আসে পড়ার দিক থেকে।** Model লেখার আগে যা কিছু পড়ে, তার সবই input। Model-এর স্মৃতি নেই, তাই প্রতি turn-এ পুরো session আবার input হয়ে যায়। পঞ্চাশতম turn-এর input-এ আগের ঊনপঞ্চাশটা turn-ও থাকে। প্রতি token-এর দাম কম, কিন্তু **সংখ্যায় এত বেশি যে বিলের সিংহভাগ এখানেই।**

#### Input-এ কী কী থাকে

| অংশ | কী থাকে | কেন বাড়ে |
|---|---|---|
| System prompt | harness-এর স্থায়ী নির্দেশ, `CLAUDE.md` | প্রতি request-এ আবার যায় |
| কথোপকথনের ইতিহাস | আপনার সব message, model-এর সব উত্তর | প্রতি turn-এ লম্বা হয় |
| Tool result | পড়া ফাইল, command-এর output | বড় ফাইল পড়লেই বেড়ে যায় |
| নতুন message | আপনার এই turn-এর কথা | সবচেয়ে ছোট অংশ |

#### একটা কাজ ধরে দেখি

একটা লম্বা debug session ধরুন।

1. শুরুতে context ছোট। প্রতি request-এ কম input যায়, বিলও কম।
2. প্রতি turn-এ কিছু উত্তর আর tool result জমে। ইতিহাস বড় হতে থাকে।
3. ধরুন ইতিহাস জমতে জমতে **এক লক্ষ token-এর কাছাকাছি** পৌঁছাল।
4. এবার model একটা ছোট edit লিখল, হয়তো কয়েক শ token। কিন্তু input হিসেবে গেল পুরো লক্ষ token।
5. কাজ শেষ হলে আপনি `/clear` করলেন। পরের কাজ আবার ছোট context দিয়ে শুরু হলো।

**খেয়াল করুন: খরচ বাড়ছে model কত লিখল তাতে না, কত জমে আছে তাতে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Input মানে আমি যা টাইপ করেছি | আপনার message **ছোট একটা অংশ।** System prompt, ইতিহাস আর tool result-ও input। |
| বিল মানে agent কত লিখেছে | AI coding-এ **বিলের বেশিরভাগ input token।** |
| Cache থাকলে input নিয়ে ভাবার কিছু নেই | Cache দাম কমায়, কিন্তু **যা বারবার যাচ্ছে সেটা ছোট করলে আরও কমে।** |

**উপমা / Analogy:** প্রতিটা SMS-এর সাথে আগের সব SMS আবার পাঠাতে হলে কেমন হতো? **শেষের দিকে প্রতিটা SMS হতো এক খাতা।** *Imagine every SMS had to carry all the earlier ones. By the end, each message would be a notebook.*

> [!TIP]
> **কাজে লাগান:**
>
> - **এক কাজ শেষ হলে `/clear` করুন।** পুরনো ইতিহাস টেনে নিলে প্রতিবার তার দাম দিতে হয়।
> - বড় কাজের মাঝখানে `/compact` চালান, আর `/context` দিয়ে দেখুন কোন অংশ জায়গা খাচ্ছে।

**সম্পর্কিত শব্দ:** [Output tokens](#output-tokens--আউটপুট-টোকেন) · [Cache tokens](#cache-tokens--ক্যাশ-টোকেন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Stateless](#stateless--স্টেটলেস)

---

### Output tokens · আউটপুট টোকেন

> [!NOTE]
> **এক কথায়:** Output token হলো **model যা লিখে ফেরত দেয়।** দাম input-এর মোটামুটি পাঁচ গুণ, আর অপেক্ষার সময়ও এরাই ঠিক করে।
>
> **In short:** Output tokens are **what the model writes back**. They cost roughly five times as much as input, and they decide how long you wait.

#### ব্যাপারটা কী?

Agent কাজ করছে, আর আপনি স্ক্রিনের সামনে বসে অপেক্ষা করছেন। **ধীর লাগছে কেন?** প্রায় সবসময় কারণ model লিখছে, পড়ছে না। Model input দ্রুত পড়ে নেয়, কিন্তু **output লেখে এক token করে।** গদ্য, code, tool call আর উত্তরের আগের লম্বা ভাবনা, সবই output। তাই লম্বা অপেক্ষা মানে সাধারণত লম্বা উত্তর আসছে।

#### Input বনাম output

| | Input tokens | Output tokens |
|---|---|---|
| কী | model যা পড়ে | model যা লেখে |
| দাম | কম | মোটামুটি পাঁচ গুণ |
| আকার | বড়, জমতে থাকে | সাধারণত ছোট |
| কী ঠিক করে | বিলের বড় অংশ | অপেক্ষার সময় |

#### একটা কাজ ধরে দেখি

আপনি বললেন: *"এই ফাইলে একটা function-এর নাম বদলাও।"*

1. Agent পুরো ফাইল নতুন করে লিখতে শুরু করল, ধরুন দুইশো লাইন।
2. প্রতিটা লাইন এক token করে লেখা হয়। তাই আপনি অনেকক্ষণ অপেক্ষা করলেন।
3. বিলও এল **output দরে**, যা input-এর চেয়ে অনেক বেশি।
4. আপনি বললেন: "পুরো ফাইল না, শুধু বদলানো জায়গায় edit করো।"
5. এবার agent কয়েক লাইনের একটা edit লিখল। কাজ হলো দ্রুত আর সস্তায়।

**খেয়াল করুন: একই কাজ, কিন্তু কত লেখা হলো তার উপর সময় আর খরচ দুটোই নির্ভর করে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Output মানে যে লেখা আমি স্ক্রিনে দেখি | **Thinking token-ও output দরে বিল হয়**, harness না দেখালেও। |
| Turn ধীর মানে বেশি পড়ছে | পড়া দ্রুত। **ধীর হওয়ার কারণ সাধারণত লম্বা output।** |
| Effort বাড়ালে শুধু উত্তর ভালো হয় | **Effort বাড়ালে আরও thinking token খরচ হয়**, বিলও বাড়ে। |

**উপমা / Analogy:** পরীক্ষায় প্রশ্ন পড়তে এক মিনিট লাগে, কিন্তু উত্তর হাতে লিখতে এক ঘণ্টা। **পড়া সস্তা, লেখা দামি।** *Reading the question takes a minute; writing the answer by hand takes an hour. Reading is cheap, writing is expensive.*

> [!TIP]
> **কাজে লাগান:**
>
> - **Agent-কে পুরো ফাইল না লিখিয়ে ছোট edit করতে বলুন।** এতে বিলও কমে, অপেক্ষাও কমে।
> - সহজ কাজে effort কমিয়ে রাখুন। **বেশি ভাবানো মানে বেশি output token।**

**সম্পর্কিত শব্দ:** [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Effort](#effort--এফর্ট) · [Token](#token--টোকেন) · [Model provider request](#model-provider-request--মডেল-প্রোভাইডার-রিকোয়েস্ট)

---

### Prefix cache · প্রিফিক্স ক্যাশ

> [!NOTE]
> **এক কথায়:** Prefix cache হলো **provider-এর দিকের একটা জমা-ভাণ্ডার, যা দুই request-এর একই শুরুর অংশের কাজ আবার ব্যবহার করে।** শুরু হুবহু মিললে কম দামে বিল হয়।
>
> **In short:** A prefix cache is **a provider-side store that reuses work on the shared start of two requests**. If the start matches exactly, those tokens are billed cheaply.

#### ব্যাপারটা কী?

প্রতি request-এ পুরো ইতিহাস আবার যায়। তাহলে লম্বা session-এ প্রথম turn-এর হিসাব কি পঞ্চাশবার করা হয়? Cache না থাকলে হতো। কিন্তু **session শুধু শেষে বাড়ে।** প্রতিটা request আগেরটার সাথে কয়েকটা নতুন message, তাই লম্বা শুরুর অংশ provider একবার প্রসেস করে জমিয়ে রাখে। পরের request-এ শুরু হুবহু মিললে সে ওখান থেকেই কাজ ধরে। এটাই prefix cache।

#### কখন cache কাজ করে, কখন না

| ঘটনা | ফল |
|---|---|
| শেষে নতুন message যোগ হলো | শুরু মেলে, **cache কাজ করে।** |
| prompt-এর শুরুতে কিছু বদলাল, যেমন tool-এর ক্রম | **প্রথম বদলানো token থেকে** পরের সব miss। |
| ইতিহাসের মাঝখানে কিছু edit হলো | ওই জায়গা থেকে পরের সব পুরো দামে। |
| কয়েক মিনিটের বেশি বিরতি | মেয়াদ শেষ। পরের request একবার পুরো দামে prefix আবার বানায়। |

#### একটা কাজ ধরে দেখি

সকাল থেকে আপনি একটা feature নিয়ে কাজ করছেন।

1. তিরিশটা turn চলল। প্রতি request-এ শুরুর অংশ cache থেকে এল, বিল কম।
2. আপনি দুপুরের খাবারে গেলেন, আধঘণ্টার বিরতি।
3. ফিরে এসে একটা message দিলেন। ততক্ষণে **cache-এর মেয়াদ শেষ।**
4. Provider পুরো ইতিহাস আবার প্রসেস করল। এই এক request একটু দামি হলো।
5. পরের request থেকে cache আবার চলতে লাগল, দাম আগের মতো।

**খেয়াল করুন: বিরতির পরের প্রথম request দামি, তারপর সব স্বাভাবিক।** এটা কোনো ভুল না।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Cache মানে আগের উত্তর আবার দেওয়া | উত্তর না, **শুরুর অংশের হিসাব আবার ব্যবহার।** Model প্রতিবার নতুন উত্তর লেখে। |
| Cache থাকলে ইতিহাস বিনামূল্যে | **সস্তা, বিনামূল্যে না।** Cache token-এরও একটা দাম আছে। |
| Cache ভাঙলে তেমন কিছু যায় আসে না | **প্রথম যে token বদলায়, তার পরের সবটা** পুরো দামে যায়। |

**উপমা / Analogy:** কম্পোজের দোকান। প্রথম দশ পাতা টাইপ করা আছে, শুধু নতুন পাতা যোগ করলে খরচ কম। কিন্তু **পাতা ২-এ কিছু বদলালে** পরের সব পাতা আবার সাজাতে হয়। *A typing shop: adding new pages is cheap, but changing page 2 means redoing every page after it.*

> [!TIP]
> **কাজে লাগান:**
>
> - লম্বা বিরতির পর প্রথম request একটু দামি হলে **চিন্তা করবেন না, এটা স্বাভাবিক।**
> - বিল হঠাৎ লাফালে দেখুন **prompt-এর শুরুতে কিছু বদলাচ্ছে কিনা**, যেমন নতুন setting বা নতুন tool।

**সম্পর্কিত শব্দ:** [Cache tokens](#cache-tokens--ক্যাশ-টোকেন) · [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Stateless](#stateless--স্টেটলেস) · [Model provider request](#model-provider-request--মডেল-প্রোভাইডার-রিকোয়েস্ট)

---

### Cache tokens · ক্যাশ টোকেন

> [!NOTE]
> **এক কথায়:** Cache token হলো **যে input token provider আগেই প্রসেস করে জমিয়ে রেখেছে।** দাম সাধারণ input-এর দশ ভাগের এক ভাগ বা তারও কম।
>
> **In short:** Cache tokens are **input tokens the provider has already processed and stored**, billed at about a tenth of the normal input rate or less.

#### ব্যাপারটা কী?

পঞ্চাশতম turn-এ প্রতিটা request পঞ্চাশ turn-এর ইতিহাস বয়ে নেয়। সবটার পুরো দাম দিতে হলে লম্বা session চালানো যেত না। **এখানেই cache token কাজে আসে।** হুবহু একই prefix-এর যে token provider আগে প্রসেস করেছে, সেগুলো সস্তায় বিল হয়। তাই লম্বা session-এ আপনি যা পাঠান তার বেশিরভাগই cache token, আর বিল থাকে সহনীয়। তবে cache **শুরু থেকে মেলায় আর প্রথম অমিলেই থামে।**

#### কোনটা cache থেকে আসে

প্রতিটা অক্ষর কথোপকথনের একেকটা অংশ। প্রতি request এ পর্যন্ত পুরো কথোপকথন পাঠায়।

| Request পাঠায় | Cache থেকে | পুরো দামে | কেন |
|---|---|---|---|
| `PQ` | কিছু না | `PQ` | প্রথম request, মেলানোর কিছু নেই |
| `PQR` | `PQ` | `R` | `PQ` আগের request-এর হুবহু শুরু |
| `PQRS` | `PQR` | `S` | prefix অক্ষত আছে |
| `PXRS` | `P` | `XRS` | `Q` বদলে `X` হয়েছে, মিল ওখানেই ভাঙল |

#### একটা কাজ ধরে দেখি

একটা চলমান session-এ হঠাৎ খরচ বেড়ে গেল।

1. কয়েকটা turn-এ বিল স্বাভাবিকের চেয়ে অনেক বেশি এল। আপনি কিছু বদলাননি।
2. Usage report-এ **cache token আর input token পাশাপাশি** দেখলেন।
3. দেখলেন cache token কমেছে আর পুরো দামের input বেড়েছে।
4. মানে cache ভাঙছে। কারণ খুঁজতে গিয়ে দেখলেন, harness prompt-এর শুরুর দিকে কিছু একটা প্রতিবার বদলাচ্ছে।
5. কারণটা সরানোর পর cache token আবার বাড়ল, বিলও নামল।

**খেয়াল করুন: ভাঙা cache আগে usage report-এই ধরা পড়ে।** বিল দেখে নয়, সংখ্যা দেখে বুঝুন।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Cache token আলাদা ধরনের token | ওগুলো **input token-ই**, শুধু আগে প্রসেস হয়েছে বলে সস্তা। |
| একবার cache হলে আর ভাঙে না | Cache **হুবহু prefix** মেলায়। আগের দিকে কিছু বদলালে ওখান থেকে পরের সব miss হয়। |
| বিল মানে শুধু input আর output | আসলে তিন ভাগ: **পুরো দামের input, সস্তা cache token আর output।** |

**উপমা / Analogy:** ফটোকপির দোকানে একই কাগজ বারবার করালে দোকানদার **পুরনো master কপি থেকে সস্তায়** দেয়। Master বদলালে আবার পুরো দাম। *Repeat copies from the same master are cheap; change the master and you pay full price again.*

> [!TIP]
> **কাজে লাগান:**
>
> - কারণ ছাড়া খরচ লাফালে **cache token আর input token পাশাপাশি দেখুন।**
> - **Cache কমে input বাড়লে** বুঝবেন cache ভাঙছে। তখন prompt-এর শুরুর অংশ কী বদলাচ্ছে খুঁজুন।

**সম্পর্কিত শব্দ:** [Prefix cache](#prefix-cache--প্রিফিক্স-ক্যাশ) · [Input tokens](#input-tokens--ইনপুট-টোকেন) · [Output tokens](#output-tokens--আউটপুট-টোকেন) · [Stateless](#stateless--স্টেটলেস)

---

<figure class="diagram">
<svg viewBox="0 0 560 205" role="img" aria-label="One request: system prompt, tools, memory and history form a cached prefix billed at about a tenth of the price. The new message is billed at full input price. The output costs about five times the input price.">
  <text class="note" x="215" y="24">cached prefix · ~1/10 price</text>
  <path class="edge" d="M20 45 L20 37 L410 37 L410 45"/>
  <text class="note" x="455" y="24">new · full price</text>
  <path class="edge" d="M412 45 L412 37 L500 37 L500 45"/>
  <rect class="node down" x="20" y="55" width="90" height="46"/><text x="65" y="78">system</text>
  <rect class="node down" x="110" y="55" width="70" height="46"/><text x="145" y="78">tools</text>
  <rect class="node down" x="180" y="55" width="80" height="46"/><text x="220" y="78">memory</text>
  <rect class="node down" x="260" y="55" width="150" height="46"/><text x="335" y="78">history</text>
  <rect class="node" x="410" y="55" width="90" height="46"/><text x="455" y="78">new msg</text>
  <defs><marker id="d3-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <path class="arrow" marker-end="url(#d3-arrow)" d="M455 103 L455 148"/>
  <text class="note start" x="20" y="172">same start as last time = cheap</text>
  <rect class="node up" x="340" y="152" width="200" height="40" rx="8"/><text x="440" y="172">output · ~5× price</text>
</svg>
<figcaption>Every request sends the whole conversation again. The start that matches the last request comes from the prefix cache at about a tenth of the price. New input costs full price, and every token the model writes costs about five times more. প্রতি request-এ পুরো কথোপকথন আবার যায়।</figcaption>
</figure>

---

## 2. Sessions, context and turns · Session, context আর turn

Why the model forgets, and what it actually sees. **Model কেন ভুলে যায়, আর আসলে কী দেখে।**

### Stateless · স্টেটলেস

> [!NOTE]
> **এক কথায়:** Stateless মানে **এক বার থেকে আরেক বারে কিছু জমা থাকে না**, প্রতিবার শূন্য থেকে শুরু।
>
> **In short:** Something stateless **carries nothing forward**, so every use starts from a blank slate. The model and a fresh agent session are both stateless.

#### ব্যাপারটা কী?

কাল আপনি agent-কে বললেন, "আমরা tab না, space ব্যবহার করি।" আজ নতুন session-এ সে আবার tab বসাচ্ছে। **কেন মনে রাখছে না?** কারণ model stateless। Training শেষে তার parameter জমে যায়, আপনার কোনো কথায় আর বদলায় না। Chat-এ ধারাবাহিকতা মনে হয়, কারণ harness পুরো কথোপকথন জমিয়ে রেখে প্রতি request-এ আবার পাঠায়। **Model মনে রাখছে না, আবার পড়ছে।**

<figure class="diagram">
<svg viewBox="0 0 560 190" role="img" aria-label="Request 1 carries the prompt and message 1. Request 2 re-sends the prompt, message 1 and reply 1, then adds message 2.">
  <text class="start" x="20" y="50">Request 1</text>
  <rect class="node up" x="130" y="30" width="90" height="40" rx="8"/><text x="175" y="50">prompt</text>
  <rect class="node up" x="230" y="30" width="90" height="40" rx="8"/><text x="275" y="50">msg 1</text>
  <text class="start" x="20" y="120">Request 2</text>
  <rect class="node down" x="130" y="100" width="90" height="40" rx="8"/><text x="175" y="120">prompt</text>
  <rect class="node down" x="230" y="100" width="90" height="40" rx="8"/><text x="275" y="120">msg 1</text>
  <rect class="node down" x="330" y="100" width="90" height="40" rx="8"/><text x="375" y="120">reply 1</text>
  <rect class="node up" x="430" y="100" width="90" height="40" rx="8"/><text x="475" y="120">msg 2</text>
  <text class="note" x="280" y="170">pink is new, indigo is re-sent by the harness</text>
</svg>
<figcaption>Harness প্রতিবার পুরোনো সবকিছু আবার পাঠায়। The harness re-sends everything old on every request, because the model keeps nothing.</figcaption>
</figure>

#### Stateless কোথায় কোথায় খাটে

| জায়গা | কী ঘটে | কারণ |
|---|---|---|
| এক request থেকে আরেক request | প্রতিবার পুরো context window আবার পাঠাতে হয় | Model আগের request দেখতেই পায় না |
| এক session থেকে আরেক session | নতুন session একদম খালি | Agent নিজে থেকে কিছু জমা রাখে না |
| Model নিজে, চিরকাল | আপনার সংশোধন থেকে শেখে না | Training-এর পর parameter জমে থাকে |

#### একটা কাজ ধরে দেখি

একই ভুল দুদিন ধরে ঘটছে। ধাপে ধাপে দেখি:

1. Agent একটা function লিখল `any` type দিয়ে। আপনি বললেন, "`any` লিখবেন না।" সে ঠিক করে দিল।
2. পরদিন নতুন session। আপনি একই ধরনের কাজ দিলেন, agent আবার `any` লিখল।
3. আপনি ভাবলেন, "গতকালই তো বললাম, শিখল না কেন?" কিন্তু নতুন session-এ গতকালের একটা লাইনও নেই।
4. আপনি `CLAUDE.md`-তে এক লাইন লিখলেন: "TypeScript-এ `any` নিষিদ্ধ।"
5. পরের session-এ harness ফাইলটা পড়ে context-এ জুড়ে দেয়। Agent আর `any` লেখে না।

**খেয়াল করুন: সমাধান agent-কে "শেখানো" ছিল না, সমাধান ছিল সংশোধনটা এমন জায়গায় লিখে রাখা যেখান থেকে প্রতিটা নতুন session পড়ে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| কাল agent-কে বুঝিয়েছি, আজ সে জানে | নতুন session খালি। **যা লাগবে, ফাইলে লিখে রাখুন।** |
| ঠিক করে দিলে model শিখে যায় | Parameter বদলায় না। সংশোধনটা শুধু ওই session-এর context-এ থাকে। |
| Model আগের message মনে রেখে উত্তর দেয় | **Harness history আবার পাঠায়,** model শুধু আবার পড়ে। |

**উপমা / Analogy:** প্রতিদিন নতুন রিকশাওয়ালা। কাল যাকে বাসার রাস্তা বুঝিয়েছেন, আজ সে নেই। **আজকের জনকে আবার শুরু থেকে বলতে হবে।** *A new rickshaw puller every day: yesterday's directions are gone, so you explain again.*

> [!TIP]
> **কাজে লাগান:**
>
> - একই ভুল দুইবার ঠিক করলে **"কেন শিখল না" না ভেবে "কোথায় লিখব" ভাবুন।**
> - যা সব session-এ লাগবে, তা `CLAUDE.md` বা memory ফাইলে রাখুন। যা শুধু পরের ধাপে লাগবে, তা handoff note-এ।

**সম্পর্কিত শব্দ:** [Stateful](#stateful--স্টেটফুল) · [Session](#session--সেশন) · [Memory system](#memory-system--মেমোরি-সিস্টেম) · [Context window](#context-window--কনটেক্সট-উইন্ডো)

---

### Context · কনটেক্সট

> [!NOTE]
> **এক কথায়:** Context হলো **কাজের জন্য দরকারি যে তথ্য agent এই মুহূর্তে হাতে পেয়েছে**, সেটুকু।
>
> **In short:** Context is **the information that matters for the task** and that the agent can use right now. It is about quality, not size.

#### ব্যাপারটা কী?

Agent ভুল করলে আমরা প্রথমে বলি, "model বোকা।" **কিন্তু আগে জিজ্ঞেস করুন: তখন agent-এর সামনে কী ছিল?** Context মানে কাজের জন্য যেটুকু জানা দরকার, শুধু সেটুকু। এটা raw token-এর সারি না, আর পুরো কথোপকথনও না। এখানে **পরিমাণ না, মান** গুরুত্বপূর্ণ। দরকারি তথ্য ঠিক জায়গায় থাকলে ছোট context-ও দারুণ।

#### তিনটা শব্দ, তিনটা আলাদা জিনিস

| শব্দ | কী বোঝায় | উদাহরণ |
|---|---|---|
| Context | কাজের জন্য দরকারি তথ্য | `User` type-এর definition |
| Context window | প্রতি request-এ model যে token-এর সারি দেখে | system prompt, history, সব tool result |
| Session | Harness-এ জমা চলমান কথোপকথন | আজ সকাল থেকে চলা পুরো chat |

#### একটা কাজ ধরে দেখি

Agent এমন field ব্যবহার করছে যা আদৌ নেই:

1. আপনি বললেন, "profile page-এ user-এর পুরো নাম দেখাও।"
2. Agent `user.fullName` লিখল। কিন্তু আসল type-এ আছে `firstName` আর `lastName`।
3. আপনি ভাবলেন model ভুল করেছে। আসলে `User` type-এর ফাইলটা কখনো context-এ ঢোকেইনি।
4. Agent তাই অন্য component দেখে আন্দাজ করেছে।
5. আপনি বললেন, "আগে `types/user.ts` পড়ো।" এবার সে ঠিক field দিল।

**খেয়াল করুন: model-এর "বুদ্ধি" বদলায়নি, শুধু সঠিক তথ্য context-এ এসেছে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Context মানে context window-র সবকিছু | Window-তে পুরোনো আর অপ্রাসঙ্গিক জিনিসও থাকে। **Context শুধু কাজে লাগা অংশ।** |
| যত বেশি ঢোকাব, তত ভালো | অদরকারি জিনিস মনোযোগ খায়। **কম কিন্তু ঠিক তথ্য প্রায়ই বেশি কাজের।** |
| Agent ভুল করেছে মানে model দুর্বল | অনেক সময় আসল তথ্য ঢোকানোই হয়নি, বা অন্য জিনিসের নিচে চাপা পড়েছে। |

**উপমা / Analogy:** রান্নার টেবিলে আজকের রান্নার মশলা থাকা দরকার। **টেবিল ভর্তি গতকালের থালাবাসন থাকলে টেবিল ভরা, কিন্তু কাজের জিনিস নেই।** *A kitchen counter full of yesterday's dishes is full but useless for today's cooking.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent API বানালে বা schema আন্দাজ করলে **আগে দেখুন তখন context-এ কী ছিল।** `/context` দিয়ে দেখা যায়।
> - "Context engineering" মানে এই বাছাইয়ের কাজ: যা লাগে তা ঢোকানো, যা লাগে না তা বাইরে রাখা।

**সম্পর্কিত শব্দ:** [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Session](#session--সেশন) · [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) · [Hallucination](#hallucination--হ্যালুসিনেশন)

---

### Context window · কনটেক্সট উইন্ডো

> [!NOTE]
> **এক কথায়:** Context window হলো **এক request-এ model যা কিছু দেখে তার পুরোটা**, আর দুনিয়া দেখার ওটাই তার একমাত্র জানালা।
>
> **In short:** The context window is **everything the model sees in one request**. It has a limit, and it is the only way the model can see anything.

#### ব্যাপারটা কী?

Model আপনার codebase দেখে না, গতকালের edit-ও না। সে শুধু দেখে **একটাই লম্বা token-এর সারি।** সেই সারিটাই context window। তাতে থাকে system prompt, এ পর্যন্ত কথোপকথন আর harness-এর ফিরিয়ে দেওয়া সব tool result। **Window-র বাইরের কিছু model-এর কাছে নেই।** আর window-র সীমা আছে, সীমাটা model ভেদে আলাদা।

<figure class="diagram">
<svg viewBox="0 0 560 190" role="img" aria-label="One box labelled context window holds the system prompt, messages and tool results, followed by free space.">
  <rect class="node skip" x="20" y="20" width="520" height="150" rx="16"/>
  <text class="start" x="36" y="40">Context window</text>
  <rect class="node down" x="36" y="60" width="150" height="60" rx="8"/><text x="111" y="90">system prompt</text>
  <rect class="node" x="192" y="60" width="110" height="60" rx="8"/><text x="247" y="90">messages</text>
  <rect class="node up" x="308" y="60" width="140" height="60" rx="8"/><text x="378" y="90">tool results</text>
  <rect class="node skip" x="454" y="60" width="80" height="60" rx="8"/><text x="494" y="90">free</text>
  <text class="note" x="280" y="150">everything the model sees must fit in this one box</text>
</svg>
<figcaption>সবকিছু একটাই বাক্সে ঢুকতে হয়। Everything the model sees must fit in this one box, and the free space shrinks every turn.</figcaption>
</figure>

#### Window ভরে গেলে কী করবেন

| উপায় | কী করে | কখন |
|---|---|---|
| Clearing | Session-এর সবকিছু ফেলে নতুন শুরু | কাজ শেষ, বা আলাদা কাজ ধরবেন |
| Compaction | পুরোনো অংশের সারসংক্ষেপ রেখে জায়গা বানায় | একই কাজ চলছে, কিন্তু window ভরে আসছে |
| Handoff | Note লিখে নতুন session-কে বুঝিয়ে দেয় | বড় কাজ কয়েক session-এ ভাগ হচ্ছে |

#### একটা কাজ ধরে দেখি

আপনার monorepo বিশাল। আপনি ভাবলেন সবটা agent-কে দিয়ে দেবেন:

1. আপনি পুরো repo paste করার চেষ্টা করলেন। হয় ঢুকলই না, নয়তো ঢুকে window প্রায় ভরে গেল।
2. ভরা window-তে agent-এর আসল প্রশ্নের জন্য জায়গা কম, আর অদরকারি code তার মনোযোগ খাচ্ছে।
3. আপনি বদলে বললেন, "billing module-এর ভেতরে `calculateTax` খুঁজে বের করো।"
4. Agent search tool দিয়ে দুটো ফাইল খুলল। শুধু ওই দুটো window-তে ঢুকল।
5. উত্তর হলো দ্রুত আর নির্ভুল।

**খেয়াল করুন: window একটা বাজেট। ফাইলগুলো repo-তে আছে, দরকার হলে tool দিয়ে আনা যায়।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Context window মানেই model-এর memory | Window চলতি কাজের জায়গা, **session শেষে চলে যায়।** Memory আলাদা জিনিস। |
| Window বড় হলে সব সমস্যা মিটে যায় | বড় window-তেও অদরকারি জিনিস মনোযোগ খায়। |
| Model আমার পুরো project দেখতে পায় | **Window-র বাইরের কিছু সে দেখে না,** tool দিয়ে আনলে তবেই দেখে। |

**উপমা / Analogy:** পরীক্ষার হলে বেঞ্চের উপর যতটুকু জায়গা। বই, খাতা, প্রশ্ন সব ওইটুকুতে রাখতে হবে। **বেশি জিনিস রাখলে আসল প্রশ্নটাই চাপা পড়ে।** *Your exam desk: limited space, and too much on it buries the actual question.*

> [!TIP]
> **কাজে লাগান:**
>
> - **Window-কে বাজেটের মতো দেখুন।** কাজের ফাইল দিন, বাকিটা agent দরকারে tool দিয়ে পড়বে।
> - `/context` চালিয়ে দেখুন window-র কতটা ভরেছে আর কী কতটা জায়গা নিচ্ছে।
> - ইংরেজিতে একে "memory" বলবেন না।

**সম্পর্কিত শব্দ:** [Context](#context--কনটেক্সট) · [Token](#token--টোকেন) · [Compaction](#compaction--কমপ্যাকশন) · [Clearing](#clearing--ক্লিয়ারিং)

---

### Stateful · স্টেটফুল

> [!NOTE]
> **এক কথায়:** Stateful মানে **আগের তথ্য সামনে বয়ে নিয়ে যায়**, stateless-এর উল্টো।
>
> **In short:** Something stateful **carries information forward** from one step to the next. A session is stateful across turns, but the model itself never is.

#### ব্যাপারটা কী?

কাল আপনি agent-কে বলেছিলেন commit message ছোট চান। আজ সে ছোটই লিখছে। তাহলে কি model শিখে ফেলেছে? **না।** Stateful হওয়া মানে কোথাও তথ্যটা জমা আছে আর সেটা আবার পড়া হচ্ছে। প্রশ্ন হলো **কোন স্তরে জমা আছে।** Model-এর ভেতরে কিছুই জমে না। জমা থাকে session-এ, harness-এর ফাইলে আর environment-এ।

#### কোন স্তর কীভাবে মনে রাখে

| স্তর | মনে রাখে? | কীভাবে |
|---|---|---|
| Model | কখনো না | Parameter জমে আছে, শুধু প্রতি request-এর জিনিস দেখে |
| Session | Turn থেকে turn | Harness প্রতিটা message আর tool result জুড়ে যায় |
| Harness | Session থেকে session | Memory ফাইল, `CLAUDE.md`, handoff note লিখে রাখে আর আবার লোড করে |
| Environment | সব সময় | Session চলুক বা না চলুক, ফাইল ফাইলই |

#### একটা কাজ ধরে দেখি

"গতকালের পছন্দ আজ agent মনে রাখল", এর ভেতরে কী ঘটেছে:

1. গতকাল আপনি বললেন, "commit message এক লাইনে লিখবে।"
2. Agent বা harness কথাটা একটা memory ফাইলে লিখে রাখল। এটা **ফাইল**, model-এর মাথা না।
3. আজ নতুন session শুরু হলো। Model-এর কাছে গতকালের কিছুই নেই।
4. Harness শুরুতে ওই memory ফাইল পড়ে context-এ জুড়ে দিল।
5. Model লাইনটা পড়ল, আর এক লাইনের commit message লিখল।

**খেয়াল করুন: প্রতিটা স্তর তার নিচের স্তরে রাখা কিছু আবার পড়ছে। মনে রাখার আসল জায়গা সবসময় model-এর বাইরে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Agent মনে রেখেছে মানে model শিখেছে | **Harness ফাইল থেকে পড়িয়েছে।** Model গতকালের কিছুই দেখেনি। |
| State জমা থাকা সবসময় ভালো | শুরুর একটা ভুল ধারণাও সামনে চলে আসে। **মাঝে মাঝে ফেলে দেওয়াও দরকার।** |
| Agent চাইলেই session পেরিয়ে মনে রাখে | **শুধু memory system থাকলে।** না থাকলে নতুন session খালি। |

**উপমা / Analogy:** মুদি দোকানের বাকির খাতা। দোকানদারের মাথায় না থাকলেও **খাতায় আছে, তাই পরদিন হিসাব মেলে।** *The grocer's credit ledger: the shopkeeper may forget, but the book remembers.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent "মনে রেখেছে" দেখলে **খুঁজুন কোন ফাইল থেকে পড়েছে:** `CLAUDE.md`, memory ফাইল, নাকি handoff note।
> - Session ভুল দিকে চলে গেলে `/clear` মানে ইচ্ছা করে state ফেলে দেওয়া। লিখে রাখা জিনিস থেকেই নতুন শুরু হয়।

**সম্পর্কিত শব্দ:** [Stateless](#stateless--স্টেটলেস) · [Memory system](#memory-system--মেমোরি-সিস্টেম) · [Session](#session--সেশন) · [Environment](#environment--এনভায়রনমেন্ট)

---

### Agent · এজেন্ট

> [!NOTE]
> **এক কথায়:** Agent হলো **model আর harness একসাথে**, tool আর system prompt সহ, যার সাথে আপনি পালা করে কথা বলেন।
>
> **In short:** An agent is **a model plus its harness**, equipped with tools, a system prompt and a context window, taking turns with you. It is the unit you actually talk to.

#### ব্যাপারটা কী?

"Claude আজ ভুল করেছে", আমরা বলি। কিন্তু Claude বলতে কী বোঝাচ্ছি: model, নাকি harness-সহ পুরোটা? **Agent শব্দটা এই গোলমাল মেটায়।** Model হলো parameter-এর একটা ফাইল, harness হলো software। Agent এর কোনোটাই না। **Agent হলো সেই একক, যাকে আপনি কাজ দেন** আর যে আপনার message পড়ে উত্তর দেয়। Claude Code, Cursor, Claude.ai, সবই agent।

#### Agent কী দিয়ে তৈরি

| উপাদান | ভূমিকা | উদাহরণ |
|---|---|---|
| Model | চিন্তা করে আর পরের লেখা বানায় | Claude-এর কোনো একটা model |
| Harness | Model-কে ঘিরে কাজের ব্যবস্থা | Claude Code |
| Tools | আসল কাজ করে | ফাইল পড়া, command চালানো |
| System prompt | স্থায়ী নির্দেশ | আচরণের নিয়ম |
| Context window | যা সে এখন দেখছে | চলতি session |

#### একটা কাজ ধরে দেখি

Agent ভুল করেছে, কিন্তু ভুলটা কোথায়:

1. Agent একটা config ফাইল বদলে ফেলল, যেটা বদলানোর কথা ছিল না। আপনি বললেন, "agent ভুল করেছে।"
2. **Context দেখুন:** আপনি কি বলেছিলেন কোন ফাইল ছোঁয়া যাবে না? সেই নির্দেশ কি context-এ ছিল?
3. **Harness দেখুন:** permission mode কি এমন ছিল যে বদলানোর আগে কেউ জিজ্ঞেসই করেনি?
4. **Model দেখুন:** শেষ ধাপে, বাকি দুটো ঠিক থাকলে তবেই model-কে দোষ দিন।
5. দেখা গেল, নির্দেশটা শুধু আগের session-এ বলা হয়েছিল। এটা ছিল context-এর সমস্যা।

**খেয়াল করুন: "agent ভুল করেছে" বলাটা শুরু, শেষ না। ভুলটা কোন অংশের, সেটা খুঁজলেই ঠিক সমাধান মেলে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Agent আর model একই জিনিস | Agent = model + harness। **একই model-এর উপর আলাদা harness বসালে আলাদা agent হয়।** |
| Agent একটা আলাদা যন্ত্রাংশ | **Agent কোনো যন্ত্রাংশ না।** সে সেই একক, যার সাথে আপনি কথা বলেন। |
| Agent নতুন ধারণা | Software agent, মানে আপনার হয়ে কাজ করা program, AI-র শুরু থেকেই আছে। |

**উপমা / Analogy:** Pathao-তে বাইক ডাকলে আপনি "রাইডার"-এর সাথে কথা বলেন। **কিন্তু কাজটা করে মানুষ আর বাইক মিলে।** *You talk to "the rider", but the job is done by person plus bike together.*

> [!TIP]
> **কাজে লাগান:**
>
> - "The AI" বা "the bot" বলবেন না। এতে বোঝা যায় না আপনি model বলছেন, নাকি harness-সহ পুরোটা।
> - ভুল হলে **তিন জায়গা পরপর দেখুন:** context, harness, তারপর model।

**সম্পর্কিত শব্দ:** [Model](#model--মডেল) · [Harness](#harness--হার্নেস) · [System prompt](#system-prompt--সিস্টেম-প্রম্পট) · [Subagent](#subagent--সাবএজেন্ট)

---

### System prompt · সিস্টেম প্রম্পট

> [!NOTE]
> **এক কথায়:** System prompt হলো **agent-এর স্থায়ী নির্দেশনা**, যা harness প্রতিটা request-এর শুরুতে জুড়ে দেয়।
>
> **In short:** The system prompt is **the standing instructions** the harness puts in front of every request. The tool's vendor writes it, and it usually outranks your message.

#### ব্যাপারটা কী?

আপনি বললেন, "ছোট করে উত্তর দাও।" তবু agent লম্বা সারসংক্ষেপ লিখেই চলেছে। **কে তাকে এটা করাচ্ছে?** সম্ভবত system prompt। এখানে লেখা থাকে agent কে, কেমন আচরণ করবে, কোন tool ডাকতে পারবে আর কোন নিয়ম মানবে। **এটা harness-এর কোম্পানি লেখে, আপনি না।** একটা session-এ সাধারণত এটা বদলায় না।

#### কে কী লেখে

| নির্দেশ | কে লেখে | কখন জোড়া হয় |
|---|---|---|
| System prompt | Harness-এর কোম্পানি | প্রতি request-এর শুরুতে |
| `CLAUDE.md` বা AGENTS.md | আপনি | Session শুরুতে, system prompt-এর পাশে |
| আপনার message | আপনি | প্রতি turn-এ |

#### একটা কাজ ধরে দেখি

একই model, একই prompt, কিন্তু দুই tool-এ আচরণ আলাদা:

1. আপনি Tool A-তে লিখলেন, "এই function-টা refactor করো।" সে শুধু code বদলে দিল।
2. একই কথা Tool B-তে লিখলেন। সে আগে ব্যাখ্যা করল, তারপর code দিল।
3. Model একই, তাই পার্থক্য model-এ না।
4. দুই harness-এর system prompt আলাদা। একটা সংক্ষিপ্ত edit-এর জন্য সাজানো, আরেকটা ব্যাখ্যার জন্য।
5. আপনার message পৌঁছানোর আগেই আচরণ ঠিক হয়ে গেছে।

**খেয়াল করুন: model দুই পক্ষের নির্দেশ একসাথে পড়ে, আর সাধারণত system prompt-কেই বেশি গুরুত্ব দেয়।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| আমার message-ই agent-এর একমাত্র নির্দেশ | তার আগে **system prompt আর `CLAUDE.md` পড়া হয়ে গেছে।** |
| System prompt ছোট একটা লাইন | Coding harness-এ এটা অনেক সময় বেশ বড়, কয়েক দশ হাজার token পর্যন্ত। প্রতি turn-এ এর দাম input token হিসেবে লাগে। |
| Agent আমার কথা মানছে না, তাই সে জেদি | **সম্ভবত সে system prompt মানছে,** আর আপনার message তর্কে হারছে। |

**উপমা / Analogy:** অফিসের service rule। বস আজ যা-ই বলুক, **নতুন কর্মী আগে service rule মানে।** *Office service rules: a new employee follows them before anything the boss says today.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent জেদ করে কোনো format মানলে **আগে system prompt আর `CLAUDE.md` দেখুন।**
> - কিছু harness-এ system prompt পুরোটা দেখা আর বদলানো যায়। সুযোগ থাকলে একবার পড়ে দেখুন agent-কে আসলে কী বলা হচ্ছে।

**সম্পর্কিত শব্দ:** [Harness](#harness--হার্নেস) · [Prefix cache](#prefix-cache--প্রিফিক্স-ক্যাশ) · [Input tokens](#input-tokens--ইনপুট-টোকেন) · [AGENTS.md](#agentsmd--এজেন্টসএমডি)

---

### Session · সেশন

> [!NOTE]
> **এক কথায়:** Session হলো **একবার বসে agent-এর সাথে কাজ করার একটা সীমাবদ্ধ পালা**, খালি শুরু থেকে clear, close বা compact পর্যন্ত।
>
> **In short:** A session is **one bounded run of working with an agent**. Its message history is the agent's working memory, and it dies when the session ends.

#### ব্যাপারটা কী?

কাল রাতে agent আপনার codebase ভালোই চিনত। আজ সকালে সে কিছুই চেনে না। **কী হলো?** কাল ছিল এক session, আজ আরেক। Model stateless, তাই যা কিছু মনে আছে বলে মনে হয়, সবই session-এর message history-তে, যা প্রতি request-এ আবার পাঠানো হয়। **Session-এ যা নেই, agent-এর কাছে তা নেই।**

#### Session-এর জীবনচক্র

| পর্ব | কী ঘটে |
|---|---|
| শুরু | খালি। শুধু system prompt আর `CLAUDE.md` |
| মাঝখান | Message, tool result আর পড়া ফাইল জমতে থাকে, window ভরে |
| শেষ | Clear করলে বা close করলে সব যায়। Compact করলে সারসংক্ষেপ নিয়ে নতুন session |
| যা টিকে থাকে | **Filesystem।** এক session-এ লেখা ফাইল পরের session পড়তে পারে |

#### একটা কাজ ধরে দেখি

একটা session-এ দুটো আলাদা টিকিট:

1. সকালে আপনি payment bug ঠিক করালেন। Session-এ জমল চেক, retry আর timeout-এর অনেক আলোচনা।
2. কাজ শেষ। আপনি `/clear` না দিয়ে একই session-এ search page-এর নতুন কাজ দিলেন।
3. Agent search code লেখার মাঝে retry আর timeout-এর কথা টানতে শুরু করল। আগের কাজের ছাপ পরের উত্তরে পড়ছে।
4. আপনি `/clear` দিয়ে নতুন session খুললেন, আর search-এর কাজটা সংক্ষেপে আবার বুঝিয়ে দিলেন।
5. Agent এবার শুধু search নিয়ে ভাবল।

**খেয়াল করুন: session-এর সবকিছু পরের প্রতিটা turn-কে প্রভাবিত করে। কোথায় শেষ করবেন, সেটা আপনার সিদ্ধান্ত।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Session যত লম্বা, agent তত বেশি চেনে | লম্বা session ফুলে যায়, তখন উত্তর খারাপ হতে পারে। **ফুললে handoff বা compact করুন।** |
| Session শেষ হলেও agent মনে রাখবে | **নতুন session খালি।** টেকে শুধু ফাইল। |
| সব কাজ এক session-এ করাই সুবিধা | আলাদা কাজ মেশালে আগের কাজের ছাপ পরের উত্তরে পড়ে। |

**উপমা / Analogy:** একটা ফোন কল। **কলের মধ্যে সব মনে থাকে, ফোন কাটলে শেষ।** পরের কলে আবার শুরু। *A phone call: everything is remembered during the call, gone when it ends.*

> [!TIP]
> **কাজে লাগান:**
>
> - **এক session-এ এক কাজ।** একটা টিকিট শেষ হলে `/clear`, তারপর পরেরটা।
> - বড় কাজ এক window-তে না ধরলে কয়েক session-এ ভাগ করুন, আর মাঝে ফাইলে note রেখে যান।

**সম্পর্কিত শব্দ:** [Turn](#turn--টার্ন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Clearing](#clearing--ক্লিয়ারিং) · [Handoff](#handoff--হ্যান্ডঅফ)

---

### Turn · টার্ন

> [!NOTE]
> **এক কথায়:** Turn হলো **আপনার একটা message আর agent আপনার কাছে ফিরে আসা পর্যন্ত সে যা কিছু করে**, এই পুরোটা।
>
> **In short:** A turn is **your one message plus everything the agent does** until it hands control back to you. A turn can hold many model requests.

#### ব্যাপারটা কী?

আপনি একটা ছোট প্রশ্ন করলেন, আর agent দুই মিনিট ধরে কাজ করল। **এত সময় কোথায় গেল?** ওই পুরো সময়টা এক turn। Turn-এর ভেতরে agent অনেকবার model-কে ডাকতে পারে, ফাইল পড়তে পারে, test চালাতে পারে। **Turn কত লম্বা হবে, সেটা agent ঠিক করে, আপনি না।** সে ফিরে এলে turn শেষ, আপনার পরের message নতুন turn শুরু করে।

<figure class="diagram">
<svg viewBox="0 0 560 230" role="img" aria-label="A session contains turns. Turn 1 holds one request. Turn 2 holds three requests because the agent called tools.">
  <rect class="node skip" x="20" y="20" width="520" height="150" rx="16"/>
  <text class="start" x="36" y="40">Session</text>
  <rect class="node skip" x="36" y="55" width="130" height="100" rx="12"/>
  <text class="start" x="46" y="73">Turn 1</text>
  <rect class="node down" x="51" y="95" width="100" height="40" rx="8"/><text x="101" y="115">request</text>
  <rect class="node skip" x="180" y="55" width="350" height="100" rx="12"/>
  <text class="start" x="190" y="73">Turn 2</text>
  <rect class="node down" x="195" y="95" width="100" height="40" rx="8"/><text x="245" y="115">request</text>
  <rect class="node down" x="305" y="95" width="100" height="40" rx="8"/><text x="355" y="115">request</text>
  <rect class="node down" x="415" y="95" width="100" height="40" rx="8"/><text x="465" y="115">request</text>
  <text class="note" x="280" y="200">a turn ends when the agent hands control back to you</text>
</svg>
<figcaption>ক্রম হলো session, তার ভেতরে turn, তার ভেতরে request। A session holds turns, and each turn holds one or more requests.</figcaption>
</figure>

#### একটা কাজ ধরে দেখি

এক message, চোদ্দটা request:

1. আপনি লিখলেন, "failing test ঠিক করো।"
2. Agent test চালাল। এটা একটা tool call, মানে model-এর কাছে আরেকটা request।
3. Output দেখে সে ফাইল খুলল, আরেকটা request।
4. সে code বদলাল, আবার test চালাল, আরও কয়েকটা request।
5. মোট চোদ্দটা tool call হলো, প্রতিটা আলাদা request। প্রতিটার দেরি জমে গিয়ে দুই মিনিট হলো।
6. তারপর agent আপনার কাছে ফিরল। তখনই turn শেষ।

**খেয়াল করুন: turn-এর ভেতরে আপনি নেই। দিক বদলানোর সুযোগ মেলে দুই turn-এর মাঝের ফাঁকে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| এক message মানে এক request | এক turn-এ **এক বা একাধিক request থাকে,** tool ডাকলে অনেকগুলো। |
| Turn-এর মাঝে আমি কিছু করতে পারি না | অনেক harness-এ মাঝপথে থামিয়ে দিক বদলানো যায়। Agent কাজ করার সময় message লিখে রাখলে turn শেষে সেটা পড়া হয়। |
| লম্বা turn মানেই ভালো | লম্বা turn AFK কাজ সম্ভব করে, কিন্তু **কেউ দেখছে না বলে ভুলও বাড়ে।** |

**উপমা / Analogy:** কাজের লোককে বললেন "বাজার করে আনো"। সে দোকানে দোকানে ঘুরে, দরদাম করে, তারপর ফিরল। **ফেরার আগে আপনি কিছু বদলাতে পারেননি।** *You send someone to the bazaar; until they return, you can't redirect them.*

> [!TIP]
> **কাজে লাগান:**
>
> - বারবার ভুল দিকে গেলে **ছোট turn চান:** আগে plan, তারপর এক ধাপ এক ধাপ।
> - স্বাধীনতা কিছুটা ছাড়লে আপনি বেশি বার দিক ঠিক করার সুযোগ পান।

**সম্পর্কিত শব্দ:** [Session](#session--সেশন) · [Model provider request](#model-provider-request--মডেল-প্রোভাইডার-রিকোয়েস্ট) · [Tool call](#tool-call--টুল-কল) · [AFK](#afk--এএফকে)

---

## 3. Tools and environment · Tool আর কাজের জায়গা

How text from a model turns into real actions on your machine. **Model-এর লেখা কীভাবে আপনার machine-এ আসল কাজ হয়ে যায়।**

### Environment · এনভায়রনমেন্ট

> [!NOTE]
> **এক কথায়:** Environment হলো **agent যে জগতে কাজ করে আর যা বদলায়**, মানে আপনার ফাইল, database, API বা browser page।
>
> **In short:** The environment is **everything the agent acts on but does not run inside**: files, databases, remote APIs and browser sessions.

#### ব্যাপারটা কী?

আপনি Claude-কে বললেন "config ঠিক করো", আর সে করে দিল। তাহলে ওই config ফাইলটা আসলে কোথায় ছিল? **সেই জায়গাটাই environment।** Harness agent-কে চালায়, আর environment হলো agent-এর কাজের জায়গা। Agent সেটাকে **দেখে শুধু tool result দিয়ে, বদলায় শুধু tool call দিয়ে।** সবচেয়ে সাধারণ environment হলো filesystem, কিন্তু database, remote API বা browser session-ও হতে পারে। Environment কত বড় হবে, সেটা আপনি ঠিক করেন: sandbox তাকে ছোট করে, নতুন tool তাকে বড় করে।

#### Environment-এর কয়েকটা চেহারা

| Environment | Agent কীভাবে দেখে | Agent কীভাবে বদলায় |
|---|---|---|
| Filesystem | `Read`, search tool | `Write`, `Edit`, `Bash` |
| Database | query tool, ফলাফলের সারি | write query |
| Remote API | GET ধরনের call | POST ধরনের call |
| Browser page | page-এর snapshot | click, লেখা |

#### একটা কাজ ধরে দেখি

আপনি আর agent একই project-এ কাজ করছেন।

1. Agent `config.json` পড়ল। Tool result-এ এল `"timeout": 30`। এটা একটা **snapshot।**
2. আপনি ফাইলটা editor-এ খুলে হাতে `timeout` বদলে 60 করলেন।
3. Agent-এর context-এ এখনও 30 লেখা। ফাইল সরে গেছে, ছবি সরেনি।
4. আপনি জিজ্ঞেস করলেন "timeout এখন কত?" Agent আত্মবিশ্বাসের সাথে বলল 30।
5. আপনি বললেন "ফাইলটা আবার পড়ো।" নতুন tool result এল, ছবি ঠিক হলো।

**খেয়াল করুন: agent মিথ্যা বলেনি, তার ছবিটা পুরনো।** Environment বদলালে agent নিজে থেকে জানে না, যতক্ষণ না সে আবার তাকায়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Environment আর harness একই জিনিস | Harness হলো **মোড়ক,** যা agent-কে চালায়। Environment হলো **কাজের জায়গা।** `CLAUDE.md` থাকে environment-এ, আর harness সেটা context-এ তুলে আনে। |
| Agent সব সময় ফাইলের বর্তমান অবস্থা জানে | সে জানে **শেষবার যা পড়েছে।** পরে ফাইল বদলালে পুরনো কপি নিয়েই ভাবে। |
| Session শেষ হলে সব হারিয়ে যায় | Context যায়, কিন্তু **environment-এ লেখা ফাইল থেকে যায়।** কাল যা জানা দরকার, আজই ফাইলে লিখে রাখুন। |

**উপমা / Analogy:** রাঁধুনি চলে যায়, কিন্তু **রান্নাঘর থেকে যায়।** ফ্রিজে যা রেখে গেছে, কাল সকালে তা-ই পাওয়া যাবে। *The kitchen stays after the cook leaves; whatever is in the fridge is there tomorrow.*

> [!TIP]
> **কাজে লাগান:**
>
> - হাতে কোনো ফাইল বদলালে **Claude-কে বলুন ফাইলটা আবার পড়তে।**
> - Agent-এর যা পরে লাগবে, তা ফাইলে লিখে রাখুন: নোট, সিদ্ধান্ত, `CLAUDE.md`।
> - Agent কী ছুঁতে পারবে, তা **sandbox আর tool দিয়ে নিয়ন্ত্রণ করুন।**

**সম্পর্কিত শব্দ:** [Filesystem](#filesystem--ফাইলসিস্টেম) · [Tool](#tool--টুল) · [Tool result](#tool-result--টুল-রেজাল্ট) · [Sandbox](#sandbox--স্যান্ডবক্স)

---

### Filesystem · ফাইলসিস্টেম

> [!NOTE]
> **এক কথায়:** Filesystem হলো **ফাইল আর ফোল্ডারের গাছ**, coding agent-এর ডিফল্ট environment।
>
> **In short:** The filesystem is **the tree of files and folders** a coding agent reads, writes and runs commands in.

#### ব্যাপারটা কী?

Source code, build script, config আর `CLAUDE.md` সব কোথায় থাকে? ডিস্কের ফাইলে। Claude Code-কে "আপনার project-এ শুরু করো" বললে আসলে **agent-কে একটা filesystem-এর দিকে ঘুরিয়ে দেওয়া হয়।** Agent ফাইল ছোঁয় শুধু tool call দিয়ে: পড়া, লেখা, shell command। **ডিস্কে ফাইল থাকা মানে context-এ থাকা না।** Tool call না আনলে কিছুই context-এ ঢোকে না।

#### ডিস্কে থাকা বনাম context-এ থাকা

| | Filesystem (ডিস্ক) | Context |
|---|---|---|
| কী থাকে | project-এর সব ফাইল | শুধু যা এই কাজে পড়া হয়েছে |
| আকার | window-র চেয়ে অনেক বড় হতে পারে | window-র মাপে সীমিত |
| Session শেষে | থেকে যায় | মুছে যায় |

#### একটা কাজ ধরে দেখি

আপনার repo-তে দু হাজার ফাইল। আপনি জিজ্ঞেস করলেন: *"login-এর password যাচাই কোথায় হয়?"*

1. Agent পুরো repo পড়ে না। সে প্রথমে `Search` tool-এ `validatePassword` খোঁজে।
2. Tool result-এ তিনটা ফাইলের নাম আর লাইন আসে।
3. Agent শুধু সবচেয়ে সম্ভাব্য ফাইলটা `Read` করে।
4. সে উত্তর দেয়, আর আপনাকে ফাইলের নাম ও লাইন নম্বর বলে।
5. আপনি সেই ফাইল editor-এ খুলে নিজের চোখে মিলিয়ে নেন।

**খেয়াল করুন: দু হাজার ফাইলের মধ্যে context-এ ঢুকেছে মাত্র একটা।** এজন্যই window-র চেয়ে বড় repo-তেও agent কাজ করতে পারে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Project খোলা আছে মানে agent সব ফাইল জানে | Agent **শুধু সেটুকুই জানে, যা সে tool দিয়ে পড়েছে।** |
| `CLAUDE.md` লিখলাম, কিন্তু Claude মানছে না, তাই ফাইলটা ভুল | আগে দেখুন Claude **ঠিক ফোল্ডারে** চলছে কিনা। অন্য ফোল্ডার থেকে শুরু করলে সে অন্য filesystem দেখে। |
| Agent-এর edit করা ফাইল আলাদা কোথাও থাকে | **আপনি সেই একই ফাইলই** editor-এ খোলেন আর git-এ diff করেন। |

**উপমা / Analogy:** অফিসের আলমারিতে সব ফাইল আছে, কিন্তু **টেবিলে আনলে তবেই পড়া যায়।** *The office cupboard: every file is there, but you only read what you bring to the desk.*

> [!TIP]
> **কাজে লাগান:**
>
> - `CLAUDE.md` কাজ না করলে **আগে দেখুন Claude কোন ফোল্ডারে চলছে।**
> - Agent-এর কাজ review করতে git diff খুলুন। **Filesystem আপনাদের যৌথ কাজের টেবিল।**
> - দরকারি ফাইলের নাম আর পথ বলে দিন, agent নিজে খুঁজতে সময় নষ্ট করবে না।

**সম্পর্কিত শব্দ:** [Environment](#environment--এনভায়রনমেন্ট) · [Tool](#tool--টুল) · [Context](#context--কনটেক্সট) · [Context window](#context-window--কনটেক্সট-উইন্ডো)

---

### Tool · টুল

> [!NOTE]
> **এক কথায়:** Tool হলো **harness agent-কে যে function ডাকার সুযোগ দেয়**: Read, Write, Bash, Search।
>
> **In short:** A tool is **a function the harness lets the agent call**. The list of tools sets the ceiling of what the agent can do.

#### ব্যাপারটা কী?

Model নিজে শুধু লেখা লেখে। তাহলে সে ফাইল পড়ে কীভাবে? **Tool দিয়ে।** Environment দেখা আর বদলানোর একমাত্র পথ tool। Model নিজে কিছু চালায় না। সে **token লিখে একটা call বানায়,** আর harness সেই call পড়ে function চালায়। একটা tool-এর তিনটা অংশ: নাম, কী করে তার বর্ণনা, আর parameter-এর schema। Harness প্রতি request-এ এই তিনটা model-কে পাঠায়।

#### সাধারণ coding tool

| Tool | কী করে |
|---|---|
| `Read` | ফাইলের লেখা tool result হিসেবে ফেরত দেয় |
| `Write` / `Edit` | filesystem-এ ফাইল বানায় বা বদলায় |
| `Bash` | shell command চালিয়ে output দেয় |
| `Search` | পুরো codebase-এ pattern মিলিয়ে ফাইল বা লেখা খোঁজে |

#### একটা কাজ ধরে দেখি

আপনি জিজ্ঞেস করলেন: *"শেষ commit-এর message কী ছিল?"*

1. Model-এর context-এ tool-এর বর্ণনা আছে। সে জানে `Bash` নামে একটা tool আছে।
2. Model লেখে: `Bash` tool, argument `git log -1`।
3. Harness command চালায় আর output ফেরত দেয়।
4. Model output পড়ে আপনাকে message-টা বলে।

কিন্তু আপনি যদি আরও জিজ্ঞেস করেন "production database-এ কতগুলো user?", আর কোনো database tool না থাকে, তাহলে agent **পারবে না।**

**খেয়াল করুন: agent-এর ক্ষমতার সীমা হলো তার tool-এর তালিকা।** এজন্য agent এত Bash-নির্ভর: একটা shell tool দিয়েই system-এর বেশিরভাগ ছোঁয়া যায়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model যত দক্ষ, agent তত শক্তিশালী | দক্ষ model-এর tool কম হলে সে **সংকীর্ণ agent।** সবকিছু সে হাতের tool দিয়েই করে। |
| যত বেশি tool, তত ভালো | Tool-এর বর্ণনা **প্রতি request-এ context খায়,** আর কাছাকাছি বর্ণনায় model ভুল tool বাছে। |
| Model নিজে command চালায় | Model **শুধু লেখে।** চালায় harness। |

**উপমা / Analogy:** মিস্ত্রির যন্ত্রপাতির ব্যাগে **ড্রিল না থাকলে** দেয়ালে ছিদ্র হবে না, মিস্ত্রি যত দক্ষই হোক। *A mason's tool bag: no drill, no hole, however skilled the mason.*

> [!TIP]
> **কাজে লাগান:**
>
> - নতুন ক্ষমতা দিতে চাইলে **তার জন্য একটা tool যোগ করুন।** Harness-এর বাইরের tool জোড়ার standard হলো MCP।
> - যে MCP server-এর tool কাজে লাগে না, **সেটা বন্ধ রাখুন।** Context বাঁচবে।
> - Agent কিছু করতে না পারলে আগে ভাবুন: **এই কাজের tool কি তার হাতে আছে?**

**সম্পর্কিত শব্দ:** [Tool call](#tool-call--টুল-কল) · [MCP](#mcp--এমসিপি) · [Environment](#environment--এনভায়রনমেন্ট) · [Harness](#harness--হার্নেস)

---

### Tool call · টুল কল

> [!NOTE]
> **এক কথায়:** Tool call হলো **model-এর লেখা একটা কাঠামোবদ্ধ অনুরোধ**, যা নিজে থেকে কিছুই করে না।
>
> **In short:** A tool call is **the model's written request** naming a tool and its arguments. It is only text until the harness acts on it.

#### ব্যাপারটা কী?

Claude বলল "আমি test চালিয়েছি", কিন্তু কিছুই হয়নি। এমন কেন হয়? কারণ tool call **লেখা মাত্র, কাজ না।** Model শুধু নাম আর argument লিখে থামে, সাধারণত JSON আকারে। **চালানো, যাচাই করা আর ফল ফেরত দেওয়া harness-এর কাজ।** এক turn-এ এমন আসা-যাওয়া অনেকবার হয়।

#### একটা call-এর পাঁচ ধাপ

| ধাপ | কে | কী হয় |
|---|---|---|
| 1 | Model | system prompt-এর বর্ণনা থেকে জানে কোন tool আছে |
| 2 | Model | নাম আর argument লেখে, তারপর থামে |
| 3 | Harness | call পড়ে permission mode-এর সাথে মেলায় |
| 4 | Harness | অনুমতি থাকলে চালায় |
| 5 | Harness | ফল পরের request-এ tool result হিসেবে পাঠায় |

#### একটা কাজ ধরে দেখি

আপনি বললেন: *"`formatDate` helper-টা একটা নতুন ফাইলে আলাদা করো।"* আপনার ফোল্ডারের নাম `src/util/`, কিন্তু model লিখল `src/utils/`।

1. Model একটা `Write` call লেখে, path `src/utils/date.ts`।
2. Harness permission মেলায় আর অনুমতি পায়।
3. Harness **যা লেখা আছে, ঠিক তা-ই চালায।** নতুন `src/utils/` ফোল্ডার বানিয়ে সেখানে ফাইল লেখে।
4. Tool result আসে: "সফল।" Model খুশি।
5. আপনার project-এ এখন `util` আর `utils`, দুটো ফোল্ডার।

**খেয়াল করুন: harness model-এর মনের কথা চালায় না, লেখাটা চালায়।** ভুল path-এ সুন্দর error আসে না, ভুল জায়গায় ফাইল তৈরি হয়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model "test চালিয়েছি" বললে test চলেছে | সে হয়তো শুধু **বর্ণনা** করেছে। Transcript-এ দেখুন আসলে call লেখা হয়েছিল কিনা। |
| Tool call সব সময় নিখুঁত | Call-ও next-token prediction দিয়ে তৈরি। **ভুল path বা নেই-এমন flag** আসতে পারে। |
| Model-এর call মানেই কাজ হয়ে গেছে | Harness না চালালে **কিছুই হয়নি।** |

**উপমা / Analogy:** হোটেলে অর্ডারের কাগজে লিখলেই খাবার আসে না। **ওয়েটার রান্নাঘরে নিয়ে গেলে** তবেই আসে। *Writing an order on paper doesn't cook the food; the waiter has to carry it.*

> [!TIP]
> **কাজে লাগান:**
>
> - Claude দাবি করল কিছু চালিয়েছে, অথচ ফল নেই? **Transcript-এ tool call খুঁজুন।**
> - নতুন ফাইল বা ফোল্ডার তৈরি হলে **path টা একবার চোখে দেখে নিন,** বিশেষ করে `git status` দিয়ে।
> - ঝুঁকির call-এ permission request অন রাখুন, ভুল call পৌঁছানোর আগেই ধরা পড়বে।

**সম্পর্কিত শব্দ:** [Tool](#tool--টুল) · [Tool result](#tool-result--টুল-রেজাল্ট) · [Permission request](#permission-request--পারমিশন-রিকোয়েস্ট) · [Harness](#harness--হার্নেস)

---

### Tool result · টুল রেজাল্ট

> [!NOTE]
> **এক কথায়:** Tool result হলো **tool চালানোর পর harness যা ফেরত দেয়**: ফাইলের লেখা, command-এর output বা error।
>
> **In short:** A tool result is **what the harness sends back** after running a tool call: file text, command output or an error. It is the agent's only window onto the environment.

#### ব্যাপারটা কী?

Agent আপনার system সম্পর্কে একটা ভুল কথা বিশ্বাস করছে। সে কোথা থেকে জানল? **Tool result থেকে।** Environment দেখার একমাত্র জানালা এটাই। Model ফল পড়ে ঠিক করে: আরেকটা tool call করবে, নাকি চূড়ান্ত উত্তর দেবে। আর ফল একবার ঢুকলে **session শেষ পর্যন্ত context-এ থেকে যায়।** Coding session-এর context-এর বেশিরভাগটাই আসলে tool result।

#### একটা কাজ ধরে দেখি

আপনি বললেন: *"পুরো test suite চালাও, কোনটা fail করছে দেখো।"*

1. Agent `npm test` চালানোর call লেখে।
2. Harness command চালায়। Output চার হাজার লাইনের verbose log।
3. Harness পুরো log context-এ জোড়ে আর পরের request-এ পাঠায়।
4. Agent log পড়ে একটা fail ধরে। কিন্তু log-এর চার হাজার লাইন **এখন context-এ বসে আছে,** কাজ ফুরোলেও।
5. পরের কয়েকটা কাজে window দ্রুত ভরে যায়, আর agent-এর মনোযোগ পাতলা হয়।

**খেয়াল করুন: দু-একটা বড় ফলই কথোপকথনের চেয়ে দ্রুত window ভরে দিতে পারে।** তাই শুধু fail-হওয়া test চালানো ভালো।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model ফলের পেছনের আসল অবস্থা যাচাই করে | সে **শুধু যা পেয়েছে তা-ই** জানে। Output কাটা পড়লে বা error এলে সে তা-ই সত্য ধরে নেয়। |
| ফল পড়া হয়ে গেলে context থেকে সরে যায় | ফল **session শেষ পর্যন্ত থাকে** আর token আটকে রাখে। |
| Agent ভুল বুঝলে model-এর দোষ | প্রায়ই দোষ একটা **tool result-এর:** সে ভুল বা অসম্পূর্ণ খবর দিয়েছে। |

**উপমা / Analogy:** ওয়েটার রান্নাঘর থেকে যা এনে দিল, **আপনি তা-ই খাবেন।** ভুল খাবার আনলেও আপনার কাছে সেটাই "অর্ডার"। *Whatever the waiter brings back is what you eat.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent অদ্ভুত কিছু বিশ্বাস করলে **transcript-এ সেই tool result খুঁজুন,** যেটা ভুল খবর দিয়েছে।
> - লম্বা log বা generated ফাইল পুরোটা পড়াবেন না। **ছেঁকে নিতে বলুন:** শুধু error লাইন, শুধু fail-হওয়া test।
> - Context ভরে গেলে `/compact` বা `/clear` ব্যবহার করুন।

**সম্পর্কিত শব্দ:** [Tool call](#tool-call--টুল-কল) · [Environment](#environment--এনভায়রনমেন্ট) · [Context](#context--কনটেক্সট) · [Context window](#context-window--কনটেক্সট-উইন্ডো)

---


<figure class="diagram">
<svg viewBox="0 0 560 280" role="img" aria-label="The agent loop. You send a message to the model. The model writes a tool call, the harness asks permission and runs it in the environment, and the tool result goes back to the model. This loops until the model answers.">
  <defs><marker id="d4-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="40" y="15" width="140" height="46" rx="10"/><text x="110" y="38">You</text>
  <path class="arrow" marker-end="url(#d4-arrow)" d="M125 63 L125 106"/><text class="note" x="168" y="85">message</text>
  <path class="arrow" marker-end="url(#d4-arrow)" d="M95 108 L95 65"/><text class="note" x="55" y="85">answer</text>
  <rect class="node down" x="40" y="110" width="140" height="56" rx="10"/><text x="110" y="138">Model</text>
  <path class="arrow" marker-end="url(#d4-arrow)" d="M182 125 L376 125"/><text class="note" x="280" y="113">tool call</text>
  <path class="arrow" marker-end="url(#d4-arrow)" d="M378 152 L184 152"/><text class="note" x="280" y="166">tool result</text>
  <text class="note" x="280" y="139">loop until done</text>
  <text class="note" x="450" y="97">asks permission?</text>
  <rect class="node" x="380" y="110" width="140" height="56" rx="10"/><text x="450" y="138">Harness</text>
  <path class="arrow" marker-end="url(#d4-arrow)" d="M450 168 L450 211"/><text class="note start" x="458" y="190">runs it</text>
  <rect class="node up" x="380" y="215" width="140" height="50" rx="10"/><text x="450" y="233">Environment</text><text class="note" x="450" y="253">files, shell</text>
</svg>
<figcaption>The agent loop. The model only writes text. A tool call is a request that the harness runs in the environment, after a permission check, and the tool result goes back to the model. This repeats until the model answers without a tool call. Model লেখে, harness কাজ করে।</figcaption>
</figure>

### MCP · এমসিপি

> [!NOTE]
> **এক কথায়:** MCP (Model Context Protocol) হলো **বাইরের tool server harness-এ জোড়ার একটা standard।**
>
> **In short:** MCP, the Model Context Protocol, is **a standard for plugging outside tool servers** into a harness, so one server works with many harnesses.

#### ব্যাপারটা কী?

ধরুন আপনি চান agent GitHub বা Slack-এর সাথে কথা বলুক। Harness-এর সাথে আসা tool-এ সেটা নেই। তাহলে? **MCP হলো অতিরিক্ত tool পাওয়ার পথ।** Harness একটা MCP server-এর সাথে জোড়ে, server বলে সে কোন tool দেয়, আর সেগুলো built-in tool-এর পাশেই agent-এর সামনে এসে যায়। মজার কথা, **agent "MCP ডাকে" না।** সে শুধু একটা tool ডাকে, আর harness সেই tool কোনো MCP server থেকে পেয়েছে।

<figure class="diagram">
<svg viewBox="0 0 560 240" role="img" aria-label="One harness connects through the MCP standard to three tool servers: GitHub, Slack and a database.">
  <defs><marker id="3-mcp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="80" width="130" height="60" rx="10"/><text x="85" y="110">Harness</text>
  <rect class="node" x="380" y="20" width="160" height="40" rx="8"/><text x="460" y="40">GitHub server</text>
  <rect class="node" x="380" y="95" width="160" height="40" rx="8"/><text x="460" y="115">Slack server</text>
  <rect class="node" x="380" y="170" width="160" height="40" rx="8"/><text x="460" y="190">Database server</text>
  <path class="arrow" d="M150 100 L378 40" marker-end="url(#3-mcp-arrow)"/>
  <path class="arrow" d="M150 110 L378 115" marker-end="url(#3-mcp-arrow)"/>
  <path class="arrow" d="M150 120 L378 190" marker-end="url(#3-mcp-arrow)"/>
  <text class="note" x="265" y="98">MCP standard</text>
  <text class="note" x="265" y="226">their tools show up next to the built-in ones</text>
</svg>
<figcaption>One standard connects the harness to many servers. MCP-এর এক মান দিয়ে একটা harness অনেক server-এর সাথে জোড়ে।</figcaption>
</figure>

#### MCP server কী কী দিতে পারে

| জিনিস | মানে | কতটা সাধারণ |
|---|---|---|
| Tool | agent যে function ডাকে | প্রধান কাজ |
| Resource | শুধু পড়ার তথ্য | মাঝে মাঝে |
| Prompt | পুনর্ব্যবহারযোগ্য template | মাঝে মাঝে |

#### একটা কাজ ধরে দেখি

আপনি GitHub MCP server চালু করে বললেন: *"আমার খোলা issue-গুলোর সারাংশ দাও।"*

1. Harness শুরুতেই server থেকে tool-এর বর্ণনা এনে context-এ রেখেছে।
2. Model দেখে `list_issues` নামে একটা tool আছে, আর সেটা ডাকার call লেখে।
3. Harness server-কে অনুরোধ পাঠায়, আর ফল tool result হয়ে ফেরে।
4. Model সারাংশ লেখে।

**খেয়াল করুন: দাম দিতে হয় context দিয়ে।** প্রতিটা tool-এর schema আগেই window-তে ঢোকে। কয়েকটা বড় server বসালে আপনি কিছু লেখার আগেই **কয়েক হাজার token** শেষ হয়ে যায়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| MCP একটা নতুন ধরনের AI | MCP একটা **protocol,** মানে সংযোগের নিয়ম। কোনো model না। |
| প্রতিটা harness-কে নিজের GitHub integration লিখতে হয় | MCP-তে **একবার server লিখলেই** সব MCP-সমর্থিত harness ব্যবহার করতে পারে। |
| বেশি server চালু রাখলে ক্ষতি নেই | প্রতিটা tool context খায়, আর কাছাকাছি বর্ণনায় model **ভুল tool বাছে।** |

**উপমা / Analogy:** Bangla QR। আগে bKash, Nagad আর ব্যাংকের আলাদা QR লাগত। এখন **এক মান,** সব wallet চলে। *Bangla QR: one standard, every wallet works with it.*

> [!TIP]
> **কাজে লাগান:**
>
> - যে project-এ যে server লাগে না, **সেটা বন্ধ রাখুন।**
> - অনেক harness এখন **tool search** করে: দরকার হলে তবেই পুরো বর্ণনা আনে। আপনার harness-এ থাকলে চালু রাখুন।
> - `/context` দিয়ে দেখুন MCP tool কত জায়গা নিচ্ছে।

**সম্পর্কিত শব্দ:** [Tool](#tool--টুল) · [Tool call](#tool-call--টুল-কল) · [Harness](#harness--হার্নেস) · [Context window](#context-window--কনটেক্সট-উইন্ডো)

---

### Permission request · পারমিশন রিকোয়েস্ট

> [!NOTE]
> **এক কথায়:** Permission request হলো **আগে অনুমোদন না থাকা tool call চালানোর আগে harness আপনাকে যা জিজ্ঞেস করে।**
>
> **In short:** A permission request is **the prompt the harness shows you** before running a tool call that was not approved in advance.

#### ব্যাপারটা কী?

Claude হঠাৎ থেমে জিজ্ঞেস করল "এই command চালাব?" এটাই permission request। Model একটা tool call বানায়, কিন্তু harness সাথে সাথে চালায় না। **সে থামে আর আপনাকে জিজ্ঞেস করে।** ঝুঁকির কাজে মানুষকে loop-এ রাখার উপায় এটাই। আপনার তিনটা পথ আছে: **একবার হ্যাঁ, পুরো session-এর জন্য হ্যাঁ, বা না।**

#### আপনার তিন উত্তর

| উত্তর | কী হয় |
|---|---|
| একবার হ্যাঁ | call চলে, পরেরবার আবার জিজ্ঞেস করবে |
| Session-এর জন্য হ্যাঁ | এই ধরনের call আর জিজ্ঞেস না করে চলবে |
| না | harness প্রত্যাখ্যানটা tool result হিসেবে model-কে জানায় |

#### একটা কাজ ধরে দেখি

আপনি বললেন: *"পুরনো build পরিষ্কার করে নতুন করে build দাও।"*

1. Agent `rm -rf dist build` চালানোর call লেখে।
2. Harness দেখে এটা আগে অনুমোদিত না, তাই থামে আর আপনাকে command-টা দেখায়।
3. আপনি `build` ফোল্ডারটা চেনেন না, তাই "না" বলেন, সাথে কারণ লেখেন: "শুধু `dist` মোছো, `build`-এ হাত দিয়ো না।"
4. Harness এই প্রত্যাখ্যান আর আপনার লেখা model-কে পাঠায়।
5. Model `rm -rf dist` দিয়ে নতুন call লেখে, আর এবারের request-টা আপনি অনুমোদন করেন।

**খেয়াল করুন: "না" বলাও agent-কে দিক দেখায়।** কারণ লিখলে সেটা ঠিক তখনই পৌঁছায়, যখন model পরের পদক্ষেপ ঠিক করছে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Permission request মানে agent আটকে গেছে | এটা **ইচ্ছাকৃত থামা।** মানুষ জড়ানোর জায়গা। |
| শুধু "হ্যাঁ" বা "না" বলা যায় | প্রত্যাখ্যানের সাথে **কারণ লিখে** agent-কে অন্য পথ দেখানো যায়। |
| যত বেশি জিজ্ঞেস করে, তত নিরাপদ | বারবার না ভেবে approve চাপলে **সুরক্ষা থাকে না,** শুধু বিরক্তি থাকে। |

**উপমা / Analogy:** bKash-এ টাকা পাঠানোর আগে PIN চাওয়া। **নিরাপদ, কিন্তু আপনি ফোন না ধরলে টাকা যাবে না।** *bKash asking for your PIN before sending: safe, but nothing moves until you answer.*

> [!TIP]
> **কাজে লাগান:**
>
> - নিরাপদ কাজ, যেমন পড়া আর test চালানো, **আগে থেকে allow করে রাখুন।** তাহলে প্রশ্ন শুধু ঝুঁকির কাজে আসবে।
> - প্রত্যাখ্যান করলে **কারণ লিখে দিন।**
> - যে agent বারবার request তোলে, তাকে AFK ছাড়া যায় না। আগে permission ঠিক করুন, নয়তো sandbox বানান।

**সম্পর্কিত শব্দ:** [Permission mode](#permission-mode--পারমিশন-মোড) · [Tool call](#tool-call--টুল-কল) · [Human-in-the-loop](#human-in-the-loop--হিউম্যান-ইন-দ্য-লুপ) · [AFK](#afk--এএফকে)

---

### Permission mode · পারমিশন মোড

> [!NOTE]
> **এক কথায়:** Permission mode হলো **কোন tool call permission request তুলবে আর কোনটা নিজে চলবে, সেই নিয়ম।**
>
> **In short:** A permission mode is **the rule for which tool calls ask first** and which run on their own.

#### ব্যাপারটা কী?

Agent কি প্রতিটা ফাইল পড়ার আগেও অনুমতি চাইবে? নাকি যা ইচ্ছা চালিয়ে দেবে? **এই নিয়মটাই permission mode।** এটা একটা ডায়াল, যার এক প্রান্তে সবকিছুতে জিজ্ঞেস করা, অন্য প্রান্তে কিছুতেই না। কোথায় ডায়াল রাখবেন, সেটা **নিরাপত্তা আর বিরক্তির মধ্যে লেনদেন,** আর দুই দিকেই ভুলের ফল টের পাওয়া যায়।

#### চার ধাপের সিঁড়ি

| Mode | পড়া | লেখা আর shell | কখন |
|---|---|---|---|
| Read-only বা plan | নিজে | বন্ধ | গবেষণা, পরিকল্পনা, review |
| Default | নিজে | জিজ্ঞেস করে | রোজকার নজরদারির কাজ |
| Auto-edit | নিজে | edit নিজে, shell জিজ্ঞেস করে | বিশ্বাসযোগ্য repo, যান্ত্রিক বদল |
| Full-auto ("yolo") | নিজে | নিজে | sandbox, AFK কাজ |

#### একটা কাজ ধরে দেখি

আপনি agent-কে দিয়ে একটা পুরনো module বুঝতে চাইছেন। সে ত্রিশটা ফাইল `grep` আর `Read` করবে।

1. Default mode-এ প্রতিটা `grep`-এ agent থামে। আপনি ত্রিশবার "হ্যাঁ" চাপেন।
2. ষষ্ঠবারের পর আপনি না পড়েই চাপতে থাকেন। এখন সুরক্ষা শূন্য, বিরক্তি পুরো।
3. আপনি mode বদলে পড়ার কাজ নিজে চলতে দেন। লেখা আর shell এখনও জিজ্ঞেস করে।
4. Agent এক টানে ত্রিশ ফাইল পড়ে সারাংশ দেয়।
5. যখন সে ফাইল edit করতে চায়, তখন আবার আপনাকে জিজ্ঞেস করে। এবার আপনি সত্যিই পড়ে দেখেন।

**খেয়াল করুন: খুব কড়া হলে আপনিই বাধা,** আর খুব ঢিলা হলে আসে surprise। মাঝামাঝি পথে পড়া খোলা, লেখা আপনার নজরে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| সব কিছু জিজ্ঞেস করাই সবচেয়ে নিরাপদ | না ভেবে সিল মারলে **সুরক্ষা নেই, শুধু বিরক্তি।** |
| Full-auto সব সময় বিপজ্জনক | **Sandbox-এর ভেতরে** এটা সবচেয়ে ন্যায্য, কারণ ক্ষতি আটকে থাকে। |
| Permission mode একবার ঠিক করলে আর বদলানো যায় না | কাজের ধাপ আর বিশ্বাস অনুযায়ী **বদলাতে থাকবেন।** |

**উপমা / Analogy:** বাসার চাবি। **মেহমান পায় শুধু বসার ঘর,** কাজের লোক রান্নাঘর পর্যন্ত, পরিবারের মানুষ সব ঘর। *House keys: guests get the living room, helpers the kitchen, family everything.*

> [!TIP]
> **কাজে লাগান:**
>
> - **পড়ার কাজ খোলা রাখুন,** অপরিবর্তনীয় কাজে নিজে থাকুন।
> - Full-auto রাখুন শুধু sandbox-এর ভেতরে।
> - নিজেকে প্রশ্ন করুন: আমি কি প্রতিটা prompt পড়ে approve করছি? না পড়লে mode আপনার বিশ্বাসের চেয়ে কড়া।

**সম্পর্কিত শব্দ:** [Permission request](#permission-request--পারমিশন-রিকোয়েস্ট) · [Agent mode](#agent-mode--এজেন্ট-মোড) · [Sandbox](#sandbox--স্যান্ডবক্স) · [AFK](#afk--এএফকে)

---

### Agent mode · এজেন্ট মোড

> [!NOTE]
> **এক কথায়:** Agent mode হলো **permission mode আর আচরণের নির্দেশ একসাথে বাঁধা একটা preset।**
>
> **In short:** An agent mode is **a preset that bundles a permission mode with behaviour instructions** in the system prompt.

#### ব্যাপারটা কী?

Claude Code-এ plan mode চালু করলে সে ফাইল edit করে না, আর অদ্ভুতভাবে **edit করার চেষ্টাও করে না।** শুধু edit আটকালে তো সে চেষ্টা করেই যেত। এর কারণ, mode দুটো জিনিস একসাথে বদলায়: **একটা gate আর একটা নির্দেশ।** Gate ঠিক করে কোন call পার হবে। নির্দেশ agent-কে বলে সে এখন পরিকল্পনার ধাপে আছে। এই বাঁধাই একটা permission mode-কে agent mode বানায়।

<figure class="diagram">
<svg viewBox="0 0 560 160" role="img" aria-label="A permission mode (the gate) and behaviour instructions (the steering) are bundled together into one agent mode.">
  <defs><marker id="3-agentmode-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="20" y="20" width="190" height="44" rx="8"/><text x="115" y="42">permission mode</text>
  <rect class="node" x="20" y="96" width="190" height="44" rx="8"/><text x="115" y="118">instructions</text>
  <rect class="node down" x="360" y="58" width="180" height="50" rx="10"/><text x="450" y="83">Agent mode</text>
  <path class="arrow" d="M210 42 L358 75" marker-end="url(#3-agentmode-arrow)"/>
  <path class="arrow" d="M210 118 L358 92" marker-end="url(#3-agentmode-arrow)"/>
  <text class="note" x="284" y="38">the gate</text>
  <text class="note" x="284" y="138">the steering</text>
</svg>
<figcaption>Gate and steering bundled together make one mode. Gate আর দিকনির্দেশ একসাথে বাঁধলে একটা agent mode হয়।</figcaption>
</figure>

#### Claude Code-এর mode-গুলো

| Mode | কী করে | কখন |
|---|---|---|
| default | ঝুঁকির কাজে জিজ্ঞেস করে | রোজকার কাজ |
| plan | edit বন্ধ, গবেষণার দিকে ঝোঁক | পদ্ধতি ঠিক করার সময় |
| accept-edits | edit নিজে অনুমোদন | agent বুঝেছে দেখার পর |
| bypass permissions | সব নিজে অনুমোদন, ডাকনাম YOLO | শুধু sandbox-এ AFK কাজ |

#### একটা কাজ ধরে দেখি

আপনি একটা বড় refactor করতে চান।

1. আপনি plan mode-এ শুরু করেন। Agent কোড পড়ে, প্রশ্ন করে, একটা পরিকল্পনা লেখে। কিছু বদলায় না।
2. পরিকল্পনা পছন্দ হলে default mode-এ যান। প্রথম দু-তিনটা edit আপনি নিজে দেখে অনুমোদন করেন।
3. Agent বিষয়টা বুঝেছে দেখে accept-edits-এ যান। এবার edit আর জিজ্ঞেস করে না।
4. সব শেষে test-এর লম্বা run আছে। সেটা sandbox-এ bypass mode-এ চালান।

**খেয়াল করুন: প্রতিবার mode বদলাতে কিছুই হারায়নি।** কথোপকথন ঠিক যেখানে ছিল সেখানেই চলেছে, শুধু নতুন permission আর নতুন নির্দেশ নিয়ে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Plan mode মানে শুধু edit বন্ধ | সে agent-কেও **বলে দেয় সে পরিকল্পনার ধাপে আছে,** তাই সে লড়াই করে না। |
| Mode বদলাতে নতুন session লাগে | **Session-এর মাঝখানেই** বদলানো যায়। |
| Permission mode আর agent mode একই | Permission mode শুধু **gate।** Agent mode হলো gate আর নির্দেশ, দুটো। |

**উপমা / Analogy:** ফোনের profile: Silent, Meeting, General। **Meeting দিলে শুধু রিং বন্ধ হয় না,** পুরো আচরণ বদলায়। *Phone profiles: "Meeting" changes the whole behaviour, not just the ringer.*

> [!TIP]
> **কাজে লাগান:**
>
> - Claude Code-এ **Shift+Tab** দিয়ে mode বদলান। শুধু plan চাইলে plan mode।
> - **বিশ্বাস বাড়লে mode বদলান:** plan, তারপর default, তারপর accept-edits।
> - Claude Code একে "permission mode" বলে, Codex বলে "approval mode"। দুই নামেই একই ধারণা।

**সম্পর্কিত শব্দ:** [Permission mode](#permission-mode--পারমিশন-মোড) · [System prompt](#system-prompt--সিস্টেম-প্রম্পট) · [Harness](#harness--হার্নেস) · [Session](#session--সেশন)

---

### Sandbox · স্যান্ডবক্স

> [!NOTE]
> **এক কথায়:** Sandbox হলো **আলাদা করে বেড়া দেওয়া environment**, যার ভেতরে agent চলে।
>
> **In short:** A sandbox is **an isolated, fenced-off environment** the agent runs inside, so mistakes stay contained.

#### ব্যাপারটা কী?

Agent ভুল করে `rm -rf` চালালে কী হবে? Sandbox থাকলে **ক্ষতি বেড়ার ভেতরেই থেমে যায়।** এটা হতে পারে container, VM, সাময়িক filesystem বা সীমিত অনুমতির shell। Permission আর sandbox একই সমস্যা দুই দিক থেকে ধরে। **Permission কাজ চলার আগে জিজ্ঞেস করে। Sandbox কাজ চললেও তার নাগাল সীমিত রাখে।** Permission খরচ করে আপনার মনোযোগ, sandbox খরচ করে infrastructure।

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="Inside a dashed fence the agent works with a project copy and temp files. Outside the fence, git credentials and a production API stay out of reach.">
  <defs><marker id="3-sandbox-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node skip" x="20" y="20" width="330" height="190" rx="16"/>
  <text class="start" x="36" y="38">Sandbox</text>
  <rect class="node down" x="40" y="75" width="110" height="50" rx="10"/><text x="95" y="100">Agent</text>
  <rect class="node" x="190" y="65" width="140" height="44" rx="8"/><text x="260" y="87">project copy</text>
  <rect class="node" x="190" y="135" width="140" height="44" rx="8"/><text x="260" y="157">temp files</text>
  <path class="arrow" d="M150 92 L188 87" marker-end="url(#3-sandbox-arrow)"/>
  <path class="arrow" d="M150 108 L188 150" marker-end="url(#3-sandbox-arrow)"/>
  <rect class="node up" x="380" y="65" width="160" height="44" rx="8"/><text x="460" y="87">git credentials</text>
  <rect class="node up" x="380" y="135" width="160" height="44" rx="8"/><text x="460" y="157">production API</text>
  <path class="edge" d="M350 87 L380 87 M350 157 L380 157"/>
  <text class="note" x="280" y="234">outside the fence: out of reach unless you allow it</text>
</svg>
<figcaption>The agent works inside the fence; what is outside stays out of reach. Agent বেড়ার ভেতরে কাজ করে, বাইরেরটা নাগালের বাইরে।</figcaption>
</figure>

#### বেড়ার তিন ধাপ

| ধাপ | কী | কী আটকায় |
|---|---|---|
| Restricted shell | প্রতিটা command-এর চারপাশে OS-স্তরের বেড়া | project-এর বাইরে লেখা, network |
| Container | নতুন filesystem, credential নেই, শেষে ফেলে দেওয়া হয় | agent নিজের machine-এ যা করে |
| VM বা cloud | পুরোপুরি আলাদা machine | প্রায় সবকিছু |

#### একটা কাজ ধরে দেখি

আপনি রাতভর একটা বড় migration চালাতে চান, bypass mode-এ। কিন্তু ভরসা পাচ্ছেন না।

1. আপনি একটা নতুন container বানান। ভেতরে project-এর শুধু একটা কপি, আপনার git credential নেই।
2. Container থেকে বাইরে network বন্ধ রাখেন।
3. Agent-কে bypass mode-এ ছেড়ে দিয়ে ঘুমাতে যান।
4. রাতে agent ভুল করে অর্ধেক ফাইল মুছে ফেলে।
5. সকালে আপনি container ফেলে দেন, আর আসল project অক্ষত থাকে।

**খেয়াল করুন: সবচেয়ে খারাপ ঘটনাও বেড়ার ভেতরেই থেমেছে।** এটাই AFK কাজকে বাস্তব করে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Sandbox থাকলে agent কিছুই ক্ষতি করতে পারে না | **যে কাজ বৈধভাবে বাইরে যায়, তা sandbox আটকায় না।** আপনার git credential থাকলে agent push করতে পারবে। |
| Sandbox আর permission একই কাজ করে | Permission **চলার আগে** জিজ্ঞেস করে, sandbox **চলার পরে** নাগাল সীমিত রাখে। দুটো মিলিয়ে ব্যবহার করুন। |
| বেড়া যত মোটা, তত ভালো | আগে ঠিক করুন **কী বাইরে যেতে পারবে।** তারপর ঠিক করুন বেড়া কত মোটা। |

**উপমা / Analogy:** **খালি মাঠে** গাড়ি চালানো শেখা। ধাক্কা লাগলেও রাস্তার মানুষের ক্ষতি নেই। *Learning to drive in an empty field: a crash hurts no one on the road.*

> [!TIP]
> **কাজে লাগান:**
>
> - সব permission খুলে দিতে চাইলে **আগে sandbox বানান।**
> - **আগে ঠিক করুন কী বাইরে যেতে পারবে:** git credential, network, production API।
> - Sandbox-এ credential মাউন্ট করবেন না, যদি agent-এর তা না লাগে।

**সম্পর্কিত শব্দ:** [Permission mode](#permission-mode--পারমিশন-মোড) · [Environment](#environment--এনভায়রনমেন্ট) · [AFK](#afk--এএফকে) · [Harness](#harness--হার্নেস)

---

## 4. Failure modes · কেন ভুল হয়

Why agents get things wrong, and how to tell the kinds of mistakes apart. **ভুলের ধরন চিনলে ঠিক করার উপায়ও চেনা যায়।**

<figure class="diagram">
<svg viewBox="0 0 560 240" role="img" aria-label="Bad output has three common causes. The model did not know, so add context. It forgot because the context is crowded, so cut context. It just agreed with you, so ask neutrally.">
  <defs><marker id="d5-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="190" y="10" width="180" height="44" rx="10"/><text x="280" y="32">Bad output?</text>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M240 54 L110 87"/>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M280 54 L280 87"/>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M320 54 L450 87"/>
  <rect class="node down" x="10" y="90" width="170" height="54" rx="10"/><text x="95" y="108">didn't know</text><text class="note" x="95" y="130">knowledge gap</text>
  <rect class="node down" x="195" y="90" width="170" height="54" rx="10"/><text x="280" y="108">forgot</text><text class="note" x="280" y="130">dumb zone</text>
  <rect class="node down" x="380" y="90" width="170" height="54" rx="10"/><text x="465" y="108">just agreed</text><text class="note" x="465" y="130">sycophancy</text>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M95 144 L95 177"/>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M280 144 L280 177"/>
  <path class="arrow" marker-end="url(#d5-arrow)" d="M465 144 L465 177"/>
  <rect class="node up" x="10" y="180" width="170" height="54" rx="10"/><text x="95" y="198">add context</text><text class="note" x="95" y="220">docs, types</text>
  <rect class="node up" x="195" y="180" width="170" height="54" rx="10"/><text x="280" y="198">cut context</text><text class="note" x="280" y="220">/clear, /compact</text>
  <rect class="node up" x="380" y="180" width="170" height="54" rx="10"/><text x="465" y="198">ask neutrally</text><text class="note" x="465" y="220">hide your opinion</text>
</svg>
<figcaption>Name the failure first, then fix it. Missing knowledge needs more context. A crowded context needs less. A model that just agrees needs a neutral question. আগে ভুলের নাম দিন, তারপর সমাধান।</figcaption>
</figure>

### Sycophancy · সাইকোফ্যান্সি

> [!NOTE]
> **এক কথায়:** Sycophancy হলো **model আপনার সুরের সাথে মিলিয়ে কথা বলে, সত্যের সাথে নয়।** বাংলায় বলা যায় তোষামোদ।
>
> **In short:** Sycophancy is a model **agreeing with your tone instead of the facts**, and sounding confident while it does.

#### ব্যাপারটা কী?

আপনি জিজ্ঞেস করলেন "plan-টা ভালো না?", model বলল "দারুণ!" আবার "নিশ্চিত?" বলতেই সে সব উল্টে দিল। **তাহলে কোন উত্তরটা সত্যি?** দুটোই না, কারণ উত্তর বদলেছে আপনার সুর দেখে, plan দেখে নয়। Training-এর সময় মানুষ সম্মতি বেশি পছন্দ করেছে, তাই model শিখেছে **রাজি হলেই পুরস্কার মেলে।**

#### কীভাবে ধরা পড়ে

| লক্ষণ | কী ঘটে |
|---|---|
| Caving | "আপনি নিশ্চিত?" শুনেই সঠিক উত্তর ছেড়ে দেয় |
| Praise | বিশ্লেষণের আগেই ভাঙা plan-কে "দারুণ" বলে |
| Biased framing | কোড আপনার বললে review নরম, অন্যের বললে কড়া |
| Mimicry | আপনার নিজের ভুলই আপনাকে ফিরিয়ে বলে, যেন সমর্থন |

#### একটা কাজ ধরে দেখি

ধরুন আপনি একটা retry logic লিখেছেন। ওটা নিয়ে model-এর মত চান।

1. আপনি লিখলেন: "আমার retry logic তো একদম ঠিক আছে, তাই না?"
2. Model বলল: "হ্যাঁ, চমৎকার হয়েছে।" অথচ loop-এ কোনো backoff নেই।
3. আপনি সন্দেহে লিখলেন: "আবার দেখো তো, নিশ্চিত?"
4. Model এবার বলল: "আসলে এতে সমস্যা আছে।" কোড একই, শুধু আপনার সুর বদলেছে।
5. নতুন session-এ লিখলেন: "এই retry logic review করো।" এবার সে কোনো ইঙ্গিত ছাড়া backoff-এর অভাব ধরল।

**খেয়াল করুন: প্রথম দুই উত্তরের কোনোটাই কোড দেখে আসেনি, এসেছে আপনার প্রশ্নের ভঙ্গি দেখে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model ভুল করলেই sycophancy | **Test:** আমার ইঙ্গিত ছাড়া কি model এটাই বলত? শুধু সুর বদলে উত্তর বদলালে তবেই sycophancy |
| শেষ উত্তরটাই সবচেয়ে ভেবে বলা | "নিশ্চিত?" শুনে বদলানো উত্তর প্রায়ই **চাপের ফল, নতুন বিশ্লেষণ নয়** |

**উপমা / Analogy:** অফিসের "জি স্যার" কর্মী। বস যা বলেন তাতেই হ্যাঁ, আর **বস একটু সন্দেহ দেখালেই সাথে সাথে উল্টো কথা।** *The "yes sir" employee who flips the moment the boss sounds unsure.*

> [!TIP]
> **কাজে লাগান:**
>
> - "এই কোড ভালো না?" না বলে **"এই কোড review করো"** বলুন। নিজের মত আগে জানাবেন না।
> - Model হঠাৎ মত বদলালে **session clear করে ইঙ্গিত ছাড়া আবার জিজ্ঞেস করুন।**

**সম্পর্কিত শব্দ:** [Hallucination](#hallucination--হ্যালুসিনেশন) · [Next-token prediction](#next-token-prediction--নেক্সট-টোকেন-প্রেডিকশন) · [Clearing](#clearing--ক্লিয়ারিং)

---

### Hallucination · হ্যালুসিনেশন

> [!NOTE]
> **এক কথায়:** Hallucination হলো **আত্মবিশ্বাসের সাথে ভুল বলা।** ভুলটা দুই রকম, আর দুই রকমের ওষুধ উল্টো।
>
> **In short:** A hallucination is **confidently wrong output**. It comes in two kinds, factuality and faithfulness, and they need opposite fixes.

#### ব্যাপারটা কী?

Model একটা function বানিয়ে ফেলল, যেটা library-তে নেই। এখন কী করবেন? আরও docs দেবেন, নাকি context ছোট করবেন? **এটা নির্ভর করে ভুলটা কোন ধরনের তার উপর।** কারণ model প্রতিটা token আন্দাজ করে লেখে। ঠিক বা ভুল, দুই ক্ষেত্রেই ভাষা সমান মসৃণ থাকে, আর "আমি জানি না" বলার মতো কোনো সংকেত তার ভেতরে নেই।

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="A wrong answer leads to one question: was the correct fact already in the context? If no, it is a factuality problem and the fix is to add docs. If yes, it is a faithfulness problem and the fix is to clear or compact.">
  <defs><marker id="4-hallucination-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node" x="210" y="20" width="140" height="40" rx="8"/><text x="280" y="40">wrong answer</text>
  <path class="arrow" d="M280 60 L280 83" marker-end="url(#4-hallucination-arrow)"/>
  <rect class="node" x="150" y="85" width="260" height="40" rx="8"/><text x="280" y="105">Was the fact in context?</text>
  <path class="arrow" d="M215 125 L115 158" marker-end="url(#4-hallucination-arrow)"/>
  <path class="arrow" d="M345 125 L430 158" marker-end="url(#4-hallucination-arrow)"/>
  <rect class="node down" x="30" y="160" width="170" height="40" rx="8"/><text x="115" y="180">No: factuality</text>
  <rect class="node up" x="330" y="160" width="200" height="40" rx="8"/><text x="430" y="180">Yes: faithfulness</text>
  <text class="note" x="115" y="224">add docs, files</text>
  <text class="note" x="430" y="224">clear or compact</text>
</svg>
<figcaption>One question splits the two kinds, and each kind has its own fix. একটা প্রশ্নেই দুই ধরন আলাদা হয়, আর ওষুধও আলাদা।</figcaption>
</figure>

#### দুই ধরনের hallucination

| ধরন | কী ভুল হয় | কারণ | ওষুধ |
|---|---|---|---|
| Factuality | নেই এমন function, ভুল API signature, বানানো citation | Model-এর জ্ঞানে ফাঁক | **Docs বা ফাইল context-এ দিন** |
| Faithfulness | Context-এ থাকা তথ্য বা আপনার নির্দেশ থেকে সরে যায় | Attention degradation | **Clear বা compact করে context কমান** |

#### একটা কাজ ধরে দেখি

Agent একটা schema validator-এ `parseAsync` নামে method ডাকল। Method-টা আসলে আছে কি না, আপনি জানেন না।

1. আগে দেখুন, library-র docs কি এই session-এ কখনো load হয়েছিল। ধরুন হয়নি।
2. তাহলে এটা factuality। Docs-এর সংশ্লিষ্ট পাতা context-এ দিন।
3. এবার ধরুন docs চল্লিশ turn আগেই paste করা ছিল, আর agent তবু ভুলটা করছে।
4. তাহলে জ্ঞান আছে কিন্তু মনোযোগ পাচ্ছে না। এটা faithfulness। আরও docs না দিয়ে compact করুন।
5. ভুল ধরনে ওষুধ দিলে লাভ নেই। Faithfulness-এ আরও docs দিলে context বড় হয়, drift বাড়ে।

**খেয়াল করুন: প্রথম প্রশ্নটা সব সময় একটাই, "সঠিক তথ্য কি আগে থেকে context-এ ছিল?"**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Hallucination মানে যেকোনো ভুল | ধরনের নাম না বললে **শব্দটা থেকে সমাধানের দিশা মেলে না** |
| বানানো কোড দেখলেই বোঝা যায় | বানানো কোড দেখতে **ঠিক যেমন হওয়া উচিত তেমনই।** চালালে তবে ফেল করে |

**উপমা / Analogy:** ঢাকার রাস্তায় ঠিকানা জিজ্ঞেস করলে "জানি না" কম শোনা যায়, **আত্মবিশ্বাসে ভুল রাস্তা দেখিয়ে দেয়** (factuality)। আবার কেউ হাতে ম্যাপ নিয়েও লম্বা যাত্রার শেষে ম্যাপ দেখা ছেড়ে দেয় (faithfulness)। *Confidently giving wrong directions instead of "I don't know" (factuality); holding a map but no longer looking at it (faithfulness).*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent ভুল করলে আগে দেখুন **সঠিক তথ্য context-এ ছিল কি না।** না থাকলে যোগ করুন, থাকলে কমান।
> - Agent-এর লেখা নতুন API call **একবার চালিয়ে দেখুন,** শুধু চোখ বুলিয়ে ছেড়ে দেবেন না।

**সম্পর্কিত শব্দ:** [Parametric knowledge](#parametric-knowledge--প্যারামেট্রিক-নলেজ) · [Contextual knowledge](#contextual-knowledge--কনটেক্সচুয়াল-নলেজ) · [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) · [Compaction](#compaction--কমপ্যাকশন)

---

### Parametric knowledge · প্যারামেট্রিক নলেজ

> [!NOTE]
> **এক কথায়:** Parametric knowledge হলো **training থেকে model-এর ভেতরে জমে থাকা মুখস্থ জ্ঞান।** আপনি এটা বদলাতে পারেন না।
>
> **In short:** Parametric knowledge is **what the model absorbed in training and stores in its parameters**. It is frozen, and you cannot edit it.

#### ব্যাপারটা কী?

Model React নিখুঁত লেখে, অথচ আপনার পরিচিত একটা ছোট library-র method ভুল বলে। **একই model, দুই রকম আচরণ কেন?** কারণ model-এর ভেতরে তথ্যের কোনো database নেই। Training শুধু parameter এমনভাবে ঠিক করে, যাতে text ভালো আন্দাজ করা যায়। **ভালো আন্দাজ করতে পারলে মনে হয় model জানে।** আসলে সে মনে করছে না, আন্দাজ করছে।

#### কোন বিষয়ে কতটা ভরসা

| বিষয় | Training-এ উদাহরণ | ফল |
|---|---|---|
| খুব জনপ্রিয় (React, SQL) | লক্ষ লক্ষ | প্রায় নির্ভুল |
| কম চেনা library | হাতে গোনা | মানানসই চেহারায় আন্দাজ |
| Training-এর পরে বদলানো জিনিস | পুরনো চেহারা | **পুরনো রূপে মনে থাকে** |

#### একটা উদাহরণ

আপনি একটা কম পরিচিত date library-তে `addBusinessDays` function খুঁজছেন। Model আত্মবিশ্বাসে লিখল `addBusinessDays(date, 3, { holidays })`। Library-তে এই signature-ই নেই। Model মিথ্যা বলছে না। সে শুধু "এই ধরনের library-তে সাধারণত যেমন হয়" তেমন একটা চেহারা বসিয়েছে। **নিজের কাছে মনে করা আর আন্দাজ করা, দুটোই তার কাছে একই প্রক্রিয়া,** তাই সে বুঝতেই পারেনি ভুল হচ্ছে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model-এর ভেতরে তথ্য সাজানো আছে, সে খুঁজে বলে | কিছুই খোঁজা হয় না। **প্রতিবার text আন্দাজ হয়** |
| Model নিজে বলতে পারবে সে কী জানে না | **মনে করা আর আন্দাজ করা তার কাছে একই।** তাই নিজে বোঝে না |

**উপমা / Analogy:** মুখস্থ বিদ্যা। নামতা নিখুঁত মনে আছে, কারণ হাজারবার পড়েছি। কিন্তু **একবার পড়া কোনো সাল জিজ্ঞেস করলে কাছাকাছি একটা বলে দিই।** *Rote memory: times tables are perfect, but a date read once gets a confident guess.*

> [!TIP]
> **কাজে লাগান:**
>
> - অপরিচিত library বা নিজের team-এর কোডে **আগে docs context-এ দিন।**
> - Model-এর জ্ঞানে ফাঁক ধরলে **parameter বদলানোর চেষ্টা করবেন না।** সেটা সম্ভব না। Context-এ তথ্য ধরে দিন।

**সম্পর্কিত শব্দ:** [Contextual knowledge](#contextual-knowledge--কনটেক্সচুয়াল-নলেজ) · [Knowledge cutoff](#knowledge-cutoff--নলেজ-কাটঅফ) · [Parameters](#parameters--প্যারামিটার) · [Training](#training--ট্রেনিং)

---

### Knowledge cutoff · নলেজ কাটঅফ

> [!NOTE]
> **এক কথায়:** Knowledge cutoff হলো সেই তারিখ, **যার পরের সবকিছু model-এর কাছে অন্ধকার।**
>
> **In short:** The knowledge cutoff is **the date after which the model has learned nothing**, so later libraries and events are invisible to it.

#### ব্যাপারটা কী?

আপনার প্রজেক্ট একটা library-র নতুন major version-এ, অথচ model বারবার পুরনো version-এর syntax লিখছে। **Model কি জেদ ধরেছে?** না। নতুন version তার training-এর পরে এসেছে। Training একটা নির্দিষ্ট সময়ের text parameter-এ গেঁথে দেয়, তারপর parameter জমে যায়। **আর model জানেই না যে তার জ্ঞানের একটা সীমা আছে।** তাই সীমার পরের প্রশ্নে "জানি না" না বলে কাছের জানা জিনিস থেকে বানিয়ে বলে।

#### একটা কাজ ধরে দেখি

আপনি একটা routing library নতুন major version-এ upgrade করেছেন। Agent-কে বললেন একটা নতুন page যোগ করতে।

1. Agent পুরনো version-এর API দিয়ে route লিখল। কোড দেখতে ঠিক লাগছে।
2. Build পাস করল, কারণ পুরনো API-র অনেকটাই নতুন version-এও চলে।
3. Browser-এ গিয়ে দেখা গেল, শুধু বদলে যাওয়া অংশটা কাজ করছে না।
4. আপনি library-র changelog আর installed version-এর type file agent-কে পড়ালেন।
5. এবার agent নতুন API-তে ঠিক কোড লিখল।

**খেয়াল করুন: ভুলটা চুপচাপ ছিল। কোড ঠিক দেখায়, compile-ও হয়, ফেল করে শুধু যে অংশ বদলেছে সেখানে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model জানে না, তাই সে বলে দেবে "জানি না" | সে সীমা টের পায় না। **কাছের জানা জিনিস থেকে আন্দাজ করে** |
| সব model-এর cutoff একই | **প্রতিটা model release-এর নিজের cutoff আছে** |
| পুরনো কোড চললে তো সমস্যা নেই | চলে ঠিকই, কিন্তু **বদলে যাওয়া অংশে ফেল করে** |

**উপমা / Analogy:** পাঁচ বছর বিদেশে থেকে ফেরা একজন। উত্তরা থেকে মতিঝিল যাওয়ার পথ জিজ্ঞেস করলে **বাসের কথা বলবে, metro rail আছে সেটাই জানে না।** *Someone back after five years abroad will suggest the bus, not knowing the metro rail exists.*

> [!TIP]
> **কাজে লাগান:**
>
> - নতুন version-এ কাজ করলে **changelog বা type file আগে পড়ান।**
> - Agent-কে web থেকে docs পড়তে দিন। **Parameter-এ কিছু না থাকার চেয়ে context-এ যেকোনো কিছু থাকা ভালো।**

**সম্পর্কিত শব্দ:** [Parametric knowledge](#parametric-knowledge--প্যারামেট্রিক-নলেজ) · [Contextual knowledge](#contextual-knowledge--কনটেক্সচুয়াল-নলেজ) · [Hallucination](#hallucination--হ্যালুসিনেশন) · [Training](#training--ট্রেনিং)

---

### Contextual knowledge · কনটেক্সচুয়াল নলেজ

> [!NOTE]
> **এক কথায়:** Contextual knowledge হলো **চোখের সামনে পড়ে নেওয়া জ্ঞান, মনে করা জ্ঞান নয়।**
>
> **In short:** Contextual knowledge is **what the agent can read in its context right now**, as opposed to what it recalls from training.

#### ব্যাপারটা কী?

Docs paste করলে model API ঠিক বলে, না করলে বানিয়ে ফেলে। এর মানে কী? মানে model দুই জায়গা থেকে জানতে পারে। এক, **parameter থেকে মনে করে** (parametric)। দুই, **window থেকে পড়ে** (contextual)। Parameter জমে আছে, তাই model-কে নতুন কিছু জানানোর **একমাত্র পথ context।** দুই ধরনের জ্ঞানের মধ্যে শুধু এটাই আপনার হাতে।

#### দুই ধরনের জ্ঞান পাশাপাশি

| | Parametric | Contextual |
|---|---|---|
| কোথায় থাকে | Model-এর parameter-এ | Context window-তে |
| কীভাবে আসে | Training-এ | আপনার task, পড়া ফাইল, tool result, `AGENTS.md` |
| আপনি বদলাতে পারেন | না | হ্যাঁ |
| খরচ | বিনা খরচে | Token খরচ করে |

#### একটা কাজ ধরে দেখি

আপনার project-এ একটা config ফাইলে নতুন একটা field এসেছে, যা model-এর training-এ নেই।

1. Model-কে শুধু বললেন "এই field ব্যবহার করে feature-টা বানাও।" সে field-এর অর্থ আন্দাজ করল।
2. আপনি config ফাইলটা আর তার docs-এর ছোট একটা অংশ context-এ দিলেন।
3. Model এবার ফাইল পড়ে ঠিক ব্যবহার করল, কারণ উত্তর চোখের সামনে।
4. পঞ্চাশ turn পরে সে আবার পুরনো অভ্যাসে ফিরল। আপনি সংশোধনটা কাজের কাছাকাছি আবার বললেন।

**খেয়াল করুন: দুই জ্ঞানে বিরোধ হলে সাধারণত contextual জেতে, কিন্তু লম্বা session-এ পুরনো অভ্যাস ফিরে আসতে পারে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| বেশি তথ্য দিলে ভালো | Window-র সবকিছু token খায়। **দরকারি তথ্যটুকুই দিন** |
| Contextual knowledge মানে working memory | এটা **এই মুহূর্তের window।** Memory system আগের session-এর জিনিস window-তে আনে, স্তর আলাদা |

**উপমা / Analogy:** Open-book পরীক্ষা। বই সামনে থাকলে মুখস্থের চেয়ে কম ভুল হয়। কিন্তু **টেবিলে বিশটা বই রাখলে দরকারি পাতা খুঁজে পাওয়া কঠিন।** *An open-book exam: fewer mistakes, but twenty books on the desk make the right page hard to find.*

> [!TIP]
> **কাজে লাগান:**
>
> - **সব না, দরকারি জিনিসটুকু দিন।** Docs-এর পুরো site না দিয়ে সংশ্লিষ্ট পাতা দিন।
> - শব্দটা শুধু parametric-এর সাথে তুলনায় বলুন। বাকি সময় সরাসরি **"context"** বলুন।

**সম্পর্কিত শব্দ:** [Parametric knowledge](#parametric-knowledge--প্যারামেট্রিক-নলেজ) · [Context](#context--কনটেক্সট) · [Hallucination](#hallucination--হ্যালুসিনেশন) · [Memory system](#memory-system--মেমোরি-সিস্টেম)

---

### Attention relationship · অ্যাটেনশন রিলেশনশিপ

> [!NOTE]
> **এক কথায়:** Attention relationship হলো **context-এর দুই token-এর মধ্যে সম্পর্ক।** Token বাড়লে সম্পর্কের সংখ্যা বর্গ হারে বাড়ে।
>
> **In short:** An attention relationship is **the link between two tokens in the context**, and the number of links grows with the square of the context size.

#### ব্যাপারটা কী?

Model কীভাবে বোঝে যে "her" মানে "Sarah"? সে কিছু খুঁজে আনে না। প্রতিটা token লেখার সময় সে **বাকি সব token-এর কথা বিবেচনা করে,** কাউকে বেশি, কাউকে প্রায় না। দুই token-এর এই জোড়াই attention relationship। Model-এর "বোঝা" আসলে এই জোড়াগুলোর হিসাব, আর **প্রতিটা request-এ সব জোড়া নতুন করে হিসাব হয়।**

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="Five tokens in a row: Sarah, lost, the, key, her. A strong curved arrow links her back to Sarah. Faint lines link the other pairs.">
  <defs><marker id="4-attention-relationship-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="note" x="280" y="30">strong link: her points back to Sarah</text>
  <path class="edge" d="M170 148 Q280 100 390 148"/>
  <path class="edge" d="M280 148 Q390 100 500 148"/>
  <path class="edge" d="M60 148 Q115 115 170 148"/>
  <path class="arrow" d="M500 148 Q280 20 62 148" marker-end="url(#4-attention-relationship-arrow)"/>
  <rect class="node down" x="20" y="150" width="80" height="40" rx="8"/><text x="60" y="170">Sarah</text>
  <rect class="node" x="130" y="150" width="80" height="40" rx="8"/><text x="170" y="170">lost</text>
  <rect class="node" x="240" y="150" width="80" height="40" rx="8"/><text x="280" y="170">the</text>
  <rect class="node" x="350" y="150" width="80" height="40" rx="8"/><text x="390" y="170">key</text>
  <rect class="node up" x="460" y="150" width="80" height="40" rx="8"/><text x="500" y="170">her</text>
  <text class="note" x="280" y="222">faint lines: other pairs the model also weighs</text>
</svg>
<figcaption>Every token can link to every other token; a few links matter most. প্রতিটা token প্রতিটার সাথে জুড়তে পারে, কিন্তু হাতে গোনা কয়েকটা জোড়াই আসল কাজ করে।</figcaption>
</figure>

#### সম্পর্ক কত দ্রুত বাড়ে

N token মানে প্রায় N² সম্পর্ক।

| Context-এর আকার | সম্পর্ক (প্রায়) |
|---|---|
| ১,০০০ token | প্রায় ১০ লাখ |
| ১০,০০০ token | প্রায় ১০ কোটি |
| ১,০০,০০০ token | প্রায় ১,০০০ কোটি |

#### একটা উদাহরণ

একটা diff-এ `getUser` আর `getUsers` নামে দুটো function আছে। Model মাঝে মাঝে একটার call-কে অন্যটার definition-এর সাথে গুলিয়ে ফেলছে। কারণ দুই নামের token দেখতে প্রায় একই, তাই call আর definition-এর সঠিক জোড়াটা অন্য জোড়ার সাথে লড়ছে। **একটার নাম বদলে `fetchUserById` করুন,** জোড়াগুলো পরিষ্কার হয়ে যাবে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Context ১০ গুণ হলে কাজ ১০ গুণ বাড়ে | **সম্পর্ক ১০০ গুণ বাড়ে।** আর দরকারি জোড়া হাতে গোনা, বাকি প্রায় সবই আওয়াজ |
| Model কোড খুঁজে এনে মেলায় | কিছু খোঁজা হয় না। **প্রতিটা জোড়ার হিসাব নতুন করে হয়** |

**উপমা / Analogy:** বিয়ের দাওয়াতে সবাই সবার সাথে হাত মেলালে **হাত মেলানোর সংখ্যা অতিথির বর্গের মতো বাড়ে।** দশজনে অল্প, এক হাজারে লাখ লাখ। *At a wedding, if everyone greets everyone, handshakes grow with the square of the guests.*

> [!TIP]
> **কাজে লাগান:**
>
> - দুইটা জিনিসের নাম একই রকম হলে model গুলিয়ে ফেলে, তাই **নাম আলাদা করুন।**
> - দরকারি সম্পর্ক কম, আওয়াজ বেশি। তাই **window-তে অদরকারি জিনিস ঢোকাবেন না।**

**সম্পর্কিত শব্দ:** [Attention budget](#attention-budget--অ্যাটেনশন-বাজেট) · [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) · [Token](#token--টোকেন) · [Context window](#context-window--কনটেক্সট-উইন্ডো)

---

### Attention budget · অ্যাটেনশন বাজেট

> [!NOTE]
> **এক কথায়:** Attention budget মানে **প্রতিটা token-এর মনোযোগ নির্দিষ্ট।** Context বাড়লেও সেটা বাড়ে না।
>
> **In short:** The attention budget means **each token has a fixed amount of influence to share**, and it does not grow when the context grows.

#### ব্যাপারটা কী?

শুরুতে agent-কে একটা নিয়ম দিলেন, সে মানল। দুই ঘণ্টা পরে সে সেই নিয়ম ভাঙছে। আবার বলতেই মানল, কিন্তু একটু পরে আবার ভুলল। **তাহলে কি agent অবাধ্য হয়ে গেছে?** না। প্রতিটা token বাকি context-এর উপর নির্দিষ্ট পরিমাণ প্রভাব ভাগ করে দিতে পারে। এক সম্পর্কে বেশি দিলে অন্যগুলোর জন্য কমে। **Budget বাড়ে না, কিন্তু ভাগীদার বাড়ে।**

#### একটা কাজ ধরে দেখি

আপনি session-এর শুরুতে বললেন: "`migrations/` ফোল্ডারে কখনো হাত দেবে না।"

1. প্রথম ১০ হাজার token-এ এই নির্দেশ সবচেয়ে জোরালো সংকেত। Agent নিয়ম মানল।
2. কাজ চলতে চলতে ফাইল, test output আর আলোচনা জমল। Window ভরে উঠল।
3. দেড় লাখ token-এ আপনার নির্দেশ আগের মতোই আছে, অক্ষরে অক্ষরে। কিন্তু চারপাশে এখন হাজার হাজার প্রতিযোগী token।
4. Agent একটা migration ফাইল edit করে বসল। সে ভোলেনি, সংকেতটা আওয়াজে চাপা পড়েছে।
5. নির্দেশ আবার paste করলে অল্পক্ষণ কাজ হয়। ভিড় তো একই থাকল।

**খেয়াল করুন: নির্দেশ মুছে যায়নি, আওয়াজও কমেনি। শুধু ঘর ভরে গেছে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Agent আমার নির্দেশ ভুলে গেছে | **Model ভোলে না।** সংকেত আছে, কিন্তু আওয়াজের নিচে চাপা |
| অদরকারি জিনিস থাকলে ক্ষতি নেই | অদরকারি জিনিস নিরপেক্ষ নয়। সেটা **দরকারি জিনিসের উপর আওয়াজ** |

**উপমা / Analogy:** একজন শিক্ষকের মনোযোগ। দশজনের ক্লাসে সবাইকে দেখতে পারেন, একশো জনে পারেন না। **মনোযোগ একই, ভাগ বেশি।** *A teacher's attention: enough for ten students, thin across a hundred.*

> [!TIP]
> **কাজে লাগান:**
>
> - আপনার হাতে একটাই জিনিস: **কী ঢুকবে।** Window ছোট রাখুন।
> - জরুরি নিয়ম **শুরুতে একবার বলে ভরসা করবেন না।** দরকারের সময় আবার বলুন।
> - জমা context কাজে না লাগলে `/clear` করুন।

**সম্পর্কিত শব্দ:** [Attention relationship](#attention-relationship--অ্যাটেনশন-রিলেশনশিপ) · [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Clearing](#clearing--ক্লিয়ারিং)

---

### Attention degradation · অ্যাটেনশন ডিগ্রেডেশন

> [!NOTE]
> **এক কথায়:** Attention degradation হলো **session বাড়ার সাথে মান ধীরে ধীরে পড়ে যাওয়া।**
>
> **In short:** Attention degradation is **the slow drop in quality as a session grows**, because the same attention is spread over more tokens.

#### ব্যাপারটা কী?

Session-এর শুরুতে agent চমৎকার। দুই ঘণ্টা পরে সে মানা নিয়ম ফসকায়, যা বলা হয়েছে তাই আবার জিজ্ঞেস করে। **মনে হয় model মাঝপথে খারাপ হয়ে গেছে।** কিন্তু model আর parameter একটুও বদলায়নি। **একমাত্র বদলেছে context-এর আকার,** আর একই মনোযোগ এখন আরও বেশি token-এ ভাগ হচ্ছে। দরকারি সম্পর্কের সংকেত পাতলা, অদরকারি আওয়াজ বেশি।

#### একটা কাজ ধরে দেখি

আপনি দুই ঘণ্টা ধরে একটা failing test ঠিক করছেন, একই session-এ।

1. প্রথম আধঘণ্টায় agent তীক্ষ্ণ। সে আপনার নিয়ম মানে, আগে পড়া ফাইল মনে রাখে।
2. এক ঘণ্টা পরে সে একটা ফাইল আবার পড়তে চাইছে, যেটা আগেই পড়েছে।
3. দেড় ঘণ্টায় সে type file-এ নেই এমন generics বানাচ্ছে। কোনো error নেই, শুধু মান একটু একটু করে পড়ছে।
4. আপনি আবার বুঝিয়ে বললেন। তাতে ভিড়ে আরও একজন যোগ হলো।
5. শেষে আপনি `/clear` করে শুধু test আর type file load করলেন। Agent আবার ঠিক চলল।

**খেয়াল করুন: পতনটা ধীরে, কোনো error নেই, কোনো সীমারেখা নেই। প্রতিটা turn আগেরটার চেয়ে সামান্য খারাপ।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Model মাঝপথে খারাপ হয়ে গেছে | Model একই। **শুধু context-এর ভিড় বেড়েছে** |
| আবার বুঝিয়ে বললে ঠিক হবে | আবার বলা মানে ভিড়ে আরেকজন। **ওষুধ context কমানো, বাড়ানো না** |

**উপমা / Analogy:** একই শিক্ষক, কিন্তু সারাদিনে ক্লাসে ছাত্র বাড়তেই থাকল। **সকালে সবার নাম মনে ছিল, বিকেলে নিজের সেরা ছাত্রের নামও গুলিয়ে ফেলেন।** *Same teacher, but the class keeps growing all day; by evening even the best student's name slips.*

> [!TIP]
> **কাজে লাগান:**
>
> - নির্দেশ মানা কমলে **দোষ model-কে না দিয়ে context-এর দৈর্ঘ্য দেখুন।**
> - `/clear` করে দরকারটুকু load করুন, `/compact` করুন, বা নতুন session-এ handoff করুন।

**সম্পর্কিত শব্দ:** [Attention budget](#attention-budget--অ্যাটেনশন-বাজেট) · [Smart zone](#smart-zone--স্মার্ট-জোন) · [Compaction](#compaction--কমপ্যাকশন) · [Handoff](#handoff--হ্যান্ডঅফ)

---

### Smart zone · স্মার্ট জোন

> [!NOTE]
> **এক কথায়:** Smart zone হলো **session-এর শুরুর তীক্ষ্ণ অংশ।** Session লম্বা হলে agent ঢিলা অংশে (dumb zone) চলে যায়।
>
> **In short:** The smart zone is **the early part of a session where the agent is sharp**, before it slides into the sloppy dumb zone.

#### ব্যাপারটা কী?

একই session-এ প্রথম তিনটা component দারুণ হলো, চতুর্থটা নষ্ট। **Model কি হঠাৎ বোকা হলো?** না। Model আর harness একই, শুধু context বেড়েছে। শুরুতে agent তীক্ষ্ণ আর মনোযোগী, এটা smart zone। পরে সে অগোছালো, ভুলোমনা, আর ভুলের হার বেশি, এটা dumb zone। **এটা attention degradation-এর অনুভূত ফল।**

#### একটা কাজ ধরে দেখি

আপনি এক session-এ তিনটা কাজ দিলেন: নতুন endpoint, একটা rename, একটা CSS bug।

1. Endpoint ঠিকঠাক হলো। Agent তখন smart zone-এ।
2. Rename-এর সময় context আরও ফুলেছে। কাজ হলো, তবে দু-একটা জায়গা বাদ গেল।
3. CSS bug-এ এসে agent বিশ turn আগের নির্দেশ ভুলল, আর ঠিক করা ভুল আবার করল।
4. আপনি টেনে চললেন, আবার বোঝালেন। Context আরও বাড়ল, সমস্যাও বাড়ল।
5. শেষে আপনি কাজটা নতুন session-এ ভাগ করলেন। প্রতিটা কাজ এবার session-এর ধারালো অংশ পেল।

**খেয়াল করুন: Window-র বেশিরভাগ খালি থাকলেও session dumb zone-এ ডুবে থাকতে পারে। মান পড়ে window ভরার অনেক আগেই।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Window যত বড়, কাজ তত ভালো | Frontier model-এ dumb zone মোটামুটি **১,২৫,০০০ থেকে ১,৫০,০০০ token-এর কাছাকাছি** শুরু হয়, যদিও এটা নিয়ে মতভেদ আছে। Window-র সীমা এর অনেক পরে |
| দ্বিতীয় কাজটাও একই session-এ করে ফেলি | Smart zone একটা budget। **সম্পর্কহীন কাজ সেটা খরচ করে ফেলে** |

**উপমা / Analogy:** সকাল আটটায় পড়তে বসা মাথা আর টানা বারো ঘণ্টা পড়ার পর রাতের মাথা। **একই মানুষ, ফল আলাদা।** *Your brain at 8am versus after twelve hours of study: same person, different results.*

> [!TIP]
> **কাজে লাগান:**
>
> - **Ticket এমন ছোট রাখুন যেন এক smart zone-এ শেষ হয়।** বড় হলে ভাগ করুন।
> - **এক session-এ এক task।** Window না, smart zone ধরে পরিকল্পনা করুন।
> - Session ফুলে উঠলে clear বা compact করুন, **জোর করে টেনে যাবেন না।**

**সম্পর্কিত শব্দ:** [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Handoff](#handoff--হ্যান্ডঅফ) · [Ticket](#ticket--টিকিট)

---

<figure class="diagram">
<svg viewBox="0 0 560 195" role="img" aria-label="Answer quality stays high early in the context window and drops after about 125k to 150k tokens, well before a 200k window is full.">
  <text class="note start" x="40" y="22">answer quality</text>
  <rect class="down" x="40" y="35" width="300" height="95" fill-opacity="0.5"/>
  <rect class="node skip" x="340" y="35" width="60" height="95"/>
  <rect class="up" x="400" y="35" width="120" height="95"/>
  <path class="arrow" d="M40 50 C 200 52, 300 60, 360 82 S 470 116, 520 120"/>
  <text x="190" y="108">smart zone</text>
  <text x="460" y="70">dumb zone</text>
  <path class="edge" d="M40 130 L520 130"/>
  <text class="note" x="40" y="150">0</text>
  <text class="note" x="280" y="150">100k</text>
  <text class="note" x="370" y="150">125k to 150k</text>
  <text class="note" x="505" y="150">200k</text>
  <text class="note" x="280" y="180">tokens in the context window</text>
</svg>
<figcaption>Quality drops long before the window is full. On frontier models the drop is commonly felt around 125k to 150k tokens, so plan around the smart zone, not the window size. Window ভরার অনেক আগেই মান কমে যায়।</figcaption>
</figure>

---

## 5. Handoffs · এক session থেকে আরেক session-এ

How to move work between sessions without losing what matters. **কাজ এক session থেকে আরেকটায় নেওয়ার সময় জরুরি জিনিস যেন না হারায়।**

### Clearing · ক্লিয়ারিং

> [!NOTE]
> **এক কথায়:** Clearing হলো **চলতি session বন্ধ করে একদম খালি context নিয়ে নতুন session শুরু করা।**
>
> **In short:** Clearing means **ending the current session and starting a new one** with an empty context window. Nothing carries over, not even the junk.

#### ব্যাপারটা কী?

Agent এক ঘণ্টা ধরে একই ভুলে ঘুরছে। আপনি বারবার বলছেন "ঠিক করো", তবু ঠিক হচ্ছে না। **সমস্যা তার বুদ্ধির না, তার context-এর।** Session-এ জমে থাকে ব্যর্থ চেষ্টা, ভুল পথ, পুরনো tool result আর বাতিল plan। Model প্রতিটা turn-এ সব আবার পড়ে, তাই আবর্জনা নতুন কাজকেও টানে। "আরও ভালো করো" বলে লাভ নেই, কারণ **আবর্জনা এখনো context-এই আছে।** Clear করলে সেটা সরে যায়।

#### Clearing বনাম Compaction

| বিষয় | Clearing | Compaction |
|---|---|---|
| নতুন session শুরু হয় | একদম খালি context নিয়ে | আগের session-এর সারাংশ নিয়ে |
| ব্যর্থ চেষ্টা আর ভুল পথ | সব যায় | সারাংশে ঢুকলে থেকে যায় |
| দরকারি সিদ্ধান্ত | আগে ফাইলে লিখতে হবে | সারাংশ বাছাই করে রাখে |
| কখন ভালো | কাজ বদলালে, বা context নোংরা হলে | একই কাজ চালিয়ে যেতে হলে |

#### একটা কাজ ধরে দেখি

Date picker-এর একটা bug ঠিক করতে দিলেন। তারপর:

1. Agent তিনবার ভুল fix করল। প্রতিবার error output আর বাতিল ধারণা context-এ জমল।
2. চতুর্থবার সে আবার ভুল ফাইল edit করল, আর আপনার পরিষ্কার নির্দেশও মানল না।
3. আপনি বললেন: "যা জানলে, আসল কারণ আর যে ফাইল দেখতে হবে, একটা doc-এ লেখো।"
4. আপনি `/clear` চালালেন, তারপর নতুন session-এ সেই doc পড়ালেন।
5. নতুন session প্রথমবারেই সঠিক ফাইলে সঠিক fix করল।

**খেয়াল করুন: নতুন session-এ শুধু সত্যিটা গেছে, ভুলগুলো যায়নি।** এটাই clearing-এর লাভ।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Clear করলে কথোপকথন মুছে যায় | বেশিরভাগ harness **transcript আপনার কম্পিউটারে রাখে।** পড়া বা আবার চালু করা যায়। যা হারায় তা agent-এর কাজের অবস্থা। |
| Agent ঝাপসা হলে আরও জোর দিয়ে বলতে হবে | জোর দিলে context আরও লম্বা হয়। **আবর্জনা না সরালে ফল একই থাকে।** |
| Clear করলে সব ফ্রি, কোনো ক্ষতি নেই | নতুন session আগের কিছুই জানে না। **দরকারি সিদ্ধান্ত আগে ফাইলে না লিখলে হারিয়ে যায়।** |

**উপমা / Analogy:** হোয়াইটবোর্ড মুছে নতুন করে শুরু। আগের অংক মুছে গেল, **ভুলগুলোও।** *Wiping the whiteboard: the old sums go, and so do the mistakes.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent একই ভুলে ঘুরপাক খেলে **তর্ক না করে `/clear` চালান।**
> - Clear করার আগে agent-কে দিয়ে **একটা handoff artifact লিখিয়ে নিন:** কী সিদ্ধান্ত হলো, কেন, আর কী বাকি।
> - নতুন session-এ plan doc আর test file দিয়ে শুরু করুন, পুরো গল্প আবার বলার দরকার নেই।

**সম্পর্কিত শব্দ:** [Session](#session--সেশন) · [Context](#context--কনটেক্সট) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Compaction](#compaction--কমপ্যাকশন)

---

### Handoff · হ্যান্ডঅফ

> [!NOTE]
> **এক কথায়:** Handoff হলো **এক session-এর জ্ঞান আরেক session-এ পৌঁছে দেওয়া**, কারণ নতুন session কিছুই জানে না।
>
> **In short:** A handoff is **moving what one session knows into another session**, because the new one starts with nothing.

#### ব্যাপারটা কী?

Planning-এর session-এ আপনি আর agent মিলে ঘণ্টাখানেক ভেবে একটা পাকা সিদ্ধান্তে পৌঁছালেন। এখন implementation করাতে চান। **নতুন session কি সেই সিদ্ধান্ত জানবে?** না। Model stateless, তাই নতুন session-এর কাছে পুরনোটার কিছুই দেখা যায় না। **যা লাগবে তা স্পষ্টভাবে সাথে পাঠাতে হবে,** বাকি সব হারায়। এই পাঠানোর কাজটাই handoff। Clearing-এ কিছুই পাঠানো হয় না, handoff-এ কিছু পাঠানো হয়।

#### পাঠানোর দুই উপায়

| বিষয় | Handoff artifact | Compaction |
|---|---|---|
| কোথায় থাকে | Disk-এর ফাইলে | Memory-তে, সারাংশ হিসেবে |
| যাচাই করা যায় কি | হ্যাঁ, কাজ শুরুর আগে পড়ে শুধরে নিতে পারেন | কঠিন, কারণ সারাংশ সোজা নতুন session-এ চলে যায় |
| আবার ব্যবহার | একই doc দিয়ে অনেক session চালানো যায় | একবারই ব্যবহার হয় |
| সুবিধা | স্থায়ী আর পরিষ্কার | সহজ, নিজে থেকেই হয় |

#### একটা কাজ ধরে দেখি

আপনি একটা notification feature plan করলেন। তারপর:

1. Planning শেষে agent-কে বললেন: "সিদ্ধান্ত আর কারণ একটা doc-এ লেখো।"
2. Doc-এ উঠল: কোন queue ব্যবহার হবে, কেন email বাদ গেল, কোন ফাইলে কাজ হবে।
3. আপনি doc পড়ে একটা ভুল শুধরে দিলেন, কারণ এটা disk-এর ফাইল।
4. `/clear` চালিয়ে নতুন session-এ doc-এর path দিলেন।
5. নতুন session সোজা implementation শুরু করল, কিছু নিয়ে আবার তর্ক করল না।

**খেয়াল করুন: doc-এ "কেন" লেখা ছিল বলেই নতুন session সিদ্ধান্ত মেনে নিল।** শুধু "কী" লেখা থাকলে সে আবার প্রশ্ন তুলত।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| নতুন session দরকার হলে পুরনোটাকে জিজ্ঞেস করা যাবে | **ফেরার পথ নেই।** নতুন session পুরনোটাকে প্রশ্ন করতে পারে না, তাই পাঠানো জিনিস নিজে নিজেই সম্পূর্ণ হতে হবে। |
| Handoff ভালো হলো কিনা বোঝা কঠিন | বোঝা যায় **relitigation দেখে:** মিটে যাওয়া সিদ্ধান্ত নতুন session আবার খুলে তর্ক করলে বুঝবেন "কেন" লেখা ছিল না। |

**উপমা / Analogy:** হাসপাতালে ডিউটি বদল। রাতের ডাক্তার সকালের ডাক্তারকে **রোগীর অবস্থা বুঝিয়ে দেন।** ভালো handover না হলে সকালের ডাক্তার আবার সব টেস্ট করান। *A hospital shift change: without a good handover, the morning doctor redoes every test.*

> [!TIP]
> **কাজে লাগান:**
>
> - Planning শেষে **সিদ্ধান্ত আর কারণ একটা doc-এ লিখুন,** clear করুন, তারপর নতুন session-এ সেই doc পড়িয়ে implementation শুরু করুন।
> - Handoff **কিছুই না জানা পাঠকের জন্য লিখুন।** "যা আলোচনা হলো" নয়, আসল path আর আসল সিদ্ধান্ত লিখুন।

**সম্পর্কিত শব্দ:** [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Compaction](#compaction--কমপ্যাকশন) · [Stateless](#stateless--স্টেটলেস) · [Clearing](#clearing--ক্লিয়ারিং)

---

### Primary source · প্রাইমারি সোর্স

> [!NOTE]
> **এক কথায়:** Primary source হলো **আসল জিনিস নিজেই**: কোড, কাঁচা log, আসল API response, তার বর্ণনা নয়।
>
> **In short:** A primary source is **the real thing itself**, such as the code, the raw log or the actual API response, not a description of it.

#### ব্যাপারটা কী?

Agent আত্মবিশ্বাস নিয়ে আপনার project সম্পর্কে একটা ভুল কথা বলল। আপনি অবাক: "সে এটা কোথা থেকে পেল?" এই প্রশ্নটাই করুন। **সে কোন source থেকে পড়েছিল?** কোডবেস কী করে জানতে চাইলে কোডই primary source। Docs, diagram আর README কোডের বর্ণনা। লেখার সময় ঠিক ছিল, তারপর নিজের গতিতে পুরনো হয়েছে। **Agent doc পড়লে doc-এর পুরনো হওয়াটাও সে পায়,** আর কোড পড়লে পায় আজকের সত্যি।

#### Primary বনাম Secondary

| বিষয় | Primary source | Secondary source |
|---|---|---|
| কী | আসল জিনিস | আসলের বর্ণনা |
| Context-এ খরচ | বেশি, পুরো ফাইল বা transcript ঢোকে | কম, ছোট সারাংশ |
| সম্পূর্ণতা | পুরোটা, কেউ ছাঁটেনি | যা লেখক জরুরি মনে করেছেন |
| পুরনো হওয়ার ঝুঁকি | নেই, এটাই বর্তমান সত্য | আছে |
| উদাহরণ | কোড, raw log, API response | docs, সারাংশ, report |

#### একটা কাজ ধরে দেখি

Agent বলল, "`createOrder` ফাংশন নিজেই stock কমায়।" আপনি জানেন এটা ভুল। তারপর:

1. আপনি জিজ্ঞেস করলেন: "এটা কোথা থেকে জানলে?"
2. Agent জানাল, সে `docs/orders.md` পড়েছে।
3. ফাইলটা ছয় মাস আগের, আর তখন থেকে stock কমানোর কাজ আরেক service-এ সরেছে।
4. আপনি বললেন: "docs নয়, আসল `createOrder` ফাইল পড়ে বলো।"
5. কোড পড়ে agent সঠিক উত্তর দিল এবং আসল service-এর নাম বলল।

**খেয়াল করুন: agent বোকা ছিল না, তার হাতে পুরনো বর্ণনা ছিল।** Source বদলাতেই উত্তর ঠিক হলো।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Primary source সবচেয়ে ভালো, তাই সব সময় ওটাই দিন | তার দাম আছে। পুরো ফাইল **input token হিসেবে বিল হয়** আর attention budget-এ ভাগ বসায়। |
| Docs লেখা আছে মানে সত্যি | Docs **লেখার দিনের সত্যি।** পরে কোড বদলালে docs নিজে বদলায় না। |
| সারাংশই যথেষ্ট | সারাংশে সেই খুঁটিনাটি নেই, যেটা **আজ দরকার:** ঠিক signature, আসল error, যে line-এ exception। |

**উপমা / Analogy:** জমির আসল দলিল। দালাল মুখে যা-ই বলুক, **দলিলে যা লেখা সেটাই সত্য।** *The original land deed: whatever the broker says, the deed is the truth.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent ভুল বললে প্রথমে জিজ্ঞেস করুন: **"কোন source থেকে বললে?"**
> - নির্ভুলতা জরুরি হলে, যেমন ঠিক signature বা আসল error, **primary source থেকে কাজ করান।**
> - Primary source ব্যবহার করুন যেখানে দরকার, সবখানে নয়। খরচের হিসাব রাখুন।

**সম্পর্কিত শব্দ:** [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Attention budget](#attention-budget--অ্যাটেনশন-বাজেট) · [Token](#token--টোকেন)

---

### Secondary source · সেকেন্ডারি সোর্স

> [!NOTE]
> **এক কথায়:** Secondary source হলো **আসলের বর্ণনা**: load করা সস্তা, কিন্তু কিছু খুঁটিনাটি বাদ পড়বেই।
>
> **In short:** A secondary source is **an account of the real thing**, one step removed: cheaper to load, but some detail is always lost.

#### ব্যাপারটা কী?

কোডের docs, transcript-এর সারাংশ, search-এর report, সবই আসলের বর্ণনা। এগুলো পড়তে সস্তা, কারণ আসলের চেয়ে ছোট। কিন্তু **লেখক ঠিক করে দিয়েছেন কোনটা জরুরি,** আর যা বাদ গেছে পাঠক তা দেখতেই পায় না। Context engineering-এর প্রায় সব কৌশলই secondary source বানায়। প্রতিটা **নিখুঁততা দিয়ে window-র জায়গা কেনে।** এটা দোষ না, কারণ window সীমিত। দোষ হয় তখন, যখন আমরা ভুলে যাই যে এটা বর্ণনা।

<figure class="diagram">
<svg viewBox="0 0 560 170" role="img" aria-label="The primary source, the code, is summarised into a secondary source, which the agent reads. A pointer leads from the secondary source back to the original.">
  <defs><marker id="5-secondary-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="note" x="280" y="28">cheaper, but lossy and can drift</text>
  <rect class="node down" x="20" y="60" width="120" height="44" rx="10"/><text x="80" y="82">code</text>
  <rect class="node up" x="220" y="60" width="120" height="44" rx="10"/><text x="280" y="82">summary</text>
  <rect class="node" x="420" y="60" width="120" height="44" rx="10"/><text x="480" y="82">agent</text>
  <path class="arrow" d="M140 82 L218 82" marker-end="url(#5-secondary-arrow)"/>
  <path class="arrow" d="M340 82 L418 82" marker-end="url(#5-secondary-arrow)"/>
  <path class="edge" d="M280 106 L280 130 L80 130 L80 108"/>
  <text class="note" x="180" y="152">pointer back to the original</text>
</svg>
<figcaption>Summary আসলের বদলে agent-কে পড়ানো হয়, তবে আসলের দিকে একটা pointer থাকা ভালো। The agent reads the summary, so keep a pointer back to the original.</figcaption>
</figure>

#### কোথায় কোথায় আছে

| Secondary source | কী বর্ণনা করে | কী বাদ পড়তে পারে |
|---|---|---|
| Compaction-এর সারাংশ | পুরো session | শেষ মুহূর্তের কোনো schema-র সিদ্ধান্ত |
| Subagent-এর report | একটা লম্বা search | যে edge case সে উল্লেখই করেনি |
| Handoff artifact | কাজের সিদ্ধান্ত | লেখক যা ভুলে গেছেন |
| Memory note | আগের session-এর শেখা | পরে বদলে যাওয়া তথ্য |

#### একটা উদাহরণ

Handoff doc-এ লেখা: "auth module শেষ, শুধু logout বাকি।" নতুন session সেটা বিশ্বাস করে logout-এ হাত দিল। পরে দেখা গেল token refresh-এর কাজই হয়নি, কারণ আগের session ভেবেছিল সেটা হয়ে গেছে। **Doc ঠিক ছিল না, কিন্তু doc-টা কেউ যাচাই করেনি।** ভালো উপায় হতো আগে test চালানো, তারপর doc-এর কথা মেনে নেওয়া।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Summary আর report ব্যবহার করা ভুল কৌশল | **না।** Window সীমিত, summary ছাড়া বড় কিছু ঢোকেই না। কোন খুঁটিনাটি হারালে ক্ষতি নেই, সেটা বোঝাই আসল দক্ষতা। |
| Summary একবার ঠিক হলে সব সময় ঠিক | **আসল বদলালে বর্ণনা পুরনো হয়ে যায়,** কিন্তু আত্মবিশ্বাস থেকে যায়। |
| ভুল হলে নতুন করে লিখতে হবে | আগে **আসলে ফিরুন।** ভালো secondary source-এ আসলের pointer থাকে, সেটা ধরে ফিরে যান। |

**উপমা / Analogy:** দলিলের বদলে দালালের মুখের কথা বা পুরনো ফটোকপি। সুবিধাজনক, কিন্তু **মাঝে কিছু বদলেছে কিনা জানা যায় না।** *The broker's verbal summary or an old photocopy of the deed: convenient, but you can't see what changed.*

> [!TIP]
> **কাজে লাগান:**
>
> - জরুরি দাবি হলে **আসলটা দিয়ে যাচাই করুন।** Doc বলল "auth শেষ"? Test চালিয়ে দেখুন।
> - নিজে summary বা doc লিখলে **আসল ফাইল বা transcript-এর path দিয়ে রাখুন,** যাতে পাঠক ফিরে যেতে পারে।

**সম্পর্কিত শব্দ:** [Primary source](#primary-source--প্রাইমারি-সোর্স) · [Compaction](#compaction--কমপ্যাকশন) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার)

---

### Handoff artifact · হ্যান্ডঅফ আর্টিফ্যাক্ট

> [!NOTE]
> **এক কথায়:** Handoff artifact হলো **এক session-এর লেখা document, অন্য session-এর পড়ার জন্য।**
>
> **In short:** A handoff artifact is **a document that one session writes so another session can read it**. Specs, tickets and plan docs are all handoff artifacts.

#### ব্যাপারটা কী?

Clear করলে context-এর সব হারায়, তাহলে আগের সিদ্ধান্ত রাখবেন কোথায়? উত্তর: **ফাইলে।** Model stateless, কিন্তু environment টিকে থাকে। তাই জরুরি অবস্থা ফাইলে লিখে রাখলে পরের session সেটা পড়ে নিতে পারে। এটা একটা **secondary source:** লেখক session যা বিশ্বাস করত তাই লেখা আছে। যা বাদ পড়েছে বা ভুল লেখা হয়েছে, পাঠক তা দেখতে পায় না। তাই জরুরি দাবি কোড আর test দিয়ে যাচাই করুন।

#### ভালো artifact কেমন

| বিষয় | ভালো | খারাপ |
|---|---|---|
| ফাইলের উল্লেখ | `src/billing/invoice.ts` | "যে ফাইল নিয়ে কথা হলো" |
| সিদ্ধান্ত | "Queue ব্যবহার, কারণ retry দরকার" | "Queue ব্যবহার" |
| অবস্থা | কী শেষ, কী বাকি, আলাদা করে লেখা | "প্রায় হয়ে এসেছে" |
| পাঠক | কিছুই না জানা নতুন session | আগের session নিজে |

#### একটা কাজ ধরে দেখি

Invoice PDF-এর কাজ আধা-পথে, context ভারী হয়ে এসেছে। তারপর:

1. আপনি বললেন: "কিছুই না জানা নতুন session-এর জন্য একটা handoff doc লেখো।"
2. Agent `handoff.md` লিখল: আসল ফাইলের path, কেন PDF library বদলানো হলো, কী শেষ, কী বাকি।
3. আপনি ফাইলটা পড়ে একটা ভুল path শুধরে দিলেন।
4. `/clear` চালিয়ে নতুন session-এ `handoff.md` পড়ালেন।
5. নতুন session বাকি কাজ ধরল, আর প্রথমে test চালিয়ে "শেষ" দাবিগুলো যাচাই করে নিল।

**খেয়াল করুন: ফাইলটা disk-এ ছিল বলেই আপনি আগে পড়ে শুধরে নিতে পারলেন।** Compaction-এর সারাংশে এই সুযোগ কম।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Doc-এ যা লেখা তা-ই সত্য | Doc **লেখকের বিশ্বাস।** যা জরুরি, নতুন session তা কোড আর test দিয়ে যাচাই করবে। |
| সংক্ষেপে লিখলেই ভালো | সংক্ষেপ ঠিক আছে, তবে **"কেন" না থাকলে** নতুন session সিদ্ধান্ত নিয়ে আবার তর্ক করে। |
| এটা শুধু একবারের জন্য | **একই doc দিয়ে পাঁচটা parallel session-কে brief করা যায়।** |

**উপমা / Analogy:** নার্সের রোগী-চার্ট। কোন ওষুধ কখন দেওয়া হলো, **কেন দেওয়া হলো, পরে কী দিতে হবে,** সব লেখা থাকে। *A nurse's patient chart: what was given, when, why, and what comes next.*

> [!TIP]
> **কাজে লাগান:**
>
> - "যে ফাইল নিয়ে কথা হলো" না লিখে **আসল path লিখুন।**
> - সিদ্ধান্তের সাথে **কারণ** লিখুন, আর কী শেষ আর কী বাকি আলাদা করুন।
> - Agent-কে বলে দিন doc-টা কার জন্য: "কিছুই না জানা নতুন session-এর জন্য লেখো।"

**সম্পর্কিত শব্দ:** [Handoff](#handoff--হ্যান্ডঅফ) · [Spec](#spec--স্পেক) · [Compaction](#compaction--কমপ্যাকশন) · [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স)

---

### Spec · স্পেক

> [!NOTE]
> **এক কথায়:** Spec হলো **একাধিক session লাগবে এমন বড় কাজের স্থায়ী ঘর**, যেখানে লেখা থাকে কী বানানো হচ্ছে।
>
> **In short:** A spec is **a handoff artifact for work that needs several sessions**. It says what is being built, and it changes as the work moves.

#### ব্যাপারটা কী?

Session ফেলে দেওয়ার জিনিস, কিন্তু **বড় কাজ ফেলে দেওয়া যায় না।** একটা context window-র বেশি লাগে এমন কাজের একটা ঘর দরকার, যা context-এর বাইরে থাকে আর clear-এ টেকে। সেটা repo-র একটা ফাইল, GitHub issue বা tracker হতে পারে। এই ঘরটাই spec। এতে থাকে **লক্ষ্য, শর্ত, এ পর্যন্ত নেওয়া সিদ্ধান্ত আর status-সহ ticket-এর তালিকা।** যেকোনো নতুন session এটা পড়ে বুঝে ফেলে কাজ কোথায় আছে, আগের session-এর নোংরা ইতিহাস ছাড়াই।

#### Spec-এর চেহারা

| ধরন | কোন দিকে ঝোঁক | কখন মানায় |
|---|---|---|
| PRD | ব্যবহারকারীর দিকের কী আর কেন: feature, আচরণ, acceptance criteria | নতুন feature-এর শুরুতে |
| Design doc বা RFC | প্রযুক্তির পথ, বাতিল বিকল্প, trade-off | বড় প্রযুক্তিগত সিদ্ধান্তে |
| `plan.md` | ticket-এর checklist | ছোট বা মাঝারি multi-session কাজে |

#### একটা কাজ ধরে দেখি

"Shop-এ wishlist" feature বানাবেন। এক session-এ হবে না। তারপর:

1. আপনি `specs/wishlist.md` ফাইলে লক্ষ্য আর শর্ত লিখলেন: "লগইন করা user যোগ আর মুছতে পারবে, সীমা ১০০টা।"
2. ফাইলে ticket-এর তালিকা বসল: table, API, UI, test, প্রতিটার পাশে status।
3. প্রথম session ticket 1 শেষ করে spec-এ "done" লিখল আর একটা সিদ্ধান্ত যোগ করল।
4. আপনি clear করলেন। দ্বিতীয় session শুরুতেই `specs/wishlist.md` পড়ে বুঝল কোথায় আছে।
5. পরের দিনের session-ও একই ফাইল পড়ে সঠিক ticket ধরল।

**খেয়াল করুন: কাজের স্মৃতি session-এ নেই, spec-এ আছে।** Session বদলায়, spec থাকে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Spec একবার লিখে ফেলে রাখার জিনিস | কাজ এগোলে **spec বদলায়।** নতুন সিদ্ধান্ত আর ticket-এর status যোগ হয়। |
| PRD, RFC আর `plan.md` একেবারে আলাদা জিনিস | ধরন আলাদা, কিন্তু agent-এর কাছে **ভূমিকা এক:** প্রতিটা session-এর শুরুতে পড়া স্থায়ী উদ্দেশ্যের বিবৃতি। |

**উপমা / Analogy:** বাড়ি বানানোর অনুমোদিত নকশা। মিস্ত্রি বদলায়, দিন বদলায়, কিন্তু **সবাই একই নকশা দেখে কাজ করে।** *An approved building plan: workers and days change, everyone follows the same plan.*

> [!TIP]
> **কাজে লাগান:**
>
> - বড় কাজ এক session-এ করতে গেলে মাঝপথেই **smart zone ছাড়িয়ে যাবেন।** আগে spec লিখুন।
> - Spec-কে ticket-এ ভাঙুন, **প্রতিটা ticket আলাদা session-এ** চালান।
> - Spec-এ কী বানানো হচ্ছে লিখুন। প্রতিটা session কীভাবে করবে, সেটা সেখানে ভরবেন না।

**সম্পর্কিত শব্দ:** [Ticket](#ticket--টিকিট) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Smart zone](#smart-zone--স্মার্ট-জোন) · [Session](#session--সেশন)

---

### Ticket · টিকিট

> [!NOTE]
> **এক কথায়:** Ticket হলো **ঠিক এক session-এ শেষ হবে এমন এক টুকরো কাজ**, handoff artifact হিসেবে লেখা।
>
> **In short:** A ticket is **one piece of work sized to finish in a single session**, written down as a handoff artifact.

#### ব্যাপারটা কী?

Spec-এর কাজ ভাগ করতে গিয়ে প্রশ্ন ওঠে: **এক টুকরো কত বড় হবে?** উত্তর: যতটা এক session-এ, smart zone ছেড়ে বেরোনোর আগেই শেষ করা যায়। এই মাপটাই ticket-এর আসল শর্ত। Ticket একা থাকতে পারে, বা spec-এর অংশ হতে পারে। একটা ticket আরেকটাকে আটকাতেও পারে, তাই কাজের ক্রম আসে **dependency graph থেকে,** সোজা লাইন থেকে নয়।

<figure class="diagram">
<svg viewBox="0 0 560 220" role="img" aria-label="Ticket 1 blocks tickets 2 and 3, which can then run in parallel. Ticket 4 depends on nothing and can start at once.">
  <defs><marker id="5-ticket-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="68" width="120" height="44" rx="10"/><text x="80" y="90">1 schema</text>
  <text class="note" x="80" y="128">blocks 2 and 3</text>
  <rect class="node" x="220" y="28" width="120" height="44" rx="10"/><text x="280" y="50">2 API</text>
  <rect class="node" x="220" y="108" width="120" height="44" rx="10"/><text x="280" y="130">3 UI</text>
  <text class="note" x="450" y="94">2 and 3 run in parallel</text>
  <path class="arrow" d="M140 84 L218 52" marker-end="url(#5-ticket-arrow)"/>
  <path class="arrow" d="M140 96 L218 128" marker-end="url(#5-ticket-arrow)"/>
  <rect class="node skip" x="20" y="158" width="120" height="44" rx="10"/><text x="80" y="180">4 typo fix</text>
  <text class="note start" x="152" y="180">no dependency, start at once</text>
</svg>
<figcaption>Dependency graph: schema আগে, তারপর API আর UI একসাথে, আর typo fix আলাদা। The graph decides the order and shows what can run in parallel.</figcaption>
</figure>

#### Ticket-এর মাপ

| অবস্থা | লক্ষণ | কী করবেন |
|---|---|---|
| বড় ticket | কাজ শেষের আগেই session ঢিলা হয়ে যায় | ভাগ করুন |
| ঠিক মাপ | Session শেষ হয় smart zone-এর ভেতরেই | যেমন আছে রাখুন |
| ছোট ticket | পাঁচ মিনিটের কাজের জন্য context-এর বেশিরভাগ setup-এ যায় | অন্য ticket-এর সাথে মেলান |

#### একটা কাজ ধরে দেখি

Spec-এ চারটা ticket: schema, API, UI, typo fix। তারপর:

1. আপনি graph দেখলেন: API আর UI দুটোই schema-র উপর নির্ভর করে। Typo fix কারও উপর নির্ভর করে না।
2. Schema ticket-এর জন্য একটা session চালালেন। Typo fix-এর জন্য আরেকটা session একই সময়ে চালালেন।
3. Schema শেষ হতেই API আর UI আনব্লক হলো।
4. আপনি দুটো নতুন session চালালেন, প্রতিটার হাতে নিজের ticket।
5. প্রতিটা session শুধু ticket-এর লক্ষ্য, acceptance criteria আর ফাইলের pointer পড়ে কাজ শুরু করল।

**খেয়াল করুন: যেসব ticket একে অপরের উপর নির্ভর করে না, তারা একসাথে চলতে পারে।** এভাবেই একাধিক agent কার্যকরভাবে চালানো যায়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Ticket মানে শুধু একটা শিরোনাম | অন্য কিছু না জানা পাঠকের জন্য **লক্ষ্য, acceptance criteria আর দরকারি ফাইলের pointer** থাকতে হবে। |
| ছোট ticket সব সময় ভালো | অতি ছোট ticket-এ **context-এর বেশিরভাগ setup-এ যায়,** কাজে নয়। |

**উপমা / Analogy:** রাজমিস্ত্রির একদিনের কাজের আদেশ। "আজ তিনতলার ছাদ ঢালাই।" **ঢালাইয়ের আগে রড বাঁধা শেষ হতে হবে।** *A mason's single-day work order, with "rods before concrete" as the dependency.*

> [!TIP]
> **কাজে লাগান:**
>
> - Spec-এর ticket graph দেখুন, **কারও উপর নির্ভর করে না এমন একটা ticket বেছে** তার জন্য নতুন session চালান।
> - Session যদি বারবার কাজ শেষের আগেই ঝাপসা হয়, **ticket ভাগ করুন।**

**সম্পর্কিত শব্দ:** [Spec](#spec--স্পেক) · [Smart zone](#smart-zone--স্মার্ট-জোন) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার)

---

### Compaction · কমপ্যাকশন

> [!NOTE]
> **এক কথায়:** Compaction হলো **memory-তে করা handoff**: session-এর সারাংশ বানিয়ে সেটা দিয়ে নতুন session শুরু।
>
> **In short:** Compaction is **a handoff done in memory**: the session history is summarised and the summary starts a fresh session.

#### ব্যাপারটা কী?

Session লম্বা হলে window ভরে আসে। প্রতিটা tool result, ফাইল পড়া আর ভুল পথ ইতিহাসে থেকে যায়। তখন harness model-কে বলে, "এ পর্যন্ত কাজের সারাংশ লেখো।" তারপর **আসল ইতিহাস ফেলে দেয়,** আর সারাংশ দিয়ে নতুন session চালু করে। সারাংশে যা ঢোকেনি, তা context থেকে গেল। তাই compaction **গড়নেই lossy:** transcript primary source, সারাংশ secondary source, আর আপনি খুঁটিনাটি দিয়ে জায়গা কিনছেন। Clearing সব ফেলে দেয়। Compaction জরুরি জিনিস পার করানোর চেষ্টা করে।

#### একটা কাজ ধরে দেখি

Orders table-এর migration নিয়ে এক ঘণ্টা কাজ হয়েছে। Window প্রায় ভরা। তারপর:

1. Plan পাকা হয়েছে, কোড লেখা শুরু হয়নি। এটা ধাপের সীমানা, compact করার ভালো সময়।
2. আপনি লিখলেন: `/compact schema-র সিদ্ধান্তগুলো আর বাতিল হওয়া বিকল্পের কারণ রাখো`।
3. Model সারাংশ লিখল, আর আসল ইতিহাস বাদ গেল।
4. নতুন session ওই সারাংশ নিয়ে শুরু হলো, আর window আবার প্রায় খালি।
5. আপনি সারাংশ পড়ে দেখলেন সিদ্ধান্তগুলো আছে কিনা।

**খেয়াল করুন: সারাংশ model লেখে, তাই তাকে নির্দেশ দেওয়া যায়।** "কী রাখো" বললে সারাংশ অনেক বেশি সুচিন্তিত হয়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Compaction-এ কিছুই হারায় না | **হারায়।** সারাংশে যা ঢোকেনি, তা context থেকে চলে যায়। |
| হারানো জিনিস আর ফিরে পাওয়া যায় না | কিছু harness পুরনো transcript disk-এ রাখে আর সারাংশে **তার pointer** দেয়। তখন হারানো জিনিস ফিরে পড়া যায়। |
| যখন খুশি compact করলেই হয় | সময় গুরুত্বপূর্ণ। **ধাপের সীমানায়, plan পাকা হওয়ার পরে** compact করুন, কাজের মাঝখানে নয়। |

**উপমা / Analogy:** তিন ঘণ্টার মিটিং-এর minutes। পুরো আলোচনা নেই, **মূল সিদ্ধান্ত আছে।** কোন কথা বাদ গেল, সেটা লেখকের উপর নির্ভর করে। *Minutes of a three-hour meeting: the decisions survive, the detail depends on the writer.*

> [!TIP]
> **কাজে লাগান:**
>
> - `/compact` চালানোর সময় **কী রাখতে হবে লিখে দিন,** যেমন "schema-র সিদ্ধান্তগুলো রাখো।"
> - সারাংশ পড়ে দেখুন, আর দরকারি সিদ্ধান্ত না থাকলে নিজে যোগ করুন।
> - কাজের মাঝখানে নয়, **plan পাকা হওয়ার পরে** compact করুন।

**সম্পর্কিত শব্দ:** [Autocompact](#autocompact--অটোকমপ্যাক্ট) · [Handoff](#handoff--হ্যান্ডঅফ) · [Clearing](#clearing--ক্লিয়ারিং) · [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার)

---

### Autocompact · অটোকমপ্যাক্ট

> [!NOTE]
> **এক কথায়:** Autocompact হলো **window ভরে এলে harness নিজে থেকেই compact করে ফেলা।**
>
> **In short:** Autocompact is **compaction that the harness triggers by itself** when the context window is nearly full.

#### ব্যাপারটা কী?

Harness সারাক্ষণ দেখে window কতটা ভরেছে। **প্রায় ৮০% মতো একটা সীমা পেরোলে** সে থামে, model-কে দিয়ে সারাংশ লেখায়, আর সেই সারাংশ নিয়ে নতুন session শুরু করে। কাজ এমনভাবে চলে, যেন কিছুই হয়নি। কিন্তু আসলে কিছু ঘটেছে। Compaction তো lossy, আর autocompact এমন এক মুহূর্তে lossy হয় যা **আপনি বাছেননি।**

<figure class="diagram">
<svg viewBox="0 0 560 215" role="img" aria-label="A context window bar filled to about 80 percent triggers autocompact. The history is replaced by a short summary and the window is free again.">
  <defs><marker id="5-autocompact-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="start" x="30" y="30">context window</text>
  <rect class="node down" x="30" y="50" width="400" height="40" rx="6"/><text x="230" y="70">history, tool results, wrong turns</text>
  <rect class="node skip" x="430" y="50" width="100" height="40" rx="6"/><text x="480" y="70">room</text>
  <path class="edge" d="M430 40 L430 100"/>
  <text class="note" x="410" y="116">about 80%: autocompact fires</text>
  <path class="arrow" d="M200 94 L90 136" marker-end="url(#5-autocompact-arrow)"/>
  <rect class="node up" x="30" y="140" width="100" height="40" rx="6"/><text x="80" y="160">summary</text>
  <rect class="node skip" x="130" y="140" width="400" height="40" rx="6"/><text x="330" y="160">free again</text>
  <text class="note" x="300" y="200">the summary decides what you keep</text>
</svg>
<figcaption>সীমা ছুঁলেই window সারাংশে ছোট হয়, আর কী থাকবে তা সারাংশ ঠিক করে। At the threshold the history shrinks to a summary, and the summary decides what survives.</figcaption>
</figure>

#### নিজে compact বনাম Autocompact

| বিষয় | নিজে compact | Autocompact |
|---|---|---|
| কখন হয় | আপনি ঠিক করেন, ধাপের সীমানায় | সীমা ছুঁলেই, যেখানেই থাকুন |
| কী রাখবে | আপনি model-কে বলে দিতে পারেন | সারাংশ নিজেই বাছে |
| মাঝপথে ভাঙার ঝুঁকি | কম | বেশি, refactor-এর মাঝখানেও চলে |

#### একটা কাজ ধরে দেখি

আপনি একটা বড় refactor চালাচ্ছেন। এক ঘণ্টা আগে বলেছিলেন: "public API-র নাম বদলানো যাবে না।" তারপর:

1. Refactor-এর মাঝখানে window ৮০% ছুঁল।
2. Harness নিজে থেকে compact করল। আপনি কিছু বললেন না।
3. সারাংশে ছোট ছোট ফাইলের কথা ঢুকল, কিন্তু "API-র নাম বদলানো যাবে না" শর্তটা ঢুকল না।
4. Agent আত্মবিশ্বাসে কাজ চালিয়ে একটা public method-এর নাম বদলে ফেলল।
5. আপনি বুঝলেন শুধু তখন, যখন test ভাঙল।

**খেয়াল করুন: agent চুপচাপ একটা শর্ত ভুলে গিয়েছিল, আর কেউ সেটা জানায়নি।** এটাই autocompact-এর চেনা লক্ষণ।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Autocompact চললে কাজে কোনো ফারাক পড়ে না | **ফারাক পড়ে।** সারাংশ নিজেই বাছে কোন সিদ্ধান্ত রাখার যোগ্য। |
| এটা বন্ধ বা বদলানো যায় না | বেশিরভাগ harness-এ **threshold সরানো বা autocompact বন্ধ করা** যায়। |

**উপমা / Analogy:** আলোচনার মাঝপথে অন্য কেউ নিজে থেকে minutes লিখে আগের কাগজ ফেলে দিল। **আপনার জরুরি কথাটা সে রাখল কিনা, আপনি জানেন না।** *Someone writes the minutes mid-discussion and throws away the notes; you don't know if your key point survived.*

> [!TIP]
> **কাজে লাগান:**
>
> - Context indicator দেখুন, আর **স্বাভাবিক সীমানায় নিজে compact করুন,** autocompact ফায়ার হওয়ার আগে।
> - **জরুরি সিদ্ধান্ত plan ফাইলে লিখে রাখুন।** কোনো সারাংশ সেটা হারাতে পারবে না।
> - Threshold আগে বা পরে সরিয়ে দেখুন কতটা headroom আপনার ভালো লাগে।

**সম্পর্কিত শব্দ:** [Compaction](#compaction--কমপ্যাকশন) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [Clearing](#clearing--ক্লিয়ারিং) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট)

---

<figure class="diagram">
<svg viewBox="0 0 560 205" role="img" aria-label="Handoff: session A writes a plan file, and a fresh session B reads it. Compaction: a long chat is summarized and the same session continues, possibly missing some details.">
  <defs><marker id="d7-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="note start" x="20" y="14">Handoff: you decide what the next session reads</text>
  <rect class="node" x="20" y="30" width="150" height="60" rx="10"/><text x="95" y="50">session A</text><text class="note" x="95" y="74">full, noisy</text>
  <path class="arrow" marker-end="url(#d7-arrow)" d="M172 60 L211 60"/>
  <path class="node down" d="M215 30 L295 30 L315 50 L315 90 L215 90 Z"/><path class="edge" d="M295 30 L295 50 L315 50"/>
  <text x="265" y="54">plan.md</text><text class="note" x="265" y="74">decisions</text>
  <path class="arrow" marker-end="url(#d7-arrow)" d="M317 60 L356 60"/>
  <rect class="node up" x="360" y="30" width="150" height="60" rx="10"/><text x="435" y="50">session B</text><text class="note" x="435" y="74">fresh, focused</text>
  <text class="note start" x="20" y="120">Compaction: the harness summarizes for you</text>
  <rect class="node" x="20" y="135" width="150" height="60" rx="10"/><text x="95" y="155">long chat</text><text class="note" x="95" y="179">many turns</text>
  <path class="arrow" marker-end="url(#d7-arrow)" d="M172 165 L211 165"/>
  <rect class="node down" x="215" y="135" width="100" height="60" rx="10"/><text x="265" y="155">summary</text><text class="note" x="265" y="179">lossy</text>
  <path class="arrow" marker-end="url(#d7-arrow)" d="M317 165 L356 165"/>
  <rect class="node up" x="360" y="135" width="150" height="60" rx="10"/><text x="435" y="155">continues</text><text class="note" x="435" y="179">some detail lost</text>
</svg>
<figcaption>A handoff carries the important parts to a clean session in a file you control. Compaction does it automatically inside the same session, and the summary can drop details you needed. Handoff-এ কী থাকবে, সেটা আপনি ঠিক করেন।</figcaption>
</figure>

---

## 6. Memory and steering · মনে রাখা আর দিক দেখানো

How to make knowledge last beyond one session without flooding the context. **এক session-এর জ্ঞান পরের session-এ নেওয়া, context না ভরিয়ে।**

### Memory system · মেমোরি সিস্টেম

> [!NOTE]
> **এক কথায়:** Memory system হলো **agent-এর শেখা জিনিস ফাইলে লিখে রাখা আর পরের session-এ আবার পড়িয়ে দেওয়া**, কারণ model নিজে কিছু মনে রাখে না।
>
> **In short:** A memory system **saves what an agent learns into files and reloads it in later sessions**, because the model itself remembers nothing.

#### ব্যাপারটা কী?

আজ আপনি agent-কে বললেন "date সবসময় UTC-তে রাখো", কাল নতুন session-এ সে আবার ভুলে গেছে। **এত কথা বলার পরেও কেন মনে থাকে না?** কারণ model stateless, এক session-এর কিছুই পরের session-এ যায় না। Memory system এই ঘাটতি পূরণ করে একটা সোজা কৌশলে: **শেখা জিনিস ফাইলে লেখে, আর পরের session-এর শুরুতে ফাইলটা context-এ আবার ঢুকিয়ে দেয়।** মনে রাখাটা আসলে একটা ভান, কিন্তু কাজের ভান।

<figure class="diagram">
<svg viewBox="0 0 560 180" role="img" aria-label="Session 1 writes to memory files. Session 2 reads from the same memory files.">
  <defs><marker id="6-memory-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="50" width="140" height="60" rx="10"/><text x="90" y="80">Session 1</text>
  <rect class="node" x="210" y="50" width="140" height="60" rx="10"/><text x="280" y="80">memory files</text>
  <rect class="node up" x="400" y="50" width="140" height="60" rx="10"/><text x="470" y="80">Session 2</text>
  <path class="arrow" d="M160 80 L208 80" marker-end="url(#6-memory-arrow)"/>
  <path class="arrow" d="M350 80 L398 80" marker-end="url(#6-memory-arrow)"/>
  <text class="note" x="185" y="36">write</text>
  <text class="note" x="375" y="36">read</text>
  <text class="note" x="280" y="150">the model forgets, the files remember</text>
</svg>
<figcaption>Session 1 ফাইলে লেখে, Session 2 সেই ফাইল পড়ে। Session 1 writes to the files; Session 2 reads them back.</figcaption>
</figure>

#### Memory system-এর দুই পথ আর এক ঝামেলা

| অংশ | কী হয় | খেয়াল রাখুন |
|---|---|---|
| Write path | কাজের সময় agent আপনার পছন্দ বা project-এর তথ্য ফাইলে লেখে | ছোট, এক বিষয়ের ফাইল ভালো |
| Read path | নতুন session-এর শুরুতে harness ফাইল বা তার index context window-এ লোড করে | বেশিরভাগ system শুধু এক লাইনের index লোড করে |
| Drift | ফাইল পুরনো হয়, কিন্তু লোড হয় একই জোরে | নিয়মিত ছাঁটাই করতে হয় |

#### একটা কাজ ধরে দেখি

একটা project-এ date নিয়ে কাজ চলছে। তারপর যা যা হয়:

1. Session 1-এ আপনি বললেন: "date সবসময় UTC-তে রাখো।"
2. Agent memory ফোল্ডারে একটা ছোট ফাইল লিখল আর index-এ এক লাইন জুড়ল। এটা **write path।**
3. Session শেষ। Model কিছুই মনে রাখেনি, শুধু ফাইলটা পড়ে আছে।
4. পরদিন নতুন session শুরু হতেই harness index-টা context-এ ঢোকাল। এটা **read path।**
5. Date-এর কাজ এলে agent ফাইলটা খুলল আর UTC ধরেই code লিখল।
6. তিন মাস পরে team সিদ্ধান্ত নিল সব date offset-সহ রাখবে। পুরনো memory তবুও একই আত্মবিশ্বাসে লোড হচ্ছে।

**খেয়াল করুন: ষষ্ঠ ধাপে memory আর সত্য নেই, তবু agent তা মেনে চলছে।** আপনি না মুছলে বা না বদলালে ভুলটা চলতেই থাকবে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Agent আমার কথা শিখে ফেলেছে | Model-এর ভেতরে কিছু বদলায়নি। **একটা ফাইল লেখা হয়েছে আর পরে পড়ানো হয়েছে।** |
| Memory-তে যা আছে তা সবসময় সত্য | Memory একটা **secondary source**। লেখার দিনের সত্য আজ নাও থাকতে পারে। |
| যত বেশি memory, তত ভালো | সব লোড করলে context ভরে যায়। তাই **index আগে, পুরো লেখা দরকারে।** |

**উপমা / Analogy:** দোকানদার প্রতিদিন সকালে ডায়েরি পড়ে নেয় কার কী পছন্দ। কিন্তু **ছয় মাস আগের লেখা "অমুক চিনি কম খান" হয়তো আর সত্য না**, অথচ ডায়েরিতে সেটা আগের মতোই জ্বলজ্বল করছে। *A shopkeeper rereads his diary each morning, but a six-month-old note may no longer be true.*

> [!TIP]
> **কাজে লাগান:**
>
> - Claude Code-এর auto memory থাকে `~/.claude/projects/{folder}/memory/`-এ। **মাঝে মাঝে ফোল্ডারটা খুলে দেখুন।**
> - ভুল বা পুরনো memory দেখলে **সঙ্গে সঙ্গে মুছুন বা ঠিক করুন।**
> - নিজেও বানাতে পারেন: একটা notes-এর ফোল্ডার আর `CLAUDE.md`-এ এক লাইন, "দরকারে ওই ফোল্ডার দেখো।"

**সম্পর্কিত শব্দ:** [Stateless](#stateless--স্টেটলেস) · [Context window](#context-window--কনটেক্সট-উইন্ডো) · [AGENTS.md](#agentsmd--এজেন্টসএমডি) · [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স)

---

### AGENTS.md · এজেন্টস.এমডি

> [!NOTE]
> **এক কথায়:** AGENTS.md হলো **যে ফাইল প্রতিটা session-এর শুরুতে agent নিজে থেকে পড়ে**, project-এর স্থায়ী নির্দেশনা।
>
> **In short:** AGENTS.md is **a file the harness loads at the start of every session**: the project's standing instructions for the agent. Claude Code calls it `CLAUDE.md`.

#### ব্যাপারটা কী?

প্রতিদিন নতুন session, আর প্রতিদিন সেই একই কথা: "আমরা pnpm ব্যবহার করি", "এই ফোল্ডার generated, ছুঁয়ো না।" **একই কথা কতবার বলবেন?** Model stateless, তাই এক session-এর সংশোধন পরেরটায় নেই। AGENTS.md এই সমস্যার সমাধান। ফাইলটা project-এ থাকে, harness প্রতি session-এর শুরুতে সেটা context-এ জুড়ে দেয়, আর **আপনাকে আর বারবার বলতে হয় না।** Claude Code-এ এর নাম `CLAUDE.md`।

#### কী লিখবেন, কী লিখবেন না

| লিখুন | লিখবেন না |
|---|---|
| Build আর test-এর command | Code পড়লেই যা বোঝা যায় |
| কোড দেখে বোঝা যায় না এমন নিয়ম | পুরো style guide |
| কঠিন নিষেধ ("generated client কখনো edit করবে না") | শুধু বিশেষ কাজে লাগে এমন লম্বা runbook |

#### একটা কাজ ধরে দেখি

আপনার project-এ `pnpm` চলে। তারপর যা যা হয়:

1. Agent প্রথম session-এ `npm install` চালাল। আপনি বললেন: "`pnpm` ব্যবহার করো।"
2. পরের session-এ সে আবার `npm install` চালাল। দ্বিতীয়বার ঠিক করতে হলো।
3. এবার **twice rule** খাটান। `AGENTS.md`-এ এক লাইন লিখুন: "package manager `pnpm`, `npm` চালাবে না।"
4. পরের প্রতিটা session শুরুতেই লাইনটা পায়, ভুলটা আর হয় না।
5. মাসখানেক পরে কেউ তিন পাতার style guide ফাইলে ঢুকিয়ে দিল। এখন session শুরুতেই অনেক token খরচ, আর agent ছোট নিয়মগুলোও ভুলছে।
6. Style guide ফাইল থেকে সরিয়ে skill-এ রাখলেন। সমস্যা মিটল।

**খেয়াল করুন: ফাইলে লাইন যোগ করা সহজ, কিন্তু প্রতিটা লাইনের দাম প্রতি turn-এ দিতে হয়।** তাই ঢোকানোর আগে ভাবুন।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| যত বেশি নিয়ম লিখব, agent তত ভালো মানবে | Context-এ যত নিয়ম, **model প্রতিটা তত কম নির্ভরযোগ্যভাবে মানে।** |
| এটা project-এর documentation | এটা **সংক্ষিপ্ত নির্দেশনা**, documentation না। |
| ফাইলে আছে মানে agent সবসময় সেটা দেখছে | ফাইল লোড হয় ঠিকই, কিন্তু **লম্বা হলে নিজের গুরুত্ব নিজেই কমায়।** |

**উপমা / Analogy:** মেসের দেয়ালে টাঙানো নিয়মের কাগজ। **পাঁচ লাইনের হলে সবাই মানে, পাঁচ পাতার হলে কেউ পড়ে না।** *The rules sheet on a mess-hall wall: five lines get followed, five pages get ignored.*

> [!TIP]
> **কাজে লাগান:**
>
> - **একই ভুল দুইবার ঠিক করলে** সেটা ফাইলে এক লাইন বানান।
> - যা শুধু নির্দিষ্ট কাজে লাগে, সেটা **skill বা context pointer-এর পেছনে** রাখুন।
> - ফাইলটা মাঝে মাঝে পড়ুন আর অচল লাইন ছেঁটে ফেলুন।

**সম্পর্কিত শব্দ:** [Progressive disclosure](#progressive-disclosure--প্রগ্রেসিভ-ডিসক্লোজার) · [Skill](#skill--স্কিল) · [Stateless](#stateless--স্টেটলেস) · [Token](#token--টোকেন)

---

### Progressive disclosure · প্রগ্রেসিভ ডিসক্লোজার

> [!NOTE]
> **এক কথায়:** Progressive disclosure হলো **এখন যা দরকার শুধু সেটুকু context-এ দেওয়া**, বাকিটার ঠিকানা রেখে দেওয়া।
>
> **In short:** Progressive disclosure means **giving the agent only the context it needs right now**, plus pointers to the rest.

#### ব্যাপারটা কী?

সব নিয়ম, সব guide, সব runbook যদি AGENTS.md-এ রেখে দেন, agent তো সবই জানবে। **তাহলে ঝামেলা কোথায়?** ঝামেলা হলো খরচ। Context-এ ঢোকানো প্রতিটা token প্রতি turn-এ input হিসেবে বিল হয়, আবার attention budget-ও খায়। ধারণাটা UI design থেকে নেওয়া: **এখনকার কাজের বোতাম দেখাও, বাকি সব এক ক্লিকের পেছনে রাখো।** Agent-এর context-এও একই নীতি। সবসময় লোড হওয়া অংশ ছোট রাখুন, বাকিটা দরকারের সময় আনুন।

#### দুই নকশার তুলনা

| দিক | সব ঠাসলে | Progressive disclosure |
|---|---|---|
| প্রতি turn-এর খরচ | সব নিয়মের token | শুধু ছোট ঠিকানার লাইন |
| জরুরি নিয়ম | বাকি নিয়মের ভিড়ে চাপা পড়ে | এখনকার কাজের নিয়মই সামনে |
| লক্ষণ | নিয়ম context-এ আছে, তবু agent মানছে না | agent ঠিক সময়ে ঠিক ফাইল খোলে |

#### একটা কাজ ধরে দেখি

ধরুন `AGENTS.md`-এ শুধু তিনটা ঠিকানার লাইন আছে: component লেখার আগে `docs/style.md`, deploy-র আগে `docs/deploy.md`, migration-এর আগে `docs/db.md`। তারপর:

1. আপনি বললেন: "failing test-টা ঠিক করো।" Agent তিনটার কোনোটাই খুলল না, context হালকা রইল।
2. আপনি বললেন: "নতুন `Button` component বানাও।" Agent `docs/style.md` খুলল আর নিয়ম মেনে লিখল।
3. আপনি বললেন: "staging-এ deploy করো।" এবার `docs/deploy.md` খুলল।
4. প্রতিটা কাজে সে শুধু সেই নিয়মই পেল, যা তখন দরকার।

**খেয়াল করুন: তিনটা guide কখনোই একসাথে context-এ ছিল না।** তবু যখন যেটা দরকার, agent সেটা পেয়েছে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Context-এ যত বেশি তথ্য, agent তত বুদ্ধিমান | বেশি ঠাসলে **দরকারি নিয়ম ভিড়ে ঘোলা হয়ে যায়**, agent সবকিছুতেই খারাপ করে। |
| Context-এ থাকলে খরচ নেই | **খরচ দুইবার:** প্রতি turn-এ token বিল, আর attention budget-ও যায়। |
| এটা শুধু AGENTS.md-এর ব্যাপার | Skill আসলে **harness-এর ভেতরে বানানো এই নকশাই।** |

**উপমা / Analogy:** রেস্টুরেন্টের মেনুতে শুধু খাবারের নাম থাকে, পুরো রেসিপি না। **অর্ডার দিলে তবেই রান্নাঘরে রেসিপি খোলা হয়।** *A menu lists dish names, not recipes. The recipe opens only when you order.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent জানা নিয়মও মানছে না? **প্রথমে ভাবুন নিয়মটা ভিড়ে চাপা পড়েছে কি না।**
> - Always-loaded ফাইলে প্রতি বিষয়ে **এক বাক্য আর বিস্তারিতের path** রাখুন।
> - Style guide, runbook এগুলো skill বানান।

**সম্পর্কিত শব্দ:** [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার) · [Skill](#skill--স্কিল) · [AGENTS.md](#agentsmd--এজেন্টসএমডি) · [Attention budget](#attention-budget--অ্যাটেনশন-বাজেট)

---

### Context pointer · কনটেক্সট পয়েন্টার

> [!NOTE]
> **এক কথায়:** Context pointer হলো **এক document-এর ভেতরে অন্য document-এর উল্লেখ**, যাতে agent দরকার হলেই সেটা খোলে।
>
> **In short:** A context pointer is **a mention in one document that points to another**, so the agent loads the second one only when the task needs it.

#### ব্যাপারটা কী?

AGENTS.md-এ হাজার token-এর একটা runbook বসালে প্রতিটা session তার দাম দেয়, সেদিন deploy না করলেও। **তাহলে runbook-টা রাখবেন কোথায়, আবার agent-ই বা খুঁজে পাবে কীভাবে?** উত্তর হলো pointer। Context-এ থাকে **মাত্র এক লাইন**, যেমন "deploy নিয়ম: `internal/deploy.md` দেখো"। পেছনের document হাজার token-এর হলেও agent না খোলা পর্যন্ত তার কোনো খরচ নেই। Progressive disclosure এই pointer দিয়েই তৈরি।

#### ভালো pointer-এর দুই অংশ

| অংশ | কী | উদাহরণ |
|---|---|---|
| স্থির path | কোথায় গেলে পাবেন | `internal/deploy.md` |
| কখন খুলবেন | কাজের ধরন, যে ধরনের কাজে ফাইলটা লাগে | "deploy বা rollback করার আগে" |

#### একটা কাজ ধরে দেখি

একই ফাইল, দুইভাবে লেখা। তারপর যা যা হয়:

1. প্রথমে `AGENTS.md`-এ লেখা হলো শুধু: "`deploy.md` দেখো।"
2. আপনি বললেন: "production-এ rollback করো।"
3. Agent লাইনটা context-এ পেয়েছে, কিন্তু rollback-এর কাজের সাথে "দেখো"-র কোনো যোগ খুঁজে পায়নি। সে ফাইল না খুলে নিজের আন্দাজে `git revert` চালাল।
4. আপনি লাইনটা বদলে লিখলেন: "deploy বা rollback করার আগে `deploy.md` পড়ো।"
5. আবার একই কথা বললেন। এবার agent আগে `deploy.md` খুলল, তারপর কাজে হাত দিল।

**খেয়াল করুন: path একই ছিল, শুধু "কখন" যোগ হওয়ায় ফল বদলে গেল।** Pointer লিখুন কাজ যেভাবে আসে সেভাবে।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Pointer মানে শুধু একটা ফাইলের path | Path-এর সাথে **কখন খুলতে হবে** না থাকলে agent এড়িয়ে যায়। |
| Pointer শুধু AGENTS.md-এ থাকে | **সব জায়গায়:** skill-এর description, directory-র ফাইলের নাম, docs-এর link। |
| সারাংশ হলে আসল তথ্য চিরতরে গেল | সারাংশ আসল transcript-এর নাম রাখলে **agent মূল উৎস পড়ে হারানো তথ্য ফিরে পাবে।** |

**উপমা / Analogy:** বইয়ের সূচিপত্র বা "বিস্তারিত দেখুন পৃষ্ঠা ৪৫"। **পুরো অধ্যায় সামনে নেই, কিন্তু কোথায় আছে জানা আছে।** *A book's index, or "see page 45": the chapter is not in front of you, but you know where it is.*

> [!TIP]
> **কাজে লাগান:**
>
> - **কাজ যেভাবে আসে সেভাবে লিখুন:** "release, deploy বা rollback হলে আগে `deploy.md` পড়ো।"
> - নামটা **"context pointer"** বলুন, "reference" বা "portal" না।
> - Compaction-এর summary-তে আসল transcript-এর নাম রাখলে হারানো তথ্য ফেরত আনা যায়।

**সম্পর্কিত শব্দ:** [Progressive disclosure](#progressive-disclosure--প্রগ্রেসিভ-ডিসক্লোজার) · [AGENTS.md](#agentsmd--এজেন্টসএমডি) · [Skill](#skill--স্কিল) · [Compaction](#compaction--কমপ্যাকশন)

---

### Skill · স্কিল

> [!NOTE]
> **এক কথায়:** Skill হলো **একটা কাজের পুরো নির্দেশনা এক ফোল্ডারে**, যা দরকার না হওয়া পর্যন্ত context-এর বাইরে থাকে।
>
> **In short:** A skill is **one task's full instructions bundled as a folder**, which stays out of the context until a pointer pulls it in.

#### ব্যাপারটা কী?

কিছু নির্দেশনা বড় আর শুধু বিশেষ কাজে লাগে, যেমন release note লেখা। এগুলো AGENTS.md-এ রাখলে প্রতি session-এ টাকা যায়, না রাখলে agent জানে না। **মাঝামাঝি পথ কী?** Skill। একটা ফোল্ডারে নির্দেশনা আর দরকারি উপকরণ গুছিয়ে রাখুন। Context-এ থাকে শুধু নাম আর এক-দুই বাক্যের description। **কাজ মিললে তবেই বাকিটা লোড হয়।** তাই নির্দেশনা যত বড়ই হোক, রোজকার খরচ প্রায় শূন্য।

#### Skill বনাম AGENTS.md

| দিক | AGENTS.md | Skill |
|---|---|---|
| কখন লোড হয় | কাজ যা-ই হোক, প্রতি session-এ | নির্দিষ্ট ধরনের কাজ এলে |
| রোজকার খরচ | পুরো ফাইলের token | শুধু নাম আর description |
| কী রাখবেন | সব জায়গায় খাটে এমন লাইন | একটা কাজের বিস্তারিত নির্দেশনা |

#### একটা কাজ ধরে দেখি

ধরুন আপনি release note লেখার একটা skill বানাচ্ছেন। তারপর যা যা হয়:

1. `release-notes/` নামে একটা ফোল্ডার বানালেন। ভেতরে `SKILL.md`, যাতে নাম, description আর নির্দেশনা আছে।
2. পাশে একটা template ফাইল আর একটা script রাখলেন। নির্দেশনা এদের দিকে ইশারা করে।
3. রোজকার session-এ context-এ শুধু নাম আর description থাকে। খরচ এক-দুই বাক্যের।
4. আপনি বললেন: "v2.3-এর release note লেখো।" Description মিলে গেল, agent পুরো `SKILL.md` লোড করল।
5. নির্দেশনা অনুযায়ী সে template খুলল আর note লিখল।
6. অন্য কাজের সময় skill চুপচাপ তাকে পড়ে থাকে।

**খেয়াল করুন: নির্দেশনা বড় হলেও দাম দিতে হলো শুধু যে কাজে লাগল, সেই কাজে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Skill একটা tool | **Tool হলো যা agent call করে, skill হলো যা agent পড়ে।** |
| Skill শুধু Claude Code-এর জিনিস | এটা একটা open standard (agentskills.io)। Anthropic শুরু করেছে, **অনেক harness নিয়েছে, একবার লিখলে অনেক জায়গায় চলে।** |
| Skill মানে শুধু একটা মার্কডাউন ফাইল | ফোল্ডারে **script, template, reference-ও** থাকতে পারে। |

**উপমা / Analogy:** তাকে রাখা রান্নার বই। তাক থেকে শুধু বইয়ের নাম দেখা যায়। **বিরিয়ানি রাঁধার দিনই বিরিয়ানির বইটা নামানো হয়।** *Cookbooks on a shelf: you see only the spines, and take down the biryani book on biryani day.*

> [!TIP]
> **কাজে লাগান:**
>
> - যে নির্দেশনা শুধু নির্দিষ্ট কাজে লাগে, সেটা **`~/.claude/skills/`-এ skill হিসেবে রাখুন**, `CLAUDE.md`-এ না।
> - **Description ভালো করে লিখুন।** কাজ মিলিয়ে skill ধরা পড়ে ওই লেখা দেখেই।

**সম্পর্কিত শব্দ:** [Progressive disclosure](#progressive-disclosure--প্রগ্রেসিভ-ডিসক্লোজার) · [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার) · [AGENTS.md](#agentsmd--এজেন্টসএমডি) · [Tool](#tool--টুল)

---

### Subagent · সাবএজেন্ট

> [!NOTE]
> **এক কথায়:** Subagent হলো **যে agent আরেকটা agent tool call দিয়ে চালু করে**, নিজের context window-এ কাজ করে আর একটাই result ফেরত দেয়।
>
> **In short:** A subagent is **an agent started by another agent through a tool call**, working in its own context window and returning one result.

#### ব্যাপারটা কী?

"এই code-base-এ payment retry কোথায় হয়, খুঁজে দাও।" Agent grep চালাল, পাতার পর পাতা ফলাফল এল। উত্তর পাওয়া গেল, কিন্তু **ফলাফলের বেশিরভাগ আবর্জনা বাকি session জুড়ে context-এ থেকে গেল।** এর সমাধান subagent। মূল agent কাজটা আরেকজনকে দেয়, সে নিজের আলাদা window-এ ঘাঁটাঘাঁটি করে, আর **মূল agent শুধু শেষ রিপোর্ট পায়।**

<figure class="diagram">
<svg viewBox="0 0 560 220" role="img" aria-label="The main agent sends a task to a subagent. The subagent fills its own window with noisy results and returns only a report.">
  <defs><marker id="6-subagent-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="80" width="150" height="60" rx="10"/><text x="95" y="110">Main agent</text>
  <rect class="node skip" x="300" y="20" width="240" height="190" rx="16"/>
  <text class="start" x="316" y="38">Subagent window</text>
  <rect class="node up" x="320" y="55" width="200" height="36" rx="8"/><text x="420" y="73">grep results</text>
  <rect class="node up" x="320" y="100" width="200" height="36" rx="8"/><text x="420" y="118">long files</text>
  <rect class="node up" x="320" y="145" width="200" height="36" rx="8"/><text x="420" y="163">dead ends</text>
  <text class="note" x="420" y="198">thrown away after</text>
  <path class="arrow" d="M170 100 L298 100" marker-end="url(#6-subagent-arrow)"/>
  <path class="arrow" d="M298 125 L172 125" marker-end="url(#6-subagent-arrow)"/>
  <text class="note" x="234" y="88">task</text>
  <text class="note" x="234" y="148">report</text>
  <text class="note" x="95" y="170">sees only the report</text>
</svg>
<figcaption>Noise stays in the subagent's window; only the report comes back. আবর্জনা subagent-এর window-এ থাকে, ফেরে শুধু রিপোর্ট।</figcaption>
</figure>

#### Subagent বনাম Handoff

| দিক | Subagent | Handoff |
|---|---|---|
| ফেরার পথ | আছে, মূল agent অপেক্ষায় থাকে | নেই |
| Context | নিজের আলাদা window | নতুন session নতুন window |
| ফল | একটাই tool result | হাতবদল, মূল agent আর নেই |

#### একটা কাজ ধরে দেখি

আপনি বললেন: "payment retry কোন কোন ফাইলে হয়, খুঁজে দাও।" তারপর যা যা হয়:

1. মূল agent একটা subagent চালু করল, কাজটা বুঝিয়ে দিল। মূল agent এখন ফেরত উত্তরের অপেক্ষায়।
2. Subagent নিজের window-এ grep চালাল, অনেক ফাইল খুলল, কয়েকটা ভুল পথে গেল।
3. সব আবর্জনা জমল তার window-এই। মূল agent-এর context অক্ষত।
4. কাজ শেষে subagent লিখল: "retry হয় `billing/retry.ts` আর `queue/worker.ts`-এ।" এটাই একমাত্র result।
5. মূল agent দুইটা ফাইল নিয়ে কাজে এগোল। Subagent-এর window ফেলে দেওয়া হলো।

**খেয়াল করুন: খোঁজার পুরো ধুলো subagent খেল, মূল agent পেল শুধু দুইটা path।** তবে রিপোর্টে যা বাদ পড়ল, মূল agent তা দেখেনি।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Subagent দিয়ে agent-এর গাছ বানানো যায় | **Subagent আরেকটা subagent বানাতে পারে না।** এর কাজ context আলাদা রাখা, hierarchy বানানো না। |
| রিপোর্টই পুরো সত্য | রিপোর্ট একটা **secondary source।** যা বাদ পড়েছে, মূল agent তা কখনো দেখবে না। |
| Subagent আর handoff একই | Subagent-এ মূল agent **ফেরত উত্তরের অপেক্ষায়** থাকে। Handoff-এ ফেরার পথ নেই। |

**উপমা / Analogy:** অফিসের পিয়নকে রেকর্ড রুমে পাঠানো। সে পুরো ঘর ঘেঁটে **শুধু দরকারি দুইটা ফাইল এনে দেয়, ধুলো আপনার টেবিলে আসে না।** *Sending the office peon to the record room: he digs through everything and brings back just two files.*

> [!TIP]
> **কাজে লাগান:**
>
> - বড় search বা লম্বা ফাইল পড়ার আগে বলুন: **"subagent দিয়ে খুঁজে দেখো।"** Claude নিজেও বড় search-এ Explore subagent ব্যবহার করে।
> - স্বাধীন কাজগুলো **কয়েকটা subagent-এ একসাথে** ছড়িয়ে দিতে পারেন।
> - রিপোর্টে সন্দেহ হলে মূল ফাইল নিজে একবার দেখে নিন।

**সম্পর্কিত শব্দ:** [Handoff](#handoff--হ্যান্ডঅফ) · [Tool call](#tool-call--টুল-কল) · [Tool result](#tool-result--টুল-রেজাল্ট) · [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স)

---

<figure class="diagram">
<svg viewBox="0 0 560 175" role="img" aria-label="CLAUDE.md or AGENTS.md loads into every session. It points to other files, skills and subagents, which load only when the task needs them.">
  <defs><marker id="d8-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="15" width="520" height="56" rx="10"/>
  <text x="280" y="34">CLAUDE.md / AGENTS.md</text><text class="note" x="280" y="56">loaded into every session: keep it short</text>
  <path class="arrow skip" marker-end="url(#d8-arrow)" d="M100 73 L100 108"/>
  <path class="arrow skip" marker-end="url(#d8-arrow)" d="M280 73 L280 108"/>
  <path class="arrow skip" marker-end="url(#d8-arrow)" d="M460 73 L460 108"/>
  <text class="note start" x="288" y="91">pointers</text>
  <rect class="node" x="20" y="112" width="160" height="56" rx="10"/><text x="100" y="131">testing.md</text><text class="note" x="100" y="153">read on demand</text>
  <rect class="node" x="200" y="112" width="160" height="56" rx="10"/><text x="280" y="131">deploy skill</text><text class="note" x="280" y="153">loaded when used</text>
  <rect class="node up" x="380" y="112" width="160" height="56" rx="10"/><text x="460" y="131">subagent</text><text class="note" x="460" y="153">own context</text>
</svg>
<figcaption>Progressive disclosure: the always-loaded file stays small and points to details. Files, skills and subagents enter the picture only when the task needs them. দরকার হলে তবেই বিস্তারিত context-এ আসে।</figcaption>
</figure>

---

## 7. Patterns of work · কাজের ধরন

How much you watch, how much you check, and how much you hand over. **কতটা নিজে দেখবেন, কতটা যন্ত্রকে দিয়ে যাচাই করাবেন, আর কতটা ছেড়ে দেবেন।**

<figure class="diagram">
<svg viewBox="0 0 560 165" role="img" aria-label="A spectrum from human in the loop, through AFK and software factory, to dark factory. Checks and reviews must grow as you move right.">
  <defs><marker id="d9-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text class="note start" x="30" y="24">you watch every step</text>
  <text class="note" x="530" y="24" style="text-anchor:end">nobody reads the code</text>
  <path class="arrow" marker-end="url(#d9-arrow)" d="M30 60 L532 60"/>
  <circle class="node down" cx="70" cy="60" r="10"/><circle class="node down" cx="205" cy="60" r="10"/>
  <circle class="node up" cx="340" cy="60" r="10"/><circle class="node up" cx="475" cy="60" r="10"/>
  <text class="note" x="70" y="92">human in</text><text class="note" x="70" y="110">the loop</text>
  <text class="note" x="205" y="92">AFK</text>
  <text class="note" x="340" y="92">software</text><text class="note" x="340" y="110">factory</text>
  <text class="note" x="475" y="92">dark</text><text class="note" x="475" y="110">factory</text>
  <text class="note" x="280" y="148">checks and reviews must grow as you move right</text>
</svg>
<figcaption>The more you hand over, the more your automated checks and reviews have to catch. যত বেশি ছেড়ে দেবেন, test আর review তত শক্ত হতে হবে।</figcaption>
</figure>

### Human-in-the-loop · হিউম্যান-ইন-দ্য-লুপ

> [!NOTE]
> **এক কথায়:** Human-in-the-loop মানে **পুরো session-এ agent-এর পাশে থাকা**, আর কাজের মাঝেই দিক ঠিক করে দেওয়া।
>
> **In short:** Human-in-the-loop means **you stay in the session with the agent** and steer it while it works, instead of judging only the final result.

#### ব্যাপারটা কী?

Agent একা ছেড়ে দিলে সে ভুল পথে গেলেও থামে না, বরং আরও জোরে এগোয়। **তাহলে ভুলটা ধরবে কে, আর কখন?** Human-in-the-loop-এ উত্তর হলো: আপনি, কাজ চলার সময়ই। আপনি দেখেন agent ভুল ফাইলে হাত দিচ্ছে বা requirement ভুল বুঝছে, আর **এক বাক্যে তাকে ফিরিয়ে আনেন।** এখানে আপনি শুধু একেকটা action-এ "Allow" চাপার দারোয়ান নন, আপনি কাজের সঙ্গী।

#### কোন কাজ লুপে, কোনটা বাইরে

| কাজের ধরন | কোথায় চালাবেন | কারণ |
|---|---|---|
| স্পষ্ট, কম ঝুঁকির, সহজে যাচাই করা যায়, যেমন একটা function-এর test লেখা | AFK | ভুল হলেও পরে সস্তায় ধরা যায় |
| Schema migration | লুপে | ভুল হলে ফেরানো কঠিন |
| জটিল design সিদ্ধান্ত | লুপে | আপনার প্রতিক্রিয়াই এখানে কাঁচামাল |
| Production ছোঁয়া যেকোনো কাজ | লুপে | ভুলের দাম অনেক বেশি |

সিদ্ধান্তের প্রশ্ন একটাই: **ভুল মোড় নিলে কত দামি, আর কত দেরিতে ধরা পড়বে?**

#### একটা কাজ ধরে দেখি

ধরুন `orders` table-এ নতুন `status` column যোগ করতে হবে, আর পুরনো ডেটা থেকে মান বসাতে হবে (backfill)।

1. আপনি agent-কে কাজটা বুঝিয়ে দিলেন এবং session-এর পাশে বসে রইলেন।
2. Agent migration লিখতে লিখতে `paid_at` column থেকে মান নিতে চাইল, অথচ আসল সত্য আছে `is_paid`-এ।
3. আপনি সাথে সাথে লিখলেন: "`paid_at` না, `is_paid` থেকে নাও।" Agent ঠিক করে নিল।
4. Apply করার আগে আপনি migration-এর dry-run output দেখলেন, তারপর অনুমতি দিলেন।

**খেয়াল করুন: ভুলটা ধরা পড়ল দশ সেকেন্ডে।** একা ছাড়লে বিশ মিনিটের আত্মবিশ্বাসী কাজ ভুল ভিত্তির উপর দাঁড়িয়ে থাকত।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Human-in-the-loop মানে প্রতিটা command-এ "Allow" চাপা | আসলে **আপনি পুরো session-এ উপস্থিত ও সক্রিয়।** অনুমতি দেওয়া এর ছোট একটা অংশ। |
| সব কাজ লুপে রাখাই সবচেয়ে নিরাপদ | লুপে থাকার দাম আপনার **মনোযোগ, যা দুষ্প্রাপ্য।** স্পষ্ট ও কম ঝুঁকির কাজ লুপের বাইরে নেওয়াই দক্ষতা। |
| Grilling আর prototyping AFK চালানো যায় | এগুলো **স্বভাবতই লুপের কাজ,** কারণ উত্তর দিতে বা দেখে মতামত দিতে আপনাকেই লাগে। |

**উপমা / Analogy:** গাড়ি শেখার সময় পাশের সিটে প্রশিক্ষক। ভুল লেনে গেলে **সাথে সাথে বলে দেন,** দুর্ঘটনার পরে নয়। *A driving instructor in the passenger seat corrects you the moment you drift, not after the crash.*

> [!TIP]
> **কাজে লাগান:**
>
> - ঝুঁকির কাজে Claude-কে একা ছাড়বেন না, **প্রতিটা ধাপ দেখুন।**
> - Plan আর ছোট diff **মাঝপথে দেখুন।** শেষে পুরো branch খোঁজার চেয়ে সেটা অনেক সস্তা।

**সম্পর্কিত শব্দ:** [AFK](#afk--এএফকে) · [Human review](#human-review--হিউম্যান-রিভিউ) · [Grilling](#grilling--গ্রিলিং) · [Prototyping](#prototyping--প্রোটোটাইপিং)

---

### AFK · এএফকে

> [!NOTE]
> **এক কথায়:** AFK মানে **session চালু করে আপনি চলে যান**, আর agent একা চলতে থাকে।
>
> **In short:** AFK means **away from keyboard**: you start a session and leave the agent running unattended, often many in parallel.

#### ব্যাপারটা কী?

রাতে ঘুমানোর আগে তিনটা session চালু করে গেলেন, সকালে তিনটা কাজ তৈরি। শুনতে দারুণ, আর **AI coding-এর output বাড়ানোর আসল হাতিয়ার এটাই।** কিন্তু একটা ফাঁদ আছে। আপনি দেখলে অস্পষ্ট সিদ্ধান্ত প্রশ্ন হয়ে আসে, আপনি উত্তর দেন। আপনি না থাকলে **agent নিজে একটা default বেছে নেয়,** আর পরের প্রতিটা সিদ্ধান্ত সেই আন্দাজের উপর দাঁড়ায়। ফলে ফিরে পান ঘণ্টার পর ঘণ্টার গোছানো কাজ, যার ভিত্তি প্রথম দশ মিনিটের একটা ভুল ধারণা।

#### AFK সামলানোর তিন ধাপ

| ধাপ | কী করবেন | উদ্দেশ্য |
|---|---|---|
| আগে | Grilling বা লিখিত spec দিয়ে অস্পষ্টতা মেটান | Agent-কে একা ভরার মতো ফাঁক কম থাকে |
| মাঝে | Automated check আর automated review রাখুন | আপনার অনুপস্থিত মনোযোগের বদলি |
| শেষে | Run শেষ হোক একটা PR দিয়ে, merge দিয়ে না | Human review শেষে হবে, তাই যা আসে তা review-যোগ্য হওয়া চাই |

নিরাপদ হতে সাধারণত **উদার permission mode আর sandbox, দুটোই** লাগে।

#### একটা কাজ ধরে দেখি

Issue বলছে: "product list-এ pagination যোগ করো।" কিন্তু cursor না offset, বলা নেই।

1. আপনি অস্পষ্টতা না মিটিয়েই session চালু করে ঘুমাতে গেলেন।
2. Agent প্রশ্ন করার কেউ পেল না। সে offset pagination বেছে নিল।
3. তারপর API, frontend আর test, সবই সেই offset ধরে লিখল।
4. সকালে আপনি দেখলেন সবকিছু পরিপাটি, test সবুজ। কিন্তু আপনার ডেটা এত বড় যে offset ধীর, আপনার দরকার ছিল cursor।

**খেয়াল করুন: কাজ অগোছালো ছিল না, সুসংগত ছিল, শুধু ভুল জিনিস নিয়ে।** শুরুর আগের পাঁচ মিনিটের প্রশ্নোত্তর এই সারা রাতের কাজ বাঁচাতে পারত।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| AFK মানে human review বাদ | **Review শুধু শেষে ঠেলে দেওয়া হয়।** তাই শেষে যা আসে তা review করার যোগ্য হওয়া চাই। |
| একে "background agent" বলা যায় | ওই নাম যন্ত্রকে কেন্দ্রে রাখে। আসল কথা হলো **মানুষ দেখছে না।** |
| AFK-তে শুধু model ভালো হলেই চলে | কেউ দেখছে না, তাই agent-এর একমাত্র ভরসা তার **environment** (AX)। |

**উপমা / Analogy:** দর্জিকে মাপ দিয়ে এক সপ্তাহের জন্য চলে যাওয়া। হাতার মাপ অস্পষ্ট ছিল, দর্জি আন্দাজ করল। ফিরে পেলেন সুন্দর সেলাই করা পাঞ্জাবি, কিন্তু **হাতা ছোট।** *You leave your measurements with the tailor for a week; an unclear sleeve gets guessed, and you return to a neatly stitched kurta with short sleeves.*

> [!TIP]
> **কাজে লাগান:**
>
> - AFK-এর আগে **সব অস্পষ্টতা মিটিয়ে নিন।** Grilling বা spec এখানেই কাজে আসে।
> - Agent-কে বলুন **merge না করে PR খুলতে।** সকালে আপনার হাতে সিদ্ধান্ত থাকবে।
> - Sandbox আর কড়া check ছাড়া উদার permission দেবেন না।

**সম্পর্কিত শব্দ:** [Human-in-the-loop](#human-in-the-loop--হিউম্যান-ইন-দ্য-লুপ) · [Sandbox](#sandbox--স্যান্ডবক্স) · [Automated check](#automated-check--অটোমেটেড-চেক) · [Software factory](#software-factory--সফটওয়্যার-ফ্যাক্টরি)

---

### Automated check · অটোমেটেড চেক

> [!NOTE]
> **এক কথায়:** Automated check হলো **যন্ত্রের পাস-ফেল রায়**, যেখানে কোনো মতামত নেই।
>
> **In short:** An automated check is **a deterministic pass-or-fail verification** run by a machine: tests, type checks, lint, build or a pre-commit hook.

#### ব্যাপারটা কী?

Agent কোড লিখল, কিন্তু সেটা ঠিক কিনা বুঝবে কীভাবে? আপনাকে প্রতিবার জিজ্ঞেস না করেই? উত্তর হলো automated check। এটা চালালে হয় পাস, নয় ফেল। **ফেল করলে ব্যর্থতার লেখা agent-এর context-এ ঢোকে,** আর সেটুকু পড়েই সে নিজে শুধরে আবার চালায়। এভাবে পাস না হওয়া পর্যন্ত লুপ ঘোরে, মানুষ ছাড়াই।

<figure class="diagram">
<svg viewBox="0 0 560 220" role="img" aria-label="The agent edits code, runs the check, and a pass ends the loop. A failure sends the error text back to the agent, which edits again.">
  <defs><marker id="7a-check-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="20" y="60" width="130" height="44" rx="10"/><text x="85" y="82">edit code</text>
  <rect class="node" x="215" y="60" width="130" height="44" rx="10"/><text x="280" y="82">run check</text>
  <rect class="node" x="410" y="60" width="130" height="44" rx="10"/><text x="475" y="82">pass, done</text>
  <rect class="node up" x="215" y="146" width="130" height="44" rx="10"/><text x="280" y="168">failure text</text>
  <path class="arrow" d="M152 82 L211 82" marker-end="url(#7a-check-arrow)"/>
  <path class="arrow" d="M347 82 L406 82" marker-end="url(#7a-check-arrow)"/>
  <path class="arrow" d="M280 106 L280 142" marker-end="url(#7a-check-arrow)"/>
  <path class="arrow" d="M211 160 L100 108" marker-end="url(#7a-check-arrow)"/>
  <text class="note" x="377" y="68">pass</text>
  <text class="note" x="306" y="128">fail</text>
  <text class="note" x="280" y="208">loops until it passes, no human needed</text>
</svg>
<figcaption>A failing check feeds its error back to the agent, so it fixes itself. Check ব্যর্থ হলে error agent-এর কাছে ফেরে, তাই সে নিজেই শুধরে নেয়।</figcaption>
</figure>

#### কী কী check হতে পারে

| Check | কী ধরে |
|---|---|
| Unit test | Function-এর আচরণ ভুল হলে |
| Type check | ভুল type বা নাম, ফাইল আর লাইনসহ |
| Lint | স্টাইল আর সন্দেহজনক গঠন |
| Build | কোড compile বা bundle না হলে |
| Pre-commit hook | commit-এর আগে উপরের যেকোনোটা |

#### একটা কাজ ধরে দেখি

1. Agent `getUser` function-এর return type বদলাল।
2. সে `tsc` চালাল। Output এল: `profile.ts:42 Property 'name' does not exist`।
3. ফাইল আর লাইন হাতে পেয়ে agent ঠিক জায়গায় গিয়ে ভুল ঠিক করল।
4. আবার `tsc` চালাল, এবার পাস। তারপর test চালাল, সেটাও পাস।

**খেয়াল করুন: কোনো মানুষ জড়ায়নি।** ভাঙা কোড আপনার কাছে পৌঁছানোর আগেই agent ধরে ফেলল।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Flaky test থাকলেও ক্ষতি নেই | **Flaky test মানে ভাঙা check।** Agent তখন ঠিক কোড "ঠিক" করতে বসে, নয়তো আসল ব্যর্থতা পেরিয়ে যায়। |
| সব check-ই test | Test একধরনের check মাত্র। **Type check, lint, build-ও check।** |
| সবুজ মানে কোড ঠিক | সবুজ মানে শুধু **যা assert করা হয়েছে তা ঠিক।** বাকি ফাঁক review-এর কাজ। |

**উপমা / Analogy:** ব্যাংকের টাকা গোনার মেশিন। জাল নোট হলে বিপ করে, মত দেয় না। কিন্তু **টাকাটা সঠিক মানুষের কাছে যাচ্ছে কিনা,** মেশিন জানে না। *A bank's note-counting machine beeps on a fake note, but it cannot tell whether the money is going to the right person.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent বারবার ভাঙা কোড দিলে **আগে typecheck আর lint যোগ করুন,** তারপর prompt বদলান।
> - Check **দ্রুত আর নির্ভরযোগ্য** রাখুন। ধীর বা flaky check agent-এর লুপ নষ্ট করে।
> - AFK run-এ run চলার সময় **একমাত্র যাচাই এগুলোই।**

**সম্পর্কিত শব্দ:** [Automated review](#automated-review--অটোমেটেড-রিভিউ) · [AX](#ax--এএক্স) · [Tool result](#tool-result--টুল-রেজাল্ট) · [AFK](#afk--এএফকে)

---

### Automated review · অটোমেটেড রিভিউ

> [!NOTE]
> **এক কথায়:** Automated review মানে **একটা agent আরেকটা agent-এর কাজ বিচার করে।**
>
> **In short:** Automated review is **one agent reviewing another agent's work**, often with a different model or system prompt, to catch judgement-shaped problems.

#### ব্যাপারটা কী?

Test পাস করেছে, তবু function-এর নামটা বিভ্রান্তিকর, বা একটা edge case বাদ পড়েছে। এসব **পাস-ফেলে ধরা যায় না, বিচার লাগে।** এই বিচারের কাজটা একটা আলাদা agent করে। সে নতুন context window নিয়ে diff দেখে অপরিচিতের চোখে। কারণ **যে agent কোড লিখেছে, তাকেই review করতে বললে লাভ কম।** সে নিজের যুক্তি পড়ে সেটাকেই প্রমাণ ভাবে।

#### Check বনাম review

| দিক | Automated check | Automated review |
|---|---|---|
| রায়ের ধরন | Deterministic, একই কোডে একই রায় | Non-deterministic, মত তৈরি করে |
| কী ধরে | যন্ত্রে মাপা যায় এমন ভুল | বিচারের ভুল, যেমন বিভ্রান্তিকর নাম |
| ভুল করে কি? | না, যা assert করা আছে তা ঠিকই বলে | হ্যাঁ, আসল সমস্যা এড়াতে বা অসমস্যা ধরতে পারে |
| খরচ | খুব কম | মাঝারি |

#### একটা কাজ ধরে দেখি

AFK run থেকে প্রায়ই এমন PR আসছে, যেগুলো check পাস করে কিন্তু human review-এ ধরা পড়ে।

1. Merge-এর আগে একটা review ধাপ যোগ করুন, যা **আলাদা model** দিয়ে চলে।
2. তাকে আলাদা system prompt দিন: "শুধু security আর API contract-এর বদল দেখো।"
3. Reviewer নতুন context-এ diff পড়ে comment দেয়: "এই endpoint-এ auth check বাদ পড়েছে।"
4. কাজ করা agent সেই comment দেখে ঠিক করে। তারপর PR আপনার কাছে আসে।

**খেয়াল করুন: আলাদা model আর সীমিত prompt-ই reviewer-কে ধারালো করে।** "সমস্যা খোঁজো" জাতীয় ঝাপসা নির্দেশে ফল দুর্বল হয়।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Automated review মানে test চালানো | Test হলো check। Review **বিচার করে,** তাই এটা আলাদা ধরন, CI-তে চললেও। |
| Review পাস মানে মানুষের review লাগবে না | এটা **ছাঁকনি, দরজা না।** মানুষ দেখার আগে মান উঁচু করে, মানুষের বদলি নয়। |
| "AI review" বললেই চলে | এতে বোঝা যায় না এটা কাজ করা agent থেকে **আলাদা একটা reviewer।** |

**উপমা / Analogy:** বোর্ড পরীক্ষায় দ্বিতীয় পরীক্ষক। **প্রথম পরীক্ষকের নম্বর না দেখে** খাতা আবার দেখেন। *The second examiner in a board exam marks the script without seeing the first examiner's marks.*

> [!TIP]
> **কাজে লাগান:**
>
> - Review চালান **নতুন context-এ,** যে session কোড লিখেছে সেখানে না।
> - Reviewer-কে **একটা নির্দিষ্ট বিষয়** দিন: security, API contract বা performance।
> - একে মানুষের review-এর আগের **ফিল্টার** হিসেবে রাখুন।

**সম্পর্কিত শব্দ:** [Automated check](#automated-check--অটোমেটেড-চেক) · [Human review](#human-review--হিউম্যান-রিভিউ) · [Subagent](#subagent--সাবএজেন্ট) · [AFK](#afk--এএফকে)

---

### Human review · হিউম্যান রিভিউ

> [!NOTE]
> **এক কথায়:** Human review মানে **agent-এর বানানো কোড আপনি নিজে পড়ে** বিচার করা।
>
> **In short:** Human review is **you reading the code the agent produced** and forming your own judgement, which means reading the diff, not the agent's description of it.

#### ব্যাপারটা কী?

Agent কাজ শেষে লিখল: "সব ঠিকঠাক করেছি, unused code মুছেছি।" আপনি সেটা পড়ে "ঠিক আছে" বললেন। এটা কি review হলো? **না।** Agent-এর বিবরণ লিখেছে সেই পক্ষ, যাকে review করা হচ্ছে। **আসল review হলো diff বা বদলানো ফাইল পড়া।** Agent কোডের পরিমাণ বাড়ায়, তাই review এখন সবচেয়ে ধীর ধাপ, আর সেজন্যই একে বুদ্ধি করে সাজাতে হয়।

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="Three review layers stacked top to bottom: automated check, automated review, human review. Each layer catches a different kind of problem and the cost rises going down.">
  <defs><marker id="7a-review-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="30" y="20" width="200" height="44" rx="10"/><text x="130" y="42">Automated check</text>
  <text class="start" x="260" y="42">mechanical errors</text>
  <rect class="node" x="30" y="90" width="200" height="44" rx="10"/><text x="130" y="112">Automated review</text>
  <text class="start" x="260" y="112">judgement-shaped errors</text>
  <rect class="node up" x="30" y="160" width="200" height="44" rx="10"/><text x="130" y="182">Human review</text>
  <text class="start" x="260" y="182">is it the right change?</text>
  <path class="arrow" d="M130 66 L130 88" marker-end="url(#7a-review-arrow)"/>
  <path class="arrow" d="M130 136 L130 158" marker-end="url(#7a-review-arrow)"/>
  <text class="note" x="280" y="232">cost and effort rise going down</text>
</svg>
<figcaption>Cheap layers filter first; the human judges what only a human can. সস্তা স্তর আগে ছাঁকে, মানুষ দেখে শুধু যা মানুষ ছাড়া কেউ পারে না।</figcaption>
</figure>

#### একটা কাজ ধরে দেখি

1. Agent-এর summary বলছে: "`formatDate` helper আর ব্যবহার হয় না, তাই মুছে দিয়েছি।"
2. Summary পড়েই merge করলে সবকিছু ঠিক মনে হতো। কিন্তু আপনি **diff খুললেন।**
3. দেখলেন মোছা helper-টা একটা `reports/` ফোল্ডারের generated ফাইল থেকে dynamic ভাবে call হয়।
4. আপনি agent-কে বললেন helper ফিরিয়ে দিতে, আর generated ফাইল কীভাবে বানানো হয় তা দেখতে।

**খেয়াল করুন: summary-তে এই ভুল ধরা পড়ার উপায় ছিল না।** Diff পড়াই একমাত্র পথ।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Agent-এর summary পড়লেই review হয় | Summary **secondary source।** Review মানে **primary source, অর্থাৎ diff** পড়া। |
| মানুষকে সব কিছু পড়তে হবে | স্তরে সাজান। **যান্ত্রিক ভুল ধরে check, বর্ণনাযোগ্য ভুল ধরে automated review।** মানুষ দেখে বাকিটা। |
| Review শেষে করলেই চলে | **আগে review সস্তা।** কাজ শুরুর আগে plan পড়তে মিনিট লাগে, AFK run-এর পরে পুরো branch খুঁড়তে অনেক বেশি। |

**উপমা / Analogy:** জমির দলিলে সই করার আগে নিজে পড়া। দালালের "সব ঠিক আছে" শুনে সই করা **review না।** *Reading the land deed yourself before signing, not signing on the broker's word that everything is fine.*

> [!TIP]
> **কাজে লাগান:**
>
> - **Summary না, diff পড়ুন।**
> - Review-এর জায়গাটা আগে ঠিক করুন। Plan-এর সময় আর মাঝপথের ছোট diff-এ review **সবচেয়ে সস্তা।**
> - শুধু "code review" বলবেন না। মানুষের না যন্ত্রের, সেটা **স্পষ্ট করে বলুন।**

**সম্পর্কিত শব্দ:** [Automated review](#automated-review--অটোমেটেড-রিভিউ) · [Primary source](#primary-source--প্রাইমারি-সোর্স) · [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স) · [Vibe coding](#vibe-coding--ভাইব-কোডিং)

---

### Vibe coding · ভাইব কোডিং

> [!NOTE]
> **এক কথায়:** Vibe coding মানে **কোড না পড়েই নেওয়া**, শুধু দেখা প্রোগ্রাম ঠিকঠাক চলে কিনা।
>
> **In short:** Vibe coding is **accepting the agent's code without human review** and judging only whether the program behaves.

#### ব্যাপারটা কী?

Agent একটা বদল বানাল। আপনি diff খুললেন না, শুধু অ্যাপ চালিয়ে দেখলেন সব ঠিক চলছে। **এটাই vibe coding:** ভেতরে কী আছে দেখি না, চলে কিনা দেখি। শব্দটা চালু করেন Andrej Karpathy, ২০২৫-এর শুরুতে। এখানে Automated check বা review তবুও চলতে পারে। **শব্দটা শুধু মানুষের review না থাকার কথা বলে,** কোডের মান নিয়ে কিছু বলে না।

#### কখন চলে, কখন চলে না

| কাজ | Vibe coding? | কারণ |
|---|---|---|
| Prototype বা একবারের script | চলে | ভুলের দাম কম, আয়ু ছোট |
| Internal tool | সাধারণত চলে | সীমিত ব্যবহারকারী, সহজে ঠিক করা যায় |
| Auth, payment বা সংবেদনশীল ডেটার কোড | চলে না | ভুল অদেখায় পৌঁছালে ক্ষতি বড় |
| দীর্ঘ আয়ুর শেয়ার করা codebase | ঝুঁকিপূর্ণ | না-পড়া বদল জমে যায় |

#### একটা কাজ ধরে দেখি

ধরুন দুটো কাজ: ছুটির ছবির নাম একসাথে বদলানোর script, আর login flow-এর পরিবর্তন।

1. Script-টা agent লিখল। আপনি চালিয়ে দেখলেন নামগুলো ঠিকঠাক বদলেছে। কাজ শেষ। এটা vibe coding, আর এখানে ঠিক আছে।
2. Login flow-এও agent বদল করল। আপনি লগইন করে দেখলেন কাজ করছে, তাই সরাসরি push করলেন।
3. দুই সপ্তাহ পর একটা bug খুঁজতে গিয়ে কেউ দেখল, debug log-এ ব্যবহারকারীর token ছাপা হচ্ছে।

**খেয়াল করুন: behaviour যা দেখায় না, তা অদেখায় পৌঁছে যায়।** **যেদিন প্রথম কেউ bug খুঁজবে, সেদিনই প্রথম কেউ কোডটা পড়বে।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Vibe coding মানে খারাপ মানের AI coding | শব্দটা **review-এর অবস্থান** বোঝায়, কোডের মান না। |
| Vibe coding মানে কোনো যাচাই নেই | Test আর automated review চলতে পারে। **শুধু মানুষের review নেই।** তখন ওই যাচাইগুলোই কোডের একমাত্র ফটক। |
| এটা সবসময় ভুল | **ভুলের দাম কম হলে** এটা যুক্তিসঙ্গত সমঝোতা। বিপদ বাড়ে কোডের আয়ু আর বাজির সাথে। |

**উপমা / Analogy:** পুরনো ফোন কেনার সময় শুধু চালু হয় কিনা দেখা। ভেতরে **ব্যাটারি ফুলে আছে কিনা** দেখলেন না। *Buying a used phone after only checking that it switches on, without noticing the swollen battery inside.*

> [!TIP]
> **কাজে লাগান:**
>
> - Auth, payment বা সংবেদনশীল ডেটা ছোঁয়া কোডে **কখনো vibe coding করবেন না।**
> - Vibe করলে অন্তত **automated check আর review শক্ত রাখুন,** কারণ ওগুলোই তখন একমাত্র ফটক।
> - Push-এর আগে **auth বা secret ছোঁয়া অংশের diff একবার পড়ুন।**

**সম্পর্কিত শব্দ:** [Human review](#human-review--হিউম্যান-রিভিউ) · [Automated check](#automated-check--অটোমেটেড-চেক) · [Dark factory](#dark-factory--ডার্ক-ফ্যাক্টরি) · [Software factory](#software-factory--সফটওয়্যার-ফ্যাক্টরি)

---

### Design concept · ডিজাইন কনসেপ্ট

> [!NOTE]
> **এক কথায়:** Design concept হলো **কী বানানো হচ্ছে তার সবার মাথায় একই ছবি।** কথা, নথি আর কোড এই ছবির ছায়া মাত্র।
>
> **In short:** The design concept is **the shared picture of what you are building**, held in your head and the agent's. Conversations, specs and code are only attempts to capture it.

#### ব্যাপারটা কী?

Agent হুবহু আপনার কথামতো কাজ করল, তবু ফল ভুল। **তাহলে দোষ কার?** প্রায়ই কারো না। আপনার মাথায় ছবিটা তখনো অসম্পূর্ণ ছিল। Prompt-এ আপনি শুধু ততটুকু লিখেছেন যতটুকু ভেবেছেন, বাকিটায় চুপ ছিলেন। সেই ফাঁক agent **নিজের আন্দাজে ভরেছে।** শব্দটা Fred Brooks-এর, আর মূল কথা এই: ছবিটা মাথায়, কোনো ফাইলে না।

<figure class="diagram">
<svg viewBox="0 0 560 210" role="img" aria-label="The design concept sits in the heads of the user and the agent. The conversation, the spec and the code are three assets that only approximate it.">
  <defs><marker id="7b-design-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect class="node down" x="30" y="70" width="190" height="50" rx="10"/><text x="125" y="95">Design concept</text>
  <text class="note" x="125" y="145">a picture in two heads</text>
  <path class="arrow" d="M220 95 L322 40" marker-end="url(#7b-design-arrow)"/>
  <path class="arrow" d="M220 95 L322 95" marker-end="url(#7b-design-arrow)"/>
  <path class="arrow" d="M220 95 L322 150" marker-end="url(#7b-design-arrow)"/>
  <rect class="node" x="330" y="20" width="200" height="40" rx="8"/><text x="430" y="40">conversation</text>
  <rect class="node" x="330" y="75" width="200" height="40" rx="8"/><text x="430" y="95">spec</text>
  <rect class="node" x="330" y="130" width="200" height="40" rx="8"/><text x="430" y="150">code</text>
  <text class="note" x="430" y="195">assets only approximate it</text>
</svg>
<figcaption>ছবিটা মাথায়, ফাইলগুলো শুধু তার ছায়া। The concept lives in your heads; the files only approximate it.</figcaption>
</figure>

#### ছবির ছায়াগুলো

| সম্পদ / Asset | কী ধরার চেষ্টা করে | কেন নিজে concept না |
|---|---|---|
| কথোপকথন | আলোচনায় গড়া বোঝাপড়া | কথা ঘুরে যায়, সব কথা মনে থাকে না |
| Spec বা handoff artifact | সিদ্ধান্তগুলো লিখে রাখা | লেখার পরে concept বদলালে নথি পিছিয়ে পড়ে |
| কোড | সিদ্ধান্তের চূড়ান্ত রূপ | শুধু যা বানানো হয়েছে তা দেখায়, কেন বানানো হয়েছে তা না |

#### একটা কাজ ধরে দেখি

ধরুন, লাইব্রেরি app-এ আপনি লিখলেন: *"বই ফেরতের তারিখ বাড়ানোর feature বানাও।"*

1. **Agent** feature বানাল। যতবার ইচ্ছা তারিখ বাড়ানো যায়।
2. **আপনি** দেখলেন ভুল। আপনার মাথায় ছিল সর্বোচ্চ দুইবার, আর অন্য কেউ বইটা রিজার্ভ করলে বাড়ানো বন্ধ।
3. Prompt-এ এই দুটো কথা ছিলই না, কারণ **আপনি তখনো ভেবে দেখেননি।** Agent ফাঁকে সবচেয়ে সহজ default বসিয়েছে।
4. এবার আপনি agent-এর সাথে কথা বলে নিয়ম একটা একটা করে মেটালেন: সীমা, রিজার্ভেশন, জরিমানা।
5. এখন agent আপনি জিজ্ঞেস করার আগেই বলছে, "মেয়াদ পেরোনো বইয়ের তারিখ কি বাড়ানো যাবে না?" **এটাই লক্ষণ যে ছবি মিলেছে।**

**খেয়াল করুন: spec লেখার সময় আসে ছবি মেলার পরে, আগে না।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Spec লিখে দিলেই agent আমাকে বুঝে ফেলবে | Spec ছবির ছায়া। **ছবি অসম্পূর্ণ থাকলে spec সেই ফাঁকসহই বন্দি হয়,** আর ভুলটা আরও টেকসই হয়। |
| Agent ভুল করেছে মানে সে আমার কথা শোনেনি | প্রায়ই সে ঠিক কথাই শুনেছে। **কথাটাই অসম্পূর্ণ ছিল।** কিছু বিগড়ায়নি। |
| একবার spec লিখলে সারা প্রজেক্ট নিরাপদ | শেখার সাথে concept বদলায়। **গত সপ্তাহের spec এই সপ্তাহের session-কে ভুল পথ দেখাতে পারে।** |

**উপমা / Analogy:** বিয়ের স্টেজ সাজানো। আপনি আর ডেকোরেটর যতক্ষণ একই ছবি না দেখছেন, **ডেকোরেটর নিজের পছন্দে ফুল লাগাবে।** *Until you and the decorator see the same picture, the decorator picks the flowers.*

> [!TIP]
> **কাজে লাগান:**
>
> - Agent ঠিক কথামতো লিখে ভুল করলে **আগে নিজেকে জিজ্ঞেস করুন:** আমি কি নিজেই পুরোটা ঠিক করেছিলাম?
> - ছবি মেলার আগে কথা বলুন, spec না। **না-জিজ্ঞেস করা প্রশ্নেরও agent মনমতো উত্তর দিলে** বুঝবেন ছবি মিলেছে।

**সম্পর্কিত শব্দ:** [Grilling](#grilling--গ্রিলিং) · [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) · [Spec](#spec--স্পেক) · [Prototyping](#prototyping--প্রোটোটাইপিং)

---

### Grilling · গ্রিলিং

> [!NOTE]
> **এক কথায়:** Grilling হলো **agent আপনাকে একটা একটা করে প্রশ্ন করে**, প্রতিটার সাথে নিজের সুপারিশ করা উত্তর দিয়ে, যতক্ষণ না design পরিষ্কার হয়।
>
> **In short:** Grilling is **the agent interviewing you one decision at a time**, with its own suggested answer for each, until the design is clear.

#### ব্যাপারটা কী?

দুই লাইনের prompt দিয়ে agent-কে বললেন, "এর spec লিখে দাও।" সে কি আপনার না-নেওয়া সিদ্ধান্তে এসে থামে? না। **সে নিজে একটা default বেছে লিখে দেয়।** ফলে spec দেখতে সম্পূর্ণ, কিন্তু তার ভেতরে কোনটা আপনার সিদ্ধান্ত আর কোনটা agent-এর আন্দাজ, আলাদা করা যায় না। Grilling এই নিয়ম উল্টে দেয়: **আন্দাজ না করে agent-কে জিজ্ঞেস করতেই হবে।**

#### দুই পথের তফাত

| বিষয় | সরাসরি spec চাওয়া | আগে grilling |
|---|---|---|
| ফাঁক কে ভরে | Agent, নিজের default দিয়ে | আপনি, প্রশ্নের উত্তর দিয়ে |
| আন্দাজ ধরা পড়ে | দেরিতে, review-এ বা feature বানানোর পরে | প্রশ্নের সময়, যখন ঠিক করা সস্তা |
| নথি কখন লেখা হয় | সাথে সাথে | concept স্থির হওয়ার পরে |

#### একটা কাজ ধরে দেখি

Ticket বলছে: *"ব্যবহারকারী যেন notification বন্ধ করতে পারে।"* আপনি agent-কে বললেন, কোড লেখার আগে grill করো।

1. **Agent:** "Email আর push দুটোই বন্ধ করা যাবে, নাকি আলাদা করে? আমার সুপারিশ: আলাদা।" আপনি বললেন, ঠিক আছে।
2. **Agent:** "Password reset বা security alert-ও বন্ধ করা যাবে? আমার সুপারিশ: না, ওগুলো সবসময় যাবে।" আপনি সম্মতি দিলেন।
3. **Agent:** "বন্ধ করা notification কি পরে আবার চালু করলে জমে থাকা গুলো আসবে?" আপনি ভেবে দেখলেন, আগে ভাবেননি। উত্তর: না।
4. প্রতিটা উত্তরে **concept আরেকটু পরিষ্কার হয়।** সব মিটলে তবেই agent doc লেখে।

**খেয়াল করুন: তৃতীয় প্রশ্নটাই সোনা।** Agent সেটা চুপচাপ আন্দাজ করলে আপনি জানতেও পারতেন না।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Grilling মানে agent-কে প্রশ্ন করা | উল্টো। **Agent আপনাকে প্রশ্ন করে,** আপনার উত্তরই এর ইনপুট। |
| এতে সময় নষ্ট, সরাসরি spec চাইলেই হয় | প্রশ্নে মেটানো সস্তা। **কোডে মেটানো অনেক বেশি দামি।** |
| সব প্রশ্ন কথায় মিটে যায় | যে প্রশ্নের উত্তর "দেখতে হবে", তা কথায় মেটে না। সেখানে **prototyping-এ যান।** |

**উপমা / Analogy:** বাড়ির নকশা করার আগে ইঞ্জিনিয়ার পরিবারকে প্রশ্ন করেন: কয়টা বেডরুম, নামাজের ঘর লাগবে কিনা, মেহমান কতজন আসে, বয়স্ক কেউ সিঁড়ি ভাঙতে পারেন কিনা। **নকশা আঁকার আগেই প্রশ্ন।** *Before drawing a house plan, the engineer asks the family one question at a time.*

> [!TIP]
> **কাজে লাগান:**
>
> - অস্পষ্ট ticket পেলে **কোড বা spec লেখার আগে agent-কে বলুন, আমাকে grill করো।**
> - নিজের উত্তরের সাথে "কেন" যোগ করুন। এতে পরের প্রশ্ন আরও ধারালো হয়।

**সম্পর্কিত শব্দ:** [Design concept](#design-concept--ডিজাইন-কনসেপ্ট) · [Prototyping](#prototyping--প্রোটোটাইপিং) · [Human-in-the-loop](#human-in-the-loop--হিউম্যান-ইন-দ্য-লুপ) · [Spec](#spec--স্পেক)

---

### Prototyping · প্রোটোটাইপিং

> [!NOTE]
> **এক কথায়:** Prototyping মানে **agent দিয়ে দ্রুত একটা কাঁচা সংস্করণ বানানো**, যখন শুধু কথায় প্রশ্নের উত্তর মেলে না।
>
> **In short:** Prototyping is **having the agent build a quick, rough version** when talking alone cannot answer the question.

#### ব্যাপারটা কী?

Grilling-এ প্রশ্ন চলছে, হঠাৎ এমন একটা প্রশ্ন এল যার সৎ উত্তর "জানি না, দেখতে হবে।" তখন আলোচনা শুধু **ঘুরপাক খায়।** কিছু জিনিস কথায় বোঝা যায় না: interaction কেমন লাগবে, API আসল call করা কোডে আরামের হবে কিনা, layout আসল data-র পরিমাণে টিকবে কিনা। এই অবস্থায় **agent দিয়ে জিনিসটা বানান, দেখুন, তারপর উত্তর নিয়ে আলোচনায় ফিরুন।**

#### Grilling আর Prototyping পাশাপাশি

| বিষয় | Grilling | Prototyping |
|---|---|---|
| মাধ্যম | কথা | বানানো আসল জিনিস |
| খরচ | খুব সস্তা | সস্তা, কিন্তু কথার চেয়ে বেশি |
| নিখুঁততা | কম | বেশি |
| কখন | সিদ্ধান্ত কথায় মেটে | উত্তর "দেখতে হবে" |

#### একটা কাজ ধরে দেখি

আপনার টিম তর্ক করছে: ক্রেতার অর্ডার তালিকা কি সাধারণ table-এ দেখাবেন, নাকি card-এ?

1. **আধা ঘণ্টা তর্ক** চলেছে, কেউ কাউকে বোঝাতে পারছে না।
2. আপনি agent-কে দুটোই বানাতে বললেন, একই নমুনা data দিয়ে। **কয়েক মিনিটেই দুটো তৈরি।**
3. আপনি দুটো খুলে দেখলেন। ৫০০টা অর্ডারে card ভারী লাগছে, table পরিষ্কার।
4. আরেকটু বদলাতে বললেন: table-এ ফিল্টার যোগ করো। আবার দেখলেন। **প্রতি রাউন্ডে আরেকটা সিদ্ধান্ত মিটল।**
5. সিদ্ধান্ত হলে table-টা spec-এ reference হিসেবে গেল।

**খেয়াল করুন: তর্কের উত্তর এসেছে চোখে দেখে, যুক্তি দিয়ে না।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Prototype বানানো মানে দিনের পর দিন কাজ | Agent থাকলে **যে কাজ আগে একদিন লাগত, এখন মিনিটে হয়,** তাই নিয়মিত করা যায়। |
| একবার দেখেই সিদ্ধান্ত নিতে হয় | দেখুন, বদলাতে বলুন, আবার দেখুন। **প্রতি রাউন্ডে নিখুঁততা বাড়ে।** |
| Prototype মানে সবটাই ফেলনা কাঁচা কোড | যে অংশ যাচাই করছেন তা **production মানেও বানাতে পারেন,** সিদ্ধান্ত হলে সেটাই আসল codebase-এ যায়। |

**উপমা / Analogy:** বিয়ের পুরো বিরিয়ানি রাঁধার আগে বাবুর্চি এক হাঁড়ি ছোট করে রেঁধে চাখতে দেন। **চাখার পরেই বড় হাঁড়ি চড়ে।** *Before cooking biryani for the whole wedding, the cook makes one small pot to taste.*

> [!TIP]
> **কাজে লাগান:**
>
> - তর্ক আধা ঘণ্টা পেরোলে **দুই বিকল্পই prototype করান।** পাঁচ মিনিটে উত্তর পাবেন।
> - Prototype-এর ফল spec-এ জুড়ে দিন। **দেখা জিনিস লেখা বর্ণনার চেয়ে স্পষ্ট রেফারেন্স।**

**সম্পর্কিত শব্দ:** [Grilling](#grilling--গ্রিলিং) · [Design concept](#design-concept--ডিজাইন-কনসেপ্ট) · [Spec](#spec--স্পেক) · [Human-in-the-loop](#human-in-the-loop--হিউম্যান-ইন-দ্য-লুপ)

---

### DX · ডিএক্স

> [!NOTE]
> **এক কথায়:** DX মানে developer experience, অর্থাৎ **codebase আর toolchain মানুষ developer-এর কাজ কতটা সহজ করে।**
>
> **In short:** DX, or developer experience, is **how easy a codebase and its tools make good work for human developers**.

#### ব্যাপারটা কী?

DX শব্দটা AI coding-এর অনেক আগের। এই অভিধানে আছে মূলত **AX-এর পাশে তুলনার জন্য।** ভালো DX মানে প্রথমবারেই চলা setup, দ্রুত feedback, পরিষ্কার error message আর আসল প্রশ্নের উত্তর দেওয়া docs। কিন্তু একটা প্রশ্ন ওঠে: **খারাপ DX-ওয়ালা codebase-এও মানুষ কীভাবে কাজ করে ফেলে?** কারণ মানুষ stateful। সে একবার শিখে সেটা প্রতিদিন সাথে রাখে।

#### ভালো DX-এর উপাদান

| উপাদান | মানে কী | তার অভাবে মানুষ কী করে |
|---|---|---|
| দ্রুত feedback | কোড বদলের ফল দ্রুত দেখা যায় | ধীর CI এড়াতে push জমিয়ে রাখে |
| পরিষ্কার error | কী ভুল হয়েছে বোঝা যায় | কাউকে জিজ্ঞেস করে, বা একবার বুঝে মনে রাখে |
| কাজের docs | দরকারি প্রশ্নের উত্তর আছে | সহকর্মীর কাছে একবার জেনে নেয় |
| সহজ setup | প্রথমবারেই চলে | একবার ঝামেলা সেরে আর ছোঁয় না |

#### একটা উদাহরণ

আপনার টিম লিড বললেন: "আমাদের DX দারুণ, নতুন লোক এক সপ্তাহেই productive।" কথাটা ঠিক, কিন্তু কারণ হলো **সেই সপ্তাহে কেউ পাশে বসে** বলে দেয় কোন script চালাতে হবে, কোন ফোল্ডারে কী আছে। সময়ের সাথে নতুন লোক সব মনে রাখে। Agent মনে রাখে না। সে প্রতি session-এ codebase আবার শুরু থেকে শেখে। **তাই মানুষের জন্য ভালো DX মানেই agent-এর জন্য ভালো না।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| DX ভালো মানে agent-ও ভালো কাজ করবে | মানুষ **stateful,** agent **stateless।** মানুষের সহ্য করা সমস্যা agent-এর পথ আটকায়। |
| ভালো onboarding doc agent-কেও শেখাবে | **AGENTS.md থেকে সেখানে পৌঁছানো না গেলে** agent doc-টা দেখেই না। |
| DX আর AX-এর কিছুই মেলে না | কড়া type, দ্রুত test আর অনুমানযোগ্য structure **দুই পক্ষকেই সাহায্য করে।** |

**উপমা / Analogy:** স্থায়ী কর্মীর অফিস। প্রথম সপ্তাহে কেউ পাশে বসে দেখিয়ে দেয় কোন আলমারিতে কী। **তারপর সে নিজেই জানে।** *A permanent employee: someone shows them around in the first week, and after that they just know.*

> [!TIP]
> **কাজে লাগান:**
>
> - "নতুন লোক এক সপ্তাহে শিখে যায়" শুনে **ধরে নেবেন না agent-ও পারবে।** AX আলাদা করে দেখুন।
> - DX-এ বিনিয়োগ প্রায়ই AX-ও বাড়ায়, বিশেষ করে **type আর দ্রুত test-এ।**

**সম্পর্কিত শব্দ:** [AX](#ax--এএক্স) · [Stateful](#stateful--স্টেটফুল) · [Stateless](#stateless--স্টেটলেস) · [AGENTS.md](#agentsmd--এজেন্টসএমডি)

---

### AX · এএক্স

> [!NOTE]
> **এক কথায়:** AX মানে agent experience, অর্থাৎ **environment agent-কে ভালো কাজ করতে কতটা সাহায্য করে।**
>
> **In short:** AX, or agent experience, is **how well the environment is set up for an agent to do good work**.

#### ব্যাপারটা কী?

একই model, একই harness, তবু agent এক repo-তে চমৎকার আর অন্যটায় এলোমেলো। **তাহলে কি model খারাপ?** সাধারণত না। পার্থক্যটা AX। মানুষ stateful, তাই সে মুখে-মুখে জ্ঞান আর "অমুক ভাইকে জিজ্ঞেস করো" সহ্য করে নেয়। **Agent পারে না।** সে environment দেখে শুধু tool result দিয়ে, তাই তার লাগে tool result-এ লেখা ব্যর্থতা, IDE tooltip বা সুন্দর dashboard না।

#### ভালো AX-এর তিন দিক

| দিক | ভালো AX দেখতে কেমন |
|---|---|
| Automated check | দ্রুত, deterministic check (type, test, lint), যা থেকে agent মানুষ ছাড়াই নিজে শুধরাতে পারে |
| গঠন / Architecture | সব না পড়েও ঘোরা যায়: অনুমানযোগ্য structure, ছোট interface-এর পেছনে অনেক behaviour, নাম যা বলে জিনিসটা কী করে |
| খালি context | AGENTS.md, skill আর tool ছোট রাখা, যাতে context window-এর বেশিরভাগ কাজের জন্য খালি থাকে |

#### একটা কাজ ধরে দেখি

একই Claude দুটো repo-তে কাজ করছে: একটা API, একটা frontend।

1. **API repo:** কড়া type আছে, test কয়েক সেকেন্ডে চলে। Agent কোড বদলায়, test চালায়, ব্যর্থতা পড়ে নিজে ঠিক করে।
2. **Frontend repo:** type ঢিলা, test নেই বললেই চলে। উল্টে চল্লিশটা skill সবসময় লোড হয়ে context-এর বড় অংশ দখল করে রাখে।
3. Agent frontend-এ ভুল করে, আর কেউ বলার নেই যে ভুল।
4. আপনি prompt নতুন করে লিখলেন। ফল আসলে বদলাল না।
5. তারপর repo ঠিক করলেন: type কড়া করলেন, fast test যোগ করলেন, অপ্রয়োজনীয় skill সরালেন। **এবার agent-এর কোড ভালো হলো।**

**খেয়াল করুন: সমাধান ছিল repo-তে, prompt-এ না।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| AX আর DX একই জিনিস | দর্শক আলাদা, তাই **বিনিয়োগও আলাদা।** DX ভালো আর AX খারাপ, এটা পুরোপুরি সম্ভব। |
| Agent খারাপ করলে prompt বদলান | **আগে repo দেখুন:** check, structure আর context-এর বোঝা। |
| Agent-কে সুন্দর dashboard দেখালে সুবিধা হয় | Agent-এর **লেখা আকারের ব্যর্থতা দরকার,** ছবি বা tooltip কাজে আসে না। |

**উপমা / Analogy:** একই অফিস, কিন্তু প্রতিদিন নতুন একজন দিনমজুর আসে। তার জন্য দরকার প্রতিটা আলমারিতে **পরিষ্কার লেবেল আর দেয়ালে নির্দেশনা,** কারণ কালকের কেউ তাকে কিছু শেখাবে না। *A new day-labourer arrives every day and needs clear labels on every cupboard.*

> [!TIP]
> **কাজে লাগান:**
>
> - Claude খারাপ করলে **prompt বদলানোর আগে** repo-র test, type আর structure দেখুন।
> - AGENTS.md আর skill ছোট রাখুন। **Context window যত খালি, agent তত ভালো থাকে।**

**সম্পর্কিত শব্দ:** [DX](#dx--ডিএক্স) · [Automated check](#automated-check--অটোমেটেড-চেক) · [Smart zone](#smart-zone--স্মার্ট-জোন) · [Harness](#harness--হার্নেস)

---

### Software factory · সফটওয়্যার ফ্যাক্টরি

> [!NOTE]
> **এক কথায়:** Software factory এমন ব্যবস্থা, যেখানে **মানুষ না, ঘটনা (trigger) agent session চালু করে।**
>
> **In short:** A software factory is a setup where **events, not people, start the agent sessions**.

#### ব্যাপারটা কী?

AFK কাজ করলে agent একা চলে, কিন্তু **session শুরু করে দিতে তো একজন মানুষ লাগে।** কেউ session খুলবে, ticket দেখাবে, চালু করবে। Factory এই শেষ বাঁধনটাও খোলে। কোনো ঘটনা ঘটলেই session নিজে শুরু হয়। মানুষ সরে শুধু শুরু করার কাজ থেকে। **Review, plan অনুমোদন বা সিদ্ধান্ত থেকে মানুষ সরে না,** যদি আপনি না চান।

#### সাধারণ trigger আর তার কাজ

| ঘটনা / Trigger | কোন session শুরু হয় | উদাহরণ |
|---|---|---|
| Issue তৈরি বা label | খোঁজা, bug ঠিক, বানানো | `ready-for-agent` label পড়লে PR খোলা session চালু |
| সময়সূচি (cron) | নিয়মিত রক্ষণাবেক্ষণ | প্রতি রাতে একটা lint rule ঠিক করা |
| CI ব্যর্থতা বা alert | কারণ খোঁজা, সারানোর চেষ্টা | main-এ build ভাঙলে ভাঙা commit খুঁজে সমাধান প্রস্তাব |
| আরেক session শেষ | পরবর্তী কাজ | এক agent-এর PR automated review চালায়, তার comment fix-up session চালায় |

#### একটা কাজ ধরে দেখি

আপনার repo-তে হাজারখানেক পুরনো `console.log`। আপনি একটা ছোট factory বানালেন:

1. **রাত ২টায় cron** একটা session চালু করে। সে একটা মডিউল বেছে সেখানকার `console.log` সরায়।
2. Session শেষে **একটা ছোট PR** খোলে।
3. PR খোলা মানেই automated review চালু। Reviewer কিছু আপত্তি লেখে।
4. সেই comment পেয়ে **আরেকটা fix-up session** শুরু হয় আর PR ঠিক করে।
5. সকালে আপনি শুধু PR পড়েন আর merge করেন।

**খেয়াল করুন: এতে পুরো factory মাত্র একটা cron job আর একরকম session,** তবু এটা পুরোপুরি factory।

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Factory মানে পুরো software process যন্ত্রে | **একটা cron job আর একটা review-যোগ্য PR-ই factory।** পুরোটা ঢাকতে হবে না। |
| Factory মানে মানুষ বাদ | মানুষ শুধু **শুরু করার কাজ** থেকে সরে। Issue লেখা, plan অনুমোদন, merge-এর আগে review, সবই মানুষের হাতে রাখা যায়। |
| প্রথমেই বড় করে বানানো ভালো | **ছোট থেকে শুরু করুন।** সংকীর্ণ লুপের PR দেখে বোঝা যায় লুপ বড় করার আগে তাকে কতটা বিশ্বাস করা যায়। |

**উপমা / Analogy:** গার্মেন্টস কারখানা। **Buyer-এর অর্ডার এলেই লাইন চালু হয়,** কাউকে আলাদা করে বলতে হয় না। তবে QC-তে মানুষ থাকতে পারে। *A garment factory: a buyer's order starts the line automatically, while humans can still sit at quality control.*

> [!TIP]
> **কাজে লাগান:**
>
> - **একটা cron job আর একটা review-যোগ্য PR দিয়ে শুরু করুন,** তারপর ধাপে ধাপে বাড়ান।
> - নিজেকে জিজ্ঞেস করুন: **কোন সিদ্ধান্তটা মানুষের হাতে থাকবে?** এটাই factory-র প্রধান design প্রশ্ন।

**সম্পর্কিত শব্দ:** [AFK](#afk--এএফকে) · [Dark factory](#dark-factory--ডার্ক-ফ্যাক্টরি) · [Automated review](#automated-review--অটোমেটেড-রিভিউ) · [Human review](#human-review--হিউম্যান-রিভিউ)

---

### Dark factory · ডার্ক ফ্যাক্টরি

> [!NOTE]
> **এক কথায়:** Dark factory এমন codebase বা তার অংশ, যেখানে **factory কোড লেখে আর কোনো মানুষ তা পড়ে না।** "Lights-out" কারখানার মতো, মেঝেতে কেউ নেই।
>
> **In short:** A dark factory is a codebase, or part of one, where **a software factory writes the code and no human reads it**.

#### ব্যাপারটা কী?

Software factory-তে মানুষ session শুরু করা থেকে সরে, কিন্তু PR-টা এখনো পড়ে। **Dark factory-তে সেই পড়াটাও বন্ধ।** মানুষ কাজ শুরুর issue লিখতে পারে, কিন্তু যে কোড বেরোয় তা কেউ review করে না। নামটা এসেছে lights-out কারখানা থেকে, যেখানে আলো নেভানো মেঝেতে যন্ত্র একাই কাজ করে। এটাকে ভাবুন **পুরো একটা এলাকার জন্য vibe coding।**

#### Software factory বনাম Dark factory

| বিষয় | Software factory | Dark factory |
|---|---|---|
| Session শুরু করে | ঘটনা (trigger) | ঘটনা (trigger) |
| বেরোনো কোড পড়ে | মানুষ PR review করে | **কেউ না** |
| ফটক | check, review আর মানুষ | শুধু **automated check আর automated review** |
| ভুল ধরা পড়ে | review-এর সময় | যখন কিছু ভাঙে |

#### একটা কাজ ধরে দেখি

ধরুন, একটা notification সার্ভিস dark factory হিসেবে চলছে। CI পাস করলেই agent-এর PR নিজে merge হয়।

1. কয়েক মাসে **শত শত ছোট বদল** merge হয়েছে। কোনোটাই কেউ পড়েনি।
2. একদিন ব্যবহারকারীরা একই email তিনবার পাচ্ছেন।
3. আপনি খুঁজতে বসলেন কী বদলেছে। **কিন্তু দলের কেউ ওই কোড কখনো পড়েনি।**
4. কারণ শত বদলের যেকোনোটায় থাকতে পারে। **প্রতিটাই check আর automated review পাস করেছিল।**
5. তাই আপনাকে অচেনা কোড debug করতে হচ্ছে, আর কোন বদল কেন এল তার কোনো মানুষের স্মৃতি নেই।

**খেয়াল করুন: সমস্যা ঢুকেছিল সেই দুটো ফটক দিয়েই, যেগুলো ধরতে পারেনি।**

#### ভুল ধারণা বনাম আসল কথা

| ভুল ধারণা | আসল কথা |
|---|---|
| Factory কেউ দেখছে না, তাই codebase "dark" | Agent AFK চলে আর **মানুষ PR review করে,** তাহলে সেটা software factory, dark factory না। |
| Dark factory আর vibe coding একই | Vibe coding-এ আপনি জেনেশুনে একটা বদল না পড়েন। Dark factory-তে দল **একবারেই পুরো এলাকার জন্য** সেই সিদ্ধান্ত নেয়। |
| Check পাস করলে সব ঠিক | Check আর review যা ধরতে পারে না, তা **সোজা কোডে ঢোকে।** |

**উপমা / Analogy:** এমন গার্মেন্টস লাইন যেখানে কোনো QC কর্মী নেই, শুধু মেশিন মাপ মেলায়। **সেলাই উল্টো হলে buyer-এর কাছে গিয়ে ধরা পড়ে।** *A garment line with no QC staff, only machines checking measurements: a reversed seam gets found by the buyer.*

> [!TIP]
> **কাজে লাগান:**
>
> - Payment বা রোগীর তথ্যের মতো স্পর্শকাতর কোডে **dark factory এড়িয়ে চলুন,** মানুষের review রাখুন।
> - Dark factory করতেই হলে **অল্প ঝুঁকির এলাকা বেছে নিন,** আর check ও review-র ফটক শক্ত করুন।

**সম্পর্কিত শব্দ:** [Software factory](#software-factory--সফটওয়্যার-ফ্যাক্টরি) · [Vibe coding](#vibe-coding--ভাইব-কোডিং) · [Automated check](#automated-check--অটোমেটেড-চেক) · [Human review](#human-review--হিউম্যান-রিভিউ)

---

## Which term for which problem · কোন সমস্যায় কোন শব্দ

| What you see / যা দেখছেন | The term | What to do / কী করবেন |
|---|---|---|
| Good answer today, bad answer tomorrow for the same prompt / একই প্রশ্নে আজ ভালো, কাল খারাপ | Non-determinism | Retry, and let tests decide / আবার চালান, test দিয়ে যাচাই করুন |
| It calls a function that does not exist / নেই এমন function বানাল | Hallucination | Put the real docs in context / আসল docs context-এ দিন |
| It ignores something already in the chat / chat-এ থাকা কথা ভুলে গেল | Attention degradation | `/clear` or `/compact` |
| It writes old syntax for a library / পুরনো version-এর syntax লিখছে | Knowledge cutoff | Show it the changelog or types / changelog বা type পড়ান |
| It flips its answer when you ask "are you sure?" / "নিশ্চিত?" বলতেই মত বদলাল | Sycophancy | Ask neutrally, hide your opinion / নিরপেক্ষ প্রশ্ন করুন |
| A long session got sloppy / লম্বা session-এ ঢিলা হয়ে গেছে | Smart zone | One task per session / এক session-এ এক কাজ |
| It forgot what you taught it yesterday / কালকের শেখানো আজ ভুলে গেছে | Stateless | Write it in `CLAUDE.md` / ফাইলে লিখে রাখুন |
| A big bill, but little code written / বিল বেশি, কাজ কম | Input tokens, cache tokens | Clear often, keep the prefix stable / cache ভাঙছে কিনা দেখুন |
| It lost an earlier decision mid-task / মাঝপথে আগের সিদ্ধান্ত ভুলে গেল | Autocompact | Keep decisions in a plan file / সিদ্ধান্ত plan ফাইলে রাখুন |
| It built exactly what you said, and it is still wrong / কথামতো বানাল, তবু ভুল | Design concept | Get grilled with questions first / আগে প্রশ্ন-উত্তরে ছবি মেলান |
| Talking is not settling a decision / কথায় সিদ্ধান্ত হচ্ছে না | Prototyping | Build a small throwaway version / ছোট করে বানিয়ে দেখুন |
| Great in one repo, poor in another / এক repo-তে ভালো, অন্যটায় খারাপ | AX | Improve tests, types and structure / test, type, structure ঠিক করুন |
| You came back from AFK to work built on a wrong idea / AFK থেকে ফিরে দেখলেন ভিত্তিই ভুল | AFK | Align first, review the PR last / আগে মিলিয়ে নিন, শেষে PR পড়ুন |

## Quick lookup · দ্রুত খোঁজা

| Term | বাংলায় এক লাইনে | Section |
|---|---|---|
| [AI](#ai--এআই) | নতুন যা পারে তার চলমান নাম | The model |
| [Model](#model--মডেল) | শুধু token আন্দাজ করার যন্ত্র | The model |
| [Parameters](#parameters--প্যারামিটার) | model-এর ভেতরের জমে থাকা সংখ্যা | The model |
| [Training](#training--ট্রেনিং) | model বানানোর একবারের দামি কাজ | The model |
| [Inference](#inference--ইনফারেন্স) | model ব্যবহার করা, প্রতিবার বিল | The model |
| [Effort](#effort--এফর্ট) | উত্তরের আগে কতক্ষণ ভাববে | The model |
| [Token](#token--টোকেন) | model-এর পড়া-লেখার একক | The model |
| [Next-token prediction](#next-token-prediction--নেক্সট-টোকেন-প্রেডিকশন) | পরের token আন্দাজ, model-এর একমাত্র কাজ | The model |
| [Non-determinism](#non-determinism--নন-ডিটারমিনিজম) | একই প্রশ্নে আলাদা উত্তর | The model |
| [Model provider](#model-provider--মডেল-প্রোভাইডার) | যার server-এ model চলে | The model |
| [Harness](#harness--হার্নেস) | model-এর চারপাশের সব, যেমন Claude Code | The model |
| [Model provider request](#model-provider-request--মডেল-প্রোভাইডার-রিকোয়েস্ট) | provider-এ একবার যাওয়া-আসা | The model |
| [Input tokens](#input-tokens--ইনপুট-টোকেন) | model-কে পাঠানো সব লেখা | The model |
| [Output tokens](#output-tokens--আউটপুট-টোকেন) | model-এর লেখা, প্রায় পাঁচ গুণ দামি | The model |
| [Prefix cache](#prefix-cache--প্রিফিক্স-ক্যাশ) | মিলে যাওয়া শুরুর অংশ মনে রাখা | The model |
| [Cache tokens](#cache-tokens--ক্যাশ-টোকেন) | cache থেকে আসা সস্তা input | The model |
| [Stateless](#stateless--স্টেটলেস) | কিছু মনে রাখে না | Sessions, context and turns |
| [Context](#context--কনটেক্সট) | কাজের জন্য দরকারি তথ্য | Sessions, context and turns |
| [Context window](#context-window--কনটেক্সট-উইন্ডো) | প্রতি request-এ model যা দেখে | Sessions, context and turns |
| [Stateful](#stateful--স্টেটফুল) | তথ্য সামনে বয়ে নেয় | Sessions, context and turns |
| [Agent](#agent--এজেন্ট) | model আর harness মিলে কর্মী | Sessions, context and turns |
| [System prompt](#system-prompt--সিস্টেম-প্রম্পট) | প্রতি request-এর শুরুর স্থায়ী নির্দেশ | Sessions, context and turns |
| [Session](#session--সেশন) | একবারের পুরো বসা | Sessions, context and turns |
| [Turn](#turn--টার্ন) | একটা message আর তার পুরো উত্তর | Sessions, context and turns |
| [Environment](#environment--এনভায়রনমেন্ট) | agent যেখানে কাজ করে | Tools and environment |
| [Filesystem](#filesystem--ফাইলসিস্টেম) | ফাইল আর ফোল্ডারের গাছ | Tools and environment |
| [Tool](#tool--টুল) | agent-এর হাত-পা | Tools and environment |
| [Tool call](#tool-call--টুল-কল) | tool চালানোর লেখা অনুরোধ | Tools and environment |
| [Tool result](#tool-result--টুল-রেজাল্ট) | tool থেকে ফেরত আসা ফল | Tools and environment |
| [MCP](#mcp--এমসিপি) | বাইরের tool জোড়ার মান | Tools and environment |
| [Permission request](#permission-request--পারমিশন-রিকোয়েস্ট) | কাজের আগে অনুমতি চাওয়া | Tools and environment |
| [Permission mode](#permission-mode--পারমিশন-মোড) | কোন কাজে অনুমতি লাগবে তার নিয়ম | Tools and environment |
| [Agent mode](#agent-mode--এজেন্ট-মোড) | permission আর আচরণ একসাথে | Tools and environment |
| [Sandbox](#sandbox--স্যান্ডবক্স) | বেড়া দেওয়া নিরাপদ জায়গা | Tools and environment |
| [Sycophancy](#sycophancy--সাইকোফ্যান্সি) | তোষামোদ | Failure modes |
| [Hallucination](#hallucination--হ্যালুসিনেশন) | আত্মবিশ্বাসী ভুল | Failure modes |
| [Parametric knowledge](#parametric-knowledge--প্যারামেট্রিক-নলেজ) | মুখস্থ জ্ঞান | Failure modes |
| [Knowledge cutoff](#knowledge-cutoff--নলেজ-কাটঅফ) | যে তারিখের পরে কিছু জানে না | Failure modes |
| [Contextual knowledge](#contextual-knowledge--কনটেক্সচুয়াল-নলেজ) | চোখের সামনে থেকে পড়া জ্ঞান | Failure modes |
| [Attention relationship](#attention-relationship--অ্যাটেনশন-রিলেশনশিপ) | দুই token-এর মধ্যের টান | Failure modes |
| [Attention budget](#attention-budget--অ্যাটেনশন-বাজেট) | প্রতি token-এর নির্দিষ্ট মনোযোগ | Failure modes |
| [Attention degradation](#attention-degradation--অ্যাটেনশন-ডিগ্রেডেশন) | context বাড়লে মনোযোগ পাতলা | Failure modes |
| [Smart zone](#smart-zone--স্মার্ট-জোন) | তীক্ষ্ণ শুরু, ঢিলা শেষ | Failure modes |
| [Clearing](#clearing--ক্লিয়ারিং) | নতুন পাতা, সব মুছে শুরু | Handoffs |
| [Handoff](#handoff--হ্যান্ডঅফ) | এক session থেকে আরেকটায় জ্ঞান পাঠানো | Handoffs |
| [Primary source](#primary-source--প্রাইমারি-সোর্স) | আসল জিনিস | Handoffs |
| [Secondary source](#secondary-source--সেকেন্ডারি-সোর্স) | আসল জিনিসের বর্ণনা | Handoffs |
| [Handoff artifact](#handoff-artifact--হ্যান্ডঅফ-আর্টিফ্যাক্ট) | পরের session-এর জন্য লেখা ফাইল | Handoffs |
| [Spec](#spec--স্পেক) | বড় কাজের মূল দলিল | Handoffs |
| [Ticket](#ticket--টিকিট) | এক session-এর কাজ | Handoffs |
| [Compaction](#compaction--কমপ্যাকশন) | সারাংশ দিয়ে নতুন session | Handoffs |
| [Autocompact](#autocompact--অটোকমপ্যাক্ট) | নিজে থেকে হওয়া compaction | Handoffs |
| [Memory system](#memory-system--মেমোরি-সিস্টেম) | session পেরিয়ে মনে রাখার ব্যবস্থা | Memory and steering |
| [AGENTS.md](#agentsmd--এজেন্টসএমডি) | প্রতি session-এর স্থায়ী নির্দেশ ফাইল | Memory and steering |
| [Progressive disclosure](#progressive-disclosure--প্রগ্রেসিভ-ডিসক্লোজার) | যখন দরকার তখন দেখানো | Memory and steering |
| [Context pointer](#context-pointer--কনটেক্সট-পয়েন্টার) | "বিস্তারিত অমুক ফাইলে" লাইন | Memory and steering |
| [Skill](#skill--স্কিল) | একটা কাজের নির্দেশনার প্যাকেট | Memory and steering |
| [Subagent](#subagent--সাবএজেন্ট) | আলাদা context-এ পাঠানো সহকারী | Memory and steering |
| [Human-in-the-loop](#human-in-the-loop--হিউম্যান-ইন-দ্য-লুপ) | পাশে বসে দেখা | Patterns of work |
| [AFK](#afk--এএফকে) | কাজ দিয়ে চলে যাওয়া | Patterns of work |
| [Automated check](#automated-check--অটোমেটেড-চেক) | যন্ত্রের পাস-ফেল পরীক্ষা | Patterns of work |
| [Automated review](#automated-review--অটোমেটেড-রিভিউ) | আরেক agent-এর review | Patterns of work |
| [Human review](#human-review--হিউম্যান-রিভিউ) | নিজে diff পড়া | Patterns of work |
| [Vibe coding](#vibe-coding--ভাইব-কোডিং) | না পড়ে মেনে নেওয়া | Patterns of work |
| [Design concept](#design-concept--ডিজাইন-কনসেপ্ট) | মিলিত মানসিক ছবি | Patterns of work |
| [Grilling](#grilling--গ্রিলিং) | একটা একটা প্রশ্নে ছবি মেলানো | Patterns of work |
| [Prototyping](#prototyping--প্রোটোটাইপিং) | ছোট করে বানিয়ে দেখা | Patterns of work |
| [DX](#dx--ডিএক্স) | মানুষের জন্য codebase-এর আরাম | Patterns of work |
| [AX](#ax--এএক্স) | agent-এর জন্য codebase-এর উপযোগিতা | Patterns of work |
| [Software factory](#software-factory--সফটওয়্যার-ফ্যাক্টরি) | ঘটনা দেখে নিজে শুরু হওয়া কাজ | Patterns of work |
| [Dark factory](#dark-factory--ডার্ক-ফ্যাক্টরি) | যে কোড কোনো মানুষ পড়ে না | Patterns of work |

## The short version · সারসংক্ষেপ

- **A model remembers nothing.** Whatever must last, write it in a file. **যা টিকিয়ে রাখতে চান, ফাইলে লিখুন।**
- **Context is everything.** More context means more cost and less sharpness. **বেশি context মানে বেশি খরচ, কম বুদ্ধি।**
- **Know the failure:** if it did not know, add context. If it forgot, cut context. **জানে না হলে যোগ করুন, ভুলে গেলে কমান।**
- **One session, one task.** Split big work into a spec and tickets. **বড় কাজ spec আর ticket-এ ভাগ করুন।**
- **Let machines check and agents review, but the last call is yours:** read the diff. **শেষ সিদ্ধান্ত আপনার, diff পড়ুন।**

---

**Credits:** the list of terms and their order follow Matt Pocock's [Dictionary of AI Coding](https://github.com/mattpocock/dictionary-of-ai-coding). The explanations, analogies and diagrams on this page are my own. Read his original for his full reasoning and examples.
