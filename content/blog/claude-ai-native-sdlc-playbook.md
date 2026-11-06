---
title: "Claude's AI-Native SDLC Playbook, Explained in Bangla: Code Is No Longer the Bottleneck"
excerpt: "Anthropic's playbook for rebuilding the software lifecycle around Claude, explained in Bangla and English: why faster code alone is not enough, the intent.md to production artifact chain, and every play from Plan to Maintain, with diagrams and quizzes."
date: "2026-11-06"
category: "Guide"
tags: ["SDLC","AI","Claude Code","Agents","Bangla"]
published: true
---
Claude can now write in hours what used to take a team weeks. **But faster code does not mean faster software.** Anthropic's Applied AI team wrote a playbook on how to rebuild the whole software lifecycle around that fact. This post explains Claude's playbook, stage by stage, in Bangla and English.

Claude এখন কয়েক ঘণ্টায় এমন code লিখে ফেলে, যেটা আগে একটা team-এর কয়েক সপ্তাহ লাগত। **কিন্তু code দ্রুত হলেই software দ্রুত হয় না।** Anthropic-এর Applied AI team এই সমস্যা নিয়ে একটা playbook লিখেছে: পুরো software lifecycle কীভাবে Claude-কে ঘিরে নতুন করে সাজাতে হয়। এই post সেই playbook-কে stage ধরে ধরে বাংলা আর ইংরেজিতে বোঝায়।

<div class="roadmap">
<a href="#0-the-big-idea--কোড-আর-bottleneck-না"><b>00</b>Big Idea<small>কোড আর bottleneck না</small></a>
<a href="#1-plan--ভাবনা-থেকে-intentmd"><b>01</b>Plan<small>ভাবনা থেকে intent.md</small></a>
<a href="#2-design--এক-session-এ-spec"><b>02</b>Design<small>এক session-এ spec</small></a>
<a href="#3-build--plan-claudemd-skills-hooks"><b>03</b>Build<small>plan, CLAUDE.md, skills</small></a>
<a href="#4-test--নিজের-কাজ-নিজে-যাচাই"><b>04</b>Test<small>নিজের কাজ নিজে যাচাই</small></a>
<a href="#5-deploy--review-আর-gate"><b>05</b>Deploy<small>review আর gate</small></a>
<a href="#6-maintain--loop-বন্ধ-করা"><b>06</b>Maintain<small>loop বন্ধ করা</small></a>
</div>

<figure class="diagram">
<svg viewBox="0 0 560 254" role="img" aria-label="The six stages as a loop. Plan writes intent.md, Design writes spec.md, Build writes plan.md and the diff, Test adds tests and evals, Deploy produces the PR and its findings, and Maintain writes a new intent.md that starts the loop again">
<defs><marker id="sdlc-big-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node down" x="20" y="20" width="150" height="64" rx="10"/><text x="95" y="42">1 Plan</text><text class="note" x="95" y="65">intent.md</text>
<rect class="node" x="205" y="20" width="150" height="64" rx="10"/><text x="280" y="42">2 Design</text><text class="note" x="280" y="65">spec.md</text>
<rect class="node" x="390" y="20" width="150" height="64" rx="10"/><text x="465" y="42">3 Build</text><text class="note" x="465" y="65">plan.md + diff</text>
<rect class="node" x="390" y="170" width="150" height="64" rx="10"/><text x="465" y="192">4 Test</text><text class="note" x="465" y="215">tests + evals</text>
<rect class="node" x="205" y="170" width="150" height="64" rx="10"/><text x="280" y="192">5 Deploy</text><text class="note" x="280" y="215">PR + findings</text>
<rect class="node up" x="20" y="170" width="150" height="64" rx="10"/><text x="95" y="192">6 Maintain</text><text class="note" x="95" y="215">new intent.md</text>
<path class="arrow" d="M170 52 L203 52" marker-end="url(#sdlc-big-arrow)"/>
<path class="arrow" d="M355 52 L388 52" marker-end="url(#sdlc-big-arrow)"/>
<path class="arrow" d="M465 84 L465 168" marker-end="url(#sdlc-big-arrow)"/>
<path class="arrow" d="M390 202 L357 202" marker-end="url(#sdlc-big-arrow)"/>
<path class="arrow" d="M205 202 L172 202" marker-end="url(#sdlc-big-arrow)"/>
<path class="arrow" d="M95 170 L95 86" marker-end="url(#sdlc-big-arrow)"/>
<text class="note" x="280" y="127">a loop, not a line</text>
</svg>
<figcaption>Every stage writes a file that the next stage reads, and production problems feed back in as a new intent. প্রতিটা stage একটা file লিখে রাখে, পরের stage সেটা পড়ে শুরু করে, আর production-এর সমস্যা নতুন intent হয়ে আবার loop-এ ঢোকে।</figcaption>
</figure>

> [!NOTE]
> **Source:** এই post Anthropic-এর article [The AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook)-এর ব্যাখ্যা। ধারণাগুলো ওদের, ভাষা আর উদাহরণ আমাদের।
>
> **কীভাবে পড়বেন:** প্রতিটা অংশ বাংলায় বোঝানো, শেষে এক লাইনের *In English* সারাংশ। পুরো post জুড়ে একটা উদাহরণ চলবে: একটা university-র result portal। Chapter-এর শেষে ছোট quiz আছে, উত্তর দেখতে প্রশ্নে click করুন।

## 0. The Big Idea · কোড আর bottleneck না

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** পুরনো SDLC কীভাবে চলে, code দ্রুত লেখা হলে কোথায় জট লাগে, AI-native SDLC আসলে কী, আর এই playbook-এর "play" জিনিসটা কী।
>
> **In short:** When AI makes the build stage fast, the slow human steps around it become the bottleneck. The fix is to turn the whole lifecycle into a loop where every stage leaves a file for the next one.

### পুরনো SDLC একটা রিলে দৌড় · The traditional SDLC is a relay race

**SDLC** মানে Software Development Life Cycle: একটা software ভাবনা থেকে production পর্যন্ত যে পথে যায়। পথটা ছয় ধাপের: **Plan, Design, Build, Test, Deploy, Maintain।**

পুরনো নিয়মে প্রতিটা ধাপের মালিক আলাদা মানুষ বা team। এক ধাপ শেষ হলে কাজটা পরের জনের হাতে যায় document, ticket বা sign-off দিয়ে। ঠিক রিলে দৌড়ের মতো: **একজন baton না দেওয়া পর্যন্ত পরের জন দৌড়াতে পারে না।**

| Stage | কে করে | কী হাতবদল হয় |
|---|---|---|
| Plan | Product team, committee | Requirements document |
| Design | Analyst, designer | Spec, mockup |
| Build | Developer | Code |
| Test | QA team | Test report, sign-off |
| Deploy | Release manager | Release approval |
| Maintain | Ops, support | Bug ticket |

আরেকটা ব্যাপার খেয়াল করুন। পুরনো SDLC-র **নিয়ম আর control ধরে নেয় যে প্রতিটা কাজ একজন মানুষ করেছে।** যেমন "প্রতিটা line একজন senior review করবেন"। মানুষ যখন code লিখত, এই নিয়ম যুক্তিসঙ্গত ছিল।

*In English: the traditional SDLC passes work through six stages, each owned by a different role, and its controls assume a human did every step.*

### Build দ্রুত হলে কী হয় · When the build stage gets fast

এবার ধরুন Claude আসার পর Build ধাপ কয়েক সপ্তাহ থেকে কয়েক ঘণ্টায় নেমে এলো। পুরো project কি ততটাই দ্রুত হলো? **না। বাকি ধাপগুলো এখনো মানুষের গতিতে চলে।**

<figure class="diagram">
<svg viewBox="0 0 560 190" role="img" aria-label="Two timelines. Before: plan, design, a long build, test and deploy. After: the build shrinks to a thin sliver, but plan, design, test and deploy keep their length, so the total barely changes">
<text class="start" x="10" y="50">before</text>
<rect class="node up" x="80" y="30" width="92" height="40"/><text x="126" y="50">plan</text>
<rect class="node up" x="172" y="30" width="69" height="40"/><text x="206" y="50">design</text>
<rect class="node down" x="241" y="30" width="161" height="40"/><text x="321" y="50">build</text>
<rect class="node up" x="402" y="30" width="69" height="40"/><text x="436" y="50">test</text>
<rect class="node up" x="471" y="30" width="69" height="40"/><text x="505" y="50">deploy</text>
<text class="start" x="10" y="130">after</text>
<rect class="node up" x="80" y="110" width="92" height="40"/><text x="126" y="130">plan</text>
<rect class="node up" x="172" y="110" width="69" height="40"/><text x="206" y="130">design</text>
<rect class="node down" x="241" y="110" width="8" height="40"/>
<rect class="node up" x="249" y="110" width="69" height="40"/><text x="283" y="130">test</text>
<rect class="node up" x="318" y="110" width="69" height="40"/><text x="352" y="130">deploy</text>
<text class="note" x="465" y="130">still weeks</text>
<text class="note" x="245" y="172">build: weeks → hours</text>
</svg>
<figcaption>Build collapses, but the human-speed stages around it keep their length. Build প্রায় শূন্যে নেমে এসেছে, কিন্তু চারপাশের মানুষের গতির ধাপগুলো আগের মতোই লম্বা।</figcaption>
</figure>

একটা কারখানার কথা ভাবুন। একটা machine হঠাৎ দশ গুণ দ্রুত হয়ে গেল, কিন্তু quality check আর packing এখনো হাতে হয়। ফল কী? **quality check-এর সামনে বাক্সের স্তূপ জমে।** Software-এও ঠিক এই তিনটা জিনিস ঘটে:

1. **Bottleneck দুই পাশে সরে যায়।** Build-এর আগের (plan) আর পরের (review, test, deploy) ধাপগুলো এখন সবচেয়ে ধীর।
2. **পুরনো control আর বাস্তবের সাথে মেলে না।** মানুষ একটা feature লিখলে প্রতিটা line পড়া সম্ভব। Agent যখন বেশিরভাগ diff লেখে, হাতে প্রতিটা line পড়া আর সম্ভব থাকে না।
3. **Governance-এর খরচ বাড়ে।** নিয়মের ব্যতিক্রম (exception) এখনো সাপ্তাহিক বা মাসিক meeting-এ যায়। Code ঘণ্টায় তৈরি হয়, অনুমতি আসে মাসে।

*In English: when build gets fast, the bottleneck moves to plan, review, test and deploy, the old controls stop fitting, and governance meetings get more expensive.*

#### একটা উদাহরণ: security team

Security team-এর আকার ঠিক করা হয়েছিল **মানুষের লেখা code-এর পরিমাণ** দেখে। এখন agent কয়েক গুণ বেশি code লিখছে। তাহলে দুটো পথ খোলা:

- Review-এর লাইন লম্বা হতে থাকবে, release আটকে থাকবে।
- অথবা ঠিকমতো review ছাড়াই code production-এ যাবে।

একটা bank বা hospital-এর মতো regulated প্রতিষ্ঠান **দুটোর কোনোটাই মানতে পারে না।** তাই security আর policy check-কেও agent-এর গতিতে চলতে হবে। শুধু Build বদলালে চলবে না, **পুরো SDLC বদলাতে হবে।**

*In English: security teams were sized for human output, so their checks must now run at agent speed, or review queues grow and risky code ships.*

### AI-native SDLC কী · A loop, not a line

**AI-native SDLC** মানে নতুন করে সাজানো একটা process। **লক্ষ্য একই থাকে, প্রয়োগের উপায় বদলায়।** পুরনো control-এর উদ্দেশ্য (ভুল code যেন না যায়, কে কী অনুমোদন করেছে তার রেকর্ড থাকে) সবই থাকে। শুধু সেগুলো এখন চলে tool আর automation দিয়ে।

তিনটা বড় বদল:

- **সরল রেখা না, loop।** Maintain থেকে পাওয়া সমস্যা আবার Plan-এ ফিরে যায়।
- **প্রতিটা ধাপে AI।** শুধু Build-এ না, Plan থেকে Maintain পর্যন্ত।
- **হাতবদল automatic।** এক ধাপ শেষ হলে পরের ধাপ নিজে থেকে শুরু হয়, কারো email-এর অপেক্ষা না করে।

এই একই ধারণাকে অনেকে **agentic SDLC**, **AI SDLC** বা **agentic software development** বলেন। নাম আলাদা, জিনিস একই।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>একটা সরল রেখা। প্রতিটা ধাপের মালিক আলাদা। হাতবদল হয় document আর meeting দিয়ে। Control মানে মানুষ সব দেখবে।</div>
<div><b>AI-NATIVE · নতুন পথ</b>একটা loop। প্রতিটা ধাপে Claude কাজ করে। হাতবদল হয় commit করা file দিয়ে। Control চলে hook আর check হিসেবে, মানুষ দেখে শুধু gate-এ।</div>
</div>

*In English: an AI-native SDLC keeps the old control goals but enforces them with automation, turns the line into a loop, and puts AI in every stage.*

### ছয় stage-এ কী বদলায় · The six shifts

নিচের table-এ দুই প্রান্ত দেখানো হলো। **বেশিরভাগ প্রতিষ্ঠান এই দুই column-এর মাঝামাঝি কোথাও আছে।** কেউই একদিনে বাঁ দিক থেকে ডান দিকে চলে যায় না।

| Stage | পুরনো | AI-native |
|---|---|---|
| Plan | Committee, workshop, হাতে লেখা requirements | Claude সমস্যা থেকে সরাসরি `intent.md` লেখে |
| Design | Analyst spec লেখে, designer সেটা পড়ে | এক session-এ requirements আর design, skill মেনে |
| Build | হাতে code, documentation পরে | Claude code আর test লেখে, জ্ঞান থাকে `CLAUDE.md` আর skill-এ |
| Test | প্রতিটা ধাপের শেষে QA gate | কাজের ভেতরেই চলমান eval |
| Deploy | মানুষ প্রতিটা line পড়ে | কয়েক স্তরের agent review, hook দিয়ে gate |
| Maintain | মানুষ production পাহারা দেয় | Agent পাহারা দেয়, সমস্যা পেলে নতুন `intent.md` লেখে |

*In English: in every stage, a human-run document or meeting becomes an AI-run step that writes a file, with humans reviewing at the gates.*

### Artifact chain · প্রতিটা stage একটা file রেখে যায়

ডান column-এর মধ্যে একটা সুতো আছে: **commit করা artifact।** Artifact মানে কাজের ফলাফল হিসেবে রেখে যাওয়া একটা file। প্রতিটা stage শেষ হয় একটা file git-এ commit করে, আর পরের stage শুরু হয় সেই file পড়ে।

- **শুরুর দিকের stage-এ artifact হলো `.md` file।** কারণ product owner আর agent দুজনেই একই file পড়তে আর বুঝতে পারে।
- **Build থেকে artifact হলো code আর তার রেকর্ড:** diff, test, PR, review-এর মন্তব্য।

আমাদের result portal-এর উদাহরণে git history দেখতে এমন হবে:

```text
$ git log --oneline --reverse
a1c03f2  intent: result status page        (exam office, PO approved)
b7e1d90  spec: result status page          (PO reviewed, security flag fixed)
c42aa18  plan: files, order, tests         (engineer accepted)
d9f0b33  feat: status page + 14 tests      (Claude, tests green)
e3b27c1  merge PR #212                     (review passes + code owner)
f81d4e6  incident: slow page in result week -> new intent
```

এই commit-গুলো একসাথে **audit trail**: কে কী চেয়েছিল, agent কী বানাল, আর কে অনুমোদন দিল। আলাদা করে report লিখতে হয় না, **git history নিজেই report।**

