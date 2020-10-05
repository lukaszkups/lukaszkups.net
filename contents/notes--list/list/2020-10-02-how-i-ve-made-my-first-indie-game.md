---
title: How I've made my first indie game
date: 2020/10/02
category: programming, devlog
tags: devlog, indie game, indie game dev, gamedev, game development, indie game development, devlog, programming
active: 2
draft: true
---

## Backstory

> I've been trying gamedev couple times already. Building something from scratch, using Vue.js as a support tool, learning various game engines like Phaser or Godot. But I've never go through "playing around wiht it" phase. In other words: I've become bored and unmotivated because of slow progress while trying to make my ideas come to life.

But this has changed when I've tried out [Construct 3](https://construct.net).

Thanks to youtube channel of the game dev that uses Construct, [Vimlark](https://www.youtube.com/c/Vimlark) I've got hyped into this tool before I've even launched it. Watching his videos was so enjoyable experience that I felt really boosted to create something with that tool.

## Inspiration

During my university times, I've loved to play a flash game, Taberinos by Tonypa (still available e.g. on [ArmorGames](https://armorgames.com/play/5544/taberinos) (enabling flash required)). The main goal of that game was to clear the level of circles and lines by hitting them by the other ball. Just recently I was thinking about remaking that game in raw HTML5 as a practice in game development.

That's how [BOINK!](https://lukaszkups.itch.io/boink) was born.

I've decided to not create a direct 1:1 clone, but something that I'll enjoy more, so I've got rid of idea of lines and set only circles (here: white balls) as a thing to hit (here: *boink to* 😉). Some time after release I've come up with the idea of additional obstacles in the form of spinning evil squares 😈.

## Bad ideas

On the initial release, after you boink the white ball it was blinking for couple seconds until vanishing and getting removed from the level. During that time, you were still able to collide with it. This mechanic has been set on purpose - e.g. because from time to time you had a chance to have a med-pack get spawned (which is disappearing after 2 seconds, but if you make it to collect, you're gonna receive 3 additional moves) and I thought that's gonna be a cool additional obstacle if it get spawned away from you and these blinking balls will make you unable to reach it.

It turned out that it wasn't that great idea.

Many people has reported this to me as a bug. After my explanation they were kinda cool about it, but that made me unsatisfied so I decided to remove it (now when ball is blinking there is no collisions anymore).

Other kinda failure from my side was game balance. I've played my game couple times and I've managed to score around 150 - 200.

Turned out, that one of my friends has reached the critical point after which he has started receiving more points after each move than he was losing. I had to think over the game rules and how player can receive bonus clicks. That was also the inspiration to add a square entity to the game that will spawn from time to time and make you loss 5 clicks on accidental boink 😉.

## Ending words

I've really enjoyed working with Construct 3. It was also a refreshing experience after working full-time with Vue.js and [Lem](https://lem.pub) in my spare time.

I'm pretty sure that I'm gonna keep making some small games as a reset from *serious* development and in the end will buy a full <strike>version</strike> license for Construct 😎

If you ever wanted to create a game, [Construct 3](https://construct.net) is really a good choice to begin with. It has really clean interface and whole workflow is very intuitive.

-- ł.
