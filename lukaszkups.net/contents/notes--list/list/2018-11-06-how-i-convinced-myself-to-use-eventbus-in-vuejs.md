---
title: How I convinced myself to use EventBus in Vue.js?
date: 2018/11/06
category: tech, Vue.js tips & tricks
tags: vue.js, vue, js, javascript, programming, development, webdev, front-end, front-end developer, front-end development
active: 2
---

> Event Bus concept tends to have a bad opinion across most Vue.js developers. I was one of them.

I use Vuex in all web applications I build. It enables me to handle state management and communication between components with ease. Surprisingly, I've found recently a perfect use-case of using Event Bus instead.

## Disclaimer: I still tend to avoid using it

I love idea behind Vuex (yes, I know that this is nothing new (I'm thinking about you, MobX/Redux)) and thanks to learning this concept I really started to understand what these React's alternatives are really about (which is just an another sign that Vue.js documentation is really that awesome ;) ).

You might think that I overkill it, but when my application needs to communicate between 2+ components, it means to me to use it as an excuse for importing Vuex into the project. It just makes code cleaner and easier to maintain.

## Ok, so what's about that event bus then?

Everything has started from a simple task: synchronize all clocks across the webpage so they will *tick* at the exact same moment.

Long story short: I've solved that problem by setting one global clock interval that emits a global Event Bus event - so instead of setting intervals inside components I've created one:

```
// events.js file
import Vue from 'vue';
export const EventBus = new Vue();

// then in App.vue file

import { EventBus } from '@/helpers/events.js'

setInterval(() => {
  EventBus.$emit('updateGlobalClockEvent')
}, 1000)
```

So now everywhere I want to update some time-dependent value I listen for that global event:

```
// in component's code
<template>
<div>{{ someTimeDiffWeHaveToDisplay }}</div>
</template>
import { EventBus } from '@/helpers/events.js';
...
...
data () {
  return {
    currentTime: Date.now(),
    someRandomMomentInMs: 1541537741473
  }
},
computed: {
  someTimeDiffWeHaveToDisplay () {
    return Math.abs(this.currentTime - this.someRandomMomentInMs)
  }
},
methods: {
  updateCurrentTime () {
    this.currentTime = Date.now()
  }
}
...
created () {
  EventBus.$on('updateGlobalClockEvent', this.updateCurrentTime);
}
```

Additionaly, you can upgrade this solution by using a Web Worker for handling the `setInterval` function so it won't be ever delayed by UI processing.

## SHOW me!

Alright, if you are curious how this work, you can check this simple Code Sandbox I've prepared as an working example: [https://codesandbox.io/s/7mwrmj69vq](https://codesandbox.io/s/7mwrmj69vq)

What do you think about this solution?

Do you even use Event Bus for anything in your Vue.js applications?

-- ł.

> This post is a part of my Vue.js tips & tricks article series, based on personal experience while working on real-life projects.