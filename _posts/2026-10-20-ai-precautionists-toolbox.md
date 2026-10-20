---
title: "The AI Precautionist's Toolbox: don't let Claude Code make you useless"
subtitle: "Tools and habits that keep you a developer when the AI goes away"
date: 2026-10-20 09:00:00 +0000
author: "Mattia Sinisi"
description: "AI just cloned Photoshop and Office. Could you still code without Claude Code? Tools and habits that stop your skills from becoming vendor lock-in."
read_time: 20
related:
  - _posts/2026-03-11-rebuilt-platform-from-scratch.md
  - _posts/2026-09-03-investing-in-local-models.md
  - _posts/2021-09-21-anti-patterns.md
further_links:
  - title: "How AI assistance impacts the formation of coding skills"
    url: "https://www.anthropic.com/research/AI-assistance-coding-skills"
  - title: "How AI apps are offering free substitutes for Big Tech software"
    url: "https://www.aljazeera.com/news/2026/10/14/how-ai-apps-are-offering-free-substitutes-for-big-tech-software"
  - title: "Developer Who Cloned Photoshop With AI Just Did the Same to Microsoft Office"
    url: "https://decrypt.co/380991/developer-cloned-photoshop-ai-just-did-same-microsoft-office"
  - title: "Developer Releases Seven Free Adobe Clones Built With Claude Opus 5.5"
    url: "https://pasqualepillitteri.it/en/news/21619/free-adobe-clones-artcraft-claude-opus-5-5"
  - title: "AI coding agents could soon cost more than the developers using them"
    url: "https://www.theregister.com/ai-and-ml/2026/06/24/ai-coding-agents-could-soon-cost-more-than-the-developers-using-them/5260864"
  - title: "Superpowers: skills for coding agents"
    url: "https://github.com/obra/superpowers"
  - title: "REA: Reverse Engineer Anything"
    url: "https://github.com/morluto/rea"
  - title: "REA Reconstruction Companion"
    url: "https://github.com/ShadowSwaps/REA-Reconstruction-Companion"
  - title: "Spec Kit: spec-driven development with your coding agent"
    url: "https://github.com/github/spec-kit"
  - title: "Ponytail: make your AI agent think like the laziest senior dev in the room"
    url: "https://github.com/DietrichGebert/ponytail"
  - title: "graphify: turn any codebase into a queryable knowledge graph"
    url: "https://github.com/Graphify-Labs/graphify"
  - title: "OmniRoute: the free AI gateway"
    url: "https://github.com/diegosouzapw/OmniRoute"
  - title: "Code maintainability plummets in the AI coding era"
    url: "https://leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era"
  - title: "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
  - title: "We are Changing our Developer Productivity Experiment Design"
    url: "https://metr.org/blog/2026-02-24-uplift-update/"
header:
  teaser: "/assets/images/thumbnails/ai-precautionists-toolbox.webp"
  image: "/assets/images/thumbnails/ai-precautionists-toolbox.webp"
  image_width: 1440
  image_height: 1054
---

