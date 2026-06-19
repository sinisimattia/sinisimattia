---
layout: post
title: "We rebuilt our platform from scratch: here's what we learnt"
subtitle: "The design patterns, crucial decisions and approaches that made our new codebase cleaner and more easily maintainable"
date: 2026-03-11 08:22:53 +0000
author: "Mattia Sinisi"
description: "A story about evolving quickly in a fast-moving industry, clean codebases, AI-powered development done right, optimized workflows, tips, and way more!"
seo_title: "We rebuilt our codebase from scratch! Here's what we learnt"
read_time: 22
header:
  teaser: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/z03mWBdAq5I/upload/e2d4a042df846220f48fe3df790005e0.jpeg"
  image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/z03mWBdAq5I/upload/e2d4a042df846220f48fe3df790005e0.jpeg"
related:
  - _posts/2021-09-21-anti-patterns.md
  - _posts/2020-09-23-writing-code-for-others.md
further_links:
  - title: "A Philosophy of Software Design"
    url: "https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design"
---

# Preamble: A bit of context on where I am in my career

Since my last article a lot has changed, both for me and for the world of software development in general. The biggest leap was, of course, the meteoric rise of AI systems, especially in the software development space with new tools such as coding agents.

Like these AI systems, I have also grown and learnt a lot in these past years, I have changed companies 2 times, I went from a software consultancy company called *Key2 Business*, to my first product-oriented company called *Everli* (a grocery delivery application). Here I was the youngest, less experienced developer in my team, and I was followed carefully, everyone took their time in teaching me best practices and design patterns for effective collaboration on our codebases (which were unlike anything I had seen up until that point), thanks to them I went from an okay developer delivering code quickly to a more careful and pragmatic thinker when it came to implementing new feature or solving old bugs.

> The best resource I gained was a new way of thinking and approaching problems in a more meticulous fashion.

Then, after a couple of years, I decided to leave the company. A decision I made with a heavy heart, since the synergy of the group was something I feared I would never encounter again, I felt really lucky to be a part of that team.

That fear was short-lived though. I got hired as as Senior Full-Stack Developer at a company called *Contents*, an AI-driven content creation and orchestration platform. The team I met was small yet highly productive, they were navigating a complex shift in vision that would decide the future of the company: “are we B2C or B2B focused?” was the prevailing question at the time, a particularly difficult question to ask, since these 2 markets have drastically different approaches.

*   For B2C you have the freedom to read feedback, do research, test features and THEN maybe ship them.
    
*   For B2B the client dictates everything, most importantly how much time the team had to complete the work.
    

So there it was: a codebase torn between 2 worlds struggling to accomodate either one of them, a team with very little time to implement anything cleanly and a rising technical debt.

> “**Make it work**” was the mantra

Here’s the story of what once was, the processes we adopted to change everything from the ground up, the amazing results we accomplished, and what key lessons I learnt along the way.

# The old platform(s): A post-mortem

In this section we discuss (without breaking my NDA) the state in which I found the platform when I joined and what caused it to be so.

We all love a good roast, especially when it comes to bad codebases. “*Look at the mess they’ve made! Let’s point and laugh!*” is the tone adopted by most articles discussing such matters, but alas it’s useless, it only brings ridicule to what COULD have been a learning experience. Let’s try, then, to write a small post-mortem, explaining the many (and I mean many) fallacies of the codebase and try to extract valuable advice for future implementations.

## Lack of consistency

When trying to run against your competition, especially in the AI market in 2021-2023, quick development decisions and pivots are almost a weekly occurrence, in this environment the priority is speed, with consistency and code quality as an afterthought.

So it goes, every developer on the team implemented everything in the quickest and dirtiest way possible, and everyone had their own way of writing code, resulting in a codebase without standards, without design patterns, where every piece of code did a number of things obfuscated by incomprehensible variable and method names, where entire chunks of code were duplicated and re-implemented except for a couple of lines, where logic was partly implemented on the backend and partly on the frontend, and where `if` statements stretched into the hundreds of lines, each added after every reported bug.

