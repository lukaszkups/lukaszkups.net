---
title: My First Kaboom.js game
date: 2024/03/06
category: programming, gamedev
tags: programming, js, javascript, ts, typescript, gamedev, game development, indie game, indie game dev, vite, kaboom.js, kaboomjs
active: 2
---

> As a continuation of my [previous note](/notes/space-saga-devlog-1-engine-selection/), for the last couple days I've been messing around with [kaboom.js](https://kaboomjs.com) library - and I think it's awesome!

## Introduction

Kaboom.js is a very flexible library tailored for game development that is using a powerful component system, so you can (almost) freelly compose your own game objects and behaviors. It reminds me a [Vue.js 2](https://v2.vuejs.org/) syntax a little bit.

As you might now, I was looking for something more close to raw coding itself (and not subscription-based! 🙄💸) - so after digging around I've decided to give Kaboom.js a try! 

So what game I've made actually?

Whelp, probably you've guessed it already:

<iframe frameborder="0" src="https://itch.io/embed-upload/9881328?color=000000" allowfullscreen="" width="100%" style="height:unset; aspect-ratio:4/3"><a href="https://lukaszkups.itch.io/boink-kaboom">Play Boink! (Open Source Kaboom.js project) on itch.io</a></iframe>

(if game above doesn't work, you can [play it here](https://lukaszkups.itch.io/boink-kaboom) or [browse its source code here](https://github.com/lukaszkups/boink-kaboom))

## Lessons learned

1. First and foremost - use some global state management instead reading various chunks of shared data from the in-game objects! I've been postponing this for too long and it was difficult by the end of development to change the approach.

2. Extending components is really easy, just add an array as a optional function parameter, which then can be spread down to the main component (and so override its values!), e.g. let's take the following `Ball` component, which is a base for other components in Boink! game:

```
export default function Ball (optsArr = []) {
  return k.add([
    k.circle(ballSize),
    k.rotate(0),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('center'),
    k.color('#ff0000'),
    k.pos(
      k.width()/2,
      k.height()/2,
    ),
    {
      angleInDeg: 0,
      speed: 0,
      toBeDestroyed: false,
    },
    boost(),
    'ball',
    ...optsArr
  ]);
};
```

See the spread of the array in the end of its definition? Thanks to it, we can create a kind of child-object that inherits most of the properties from it, e.g. `PlayerBall`:

```
export default function PlayerBall () {
  const playerBall = Ball([
    {
      isMoving: false,
    },
    k.color('#f1f100'),
    k.offscreen({ distance: 1 }),
    flash(),
    flashColor(),
    'player-ball',
  ]);
  playerBall.drag = 0.1;

  return playerBall;
};
```

Thanks to the `optsArr` function parameter, we were able to somewhat "extend" the `Ball` object and create another type from it.

Just to show also another example: a `BoostBall` (the black one, that emits particles and boost our player's ball on touch) also is extending `Ball` object:

```
export default function BoostBall (optsArr = []) {
  const boostBall = Ball([
    k.color('#000000'),
    shakeEntity(),
    spawnParticles(),
    'boost-ball',
    ...optsArr,
  ]);

  boostBall.shakeEntity();
  boostBall.spawnParticles(0.25, 4, 1, 50);

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 40;
    k.play('boost');
    k.shake(5);
  });

  return boostBall;
}
```

3. Don't be afraid of creating custom components - and try to make them as reusable as possible, e.g. I've created a component that enables us to create shake offect of the object:

```
export const shakeEntity = () => {
  let originX = 0;
  let originY = 0;
  return {
    id: 'shake-entity',
    shakeEntity (sizeX = 1, sizeY = 1, speed = 0.05) {
      originX = this.pos.x;
      originY = this.pos.y;

      k.loop(speed, () => {
        if (this.pos.x !== originX && this.pos.y !== originY) {
          this.pos.x = originX;
          this.pos.y = originY;
        } else {
          this.pos.x += k.rand(sizeX);
          this.pos.y += k.rand(sizeY);
        }
      });
    }
  }
}
```

It has some default method payload values, but you can freely modify it when you need - for sure I'm gonna save this one for my later projects!

Another good (imho) example, is a component that will gonna spawn other objects (particles) in random directions:

```
export const spawnParticles = () => {
  let _loop = null;
  return {
    id: 'spawnParticles',
    add () {
      this.onDestroy(() => {
        // stop spawning particles
        this.stopSpawn();
        // destroy remaining particles
        k.destroyAll(`particle-${this.id}`);
      });
    },
    spawnParticles (spawnInterval = 0.5, amount = 1, lifetime = 1, speed = 1, args = []) {
      _loop = k.loop(spawnInterval, () => {
        for(let counter = 0; counter < amount; counter++) {
          const particle = k.add([
            k.circle(1),
            k.opacity(1),
            k.pos(this.pos),
            k.move(k.rand(360), speed),
            k.color('#000000'),
            `particle-${this.id}`,
            ...args,
          ]);
          particle.fadeOut(lifetime).onEnd(() => particle.destroy());
        }
      });
    },
    stopSpawn() {
      _loop?.cancel();
      _loop = null;
    }
  }
}
```

In my opinion it still can be improved, e.g. by enabling passing custom object types that will be spawned instead of default particles and/or by adding angle limitations for particle spawn 🤔👨‍🏫

4. Tag everything - don't forget to create a new custom tag when creating an object, especially when it inherits from another type (so that you're gonna be able to create unique events for it).

5. If something doesn't work, first double check if you have added required and/or appropriate components! I'm still really ashamed about how much time I've lost figuring out why Kaboom's `rotateTo` method doesn't work and console was throwing me an error that `rotateTo is not a function` 😅 (turned out that I've totally forgot to add `k.rotate()` component when defined new game object type 🤦‍♂️🤦🤦‍♀️).

## Summary

I'm really satisfied on how fast I've learned about the basics of Kaboom.js library and managed to create first game with it (even if it's that simple game as Boink!).

When I've made it public on my [itch.io](https://lukaszkups.itch.io) page, I've realized that I've forgot to add a magnet obstacle to the game - thankfully adding it took me around 15 minutes!

And that's in my opinion my best recommendation to take a closer look into this tool 😎

Feel free to share your thoughts about this library - have you managed to create something already with it?

Best,

-- ł.