Earlier this month a developer named Brandon Thomas released ArtCraft: seven free, open-source apps that recreate most of the Adobe suite, from Photoshop and Lightroom to Premiere and Acrobat, written in Rust with Claude as his main development partner. A few days later he did the same to Microsoft Office, with [free clones of Word, Excel and PowerPoint](https://www.aljazeera.com/news/2026/10/14/how-ai-apps-are-offering-free-substitutes-for-big-tech-software). Since then, half the internet has been announcing the death of paid software, and the other half has been listing everything the clones still can't do.

I don't want to argue either side here. I'll only say that I believe open-source alternatives should always be available to consumers, and that maintaining software is a job. Someone has to fix the bugs and ship the updates years after the launch hype has died down. We have yet to see whether "AI clones" will get that kind of long-term support, especially once their developers realize there's no money to be made in a product that anyone can clone.

The clone story is a good reminder of how much of our work we now hand over to a model, and it brings me to the risk I actually want to talk about: forgetting how to code, or worse, never learning at all. This hits hardest for the people who came into software development through vibe coding, with no prior experience (and I really appreciate having them here, by the way).

There's data on this, too. In January, Anthropic published [a randomized controlled trial](https://www.anthropic.com/research/AI-assistance-coding-skills) on how AI assistance affects coding skills, with 52 mostly junior developers learning a new Python library. The ones using AI scored 17% lower on a quiz about the code they had just written, almost two letter grades, and they didn't finish significantly faster either.

Software architecture has a name for this kind of trap: **vendor lock-in**. It's what happens when your product, or part of it, depends entirely on another company (the _vendor_) and on _their_ product. Well-built, production-grade software stays as modular as possible for exactly this reason. If that vendor decides the feature your app is built on will now cost a fortune every month, you swap that one module for an alternative, or re-implement it yourself if it's cheap enough, and the rest of the app never notices.

That scenario isn't far-fetched for AI tools. With vendors moving from flat subscriptions to pay-per-token billing, Gartner has warned that [AI coding agents could soon cost more than the developers using them](https://www.theregister.com/ai-and-ml/2026/06/24/ai-coding-agents-could-soon-cost-more-than-the-developers-using-them/5260864).

> **What if the feature you're locked into is your ability to code?**

What if I take Claude Code away from you tomorrow? Maybe the price triples, maybe your company bans it, it doesn't really matter why. If you can't build anything without it, you have no skill and no leverage, and your whole career runs on a module you can't swap out.

This article is a toolbox for avoiding that situation, or at least softening the blow. The first part is about planning your work so that any agent, or any person, can carry it out, and then writing the code while burning fewer tokens. The second is about leveling up **your own skills**, so that losing the agent slows you down instead of stopping you. To close, I'll show you how I start new projects so they stay maintainable from day one.

# Leveling up your agents

Most of the "AI wrote me a mess" stories I hear begin the same way. Someone opens a chat, types "build me an app that does X", and lets the agent figure out the rest. The agent is happy to oblige: it picks the stack, the data model, the folder structure and a hundred smaller details, and you only find out which of those choices were wrong three weeks later, when you try to change something.

A smarter model won't fix this. What fixes it is the oldest rule in our job, and it has nothing to do with AI: a lot of planning has to happen before anyone writes a line of code.

## From ideas to actionable work items

That planning ends up in a **spec** (short for _specification_): a document that describes what you're building and why, in enough detail that someone else could build it without coming back to you with questions. It covers what the product does, who it's for, what's deliberately left out, and how you'll know a feature works. What it usually doesn't cover is _how_ to build it. The stack, the architecture and the file layout go into a technical plan that comes right after.

Then the spec gets broken down into **tasks**: small pieces of work, each with a clear definition of "done", ideally a test that passes. The right size is the one where nobody has to make an important decision while doing the task. All the hard thinking already happened in the spec, so a task can be picked up by a cheap, frankly "dumb" model, or by a human with no AI at all.

This is where planning connects back to vendor lock-in. Once the thinking lives in the spec and the task list, whoever executes the tasks becomes a swappable module: Claude Code today, a small model running on your own laptop tomorrow (I made the case for those in [Stop renting your inner loop](/blog/investing-in-local-models/)), or you, if everything else goes away.

> **When the thinking lives in the spec, anyone can pick up the next task, including you.**

How you get to a spec depends on where you're starting: an idea that only exists in your head, or an app that already exists.

### Brainstorm a new idea

When all you have is an idea, the hard part is getting it out of your head and onto paper without skipping the parts you haven't thought through yet. For this I use [Superpowers](https://github.com/obra/superpowers), an open-source collection of skills for coding agents.

Its brainstorming skill doesn't jump to code. It interviews you, one question per message, about what you're building, why, and what would make it a failure even if it technically works. Every so often it plays back what it has understood so far, so you can correct a misunderstanding before it gets written down. When it has enough, it writes the design (your spec) as a markdown file in your repository. Before you even see it, a fresh agent with no context reads it and lists the questions a builder would still need answered, so the gaps get filled while the conversation is still fresh.

It isn't tied to a single vendor, either: besides Claude Code it works with Codex, Antigravity and a few other agents, which fits nicely with the point of this whole article.

### Reverse-engineer something that already exists

Sometimes the idea isn't yours at all: it's a feature you saw in another app, or an old internal tool nobody has the source code for anymore. In that case you don't need to imagine the spec, you need to extract it from something that already works.

[REA](https://github.com/morluto/rea) (short for _Reverse Engineer Anything_) is an open-source MCP server and CLI that lets your agent take software apart without its source code. It handles native binaries, Electron apps, .NET assemblies, Android APKs, websites and a lot more, and the analysis runs locally on your machine. What makes it useful for planning is that it doesn't just hand your agent a pile of pseudocode: every conclusion comes with the evidence behind it and the limits of what it could actually see, so you know which parts are facts and which are educated guesses.

REA on its own stops at the findings. To turn them into a spec, you can add [REA Reconstruction Companion](https://github.com/ShadowSwaps/REA-Reconstruction-Companion), a third-party skill built on top of it. Its default mode, "Understand and specify", produces requirements, acceptance criteria and a proposed architecture, each one linked back to the evidence that supports it, while keeping what was observed separate from what was inferred and from your own design choices. You end up with the same thing the brainstorming route gives you, a spec, except this one is based on something real you can test against.

One word of caution: being able to inspect an app doesn't automatically make it legal to rebuild it, so check the license and terms of whatever you point REA at.

### Turning your spec into tasks

Whichever way you got your spec, the next step is the same: breaking it down into tasks small enough that nobody has to make an important decision while doing one. This is a skill in its own right, and it's worth learning to do by hand before you let a tool do it for you.

Before you write a single task, make the technical decisions. Which files will exist and what is each one responsible for? What does the data look like? How do the parts talk to each other? This is the technical plan I mentioned earlier, and skipping it is the most common mistake I see: a task list built on top of undecided architecture just pushes those decisions onto whoever picks up each task, one guess at a time.

Once the plan is in place, these are the rules I follow to split the work:

- **Group tasks by feature, not by layer.** "Build the database", "build the API" and "build the UI" are three tasks that only work once all three are finished. Group them by user story instead, so that after each group the app does one more thing than before. The first group should be the smallest version of the product that is actually useful.
- **Give every task its own definition of done.** Ideally that's a test that has to pass. If you can't say in one sentence how to check that a task is finished, it's either too big or too vague.
- **Leave no decisions inside a task.** Name the file, the function, the values. Here's a quick test: if two developers could take the same task and come back with incompatible results, it isn't specific enough yet.
- **Order by dependency, and mark what can run in parallel.** Foundations go first, because everything else builds on them. Tasks that touch different files and don't depend on each other can be done at the same time, by different people or different agents.

Here's what that looks like for something as ordinary as a password reset:

```
Story: a user who forgot their password can set a new one

T001      Add a password_reset_tokens table (user_id, token_hash, expires_at) with a migration.
          Done when: the migration runs up and down on an empty database.
T002 [P]  Add ResetTokenService.issue(userId) in src/auth/reset-token-service.ts.
          It stores a hashed token that expires after 30 minutes.
          Done when: a unit test shows the token is rejected after 30 minutes.
T003 [P]  Add the "password-reset" email template, with a link to /reset?token=...
          Done when: a snapshot test renders it with a sample token.
T004      Add POST /auth/password-reset: issue a token, send the email, always answer 202.
          Done when: integration tests get a 202 for both a known and an unknown email.
T005      Add POST /auth/password-reset/confirm: check the token, update the password, delete the token.
          Done when: a test shows the same token can't be used twice.
```

Compare that with a single task called "implement password reset", and imagine handing each version to a small local model. Notice where the decisions went, too: the hashed tokens, the 30-minute expiry, the 202 that doesn't tell anyone which emails have an account. They were made once, in the plan, and the tasks just carry them. A small model can execute this list. So can you, with no AI at all.

You don't have to type every task list yourself, though. [Spec Kit](https://github.com/github/spec-kit) is GitHub's open-source toolkit for what they call _spec-driven development_: it walks your agent from a constitution (the project's ground rules) through the spec and the technical plan, all the way to a `tasks.md` file with numbered tasks grouped by user story and `[P]` markers on the ones that can run in parallel. If you went the Superpowers route, its writing-plans skill does the same job with less ceremony, writing bite-sized tasks for "an engineer who has not seen this codebase or this spec".

They're two options among many, and whichever one generates the list, check it against the rules above before handing it to anyone. The tool writes the tasks, but you're still the one who signs them off.

## Writing code: minimal consumption, maximum code quality

With a spec and a task list in hand, it's finally time to write code, and this is where most of your tokens go. You can cut that down in three ways: get the agent to write less code, stop it from re-reading your whole codebase every session, and pay less for every token it does use. Here's one tool for each.

### Ponytail: write code like a lazy senior developer

Left alone, coding agents love to over-build. Ask for a date formatter and you get a configurable formatting framework, a new dependency and a factory class "for future flexibility". [Ponytail](https://github.com/DietrichGebert/ponytail) is a skill that pushes the agent the other way, and its tagline sums it up: "The best code is the code you never wrote."

Before writing anything, the agent has to climb a short ladder and stop at the first step that works. Does this need to exist at all? Is it already somewhere in the codebase? Does the standard library or the platform already do it? Is there a dependency you've already installed that does? Can it be one line? Only when every answer is no does it write new code, and then only the minimum. It doesn't cut corners where it matters, though: validation at trust boundaries, error handling that prevents data loss, security and accessibility are explicitly off-limits, and any non-trivial logic leaves a small test behind. The shortcuts it does take get marked with a `shortcut:` comment in the code, explaining the limit and when to upgrade, so nothing is hidden from you.

It also comes with ponytail-review, a code review skill that reads your change the way the developer on call for it would. It checks things in order of priority: is it correct, is it safe, does it hold under load, is it tested, is it fast, and only last, is it lean. Every finding has to come with a concrete case, so you won't get any vague "consider refactoring this".

In the maintainer's own benchmark (39 tasks, five runs each, with and without the skill), Ponytail produced 53% less code and 45% fewer output tokens, at 26% lower cost. For the purposes of this article, though, the savings are a bonus. What matters more is that every line the agent doesn't write is a line you won't have to understand later, when Claude isn't around to explain it.

### graphify: stop paying your agent to re-learn your codebase

Every new session starts the same way: the agent knows nothing about your project, so it greps around, opens file after file, and rebuilds its picture of your codebase from scratch. You pay for that tour every single time.

[graphify](https://github.com/Graphify-Labs/graphify) builds that picture once and saves it. It parses your code locally with tree-sitter, without sending it to any model, and turns it into a knowledge graph of your files, functions and classes and how they connect to each other. Docs and PDFs can go in too, through a model pass that can also run locally. The result lands in a `graphify-out/` folder: a `graph.json` your agent can query, a `GRAPH_REPORT.md` summary, and a `graph.html` you can open in the browser and explore.

After a one-time setup, graphify tells your agent to query the graph before it starts searching through files (on Claude Code it even adds a hook that nudges it there). A git hook rebuilds the graph on every commit, and since it's just files in your repository, you can commit it and share it with your team.

I also like that the map isn't only for the agent. Opening `graph.html` on a codebase you've never seen is a pretty good way to find your way around it yourself, with or without AI. If you install it, note that the official Python package is `graphifyy`, with two y's: the project warns that other packages with similar names aren't affiliated with it.

### OmniRoute: never depend on a single provider

This is the tool that tackles lock-in most directly. [OmniRoute](https://github.com/diegosouzapw/OmniRoute) is an open-source gateway that runs on your machine and sits between your coding tool and the model providers. You point Claude Code, Codex, Cursor, Cline or OpenCode at a single local endpoint, and OmniRoute decides where each request actually goes.

The core idea is the _combo_: a chain of models it moves through automatically. When your subscription quota runs out, a provider goes down or prices spike, it falls back to the next one in line, from your subscription to your own API keys, then to cheaper models, and finally to free ones. Its README estimates that the free tiers of the providers it supports add up to around 1.6 billion tokens a month. Keep in mind that it's an estimate across separate third-party free tiers, each one needing its own account, and not tokens that OmniRoute hands out.

If you liked Ponytail, OmniRoute even ships a built-in "Ponytail" output style, so the lazy senior developer comes along with you whichever model ends up answering.

Two words of caution. Free tiers often come with terms you'd never accept for client code, like using your prompts for training, so read them before routing any work through them. And a gateway that holds all your keys and sees all your prompts is a valuable target: keep it on your machine, keep it updated, and never commit the `.env` file it generates.

This is also where the task list from earlier pays off. A task with no decisions left in it doesn't need the most expensive model on the market, so most of your work can run on the cheap or free end of the chain. The logical last step is a model you run yourself, which costs nothing per token and can't be taken away from you. I made that case at length in [Stop renting your inner loop](/blog/investing-in-local-models/).

# Leveling up **your own skills**

Everything in the first half of this article has one thing in common: at some point, a person has to judge the work. Is this spec complete? Is this task specific enough? Is this diff correct, or does it just look correct? No tool can answer those questions for you, and if you can't answer them either, all the tooling in the world just helps you produce mistakes faster.

## Learn the fundamentals (yes, still)

I wish I had better news, but there's no shortcut here: you still need to learn how production-grade software is built. I don't mean syntax, agents handle that just fine. I mean knowing how to split a codebase into parts with clear responsibilities, which patterns hold up over time and which ones slowly turn into traps, and which stack makes sense for which kind of project. A content site, a backend full of APIs and a mobile app don't need the same tools, and an agent will happily reach for whatever it has seen most often.

I've written about a lot of this over the years, so here's a reading list from this very site:

- [Anti-Patterns](/blog/anti-patterns/): the common mistakes that quietly make code unmaintainable, from optimizing too early to magic numbers.
- [Writing code for others](/blog/writing-code-for-others/): why readable code is the base of any collaboration, including the one with your future self.
- [What a good framework SHOULD do](/blog/what-a-good-framework-should-do/): how to tell whether a framework is helping you or getting in your way.
- [We rebuilt our platform from scratch](/blog/rebuilt-platform-from-scratch/): domain-driven design, layers, naming conventions, and how we used AI on a real production codebase.
- [The Giant List of useful resources](/blog/the-giant-list-of-useful-resources/): 200+ hand-picked resources for when you want to go deeper.

I'll also say this, even if it makes me sound like a grumpy senior: on a long enough timeline, an experienced developer will build better software than a vibe coder, whatever tools either of them uses. Typing speed has nothing to do with it. Experience is mostly a long list of mistakes you've already paid for, and it's what tells you which shortcut will come back to bite you six months from now.

## Speed is the wrong goal (once you're past the MVP)

Speed has its place. When you're building an MVP, you're trying to find out whether the idea works at all, and moving fast with code you might throw away is exactly the right call. The problem starts when the MVP works and becomes the product, because from that moment the code has to survive changes, new people and years of use.

The numbers say we're not great at that part right now. GitClear analyzed 623 million code changes made between 2023 and 2026 and found that duplicated code is up 81%, code being moved and reused is down 70%, and refactoring of older code has dropped 74% since 2023 ([LeadDev has a good summary](https://leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era)). We're writing code faster than ever, and taking care of it less than ever.

Even the speed itself is harder to judge than it seems. In 2025, [a METR study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found that experienced open-source developers took 19% longer to finish their tasks with AI tools, while believing they had been 20% faster. METR's [follow-up with newer tools](https://metr.org/blog/2026-02-24-uplift-update/) points to a likely speedup this time, but the data is too noisy to put a reliable number on it. The lesson that survives both studies is that how fast you _feel_ tells you very little.

So once you're past the MVP, accept being slower and more meticulous. Read every diff, refactor when something starts to smell, write the tests, update the docs. It feels like friction, and it's exactly the work that keeps a codebase alive.

## Pick your standards before the first line of code

The most useful thing you can do before writing any code, with or without AI, is to decide how that code should look: naming conventions, design patterns, folder structure, how errors are handled, how modules talk to each other. I went into the details of how we did it in [the "Strict standards" section of my previous article](/blog/rebuilt-platform-from-scratch/), but the reason it matters here is simple. If every file follows rules you chose and understand, you can open any part of the codebase and find your way around it, no matter who (or what) wrote it.

If you don't pick standards, the agent picks them for you, and its choice is usually whatever it has seen most often in similar projects. That isn't necessarily wrong, but it isn't yours, and the day the agent is gone you'll be maintaining a codebase written in someone else's style.

Write your standards down where your agents will read them, like a `CLAUDE.md` or `AGENTS.md` file, or the constitution if you're using Spec Kit. Then let linters and formatters enforce everything that can be checked automatically, so your reviews can focus on what can't.

> **Become slower, not useless.**

Without AI, you'll be slower, and that's fine. What you can't afford is to be lost in your own codebase.

## Think like a programmer

"Thinking like a programmer" sounds vague, but it comes down to a few concrete habits. You break big problems into small ones (if you wrote the task list from earlier by hand, you've already practiced this). You ask what can go wrong before it does: the empty input, the expired token, the second click on the same button. And when something breaks, you debug: you form a guess about the cause, test it, and narrow things down until you find it.

That last one is the skill AI erodes fastest. In the Anthropic study I mentioned at the start, the biggest gap between the two groups was on debugging questions. The researchers note that the group coding by hand ran into more errors and had to fix them on their own, and suggest that fixing them is what built the skill.

The same study also shows that how you use AI matters as much as whether you use it. The participants who scored highest, 65% or more, still used AI, some of them even to generate code, but they used it to understand: they asked follow-up questions about the code it wrote, asked for explanations along with the code, or only asked conceptual questions. The ones who leaned on it to write or debug everything averaged under 40%. Anthropic is careful not to claim this proves cause and effect, but it matches my own experience. A few habits that help:

- **Ask "why" before you accept.** If the agent writes something you don't understand, have it explain before you move on.
- **Take the first shot at debugging.** When a test fails, read the error and make your own guess before you paste it into the chat.
- **Write the hard part yourself now and then.** Pick the trickiest piece of logic in a feature, write it by hand, and let the agent review it instead of the other way around.
- **Read every diff as if you'll be on call for it.** Because you will be.

# Start your project the right way

Everything in this article is easier to do on day one than on day three hundred. Writing standards for a codebase that already has thousands of lines means arguing with every file that breaks them, and splitting a project into clean modules after the fact is a rewrite in disguise. So the best moment to avoid lock-in, of any kind, is before the first commit.

That's why I've packaged the way I start projects into two open-source templates:

- [Regula](/projects/regula/), a Laravel foundation for backends that need to last, built on domain modules and written standards that a machine checks on every pull request.
- [Forge](/projects/forge/), a generator for full-stack TypeScript monorepos, where every external service sits behind a port instead of a vendor SDK: the lock-in lesson from the intro, applied to your own architecture.

Both come with AI agents already set up to follow those standards, and both are MIT licensed, so take them apart or just borrow the ideas. You'll find them, along with everything else I've built, on [my projects page](/projects/).

So, back to the question from the beginning: what happens if I take Claude Code away from you tomorrow?

If you have a spec, a list of tasks small enough for anyone, standards you picked yourself and the fundamentals to read your own codebase, the honest answer should be "I'd be slower". Slower for a while, until you plug in the next model, but never stuck.

Thank you for sharing a bit of your time with me. I hope at least one of these tools ends up in your workflow, and that the habits stick around even longer.
