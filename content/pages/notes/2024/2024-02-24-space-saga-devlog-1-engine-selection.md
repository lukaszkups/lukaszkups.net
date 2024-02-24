---
title: "Space Saga Devlog #1 - Engine selection"
date: 2024/02/24
category: programming, gamedev
tags: programming, js, javascript, ts, typescript, gamedev, game development, indie game, indie game dev
active: 2
---

## What is (or will be) Space Saga?

Some time ago I've came up with an idea of making a game about space adventurer, who will be able to travel from planet to planet, trade with aliens and learn about secrets that are spread across the galaxy.

Game would be split into different "modes":

- Galaxy map - you will be able to select planets you want to travel to, but you will be limited by your spaceship range (which you will be able to upgrade over time)

- Space Travel phase - while traveling to the planet, you will need to fly there (imagine *Galaxian*/*Galaga*/*Space Invaders*/*Gun Nac*/*Xevious*)

- Special Events - e.g. space pirates trying to board your ship, someone from your crew get sick or anything else you can imagine that can happen during space travels; In this mode you will be able to walk around your ship (in top-down view, like in retro jRPG games)

- When you arrive to your destination, you will be able to select (planet) area where you want to land and then travel by foot (this topic is still TBD really 😉) - most of the destinations will be hidden during first visits and you will unlock new of them during game

- Combat mode - I'm still struggling on decision with this one. I want this game to be a demake successor of Phantasy Star Online (1), which I am big fan of, but I don't really know if I want to make battles real-time like in *Hyper Light Drifter* style or turn-based, like in classic jRPGs.

As you can see, this game will consist of various modes and I would love to develop all of them inside one game engine - that's why I've spend couple last weeks checking on what market can offer me (I was also thinking about building own engine from scratch, then I've switched to use [Pixi.js](https://pixijs.com/) as my renderer, but in the end I've abandoned that idea as it would be way too slow approach).

## Game engines

Here's a list of game engines that I've checked, with a short description about my personal feelings about them (which might vary from yours, of course):

### Construct 3

My long time beloved game engine, I've already created some [games](https://lukaszkups.itch.io) with it, even [released one on Steam](https://store.steampowered.com/app/1935130/Terry_Poorflyer/) - it's really developer-friendly for smaller games, but I can't imagine creating comfortably something like I'm about to make now. Also its yearly subscription fee is not cheap, which is the biggest flaw for me.

![img](/static/construct3-ui.jpg)
*I have developed many prototypes and small games using this engine, I can say that this game engine really introduced me to most of gamedev concepts🙌*

[Link](https://www.construct.net/en)

### Ct.js

For so long time I wasn't aware of this engine existence. I can describe this engine as a bit smaller, free Construct 3 alternative (basically it is often called as a *Pixi.js* game editor). Similarly to Construct 3, it has web-based editor but also supports some JavaScript-based scripting, although from what I've seen it's a bit too engine-specific in my opinion (a.k.a. it has its own specific way of doing things that you need to follow).

For sure I will try it out in the future   for smaller games, as I've already resigned from Construct 3 subscription plan.

[Link](https://ctjs.rocks/)

### Godot

It's very similar to Construct 3, but is more flexible and advanced (and most important - FREE). Similarly to Construct 3 it relies heavily on its editor really, which helps and disturbs me at the same time 😅. Biggest flaw for me here is that I doesn't offer coding with JavaScript/TypeScript out of the box (it offers GDScript, C++ or C# instead).

![img](/static/godot-editor.png)
*Similar to Construct 3 and Ct.js, you have basically all batteries included to develop a whole game in Godot!*

[Link](https://godotengine.org/)

### Excalibur.js

I do really like this engine! Its approach to extend built-in classes (mostly `Actor` 😅) really speaks to me and is really intuitive as to someone, who comes from web development world.

This engine is one of my top choices among others in this list. The biggest downside is its version - at the day of writing this article it's still in v0.29 (so not really yet even close to v1.0 😞) and from what I've noticed in the [changelog](https://github.com/excaliburjs/Excalibur/releases) it still have regular breaking changes which is a big no-no to me at the moment 😞.

I've learned about this engine from [Drew Conley](https://www.youtube.com/@DrewConley) youtube videos, and this one is particularly a great showoff what this engine has to offer:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/sNk9dkaOkJs?si=ZN0Z0iUrgIaNBp9i" title="YouTube video player" frameborder="0"></iframe>

[Link](https://excaliburjs.com/)

### Kaboom.js

Really weird to me at first, but after a while it become top choice. Really flexible and powerful engine, has unique approach of building a game from components (imagine that every element of a game is a component that is build from smaller components). It has very simple API that seems to be really easy to start working with and documentation is really well written.

Here's a great introduction video I've found:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/iRXI6ThRJvM?si=UHz3rBoeM_jraYSJ" title="YouTube video player" frameborder="0"></iframe>

[Link](https://kaboomjs.com/)

### Phaser.js

Most powerful, with long on the market history candidate. It offers wide range of plugins and features. 

In my opinion the biggest downside is that Phaser.js has very weird documentation - not really developer-friendly, even though it has many example projects to browse, this approach simply doesn't really "clicks" to me when I am searching for something in particular or want to learn how to make games with this engine effectively.

[Link](https://phaser.io/)

## Honorable mentions

Besides diving deeper into above frameworks, there are some other candidates that I've found interesting, but haven't really took a closer look to (a.k.a. checked only code examples and docs, haven't prototyped anything with them):

### Little.js

This engine looks really nice, will probably check it out in the future, it has nice [list of game examples](https://killedbyapixel.github.io/LittleJS/docs/#games-made-with-littlejs), haven't checked it deeper as I couldn't find any good tutorials for it (so I assume community is not yet that big)

[Link](https://github.com/KilledByAPixel/LittleJS)

### PlayCanvas

Honestly, I don't really know why it's not more popular in the market - this engine looks like a web equivalent mix of  [Pixi.js](https://pixijs.com/) + [Unreal Engine](https://www.unrealengine.com/en-US) + [Unity](https://unity.com/). It's web UI editor is really powerful, engine itself offers great performance and it has free tier for everyone to create games with it. It uses JavaScript as its main coding language. 

So it's amazing, but does it have any flaws? 

Actually yes - for my particular scenario I think I don't need THAT ADVANCED tool, the learning curve seems a bit too shallow for me at the moment and the engine/editor itself, seems a bit more focused towards 3D than 2D games imho.

[Link](https://playcanvas.com/)

## Summary

JavaScript world really evolved over recent time and so we have now a really wide choice of what tools we want to use. This blog post shows only a small part of what is really available to use - I've selected only most interesting (from my point of view) candidates, which I've briefly checked of what they have to offer.

If you have any suggestions about other game engines, please let me know - there is comment section added to the blog! 

-- ł.