> [!IMPORTANT]
> **দায় এখনো মানুষের।** যে সিদ্ধান্তে বিচার-বুদ্ধি লাগে, তার দায়িত্ব মানুষেরই থাকে। বদলায় শুধু মানুষের মনোযোগ কোথায় যাবে: প্রতিটা line পড়ার বদলে মানুষ পড়েন intent, spec, plan আর review-এর ফলাফল।

*In English: each stage commits an artifact the next stage reads, and the chain of commits doubles as the audit trail, while humans stay accountable for every judgment call.*

### Play কী · What a play is

Football team-এর playbook-এ প্রতিটা "play" হলো আগে থেকে ঠিক করা একটা চাল। **এই playbook-এর play হলো SDLC বদলানোর একেকটা কাজ,** যেমন "CLAUDE.md লেখো" বা "PR review-এ Claude বসাও"। Play-গুলো ছয়টা stage-এ ভাগ করা।

প্রতিটা play পাঁচটা প্রশ্নের উত্তর দেয়:

1. **What changes:** কী বদলায়, পুরনো আর নতুন পাশাপাশি।
2. **Getting started:** শুরু করতে কী লাগবে (prerequisite আর infrastructure)।
3. **Steps:** ধাপে ধাপে কী করতে হবে।
4. **Governance:** নিয়ম মানা হলো কিনা, তার প্রমাণ কোথায় থাকে।
5. **Measure:** কাজ করল কিনা, কোন সংখ্যা দেখে বুঝবেন।

Play-গুলো **modular**: সব একসাথে করতে হবে না। যে stage-এ আপনার সবচেয়ে বেশি ব্যথা, সেখান থেকে শুরু করুন। তবে কিছু play অন্য play-এর উপর নির্ভর করে। **যে play-এর কোনো prerequisite নেই (✅), সেটা দিয়ে আজই শুরু করা যায়।**

| Play | Stage | আগে লাগবে |
|---|---|---|
| intent.md লেখা | Plan | ✅ কিছু না |
| এক session-এ requirements + design | Design | intent.md, skills |
| Plan mode দিয়ে শুরু | Build | intent বা spec |
| CLAUDE.md | Build | ✅ কিছু না |
| Skills + build hooks | Build | ✅ কিছু না |
| Parallel sessions + subagents | Build | CLAUDE.md |
| Feedback loop | Test | ✅ কিছু না |
| Continuous evals | Test | CLAUDE.md, feedback loop |
| PR review loop | Deploy | CLAUDE.md, skills, subagents |
| Hooks as approval gates | Deploy | ✅ কিছু না |
| CI/CD integration | Deploy | PR review loop, approval hooks |
| Closing the loop | Maintain | intent.md, PR review, hooks, CI/CD |

Maintain stage-এ আরও দুটো tool আছে, **Claude Security** আর **Claude Tag**। Chapter 6-এ এদের দেখব।

*In English: a play is one modular change to the lifecycle, with five parts; start with any play that has no prerequisites.*

### Trigger: হাতে চালানো থেকে নিজে চলা loop · From manual prompts to a self-running loop

Artifact chain-এর আসল শক্তি এখানে। **একটা artifact commit হওয়াই পরের stage-এর trigger।**

- Accepted `intent.md` → requirements আর design শুরু।
- Approved `spec.md` → plan mode শুরু।
- Merged PR → CI/CD pipeline শুরু।
- Production-এ সীমা ভাঙলে → নতুন `intent.md` লেখা হয়, loop আবার ঘোরে।

<div class="versus">
<div><b>শুরুতে · DAY ONE</b>প্রতিটা ধাপ আপনি নিজে prompt করে চালান। Intent লেখা হলে আপনিই spec চাইবেন, spec হলে আপনিই plan চাইবেন।</div>
<div><b>শেষ লক্ষ্য · END STATE</b>প্রতিটা accepted artifact নিজেই পরের gate চালু করে। মানুষ প্রতিটা ধাপ শূন্য থেকে শুরু করেন না, শুধু gate-এ বসে agent যা flag করেছে সেটা দেখেন।</div>
</div>

*In English: committing an artifact fires the next stage; you start by prompting each step by hand and grow toward a loop where humans only review at the gates.*

### একটা কাজ ধরে দেখি · One idea, start to finish

Result portal-এর গল্পটা পুরো loop ধরে এক নজরে দেখি। পরের chapter-গুলোতে প্রতিটা ধাপ বিস্তারিত দেখব।

1. **Plan:** Exam office-এর একজন কর্মকর্তা Claude-এর সাথে কথা বলে `intent.md` লিখলেন: "ছাত্ররা result বেরিয়েছে কিনা জানতে প্রতিদিন শত শত বার phone করে।"
2. **Design:** Product owner intent অনুমোদন দিলেন। Claude university-র security আর UX skill মেনে `spec.md` লিখল, একটা privacy ঝুঁকি flag করল।
3. **Build:** Engineer plan mode-এ `plan.md` বানালেন, তারপর Claude code আর test লিখল।
4. **Test:** Claude নিজেই test চালিয়ে ভুল ঠিক করল, তারপর engineer-কে দেখাল।
5. **Deploy:** Review agent PR দেখল, code owner অনুমোদন দিলেন, pipeline release করল।
6. **Maintain:** Result-এর সপ্তাহে page ধীর হলো। Monitoring সেটা ধরল আর নতুন `intent.md` লিখল। Loop আবার শুরু।

### কেন এটা আপনার জানা দরকার

- **আপনার team-এ AI coding tool আছে, কিন্তু release আগের মতোই ধীর?** কারণ সম্ভবত bottleneck এখন Build-এ না, তার দুই পাশে।
- **কোথা থেকে শুরু করবেন, সেটা ✅ চিহ্নিত play বলে দেয়।** CLAUDE.md বা feedback loop-এর মতো play আজই একা শুরু করা যায়।
- **Regulated কাজে (finance, health) AI ব্যবহারের প্রশ্নে** artifact chain-ই উত্তর: প্রতিটা সিদ্ধান্তের লিখিত রেকর্ড থাকে।

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Claude দিয়ে Build ধাপ দশ গুণ দ্রুত হলো। পুরো project কি দশ গুণ দ্রুত শেষ হবে?</summary>

না। Plan, review, test আর deploy এখনো মানুষের গতিতে চলে। **Bottleneck শুধু Build থেকে সরে তার দুই পাশে চলে যায়।** তাই পুরো SDLC বদলাতে হয়, শুধু Build না।

</details>

<details class="quiz">
<summary>২. AI-native SDLC-তে "audit trail" আলাদা করে লিখতে হয় না কেন?</summary>

কারণ **প্রতিটা stage একটা artifact git-এ commit করে।** intent, spec, plan, diff, PR আর review-এর commit মিলে নিজেই দেখায় কে কী চেয়েছিল, agent কী বানাল আর কে অনুমোদন দিল।

</details>

<details class="quiz">
<summary>৩. আপনার team এই playbook কাল থেকে শুরু করতে চায়। "CI/CD integration" play দিয়ে শুরু করা কি ঠিক হবে?</summary>

না। CI/CD integration-এর আগে **PR review loop আর approval hooks** লাগবে। Gate তৈরি না করে automation চালালে ঝুঁকিও দ্রুত production-এ যায়। শুরু করুন ✅ চিহ্নিত play দিয়ে, যেমন CLAUDE.md বা hooks as approval gates।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **Code দ্রুত হলে bottleneck সরে যায়** plan, review, test আর deploy-তে।
> - **AI-native SDLC একটা loop:** প্রতিটা stage একটা file লেখে, পরের stage সেটা পড়ে।
> - **Commit-এর chain-ই audit trail,** আর দায় এখনো মানুষের।
> - **Play modular:** prerequisite নেই এমন play দিয়ে শুরু করুন।

## 1. Plan · ভাবনা থেকে intent.md

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** `intent.md` কী, কারা কীভাবে লেখে, কোথায় রাখতে হয়, আর এই ধাপ ঠিকমতো কাজ করছে কিনা কীভাবে মাপবেন।
>
> **In short:** Ideas stop waiting for someone to write them up. The person with the idea brainstorms with Claude and commits the result as intent.md, a short file both humans and agents can act on.

### কী বদলায় · What changes

পুরনো পথে একটা ভাবনা কাজে পরিণত হতে অনেক ঘাট পেরোয়: backlog-এ entry, user story, story point, refinement meeting। **প্রতিটা হাতবদলে মালিকানা বদলায়।** তাই engineering পর্যন্ত যা পৌঁছায়, সেটা মূল মানুষের ভাবনা থেকে কয়েক ধাপ দূরে।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Exam office-এর কর্মকর্তার একটা ভাবনা আছে। তাঁকে প্রথমে product team-এর কাউকে রাজি করাতে হবে, যিনি ভাবনাটা নিজের ভাষায় লিখবেন। তারপর story, estimate, meeting। কয়েক সপ্তাহ পার।</div>
<div><b>AI-NATIVE · নতুন পথ</b>কর্মকর্তা নিজেই Claude-এর সাথে কথা বলে ভাবনাটা পরিষ্কার করেন। ফলাফল একটা <code>intent.md</code>: কী চাই, কেন চাই, কোন শর্তে। তাঁর নিজের ভাষায়, কয়েক ঘণ্টায়।</div>
</div>

**intent.md** হলো একটা **proto-spec**: পুরো spec না, তবে spec-এর বীজ। এর তিনটা গুণ:

- **মানুষ পড়তে পারে:** সাধারণ markdown, কোনো বিশেষ tool লাগে না।
- **Version-controlled:** git-এ থাকে, প্রতিটা পরিবর্তনের রেকর্ড থাকে।
- **Machine actionable:** পরের stage-এর agent সরাসরি পড়ে কাজ শুরু করতে পারে।

*In English: instead of passing an idea through backlog, stories and meetings, the originator writes it down with Claude as intent.md, a readable, versioned file the next stage can act on.*

### intent.md কোথা থেকে আসে · Three ways in

একটা `intent.md` তিনটা পথে আসতে পারে:

<figure class="diagram">
<svg viewBox="0 0 560 230" role="img" aria-label="Three sources, an idea, a ticket and a production alert, all lead to a draft intent.md. The product owner reviews the draft before it is committed">
<defs><marker id="sdlc-plan-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node" x="20" y="20" width="150" height="44" rx="10"/><text x="95" y="42">a person's idea</text>
<rect class="node" x="20" y="88" width="150" height="44" rx="10"/><text x="95" y="110">a ticket</text>
<rect class="node up" x="20" y="156" width="150" height="44" rx="10"/><text x="95" y="178">an alert</text>
<rect class="node down" x="230" y="88" width="130" height="44" rx="10"/><text x="295" y="110">intent.md</text>
<rect class="node" x="410" y="88" width="130" height="44" rx="10"/><text x="475" y="110">PO review</text>
<path class="arrow" d="M170 42 L228 100" marker-end="url(#sdlc-plan-arrow)"/>
<path class="arrow" d="M170 110 L228 110" marker-end="url(#sdlc-plan-arrow)"/>
<path class="arrow" d="M170 178 L228 120" marker-end="url(#sdlc-plan-arrow)"/>
<path class="arrow" d="M360 110 L408 110" marker-end="url(#sdlc-plan-arrow)"/>
<text class="note" x="295" y="70">draft</text>
<text class="note" x="475" y="152">then commit</text>
<text class="note" x="95" y="218">from Stage 6</text>
</svg>
<figcaption>Whatever the source, the product owner checks the draft before it is committed. উৎস যা-ই হোক, commit-এর আগে product owner draft-টা দেখে ঠিক করেন।</figcaption>
</figure>

1. **একজন মানুষের ভাবনা।** কেউ Claude-এর সাথে brainstorm করে লেখেন।
2. **একটা ticket।** কেউ bug বা feature request জমা দিয়েছেন।
3. **একটা alert।** Production-এ কিছু গোলমাল হয়েছে, monitoring agent সেটা ধরেছে (Chapter 6)।

উৎস মানুষ হোক বা agent, **নিয়ম একটাই: commit-এর আগে product owner (PO) draft-টা পড়ে ঠিক করেন।** Agent-এর লেখা intent সরাসরি loop-এ ঢোকে না।

*In English: intent can come from an idea, a ticket or an alert, and in every case the product owner reviews the draft before it is committed.*

### শুরু করতে কী লাগবে · Getting started

**Prerequisite: কিছু না।** এই play একদম প্রথম দিন থেকেই শুরু করা যায়। তবে তিনটা জিনিস ঠিক করে রাখতে হবে:

| লাগবে | কেন |
|---|---|
| Engineer না, এমন মানুষের জন্য Claude access | ভাবনা যার, লিখবেনও তিনি। যেমন claude.ai বা Cowork। |
| একটা intent.md template | সবার intent একই কাঠামোয় আসবে। |
| intent রাখার একটা shared জায়গা | PO এখানে নজর রাখেন। |

**কোথায় রাখবেন?** একটা product হলে সবচেয়ে সহজ জায়গা হলো product-এর repo-তেই একটা `intent/` folder। এতে artifact chain থাকে code-এর পাশেই। Intent অনেক repo জুড়ে ছড়ালে তবেই আলাদা intent repo বানানোর ঝামেলা নেওয়া যুক্তিসঙ্গত। Monorepo হলে এটা শুধু একটা directory।

```text
result-portal/
├── intent/
│   ├── result-status-page.md
│   └── guardian-sms.md
├── src/
└── CLAUDE.md
```

এটা একবারের কাজ, platform বা engineering team করবে। একজন technical মানুষকে ঠিক করতে হবে **কে এখানে লিখতে পারবে,** কারণ পুরো প্রতিষ্ঠান থেকে মানুষ এখানে intent পাঠাবেন।

> [!TIP]
> **Git না জানলেও চলবে।** Repo একবার তৈরি হলে, git-এর সাথে একটা connector (যেমন GitHub) যুক্ত করুন। তখন exam office-এর কর্মকর্তা claude.ai থেকেই বলবেন "এটা commit করো", আর Claude তাঁর হয়ে file commit করবে।

*In English: no prerequisites; you need Claude access for non-engineers, a template, and a shared home such as an intent/ folder in the product repo, and a git connector lets non-engineers commit without touching git.*

### ধাপে ধাপে · How to run it

**১. নিজের ভাষায় সমস্যা বলুন।** আজ কী করা যায় না, কারা ভোগে, ভালো হলে দেখতে কেমন, কোনটা এই কাজের বাইরে। কোনো formal ভাষা লাগে না।

**২. Brainstorm করুন যতক্ষণ না ভাবনাটা স্পষ্ট হয়।** Claude একজন analyst-এর মতো প্রশ্ন করে: scope কতটা, user কারা, কী শর্ত আছে, সফলতা দেখতে কেমন।

<div class="chat">
<div class="msg user"><span class="role">exam office</span>Result বের হওয়ার সপ্তাহে ছাত্ররা সারাদিন phone করে জিজ্ঞেস করে result বেরিয়েছে কিনা। আমরা অন্য কাজ করতে পারি না।</div>
<div class="msg assistant"><span class="role">claude</span>বুঝলাম। কয়েকটা প্রশ্ন: দিনে আনুমানিক কতগুলো এমন call আসে? ছাত্ররা কি portal-এ login করতে পারে? আর result "on hold" থাকলে, তার কারণ কি ছাত্রকে দেখানো যাবে?</div>
<div class="msg user"><span class="role">exam office</span>দিনে প্রায় ৪০০ call। Login আছে। Hold-এর কারণ দেখানো যাবে না, শুধু "অফিসে যোগাযোগ করুন" বলা যাবে।</div>
<div class="msg assistant"><span class="role">claude</span>তাহলে সফলতা মানে: result-এর সপ্তাহে status জানতে call অর্ধেকের নিচে নামা। Marks কি এই page-এ দেখাব, নাকি শুধু status?</div>
</div>

