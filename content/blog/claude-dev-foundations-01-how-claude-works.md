---
title: "Claude Dev Foundations #01: How Claude Works"
excerpt: "Tokens, the context window, sampling and model choice, the four ideas behind every Claude API call, in Bangla and English, with diagrams, HaatBot code and quick quizzes."
date: "2026-11-25"
category: "Guide"
tags: ["Claude Dev Foundations","Claude","CCDV-F","Tokens","Bangla"]
published: true
---
This is post #01 of **Claude Dev Foundations**, a series that follows Anthropic's Claude Certified Developer Foundations prep path, one part at a time. It covers Course 1, MSO Foundations. **Every Claude API call rests on four ideas: tokens, a fixed context budget, sampling, and the model and effort you pick.** Get these right and cost, limits and odd replies stop being a surprise.

এটা **Claude Dev Foundations** series-এর প্রথম post। Series-টা Anthropic-এর Claude Certified Developer Foundations prep path ধরে ধাপে ধাপে চলবে। এই post Course 1, MSO Foundations নিয়ে। **Claude-এর প্রতিটা API call চারটা ধারণার উপর দাঁড়িয়ে: token, নির্দিষ্ট context বাজেট, sampling, আর আপনি কোন model ও effort বাছেন।** এই চারটা ঠিকমতো বুঝলে খরচ, limit আর অদ্ভুত উত্তর আর অবাক করবে না।

Token আর context window-এর একদম গোড়ার কথা আগের post [Inside the Chat Box](/blog/inside-the-chat-box)-এ আছে। এখানে আমরা সেগুলো **একজন developer আর পরীক্ষার্থীর চোখে** দেখব: API-তে কী গোনা হয়, কোথায় টাকা যায়, আর পরীক্ষায় কোথায় ফাঁদ।

<div class="roadmap">
<a href="#1-tokens--claude-যেভাবে-গোনে"><b>01</b>Tokens<small>Claude যেভাবে গোনে</small></a>
<a href="#2-context-window--নির্দিষ্ট-বাজেট"><b>02</b>Context Window<small>নির্দিষ্ট বাজেট</small></a>
<a href="#3-sampling--একই-প্রশ্ন-ভিন্ন-উত্তর"><b>03</b>Sampling<small>একই প্রশ্ন, ভিন্ন উত্তর</small></a>
<a href="#4-models-and-thinking--model-বাছাই-বনাম-thinking"><b>04</b>Models and Thinking<small>Model বাছাই বনাম thinking</small></a>
</div>

<figure class="diagram">
<svg viewBox="0 0 560 200" role="img" aria-label="The four chapters as one flow: a customer complaint becomes tokens, the tokens fill the context window, the chosen model and effort shape sampling, and sampling writes the reply">
<defs><marker id="cdf01-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node skip" x="20" y="20" width="130" height="50" rx="10"/><text x="85" y="45">complaint</text>
<rect class="node down" x="195" y="20" width="130" height="50" rx="10"/><text x="260" y="45">1 tokens</text>
<rect class="node" x="360" y="20" width="180" height="50" rx="10"/><text x="450" y="45">2 context window</text>
<rect class="node" x="20" y="130" width="170" height="50" rx="10"/><text x="105" y="155">4 model + effort</text>
<rect class="node up" x="230" y="130" width="130" height="50" rx="10"/><text x="295" y="155">3 sampling</text>
<rect class="node up" x="400" y="130" width="140" height="50" rx="10"/><text x="470" y="155">reply</text>
<path class="arrow" d="M150 45 L193 45" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M325 45 L358 45" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M450 70 L450 100 L295 100 L295 128" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M190 155 L228 155" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M360 155 L398 155" marker-end="url(#cdf01-arrow)"/>
</svg>
<figcaption>A customer's message travels through all four ideas before HaatBot replies. HaatBot উত্তর দেওয়ার আগে customer-এর message এই চারটা ধাপ পার হয়।</figcaption>
</figure>

> [!NOTE]
> **কীভাবে পড়বেন:** প্রতিটা chapter বাংলায় বোঝানো। প্রতিটা অংশের শেষে এক লাইনের *In English* সারাংশ আছে। Chapter-এর শেষে ছোট quiz আছে, উত্তর দেখতে প্রশ্নে click করুন।

> [!IMPORTANT]
> **পুরো series জুড়ে আমরা একটা project বানাব: HaatBot।** Haat হলো ঢাকার একটা কাল্পনিক online grocery shop। HaatBot তার support bot। Customer বাংলা, English আর Banglish মিশিয়ে লেখে: order কোথায়, delivery কবে, bKash-এ refund কবে। সব code Python-এ, official `anthropic` SDK দিয়ে।

## 1. Tokens · Claude যেভাবে গোনে

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** API-তে ঠিক কী কী token হিসেবে গোনা হয়, input আর output token-এর দাম কেন আলাদা, আর পাঠানোর আগেই `count_tokens` দিয়ে কীভাবে গুনে নেওয়া যায়।
>
> **In short:** Tokens are the unit Claude reads, writes and bills in. Everything you send counts as input, everything Claude writes (thinking included) counts as output, and you can count the input for free before you send it.

### Token হলো খুচরা পয়সা · Tokens are the unit of everything

মুদি দোকানে বিল মেটানোর কথা ভাবুন। আপনি পুরো ব্যাগের দাম একবারে দেন না। দোকানদার **জিনিস ধরে ধরে গোনে**, আর আপনি কয়েন আর ছোট নোট মিলিয়ে দেন।

Claude-ও লেখাকে এভাবে ছোট ছোট টুকরোয় ভাঙে। এই টুকরোর নাম **token**। Claude token পড়ে, token লেখে, আর **API-র বিল হয় token হিসেবে**, শব্দ বা অক্ষর হিসেবে না। Context window-এর সীমা, rate limit, সবই token-এ মাপা।