We had a complex and incomprehensible maze of dependencies, where changing how a date is displayed to the user broke the login and who knows what else.

## Lack of agency

At the beginning of each sprint, which lasted about a week, a new set of tasks without descriptions was assigned to the tech team, each new feature was implemented by the marketing and sales team without consulting with the rest of the company, resulting in meetings to discuss what to do (which ate a lot of the already limited development time), without discussing how. That thing needed to be done, and it needed to be done in a week, “*figure it out, devs*” was the only directive most of the time.

When we started writing code no consideration was given to how long something took to implement, or better ways of implementing it, the client had already signed a contract, and we needed to uphold it no matter what. And so another week of rushed development began. No agency to the developers whatsoever, this would be one of the first things that needed to change.

## Lack of documentation

Each second of development time was very valuable, so no time was given to creating a proper documentation where one could outline standard, best practices, code style guidelines, architectural decisions, and code philosophies to uphold during the development process. Everyone did things their own way, on top of the maze of mismatching design patterns that was already there. But no time to think, no time to document, there’s only time to implement.

## Lack of reviews

Since no time could be dedicated at the start of development to write documentation, no time could be dedicated at the end of development for code reviews. And how could we? The two are interlinked. No standards were set in stone and written down so, even IF we had time to do code reviews, the reviewers would not have any standards on which to base their judgement upon.

## Lack of communication

No communication whatsoever between the teams, no communication whatsoever between members of the same team, no communication whatsoever with the clients… you know how this ends. When one of the tech teams needed to implement, for example, an endpoint so that other tech teams could perform actions on their service, they would just do it with no consideration of how the others could implement it and then move on to different things, wasting time and massively increasing the code complexity of whoever needed to interact with that service.

The lack of documentation and reviews was also deeply ingrained with this issue as well.

There was never a time where all teams were on the same page on the status of the platform, or even on what the parts of the platforms did what. Everyone was lost in the same fog as everyone else.

* * *

# Interlude

Let’s take a brief moment, nestled between the old and the new, to give praise to the people that stuck in there. It’s easy to assume that nobody gave a damn, but that’s not true.

Everybody recognized these issues, everybody wanted and tried to solve them (in multiple occasions!), each in their own way, the only thing we lacked was a unified company-wide voice.

Now, after the changes you’re about to read, the mood is electrifying, everyone is firing on all cylinders and are happy to do so. We’re building a lot (and I mean A LOT) of cool new stuff.

So thank you colleagues, thank you for not giving up and for the amazing work culture that we managed to build.

Without further ado… **it’s time to break some stuff!**

* * *

# The shift: How to structure a complex project’s workload

Each new feature was taking longer and longer to implement, slowing us down considerably with each new deployment, in the course of a couple of weeks we drafted a rough roadmap of what we wanted to do and presented it to the entire company, the pitch was simple yet crazy.

> “Let’s throw everything out, let’s recreate the platform from scratch” — we said, unified.

We were given an opportunity that few tech teams had, we were given the green light to stop what we were doing and re-build the entire platform from scratch: new features, new UI, new code, new everything… the only thing that remained unchanged was the name.

## Finding our direction

At the beginning of this *odyssey* we discussed how the platform was torn between two worlds: B2B and B2C. We had to make a decision of which one to prioritize, we went with the B2C in the first phase of the refactor. The company decided the features, and the tech team would give time estimates.

No longer were be beholden to the whims of the market, we were going to build our platform, from our ideas, with our philosophies.

## Plan, then act

The first major change we applied was to the project management itself, we didn’t implement *re*\-actively anymore, we now implemented *pro*\-actively.

Each feature was proposed by the product designers in a rough document and it was then discussed with the tech team (where it was often reshaped, enriched and improved), after that the tech team would brainstorm possible implementations and come up with a technical document from which we wrote the tasks and give estimates back to the product design and project management team.

Every problem and feature would be broken down into multiple, self contained releases. Each release was easy to estimate and implement, no longer we had big tasks that would take entire weeks, we now had simple and well defined tasks and goals that could be brought to completion in (at most) a couple of days.