**৩. Template ধরে intent.md লিখতে বলুন।** Template-টা একটা **skill** হিসেবে রাখা ভালো, যেটা একজন technical সদস্য বানাবেন আর একজন lead অনুমোদন দেবেন। তাহলে প্রতিবার Claude নিজেই সঠিক কাঠামো মানবে। Template-এ পাঁচটা অংশ থাকে:

📄 `intent/result-status-page.md`

```markdown
# Intent: result status page for students
Author: Exam office (N. Akter). Status: draft.

## Problem
In result week, students phone the exam office to ask if results are out.
The office gets about 400 such calls a day and other work stops.

## Proposed outcome
Students see their result status (pending, published, on hold)
on the portal, with the expected publish date.

## Affected users and systems
Students, exam office staff, the portal team, the results database.

## Constraints
Show no marks until the result is officially published.
Use the existing student login. Never show the reason for a hold.

## Open questions
Should guardians get an SMS when the status changes?
```

**৪. Claude যা ভুল বুঝেছে, ঠিক করুন।** Draft-টা আপনার ভাবনা কিনা, সেটা আপনিই সবচেয়ে ভালো জানেন।

**৫. Shared জায়গায় commit করুন।** Author আর সময় নিজে থেকেই রেকর্ডে যোগ হয়। এখান থেকে product owner ভাবনাটা হাতে নেন।

*In English: describe the problem, brainstorm until it is concrete, have Claude write intent.md from the template skill, correct it, and commit it to the shared home.*

#### Template-এর পাঁচ অংশ

| অংশ | প্রশ্ন | আমাদের উদাহরণে |
|---|---|---|
| Problem | আজ কী সমস্যা? | দিনে ৪০০ status call |
| Proposed outcome | ভালো হলে কেমন? | Portal-এ status আর তারিখ |
| Affected users and systems | কারা, কোন system? | ছাত্র, অফিস, results DB |
| Constraints | কোন শর্ত মানতেই হবে? | Marks না, hold-এর কারণ না |
| Open questions | কী এখনো জানি না? | Guardian SMS? |

**Open questions অংশটা খালি রাখবেন না।** এটা পরের stage-কে বলে দেয় কোন সিদ্ধান্ত এখনো বাকি। Design stage-এ spec লেখার সময় এগুলোর উত্তর দিতে হবে, অথবা সামনে বয়ে নিতে হবে।

### Governance · প্রমাণ কোথায় থাকে

আলাদা কোনো register লাগে না। **প্রমাণ হলো commit করা `intent.md` নিজেই:**

- **কে লিখেছে আর কখন:** git-এর author আর timestamp।
- **কী কী বদলেছে:** পুরো revision history।
- **কে অনুমোদন দিল:** PO intent-টা Design stage-এ পাঠালে সেটা merge হিসেবে রেকর্ড হয়। বাতিল করলে review বন্ধ হয়, সেটাও রেকর্ড।

*In English: the committed intent.md is the evidence: git records the author, time and every revision, and the merge or closed review records the product owner's decision.*

### কীভাবে মাপবেন · How to measure it

প্রতিটা play দুই ধরনের সংখ্যা দেখে। **Leading indicator** আগে নড়ে, তাই দ্রুত বোঝা যায় ঠিক দিকে যাচ্ছি কিনা। **Lagging indicator** পরে নড়ে, কিন্তু আসল ফল দেখায়।

| ধরন | কী মাপবেন | কোথা থেকে | কী আশা করবেন |
|---|---|---|---|
| Leading | প্রথম কথা থেকে committed intent.md পর্যন্ত সময় | Intent repo-র git history | কয়েক সপ্তাহ থেকে কয়েক ঘণ্টা |
| Lagging | Survival rate: কত intent PO গ্রহণ করলেন | Merge বনাম বন্ধ review | বেশি হলে intent-এর মান ভালো |
| Lagging | Spec শুরুর পর intent কতবার বদলাল | একই কাজের git history | কম হলে intent শুরুতেই স্পষ্ট ছিল |

*In English: the leading measure is time from first conversation to committed intent; the lagging ones are how many intents the product owner accepts and how often an intent changes after the spec starts.*

### কেন এটা আপনার জানা দরকার

- **ভাবনা হারিয়ে যায় না।** যার মাথায় ভাবনা, তিনিই লেখেন। মাঝখানে কেউ "অনুবাদ" করে না।
- **Engineer-রা পরিষ্কার input পান।** Problem, শর্ত আর খোলা প্রশ্ন শুরু থেকেই লেখা থাকে।
- **এটা সবচেয়ে সহজ শুরু।** কোনো prerequisite নেই, একটা folder আর একটা template হলেই চলে।

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Monitoring agent একটা alert থেকে নিজেই intent.md লিখেছে। এটা কি সরাসরি Design stage-এ চলে যাবে?</summary>

না। **উৎস মানুষ হোক বা agent, commit-এর আগে product owner draft-টা পড়ে ঠিক করেন।** তারপর PO গ্রহণ করলে তবেই Design শুরু হয়।

</details>

<details class="quiz">
<summary>২. একটা ছোট startup, একটাই product। intent কোথায় রাখা উচিত?</summary>

**Product repo-র ভেতরে একটা `intent/` folder-এ।** এতে intent থাকে code-এর পাশে, আর artifact chain এক জায়গায় থাকে। আলাদা intent repo লাগে শুধু যখন intent অনেক repo জুড়ে ছড়ায়।

</details>

<details class="quiz">
<summary>৩. আপনার team-এর ১০০টা intent-এর মধ্যে PO মাত্র ২০টা গ্রহণ করেছেন। এই সংখ্যা কী বলে?</summary>

এটা **survival rate**, একটা lagging indicator। ২০% মানে বেশিরভাগ intent কাজে লাগার মতো না। হয়তো template দুর্বল, অথবা brainstorm যথেষ্ট গভীর হচ্ছে না। Template skill আর Claude-এর প্রশ্নগুলো উন্নত করার সময়।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **intent.md একটা proto-spec:** কী চাই, কেন চাই, কোন শর্তে।
> - **ভাবনা যার, লিখবেন তিনি,** Claude-এর সাথে brainstorm করে।
> - **Commit-এর আগে PO review** সব সময়, উৎস যা-ই হোক।
> - **মাপুন:** intent লিখতে সময়, আর কত intent টিকে থাকে।

## 2. Design · এক session-এ spec

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** requirements আর design কীভাবে একটা session-এ মিশে যায়, skill কীভাবে policy শুরু থেকেই মানায়, আর এই ধাপ কীভাবে হাতে চালানো থেকে automatic হয়।
>
> **In short:** Requirements and design collapse into one session. Claude turns the accepted intent.md into spec.md while the organization's skills apply policy, and the product owner reviews instead of writing.

### কী বদলায় · What changes

পুরনো পথে requirements আর design **দুটো আলাদা ধাপ, দুটো আলাদা team।** Analyst ভাবনাকে requirements-এ রূপ দেন, তারপর designer সেটা পড়ে design বানান। দায়িত্ব ভাগ করার জন্য এই বিভাজন। কিন্তু এটা **ধীর, আর প্রতিটা হাতবদলে কিছু অর্থ হারায়।**

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Analyst requirements লেখেন। Designer সেটা পড়ে design বানান। Security বা compliance-এর সমস্যা ধরা পড়ে কয়েক সপ্তাহ পরে, review-এর সময়।</div>
<div><b>AI-NATIVE · নতুন পথ</b>Claude accepted <code>intent.md</code> থেকে এক session-এই requirements আর design spec লেখে। Brand, security, compliance, UX-এর skill লেখার সময়েই মানা হয়। Product owner শুধু review করেন।</div>
</div>

এখানে একটা নতুন শব্দ: **skill।** Skill হলো লিখিত নিয়মের একটা file, যেটা Claude দরকারের সময় পড়ে মানে। যেমন "ছাত্রের তথ্য কখনো log-এ যাবে না"। Chapter 3-এ skill বিস্তারিত দেখব। এখানে শুধু জানুন: **প্রতিষ্ঠানের policy যখন skill হিসেবে লেখা থাকে, Claude spec লেখার সময়েই সেগুলো মানে।**

**Front-end কাজে** এটা সবচেয়ে স্পষ্ট দেখা যায়। Intent গ্রহণ হলে product owner **Claude Design (beta)**-তে intent থেকে screen-এর mockup বানান, কয়েকবার ঠিক করেন, তারপর সেটা Claude Code-এ পাঠিয়ে দেন build-এর জন্য।

*In English: requirements and design become one Claude session that turns intent.md into spec.md, with policies applied as skills while it writes; for UI work, the product owner mocks screens in Claude Design.*

### শুরু করতে কী লাগবে · Getting started

| লাগবে | কেন |
|---|---|
| একটা accepted `intent.md` | Spec এটা থেকেই তৈরি হয় |
| Brand, security, compliance, UX policy, skill হিসেবে লেখা | Claude যেন লেখার সময়েই নিয়ম মানে |
| Claude access সহ একজন product owner | **কোনো engineering দক্ষতা লাগে না** |

### ধাপে ধাপে · How to run it

**১. Session খুলুন।** Product owner প্রতিষ্ঠানের skill-গুলো চালু রেখে একটা session খোলেন আর `intent.md` attach করেন।

**২. Prompt দিন।** Prompt-এ তিনটা জিনিস থাকবে: intent-এর দিকে ইশারা, শর্তগুলোর নাম, আর **"সমস্যা থাকলে flag করো"**। আমাদের নিজের ভাষায় একটা prompt:

```text
Read intent/result-status-page.md and write a requirements and design
spec for adding it to our portal. Use the available skills so the spec
follows our privacy, accessibility and brand rules. Save it as
spec/result-status-page.md. List every concern you find, and say
clearly where two rules conflict and you could not satisfy both.
```

Claude spec লেখে, আর যেখানে নিয়মে টান পড়ে সেটা আলাদা করে দেখায়:

<div class="chat">
<div class="msg assistant"><span class="role">claude · flagged concern</span>⚠️ Intent-এর open question বলছে guardian-দের SMS পাঠানো যায় কিনা। কিন্তু student-data-privacy skill বলছে guardian-কে কোনো বার্তা পাঠাতে ছাত্রের সম্মতি লাগবে, আর সম্মতির কোনো রেকর্ড এখন database-এ নেই। আমি SMS অংশটা spec থেকে বাদ রেখে "পরের ধাপ" হিসেবে লিখেছি। Privacy owner-এর সিদ্ধান্ত লাগবে।</div>
</div>

**৩. Spec-কে ভাবনার সাথে মিলিয়ে দেখুন।** একই product owner review করেন: spec কি আসল সমস্যার সমাধান করে? Intent-এর open question-গুলোর উত্তর হয়েছে, নাকি সামনে বয়ে নেওয়া হয়েছে?

**৪. আগে flag করা সমস্যাগুলো সামলান।** এগুলোই সেই বিষয়, যেগুলো আগে একজন analyst উপরে পাঠাতেন। **প্রতিটা flag-এর জন্য যে policy-র মালিক, তাঁর সাথে বসে সমাধান করুন,** engineering spec দেখার আগেই।

**৫. `spec.md` commit করুন `intent.md`-এর পাশে।** এই জোড়া file রেকর্ড রাখে: কী চাওয়া হয়েছিল, আর কী সিদ্ধান্ত হলো।

```text
result-portal/
├── intent/result-status-page.md   ← কী চাই
└── spec/result-status-page.md     ← কী ঠিক হলো
```

**৬. মানুষ সিদ্ধান্ত নেন।** Product owner ঠিক করেন spec Build-এ যাবে কিনা। প্রতিষ্ঠান যেটাকে বেশি ঝুঁকির কাজ বলে, সেখানে একজন tech lead-এর পরামর্শ নেন। **এই সিদ্ধান্ত সব সময় একজন মানুষ নেন,** আর spec গ্রহণ করাই Build stage-এর plan mode শুরু করে।

*In English: open a session with skills and the intent, prompt for a spec with flagged concerns, check it against the idea, resolve flags with policy owners, commit spec.md beside intent.md, and let a human decide whether it goes to build.*

### হাতে থেকে automatic · From manual to automatic

এই ধাপ তিনটা পর্যায়ে বড় হয়:

<figure class="diagram">
<svg viewBox="0 0 560 110" role="img" aria-label="Three steps of automation: a manual prompt on day one, then an organization slash command, then an automatic job that runs when intent.md is merged">
<defs><marker id="sdlc-design-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node" x="20" y="20" width="160" height="44" rx="10"/><text x="100" y="42">manual prompt</text>
<rect class="node" x="200" y="20" width="160" height="44" rx="10"/><text x="280" y="42">slash command</text>
<rect class="node down" x="380" y="20" width="160" height="44" rx="10"/><text x="460" y="42">auto on merge</text>
<path class="arrow" d="M180 42 L198 42" marker-end="url(#sdlc-design-arrow)"/>
<path class="arrow" d="M360 42 L378 42" marker-end="url(#sdlc-design-arrow)"/>
<text class="note" x="100" y="88">day one</text>
<text class="note" x="280" y="88">repeatable</text>
<text class="note" x="460" y="88">end state</text>
</svg>
<figcaption>First a person types the prompt, then the prompt becomes a shared command, and finally a merge triggers it. প্রথমে মানুষ prompt লেখেন, তারপর সেটা সবার জন্য একটা command হয়, শেষে merge হলেই নিজে চলে।</figcaption>
</figure>

1. **Manual prompt:** শুরুতে product owner হাতে prompt লেখেন।
2. **Slash command:** একই prompt প্রতিষ্ঠানের একটা slash command হয়ে যায়, যেমন `/write-spec`। সবাই একইভাবে চালায়।
3. **Auto on merge:** Intent home-এ `intent.md` merge হলেই একটা non-interactive job চলে। Job skill লোড করে spec লেখে আর `spec.md` একটা pull request হিসেবে জমা দেয় (plumbing-এর কথা Chapter 5-এর CI/CD play-তে)।

শেষ পর্যায়ে **product owner-এর প্রথম কাজই হয় review,** লেখা না।

### Governance · প্রমাণ কোথায় থাকে

- **Policy শুরুতেই মানা হয়,** কয়েক সপ্তাহ পরের review-এ ধরা পড়ে না। Skill spec-এর উপর শর্ত হিসেবে কাজ করে।
- **তিনটা জিনিস version control-এ থাকে:** spec নিজে, যে prompt দিয়ে spec বানানো হয়েছে, আর সেই সময় কোন version-এর skill চালু ছিল।
- **Product owner spec sign-off করেন,** আর flag করা সমস্যা নির্দিষ্ট policy owner-এর কাছে পাঠান।

### কীভাবে মাপবেন · How to measure it

| ধরন | কী মাপবেন | কোথা থেকে |
|---|---|---|
| Leading | `intent.md` commit থেকে `spec.md` commit পর্যন্ত সময়, পুরনো requirements + design চক্রের তুলনায় | দুটো git timestamp |
| Lagging | Build শুরুর পর requirements কতবার বদলাল: প্রথম `plan.md`-এর পরে কতগুলো `spec.md` commit | `git log` |

*In English: measure the time from intent commit to spec commit, and count spec changes made after the first plan.md, which shows rework.*

### কেন এটা আপনার জানা দরকার

- **Policy-র সমস্যা শুরুতেই ধরা পড়ে,** যখন ঠিক করা মানে শুধু একটা document বদলানো।
- **Product owner-এর সময় বাঁচে।** লেখার কাজ Claude-এর, বিচারের কাজ মানুষের।
- **"কেন এভাবে বানানো হলো?"** প্রশ্নের উত্তর পরেও পাওয়া যায়, কারণ intent আর spec পাশাপাশি commit করা।

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Design stage-এ spec কে লেখে, আর কে review করে?</summary>

