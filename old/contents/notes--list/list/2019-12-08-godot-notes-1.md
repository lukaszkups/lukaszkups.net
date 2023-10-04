---
title: Godot Notes #1
date: 2019/12/08
category: gamedev, programming, shortie, devlog
tags: programming, godot, gamedev, devlog, shortie
active: 2
draft: true
---

Handy shortcuts:

`ctrl+B` - activate select mode (handy to select & remove multiple tiles in level's grid)

Some guides:

In `Collision -> Layers` section, the `Layer` indicates what object is (e.g. `Hazards`). The `Mask` though, indicates what it can INTERACT with, so e.g. with `Player` (or other `Hazards` if we want friendly fire between them). Important: when adding first hazard, remember to update Player's `Mask`, to interact with `Hazards` too.

To delay some logic in time, use: `yield(get_tree(), "idle_frame")` - each execution of this method will delay all the pending actions in 1 frame of the time. Handy e.g. if you have a physics logic that resets velocity on contact with the floor, and you want to implement e.g. spikes to interact with player and launch him in the air when taking damage. So for example:

```
func hurt():
	# bypass gravity to not reset hurt jump motion
	position.y -= 5
	yield(get_tree(), "idle_frame")
	motion.y -= JUMP_SPEED
	lives -= 1
	if lives < 0:
		end_game()
```

To disable sound effects looping, select the audio file, go to `Import` tab (next to `Scene` tab), untick the `Loop` property and hit `Reimport` button.

`CanvasLayer` node type is the graphical layer, that is always at the fixed position at the screen (ideal for GUI).