তুলনাটা এক জায়গায় থেমে যায়। একটা কয়েনের দাম নির্দিষ্ট। কিন্তু **একটা token-এ কয়টা অক্ষর থাকবে, তা নির্দিষ্ট না।** চেনা ইংরেজি শব্দ প্রায়ই এক token। কম চেনা শব্দ, বাংলা যুক্তাক্ষর বা code কয়েক token-এ ভাঙে। লেখা কীভাবে token-এ ভাঙে, সেটা [Inside the Chat Box-এর Tokens chapter](/blog/inside-the-chat-box#2-tokens--মডেল-যেভাবে-পড়ে)-এ ধাপে ধাপে দেখানো আছে।

একটা মোটা হিসাব মাথায় রাখুন: Claude-এর এখনকার tokenizer-এ **1M token মোটামুটি ৫ লাখ ৫৫ হাজার শব্দ**, বা প্রায় ২৫ লাখ Unicode অক্ষর।

*In English: tokens are the pieces Claude reads, writes and bills in, and a token has no fixed number of letters.*

### কী কী গোনা হয় · What counts as tokens

অনেকে ভাবেন শুধু user-এর প্রশ্নটাই গোনা হয়। আসলে **request-এ যা পাঠান, সবই input token**:

<figure class="diagram">
<svg viewBox="0 0 560 225" role="img" aria-label="System prompt, tool definitions, messages, and images or PDFs all add up to input tokens. The reply and Claude's thinking add up to output tokens">
<rect class="node down" x="20" y="15" width="170" height="34" rx="8"/><text x="105" y="32">system prompt</text>
<rect class="node down" x="20" y="57" width="170" height="34" rx="8"/><text x="105" y="74">tool definitions</text>
<rect class="node down" x="20" y="99" width="170" height="34" rx="8"/><text x="105" y="116">messages</text>
<rect class="node down" x="20" y="141" width="170" height="34" rx="8"/><text x="105" y="158">images, PDFs</text>
<rect class="node" x="250" y="60" width="140" height="50" rx="10"/><text x="320" y="85">input tokens</text>
<rect class="node" x="250" y="140" width="140" height="50" rx="10"/><text x="320" y="165">output tokens</text>
<rect class="node up" x="420" y="125" width="120" height="34" rx="8"/><text x="480" y="142">reply</text>
<rect class="node up" x="420" y="170" width="120" height="34" rx="8"/><text x="480" y="187">thinking</text>
<path class="arrow" d="M190 32 L248 78" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M190 74 L248 82" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M190 116 L248 88" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M190 158 L248 94" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M420 142 L392 160" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M420 187 L392 170" marker-end="url(#cdf01-arrow)"/>
<text class="note" x="280" y="214">you send the left side; Claude writes the right side</text>
</svg>
<figcaption>Everything in the request is input; everything Claude writes, thinking included, is output. Request-এ যা যায় সব input, Claude যা লেখে, thinking সহ, সব output।</figcaption>
</figure>

- **Input token:** system prompt, `messages`-এর প্রতিটা message (আগের পুরো কথোপকথনসহ), tool-এর সংজ্ঞা, ছবি আর PDF।
- **Output token:** Claude-এর উত্তর, আর তার **thinking**। Thinking token-এর দাম output token হিসেবেই ধরা হয়।

**Output token-এর দাম input-এর চেয়ে অনেক বেশি।** Claude Sonnet 5.5-এ input প্রতি million token \$2, output \$10, মানে পাঁচ গুণ। ধরুন HaatBot দিনে ২,০০০ complaint সামলায়। প্রতিটায় ১,০০০ input token আর ২০০ output token (সংখ্যাগুলো উদাহরণ মাত্র):

| | Token প্রতিদিন | দাম প্রতি MTok | খরচ প্রতিদিন |
|---|---|---|---|
| Input | 2,000 × 1,000 = 2M | \$2 | \$4 |
| Output | 2,000 × 200 = 0.4M | \$10 | \$4 |

Output token সংখ্যায় পাঁচ ভাগের এক ভাগ, তবু **খরচে input-এর সমান**। তাই লম্বা উত্তর আর অকারণ thinking-এ সবচেয়ে দ্রুত টাকা যায়।

*In English: the system prompt, messages, tools and attachments are input; the reply and thinking are output, and output tokens cost several times more.*

### পাঠানোর আগে গুনে নিন · Count before you send

বাজারে যাওয়ার আগে মা ফর্দ মিলিয়ে হিসাব করে নেন, কত টাকা লাগবে। Claude-এ এই কাজের জন্য আছে **token counting endpoint**: `POST /v1/messages/count_tokens`। Python SDK-তে এটা `client.messages.count_tokens(...)`।

এই endpoint সম্পর্কে চারটা কথা মনে রাখুন:

1. **এটা message তৈরির মতোই input নেয়:** `model`, `system`, `messages`, `tools`, ছবি, PDF। উত্তরে আসে একটা সংখ্যা, `input_tokens`।
2. **এটা free**, তবে প্রতি মিনিটে কয়টা request করা যাবে তার আলাদা limit আছে। Message তৈরির rate limit-এ এটা ভাগ বসায় না।
3. **সংখ্যাটা একটা estimate।** আসল request-এ সামান্য কম-বেশি হতে পারে।
4. **Web search-এর মতো server tool, MCP connector, বা URL দিয়ে দেওয়া ছবি/PDF থাকলে এটা error দেয়।** ছবি আর PDF base64 করে পাঠালে গোনা যায়।

এবার HaatBot-এর প্রথম code। একই complaint তিনভাবে লিখে গুনে দেখি: বাংলা হরফে, Banglish-এ, আর ইংরেজিতে।

```bash
pip install anthropic
```

```python
# haatbot/count_tokens.py
import anthropic

client = anthropic.Anthropic()  # ANTHROPIC_API_KEY environment variable থেকে key নেয়

complaints = {
    "bangla": "ভাই, আমার আমের বাক্স ভাঙা এসেছে, টাকা ফেরত চাই",
    "banglish": "Bhai, amar amer box bhanga eseche, refund chai",
    "english": "Brother, my mango box arrived broken, I want a refund",
}

for label, text in complaints.items():
    count = client.messages.count_tokens(
        model="claude-sonnet-5-5",
        messages=[{"role": "user", "content": text}],
    )
    print(f"{label:>8}: {count.input_tokens} input tokens")
```

নিজে চালিয়ে সংখ্যা তিনটা মিলিয়ে দেখুন। **সাধারণত বাংলা হরফের লেখা একই কথায় বেশি token নেয়**, কারণ tokenizer বাংলা অক্ষরকে ইংরেজির চেয়ে ছোট টুকরোয় ভাঙে। HaatBot-এর customer বেশিরভাগ বাংলায় লেখে, তাই **খরচের হিসাব ইংরেজি দিয়ে করলে ভুল হবে।** আপনার আসল customer message দিয়েই মাপুন।

> [!NOTE]
> **ছোট একটা ধাঁধা:** উপরের code-এ শুধু user message আছে, তবু সংখ্যাটা শব্দের চেয়ে একটু বেশি আসতে পারে। কারণ message-এর কাঠামো বোঝাতে Anthropic নিজে কিছু token যোগ করে। **এই system-added token-এর জন্য বিল হয় না।** বিল হয় শুধু আপনার content-এর।

*In English: `client.messages.count_tokens` takes the same input as a real request and returns `input_tokens`; it is free, rate limited on its own, and only an estimate.*

### Model বদলালে গোনাও বদলায় · Counts belong to one model

একই বাজারের ফর্দ ঢাকার দোকানে এক দাম, সিলেটের দোকানে আরেক দাম। Token-এর ক্ষেত্রেও **গোনাটা model-এর উপর নির্ভর করে**, কারণ সব model একই tokenizer ব্যবহার করে না।

Claude Opus 4.7 থেকে একটা নতুন tokenizer এসেছে। **একই লেখা নতুন tokenizer-এ আগের model-গুলোর চেয়ে মোটামুটি ৩০% বেশি token হয়।** তাই:

- `count_tokens`-এ **ঠিক সেই `model` id দিন, যেটায় আসল request পাঠাবেন।**
- পুরনো model-এ মাপা সংখ্যা নতুন model-এর খরচের হিসাবে চালাবেন না। Model বদলালে আবার গুনুন।
- অন্য কোম্পানির tokenizer library (যেমন `tiktoken`) দিয়ে Claude-এর token গোনা ভুল। সেটা অন্য model-এর জন্য বানানো।

*In English: a token count is only valid for the model you counted it with; Claude 4.7 and later models produce roughly 30% more tokens for the same text than earlier ones.*

> [!WARNING]
> **Exam trap:** "একবার গুনে রেখেছি, সব model-এ একই থাকবে" ভাবা। Token count model-নির্ভর আর শুধু একটা estimate। আরেকটা ফাঁদ: thinking token-কে বিনা পয়সার ভাবা। **Thinking token output token হিসেবে বিল হয়**, আর `max_tokens`-এর ভেতরেই পড়ে।

### কেন এটা আপনার জানা দরকার · Why this matters to you

- **বাজেট:** খরচের অনুমান token দিয়েই হয়। Output token বেশি দামি, তাই উত্তরের দৈর্ঘ্য আর thinking নিয়ন্ত্রণ করাই সবচেয়ে বড় সাশ্রয়।
- **Routing:** পাঠানোর আগে গুনে নিলে ঠিক করা যায় কোন request ছোট model-এ যাবে, কোনটা বড় model-এ। Chapter 4-এ এটা আবার আসবে।
- **Limit:** Context window আর rate limit দুটোই token-এ মাপা। Chapter 2-এ দেখব input আর output কীভাবে একই বাজেট ভাগ করে।

### নিজেকে যাচাই করুন · Check yourself

<details class="quiz">
<summary>১. পুরনো একটা model দিয়ে HaatBot-এর system prompt গুনে ৩,০০০ token পেয়েছেন। এখন Claude Sonnet 5.5-এ যাবেন। খরচের হিসাবে কি ৩,০০০ ধরবেন?</summary>

**না।** Token count model-নির্ভর। Claude 4.7 আর পরের model-এর tokenizer একই লেখায় মোটামুটি ৩০% বেশি token দেয়। `count_tokens`-এ `model="claude-sonnet-5-5"` দিয়ে আবার গুনুন।

</details>

<details class="quiz">
<summary>২. `count_tokens` call করলে কি টাকা কাটে, আর এটা কি message-এর rate limit খেয়ে ফেলে?</summary>

**কোনোটাই না।** Token counting free। এর নিজের আলাদা requests-per-minute limit আছে, message তৈরির limit-এর সাথে এর কোনো ভাগাভাগি নেই।

</details>

<details class="quiz">
<summary>৩. Claude একটা প্রশ্নে অনেকক্ষণ thinking করে ছোট একটা উত্তর দিল। Thinking-এর token কোন হিসাবে বিল হবে?</summary>

**Output token হিসেবে।** Thinking Claude নিজে লেখে, তাই এটা output। দামও output-এর দামে, আর এটা `max_tokens`-এর ভেতরে গোনা হয়।

</details>

### পরীক্ষার প্রস্তুতি · Exam practice

পরীক্ষার প্রশ্ন ইংরেজিতে আসে, তাই নিচের প্রশ্ন আর option ইংরেজিতে রাখা হলো। **আগে নিজে উত্তর ঠিক করুন, তারপর click করে মিলিয়ে নিন।** ব্যাখ্যায় বলা আছে সঠিক উত্তর কেন সঠিক, আর বাকিগুলো কেন ভুল।

#### Scenario questions

<details class="quiz">
<summary>Scenario ১. After the team added "Always think step by step and explain your answer in full" to HaatBot's system prompt, the monthly API bill nearly doubled, but the number of chats stayed the same. Explain why, and give two ways to bring the cost down.</summary>

**কারণ:** নতুন নির্দেশে Claude বেশি thinking করছে আর লম্বা উত্তর লিখছে। দুটোই **output token**, আর output-এর দাম input-এর কয়েক গুণ (Sonnet 5.5-এ পাঁচ গুণ)। Chat-এর সংখ্যা একই থাকলেও প্রতি chat-এ output token বেড়ে গেছে।

**কমানোর উপায়:**

1. System prompt-এ **ছোট উত্তর চান**, যেমন "দুই-তিন বাক্যে উত্তর দাও"। লম্বা ব্যাখ্যার নির্দেশ সরিয়ে দিন।
2. প্রতিটা response-এর `usage` field থেকে **output token মাপুন**, আর thinking-এর গভীরতা কমান (effort setting, Chapter 4-এ আসছে)।

</details>

<details class="quiz">
<summary>Scenario ২. A developer estimates HaatBot's monthly cost by counting tokens in 100 English sample complaints with an open-source tokenizer. Most real customers write in Bangla. What is wrong with this estimate, and how should it be done?</summary>

**দুটো ভুল:**

1. **ভুল tokenizer:** অন্য model-এর tokenizer দিয়ে Claude-এর token গোনা যায় না। গোনা model-নির্ভর।
2. **ভুল ভাষা:** বাংলা হরফের লেখা সাধারণত একই কথায় বেশি token নেয়। ইংরেজি sample দিয়ে মাপলে খরচ কম দেখাবে।

**সঠিক পদ্ধতি:** আসল বাংলা আর Banglish customer message নিন, আর `client.messages.count_tokens(...)`-এ **ঠিক সেই `model` id দিন** যেটা production-এ চলবে। System prompt আর tool-এর সংজ্ঞাও request-এ রাখুন, কারণ সেগুলোও input token।

</details>

#### MCQ

**MCQ ১.** A developer wants to know how many input tokens a request will use *before* sending it. What should they use?

- **A.** `client.messages.count_tokens(...)` with the same model and messages
- **B.** `tiktoken` with the `cl100k_base` encoding
- **C.** The character count of the prompt divided by four
- **D.** `client.models.retrieve(...)`

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**A.** `count_tokens` আসল request-এর মতোই input নেয় আর `input_tokens` ফেরত দেয়। B অন্য model-এর tokenizer। C একটা মোটা আন্দাজ, বাংলায় একদম মেলে না। D model-এর তথ্য দেয়, আপনার prompt গোনে না।

</details>

**MCQ ২.** Which of these is **not** counted as input tokens for a request?

- **A.** The system prompt
- **B.** The tool definitions
- **C.** Earlier assistant messages in the conversation history
- **D.** The reply Claude writes in the current response

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**D.** এই response-এ Claude যা লেখে, সেটা output token। A, B আর C সবই request-এ যায়, তাই input। আগের assistant message-ও input, কারণ পুরো ইতিহাস প্রতিবার আবার পাঠানো হয়।

</details>

**MCQ ৩.** How are Claude's thinking tokens billed?

- **A.** They are free
- **B.** At the input token rate
- **C.** At the output token rate, and they count toward `max_tokens`
- **D.** As a flat fee per request

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Thinking Claude নিজে লেখে, তাই এটা output। এর দাম output-এর হারে, আর এটা `max_tokens`-এর ভেতরে পড়ে। A আর D-এর কোনো ভিত্তি নেই। B ভুল, কারণ thinking input না।

</details>

**MCQ ৪.** A prompt measured 10,000 tokens on Claude Sonnet 4.6. The team is moving to Claude Opus 5.5. What should they do for the cost estimate?

- **A.** Keep 10,000; token counts are the same across Claude models
- **B.** Assume about 30% fewer tokens on the newer model
- **C.** Recount the prompt with `count_tokens` and `model="claude-opus-5-5"`
- **D.** Recount with an open-source tokenizer to avoid API calls

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Token count model-নির্ভর। Claude Opus 4.7 থেকে আসা নতুন tokenizer একই লেখায় মোটামুটি ৩০% **বেশি** token দেয়, কম না, তাই B উল্টো। A ঠিক না, কারণ tokenizer বদলেছে। D ভুল tokenizer। আর `count_tokens` free, তাই API call এড়ানোর দরকারও নেই।

</details>

**MCQ ৫.** Which statement about the token counting endpoint is true?

- **A.** It is billed at the model's input token rate
- **B.** It shares one rate limit with message creation
- **C.** It is free, has its own requests-per-minute limit, and returns an estimate
- **D.** It reads from the prompt cache, so repeated counts are cheaper

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Token counting free, এর rate limit message তৈরির limit থেকে আলাদা, আর সংখ্যাটা estimate। A ভুল, এতে টাকা লাগে না। B ভুল, দুটো limit স্বাধীন। D ভুল, token counting prompt caching ব্যবহার করে না।

</details>

**MCQ ৬.** A `count_tokens` request includes the web search server tool. What happens?

- **A.** It counts normally, including the search results
- **B.** It returns an `invalid_request_error`
- **C.** It silently ignores the tool and counts the rest
- **D.** It succeeds but is billed like a normal request

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** Web search-এর মতো server tool, MCP connector, আর URL বা file দিয়ে দেওয়া ছবি/PDF থাকলে endpoint error দেয়। এমন request-এর আসল token খরচ Messages API-র response-এর `usage`-এ দেখা যায়। A আর C ঘটে না, আর D ভুল কারণ counting free।

</details>

**MCQ ৭.** On Claude Sonnet 5.5 (\$2 per million input tokens, \$10 per million output tokens), a day's traffic uses 2M input tokens and 0.4M output tokens. What is the day's cost?

- **A.** \$4.40
- **B.** \$8
- **C.** \$24
- **D.** \$4

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** Input: 2 × \$2 = \$4। Output: 0.4 × \$10 = \$4। মোট \$8। D শুধু input ধরেছে। A আর C দাম ভুলভাবে বসিয়েছে। খেয়াল করুন, **output token সংখ্যায় পাঁচ ভাগের এক ভাগ, তবু খরচ input-এর সমান।**

</details>

> [!TIP]
> **মনে রাখুন:**
>
> - API-তে **সবকিছু token-এ মাপা**: বিল, context window, rate limit।
> - System prompt, message, tool, ছবি, PDF হলো **input**। উত্তর আর thinking হলো **output**, আর output অনেক বেশি দামি।
> - `client.messages.count_tokens(...)` **free, আলাদা rate limit, আর একটা estimate।**
> - Token count **model-নির্ভর**। যে model-এ পাঠাবেন, সেটা দিয়েই গুনুন।
> - **বাংলা লেখা সাধারণত বেশি token নেয়**, তাই আসল customer message দিয়ে মাপুন।

## 2. Context Window · নির্দিষ্ট বাজেট

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** context window আসলে কী, input আর output কীভাবে একই বাজেট ভাগ করে, কথোপকথন লম্বা হলে কী হয়, আর সীমা ছাড়ালে API ঠিক কী ফেরত দেয়।
>
> **In short:** The context window is one fixed token budget that the whole request and the reply must share. The API keeps no memory between calls, so the history grows every turn, and going over the limit gives either an error or a cut reply.

### লোকাল বাসের সিট · One budget for input and output

মিরপুর থেকে মতিঝিলের লোকাল বাসের কথা ভাবুন। **সিট নির্দিষ্ট।** নতুন যাত্রী উঠতে চাইলে জায়গা থাকতে হবে, নইলে কাউকে নামতে হবে।

Claude-এর **context window** এমন একটা নির্দিষ্ট বাজেট। এক request-এ Claude মোট যত token দেখতে পারে, তার সীমা। এখনকার Claude model-গুলোর context window **1M token**, আর একটা উত্তরে সর্বোচ্চ **128K output token**। (পুরনো Claude Haiku 4.5-এর window 200K।)

মূল কথা হলো, **input আর output একই বাসে চড়ে।** System prompt, tool, পুরো ইতিহাস, নতুন message, আর Claude-এর উত্তর, সব এই এক বাজেটের ভেতরে।

<figure class="diagram">
<svg viewBox="0 0 560 170" role="img" aria-label="One context window bar split into the system prompt and tools, the chat history, the new message, and the space reserved for the reply by max_tokens">
<text class="note" x="280" y="22">context window: one fixed token budget</text>
<rect class="node down" x="20" y="40" width="100" height="50" rx="6"/><text x="70" y="65">system</text>
<rect class="node down" x="120" y="40" width="200" height="50" rx="6"/><text x="220" y="65">chat history</text>
<rect class="node down" x="320" y="40" width="80" height="50" rx="6"/><text x="360" y="65">new</text>
<rect class="node up" x="400" y="40" width="140" height="50" rx="6"/><text x="470" y="65">max_tokens</text>
<path class="edge" d="M20 105 L20 115 L398 115 L398 105"/>
<path class="edge" d="M402 105 L402 115 L540 115 L540 105"/>
<text class="note" x="209" y="138">input tokens: grows every turn</text>
<text class="note" x="471" y="138">room for the reply</text>
</svg>
<figcaption>The request and the reply share one budget; a longer history leaves less room. Request আর উত্তর একই বাজেট ভাগ করে, ইতিহাস যত লম্বা, উত্তরের জায়গা তত কম।</figcaption>
</figure>

তুলনাটা এক জায়গায় থেমে যায়। বাসের যাত্রী নিজে থেকে নেমে যায়। **Context window থেকে কিছুই নিজে থেকে নামে না।** কী রাখবেন আর কী বাদ দেবেন, সেটা আপনার code ঠিক করে।

*In English: the context window is the total number of tokens Claude can work with in one request, and the input and the reply share it.*

### প্রতিটা turn-এ ইতিহাস আবার যায় · The history grows every turn

Messages API **কিছু মনে রাখে না।** প্রতিটা call আলাদা। তাই HaatBot যখন Nusrat-এর সাথে দশম বার্তায় পৌঁছায়, তখন আগের নয়টা বার্তা আর তাদের উত্তর **আবার পুরোটা পাঠাতে হয়।**

এর দুটো ফল:

1. **প্রতি turn-এ input token বাড়ে**, তাই প্রতি turn-এর খরচও বাড়ে। Chapter 1-এর হিসাব মনে করুন: আগের সব message input হিসেবে আবার বিল হয়।
2. **বেশি context মানেই ভালো উত্তর না।** Context যত লম্বা হয়, model-এর পক্ষে পুরনো কোনো খুঁটিনাটি ঠিকমতো ধরে রাখা তত কঠিন হয়। একে বলে **context rot**। তাই 1M-এর জায়গা আছে বলেই সব ঢেলে দেওয়া ঠিক না। দরকারি অংশটুকু পাঠান।

লম্বা কথোপকথন ছোট করার জন্য Claude-এ compaction আর context editing-এর মতো ব্যবস্থা আছে। সেগুলো আমরা এই series-এর post 06-এ (Context and memory) দেখব।

*In English: the API is stateless, so you resend the whole history each turn; input grows every turn, and a longer context can make answers worse, not better.*

### সীমা ছাড়ালে কী হয় · What happens at the limit

বাজেট ছাড়ানোর দুটো আলাদা ঘটনা আছে, আর পরীক্ষায় **এই দুটো আলাদা করতে পারা** দরকার:

| কী ঘটল | API কী করে |
|---|---|
| **শুধু input-ই** window-এর চেয়ে বড় | Request ফিরিয়ে দেয়: `400 invalid_request_error`, বার্তা "prompt is too long" |
| Input window-এর ভেতরে, কিন্তু **input + `max_tokens`** window ছাড়ায় | Claude 4.5 আর পরের model-এ request চলে। Window ভরে গেলে লেখা থামে, `stop_reason` হয় `"model_context_window_exceeded"` |
| উত্তর **`max_tokens`-এ** পৌঁছেছে | লেখা থামে, `stop_reason` হয় `"max_tokens"` |

শেষ দুটো দেখতে একই রকম, দুটোতেই উত্তর মাঝপথে কাটা। কিন্তু **সমাধান আলাদা।** `max_tokens`-এ থামলে বেশি `max_tokens` দিন। Context window-এ থামলে ইতিহাস ছোট করুন বা কাজটা ভাগ করুন। তাই HaatBot দুটোই আলাদা করে ধরে:

```python
# haatbot/check_stop.py
import anthropic

client = anthropic.Anthropic()

history = [
    {"role": "user", "content": "আমার order HB-1042 এখনো আসেনি"},
    {"role": "assistant", "content": "দুঃখিত! Order-টা আজ সন্ধ্যার মধ্যে পৌঁছানোর কথা।"},
    {"role": "user", "content": "সন্ধ্যা পার হয়ে গেছে ভাই, কী করব?"},
]

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1024,
    messages=history,
)

print("input tokens:", response.usage.input_tokens)

if response.stop_reason == "model_context_window_exceeded":
    print("Context window ভরে গেছে: পুরনো ইতিহাস ছোট করুন")
elif response.stop_reason == "max_tokens":
    print("max_tokens শেষ: সীমা বাড়ান বা ছোট উত্তর চান")
```

*In English: input alone over the window returns a 400 "prompt is too long"; hitting the window while writing stops with `model_context_window_exceeded`, which is different from `max_tokens`.*

> [!WARNING]
> **Exam trap:** `model_context_window_exceeded` আর `max_tokens`-কে একই জিনিস ভাবা। প্রথমটা মানে **পুরো window ভরে গেছে**, দ্বিতীয়টা মানে **আপনার দেওয়া output সীমা শেষ।** আরেকটা ফাঁদ: "API আগের কথা মনে রাখে" ভাবা। রাখে না, ইতিহাস প্রতিবার আপনাকেই পাঠাতে হয়।

### কেন এটা আপনার জানা দরকার · Why this matters to you

- **খরচ:** লম্বা chat-এ প্রতিটা নতুন turn আগেরটার চেয়ে দামি। Eid-এর ভিড়ে এটা বিলে বড় হয়ে দেখা দেয়।
- **মান:** বেশি context মানেই ভালো উত্তর না। দরকারি অংশ বেছে পাঠানোই ভালো design।
- **Bug:** কাটা উত্তর পেলে `stop_reason` না দেখে ঠিক করা যায় না, কারণ দুই কারণের সমাধান আলাদা।

### নিজেকে যাচাই করুন · Check yourself

<details class="quiz">
<summary>১. HaatBot-এর একটা chat ৪০ turn ধরে চলছে। ৪০তম turn-এর খরচ কেন ১ম turn-এর চেয়ে বেশি?</summary>

**কারণ API কিছু মনে রাখে না।** ৪০তম turn-এ আগের ৩৯টা turn-এর সব message আবার input হিসেবে যায়, তাই input token অনেক বেশি।

</details>

<details class="quiz">
<summary>২. একটা request-এর শুধু input-ই context window-এর চেয়ে বড়। কী হবে?</summary>

**Request চলবেই না।** API `400 invalid_request_error` ফেরত দেয়, বার্তা "prompt is too long"।

</details>

<details class="quiz">
<summary>৩. উত্তর মাঝপথে কাটা, আর `stop_reason` হলো `"model_context_window_exceeded"`। `max_tokens` বাড়ালে কি সমাধান হবে?</summary>

**না।** সমস্যা `max_tokens` না, পুরো window ভরে গেছে। ইতিহাস ছোট করুন বা কাজটা ভাগ করুন।

</details>

### পরীক্ষার প্রস্তুতি · Exam practice

আগের মতোই: **আগে নিজে উত্তর ঠিক করুন, তারপর click করে মিলিয়ে নিন।**

#### Scenario questions

<details class="quiz">
<summary>Scenario ১. During the Eid rush, some HaatBot chats run for over 200 turns. They are still well inside the 1M context window, but in long chats HaatBot starts to miss the order number the customer gave at the start. Explain why, and what the team should change.</summary>

**কারণ:** এটা **context rot**। Context যত লম্বা হয়, model-এর পক্ষে শুরুর দিকের একটা ছোট তথ্য ঠিকমতো ধরে রাখা তত কঠিন হয়। Window-এর ভেতরে থাকা মানেই সব তথ্য সমান ভালোভাবে ব্যবহার হবে, এমন না।

**কী বদলাবেন:**

1. **দরকারি তথ্য আলাদা করে রাখুন।** Order number-এর মতো তথ্য code-এ বের করে রেখে প্রতিবার ছোট করে পাঠান।
2. **পুরনো ইতিহাস ছোট করুন**, যেমন পুরনো turn-এর সারাংশ রাখুন। Claude-এর compaction আর context editing ঠিক এই কাজের জন্য (post 06-এ বিস্তারিত)।

</details>

<details class="quiz">
<summary>Scenario ২. HaatBot's code treats any cut-off reply as a `max_tokens` problem and retries with a higher `max_tokens`. In very long chats the retries keep failing. What is likely happening, and how should the code handle it?</summary>

**সম্ভাব্য কারণ:** এই উত্তরগুলো `max_tokens`-এ না, **context window-এ** থামছে। তখন `stop_reason` হয় `"model_context_window_exceeded"`। বেশি `max_tokens` দিলে window-এ জায়গা বাড়ে না, তাই retry কাজ করে না।

**সমাধান:** `stop_reason` দেখে **দুটো আলাদা পথ** রাখুন। `"max_tokens"` হলে সীমা বাড়ান বা ছোট উত্তর চান। `"model_context_window_exceeded"` হলে ইতিহাস ছোট করুন বা কাজ ভাগ করুন।

</details>

#### MCQ

**MCQ ১.** A request's input alone is larger than the model's context window. What does the API do?

- **A.** It truncates the oldest messages and continues
- **B.** It returns a `400 invalid_request_error` saying the prompt is too long
- **C.** It returns a reply with `stop_reason: "max_tokens"`
- **D.** It switches to a model with a larger window

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** শুধু input-ই window ছাড়ালে request চলে না, 400 আসে। A ভুল, API নিজে থেকে কিছু কাটে না, সেটা আপনার code-এর কাজ। C তখন আসে যখন উত্তর `max_tokens`-এ পৌঁছায়। D, API কখনো নিজে model বদলায় না।

</details>

**MCQ ২.** What does `stop_reason: "model_context_window_exceeded"` mean?

- **A.** The reply reached the `max_tokens` value in the request
- **B.** The request was rejected before generation started
- **C.** Generation stopped because the context window filled up
- **D.** Claude chose to stop because the answer was complete

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Request চলেছিল, কিন্তু লেখার সময় পুরো window ভরে যাওয়ায় থেমেছে। A হলো `"max_tokens"`। B হলে কোনো `stop_reason` আসে না, 400 error আসে। D হলো `"end_turn"`।

</details>

**MCQ ৩.** Which of these share a single request's context window?

- **A.** Only the user messages
- **B.** The system prompt, tools, message history and the reply Claude writes
- **C.** Only the input; the reply has a separate budget
- **D.** Only the newest message; history is stored on the server

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** Input আর output দুটোই একই window-এ। A আর C ভুল, system prompt, tool আর উত্তরও window-এ জায়গা নেয়। D ভুল, Messages API ইতিহাস রাখে না, প্রতিবার আপনি পাঠান।

</details>

**MCQ ৪.** Why does each new turn in a long HaatBot chat cost more than the turn before it?

- **A.** Anthropic charges more for later turns
- **B.** The whole earlier conversation is sent again as input every turn
- **C.** Output tokens get more expensive as the chat grows
- **D.** The model switches to a bigger tier automatically

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** API stateless, তাই প্রতিটা turn-এ আগের সব message আবার input token হিসেবে বিল হয়। A, C আর D-এর কোনোটাই ঘটে না: দাম turn-এর উপর বদলায় না, আর model নিজে থেকে বদলায় না।

</details>

**MCQ ৫.** What are the context window and the maximum output of Claude Sonnet 5.5?

- **A.** 200K context window, 64K max output
- **B.** 1M context window, 128K max output
- **C.** 128K context window, 1M max output
- **D.** 2M context window, 128K max output

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** এখনকার Claude model-গুলোর window 1M token, আর একটা উত্তরে সর্বোচ্চ 128K token। A হলো পুরনো Claude Haiku 4.5-এর সংখ্যা। C সংখ্যা দুটো উল্টে দিয়েছে। D-এর 2M কোনো Claude model-এর না।

</details>

> [!TIP]
> **মনে রাখুন:**
>
> - Context window হলো **একটা নির্দিষ্ট বাজেট**, input আর output দুটোই এর ভেতরে।
> - এখনকার model-এ **1M context, 128K সর্বোচ্চ output।**
> - API **কিছু মনে রাখে না।** ইতিহাস প্রতিবার যায়, তাই প্রতি turn-এ input বাড়ে।
> - **বেশি context মানেই ভালো না** (context rot)। দরকারি অংশ পাঠান।
> - Input বেশি হলে **400 "prompt is too long"**। লেখার সময় window ভরলে **`model_context_window_exceeded`**, যা `max_tokens` থেকে আলাদা।

## 3. Sampling · একই প্রশ্ন, ভিন্ন উত্তর

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** একই prompt-এ Claude কেন প্রতিবার একটু ভিন্ন উত্তর দেয়, `temperature`-এর মতো sampling parameter-এর এখন কী অবস্থা, আর production-এ এই ভিন্নতা কীভাবে সামলাতে হয়।
>
> **In short:** Claude writes by picking each next token from a set of likely options, so the same prompt can give different replies. Newer models no longer accept `temperature`, `top_p` or `top_k`; you steer with the prompt and design your code to expect variation.

### চায়ের দোকানের মামা · Claude picks each token by chance

মোড়ের চায়ের দোকানে রোজ একই অর্ডার দেন: "মামা, এক কাপ দুধ চা, চিনি কম।" চা প্রতিদিন ভালোই হয়, কিন্তু **একদম এক রকম হয় না।** কোনোদিন একটু কড়া, কোনোদিন দুধ একটু বেশি।

Claude-ও তেমন। উত্তর লেখার সময় প্রতিটা ধাপে সে **পরের token-এর জন্য কয়েকটা সম্ভাব্য option দেখে**, প্রত্যেকটার একটা সম্ভাবনা থাকে। তারপর সেই সম্ভাবনা অনুযায়ী **একটা বেছে নেয়।** এই বেছে নেওয়াকে বলে **sampling**।

<figure class="diagram">
<svg viewBox="0 0 560 200" role="img" aria-label="The text so far leads to several candidate next tokens with different probabilities; sampling picks one of them, so different runs can pick different tokens">
<rect class="node down" x="20" y="75" width="150" height="50" rx="10"/><text x="95" y="100">text so far</text>
<text class="start" x="215" y="66">refund</text>
<rect class="node up" x="300" y="48" width="120" height="26" rx="4"/>
<text class="start" x="215" y="111">টাকা</text>
<rect class="node up" x="300" y="93" width="60" height="26" rx="4"/>
<text class="start" x="215" y="156">ছবি</text>
<rect class="node up" x="300" y="138" width="20" height="26" rx="4"/>
<rect class="node" x="455" y="75" width="90" height="50" rx="10"/><text x="500" y="100">pick one</text>
<path class="arrow" d="M170 100 L205 100" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M425 100 L453 100" marker-end="url(#cdf01-arrow)"/>
<text class="note" x="300" y="190">bar length = how likely the next token is</text>
</svg>
<figcaption>Each next token is drawn from likely options, so two runs can take different paths. প্রতিটা পরের token সম্ভাব্য option থেকে বাছা হয়, তাই দুইবার চালালে পথ আলাদা হতে পারে।</figcaption>
</figure>

একটা token আলাদা হলে তার পরের সব token-ও বদলে যেতে পারে। তাই **একই প্রশ্নে কথা একই থাকে, কিন্তু ভাষা আর গঠন বদলায়।** এটাই **non-determinism**।

তুলনাটা এক জায়গায় থেমে যায়। মামার চায়ের পার্থক্য হাতের আন্দাজে। Claude-এর পার্থক্য **সম্ভাবনা থেকে বাছাইয়ে**, আর কোন option কতটা সম্ভাব্য, সেটা আপনার prompt দিয়ে অনেকটা ঠিক করা যায়।

*In English: Claude picks each next token from likely options by probability, so the same prompt can produce different wording each run.*

### Temperature-এর দিন শেষ · Sampling knobs are going away

আগে বাছাইয়ের এলোমেলো ভাব নিয়ন্ত্রণ করতে তিনটা parameter ছিল: `temperature`, `top_p` আর `top_k`। নতুন model-গুলোতে এগুলো উঠে যাচ্ছে:

| কোথায় | `temperature`, `top_p`, `top_k` পাঠালে |
|---|---|
| Claude Opus 4.7 আর পরের Opus, আর সব Fable model | যেকোনো মানে **400 error** |
| Claude Sonnet 5 line আর Claude Haiku 5.5 | **Default-এর বাইরের মানে 400 error** |
| API version `2026-10-21` (`anthropic-version` header) | **সব model-এ, যেকোনো মানে 400 error** |

আরেকটা পুরনো ভুল ধারণা: "`temperature=0` দিলে প্রতিবার একই উত্তর আসে।" **আগের model-গুলোতেও এটা কখনো নিশ্চিত ছিল না।**

তাহলে উত্তরের ধরন নিয়ন্ত্রণ করবেন কীভাবে? **Prompt দিয়ে।** কোন ভাষায়, কত বাক্যে, কোন format-এ উত্তর চান, পরিষ্কার করে বলুন, দরকারে উদাহরণ দিন। Prompt লেখার কৌশল post 03-এ বিস্তারিত।

*In English: newer models reject `temperature`, `top_p` and `top_k`, and API version `2026-10-21` rejects them on every model; `temperature=0` never guaranteed identical output, so steer with the prompt instead.*

### ভিন্নতা মেনে design করুন · Design for non-determinism

HaatBot-এ একই প্রশ্ন তিনবার পাঠিয়ে দেখি। System prompt-এ format বেঁধে দেওয়া আছে:

```python
# haatbot/same_question.py
import anthropic

client = anthropic.Anthropic()

question = "আমার order কবে আসবে? Order no. HB-1042"

for run in range(1, 4):
    response = client.messages.create(
        model="claude-haiku-5-5",
        max_tokens=300,
        system="তুমি Haat-এর support assistant। বাংলায়, দুই বাক্যে উত্তর দাও। Order number উল্লেখ করো।",
        messages=[{"role": "user", "content": question}],
    )
    text = "".join(block.text for block in response.content if block.type == "text")
    print(f"run {run}: {text}")
    print("  order number আছে?", "HB-1042" in text)
```

চালালে তিনটা উত্তরের **ভাষা আলাদা হবে, কিন্তু সবগুলো format মানবে।** Production-এ এই কারণে:

- **হুবহু লেখা মিলিয়ে test করবেন না।** বরং গুণ পরীক্ষা করুন: order number আছে কি না, ভাষা বাংলা কি না, দৈর্ঘ্য ঠিক কি না।
- **একবার চালিয়ে সিদ্ধান্ত নেবেন না।** একই test কয়েকবার চালান। Eval দিয়ে এটা ঠিকভাবে মাপা হয় post 11-এ।
- **Code-এ উত্তর যাচাই করুন**, ধরে নেবেন না যে উত্তর সবসময় একই আকারে আসবে।

*In English: expect different wording on every run; test properties of the reply over several runs instead of matching exact text.*

> [!WARNING]
> **Exam trap:** "Consistent উত্তরের জন্য `temperature=0` দাও।" নতুন model-এ এতে **400 error** আসে, আর আগেও এটা হুবহু একই উত্তরের নিশ্চয়তা দিত না। সঠিক উত্তর: **prompt দিয়ে ধরন বেঁধে দিন, আর code ও test ভিন্নতা মেনে লিখুন।**

### কেন এটা আপনার জানা দরকার · Why this matters to you

- **Migration:** পুরনো code-এ `temperature` থাকলে নতুন model-এ গেলেই request ভাঙবে। আগে থেকে সরিয়ে ফেলুন।
- **Testing:** হুবহু মিলিয়ে লেখা test মাঝে মাঝে fail করবে। Flaky test-এর একটা বড় কারণ এটাই।
- **Customer:** দুজন customer একই প্রশ্নে ভিন্ন ভাষার উত্তর পেতে পারে। তথ্য যেন একই থাকে, সেটা prompt আর যাচাই দিয়ে নিশ্চিত করুন।

### নিজেকে যাচাই করুন · Check yourself

<details class="quiz">
<summary>১. একই prompt দুইবার পাঠালে Claude কেন ভিন্ন উত্তর দেয়?</summary>

**Sampling-এর কারণে।** প্রতিটা ধাপে পরের token সম্ভাবনা অনুযায়ী বাছা হয়। একটা token আলাদা হলে বাকি উত্তরও বদলে যেতে পারে।

</details>

<details class="quiz">
<summary>২. Claude Opus 5.5-এ `temperature=0.2` পাঠালে কী হবে?</summary>

**400 error।** Opus 4.7 আর পরের Opus model `temperature`, `top_p`, `top_k` একদমই নেয় না। Parameter-টা সরিয়ে prompt দিয়ে ধরন ঠিক করুন।

</details>

<details class="quiz">
<summary>৩. HaatBot-এর উত্তর test করতে হুবহু string মেলানো কেন খারাপ বুদ্ধি?</summary>

**কারণ প্রতিবার ভাষা একটু বদলাবে**, তাই test মাঝে মাঝে fail করবে। বরং গুণ মিলিয়ে দেখুন: order number আছে কি না, উত্তর বাংলায় কি না।

</details>

### পরীক্ষার প্রস্তুতি · Exam practice

**আগে নিজে উত্তর ঠিক করুন, তারপর click করে মিলিয়ে নিন।**

#### Scenario questions

<details class="quiz">
<summary>Scenario ১. HaatBot's old refund code sends `temperature=0` "so refunds are always handled the same way". After switching the model to Claude Opus 5.5, every refund request fails. Explain why, and how to get consistent refund replies on the new model.</summary>

**কারণ:** Claude Opus 4.7 আর পরের Opus model `temperature` নেয় না, যেকোনো মানে **400 error** দেয়। তাই প্রতিটা refund request ভাঙছে।

**সমাধান:**

1. Request থেকে **`temperature` সরিয়ে দিন।**
2. Consistency আনুন **prompt দিয়ে**: refund policy, উত্তরের format, আর দুই-একটা উদাহরণ system prompt-এ দিন।
3. মনে রাখুন, `temperature=0` আগেও হুবহু একই উত্তরের নিশ্চয়তা দিত না। তাই **refund-এর আসল সিদ্ধান্ত code-এ যাচাই করুন**, শুধু লেখার উপর ভরসা করবেন না।

</details>

<details class="quiz">
<summary>Scenario ২. A HaatBot unit test sends a fixed question and compares the reply to a saved string. It passes on some runs and fails on others, with no code change. Why, and how should the test be written?</summary>

**কারণ:** Sampling-এর কারণে **প্রতিবার ভাষা একটু আলাদা হয়।** হুবহু string মেলানো test তাই কখনো pass, কখনো fail করে।

**ভালো test:**

1. **গুণ পরীক্ষা করুন:** order number আছে কি না, উত্তর বাংলায় কি না, দৈর্ঘ্য সীমার ভেতরে কি না।
2. **কয়েকবার চালান** আর pass-এর হার দেখুন, একবারের ফলের উপর ভরসা করবেন না।

</details>

#### MCQ

**MCQ ১.** Why can the same prompt give different replies from Claude?

- **A.** The API caches old replies and returns a random one
- **B.** Claude samples each next token from likely options by probability
- **C.** Each request is sent to a different model at random
- **D.** The context window is shuffled before each request

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** প্রতিটা পরের token সম্ভাবনা অনুযায়ী বাছা হয়, এটাই sampling। A ভুল, API পুরনো উত্তর ফেরত দেয় না। C ভুল, আপনার দেওয়া model-ই চলে। D-এর কোনো ভিত্তি নেই।

</details>

**MCQ ২.** A request to Claude Opus 5.5 includes `temperature=0.7`. What happens?

- **A.** The reply is more creative
- **B.** The value is silently ignored
- **C.** The API returns a 400 error
- **D.** The value is rounded to 1

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Claude Opus 4.7 আর পরের Opus model sampling parameter একদমই নেয় না। A এক সময় সত্যি ছিল, এখন না। B আর D ঘটে না, API চুপচাপ মান বদলায় না, ফিরিয়ে দেয়।

</details>

**MCQ ৩.** On API version `2026-10-21`, which sampling parameters can a request send?

- **A.** All three, on any model
- **B.** Only `temperature`
- **C.** None: `temperature`, `top_p` and `top_k` return a 400 on every model
- **D.** Only `top_p` and `top_k`

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** এই API version-এ তিনটাই সব model-এ বাদ, যেকোনো মানে 400। A, B আর D প্রত্যেকটা কোনো না কোনো parameter-কে চালু ধরে নিয়েছে, যা এই version-এ নেই।

</details>

**MCQ ৪.** A team wants HaatBot's replies to follow a steadier style on the newest models. What is the recommended approach?

- **A.** Set `temperature=0`
- **B.** Set `top_k=1`
- **C.** Describe the style, length and format in the prompt, with examples
- **D.** Send the same request several times and keep the shortest reply

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** নতুন model-এ ধরন নিয়ন্ত্রণের পথ হলো prompt। A আর B নতুন model-এ 400 দেয়, আর `temperature=0` আগেও হুবহু একই উত্তর নিশ্চিত করত না। D খরচ বাড়ায়, ধরন ঠিক করে না।

</details>

**MCQ ৫.** Which is the best way to test a HaatBot reply?

- **A.** Compare the reply to a saved string, character by character
- **B.** Check properties such as "contains the order number" and "is in Bangla", over several runs
- **C.** Run the test once and trust the result
- **D.** Skip tests for model replies, because they change

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** উত্তরের ভাষা বদলায়, কিন্তু গুণ একই থাকা উচিত। তাই গুণ পরীক্ষা করুন, কয়েকবার চালিয়ে। A flaky হবে। C একবারের ভাগ্যের উপর ভরসা করে। D মানে কোনো পরীক্ষাই নেই, যা আরও বিপজ্জনক।

</details>

> [!TIP]
> **মনে রাখুন:**
>
> - Claude প্রতিটা পরের token **সম্ভাবনা থেকে বাছে**, তাই একই prompt-এ ভিন্ন উত্তর আসে।
> - Opus 4.7+ আর Fable-এ `temperature`, `top_p`, `top_k` **যেকোনো মানে 400।** Sonnet 5 line আর Haiku 5.5-এ default-এর বাইরের মানে 400।
> - API version **`2026-10-21`-এ সব model-এ তিনটাই বাদ।**
> - **`temperature=0` কখনো হুবহু একই উত্তরের নিশ্চয়তা দেয়নি।**
> - ধরন ঠিক করুন **prompt দিয়ে**, আর test-এ **গুণ মিলান, হুবহু লেখা না।**

## 4. Models and Thinking · Model বাছাই বনাম thinking

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** Claude-এর কোন model কোন কাজের জন্য, effort দিয়ে thinking-এর গভীরতা কীভাবে ঠিক করা হয়, আর কোথায় বড় model লাগবে আর কোথায় শুধু effort বদলালেই চলবে।
>
> **In short:** You have two knobs: the model tier and the effort level. The tier sets the price and the ceiling of ability; effort sets how much Claude thinks within that model. Route each kind of task to the cheapest setting that does it well.

### বাস, CNG না রিকশা · Picking a model tier

গুলশান থেকে মোহাম্মদপুর যাবেন। **কাজ বুঝে বাহন বাছেন**: পাশের গলিতে রিকশা, অফিসে CNG, জরুরি আর দূরের কাজে ভাড়া করা গাড়ি। সবসময় গাড়ি নিলে কাজ হয়, কিন্তু টাকা যায় অকারণে।

Claude-এর model-গুলোও তেমন। এখনকার চারটা মূল model:

| Model | `model` id | দাম (input / output, প্রতি MTok) | গতি | Default effort | কখন |
|---|---|---|---|---|---|
| Claude Fable 5.2 | `claude-fable-5-2` | \$8 / \$40 | মাঝারি | `high` | সবচেয়ে কঠিন reasoning আর লম্বা agent কাজ |
| Claude Opus 5.5 | `claude-opus-5-5` | \$4 / \$20 | মাঝারি | `medium` | জটিল কাজের default পছন্দ |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | \$2 / \$10 | দ্রুত | `high` | মান আর খরচের ভারসাম্য |
| Claude Haiku 5.5 | `claude-haiku-5-5` | \$0.10 / \$0.50 থেকে | সবচেয়ে দ্রুত | `medium` | বেশি সংখ্যার ছোট কাজ: classify, route, extract |

সবগুলোর context window 1M, সর্বোচ্চ output 128K। Haiku 5.5-এ prompt 100K token-এর বেশি হলে দাম হয় \$0.50 / \$2.50।

তুলনাটা এক জায়গায় থেমে যায়। রিকশা কখনো হাইওয়েতে ওঠে না। কিন্তু **ছোট model-ও বেশি effort দিলে অনেক কঠিন কাজ পারে।** তাই শুধু model না, effort-ও দেখতে হয়।

*In English: Fable 5.2 is the most capable, Opus 5.5 is the default for complex work, Sonnet 5.5 balances quality and cost, and Haiku 5.5 is the fast, cheap choice for high-volume tasks.*

### Effort: কতটা ভাববে · Effort sets how hard Claude thinks

এখনকার model-এ thinking চলে **adaptive** ভাবে: Claude নিজেই ঠিক করে কখন আর কতটা ভাববে। আপনি ঠিক করেন **effort**, মানে কতটা গভীরে যাবে। মান পাঁচটা: `low`, `medium`, `high`, `xhigh`, `max`।

```python
# haatbot/effort_example.py
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=2000,
    thinking={"type": "adaptive"},
    output_config={"effort": "low"},
    messages=[{"role": "user", "content": "আমার bKash refund কবে আসবে? Order HB-1042"}],
)

print(response.usage.output_tokens, "output tokens")
```

Effort বাড়ালে **উত্তর ভালো হতে পারে, কিন্তু thinking token বাড়ে**, আর Chapter 1-এ দেখেছি thinking বিল হয় output-এর দামে। তাই effort হলো **মান আর খরচের মাঝের দাঁড়িপাল্লা।**

কিছু নিয়ম পরীক্ষার জন্য মনে রাখুন:

- **পুরনো `budget_tokens` (`thinking={"type": "enabled", "budget_tokens": N}`) বাদ।** Claude 4.6-এ এটা deprecated, আর Opus 5.5, Sonnet 5.5, Fable-এর মতো নতুন model-এ **400 error** দেয়। এখন adaptive thinking আর effort।
- **Thinking পুরো বন্ধ করা সব model-এ যায় না।** Opus 5.5 আর Fable-এ thinking সবসময় চালু, কমাতে হলে **effort কমান।** Sonnet 5.5-এ `thinking={"type": "between_tools"}` দিয়ে বন্ধ করা যায় (effort `high` বা কম হলে)। Haiku 5.5-এ `{"type": "disabled"}` চলে (effort `high` বা কম হলে)।

*In English: thinking is adaptive, and `output_config={"effort": ...}` from `low` to `max` sets how deep it goes; `budget_tokens` is rejected on new models, and Opus 5.5 and Fable cannot turn thinking off.*

### বড় model, না বেশি effort · Route each task to the right setting

HaatBot-এর সব কাজ সমান কঠিন না। "এটা refund না delivery-র প্রশ্ন?" বোঝা সহজ, আর হাজার হাজার বার ঘটে। **Refund-এর বিরোধ মেটানো কঠিন**, policy মিলিয়ে ভাবতে হয়। তাই এক model-এ সব না পাঠিয়ে **route করুন**:

<figure class="diagram">
<svg viewBox="0 0 590 220" role="img" aria-label="A complaint first goes to Haiku 5.5 at low effort to be classified; refund cases go to Opus 5.5 at medium effort, and other cases go to Sonnet 5.5 at low effort">
<rect class="node skip" x="20" y="85" width="120" height="50" rx="10"/><text x="80" y="110">complaint</text>
<rect class="node down" x="180" y="85" width="170" height="50" rx="10"/><text x="265" y="110">Haiku 5.5 · low</text>
<rect class="node up" x="390" y="20" width="180" height="50" rx="10"/><text x="480" y="45">Opus 5.5 · medium</text>
<rect class="node up" x="390" y="150" width="180" height="50" rx="10"/><text x="480" y="175">Sonnet 5.5 · low</text>
<path class="arrow" d="M140 110 L178 110" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M350 100 L388 50" marker-end="url(#cdf01-arrow)"/>
<path class="arrow" d="M350 120 L388 170" marker-end="url(#cdf01-arrow)"/>
<text class="note" x="345" y="62">refund</text>
<text class="note" x="345" y="168">other</text>
</svg>
<figcaption>A cheap model sorts every message; only the hard cases go to the expensive one. সস্তা model সব message ভাগ করে, শুধু কঠিন কাজ যায় দামি model-এ।</figcaption>
</figure>

```python
# haatbot/route.py
import anthropic

client = anthropic.Anthropic()


def ask(model, effort, system, text):
    response = client.messages.create(
        model=model,
        max_tokens=1000,
        output_config={"effort": effort},
        system=system,
        messages=[{"role": "user", "content": text}],
    )
    return "".join(block.text for block in response.content if block.type == "text")


complaint = "ভাই, আমার আমের box ভাঙা এসেছে, refund চাই"

label = ask(
    "claude-haiku-5-5", "low",
    "Customer-এর message-কে এক শব্দে label করো: refund, delivery, অথবা other। শুধু label লেখো।",
    complaint,
)

if label.strip().lower() == "refund":
    reply = ask("claude-opus-5-5", "medium",
                "তুমি Haat-এর support assistant। Refund policy মেনে বাংলায় উত্তর দাও।", complaint)
else:
    reply = ask("claude-sonnet-5-5", "low",
                "তুমি Haat-এর support assistant। বাংলায়, ছোট করে উত্তর দাও।", complaint)

print(label.strip(), "->", reply)
```

কোন কাজে কোন setting যথেষ্ট, সেটা অনুমানে না, **মেপে ঠিক করুন।** একই test set বিভিন্ন model আর effort-এ চালিয়ে মান আর খরচ মিলিয়ে দেখুন। Eval বানানো post 11-এ।

*In English: route simple, high-volume tasks to a cheap model at low effort and send only hard cases to a bigger model; measure, do not guess.*

> [!WARNING]
> **Exam trap:** নতুন model-এ thinking বাড়াতে `budget_tokens` ব্যবহার করা। Opus 5.5, Sonnet 5.5 আর Fable-এ এটা **400 error।** সঠিক উপায়: **adaptive thinking আর `output_config={"effort": ...}`।** আরেকটা ফাঁদ: "সব কাজে সবচেয়ে বড় model দাও"। এতে মান খুব একটা বাড়ে না, কিন্তু **খরচ আর latency অনেক বাড়ে।**

### কেন এটা আপনার জানা দরকার · Why this matters to you

- **খরচ:** দিনে হাজার হাজার ছোট কাজ Haiku-তে গেলে Fable-এর তুলনায় খরচ বহুগুণ কমে।
- **গতি:** Customer chat-এ দেরি মানে বিরক্ত customer। দ্রুত model আর কম effort latency কমায়।
- **Migration:** পুরনো `budget_tokens` code নতুন model-এ ভাঙবে। Effort-এ সরাতে জানতে হবে।

### নিজেকে যাচাই করুন · Check yourself

<details class="quiz">
<summary>১. রাতে ৫০,০০০ product review-কে "positive" বা "negative" label করতে হবে, সস্তায় আর দ্রুত। কোন model?</summary>

**Claude Haiku 5.5**, কম effort-এ। এটা বেশি সংখ্যার ছোট classify কাজের জন্যই বানানো, আর সবচেয়ে সস্তা ও দ্রুত।

</details>

<details class="quiz">
<summary>২. Opus 5.5-এ thinking পুরো বন্ধ করতে চান। কী করবেন?</summary>

**পুরো বন্ধ করা যায় না।** Opus 5.5-এ thinking সবসময় চালু। কম thinking চাইলে `output_config={"effort": "low"}` দিন।

</details>

<details class="quiz">
<summary>৩. Sonnet 5.5-এ `thinking={"type": "enabled", "budget_tokens": 8000}` পাঠালে কী হবে?</summary>

**400 error।** নতুন model-এ `budget_tokens` বাদ। `thinking={"type": "adaptive"}` আর `output_config={"effort": "high"}` দিন।

</details>

### পরীক্ষার প্রস্তুতি · Exam practice

**আগে নিজে উত্তর ঠিক করুন, তারপর click করে মিলিয়ে নিন।**

#### Scenario questions

<details class="quiz">
<summary>Scenario ১. HaatBot sends every customer message, including "hi" and "thanks", to Claude Fable 5.2 at `max` effort. Replies are good, but the bill is high and customers complain that replies are slow. What would you change?</summary>

**সমস্যা:** সব কাজ সবচেয়ে দামি model-এ, সবচেয়ে বেশি effort-এ যাচ্ছে। ছোট কাজেও Claude অনেক ভাবছে, যা **output token (খরচ) আর সময় (latency)** দুটোই বাড়ায়।

**পরিবর্তন:**

1. **Route করুন:** আগে Haiku 5.5-এ কম effort-এ message-এর ধরন ঠিক করুন। সহজ কাজ Haiku বা Sonnet-এ, শুধু কঠিন কাজ বড় model-এ।
2. **Effort কমান:** বেশিরভাগ কাজে `max` লাগে না। `low` বা `medium` দিয়ে শুরু করুন।
3. **মেপে দেখুন:** একই test set-এ পুরনো আর নতুন setting-এর মান আর খরচ মিলিয়ে নিন।

</details>

<details class="quiz">
<summary>Scenario ২. For refund disputes, a developer wants HaatBot on Claude Sonnet 5.5 to reason more deeply. They add `thinking={"type": "enabled", "budget_tokens": 10000}` and every request fails. Explain why, and give two correct options.</summary>

**কারণ:** `budget_tokens` পুরনো পদ্ধতি। Sonnet 5.5-এর মতো নতুন model-এ এটা **400 error** দেয়।

**সঠিক দুই উপায়:**

1. **Effort বাড়ান:** `thinking={"type": "adaptive"}` রাখুন আর `output_config={"effort": "xhigh"}` (বা `high`, `max`) দিন।
2. **শুধু এই route-টা বড় model-এ পাঠান**, যেমন Claude Opus 5.5। বাকি কাজ Sonnet-এই থাকুক।

</details>

#### MCQ

**MCQ ১.** HaatBot must tag 50,000 reviews every night, as cheaply and quickly as possible. Which model fits best?

- **A.** Claude Fable 5.2
- **B.** Claude Opus 5.5
- **C.** Claude Sonnet 5.5
- **D.** Claude Haiku 5.5

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**D.** Haiku 5.5 বেশি সংখ্যার ছোট classify কাজের জন্য, সবচেয়ে সস্তা আর দ্রুত। A আর B জটিল কাজের জন্য, এখানে অকারণে দামি। C কাজ পারবে, কিন্তু Haiku-র চেয়ে অনেক দামি।

</details>

**MCQ ২.** How do you set the effort level with the Python SDK?

- **A.** `effort="low"` inside `thinking`
- **B.** `output_config={"effort": "low"}`
- **C.** `temperature=0.2`
- **D.** `thinking={"type": "enabled", "budget_tokens": 2000}`

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** Effort যায় `output_config`-এর ভেতরে। A ভুল জায়গা। C sampling parameter, আর নতুন model-এ 400 দেয়। D পুরনো `budget_tokens`, নতুন model-এ 400 দেয়।

</details>

**MCQ ৩.** A request to Claude Opus 5.5 sends `thinking={"type": "enabled", "budget_tokens": 8000}`. What happens?

- **A.** Claude thinks for up to 8,000 tokens
- **B.** The API returns a 400 error
- **C.** The budget is ignored and adaptive thinking is used
- **D.** Thinking is turned off

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** নতুন model-এ `budget_tokens` বাতিল, 400 আসে। A পুরনো model-এর আচরণ। C আর D ঘটে না, API চুপচাপ মান বদলায় না। সঠিক পথ adaptive thinking আর effort।

</details>

**MCQ ৪.** A team wants Claude Opus 5.5 to think as little as possible. What should they do?

- **A.** Send `thinking={"type": "disabled"}`
- **B.** Send `thinking={"type": "between_tools"}`
- **C.** Lower the effort, for example `output_config={"effort": "low"}`
- **D.** Set `max_tokens=1`

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**C.** Opus 5.5-এ thinking বন্ধ করা যায় না, effort-ই একমাত্র নিয়ন্ত্রণ। A Opus 5.5-এ চলে না। B হলো Sonnet 5.5-এর পদ্ধতি। D উত্তরটাই কেটে দেবে।

</details>

**MCQ ৫.** What is the default effort level of Claude Opus 5.5?

- **A.** `low`
- **B.** `medium`
- **C.** `high`
- **D.** `max`

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** Opus 5.5-এর default `medium`। C হলো Fable 5.2 আর Sonnet 5.5-এর default। A আর D কোনো model-এর default না, আপনাকে নিজে দিতে হয়।

</details>

**MCQ ৬.** HaatBot sends 1,000 requests to Claude Haiku 5.5, each with 50,000 input tokens (\$0.10 per million input tokens for prompts of 100K tokens or fewer). What is the input cost?

- **A.** \$0.50
- **B.** \$5
- **C.** \$25
- **D.** \$50

<details class="quiz">
<summary>উত্তর দেখুন</summary>

**B.** 1,000 × 50,000 = 50M input token। 50 × \$0.10 = \$5। প্রতিটা prompt 100K-এর নিচে, তাই কম দামটাই খাটে। C হয় যদি ভুল করে \$0.50-এর হার (100K-এর বেশি prompt) ধরেন। A আর D হিসাবের দশমিক ভুল।

</details>

> [!TIP]
> **মনে রাখুন:**
>
> - **Fable 5.2** সবচেয়ে সক্ষম, **Opus 5.5** জটিল কাজের default, **Sonnet 5.5** ভারসাম্য, **Haiku 5.5** দ্রুত আর সস্তা।
> - Thinking **adaptive**, গভীরতা ঠিক করে **`output_config={"effort": ...}`**: `low` থেকে `max`।
> - **`budget_tokens` নতুন model-এ 400।**
> - **Opus 5.5 আর Fable-এ thinking বন্ধ হয় না**, effort কমান। Sonnet 5.5-এ `between_tools`।
> - **কাজ বুঝে route করুন**, আর কোন setting যথেষ্ট তা মেপে ঠিক করুন।

## এরপর কী · What's next

চারটা ভিত্তি এখন হাতে: token, context বাজেট, sampling, আর model ও effort। পরের post **Claude Dev Foundations #02: Talking to Claude**-এ HaatBot প্রথমবার সত্যিকারের প্রশ্নের উত্তর দেবে: "আমার order কোথায়?" সেখানে দেখব zero, one আর multi-shot prompt, SDK বনাম REST, আর streaming।

*In English: next, in post #02, HaatBot makes its first real API call, and we cover shot prompting, SDK vs REST, and streaming.*

## References

- [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting), Claude Docs
- [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows), Claude Docs
- [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview), Claude Docs
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing), Claude Docs
- [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking), Claude Docs
- [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking), Claude Docs
- [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking), Claude Docs
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort), Claude Docs
- [API versions](https://platform.claude.com/docs/en/api/versioning), Claude Docs
- [Claude Certified Developer Foundations prep path](https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations), Anthropic Academy