**Claude লেখে, product owner review করেন।** Product owner spec-কে মূল ভাবনার সাথে মেলান, আর flag করা সমস্যা policy owner-দের সাথে সমাধান করেন।

</details>

<details class="quiz">
<summary>২. Claude দুটো policy-র মধ্যে বিরোধ পেলে কী করা উচিত?</summary>

**নিজে চুপচাপ একটা বেছে নেবে না, flag করবে।** Prompt-এ এটা স্পষ্ট চাওয়া হয়। তারপর product owner সেই policy-র মালিকের সাথে বসে সিদ্ধান্ত নেন, engineering spec দেখার আগেই।

</details>

<details class="quiz">
<summary>৩. Plan লেখা শুরু হওয়ার পর একই কাজের spec.md পাঁচবার বদলেছে। এটা কী ইঙ্গিত দেয়?</summary>

এটা lagging indicator: **requirements rework।** Spec শুরুতে যথেষ্ট পরিষ্কার ছিল না। হয়তো intent-এর open question ঠিকমতো সমাধান হয়নি, বা কোনো policy skill হিসেবে লেখা নেই।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **Requirements আর design এক session-এ,** Claude-এর হাতে।
> - **Policy skill হিসেবে লেখা থাকলে** spec লেখার সময়েই মানা হয়।
> - **Flag করা সমস্যা আগে,** policy owner-এর সাথে।
> - **spec গ্রহণের সিদ্ধান্ত সব সময় মানুষের।**

## 3. Build · plan, CLAUDE.md, skills, hooks

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** plan mode কেন সব কাজের শুরু, CLAUDE.md আর skill-এ কীভাবে team-এর জ্ঞান রাখতে হয়, hook কীভাবে নিয়মকে বাধ্যতামূলক করে, আর একজন engineer কীভাবে একসাথে কয়েকটা session চালান।
>
> **In short:** Nothing is built without an accepted plan. The team's knowledge becomes files the agent reads (CLAUDE.md, skills), and the guardrails run as code (hooks) rather than as habits.

এই stage-এ পাঁচটা play আছে। আগে একটা মানচিত্র দেখে নিই:

| Play | এক লাইনে |
|---|---|
| Plan mode | Code-এর আগে লিখিত plan, engineer অনুমোদন দেন |
| CLAUDE.md | নতুন সহকর্মীর জন্য যা জানা দরকার, agent-এর জন্য একটা file |
| Skills | প্রতিষ্ঠানের নিয়ম, যেটা দরকারের সময় Claude নিজে পড়ে |
| Build hooks | যে নিয়ম ভাঙা চলবে না, সেটা code দিয়ে আটকানো |
| Parallel sessions + subagents | একজন engineer, কয়েকটা কাজ একসাথে |

### Plan mode · আগে plan, পরে code

**Plan mode**-এ Claude পুরো codebase পড়তে পারে, কিন্তু **কোনো file বদলাতে পারে না।** Engineer approved `spec.md` দেন, Claude প্রশ্ন করে, plan লেখে, আর engineer সন্তুষ্ট না হওয়া পর্যন্ত plan বারবার ঠিক হয়।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Engineer design পড়ে code লেখা শুরু করেন। কোন file বদলাবে, কোন test লাগবে, সব তাঁর মাথায়। Reviewer প্রথম দেখেন তৈরি diff, তখন বদলানো ধীর আর দামি।</div>
<div><b>AI-NATIVE · নতুন পথ</b>কাজ শুরু হয় লিখিত plan দিয়ে। Engineer code লেখার আগেই plan ঠিক করেন। Approved plan <code>plan.md</code> হিসেবে commit হয়, পরের stage এটার সাথে মিলিয়ে দেখে।</div>
</div>

**Prerequisite:** intent বা spec থাকলে ভালো, আর CLAUDE.md থাকলে আরও ভালো। **Infrastructure:** repo-তে access সহ Claude Code।

**ধাপে ধাপে:**

1. **Plan mode-এ session শুরু করুন।**
2. **`intent.md` আর `spec.md` দিন।** Plan চান যেখানে থাকবে কোন file বদলাবে, কাজের ক্রম, আর কোন test প্রমাণ করবে যে কাজ হয়েছে।
3. **Plan-কে জেরা করুন।** "এই পরিবর্তনে কী ভাঙতে পারে?" "সবচেয়ে ঝুঁকির ধাপ কোনটা?" "কোন বিকল্প তুমি বাদ দিলে, আর কেন?"
4. **ততক্ষণ চালান, যতক্ষণ না একজন নতুন engineer শুধু plan পড়েই কাজটা করতে পারবেন।** কথোপকথন না দেখেই।
5. **Approved plan `plan.md` হিসেবে commit করুন।** এটা audit trail-এ যোগ হয়। পরে PR review (Chapter 5) চূড়ান্ত diff-কে এটার সাথে মিলিয়ে দেখে।
6. **Plan accept করুন, Claude implement করুক।** Plan মজবুত হলে implementation প্রায়ই এক চেষ্টাতেই হয়ে যায়।
7. **কাজ plan থেকে সরে গেলে, একই commit-এ `plan.md` update করুন।** দুটো মিল আছে কিনা, সেটা একটা hook দিয়েও যাচাই করা যায়।

📄 `plan/result-status-page.md`

```markdown
# Plan: result status page (from intent 2026-10-12)

## Files that change
src/server/results/status.ts (new), src/app/results/page.tsx (new),
tests/api/status.test.ts (new), src/app/nav.tsx

## Order of work
1. Read-only status query behind the existing student login.
2. Status page that calls the query.
3. Add a "Result status" link to the portal menu.

## Risks
Result week brings 20x normal traffic; cache the status for 60 seconds.

## Proof
status.test.ts covers pending, published and on hold;
marks never appear in the response before "published".
```

**Governance:** design review হয় **code লেখার আগে,** যখন দিক বদলানো মানে শুধু একটা document বদলানো। Plan mode নিজেই এটা নিশ্চিত করে, কারণ engineer plan accept না করা পর্যন্ত Claude file বদলাতে পারে না। Plan, তার প্রতিটা সংস্করণ আর কে accept করল, সব রেকর্ড থাকে। সাধারণ কাজ engineer নিজে অনুমোদন দেন, বেশি ঝুঁকির কাজ যায় tech lead বা architect-এর কাছে।

| ধরন | কী মাপবেন |
|---|---|
| Leading | কত শতাংশ পরিবর্তন প্রথম implementation-এই merge হয়, আর plan অনুমোদন থেকে merge পর্যন্ত সময় |
| Lagging | প্রতি পরিবর্তনে কতবার rework হলো, আর merged diff এখনো `plan.md`-এর সাথে মেলে কিনা |

*In English: start every change in plan mode, interrogate and commit the plan as plan.md, then implement; design review happens before any code exists.*

#### Auto mode · প্রতিটা edit-এ অনুমতি না চেয়ে

Claude Code **auto mode**-এও চলতে পারে। Engineer plan অনুমোদন দেওয়ার পর Claude প্রতিটা পরিবর্তন করে, **প্রতি edit-এ অনুমতি না চেয়ে।** পরের play-গুলোর guardrail যত পোক্ত হয় (ভালো CLAUDE.md, policy লেখা skill, ঝুঁকির কাজ আটকানো hook, আর Claude চালাতে পারে এমন test), routine কাজে auto mode তত স্বাভাবিক হয়ে ওঠে। Routine মানে: পরিষ্কার spec, ছোট প্রভাব, আর test-এ ঢাকা code।

এতে মানুষের ভূমিকা বদলায়: **agent-এর প্রতিটা edit দেখা থেকে, লম্বা session শেষে artifact review করা।** Worktree-র সাথে মিলিয়ে auto mode অনেক কাজ একসাথে চালাতে দেয়, আর Chapter 6-এর নিজে চলা loop-এর ভিত্তি এটাই।

#### পুরনো tool আর source of truth · Legacy systems

আপনার প্রতিষ্ঠানে artifact হয়তো এখনই আছে, শুধু markdown-এ না: কাজ Jira-তে, requirements কোনো traceability tool-এ, design Figma-তে, অনুমোদন change board-এ। **Auditor আর regulator এগুলো আগেই মেনে নিয়েছেন,** তাই এগুলো সরানো কঠিন। AI-native SDLC-কে এদের চারপাশে মানিয়ে নিতে হয়।

নিয়ম একটাই: **প্রতিটা artifact-এর জন্য একটা system-কে source of truth ঘোষণা করুন।** বাকি সবাই রাখবে copy বা link। তিনটা উপায়:

| উপায় | কীভাবে | কার জন্য ভালো |
|---|---|---|
| Repo-ই source of truth | Markdown file আসল রেকর্ড, পুরনো tool commit-এর link রাখে | Engineering-নেতৃত্বের প্রতিষ্ঠান: এক tool, এক timestamp |
| পুরনো tool-ই source of truth | Jira বা ServiceNow আসল, markdown কাজের copy। Claude session-এর শুরুতে রেকর্ড পড়ে, শেষে MCP connector দিয়ে ফল লিখে দেয় | যেখানে regulator পুরনো tool-কে মানে |
| শুধু link (ন্যূনতম) | প্রতিটা artifact-এ record ID, প্রতিটা record-এ commit SHA | রূপান্তরের শুরু, দুটো source মেনে নিয়ে |

*In English: for each artifact, name one system as the source of truth (the repo, the legacy tool, or at minimum a two-way link) so the old and new systems can coexist.*

### CLAUDE.md · নতুন সহকর্মীর জন্য একটা চিঠি

একজন নতুন developer team-এ এলে প্রথম দিন তাঁকে কী বলবেন? কোন command-এ build হয়, কোন নিয়ম মানতে হয়, code কোথায় কী আছে, আর **সবাই সাধারণত কোথায় ভুল করে।** **CLAUDE.md** হলো ঠিক এই কথাগুলো, Claude-এর জন্য। প্রতিটা session-এর শুরুতে Claude এটা পড়ে। আগে যে জ্ঞান মানুষের মাথায় বা wiki-তে থাকত, সেটা এখন **একটা file যেটা পুরো team মিলে রক্ষণাবেক্ষণ করে।**

**Prerequisite:** কিছু না ✅। **Infrastructure:** একটা repo, Claude Code, আর codebase ভালো জানেন এমন একজন engineer।

1. **Repo-তে `/init` চালান।** Claude যা দেখে তা থেকে একটা প্রাথমিক CLAUDE.md বানায়।
2. **কেটে ছোট করুন।** শুধু রাখুন যা একজন নতুন সদস্যের প্রথম দিনে লাগে: build, test, lint-এর command, জরুরি নিয়ম, আর যেগুলোতে Claude বারবার ভুল করে।
3. **Repo-র root-এ git-এ রাখুন,** যাতে পুরো team একই version ব্যবহার করে, আর পরিবর্তন code-এর মতোই review হয়।
4. **একটা নিয়ম মানুন: Claude একই ভুল দুবার করলে, সংশোধনটা CLAUDE.md-তে যাবে।**
5. **এক পাতার মধ্যে রাখুন।** Claude প্রতিবার পুরোটা পড়ে, তাই পুরনো বা অপ্রয়োজনীয় লাইন শুধু জায়গা নষ্ট করে।

📄 `CLAUDE.md`

```markdown
# Result portal

## Commands
- Run: npm run dev
- Test: npm test (all must pass)
- Lint: npm run lint (zero warnings)

## Conventions
- TypeScript and Next.js. Server code lives in src/server/.
- Show every date to students in the Asia/Dhaka time zone.
- Every API route has a test in tests/api/.

## Architecture
- src/app/ holds pages; src/server/ talks to the results database.
- This app has read-only access to the results database.

## Things Claude gets wrong
- Never show marks before the status is "published".
- Do not add npm packages; ask first.
```

**Governance:** CLAUDE.md git-এ থাকে, তাই **agent কোন নির্দেশ মেনে কাজ করছে, সেটা review আর audit করা যায়।** পরিবর্তন git history-তে থাকে, আর code owner PR-এ সেগুলো অনুমোদন দেন।

| ধরন | কী মাপবেন |
|---|---|
| Leading | Claude কতবার এমন ভুল আবার করল, যেটা CLAUDE.md-র ধরার কথা ছিল |
| Lagging | নতুন team সদস্যের প্রথম PR merge হতে কত সময় লাগে |

*In English: CLAUDE.md is the new-joiner briefing for Claude; generate it with /init, cut it to one page, commit it, and add a line whenever Claude repeats a mistake.*

### Skills · প্রতিষ্ঠানের জ্ঞান, কাজে লাগার মতো করে

CLAUDE.md হলো একটা repo-র সাধারণ জ্ঞান। **Skill হলো প্রতিষ্ঠানের নির্দিষ্ট নিয়ম,** যেটা সব জায়গায় একইভাবে মানতে হয়: security standard, API design-এর নিয়ম, brand guideline। Skill স্পষ্ট, version-controlled, সবার জন্য প্রযোজ্য, আর policy বদলালে এক জায়গায় update হয়।

> [!TIP]
> **কোনটা skill, কোনটা না?** যে জ্ঞান **সব সময় একইভাবে প্রয়োগ** করতে হয়, সেটা skill। যেটা শুধু এই repo-র সাধারণ তথ্য, সেটা CLAUDE.md-তে। আর যেটা শুধু আজকের কাজের, সেটা prompt-এ।

**Prerequisite:** বাধ্যতামূলক কিছু না ✅। CLAUDE.md থাকলে ভালো। **Infrastructure:** একটা policy, যার একজন নির্দিষ্ট মালিক আর লিখিত মূল উৎস আছে।

1. **একটা জ্ঞান বেছে নিন যেটা আজ অসমভাবে মানা হয়।** যেমন security standard, API-র নিয়ম, বা brand-এর নিয়ম।
2. **Skill হিসেবে লিখুন।** Skill হলো একটা folder, ভেতরে একটা `SKILL.md`। উপরের frontmatter বলে **কখন** skill চালু হবে, নিচের অংশ বলে **কী** করতে হবে। Engineer policy owner-এর মূল document থেকে লেখেন, Claude-এর সাহায্য নিয়ে।
3. **Repo-তে রাখুন** `.claude/skills/<name>/`-এ, যাতে code-এর সাথে যায়। অথবা পুরো প্রতিষ্ঠানে plugin দিয়ে ছড়িয়ে দিন।
4. **পরীক্ষা করুন skill চালু হয় কিনা।** একই কাজ Claude-কে কয়েক রকমভাবে বলুন, দেখুন প্রতিবার skill লোড হয় কিনা।
5. **Policy বদলালে skill বদলান,** আর policy owner সেটা sign-off করবেন। পরের session থেকে সবাই নতুন version পায়, নিজে থেকেই।

📄 `.claude/skills/student-data-privacy/SKILL.md`

```markdown
---
name: student-data-privacy
description: Apply the university's student data rules. Use whenever code
  reads, shows, logs or sends a student record, result or contact detail.
---
# Student data privacy

1. Show students only their own records, and only after login.
2. Never put a roll number, phone number or marks in logs or error messages.
3. Keep marks hidden until the result status is "published".
4. Any message to a guardian needs the student's recorded consent.

Run npm run check:privacy and include its output in your summary.
```

