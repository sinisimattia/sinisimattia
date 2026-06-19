---
layout: post
title: "What a good framework SHOULD do"
date: 2020-10-05 19:49:31 +0000
last_modified_at: 2021-03-16 16:05:03 +0000
author: "Mattia Sinisi"
description: "I'm sure that many of us developers, to make our work easier, had to use - or in some cases build - a variety of frameworks that aim to simplify our workflow. A framework, by definition, is a bit of support logic that helps the developer; following t..."
read_time: 6
header:
  teaser: "https://cdn.hashnode.com/res/hashnode/image/upload/v1615910694511/X1PnVmMmJ.png"
  image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1615910694511/X1PnVmMmJ.png"
tags:
  - "programming-ciovqvfcb008mb253jrczo9ye"
  - "framework"
  - "frameworks"
  - "opensource"
tag_names:
  - "programming"
  - "framework"
  - "frameworks"
  - "Open Source"
---

I'm sure that many of us developers, to make our work easier, had to use - or in some cases build - a variety of frameworks that aim to simplify our workflow.

A framework, by definition, is a bit of support logic that helps the developer; following this interpretation one could assume that it is **a tool to organize your code**, however, as *Rich Harris* (the creator of  [Svelte](https://svelte.dev) ) puts it:

> A framework is a tool to organize your mind.

Following this concept, developing using such a tool should let us focus more on the concepts unique to our app, rather than everything that comes between a blank project and a working demo (i.e. configuration, helpers, and base logic).

So, why did I use the word "should"? Simple, it's because not every framework does that. Which brings me to this article, here I'd like to list what, in my opinion, a good framework should let me do in order to build the app I wanted.

# Remove repetitive actions

Whatever your project is, whatever language you use, there are some things that you ALWAYS have to do in order to get it up and running, even as a crude prototype. If these actions are always the same, why then must I repeat them every time?

As an example, let's say that you have an application that needs to retrieve pieces of information from a database. The connection and subsequent disconnection shouldn't be something that I have to worry about every time, so how about a framework that lets me do this?

```
Database.from('posts').get(['title', 'content', 'author']);
```

# Be customizable / Not get in the way

Simplicity is all fine and dandy, but what happens when a developer needs to perform an action that the developer of the framework didn't consider?

Especially with open-source tools, I should be able to access the framework's API at a lower level of abstraction in order to carry out my task.

Better yet, I should be able to declare new features specific to my application and append them to whatever the framework is already exposing.

Let's get back to my example, imagine if after the information is retrieved the developer still wants the connection to be open, but our make-believe framework does not have such an option, how can we work around the problem?

We could try to modify our helper, effectively messing with the original code, or the framework could expose something to let us customize the behavior. Let's see what that could look like:

```
Database.from('posts').get(['title', 'content', 'author']).after(function(connection) {
    connection.keepOpen();
});
```

Using a framework should give you an advantage, not slow you down or make some actions impossible.

# Be understandable

As a framework becomes more and more advanced it will expose more and more methods and parts of its API, this often translates into unending piles of function names and configuration parameters.

At this point, more than ever, the developer could begin to feel overwhelmed by all this functionality if it's not [presented in the right way](/blog/writing-code-for-others/).

At this point, the way you write in and of itself must be clear, self-documenting even! Let me share with you a perfect example of this from the beautifully cohesive [Laravel](https://laravel.com):

```
// Here we are getting all the users living in Italy
// and returning them alongside their siblings
User::where("location", "Italy")->with("siblings");
```

This could work for something as simple as this following example taken from a random unit test written with the help of [Jest](https://jestjs.io):

```
// Here we are... well, you can guess it
expect(2 + 2).toBe(4);
expect(1 + 1).not.toBe(10);
```
___

To conclude this article I'd like to once again thank each and every one of the members of this community for responding so positively and critically to my previous 2 articles, it really helped me a lot with my writings.

Let me know what you think on this subject!
