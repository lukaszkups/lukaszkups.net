---
title: Lessons learned from making a Vue.js puzzle game
date: 2017/11/15
category: programming,
tags: vue.js, vue, js, javascript, programming, webdev, web development, development
active: 2
---

For the last couple weeks I was taking a part of multiple recruiting processes. Most of them required to do simple tasks to show my way of doing things and programming experience.

And this article is about one of them.

One of the companies asked me to do a simple puzzle game based on provided mockups and assets. It has to require player name on start, count time taken to solve the puzzles and ask player to start over or save score and display table of 10 best highest scores.

![img](/static/1514932542100-puzzle1.png)

This was one of these tasks where I have almost total control what I want to use to develop it — the only requirements was to use webpack as module bundler, html5, ES6, some CSS3 preprocessor and json-server package to serve/store player scores.

## Lessons learned

I’ve decided to use one of existing [Vue.js templates](https://github.com/vuejs-templates) (webpack). I’ve configured it to work with sass preprocessor and resources loader (so I can use css variables without the need to import whole file in Vue single file components).

## Using slots for reusable components

When I started working on this task I planned to create as reusable components as (easily) possible. One of them was a popup component, which uses `<slot></slot>` for passing its contents directly in template.

```
<template>
  <div
    class="popup"
    v-if="showWindow">
    <div class="popup__window">
      <div class="popup__title-bar">
        <h2 class="popup__window-name">{{ windowName }}</h2>
        <span
          class="popup__close-icon"
          @click="closePopup"
          v-if="closeable"
        >
          x
        </span>
      </div>
      <div class="popup__content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
```

## Vuex

The other thing is that I’ve decided to use Vuex for state management. At first I thought that this app is too small to use it, but after creating couple first components I was very happy of my decision. Vuex saved me from hacking around multiple event buses and make my code more clean and straightforward. In addition, I’ve learned about it’s limitations when we're dealing with arrays:

```
updateTile(state, payload) {
    // This won't work:
    // state.tiles[payload.order] = payload;
    // Because of reactive var limitations mentioned here: https://vuejs.org/v2/guide/list.html#Caveats
    state.tiles.splice(payload.order, 1, payload);
},
```

And I’ve spread main store into multiple modules:

```
import Vue from 'vue';
import Vuex from 'vuex';

import loginPopup from './modules/loginPopup';
import errors from './modules/errors';
import timer from './modules/timer';
import board from './modules/board';
import puzzle from './modules/puzzle';
import score from './modules/score';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginPopup,
    errors,
    timer,
    board,
    puzzle,
    score,
  },
});
```

I’ve also learned how to make store actions promise-based so I can chain it with `.then()` as a callback caller.

```
removePuzzle({ commit }, payload) {
  return new Promise((resolve) => {
    commit('removePuzzle', payload);
    resolve();
  });
},
```

## Mixins

I’ve decided to separate core game functionality (puzzle preparation, start, restart etc.) into dedicated mixin that can be imported in multiple places of the application, such as main game wrapper, user login popup and scores list popup (for restart button).
High scores

To get high scores list with top 10 results I’ve used axios (which should I finally abandon for the sake of fetch API which I tend to forget about constantly).

Luckily, json-server has already built-in filters so I can get necessary data in a form I need: `/scores?_sort=score&_order=asc&_limit=10`.

## Main app concept

When I first read task requirements I was thinking about how to solve creating puzzle tiles from actual image. The first idea was to mess a bit with HTML5 canvas but on second run I thought it will be a bit of an overkill. I’ve googled a bit about this topic and I’ve found a very simple solution: modifying background-position css property! :)

```
generatePuzzleTiles() {
  const tiles = [];
  for (let x = 0; x < 9; x += 1) {
    tiles.push({
      inPlace: true,
      order: x,
      styles: {
        background: `url(${PuzzleImage}) no-repeat`,
        backgroundPositionX: `-${(x % 3) * this.tileSize}px`,
        backgroundPositionY: `-${Math.floor(x / 3) * this.tileSize}px`,
        height: `${this.tileSize}px`,
        width: `${this.tileSize}px`,
      },
    });
  }
  this.tiles = tiles;
},
```

## Final words

In overall, I’m pretty satisfied with the final effect. It took me not so long time to finish, and the code is pretty clean and readable. As (almost) always, I feel bad that I haven’t forced myself to write some tests to it. But maybe some day.. ;)

The whole code is available on [github](https://github.com/mrmnmly/puzzle-game) — feel free to share what do You think about it.

-- ł.