> [!IMPORTANT]
> **Skill একটা control, তবে পরামর্শমূলক (advisory)।** Skill থাকলে Claude নিয়ম মানার সম্ভাবনা অনেক বাড়ে, কিন্তু কোনো কিছু session-কে বাধ্য করে না। যে নিয়ম **কখনোই** ভাঙা চলবে না, তার পেছনে একটা নিশ্চিত ব্যবস্থা লাগবে: একটা hook যেটা কাজ আটকায়, বা PR-এ একটা review pass যেটা আবার যাচাই করে। **Skill ভুলকে বিরল করে, hook ভুলকে প্রায় অসম্ভব করে।**

Skill কখন ব্যবহার হলো, সেটা session trace-এ রেকর্ড থাকে, আর policy owner skill-এর পরিবর্তন code-এর মতোই review করেন।

| ধরন | কী মাপবেন |
|---|---|
| Leading | Policy owner নিয়ম বদলানোর পর updated skill merge হতে কত সময় লাগে |
| Lagging | PR review-এ এই policy-র উল্লেখ করা finding কতগুলো। **শূন্যের দিকে নামা উচিত।** না নামলে, হয় skill চালু হচ্ছে না, নয় skill-এর লেখা আসল policy থেকে সরে গেছে |

*In English: a skill is a folder with a SKILL.md whose frontmatter says when it applies; it makes policy violations rare, and a hook behind it makes them close to impossible.*

### Build hooks · যে নিয়ম ভাঙা চলবে না

**Hook** হলো একটা ছোট script, যেটা Claude-এর নির্দিষ্ট কাজের আগে বা পরে নিজে থেকে চলে। Skill পরামর্শ দেয়, hook **নিশ্চিত করে।** Build stage-এ Claude-এর বেশিরভাগ কাজ হলো file edit আর shell command, তাই hook সবচেয়ে বেশি চলে এখানেই।

<div class="versus">
<div><b>SKILL · পরামর্শ</b>"ছাত্রের phone number log-এ লিখবে না।" Claude সাধারণত মানে, কিন্তু মানতে বাধ্য না।</div>
<div><b>HOOK · নিশ্চয়তা</b>প্রতিটা edit-এর পরে একটা script চলে। Diff-এ phone number বা secret পেলে কাজ সেখানেই থামে। কোনো ব্যতিক্রম নেই।</div>
</div>

Build-এর hook তিনটা কাজ করে:

1. **সুরক্ষিত path-এ edit আটকায়।** যেমন auto-generated class, বা এমন package যেটা জমিয়ে রাখা (frozen)।
2. **প্রতিটা edit-এর পরে formatter আর linter চালায়,** যাতে ছোট ছোট অগোছালো ভাব জমে না।
3. **Credential diff-এ ঢুকতে দেয় না।**

দুটো সতর্কতা:

- **Build hook দ্রুত আর ছোট পরিসরের হতে হবে,** শুধু যে file বদলেছে সেটুকু দেখবে। কারণ প্রতিটা মিলে যাওয়া কাজে hook চলে। পুরো test suite-এর মতো ভারী check রাখুন commit বা PR-এ।
- **মানুষের অনুমতি চায় এমন hook Build-এ না,** Deploy-এর gate-এ (Chapter 5)। Build-এর মাঝে অনুমতি চাইলে মানুষ আবার সব parallel session-এর পথ আটকে দাঁড়ান।

*In English: build hooks are fast scripts that block protected paths, run formatters and keep secrets out; they back any skill whose policy must always hold, while approval hooks belong at the deploy gate.*

### Parallel sessions আর subagents · এক জন, অনেক কাজ

এখানে দুটো আলাদা জিনিস, প্রায়ই গুলিয়ে যায়:

- **Parallel session:** আরেকটা পূর্ণ Claude Code, **নিজের git worktree-তে** আলাদা কাজ করছে। প্রতিটা session অন্যগুলোর কথা কিছুই জানে না। তাদের একমাত্র মিল: একই engineer চালাচ্ছেন।
- **Subagent:** একটা session-এর **ভেতরে** একজন সীমিত সহকারী, নিজের আলাদা context window আর সীমিত tool নিয়ে। বারবার আসা কাজের জন্য ভালো, যেমন app চালিয়ে দেখা কাজ ঠিক হলো কিনা।

<figure class="diagram">
<svg viewBox="0 0 560 220" role="img" aria-label="One engineer steers three parallel sessions, each in its own worktree. The first session also runs a verifier subagent inside it">
<defs><marker id="sdlc-par-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node up" x="205" y="20" width="150" height="44" rx="10"/><text x="280" y="42">engineer</text>
<text class="note start" x="365" y="42">steers + reviews</text>
<rect class="node" x="20" y="110" width="160" height="90" rx="10"/><text x="100" y="132">session 1</text><text class="note" x="100" y="156">wt: status-page</text><text class="note" x="100" y="178">+ verifier agent</text>
<rect class="node" x="200" y="110" width="160" height="90" rx="10"/><text x="280" y="132">session 2</text><text class="note" x="280" y="156">wt: sms-consent</text>
<rect class="node" x="380" y="110" width="160" height="90" rx="10"/><text x="460" y="132">session 3</text><text class="note" x="460" y="156">wt: fix-login</text>
<path class="arrow" d="M240 64 L110 108" marker-end="url(#sdlc-par-arrow)"/>
<path class="arrow" d="M280 64 L280 108" marker-end="url(#sdlc-par-arrow)"/>
<path class="arrow" d="M320 64 L450 108" marker-end="url(#sdlc-par-arrow)"/>
</svg>
<figcaption>Sessions run side by side in separate worktrees; a subagent is a helper inside one session. Session-গুলো আলাদা worktree-তে পাশাপাশি চলে, আর subagent একটা session-এর ভেতরের সহকারী।</figcaption>
</figure>

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>একজন engineer একবারে একটা কাজ করেন। দিনের বড় অংশ যায় build, test আর reviewer-এর অপেক্ষায়। অপেক্ষার সময় অন্য কাজ ধরা যায়, কিন্তু মন বদলানো এত ক্লান্তিকর যে খুব কম মানুষ সেটা করেন।</div>
<div><b>AI-NATIVE · নতুন পথ</b>একজন engineer একসাথে কয়েকটা Claude session চালান, প্রতিটা নিজের worktree-তে। বারবারের কাজ subagent হয়ে যায়। Engineer-এর কাজ হয় পরিচালনা, আর পরে loop বানানো ও নজর রাখা।</div>
</div>

**Prerequisite:** CLAUDE.md, কারণ সব session এটা পড়ে। Chapter 4-এর feedback loop থাকলে আরও ভালো, কারণ session নিজের কাজ নিজে যাচাই করতে পারলে কম তদারকি লাগে। **Infrastructure:** git repo (আলাদা থাকার ব্যবস্থা আসে worktree থেকে), আর permission setting এমনভাবে ঠিক করা, যাতে নিরাপদ command-এর জন্য session অনুমতির অপেক্ষায় বসে না থাকে।

1. **কাজকে ভাগ করুন এমনভাবে যাতে প্রতিটা ভাগ আলাদা file ছোঁয়।** Plan mode-এর plan দেখে বুঝুন কোন কাজ স্বাধীন। একই file ছোঁয় এমন কাজ এক session-এই, একটার পর একটা।
2. **প্রতিটা parallel কাজের জন্য আলাদা worktree।** যেমন এক terminal-এ `claude --worktree status-page`, আরেকটায় `claude --worktree fix-login`। Worktree হলো নিজের branch-এ একটা আলাদা checkout, তাই session-গুলো একই file নিয়ে ধাক্কা খায় না।
3. **দুই-তিনটা session দিয়ে শুরু করুন।** আসল সীমা হলো **একজন মানুষ কতগুলো ঠিকমতো review করতে পারেন।** Review তাল রাখতে পারলে তবেই session বাড়ান।
4. **বারবারের কাজকে subagent বানান,** `.claude/agents/`-এ markdown file হিসেবে: নাম, কখন ব্যবহার হবে, আর কোন tool ছুঁতে পারবে। যেমন code সরল করার **simplifier**, app চালিয়ে যাচাইয়ের **verifier**, আর codebase ঘুরে রিপোর্ট দেওয়ার **researcher**, যেটা মূল context ভরিয়ে ফেলে না। File-গুলো git-এ রাখুন, যাতে team সবাই পায়।

📄 `.claude/agents/verifier.md`

```markdown
---
name: verifier
description: Starts the portal and checks the change works before the
  session reports done
tools: Bash, Read
---
Start the app with npm run dev. Open the changed page as a test student
and try the two closest flows. Report what you ran, what you saw, and
anything that does not match plan.md. Do not fix anything; only report.
```

**Governance:** session বেশি মানে output বেশি, তাই **control আসতে হবে repo-র configuration থেকে।** সেখানকার hook আর permission সব session-এ খাটে, আর প্রতিটা session-এর কাজ যে engineer চালিয়েছেন তাঁর নামে রেকর্ড হয়।

| ধরন | কী মাপবেন |
|---|---|
| Leading | Review-এর মান ঠিক রেখে একজন engineer কয়টা session একসাথে চালান (OpenTelemetry export থেকে), আর দিনের কতটা অপেক্ষায় না গিয়ে পরিচালনায় যায় |
| Lagging | প্রতি engineer-এর সাপ্তাহিক merged পরিবর্তন, rework-এর হারের পাশাপাশি পড়ে |

*In English: parallel sessions run separate tasks in separate worktrees, subagents are scoped helpers inside one session, and the real limit is how much one person can review.*

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Plan mode-এ Claude কী পারে আর কী পারে না?</summary>

**Codebase পড়তে পারে, কিন্তু কোনো file বদলাতে পারে না,** যতক্ষণ না engineer plan accept করেন। তাই design review সব সময় code লেখার আগে হয়।

</details>

<details class="quiz">
<summary>২. "Production database-এর migration file কেউ হাত দিতে পারবে না।" এটা skill-এ লিখবেন, নাকি hook-এ?</summary>

**দুটোতেই, তবে hook-টাই আসল নিশ্চয়তা।** Skill Claude-কে নিয়মটা জানায়, কিন্তু advisory। যে নিয়ম কখনো ভাঙা চলবে না, তার জন্য একটা hook লাগবে যেটা ওই path-এ edit আটকায়।

</details>

<details class="quiz">
<summary>৩. আপনি ছয়টা parallel session চালাচ্ছেন, কিন্তু PR জমে আছে, review করতে পারছেন না। কী করবেন?</summary>

**Session কমান।** Session-এর সংখ্যার আসল সীমা হলো আপনি কতটা ঠিকমতো review করতে পারেন। Review তাল না রাখলে বেশি session মানে শুধু বেশি জমে থাকা কাজ।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **Plan ছাড়া code না:** `plan.md` commit হয়, পরে diff এটার সাথে মেলে।
> - **CLAUDE.md এক পাতা,** একই ভুল দুবার হলে নতুন লাইন।
> - **Skill পরামর্শ দেয়, hook নিশ্চিত করে।**
> - **Parallel session-এর সীমা আপনার review-এর ক্ষমতা।**

## 4. Test · নিজের কাজ নিজে যাচাই

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** Claude-কে কীভাবে নিজের কাজ যাচাই করার উপায় দিতে হয়, bug fix-এ কেন আগে ব্যর্থ test লিখতে হয়, আর eval কী এবং কেন agent-এর configuration-কেও test করতে হয়।
>
> **In short:** Every session checks its own work before a human sees it, and the configuration that steers the agent (CLAUDE.md, skills, hooks) gets regression-tested like code.

### Feedback loop · Claude-কে যাচাইয়ের উপায় দিন

**সবচেয়ে বড় পরামর্শ: Claude-কে সব সময় নিজের কাজ যাচাই করার একটা উপায় দিন।** সেটা test হতে পারে, build হতে পারে, বা screenshot-এর তুলনা। তাহলে session নিজের ভুল নিজে ধরে ঠিক করে, engineer দেখার আগেই।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Code ঠিক আছে কিনা, সেই খবর আসে দেরিতে: CI থেকে কয়েক মিনিট পরে, tester থেকে কয়েক দিন পরে, production থেকে কয়েক সপ্তাহ পরে। Agent code লিখলে দেরির খবর মানে একজন মানুষকে সব output দেখতে হবে, আর তিনিই bottleneck।</div>
<div><b>AI-NATIVE · নতুন পথ</b>Session নিজেই test চালায়, build চালায়, screenshot নেয়। Check pass না হওয়া পর্যন্ত Claude চেষ্টা চালিয়ে যায়। Engineer-এর কাছে যা পৌঁছায়, সেটা আগেই check পার হয়ে এসেছে।</div>
</div>

<figure class="diagram">
<svg viewBox="0 0 560 200" role="img" aria-label="The feedback loop: write code, run the check, and if it fails fix the code and try again; when it passes, report done with the output">
<defs><marker id="sdlc-test-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node" x="20" y="20" width="130" height="44" rx="10"/><text x="85" y="42">write code</text>
<rect class="node" x="210" y="20" width="130" height="44" rx="10"/><text x="275" y="42">run check</text>
<rect class="node down" x="400" y="20" width="130" height="44" rx="10"/><text x="465" y="42">pass?</text>
<rect class="node up" x="400" y="130" width="130" height="44" rx="10"/><text x="465" y="152">report done</text>
<rect class="node" x="210" y="130" width="130" height="44" rx="10"/><text x="275" y="152">fix code</text>
<path class="arrow" d="M150 42 L208 42" marker-end="url(#sdlc-test-arrow)"/>
<path class="arrow" d="M340 42 L398 42" marker-end="url(#sdlc-test-arrow)"/>
<path class="arrow" d="M465 64 L465 128" marker-end="url(#sdlc-test-arrow)"/>
<path class="arrow" d="M430 64 L338 130" marker-end="url(#sdlc-test-arrow)"/>
<path class="arrow" d="M210 152 L85 152 L85 66" marker-end="url(#sdlc-test-arrow)"/>
<text class="note start" x="475" y="96">yes</text>
<text class="note" x="360" y="78">no</text>
<text class="note" x="148" y="172">try again</text>
</svg>
<figcaption>The session loops until the check passes, and only then reports, with the output attached. Check pass না হওয়া পর্যন্ত session ঘুরতে থাকে, তারপর output সহ জানায় কাজ শেষ।</figcaption>
</figure>

> [!NOTE]
> **Feedback loop আর verifier subagent এক জিনিস না।** Feedback loop কাজের পুরো সময় জুড়ে বারবার চলে। Verifier subagent (Chapter 3) চলে একবার, শেষে, একটা **নতুন context window**-এ। তাই তার রায় সেই ধারণাগুলো দিয়ে প্রভাবিত হয় না, যেগুলো থেকে code লেখা হয়েছিল।

**Prerequisite:** কিছু না ✅। **Infrastructure:** test suite আর build, প্রতিটা **এক command-এ** local-এ চলে। UI কাজের জন্য Claude-এর ফল **দেখার** উপায় খুব জরুরি: একটা browser tool বা MCP দিয়ে যুক্ত screenshot tool।