### Key takeaways

*   Trust your developers, their job isn’t to simply write code, but to find solutions, don’t treat them as the very last step of the implementation process
    
*   Include your developers straight from the ideation phase, not just when it’s time to build
    
*   Spend more time arguing back and forth at the beginning, ensuring smooth sailing once everything is decided
    
*   Document every decision, a lot of time can pass between planning and implementing, you want to make sure that everything is on the same page even a month from now
    

## Documentation is not a “*time-waster*”

Every discussion and every subsequent decision could not vanish into thin air, or be relegated to the memory currently working on a given project. Every time a choice was made we dedicated some time to extract more generic rules and guidelines that could be applied to similar decisions in the future.

> We decided to adopt a “*case-law*“ approach to decision making, similar to how lawyers build cases based on previous, similar ones.

Doing this made every meeting a bit shorter than the one before, whilst unifying the tech team (and, as a result, the codebase itself) into a more cohesive and comprehensive whole.

### Key takeaways

*   Spending a lot of time at the beginning of a project writing documentation is a worth-while investment that facilitates both the current and future developments
    
*   Time spent to plan and to write documentation is not extra, is just as important as writing the code itself
    

## Strict standards

There’s no way to sugar-coat this one: once something is documented, you need to be strict about enforcing it. While the field of software development can involve a lot of artistry and creativity, you don’t want every developer to implement stuff in their own special way.

Spend time at the beginning of a project to define (not on your own, but with the rest of the team) software design principles and patterns, naming conventions, protocols, code-style guidelines, and everything in between, then enforce those standards with a strict review process before shipping the code to production.

### The process

1.  Write your code and add or update feature/unit tests for it
    
2.  Open a pull request (may have different names depending on your VCS)
    
3.  Describe your changes inside the pull request
    
4.  Let the automatic test-runners and lint-checkers go over your code
    
5.  Add at least 2 fellow developers as reviewers
    
6.  Make sure your branch is aligned with the destination branch
    
7.  If needed, implement changes requested by the reviewers
    
8.  Merge your code with the `squash` strategy (to collapse all commits into one)
    
9.  Release in a safe environment for one last round of testing
    
10.  Release in production
     

### Key takeaways

*   A feature that works, but with unreadable code, is worse than no feature at all
    
*   Take your time in the review process, even on multiple rounds, there’s no rush to go live
    
*   If there is a rush to go live, mark your “*quick and dirty*” code and assign yourself a task to go back and beautify it later
    
*   If you find bad code (that works) make it compliant with the defined standards, following the “*boy-scout rule*“
    

# The new platform: Software design principles and best-practices

After more than a year of refactoring, rebuilding, redoing, re-everything-ing, we are now happy with our current codebase. Let’s now go over the key design decisions that made our code a joy to work with!

Keep in mind: these principles do not apply to a specific language or framework, however they ARE tailor-made for backend API-based web applications.

## Domain-Driven Design

Every feature of our application is treated as if were an external plugin developed by entirely unknown people and each relegated to its *Domain*.

In the first phases of the refactor we separated domains into folders inside the same codebase to allow quick development:

```bash
src/
    Core/
    Domains/
        Auth/
        Projects/
        Products/
        Payments/
# etc... 
```

Then, after each of those domains was solidified, we packaged and versioned them into a private registry so that the main application simply needs to install that package.

```bash
package-manager install our-company/domain-name
```

Each domain needs to be built with the assumption that all others, except for the `Core` domain, do not even exist. Each domain must stand on it’s own.

Maybe we don’t even need `Auth` tomorrow because we’ll build a local-only version of our platform, maybe not, we don’t know and we don’t care.

> Apply the “*single responsibility principle*“.
> 
> Domains and components of the domain each do one specific thing, regardless of context.

### Dependency injection between domains

Each domain must have at least one so-called *Provider*, a piece of code that declares and (indeed) provides dependencies to be used by other domains. Each domain must use dependency-injection to use another domain’s components, it must never EVER instantiate components directly.

