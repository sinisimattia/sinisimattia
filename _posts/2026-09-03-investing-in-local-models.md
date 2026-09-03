---
title: "Stop renting your inner loop"
subtitle: "The frontier orchestrates, local models do the work"
date: 2026-09-03 09:00:00 +0000
author: "Mattia Sinisi"
description: "Frontier models should conduct the orchestra, not play every instrument. The case for investing in small, locally-runnable coding models."
read_time: 19
related:
  - _posts/2026-03-11-rebuilt-platform-from-scratch.md
  - _posts/2020-09-21-how-open-source-saved-our-business.md
further_links:
  - title: "Small Language Models are the Future of Agentic AI"
    url: "https://arxiv.org/abs/2506.02153"
  - title: "Can Small Agents Collaborate to Beat a Single Large Language Model?"
    url: "https://arxiv.org/abs/2601.11327"
header:
  teaser: "/assets/images/thumbnails/investing-in-local-models.webp"
  image: "/assets/images/thumbnails/investing-in-local-models.webp"
  image_width: 1440
  image_height: 960
---

Picture a morning where the office internet goes down. Nothing dramatic, a cut cable somewhere in the building, the kind of outage that used to mean "great, a quiet morning to actually finish something".

How much of your work stops?

Not deployment, not the ticket board, those have always needed the network. I mean the actual act of writing code: every rename, every test fix, every "convert this payload into that entity". If the honest answer is "most of it", then it's worth asking when that decision got made, because for most of us it never really did. It happened one convenient default at a time.

The question is no longer "*is AI useful for development*", that one is settled, I wrote a whole article about [how we rebuilt our platform](/blog/rebuilt-platform-from-scratch/) with agents doing a serious chunk of the work. The question that actually matters now is much less exciting and much more important:

> **Who should be doing which part of the work?**

And my answer is that we've got it backwards. We're using the biggest, most expensive, most centralized models in the world to do the most repetitive, mechanical, boring work in software development. And we're doing it at a moment when we no longer have to.

# What changed

If you tried running a coding model on your own machine a couple of years ago, you probably came away unimpressed. The local options were toys: they could autocomplete a `for` loop and then confidently hand you a method that didn't exist.

That is simply not where we are anymore, and I suspect a lot of developers haven't updated their mental model since the last time they tried.

## The active-parameter trick

The release that makes the case best is [Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Coder-Next), from February 2026, under Apache 2.0. It's a hybrid Mixture-of-Experts model with 80 billion parameters in total, of which it activates about 3 billion per token, 10 experts out of 512, with 262,144 tokens of native context. Its [technical report](https://arxiv.org/abs/2603.00729) puts it at 70.6% on SWE-bench Verified with SWE-Agent, 71.1% with MiniSWE-Agent and 71.3% with OpenHands.

That spread of three numbers for one set of weights is worth pausing on, and I'll come back to it: **the scaffold you wrap the model in moves the score**. Hold that thought.

Now read the rest with a hardware brain instead of a benchmark brain. The headline isn't the 80 billion, it's the **3 billion active**: what a token costs to generate is set by the parameters that actually fire, not by the ones sitting in memory. That decouples how good a model is from how much compute each token burns, and it's the single most important thing to happen to local inference.

One caution, because this is where enthusiasm on the internet tends to outrun the facts. Qwen's own deployment notes point you at vLLM or SGLang and suggest cutting the context down from 256K if you hit out-of-memory. "80B on your gaming card" is not a vendor claim, it's a community one about quantized setups, and mileage will genuinely vary.

## Open doesn't mean local

Qwen isn't alone, either. February 2026 brought [MiniMax M2.5](https://huggingface.co/MiniMaxAI/MiniMax-M2.5) at 80.2% and [GLM-5](https://huggingface.co/zai-org/GLM-5) at 77.8% on the same benchmark, both with weights published on Hugging Face.

