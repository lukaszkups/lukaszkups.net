---
title: Do we have to be afraid because of latest Vue.js RFC?
date: 2019/06/23
category: vue.js, programming, tech
tags: vue.js, vue, js, javascript, programming, development, front-end, front-end developer, front-end development, architecture, spa, single page apps, single page application, web development, vuex
active: 2
---

A new Vue.js RFC has been released to public. It contains more details about brand new idea about functional API for building Vue-based web apps. And it looks like the response of the community is really mixed (with clearly strong disapproval of it).

So, do we have to be afraid of the incoming changes to Vue.js API?

> tldr; yes and no, but with attitude towards no (imho)

# Why no?

1. Mr. Evan You is a really smart guy and knows what's good for the Vue.js community - he found good reasons behind implementing it and where it can become handy for developers

2. It will be (at least at the moment of writing this blog post) really an optional feature - you'll be free to use classic, awesome Vue.js API/syntax.

3. It looks very similar to React.js syntax (which is not that ugly because you can use there traditional templates instead of that weird, ugly jsx ( ;) ) (as well as style blocks)) - so no rocket science here folks.

4. RFC means that it's still unset, some details might change and if you have your own ideas for it, you should submit it for discussion on github.

# Why yes?

1. I really hope this API will be really optional as long as possible - in my opinion the most awesome thing about Vue.js is its clear, easy-to-learn way of writing apps/components (well, at least easier than React's or Angular's in my opinion - probably because it reminds me times of writing jQuery-powered websites).

2. I hope core team won't focus more on expanding functionality of this new API while slowly abandoning / delaying introduction of new features / updates for the old one.

3. When more people will start using it, it might lead to similar confusion like it was when Angular 1.x has been dropped and version 2.0 has been introduced - in places like StackOverflow people will be searching for solutions based on classic API while receiving answers based on new one and the other way around might cause adoption of Vue.js by newbies more difficult than it was before.

# But in the end, there's no need to panic (yet ;) )

Personally, I'm really happy that it will be optional - I want to play around it more (don't have much free time lately for experiments anymore without sacrificing family time / work-life balance in overall) and I hope to find more reasons towards switching to it (or at least finding good reasons to use it in personal projects).

If you're unsure what to think about it, [take a look on high-level Q&A document](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#high-level-qa) of this RFC - it's not that scary as its described over the Internet forums (I think a large percentage of commenters didn't really read through it).

So don't be scared & keep coding happily!

-- ł.