```typescript
// src/Domains/Payments
class PaymentsProvider extends Core.Provider
{
    public function register(): void
    {
        this.add<PaymentsInterface, PaymentsImplementation>();
    }
}

// src/Domains/Plans
class PlanManager
{
    public function checkActivePlan(payments: PaymentsInterface): void
    {
        // other stuff...
        payments.unresolvedPayments();
        // other stuff...
    }
}
```

We want components to be swappable at any time without changing a single line in the rest of the codebase.

## Everything must be predictable

*   Functions:
    
    *   Must declare strongly typed arguments and return types
        
    *   Must declare all the exceptions that COULD be thrown
        
    *   If execution completes the result is considered valid, if not throw an exception. Don’t make the caller check for the validity of the result once returned, its not their responsibility
        
*   Variables:
    
    *   Must be strongly-typed or at the very least type-hinted. The developer and whatever tools they’re using must be able to inspect what a variable is
        

## Layers and responsibilities

Each domain is (usually) composed of 3 main layers, each with their own job.

### Database

Were data is persisted and where consistency checks are made. The database layer does not care if things make sense from a business standpoint.

Let’s say, for example, that we decide that each user can have, at most, one project associated with them: in this case we build our database to make sure that the relation between users and projects exists but we do not enforce the described limit, we want this layer to be as open as possible, knowing that any limitations can be lifted in the future.

The less we update this layer, the better.

### Logic

Here we only care about implementing the entities and actions, without checking if a particular user can or cannot perform it… actually, we don’t even concern ourselves with the concept of “user” here, just the raw logic wrapped inside atomic components that can be called from anywhere at any time in any context.

Each component of this layer requires the utmost care and rigorous unit testing.

When an action is called (be it a function or method) it either returns successfully or throws domain-specific and self-explanatory exceptions.

### Interaction and Presentation

In the context of an HTTP-based API application, this is where we define our endpoints, validate requests and their payloads, check if the authenticated user can perform the desired action, and build responses.

This is just a wrapper for the *Logic* layer, where, once all the necessary checks are performed, we call upon it to perform the action and interpret its result (or its exception). More on that later

## Components

Each component is a piece of code designed to perform a specific type of action. Here are the main ones we defined:

*   Entity: a representation of a non-primitive piece of data, can be used by other domains
    
*   Repository: to store and retrieve data unconditionally and without complex logic, never called outside a service and cannot be used by other domains
    
    *   storing: an entity is given as an argument, it persists it to the database and returns the updated entity
        
    *   fetching (one): returns the requested entity from the database or throws an exception if it cannot be found
        
    *   fetching (list): returns a list with the requested entities from the database or an empty list if none can be found
        
*   Service: to interact with a repository based (occasionally) on complex logic, can be used by other domains
    
*   Controller: to manage a specific API endpoint, perform user-based checks call services, and format responses, it NEVER contains complex logic, can only be used by external clients
    

## Naming conventions

*   Casing
    
    *   `camelCase` (lower) for variable and function names (i.e. `project = projectService.getProject()`)
        
    *   `camelCase` (upper) for class names (i.e. `ProjectService`)
        
    *   `snake_case` (lower) for raw data, like payload keys and values (i.e. `{"some_key": "some_value"}`)
        
*   Always use the same word for the same action: if the piece of code that persists data to the database is called `storeSomething` in one place, then it must also be called `storeAnotherThing` elsewhere, the action is `store`, and is always `store`
    
*   Self explanatory: while documenting your code is certainly recommended and encouraged making your variable, class and function names explain what they do makes everything more readable. Here are our designed function/variable prefixes:
    
    *   `can`/`is`: return a boolean `true` if yes, always use positive language, never use `cant`/`isnt`
        
    *   `check`/`validate`: return void if all checks pass, throws exception if not
        
    *   just the action name: performs the action, can return any type of data, throws exception if it fails.
        

## Protocols (for HTTP requests and responses via JSON )

The request and response payload share the same guidelines.

*   `snake_case` for the payload (as described in the naming conventions for raw data)
    
*   `Train-Case` for headers (as defined in the HTTP standard)
    
