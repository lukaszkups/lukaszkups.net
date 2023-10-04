---
title: How I've made my first indie game
date: 2020/10/07
category: programming, devlog
tags: devlog, indie game, indie game dev, gamedev, game development, indie game development, devlog, programming
active: 2
---

## Backstory

> I've been trying gamedev couple times already. Building something from scratch, using Vue.js as a support tool, learning various game engines like Phaser or Godot. But I've never go through "playing around with it" phase. In other words: I've become bored and unmotivated because of slow progress while trying to make my ideas come to life.

But this has changed when I've tried out [Construct 3](https://construct.net).

Thanks to youtube channel of the game dev that uses Construct, [Vimlark](https://www.youtube.com/c/Vimlark) I've got hyped into this tool before I've even launched it for the first time. Watching his videos was so enjoyable experience that I felt immediately boosted to create something with that tool.

## Inspiration

During my university times, I've loved to play a flash game, Taberinos by Tonypa (still available e.g. on [ArmorGames](https://armorgames.com/play/5544/taberinos) (enabling flash required)). The main goal of that game was to clear the level of circles and lines by hitting them by the other ball. Just recently I was thinking about remaking that game in raw HTML5 as a practice task in game development.

That's how [BOINK!](https://lukaszkups.itch.io/boink) was born.

I've decided to not create a direct 1:1 clone, but something that I'll enjoy more, so I've got rid of idea of lines and use circles only (here: white balls) as a thing to hit (here: *boink to* 😉). Some time after initial release I've came up with the idea of additional obstacles in the form of spinning evil squares 😈.

## Bad ideas

In the first version of BOINK!, the white ball after you hit it was starting to blink for couple seconds until vanish and getting removed from the level. During that time, you were still able to collide with it. This mechanic has been set on purpose - e.g. to work as an obstactle to reach different areas of the level during single launch of the ball. It was also a great blocker if you wanted to reach out to med-pack (which adds you 3 additional moves).

But it turned out that it wasn't that great idea.

Many people has reported this to me as a bug. After my explanation they were kinda cool about it, but that was making me unsatisfied anyway (as it seemed unintuitive) so I decided to remove it (in current version when ball is blinking there is no collisions with it anymore).

Other kinda failure from my side was game balance. I've played my game couple times and I've managed to score around 150 - 200 points.

One of my friends in the meantime has reached the critical point after which he has started receiving more points after each move than he was losing.

I had to think over the game rules and how player can receive bonus clicks. That was also the motivation to add a square entity to the game that will spawn from time to time and make you loss 5 clicks on accidental boink 😉.

## Ending words

I've really enjoyed working with Construct 3. It was a refreshing experience after working full-time (and in spare time) with Vue.js/Node.js/Node-webkit/JavaScript.

I'm pretty sure that I'm gonna keep making some small games as a reset from *serious* (web) development and eventually will buy a full <strike>version</strike> license for Construct 😎 (as it is a subscription-based software).

If you ever wanted to create a game, [Construct 3](https://construct.net) is really a good choice to begin with. It has really clean interface and whole workflow is very intuitive.

Game [BOINK!](https://lukaszkups.itch.io/boink) is still in active development, at the moment I have planned to add at least 2 other new features to it. Feel free to share your thoughts about it on [twitter](https://twitter.com/lukaszkups) or [directly at itch.io comments section](https://lukaszkups.itch.io/boink).

-- ł.