1. **এক command-এ যাচাই।** আজ যদি যাচাই করতে কয়েকটা command আর পরিবেশের জ্ঞান লাগে, সব একটা target-এ ভরুন, যেমন `npm test`, যেটা ব্যর্থ হলে non-zero exit code দেয়।
2. **CLAUDE.md-এর Commands অংশে** প্রতিটা command লিখুন, সাথে ঠিক থাকলে output দেখতে কেমন।
3. **লক্ষ্যটা মাপা যায় এমনভাবে বলুন,** যাতে Claude আপনাকে জিজ্ঞেস না করেই যাচাই করতে পারে। যেমন: "status.test.ts-এর সব test pass", "screenshot attach করা mockup-এর সাথে মেলে", "endpoint নতুন field সহ 200 দেয়"।
4. **Bug fix-এ আগে ব্যর্থ test।** Claude-কে বলুন bug-টা একটা test হিসেবে তৈরি করতে, চালাতে, আর নিশ্চিত করতে যে test **যে কারণে আশা করছেন সেই কারণেই** fail করছে। Test-টা commit করুন। **তারপর** বলুন test না বদলে সেটা pass করাতে। Fix-এর আগে থেকে থাকা, agent-এর বদলাতে না পারা একটা test-ই প্রমাণ যে bug চলে গেছে।
5. **UI কাজে চোখে দেখার loop।** Claude-কে browser বা screenshot tool আর mockup দিন। Implement, screenshot, তুলনা, ঠিক করা। দুই-তিন round স্বাভাবিক, প্রতিবার ফল ভালো হওয়া উচিত।
6. **"Done"-এর সংজ্ঞায় যাচাই রাখুন।** CLAUDE.md-তে লিখুন: কাজ শেষ বলার আগে test চালাও, output দেখাও।
7. **Loop-টাকেও রক্ষা করুন।** Code ঠিক করতে থাকা agent যেন সেই code-এর check দুর্বল করতে না পারে। Fix-এর সময় test file edit আটকানো একটা hook এটা করে। বিকল্প হলো review-এ diff দেখে test ছোঁয়া যেকোনো পরিবর্তন বাতিল করা।

📄 `CLAUDE.md (verification block)`

```markdown
## Verifying your work
- Build: npm run build (must end with "Compiled successfully")
- Test: npm test (all green; never skip or delete a failing test)
- Lint: npm run lint (zero warnings)

Run all three before you say a task is done, and paste the output.
If a test fails, fix the code, not the test.
```

**Governance** চার প্রশ্নে:

| প্রশ্ন | উত্তর |
|---|---|
| কী বাধ্যতামূলক? | কাজ শেষ বলার আগে যাচাই, আর fix-এর সময় test file edit নিষেধ। নিশ্চিত চাইলে দুটোই hook হিসেবে |
| প্রমাণ কী? | `npm test`-এর আসল output, build log বা screenshot diff। **প্রমাণ আসে toolchain থেকে,** agent-এর কথা থেকে না |
| কোথায় রেকর্ড? | Session transcript (OpenTelemetry দিয়ে observability stack-এ যায়), আর PR-এর check run |
| কে অনুমোদন দেন? | PR review করা code owner। যান্ত্রিক প্রমাণ আগেই attach করা, তাই তিনি মন দিতে পারেন intent আর ঝুঁকিতে |

| ধরন | কী মাপবেন |
|---|---|
| Leading | Agent-এর লেখা পরিবর্তনের প্রথম চেষ্টায় CI pass-এর হার |
| Lagging | প্রতি PR-এ review-এর সময় (কমা উচিত), আর change failure rate |

*In English: give every session a one-command way to check its work, write the failing test first for bugs, close a visual loop for UI, and protect the tests from the agent that is fixing the code.*

### Continuous evals · Agent-এর নিজের পরীক্ষা

Feedback loop যাচাই করে **code**। কিন্তু agent-কে চালায় যে configuration (CLAUDE.md, skill, hook, model, prompt), সেটা বদলালে কী হবে? নতুন model এলে বা একটা skill নতুন করে লিখলে agent কি আগের মানেই কাজ করবে? **Eval এই প্রশ্নের উত্তর দেয়।**

**Eval** হলো একটা পরীক্ষার কাজ: একটা prompt, আর কিছু check যেগুলো বলে দেয় ফল গ্রহণযোগ্য কিনা। অনেকগুলো eval মিলে একটা suite। **Eval হলো stage-gate QA-এর AI-native রূপ।**

> [!TIP]
> **Eval suite জীবন্ত রাখুন।** Model যত ভালো হয়, পুরনো কিছু eval আর কিছু আলাদা করে ধরতে পারে না (সবাই pass করে)। তখন নতুন eval যোগ করতে হয়, monitoring থেকে পাওয়া আসল সমস্যা থেকে। কিছু team প্রতিটা পরিবর্তনে না চালিয়ে নির্দিষ্ট সময় পরপর offline চালায়। নিচের ধাপগুলো continuous (প্রতিটা পরিবর্তনে চলা) eval-এর জন্য।

**Prerequisite:** CLAUDE.md আর feedback loop। **Infrastructure:** এমন CI যেটা Claude Code non-interactive চালাতে পারে, আর eval চালানোর বাজেট সহ একটা API key।

1. **সাম্প্রতিক কাজ থেকে ২০ থেকে ৫০টা আসল task জোগাড় করুন,** প্রতিটার গ্রহণযোগ্য ফল সহ। এই কাজ platform engineer-এর।
2. **প্রতিটা task-কে eval হিসেবে লিখুন:** prompt, আর গ্রহণযোগ্যতার check (test pass, lint পরিষ্কার, আচরণ অপরিবর্তিত, policy মানা)।
3. **Suite CI-তে non-interactive চলবে:** নির্দিষ্ট সময়ে (যেমন প্রতি রাতে), **আর** CLAUDE.md, skill বা hook-এ যেকোনো পরিবর্তনে। কারণ এই configuration agent-কে চালায়, তাই code-এর মতোই regression test পাওয়ার যোগ্য।
4. **ফলের উপর gate বসান।** যে skill পরিবর্তনে pass rate কমে, সেটা merge-এর আগে review হয়।
5. **প্রতিটা production incident একটা নতুন eval।** যে team incident সামলেছে, তারা লেখে, আর সেটা regression test হিসেবে suite-এ থেকে যায়।

📄 `evals/withheld-status.json`

```json
{
  "prompt": "Add a 'withheld' result status. Students see it like 'on hold'.",
  "checks": ["npm test", "npm run lint", "npm run check:privacy"],
  "expect": "all checks pass and no marks appear for withheld results"
}
```

📄 `.github/workflows/agent-evals.yml (trigger part)`

```yaml
on:
  pull_request:
    paths: ['CLAUDE.md', '.claude/**']   # any change to the agent's config
  schedule:
    - cron: '0 20 * * *'                 # nightly, 2 a.m. Dhaka time
```

Workflow প্রতিটা eval-এর prompt `claude -p` দিয়ে non-interactive চালায়, তারপর check-গুলো চালিয়ে pass বা fail লেখে।

**Governance:** eval QA-কে এমন একটা gate দেয় যেটা **agent-এর গতির সাথে তাল রাখতে পারে।** Pass rate-এর সীমা merge check হিসেবে বাধ্যতামূলক, প্রতিটা run রেকর্ড থাকে যাতে সময়ের সাথে তুলনা করা যায়, আর configuration পরিবর্তনের মালিক team সেটা অনুমোদন দেয়।

| ধরন | কী মাপবেন |
|---|---|
| Leading | সময়ের সাথে eval pass rate, আর একটা production incident স্থায়ী eval হতে কত সময় লাগে |
| Lagging | CI-তে ধরা পড়া regression বনাম production-এ ধরা পড়া regression |

*In English: evals are 20 to 50 real tasks with checks, run in CI nightly and on every change to CLAUDE.md, skills or hooks, gating merges on the pass rate and growing with every incident.*

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Claude একটা bug fix করার সময় ব্যর্থ test-টাই বদলে দিল, আর এখন সব green। সমস্যা কোথায়?</summary>

**Check দুর্বল করে pass করানো হয়েছে, bug ঠিক হয়নি।** তাই আগে ব্যর্থ test commit করতে হয়, আর fix-এর সময় test file edit আটকানো একটা hook রাখতে হয় (বা review-এ test ছোঁয়া diff বাতিল করতে হয়)।

</details>

<details class="quiz">
<summary>২. আপনি student-data-privacy skill-এর লেখা বদলেছেন। কোনো code বদলাননি। Eval suite কি চলা উচিত?</summary>

**হ্যাঁ।** Skill agent-এর configuration-এর অংশ, আর configuration-ও code-এর মতো regression test পাওয়ার যোগ্য। Pass rate কমলে skill পরিবর্তনটা merge-এর আগে review হবে।

</details>

<details class="quiz">
<summary>৩. Feedback loop আর verifier subagent, দুটোই যাচাই করে। পার্থক্য কী?</summary>

**Feedback loop কাজের পুরো সময় বারবার চলে,** একই session-এর ভেতরে। **Verifier একবার চলে শেষে, নতুন context-এ,** তাই code লেখার সময়ের ধারণা তার রায়ে প্রভাব ফেলে না।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **যাচাই এক command-এ,** লক্ষ্য মাপা যায় এমন।
> - **Bug fix: আগে ব্যর্থ test,** তারপর test না ছুঁয়ে fix।
> - **প্রমাণ আসে toolchain থেকে,** agent-এর কথা থেকে না।
> - **Eval agent-এর configuration-কে test করে,** প্রতিটা incident একটা নতুন eval।

## 5. Deploy · review আর gate

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** Claude কীভাবে PR review দেয় আর নেয়, hook কীভাবে মানুষের অনুমোদনের gate হয়, managed settings কী, আর CI/CD-তে Claude কতদূর যেতে পারে।
>
> **In short:** Review runs in both directions, and governance is enforced as the agent acts. The agent does everything up to the production gate and nothing past it.

### PR review loop · Claude review দেয়, review নেয়

Claude এখানে দুই দিকে কাজ করে। **আসা PR-গুলো প্রতিষ্ঠানের policy মেনে review করে,** আর **নিজের PR-এ পাওয়া review মন্তব্যের সমাধান করে।** ফলে মানুষ reviewer মন দিতে পারেন আসল প্রশ্নে: এই পরিবর্তন কি যা চাওয়া হয়েছিল তা-ই করে, আর ঝুঁকি কি গ্রহণযোগ্য?

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Review-এর ক্ষমতা মানুষের output দেখে ঠিক করা। PR বসে থাকে reviewer-এর অপেক্ষায়। Reviewer কতটা ব্যস্ত, তার উপর review-এর মান নির্ভর করে। Author তাড়া দেন, backlog বাড়ে।</div>
<div><b>AI-NATIVE · নতুন পথ</b>প্রতিটা PR একই review pass পায়, finding গুরুত্ব অনুযায়ী সাজানো। মানুষের মনোযোগ এক ধাপ উপরে ওঠে: change কি plan অনুযায়ী, আর ঝুঁকি কি মেনে নেওয়া যায়।</div>
</div>