*   an existing `null` key and an absent key are the same
    
*   keep it raw: let the clients do the interpreting and parsing (i.e. for dates we send the UNIX Epoch timestamp instead of a date string)
    
*   same entity, same structure
    

## Wrapping up

After doing all that (and way, waaay more) we now have a consistent and predictable codebase. Productivity has increased (making the managers happy) and the code is beautifully maintainable (making the developers happy)… It’s now time to take it to the next level!

# AI-Assisted Development (done right)

Since they made their splash on the software market, my feelings on AI coding assistants were always mixed: on one hand the theoretical productivity boost is too good to ignore, on the other having a model generate code could and has lead to inconsistencies in many documented cases.

## Finding the right model

After snooping around and experimenting with various models it became clear that the best coding agent, at the time of writing is *Claude Code*... but what do I mean by "perfect"?

Here's the criteria used to evaluate the quality of a coding companion:

*   The underlying model must be un-opinionated (or as close as possible to it); no model is truly un-opinionated, but we found that ChatGPT and Copilot tended to follow in the same footsteps of similar projects that used the same framework as us, instead of following OUR standards
    
*   The agent's actions must be configurable
    
*   The agent must first generate a plan and then, only after authorization from the human user, it may start writing the actual code
    

## Managing contribution scopes

Every model has the same issue as of right now: as the context grows, the results lose consistency and quality.

This is why it's important to limit the work done per-request. Keep in mind that our codebase was already well-formed before we introduced our AI companions to help out, so we only employed them to implement additional features on an already robust and well-segmented codebase.

Every time a feature needs to be implemented we define a clear and limited scope, complete the generation and then log our decisions in our technical design documents. These documents are then read by the agent on the next iteration so it knows where to start from, keeping the context light and the quality high.

The most important rule is that the code being generated MUST be written the same way we would so, if at some point in the future we ditch our AI companions, we can still understand and navigate the code it generated.

## Creating the "*perfect*" companion

Before making our AI companion start writing code, we defined a small fleet of *sub-agents*, each with its own goal and guidelines. For each code generation we make them collaborate and check each other's results to ensure that the code is written the way one of our developers would.

Some useful *sub-agents* we implemented are:

*   documentation compliance checker: runs at the end of each generation to ensure that everything is done according to our documentation
    
*   domain expert: writes the scaffolding for new domains and informs the code writers on how to work on an existing one (folder structure, service + repository design pattern, providers, etc.)
    
*   coding standards enforcer: makes sure the code being written matches the coding standards, naming conventions and design patterns we declared
    
*   testing expert: writes and/or updates unit and feature tests for the features being implemented and makes sure the existing tests still pass
    
*   api validator: make sure that the endpoints being implemented follow RESTful and our own standards
    
*   etc.
    

With these agents (and more) each generation goes as follows:

1.  A plan is drafted by interrogating domain and coding standards agents, included in the plan is also a list of which agent needs to be called and when
    
2.  The plan is approved by a human user
    
3.  A fleet of agents is run in parallel to implement the feature
    
4.  Compliance, coding standard and test checks are ran by the relevant agents
    
5.  The feature is sent for a final round of manual review by a human user
    
6.  Done!
    

The productivity boost this approach has granted our team is hard to overstate, it's NOT just vibe coding, its a strong workflow that allows us to treat our agents as a small team of qualified developers, who always follow OUR way of doing things, with hallucinations reduced to a minimum.

# Conclusion: Looking back, looking forward

I feel like I took part in something rare, a company that is willing to put everything on hold for a year, even in troubled times, because it understands and trusts its developers to take their time and deliver a quality product is really hard to come by.

When I first joined I was frustrated at how things were managed both in code and in person, I wanted out… but something beckoned me to stay. I’m now sure that something was the group of people along side me, willing to doubt themselves and tread on unknown grounds, willing to build something great, simply… willing.

I, like everyone else in this world and especially in this line of work, don’t know what the future holds, but I’m ready to face it, to predict it, to build it, and to learn from it.

Thank you for sharing a bit of your time with me, I hope to ave made it worth your while.