But let's be honest about what those two actually are: M2.5 is a 229-billion-parameter model, and GLM-5 is 744 billion, 40 billion of them active. They are open, which matters enormously, and neither is going under your desk. **Don't let a license fool you into thinking every open-weight release is a local one.**

The genuinely local end of the spectrum is where Mistral and All Hands have been working, with [Devstral](https://mistral.ai/news/devstral): smaller models shaped specifically for agentic software engineering, meaning codebase exploration, multi-file edits and tool use rather than chat. Apache 2.0, and per Mistral's own announcement light enough to run on a single RTX 4090 or a Mac with 32GB of RAM. Small and *purpose-built*, not small and *crippled*.

So the picture isn't "open models caught up". Two separate things are happening at once: the open ceiling went up, and, more usefully for us, the floor of *good enough to do real work* dropped onto consumer hardware.

## Reading benchmarks honestly

A disclaimer, because I don't want to be another guy quoting benchmark numbers at you like scripture: these are largely self-reported figures, on benchmarks everyone is optimizing against and that are visibly saturating. I would not bet a sprint on the second decimal place.

But the argument doesn't need the decimals. It needs one much softer claim, and I think this one is now just true:

> The gap between frontier and open-weight models is no longer a gap in *ordinary work*. It's a gap in *hard work*.

And if you look honestly at your own day, how much of it is actually hard work?

# What the research says

The reason this is an argument rather than a hunch is that the literature has been saying it out loud for a while, from more than one direction.

## Agents repeat themselves

The clearest statement of the thesis is a position paper from a team at NVIDIA, led by Peter Belcak, with the wonderfully unsubtle title [*Small Language Models are the Future of Agentic AI*](https://arxiv.org/abs/2506.02153). Their central observation is the kind that seems obvious the second someone says it:

> In an agentic system, the model performs a small number of specialized tasks, repetitively, and with very little variation.

That's it. That's the whole insight. An agent isn't having a wide-ranging conversation about philosophy and then writing a sonnet. It's applying a diff. Then applying another diff. Then reading a stack trace and applying another diff. Four hundred times a day, in the same three shapes.

We are paying for general intelligence and using it as a very expensive `sed`.

## Put the thinking in the orchestrator

The second paper is the one I'd actually recommend reading, [*Can Small Agents Collaborate to Beat a Single Large Language Model?*](https://arxiv.org/abs/2601.11327) by Żywot, Chen, Yuan, Søgaard and de Rijke, from January 2026. They built a deliberately minimal multi-agent setup, one orchestrator plus a small set of specialized sub-agents with restricted communication between them, and ran it against single larger models on tool-heavy tasks, varying model size to isolate the effect of scale.

Two findings matter. The first is that the small collaborative system beat substantially larger single models, *even when those larger models had direct tool access themselves*.

The second is the one worth dwelling on: the benefit of explicit reasoning showed up **at the orchestrator level**, and turning reasoning on in the sub-agents was somewhere between useless and actively harmful. Their conclusion is that the system's performance depends primarily on the capacity of the orchestrator rather than on the capabilities of the individual specialized agents.

That's a stronger claim than "small models are cheaper". It says the sub-agents are not where the intelligence needs to be, and that making them think harder can *hurt you*. If you've ever watched a perfectly good junior developer get worse at a well-specified task because they started second-guessing the spec, you already have the intuition.

Put the two papers side by side and you get something that stops feeling like a research result and starts feeling like an architecture:

> **Spend intelligence where the decisions are made. Spend efficiency where the work is done.**

# The architecture

It's the same idea I keep coming back to about human teams and about code: **one component, one job**. It just took me a while to apply it to the models themselves.

## The orchestrator

The frontier model reads the vague, badly-written request from a human being and figures out what is actually being asked. It decomposes the problem, writes the plan, decides the order, and adjudicates when two sub-tasks disagree.

This is genuinely hard, genuinely ambiguous work, and it deserves the best model money can rent. It's also, crucially, a *small number of calls*. High value each, few of them.

## The executors

The local models apply the edit. Run the test. Read the trace. Rename the thing in 200 files. Write the boring half of the migration. Translate the payload.

These are many, many calls, each one mechanical, each one with a marginal cost of approximately nothing once the hardware is sitting there.

## The harness

Here's the part most people underestimate: **the harness does more of the work than the weights do**.

There's a paper with a title that reads like a slap, [*Don't Adapt Small Language Models for Tools; Adapt Tool Schemas to the Models*](https://arxiv.org/abs/2510.07248), making a point we should all recognize from our day jobs. Small models hallucinate tool names, calling the plausible-sounding thing they learned in pretraining instead of the thing you actually gave them. The authors' fix involves no training at all: **rename the tool components to match what the model already expects**. They report improvements of up to 17%, with schema misalignment errors down by 80%.

Eighty percent of a whole class of failure, deleted by choosing better names. I wrote a [whole article about naming conventions](/blog/writing-code-for-others/) six years ago and did not expect it to become an inference-cost optimization, but here we are.

This is also the thought I asked you to hold earlier. The same Qwen weights scored 70.6%, 71.1% and 71.3% depending only on which agent scaffold was driving them: nearly a point of benchmark performance from the harness alone, with the model held constant. That's not a rounding error, that's a lever, and unlike the weights it's a lever you own.

Every bit of competence you move out of the weights and into the tool schema, the type system, the linter, the test suite and the deterministic parts of your pipeline is competence you no longer have to rent by the token.

And there's a consequence here that I'd put above any cost spreadsheet:

> **Your inner loop keeps working when the API doesn't.**

# Tokens are a billing unit

I want to spend a section on this because it's the part we've all quietly accepted without examining.

Ask a developer today how expensive a piece of AI-assisted work was and they'll answer in tokens. We put tokens in dashboards. We have opinions about tokens. We refactor prompts to use fewer of them. Somewhere along the way it became the natural unit for talking about the cost of thinking.

Now stop and ask what a token actually measures.

It doesn't measure time. It doesn't measure electricity. It doesn't measure how hard the machine worked, and it doesn't map cleanly onto a FLOP or a cache miss or a millisecond. Two requests with identical token counts can differ wildly in the compute they consume, and a request that costs nothing extra in tokens can hammer a GPU for a minute.

> A token isn't an engineering metric. It's a **billing** metric.

And that's fine! It's a perfectly good billing metric, honestly a clever one. If you're selling inference as a service you need a unit that's meterable, roughly proportional to your costs, easy to put on an invoice and comprehensible to the customer. Tokens are all of those things. Nothing sinister here, it's just what happens when a service needs a price list.

## Accounting as architecture

The problem is that we imported someone else's accounting unit into our engineering vocabulary, and then started making technical decisions with it.

It's an easy trap. Not letting an agent re-read a file it should absolutely re-read. Keeping context artificially small, not because the model does better with less, but because more costs more. Cramming two unrelated changes into one request to amortize the prompt.

Every one of those is an engineering decision made for accounting reasons. If a junior developer justified an architecture choice that way, most of us would push back immediately.

## Metrics we already know

Here's what's genuinely exciting about the local paradigm, and it isn't the money.

When the model runs on hardware you own, the cost of a call goes back to being made of things that physically exist:

*   **Throughput** — tokens per second, which here is a *performance* number, not a price
    
*   **Latency** — how long until the first token, and until the last
    
*   **Memory** — how much VRAM the weights and the KV cache actually occupy
    
*   **Concurrency** — how many agents run at once before the queue backs up
    
*   **Power** — watts, and the very real electricity bill underneath them
    

Look at that list. That's just... *computing*. Those are the metrics we've been reasoning about since forever, the same shape as "how many connections can this database take", "will this fit in cache", "is this endpoint I/O or CPU bound". You already know how to profile these. You already know how to capacity-plan them. You have tools, intuitions and years of scar tissue for exactly this class of problem.

> Going local doesn't make the cost disappear, it converts it from an invoice back into **processing power**.

That conversion changes the question you ask before every request. Right now the question is *"can I afford to ask this?"*, which is a finance question and an awful thing to have sitting in the middle of an inner loop. On local hardware the marginal cost of one more call is approximately zero, so the question becomes *"do I have the throughput for this?"*

That's an engineering question. You can answer it with a benchmark instead of a spreadsheet, and once you've answered it you can stop thinking about it and go back to writing software.

## Where tokens still matter

None of this makes tokens go away. It confines them.

You're still renting the orchestrator, and that layer is still metered per token, exactly as before. What changes is *what that number is a function of*.

Today, token spend scales with **how much work your team does**. Every diff, every retry, every test run. In this architecture it scales with **how many decisions need making** instead. Those two quantities are wildly different: a single well-decomposed plan can spawn hundreds of mechanical executions, and here you pay per plan, not per execution.

The industry seems to be converging on this too, and you can see it in the APIs. Anthropic now exposes a [task budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets) (in beta as I write this): an advisory token ceiling for a whole agentic loop, where the model sees a running countdown and paces itself against it rather than getting guillotined mid-thought.

Read that as a design statement. Token accounting is becoming a property of the *orchestration layer*, and the loop it orchestrates is expected to be someone else's problem. Which is exactly the split I'm arguing for, arrived at from the other direction.

### Key takeaways

*   Tokens are a billing unit, useful for invoices, misleading as an engineering metric
    
*   Optimizing your architecture around a vendor's pricing unit produces bad technical decisions that look responsible
    
*   Local inference restores costs you can profile: throughput, latency, VRAM, concurrency, watts
    
*   Tokens don't disappear, they become a concern of the orchestrator alone, scaling with decisions instead of with work
    

* * *

# Why it's an investment

## Cost shape

API spend scales with how much your team works. That's a strange thing to sign up for when you think about it: the more productive your developers become, the more the bill grows, forever, and at the end of it you own nothing.

Hardware is the opposite. It's one ugly number, and then it amortizes while you sleep.

You'll notice I'm not giving you a break-even figure, and that's deliberate. I went looking for one I'd be willing to put my name on and couldn't find it. What's out there is written either by people selling on-premise hardware or by people selling API credits, the estimates disagree with each other by an order of magnitude, and every one of them turns on assumptions about your volume that the author cannot possibly know. So I'm not going to launder somebody's sales deck through my blog: **run the numbers for your own team, on your own usage, and don't trust mine either.**

What I'll defend is the shape rather than the size. One of these costs grows with your team's output and leaves no asset behind; the other is fixed, amortizing, and yours. Which one wins depends entirely on your volume, and if your team makes a few hundred calls a week the answer is genuinely "keep paying per token".

And as argued above, the more valuable half of this was never the discount anyway. It's that whatever cost remains is finally denominated in something you can profile.

## Sovereignty

This one is less about paranoia and more about paperwork.

Every mechanical call your agents make ships a slice of your proprietary code to a third party. For a side project, fine, who cares. For the platform your company's entire revenue depends on, "where does our source code go and who could be compelled to hand it over" has stopped being a philosophical preference and become a line item somebody in legal has to sign.

The EU AI Act entered its enforcement era on 2 August 2026, when the Commission's supervision and enforcement powers over general-purpose model providers came into force. The headline penalties are real: up to €15 million or 3% of worldwide annual turnover for GPAI violations, and up to €35 million or 7% for prohibited practices ([the enforcement framework, from the Commission itself](https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act)).

But let's be accurate rather than scary, because a lot of writing on this is neither. **Those fines are aimed at model providers, not at you for using a coding assistant.** If you ship software rather than models, your exposure is the older and more boring kind: data protection, your processor agreements, what your vendor's terms actually permit, and whatever your clients made you sign. The AI Act didn't create that question, it just turned the temperature up enough that somebody finally has to answer it in writing.

Which is all the argument needs. "Our source code does not leave our infrastructure" is a sentence that ends a whole category of meeting. I'm not a lawyer, please don't take a blog post as advice, go and ask yours. But do ask them.

## Latency

This is the hardest one to put in a business case, so take it as a description rather than a statistic.

The inner loop is a latency-bound activity. When a model answers fast enough, it stops being a thing you consult and becomes a thing you reach for, like autocomplete or jump-to-definition, with no deliberation at all. When it's slow enough that you notice the wait, every request becomes a small decision, and you quietly start doing the little stuff by hand because asking isn't worth it.

I don't know where your personal threshold sits and I'm not going to invent a number for it. But I'd bet you've felt it, and it's why local matters for more than the invoice: it doesn't just make the same workflow cheaper, it changes which questions you're willing to ask.

## Optionality

Pricing changes. Rate limits appear. A model you built a workflow around gets deprecated on a Tuesday. Terms of service get rewritten. Every one of those is a decision made about your team, without your team.

Owning the executor tier doesn't make you immune, you're still renting the orchestrator. But it means the worst case is "our hardest tasks got more annoying for a morning" instead of "nobody can work today".

### Key takeaways

*   Per-token spend grows with your team's productivity and leaves you with no asset; hardware is a fixed cost that amortizes
    
*   The economics only work at high and predictable volume, be honest about whether that's you
    
*   Sovereignty stopped being a preference the moment it became paperwork
    
*   Owning the executor tier turns an outage from a work stoppage into an inconvenience
    

* * *

# The objections

One-sided articles are annoying, so here are the objections I find good.

## The frontier still wins

The hardest problems genuinely still need it. The work that involves holding a whole tangled system in your head and reasoning about it is exactly where the big models pull away, and what share of your week that represents varies enormously between codebases and roles. This is precisely why what I'm describing is a *hybrid*, not a purity contest. Anyone telling you to go fully local today is selling you something.

## You're buying ops

This is the big one. Right now your model provider handles capacity, updates, uptime and evaluation, and does it invisibly. Go local and all of that becomes yours: which quantization, which version, who notices when quality drifts, who owns the GPU when two teams want it.

That's real, recurring engineering cost. If you don't budget for it you'll end up with a very expensive paperweight and a team that quietly goes back to the API.

## Licenses vary

I say this as someone who has [built a business on open source](/blog/how-open-source-saved-our-business/) and cares about the distinction: "you can download it" and "you can use it commercially however you like" are not the same sentence.

Concrete example from the models named in this very article: GLM-5 ships under a plain MIT license, while MiniMax M2.5's card says *modified* MIT. I noticed that difference only because I went to the model cards to check a number for this post, which is rather the point. Read the license. Actually read it, don't read a blog post about it. Including this one.

## Long horizons

Small models lose the thread on multi-step planning and manage context badly. Which is... fine? That's the job you left with the orchestrator.

But it does mean your task decomposition has to be genuinely good, and if it isn't, the failure will look like "the local model is dumb" when the real problem is that you handed it a task nobody could do.

## "It'll get cheap anyway"

Next year's frontier model probably *will* be cheap enough. But it'll also be better, and there will be a new frontier above it, so the price gap moves down while the *ratio* between "smartest available" and "good enough for this diff" stays roughly where it is.

And here's the thing: the capability you build now, the routing, the evals, the harness, is what lets you exploit either outcome. If local wins, you're ready. If the frontier gets absurdly cheap, you've still got a better-instrumented pipeline than the team that just kept paying.

# Choosing the orchestrator

If the orchestrator is the one part you're still paying per token for, it's the one choice worth agonizing over. Everything else here is swappable; this is the bit with leverage.

## The criteria

The [rebuild article](/blog/rebuilt-platform-from-scratch/) listed the criteria my team used to pick a coding companion, and they still hold:

*   the underlying model must be as un-opinionated as possible, following OUR standards rather than the average of every project that used the same framework
    
*   the agent's actions must be configurable
    
*   it must produce a plan first, and only write code after a human says go
    

Notice something about that list: every single criterion is about *orchestration*. Not one is about how well the thing writes a `for` loop. Those bullets were written to describe a coding assistant, and it turns out they describe an orchestrator.

## Why Claude

That article landed on Claude and nothing since has moved me off it. If I were choosing an orchestrator today it would be Opus 5, and here are the mechanical reasons rather than a vibe, because "it feels smarter" is worth nothing to you.

**Reasoning depth is an actual dial.** There's an [`effort` parameter](https://platform.claude.com/docs/en/build-with-claude/effort) with five settings, from `low` up to `max`, governing how much the model spends on a response, thinking included. This matters enormously here, because the whole thesis is that different layers deserve different amounts of thought. And this is the part I find genuinely funny: the recommended use case listed for `low` effort is, literally, **subagents**. Meanwhile `xhigh` is described as being for long-horizon agentic work with token budgets in the millions. The vendor's own documentation is describing the orchestrator/executor split. I did not expect to find my argument in a parameter reference table.

**It decides how much to think, instead of you guessing.** Thinking is adaptive and on by default, and at the top effort levels you're not allowed to turn it off. The older approach of handing the model a fixed thinking-token budget is gone, which is the right call: nobody knows in advance how hard a given decomposition will be, and pretending otherwise was always theatre. For a layer whose entire job is *"work out what this ambiguous request actually requires"*, letting the model scale its own reasoning to the problem is exactly the behavior you want.

**A million tokens of context, spent where it's justified.** An orchestrator has to hold the plan, a map of the repo, the state of a dozen sub-tasks and whatever came back from the last three. That's a genuine need for a big window. Executors working one file at a time don't need it at all, which is precisely why they can be small. Different jobs, different requirements, one component one job.

**The harness is built for delegation.** Plan-then-execute, sub-agents, hooks, MCP. The rebuild article describes a fleet of specialized sub-agents built exactly this way, so the delegation model isn't hypothetical, it's in production. The difference now is pointing those sub-agents at hardware you own.

## The caveats

I'm not going to tell you the alternatives are bad, they're not. The frontier models from the other big labs are entirely capable of decomposing a task, and if your team is already deep into one of them with tooling and prompts built up around it, the switching cost almost certainly isn't worth chasing a benchmark delta that'll invert next quarter.

The deciding factor in that old list was the un-opinionated criterion: other models tended to write code the way similar projects using the same framework write code, instead of the way our standards said to. That was the axis where the difference was largest for us. Your codebase might not care about that at all.

Also, look at the price tag with clear eyes. At $5 and $25 per million input and output tokens, Opus-class models are *expensive*, and there's a more capable tier above them again at twice that. If you're wincing, good, that instinct is correct, and it's the strongest argument in this entire article for not letting a model like that do your mechanical work. As an orchestrator making a few dozen high-value calls a day, it's a rounding error next to a developer's salary. As an executor grinding through four hundred diffs, it's an act of self-harm.

And the last thing, which is a bit awkward to write directly under a recommendation:

> By my own argument, the orchestrator is the part you don't own. So build the seat, not the occupant.

If your routing layer can't swap the orchestrator for a different model in an afternoon, you've rebuilt the exact dependency this whole article is about escaping, only with more steps. Keep the interface between "who plans" and "who works" boring and explicit. Today my recommendation is Claude. Ask me again in a year and I'd like to be free to give you a different one.

## Building the seat

Which raises the obvious question: what actually holds the two tiers together? For a long time the answer was "you write it yourself", and that was a real barrier.

It isn't anymore. [opencode](https://opencode.ai) is an MIT-licensed coding agent that treats the model as configuration rather than as an identity. It reaches 75+ providers through Models.dev, including local ones, and it ships two switchable primary agents out of the box: `build`, with full access, and `plan`, which is read-only and denies file edits by default. That plan/build separation is the orchestrator/executor split, already there, before you configure anything.

The part that matters most for this article is that **each agent can be given its own model**. A local provider is declared by pointing at its endpoint, and cloud providers live in the same config file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": { "baseURL": "http://localhost:11434/v1" },
      "models": { "qwen3-coder-next": { "name": "Qwen3 Coder Next" } }
    }
  },
  "agent": {
    "plan":  { "model": "anthropic/claude-opus-5" },
    "build": { "model": "ollama/qwen3-coder-next" }
  }
}
```

That's a sketch rather than a config I'm promising will run untouched, so check it against the current docs. But look at what it says: **expensive model plans, local model executes.** The entire thesis of this article, expressed in about fifteen lines of JSON, in a file you own and can put under version control.

There's a detail that pushes it further. By default, if you don't set a model on an agent, primary agents take the global one and *subagents inherit from the primary agent that invoked them*. Set that deliberately and a Claude orchestrator can dispatch a fleet of local sub-agents. It also supports variants, so you can define a cheap low-reasoning profile for mechanical work and a deeper one for the hard calls, which is the same idea as the effort dial from earlier applied across a whole fleet.

I'm not claiming this is the only tool that can do it, and it's worth saying plainly that opencode is itself a young project moving fast. But it's the clearest existence proof I know of that the hybrid architecture is a configuration decision now, not an infrastructure project. If you want to try the thesis of this article this week rather than next quarter, that config file is where I'd start.

* * *

# Where to start

I don't want this to be one of those articles that gestures at a future and leaves you nothing to do. So, cheapest first:

1.  **Move autocomplete and single-file edits local this week.** Ollama or LM Studio, a coder model that fits your card, half an afternoon of setup. A genuinely small commitment, and it's the highest-frequency, lowest-difficulty slice of your day.
    
2.  **Instrument what you're doing now.** Look at your last thousand agent calls and sort them: how many were mechanical? That percentage isn't a curiosity, it's your addressable spend, and it's the only number that will convince anyone with a budget.
    
3.  **Build the eval harness BEFORE the infrastructure.** I cannot stress this enough, and it's the easiest mistake to make. You cannot route work you cannot measure. Without evals you have no idea whether the local model is doing a fine job or quietly making your test suite worse, and you'll end up deciding on vibes.
    
4.  **Route by task class, not by preference.** Decide in advance which shapes of work go local, and escalate to the frontier *on failure*, not by default. Defaults are how you ended up here. In practice this is a config file, not a project: see the opencode example above.
    
5.  **If you're a team, treat the executor tier as platform.** Owned, versioned, documented, monitored, boring. Exactly like CI. Not a clever thing one enthusiastic developer runs on their own machine, because the day they go on holiday you'll find out how load-bearing they were.
    

### Key takeaways

*   Start with the inner loop, it's the cheapest move and the biggest daily difference
    
*   Measure before you buy anything, the mechanical share of your calls IS the business case
    
*   Evals come first; infrastructure without evaluation is just an expensive guess
    
*   Escalation should be a failure path, never the default path
    

# Conclusion

We spent the last couple of years asking one question, over and over, in increasingly breathless press releases: *how good can the biggest model get?*

It was a fair question, and the answer turned out to be "very". But it was never the interesting one for people who have to actually ship things. The interesting question is the inverse, and it's an engineering question rather than a scaling one:

> **How little model do you need, once the harness is good?**

I like that question a lot more, partly because it rewards the boring virtues, clear boundaries, good naming, one job per component, tests you trust. And partly for a much more selfish reason.

The answer to the first question belongs to about five companies on earth. The answer to the second one belongs to you.

Thank you for sharing a bit of your time with me. If you've built something along these lines, or tried and found it wasn't worth it, I'd like to hear about it.
