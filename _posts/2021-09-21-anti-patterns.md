---
layout: single
title: "Anti-Patterns"
subtitle: "How you're screwing yourself over without even knowing it."
date: 2021-09-21 12:57:19 +0000
last_modified_at: 2021-10-22 13:04:02 +0000
author: "Mattia Sinisi"
description: "Keep your code clean and maintainable by avoiding these common mistakes."
seo_title: "An introduction to Anti-Patterns"
read_time: 5
header:
  teaser: "https://cdn.hashnode.com/res/hashnode/image/upload/v1622981965080/4jov40VMh.png"
  image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1622981965080/4jov40VMh.png"
canonical_url: "https://blog.snisni.it/anti-patterns"
tags:
  - "design-patterns"
  - "startups"
  - "programming-tips"
  - "productivity"
  - "programming"
tag_names:
  - "design patterns"
  - "Startups"
  - "Programming Tips"
  - "Productivity"
  - "General Programming"
---

For about a year I've been working in a bigger company than the startups I was used to. Suffice it to say, there's a lot of new lessons I've learned that I want to share with you. Working with experienced developers taught me how much a supposedly "*clean*" solution can fully reveal itself as a pain in the ass during the final steps of a project.

These are what developers and engineers refer to as "**Anti-Patterns**".

# A wolf in sheep's clothing

I'm using this overly dramatic title to illustrate a key concept: an anti-pattern may seem like a good idea, an optimization, not unlike its benevolent counterpart the *design*-pattern... however it's actually ruining your future progress and will make you lose a lot of time in case your project needs a new feature.

The following article will explain the most common anti-patterns and how to avoid them.

Some of these are mistakes I've made and trust me... they're not pretty, especially when close to the deadline.

## Optimizing too early

![Early optimization - Solid structures](https://cdn.hashnode.com/res/hashnode/image/upload/v1625053538900/SpRx_N3GJ.gif)

### What is it?

This could quite possibly be the most important out of all the other ones, that's why I put it before all the other ones. Keep in mind that, in this case, the word *optimizing* is used for both execution speed and code cleanliness optimization.

Most developers like to build a solid structure (that covers most, if not all, use cases) before tackling the actual problem, almost like a mini-framework just for the project.

This, when done correctly, often leads to a cleaner codebase and faster development times... however, it's not a foolproof strategy.

### Why is it bad?

The thing about solid structures, though, is that **they're really hard to move**.

> Optimizing early in the process can lead you to be restricted by your own code.

What I mean is that it can lead you to have a confusing codebase with little to no room for improvement. In the best of cases, you would have to re-write big chunks of code just to make a smaller adjustment just before you didn't consider it while building that initial structure.

### The solution

The best way to go about optimizing your code is to finish writing a working implementation first, and optimizing it after all the edge cases have been tested and addressed.

Just like a tattoo, you need to be **really sure** of it.

## Magic numbers

![Magic Numbers](https://cdn.hashnode.com/res/hashnode/image/upload/v1625053932961/Oy4ewntcs.png)

### What is it?

This refers to the seemingly innocent practice of putting string literals or number directly in your code. Of course, this is the most common and most forgivable anti-pattern, it's almost inevitable if you think about it.

### Why is it bad?

However, remember what I said before, anti-patterns **look** innocent, but aren't. Putting data and code together means what you'll have to rebuild and redeploy your entire application every time you want to tweak one of these values.

See? The general rule of thumb should be **never hard code anything... ever**.

### The solution

Make at least 99.9% of your variables configurable externally, most applications use `.ini`, `.json`, `.yml` or even a simple text files to store these values. Any solution could work, even using an external database (although I wouldn't recommend this one).

## Re-implementation Hell

![Re-implementation](https://cdn.hashnode.com/res/hashnode/image/upload/v1625054446450/5HaJaPtvq.png)

### What is it?

It's the bad practice of writing the same thing (or something very similar) more than once. Plain and simple.

### Why is it bad?

Let's say that you write a simple function used only in one part of the code, maybe even as a private method of a class, now days go by and you (or, worse, someone else) need to do the same thing you did, should he re-write it? Of course not, but you left no other choice.

This leads to bloated code and makes it harder to fix any bug that your function may have, since it now needs to be solved more than one time for every copy of your function.

### The solution

Instead of writing code for very specific situations try to write it as if it were to be included in a library, in that scenario it should work for a wide range of use cases by users you'll never meet. Using this mindset allows you to write more adaptable code, reducing repetition across your codebase.

*However*... there is a fine line between **generic ** and ***too* generic**. Let's see why!

## Single point of failure / Too much responsibility

Yes, I'm contradicting myself... well, kind of.

![Single Point of Failure](https://cdn.hashnode.com/res/hashnode/image/upload/v1625054305015/F-JVHZuxa.jpeg)


### What is it?

While having a class, component or service that does a lot of things can seem practical it can lead to some unexpected results.

### Why is it bad?

If a lot of your codebase is dependent on a single piece (or only a few pieces) of code then, in the case of a failure, the majority of your application (if not the whole thing) will be brought to a screeching halt.

It's the same thing with servers: 
> You wouldn't want ALL of your company's services running on the same machine.
I hope not!

### The solution

Every component of your application needs to have **one job and one job only**. It's better to use a lot of smaller components than one big, heavy and beefy one. *[Dependency Injection](https://andrewlundy.hashnode.dev/dependency-injection-what-is-it-and-how-to-use-it)* and microservices help a lot with this.

# Conclusion

If you find some of these common errors in your codebase then a good ol' **refactoring** is in order! Learn how to effectively re-structure your code with this in-depth article by @[Tiger Abrodi](@tigerabrodi) entitled "[The importance of refactoring](https://tigerabrodi.hashnode.dev/lessons-and-takeaways-on-refactoring)".

[Here](https://en.wikipedia.org/wiki/Anti-pattern)  you can also find ***The big list of the most common anti-patterns***. Enjoy!

Thanks for your attention, have a nice rest of your day!
