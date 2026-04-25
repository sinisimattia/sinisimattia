---
layout: single
title: "How to automatically map JSON data to a TypeScript object"
subtitle: "Interpreting data doesn't have to be that hard. You can do it in a single line."
date: 2021-10-20 10:20:00 +0000
last_modified_at: 2021-10-28 09:35:41 +0000
author: "Mattia Sinisi"
description: "Introduction Interacting with JSON APIs, files, configs, etc. doesn't have to be such a hassle. Keeping your code clean and maintainable can be difficult when using loosely-typed data that can change at any time and, as I've talked about in my previo..."
read_time: 3
header:
  teaser: "https://cdn.hashnode.com/res/hashnode/image/upload/v1632295482139/JoGRvoq0T.png"
  overlay_image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1632295482139/JoGRvoq0T.png"
  overlay_filter: 0.5
canonical_url: "https://blog.snisni.it/how-to-automatically-map-json-data-to-a-typescript-object"
tags:
  - "typescript"
  - "javascript"
  - "apis"
  - "automation"
tag_names:
  - "TypeScript"
  - "JavaScript"
  - "APIs"
  - "automation"
---

# Introduction
Interacting with JSON APIs, files, configs, etc. doesn't have to be such a hassle. Keeping your code *clean and maintainable* can be difficult when using loosely-typed data that can change at any time and, as I've talked about in my previous article about  [Anti-Pattens](https://blog.mattia.codes/anti-patterns), it introduces a lot of hard-coded logic in more than one place.

# The situation 🤔
Let's say that we need to map some JSON data to our TypeScript class.
The incoming data looks like this:

```json
{
	"_param_1": "something",
    "param2": "something else",
    "items": ["item 1", "item 2", "item 3"],
    "something": {
        "inner1": "inner thing",
        "inner2": "another inner thing"
    },
    "thingToBeIgnored": "some useless data"
}
``` 

While our class looks like this:

```typescript
class TestClass {
	public param1: string;
	public param2: string;
	public list: string[];
    public thing: AnotherClass;
    public thingToBeIgnored: string = "Leave me here!"
}
``` 

How do we go about mapping one to another?

## The bad way 😑
Of course, the most cumbersome (and most used) way of doing it looks something like this:

```typescript
function mapToClass(json: any) : TestClass {
	const result = new TestClass();
 	result.param1 = json["_param_1"];
	result.param2 = json.param2;
	// ...ok I think you get the picture.
}
``` 

Doing it in other ways **will NOT ensure a *true instance* of our class**.

# The ONE-LINE alternative ✨

For this we will need ** [tapi.js](https://tapi.js.org) **, a tiny, zero-dependency, auto-mapper for TypeScript.

```sh
npm i -S tapi.js
``` 

Next, be sure to **enable decorators** in your `tsconfig.json` file.

```json
"compilerOptions" : {
	"experimentalDecorators": true
}
``` 

Now, let's **decorate 🌹** our class and make it buildable. In our case it looks something like the following, however you can [read the docs](https://tapi.js.org/docs)  to better understand the process.

```typescript
import { BuildableResource, Properties } from "tapi.js";

@Properties.Resource
class TestClass extends BuildableResource {
    @Properties.Alias("_param_1")
	public param1: string;
    
    @Properties.Transform(incomingValue => {
        return incomingValue.toUpperCase();
    })
	public param2: string;

    @Properties.ListOf(string)
	public list: string[];

    public thing: AnotherClass;
    
    @Properties.Ignore
    public thingToBeIgnored: string = "Leave me here!"
}
```

# Let's convert! 😍
Now your conversion happens automatically... **in both ways** and **respecting the original formatting of the JSON data**!

### From JSON to class
```typescript
let instance = new TestClass().fromJSON(data);
``` 

### From class to JSON
```typescript
let data = instance.toJSON();
``` 

# Mapping from promises 🤞
Wanna use it with promises? Simple!

```typescript
import axios from 'axios' // 👈 Of course, you can use whatever library you want

import { BuildableResource, ... } from 'tapi.js'

import 'tapi.js/extensions' // 👈 Use this line to import all the extended functionalities of core types

// Let's create a simple class...
class TestClass extends BuildableResource {
	// You know the drill by now...
}

// Then make a request and get a promise...
axios.get('/some-url-that-returns-an-object')
	// Now let's build the object with its defined builder! 🎉
	.as(TestClass)
	// Aaaaand we can use the typed object to do whatever we want.
	.then((builtObject) => {
		builtObject.doSomething();
	})
```

# Conclusion
I hope this article and this tool is helpful to you in some way, I'm actually the author of the NPM package and would love four you to try it and give me some feedback.

I've used it in a lot of projects and can assure you that it works... but don't take MY word for it, take YOURS!

Until next time! 👋
