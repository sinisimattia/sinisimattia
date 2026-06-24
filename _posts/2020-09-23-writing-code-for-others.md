---
layout: post
title: "Writing code for others"
date: 2020-09-23 13:51:33 +0000
last_modified_at: 2021-10-22 13:04:34 +0000
author: "Mattia Sinisi"
description: "Today I'd like to talk about collaboration in developer teams of all sizes. Introduction When everyone begins coding it's most likely that they'll learn and experiment all by themselves, that's perfectly fine, It's how I and almost anyone I know firs..."
read_time: 3
header:
  teaser: "/assets/images/thumbnails/writing-code-for-others.webp"
  image: "/assets/images/thumbnails/writing-code-for-others.webp"
  image_width: 1440
  image_height: 720
---

Today I'd like to talk about collaboration in developer teams of all sizes.

# Introduction

When everyone begins coding it's most likely that they'll learn and experiment all by themselves, that's perfectly fine, It's how I and almost anyone I know first began. As you begin writing (by yourself) any sort of application your top priority is to make it work, which means having your codebase organized in such a way that makes sense to you.

It's really easy to *follow the flow* and write for long periods of time without anything stopping you, and that way you'll have your application up and running in no-time.

Knowing that I'd like to ask you this: **have you ever revisited an old project of yours?**

If so your first reaction would be something along the lines of: "*Wait, did I write that?*"

That's completely normal, when you're the only person who's going to see that code it makes perfect sense not to worry about legibility or even having a loose structure - often called *design pattern* - to follow.

It's only when you add other people to your team that you begin to discover that a lot of what you've written is almost incomprehensible for someone new to your project.

# Improving your code facilitates collaboration

### 0. Define a [design pattern](https://code.tutsplus.com/articles/a-beginners-guide-to-design-patterns--net-12752)

A good way to start a project, especially an open-source one, is to clearly define the rules of your codebase: **where everything goes and how the jobs are distributed**.

To do this I've compiled some useful techniques that will greatly improve productivity and legibility.

### 1. Separate logic

Everything in your app should have a specific job that it does well, all other components should treat those containers of logic as a **black box**, only accessible through functions / methods that you've defined.

You should be able to modify (or even change a component) without touching the rest of your application. A good way of doing this (if your environment supports it) is via [dependency injection](https://www.edureka.co/blog/what-is-dependency-injection/).

If you're not comfortable with it then you should divide everything into sections, or better yet, create small libraries to handle that type of job.

> Nothing should EVER be written twice.

### 2. Naming conventions

> Naming things is one of the [hardest things in programming](https://www.slideshare.net/pirhilton/how-to-name-things-the-hardest-problem-in-programming).

Let's imagine that you've successfully followed the first section and now your code is organized into different sections, now let's imagine that your team does not have access to them but can only use your functions / classes / helpers by calling them, at that point they should know what everything does just by looking at what's available to them: **the name**.

This subject is nothing new, even [George Orwell](https://medium.com/swlh/george-orwells-6-rules-for-good-writing-are-6-rules-for-a-good-life-c65cfbc7527) has written about good writing and naming rules, but a good rule of thumb is to **avoid looking at your code for about a week** and then trying to **understand what everything does just by the name**.

A good way of keeping names consistent is by defining naming rules early on. As an example, can you guess what this line of code does?

```
ItemManager::orderByName()
```

### 3. Take some time to write documentation

Naming conventions have their limits, you should avoid writing super long names; so, to help your team you should take some time at the end of your project to write a small documentation or wiki.

Better yet, if you're lazy like me, you should comment every usable thing in your codebase and then use [auto-documenting tools](https://tallyfy.com/software-documentation-tools/#:~:text=%20Automatic%20generation%20software%20documentation%20tools%20%201,Studio%20extension%20that%20automatically%20generates%20XML...%20More%20) to convert them to a small wiki.

# Conclusion

I hope that this article was helpful to you or to your team, having a clear codebase is something that makes or breaks your organization. You shouldn't waste more time *finding the issue* than *resolving it*.

Thank you for reading!