<figure class="diagram">
<svg viewBox="0 0 560 200" role="img" aria-label="A pull request goes through three review passes, bugs, security and compliance. The findings are ranked as Important or Nit, and a human code owner approves the merge">
<defs><marker id="sdlc-pr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<rect class="node" x="10" y="74" width="70" height="40" rx="10"/><text x="45" y="94">PR</text>
<rect class="node down" x="120" y="20" width="130" height="40" rx="10"/><text x="185" y="40">bugs</text>
<rect class="node down" x="120" y="74" width="130" height="40" rx="10"/><text x="185" y="94">security</text>
<rect class="node down" x="120" y="128" width="130" height="40" rx="10"/><text x="185" y="148">compliance</text>
<rect class="node" x="290" y="74" width="110" height="40" rx="10"/><text x="345" y="94">findings</text>
<rect class="node up" x="430" y="74" width="120" height="40" rx="10"/><text x="490" y="94">code owner</text>
<path class="arrow" d="M80 88 L118 42" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M80 94 L118 94" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M80 100 L118 146" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M250 40 L288 86" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M250 94 L288 94" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M250 148 L288 102" marker-end="url(#sdlc-pr-arrow)"/>
<path class="arrow" d="M400 94 L428 94" marker-end="url(#sdlc-pr-arrow)"/>
<text class="note" x="345" y="135">Important / Nit</text>
<text class="note" x="490" y="135">human approves</text>
</svg>
<figcaption>Every PR gets the same passes; a human code owner still approves the merge. প্রতিটা PR একই review pass পায়, কিন্তু merge-এর অনুমোদন দেন একজন মানুষ code owner।</figcaption>
</figure>

**Prerequisite:** Build stage-এর updated CLAUDE.md। Review pass যদি লিখিত policy যাচাই করে তবে skill, আর নির্দিষ্ট subagent। **Infrastructure:** Claude integration সহ repo। দুটো পথ: admin-এর চালু করা **managed Code Review service**, অথবা নিজের CI-তে **claude-code-action**। দরকারে model call যায় AWS Bedrock, Google Vertex বা Microsoft Foundry দিয়ে। আর code owner-এর অনুমোদন বাধ্যতামূলক করা branch protection রাখা ভালো।

1. **Managed Code Review সবচেয়ে দ্রুত শুরু।** Admin চালু করে repo বেছে দেন। Pipeline-এর উপর পূর্ণ নিয়ন্ত্রণ চাইলে, বা API call নিজের cloud চুক্তি দিয়ে পাঠাতে চাইলে, নিজের CI-তে claude-code-action চালান।
2. **Tech lead review policy লেখেন `REVIEW.md` হিসেবে,** repo-র root-এ। ভাগ থাকবে প্রতিষ্ঠান যে pass-গুলো চায়: bug আর logic-এর ভুল; security আর দুর্বলতা; আর compliance, মানে `spec.md`, `plan.md` আর design-এর নীতির সাথে মিল। কোনটা **Important** আর কোনটা **Nit**, আর কী বাদ দিতে হবে, সেটাও এখানে।
3. **মানুষের সীমা ঠিক করুন।** Finding নিজে থেকে PR অনুমোদন বা আটকায় না। **Branch protection তখনও একজন code owner-এর অনুমোদন চায়।** কেউ finding দিয়ে merge আটকাতে চাইলে check run-এর প্রকাশ করা severity গণনা machine দিয়ে পড়তে পারেন।
4. **@claude দিয়ে fix।** Reviewer বা author কোনো মন্তব্যে `@claude` tag করলে Claude সমাধান করে fix push করে। PR thread-এ অনুরোধ আর পরিবর্তন দুটোই থাকে। (Managed service-এ `@claude review` লিখলে নতুন করে review হয়।) Claude-এর খোলা PR-এ আরও এগোনো যায়: **Claude PR-কে "babysit" করে,** মানে বাকি মন্তব্য আর ব্যর্থ check একটা একটা করে ঠিক করে, যতক্ষণ না PR green হয় আর শুধু code owner-এর অনুমোদন বাকি থাকে।
5. **Finding ফিরে যায় CLAUDE.md-তে।** Review একই ভুল দ্বিতীয়বার ধরলে, সংশোধন CLAUDE.md-তে যায়। যেহেতু review নিজেও CLAUDE.md পড়ে, পরের PR থেকে ভুলটা ধরা পড়ে। কোনো পরিবর্তন CLAUDE.md-কে পুরনো করে দিলে review সেটাও জানায়।
6. **মাসে একবার টিউন করুন।** Tech lead finding-গুলোকে rate করেন যাতে reviewer উন্নত হয়, আর `REVIEW.md`-তে Nit-এর সংখ্যা সীমিত করেন। Generated file আর CI আগেই যা যাচাই করে, সেগুলো বাদ।

📄 `REVIEW.md`

```markdown
# How to review this repo

## Passes (tag each finding with its pass)
- Bugs: wrong logic, missed edge cases, regressions
- Security: auth gaps, injection, student data in logs
- Compliance: matches spec/ and plan/ files and our design rules

## Important vs Nit
Important = breaks behavior, leaks student data, or breaks a policy.
Naming and style are Nits.

## Limits
At most five Nits per review; count the rest.
Skip src/generated/ and anything the linter already checks.
```

**Governance:** **দায়িত্ব-বিভাজন (separation of duties) বজায় থাকে,** কারণ যে agent code লিখেছে, সে নিজে অনুমোদন দিতে পারে না। `REVIEW.md` সব PR-এ খাটে, আর finding, fix, rating, অনুমোদন সব PR history-তে থাকে। **PR-ই audit রেকর্ড।** অনুমোদন আসে একজন মানুষের কাছ থেকে, branch protection দিয়ে, finding দেখে।

| ধরন | কী মাপবেন |
|---|---|
| Leading | প্রথম review পেতে সময় (কয়েক মিনিটে নামা উচিত), আর কত review মন্তব্য কোনো মানুষ branch না ছুঁয়েই সমাধান হলো |
| Lagging | Merge-এর আগে ধরা পড়া defect আর দুর্বলতা বনাম production-এ পালিয়ে যাওয়াগুলো |

*In English: every PR gets the same bug, security and compliance passes defined in REVIEW.md, Claude fixes comments on its own PRs, and a human code owner still approves through branch protection.*

### Hooks as approval gates · অনুমোদনের দরজা

Chapter 3-এ hook ছিল guardrail: কোনো মানুষ ছাড়াই কাজ allow বা block করে। কিন্তু hook আরেকটা কাজ পারে: **ask,** মানে কাজ থামিয়ে রাখা যতক্ষণ না একজন নির্দিষ্ট মানুষ অনুমোদন দেন। Release-এর gate ঠিক এটাই চায়।

| Hook-এর রায় | মানে | উদাহরণ |
|---|---|---|
| allow | চলুক | `npm test` চালানো |
| ask | মানুষের অনুমোদনের অপেক্ষা | Staging-এ deploy |
| block | থামো, কারণ জানাও | অনুমোদন ছাড়া production deploy |

এই play Deploy-এ রাখা হয়েছে কারণ release gate সবচেয়ে স্পষ্ট উদাহরণ। কিন্তু **hook যেকোনো stage-এ চলে, যেখানেই Claude কাজ করে।** যেমন Build-এ change ticket ছাড়া migration বা infra edit আটকানো, বা Test-এ fix-এর সময় test file edit আটকানো।

**Prerequisite:** কিছু না ✅। **Infrastructure:** change process যে অনুমোদনগুলো চায়, তার একটা লিখিত তালিকা।

1. **কোন gate টিকে থাকবে, তালিকা করুন।** Engineering নেতৃত্ব, change management আর compliance মিলে ঠিক করেন: যেমন change-এর sign-off, release-এর অনুমোদন, সুরক্ষিত path-এ edit।
2. **প্রতিটা gate একটা hook।** Platform engineer প্রতিটা gate-কে একটা script বানান, যেটা Claude কাজ করার আগে চলে আর allow, ask বা block বলে।
3. **কোথায় রাখবেন।** Team-এর hook যায় git-এ `.claude/settings.json`-এ। **যে hook নিয়ে আপস চলে না,** সেটা যায় **managed settings**-এ, যেটা platform বা IT admin-এর হাতে, আর কোনো engineer বন্ধ করতে পারেন না।
4. **Block নিজের কারণ বলবে।** Hook কাজ থামালে কারণ আর অনুমোদনের পথ Claude-এর output-এ দেখা যাবে।

📄 `.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command",
                    "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/migration-gate.sh" }] }
    ]
  }
}
```

📄 `.claude/hooks/migration-gate.sh`

```bash
#!/bin/bash
# Running a database migration needs an approved change ticket.
cmd=$(jq -r '.tool_input.command' < /dev/stdin)
if [[ "$cmd" == *"db:migrate"* && -z "$CHANGE_TICKET" ]]; then
  echo "Migrations need an approved change ticket. Ask the release manager." >&2
  exit 2   # exit code 2 blocks the action and shows this message to Claude
fi
exit 0
```

**`exit 2`** হলো চাবি: এই exit code মানে "block", আর stderr-এর বার্তা Claude পড়ে বোঝে কেন থামল আর কার কাছে যেতে হবে।

**Governance:** hook-ই অনুমোদনের gate। **শর্ত প্রতিবার, প্রত্যেকের জন্য খাটে।** Allow আর block সময় সহ রেকর্ড হয়। Gate নিজেই ঠিক করে অনুমোদন মানে কী: approved change ticket, নাকি release manager-এর sign-off।

#### Managed settings · নিয়ন্ত্রিত প্রতিষ্ঠানের জন্য

Bank বা hospital-এর মতো প্রতিষ্ঠানে platform team MDM বা admin console দিয়ে **managed settings** পাঠায়। Engineer এগুলো বদলাতে বা পাশ কাটাতে পারেন না। Article একটা পূর্ণ উদাহরণ দিয়েছে। মূল কথা হলো, **প্রতিটা setting একটা নির্দিষ্ট ঝুঁকি বন্ধ করে:**

| Setting-এর ধরন | কী বন্ধ করে |
|---|---|
| `permissions.deny` / `allow` | Secret (`.env`, secrets folder) agent-এর context-এ ঢোকা, আর tool দিয়ে ইচ্ছামতো network-এ যাওয়া বন্ধ। নিরাপদ command আগেই allow, যাতে বারবার অনুমতি চেয়ে বিরক্ত না করে |
| `disableBypassPermissionsMode`, `allowManagedPermissionRulesOnly` | কোনো engineer, project file বা command-line flag নিয়ম ঢিলা করতে পারে না |
| `sandbox` (network allowlist) | Permission যা পারে না: shell command দিয়ে network-এ যাওয়া। OS-স্তরে শুধু অনুমোদিত domain |
| `failIfUnavailable`, `allowUnsandboxedCommands: false` | Sandbox চালু না হলে Claude Code শুরুই হয় না, আর sandbox-এ ব্যর্থ command বাইরে আবার চালানো যায় না |
| `sandbox.credentials` | Sandbox-এর shell যেন `~/.ssh` বা cloud credential পড়তে না পারে, আর নির্দিষ্ট secret env থেকে মুছে যায় |
| `allowManagedHooksOnly` | শুধু প্রতিষ্ঠানের gate hook চলে, local কেউ যোগ বা বদল করতে পারে না |
| `disableSideloadFlags`, `strictKnownMarketplaces` | সব skill, agent, hook আর MCP server আসে প্রতিষ্ঠানের অনুমোদিত plugin marketplace থেকে |
| `allowManagedMcpServersOnly` | Agent কোন tool পাবে, সেই তালিকা platform team-এর হাতে |
| `requiredMinimumVersion` | প্রতিষ্ঠান যাচাই করেছে এমন version-এর নিচে Claude Code চলবে না |

> [!WARNING]
> **এটা copy করার জিনিস না, শুরু করার জায়গা।** প্রতিটা deny কিছু ক্ষমতা কেড়ে নেয়। সঠিক ভারসাম্য নির্ভর করে repo-র data কতটা সংবেদনশীল তার উপর। প্রতিটা key-এর ব্যাখ্যা আছে [settings reference](https://code.claude.com/docs/en/settings)-এ।

| ধরন | কী মাপবেন |
|---|---|
| Leading | প্রতিটা gate-এ অপেক্ষার সময়। প্রতিটা hook-এর রায় সময় আর allow/block সহ OpenTelemetry-তে যায় |
| Lagging | Hook-এর আগে আর পরে, কতগুলো gate-ভাঙা পরিবর্তন production-এ পৌঁছেছে |

*In English: hooks can allow, ask or block; team gates live in .claude/settings.json, non-negotiable ones in managed settings, and exit code 2 blocks an action with a reason Claude can read.*

### CI/CD integration · Pipeline-এর ভেতরে Claude

শেষ play: **Claude Code-কে CI/CD pipeline-এর ভেতরে non-interactive চালানো,** sandbox-এ রেখে, deploy-এর tool MCP দিয়ে দিয়ে, আর rollback আগে থেকে অনুশীলন করে।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Pipeline শুধু নির্দিষ্ট script চালায়। যেখানে বিচার লাগে (flaky test বোঝা, changelog লেখা, build কেন ভাঙল), সেখানে মানুষের অপেক্ষা। Deploy আর rollback হলো runbook, যেটা মানুষ চাপের মধ্যে মেনে চলেন।</div>
<div><b>AI-NATIVE · নতুন পথ</b>বিচারের ধাপগুলোতে Claude pipeline-এর ভেতরে চলে, sandbox-এ, সীমিত credential নিয়ে। Deploy-এর tool MCP দিয়ে দেওয়া, তাই যে workflow পরিবর্তন লিখেছে আর test করেছে, সেটাই ship আর rollback করতে পারে, প্রতিষ্ঠানের ঠিক করা gate-এর ভেতরে।</div>
</div>

**Prerequisite:** PR review loop আর approval hook। **কেন?** কারণ **automation কিছু দ্রুত পার করার আগে gate তৈরি থাকতে হবে।** **Infrastructure:** claude-code-action সহ CI, বা যেকোনো runner যেটা `claude -p` চালাতে পারে; API বা Bedrock, Foundry, Vertex দিয়ে model access; deploy target-এর জন্য MCP server; আর agent-এর job-এর জন্য sandbox profile, **যেখানে স্থায়ী কোনো production credential নেই।**

1. **শুধু-পড়ার কাজ দিয়ে শুরু।** `claude -p` দিয়ে pipeline-এ ব্যর্থ build বিশ্লেষণ, flaky test-এর সারাংশ, বা changelog-এর খসড়া।
2. **তারপর লেখার কাজ, পুরনো gate-এর পেছনে।** Lint ঠিক করা, generated docs update, `@claude` দিয়ে review মন্তব্যের সমাধান। **Agent যা লেখে, সব PR হয়ে branch protection দিয়ে আসে।** Main-এ সরাসরি push-এর কোনো পথ নেই।
3. **Sandbox-এ চালান।** Agent-এর job container-এ চলে, network policy আর অল্প সময়ের সীমিত token নিয়ে। Default-এ কোনো production credential নেই।
4. **Deploy MCP দিয়ে দিন।** Deploy, status আর rollback হয় tool, প্রতিটা environment অনুযায়ী আলাদা সীমা। তাই agent-এর deploy ক্ষমতা একটা **allowlist,** credential ভরা shell script না।
5. **Environment অনুযায়ী স্বাধীনতা।** নিচের table দেখুন।
6. **Rollback-ই সবচেয়ে বেশি অনুশীলন করা পথ।** এক command-এ, agent চালাতে পারে, আর staging-এ নিয়মিত চালিয়ে দেখা। Chapter 6-এর loop সীমা ভাঙলে এই rollback ডাকে, তাই আগে থেকেই প্রমাণিত হতে হবে।

| Environment | Agent কতদূর যেতে পারে |
|---|---|
| Development | **নিজে deploy করে,** কোনো অনুমতি ছাড়াই |
| Staging | মাঝামাঝি: কিছু নিজে, কিছুতে অনুমোদন |
| Production | **Release প্রস্তুত করে, release manager অনুমোদন দেন,** hook gate নিশ্চিত করে |

📄 `pipeline step: draft release notes`

```yaml
- name: Draft release notes
  run: >
    claude -p "Read the merged PRs since the last tag. Write release notes
    for students and exam office staff in plain language, grouped as New,
    Fixed and Changed. Do not mention internal file names." > notes.md
```

**Governance:** মূলনীতি একটাই: **agent production gate পর্যন্ত কাজ করতে পারে, gate পার হতে পারে না।** তিনটা ব্যবস্থা এটা নিশ্চিত করে:

- **Branch protection** agent-এর লেখা সবকিছুকে PR বানায়, main-এ সরাসরি পথ নেই।
- **Production deploy hook** release আটকে রাখে, যতক্ষণ না একজন নির্দিষ্ট release manager অনুমোদন দেন। প্রতিটা non-interactive run চলে **agent-এর নিজের পরিচয়ে,** তাই pipeline log আলাদা করে দেখায় agent কী করেছে আর যে engineer চালু করেছেন তিনি কী করেছেন।
- **Environment অনুযায়ী permission-এর স্তর** ঠিক করে gate-এর পথে agent কতটা করতে পারে।

| ধরন | কী মাপবেন |
|---|---|
| Leading | কত শতাংশ pipeline ব্যর্থতা কোনো মানুষকে page না করেই বিশ্লেষণ হলো |
| Lagging | **DORA** মাপ (deploy frequency, lead time, change failure rate, recovery time), যেগুলো CI আর deploy tool আগেই দেয় |

*In English: run Claude non-interactively in CI, read-only first, writes only through PRs, sandboxed without production credentials, with deploys exposed through MCP and autonomy tiered by environment.*

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Claude একটা PR লিখল, আর Claude-এর review-ও কোনো Important finding পেল না। এখন কি merge করা যাবে?</summary>

**না, একজন মানুষ code owner-এর অনুমোদন লাগবে।** Finding নিজে PR অনুমোদন দেয় না। যে agent code লিখেছে সে অনুমোদন দিতে পারে না, এটাই separation of duties।

</details>

<details class="quiz">
<summary>২. "Production deploy-এর আগে release manager-এর অনুমোদন লাগবে" নিয়মটা কোথায় রাখবেন, যাতে কোনো engineer বন্ধ করতে না পারেন?</summary>

**Managed settings-এ, একটা hook হিসেবে।** Team-এর hook `.claude/settings.json`-এ থাকে, কিন্তু আপসহীন নিয়ম platform বা IT admin-এর managed settings-এ, আর `allowManagedHooksOnly` নিশ্চিত করে local কেউ সেটা বদলাতে পারবে না।

</details>

<details class="quiz">
<summary>৩. আপনার team CI/CD-তে Claude দিয়ে শুরু করতে চায়। প্রথম কাজ কোনটা: production deploy, নাকি ব্যর্থ build-এর বিশ্লেষণ?</summary>

**ব্যর্থ build-এর বিশ্লেষণ।** শুরু হয় শুধু-পড়ার কাজ দিয়ে। তারপর PR-এর পেছনে লেখার কাজ। Production-এ agent শুধু release প্রস্তুত করে, অনুমোদন দেন মানুষ।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **REVIEW.md** ঠিক করে review-এর pass, Important বনাম Nit, আর কী বাদ।
> - **Hook: allow, ask, block,** আর `exit 2` কারণ সহ থামায়।
> - **আপসহীন নিয়ম managed settings-এ।**
> - **Agent production gate পর্যন্ত, তার বেশি না।**

## 6. Maintain · loop বন্ধ করা

> [!NOTE]
> **এই chapter শেষে আপনি জানবেন:** কোনো মানুষ চালু না করেও loop কীভাবে নিজে চলে, control band কী, Claude কখন শুধু দেখে আর কখন কাজ করে, আর Claude Security ও Claude Tag কী কাজে লাগে।
>
> **In short:** The loop closes. A trigger invokes Claude with no person in the path, and what Claude finds re-enters the pipeline as a new intent.md.

### কী বদলায় · What changes

এতক্ষণ প্রতিটা stage-এ **একজন মানুষ প্রথম ধাপটা চালু করতেন।** এই stage-এ সেটা বদলায়: **Claude নিজে থেকে চলে।** যেমন একটা bug ticket খোলা হলো। একটা সারাক্ষণ চলা monitoring agent সেটা থেকে `intent.md` লিখল, আর কাজটা requirements, plan, build, test আর review পেরিয়ে গেল। প্রতিটা stage-এর মাঝে একটা স্বাধীন **confidence gate** থাকে, হয় একটা নির্দিষ্ট check, নয় একটা বিরোধী (adversarial) review agent। এটা ঠিক করে আগের stage-এর ফল এগোবে, নাকি মানুষের কাছে যাবে।

<div class="versus">
<div><b>TRADITIONAL · পুরনো পথ</b>Maintenance মানে প্রতিক্রিয়া। প্রতিটা ticket বা incident একজন মানুষের অপেক্ষায়। রাত ৩টায় alert বাজে, কেউ হয়তো দেখে না। Ticket backlog-এ পড়ে থাকে। Post-mortem-এর সিদ্ধান্ত code পর্যন্ত পৌঁছায়ই না, কারণ তার আগেই নতুন আগুন লাগে।</div>
<div><b>AI-NATIVE · নতুন পথ</b>একটা trigger (সীমা ভাঙা, ticket, channel-এর বার্তা, বা সময়সূচি) কোনো মানুষ ছাড়াই Claude-কে ডাকে। Claude সমস্যা খোঁজে, শুধু gate-ঘেরা পথে কাজ করে, আর যা পায় তা <code>intent.md</code> হিসেবে লেখে। মানুষ কাজ শুরু করেন না, শুধু বাছাই আর review করেন।</div>
</div>

### Control band · কখন "অস্বাভাবিক"?

একটা metric প্রতিদিন একটু ওঠানামা করে, সেটা স্বাভাবিক। **Control band** হলো সেই স্বাভাবিক ওঠানামার সীমা। Script একটা চলমান সময়-জানালায় (rolling window) গড় (mean) আর standard deviation (σ, সিগমা) হিসাব করে। গড় থেকে যত σ দূরে, ঘটনা তত অস্বাভাবিক।

<figure class="diagram">
<svg viewBox="0 0 560 190" role="img" aria-label="A metric wobbles around its mean inside the 1, 2 and 3 sigma bands, then one point jumps above the 3 sigma line. That breach invokes Claude">
<text class="note start" x="10" y="50">3σ: act</text>
<text class="note start" x="10" y="70">2σ: diagnose</text>
<text class="note start" x="10" y="90">1σ: log</text>
<text class="note start" x="10" y="110">mean</text>
<path class="edge skip" d="M120 50 L540 50"/>
<path class="edge skip" d="M120 70 L540 70"/>
<path class="edge skip" d="M120 90 L540 90"/>
<path class="edge" d="M120 110 L540 110"/>
<path class="edge skip" d="M120 130 L540 130"/>
<path class="edge skip" d="M120 150 L540 150"/>
<path class="edge skip" d="M120 170 L540 170"/>
<path class="arrow" d="M120 112 L150 104 L180 118 L210 108 L240 98 L270 114 L300 106 L330 120 L360 100 L390 112 L420 96 L440 36 L460 108 L490 116 L520 104 L540 110"/>
<circle class="node up" cx="440" cy="36" r="6"/>
<text class="note" x="440" y="16">breach → invoke Claude</text>
</svg>
<figcaption>Normal wobble stays inside the bands; a jump past 3σ is a breach that wakes Claude. স্বাভাবিক ওঠানামা band-এর ভেতরে থাকে, 3σ পার হলেই সেটা breach, তখন Claude-এর ডাক পড়ে।</figcaption>
</figure>

**খেয়াল করুন: অস্বাভাবিকতা ধরার কাজটা পুরোপুরি নির্দিষ্ট (deterministic), কোনো model নেই।** একটা সাধারণ script গণিত দিয়ে ঠিক করে কখন breach হলো। Claude আসে শুধু তার পরে, কারণ খুঁজতে আর সমাধান প্রস্তাব করতে।

*In English: a deterministic script tracks the rolling mean and standard deviation of a metric; the farther a point falls from the mean, measured in sigmas, the stronger the response.*

### Closing the loop · ধাপে ধাপে

**Prerequisite:** `intent.md` (loop-কে আবার শুরু করার একটা কাঠামোবদ্ধ output দেয়), Claude-চালিত PR review, কাজের সীমা হিসেবে hook, আর CI/CD-র rollback পথ (সবচেয়ে উঁচু স্তর এটা ডাকে)। **Infrastructure:** detection script যে metrics store query করতে পারে (Prometheus, CI-এর API বা সমতুল্য), repo পড়ার access, আর Claude Code non-interactive চালানোর উপায়: CI-তে, অথবা webhook গ্রহণ করে এমন service-এর জন্য Agent SDK।

1. **একটা metric বেছে নিন,** যার rolling baseline স্থির। যেমন CI test-এর ব্যর্থতার হার, deploy-এর পরে 5xx error-এর হার, বা PR cycle time।
2. **Detection script লিখুন।** সাধারণত rolling window-এ mean আর standard deviation, সাথে নিয়ম (Western Electric বা এমন কিছু), যাতে **হঠাৎ লাফ আর ধীরে ধীরে সরে যাওয়া, দুটোই ধরা পড়ে।** Script version-controlled, unit test করা, আর পুরোপুরি deterministic।
3. **প্রতিক্রিয়ার স্তর config-এ লিখুন** (নিচে `bands.yaml`)।
4. **Trigger স্তর:** GitHub বা GitLab-এ scheduled workflow, monitoring stack-এর webhook, বা network-এর ভেতরে একটা cron job। **Claude চলে stateless:** CI runner-এ non-interactive ধাপ হিসেবে, বা sandbox container-এ Agent SDK service হিসেবে। Stateless আর non-interactive বলেই **কেউ চালু না করলেও loop শুরু আর শেষ হতে পারে।**
5. **Claude তার রোগনির্ণয় লেখে `intent.md` হিসেবে,** Chapter 1-এর format-এ: অস্বাভাবিকতা আর তার প্রমাণ, প্রস্তাবিত ফল, প্রভাবিত system, আর খোলা প্রশ্ন। তারপর বাকি সব কাজের মতোই pipeline দিয়ে যায়।
6. **মানুষ বাছাই করেন।** Service owner বা on-call engineer queue দেখেন, product-সংক্রান্ত finding product owner-এর কাছে পাঠান। তিনটা পথ: **এখনই ঠিক করো, পরে করো, বা বাদ দাও।** বাদ দেওয়ার সিদ্ধান্ত band-কে টিউন করে, অকারণ alert কমায়।
7. **Fix ship হলে incident-এর একটা eval যোগ করুন** (Chapter 4), যাতে একই সমস্যা আর ফিরে না আসে।

| স্তর | Script কী করে | Claude কী পারে |
|---|---|---|
| 1σ | শুধু log করে | কিছু না |
| 2σ | Claude-কে ডাকে | **শুধু পড়ে,** কারণ খোঁজে |
| 3σ | Claude-কে ডাকে | কাজ করতে পারে, **তবে শুধু** review gate-এ PR খুলে, বা আগে-অনুমোদিত runbook চালিয়ে |

📄 `bands.yaml (result page speed in result week)`

```yaml
metric: result_page_p95_latency_ms
baseline: rolling_30d
rules: western_electric
tiers:
  1sigma: { action: log }
  2sigma: { action: diagnose,
            tools: "Read,Grep,Bash(gh run view *)" }
  3sigma: { action: propose,
            routes: [pull_request, runbook:rollback-deploy] }
```

আরও কয়েকটা উদাহরণ যেখানে এই pattern কাজে লাগে:

- **Flaky test:** CI ব্যর্থতার হার বাড়লে Claude খুঁজে বের করে কোন test অনিয়মিত, তারপর সেটা আলাদা করা (quarantine) বা দোষী পরিবর্তন revert করার PR খোলে।
- **Deploy-এর পরে 5xx error:** হার 3σ পার হলে আগে-অনুমোদিত rollback runbook চলে।
- **PR cycle time:** ধীরে ধীরে বাড়তে থাকলে Claude একটা report লেখে কোথায় PR আটকে আছে।

**Governance:** স্তরের সীমা version-controlled config থেকে বাধ্যতামূলক, আর permission ও managed settings production access বন্ধ রাখে। প্রতিটা ডাক, finding আর বাছাইয়ের সিদ্ধান্ত সময় সহ রেকর্ড হয়। **Finding বাছাই আর অনুমোদন করেন একজন service owner।**

*In English: a deterministic detector breaches a band, Claude runs headless and stateless to diagnose or propose through gated routes, writes its finding as intent.md, and a human triages it.*

### Claude Security · নিয়মিত security scan

**Claude Security** (public beta, Enterprise-এর জন্য) codebase-এ নিয়মিত দুর্বলতা খোঁজে। এটাও একই loop-এর অংশ:

1. **প্রথমে একটা baseline scan,** এখন কী অবস্থা তা জানতে।
2. **তারপর সময়সূচি,** যেমন সপ্তাহে একবার।
3. **প্রতিটা finding-এর সাথে একটা confidence rating** থাকে, তাই কোনটা আগে দেখবেন বোঝা সহজ।
4. **ভুল finding বাদ দিন, কারণ লিখে।** কারণটাই রেকর্ড।
5. **আসল finding-এর জন্য দুই পথ:** PR দিয়ে সরাসরি patch, অথবা বড় কাজ হলে `intent.md` বানিয়ে loop-এ পাঠানো।
6. **Fix-এর পরে একটা eval যোগ করুন,** আর দরকারে finding export করুন অন্য tool-এ।

### Claude Tag · Slack-এ প্রথম সাড়া

সব কাজ alert থেকে আসে না। অনেক কাজ আসে **মানুষের বার্তা থেকে,** যেমন Slack channel-এ "result page খুলছে না"। **Claude Tag** (public beta) Slack-এ থাকে আর এই channel-গুলোতে **প্রথম সাড়া দেয় (first responder):** প্রশ্ন বোঝে, তথ্য জোগাড় করে, আর দরকারে কাজ loop-এ পাঠায়।

- **Incident শেষে post-mortem লিখে একটা lessons file-এ রাখে,** যাতে শেখা জিনিস হারিয়ে না যায়।
- **Channel নিজেই audit trail:** কে কী জিজ্ঞেস করল, Claude কী করল, সব সেখানে লেখা।

*In English: Claude Security runs scheduled vulnerability scans with confidence ratings that turn into PRs or intents, and Claude Tag answers first in Slack channels, writing post-mortems to a lessons file.*

### একটা কাজ ধরে দেখি · The loop, closed

Result portal-এর গল্পটা শেষ করি:

1. Result প্রকাশের দিন সকাল ১০টায় status page-এর p95 latency 3σ পার হলো। **Script breach ধরল,** কোনো model ছাড়াই।
2. Trigger Claude-কে ডাকল। Claude log আর সাম্প্রতিক deploy পড়ে দেখল **৬০ সেকেন্ডের cache গতকালের একটা পরিবর্তনে বন্ধ হয়ে গেছে।**
3. 3σ স্তর, তাই Claude **cache ফিরিয়ে আনার একটা PR খুলল,** আর `intent/status-page-cache.md` লিখল।
4. On-call engineer queue দেখে "এখনই ঠিক করো" বেছে নিলেন। Review pass চলল, code owner অনুমোদন দিলেন, pipeline release প্রস্তুত করল, release manager অনুমোদন দিলেন।
5. শেষে একটা **eval যোগ হলো:** "status query cache বন্ধ করলে test fail করবে"। Loop বন্ধ হলো, আর পরের বার একই ভুল CI-তেই ধরা পড়বে।

### কেন এটা আপনার জানা দরকার

- **রাত ৩টার alert আর হারিয়ে যায় না।** কেউ না দেখলেও প্রথম তদন্ত হয়ে থাকে।
- **Model কখনো একা "অস্বাভাবিক" ঘোষণা করে না।** Detection deterministic, তাই বিশ্বাসযোগ্য আর পরীক্ষাযোগ্য।
- **শেখা জিনিস code-এ পৌঁছায়:** প্রতিটা incident একটা intent আর একটা eval রেখে যায়।

### নিজেকে যাচাই করুন

<details class="quiz">
<summary>১. Metric গড় থেকে 2σ দূরে গেল। Claude কি fix-এর PR খুলতে পারে?</summary>

**না।** 2σ-তে Claude শুধু পড়তে পারে, কারণ খুঁজতে পারে। কাজ করার অনুমতি (PR খোলা বা আগে-অনুমোদিত runbook) আসে শুধু 3σ-তে।

</details>

<details class="quiz">
<summary>২. Detection-এর কাজটা model দিয়ে না করে deterministic script দিয়ে করা হয় কেন?</summary>

কারণ **কখন alarm বাজবে, সেটা নির্ভরযোগ্য, পরীক্ষাযোগ্য আর ব্যাখ্যাযোগ্য হতে হবে।** Script version-controlled আর unit test করা। Model আসে শুধু breach-এর পরে, কারণ খোঁজা আর সমাধান প্রস্তাবের জন্য।

</details>

<details class="quiz">
<summary>৩. Loop "বন্ধ" হলো কখন বলা যায়?</summary>

যখন **production-এর সমস্যা নিজে থেকে নতুন `intent.md` হয়ে আবার Plan-এ ঢোকে,** pipeline দিয়ে fix ship হয়, আর একটা eval যোগ হয় যাতে একই সমস্যা আর না ফেরে। মানুষ শুরু করেন না, শুধু বাছাই আর অনুমোদন করেন।

</details>

> [!TIP]
> **মনে রাখুন:**
> - **Detection deterministic,** Claude আসে breach-এর পরে।
> - **1σ log, 2σ শুধু পড়া, 3σ gate-ঘেরা কাজ।**
> - **প্রতিটা finding একটা নতুন `intent.md`,** প্রতিটা fix একটা নতুন eval।
> - **মানুষ শুরু করেন না, বাছাই আর অনুমোদন করেন।**

## শেষ কথা · Closing thoughts

এই playbook-এর মূল কথা এক লাইনে: **AI code লেখাকে দ্রুত করেছে, এখন বাকি lifecycle-কেও সেই গতিতে আনতে হবে, নিয়ন্ত্রণ না হারিয়ে।** উপায় হলো প্রতিটা stage-কে একটা commit করা artifact-এ শেষ করা, নিয়মকে skill আর hook-এ লেখা, আর মানুষকে বসানো gate-এ।

| Stage | Artifact | মানুষের gate |
|---|---|---|
| Plan | `intent.md` | Product owner গ্রহণ করেন |
| Design | `spec.md` | Product owner + policy owner |
| Build | `plan.md`, diff | Engineer plan অনুমোদন দেন |
| Test | Test output, eval | Code owner প্রমাণ দেখেন |
| Deploy | PR + finding | Code owner, release manager |
| Maintain | নতুন `intent.md` | Service owner বাছাই করেন |

**কোথা থেকে শুরু করবেন?** যে play-এর কোনো prerequisite নেই: **intent.md, CLAUDE.md, skills, feedback loop, আর hooks as approval gates।** এদের যেকোনোটা আজই, একা শুরু করা যায়। তারপর ধীরে ধীরে হাতে চালানো ধাপগুলোকে trigger-এ বদলান।

আর একটা কথা কখনো ভুলবেন না: **loop যত স্বয়ংক্রিয়ই হোক, বিচারের দায়িত্ব মানুষের।** Agent প্রস্তাব দেয়, flag করে, প্রস্তুত করে। কী ship হবে, কোন ঝুঁকি মেনে নেওয়া যায়, সেই সিদ্ধান্ত মানুষের, আর artifact chain সেই সিদ্ধান্তের লিখিত প্রমাণ।

*In English: AI made code fast; the playbook makes the rest of the lifecycle keep pace by ending every stage in a committed artifact, encoding policy as skills and hooks, and keeping human judgment at the gates.*

এই post-এর শব্দগুলো (agent, hook, skill, MCP, worktree) নতুন মনে হলে আগে পড়ুন [Speak AI Coding](/blog/ai-coding-dictionary), আর LLM ভেতরে কীভাবে কাজ করে জানতে [Inside the Chat Box](/blog/inside-the-chat-box)।

> [!NOTE]
> **Credits:** এই post Anthropic-এর article [The AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook) (Louis Claxton, Applied AI team, August 2026)-এর বাংলা ব্যাখ্যা। ধারণা আর play-গুলো ওদের। Result portal-এর উদাহরণ, diagram আর code sample আমাদের। প্রতিটা feature-এর বিস্তারিত আছে [Claude Code docs](https://code.claude.com/docs)-এ।
