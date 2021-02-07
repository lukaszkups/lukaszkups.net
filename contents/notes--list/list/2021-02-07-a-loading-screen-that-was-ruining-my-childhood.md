---
title: A loading screen that was (unnecessarily) ruining my childhood
date: 2021/02/07
category: game development
tags: game dev, gamedev, game development, programming, bug, bugs, debugging, retro, lego, lego island 2, brickster revenge
active: 2
---

> Recently I've decided to introduce my kiddo to the games of my childhood - LEGO Racers & LEGO Island 2

Thanks to [myabandonware.com](http://myabandonware.com) (💛) I've managed to download both of them. Of course it wasn't that straightforward to make them work on modern Windows 10 OS, but thanks to great retro-gaming communities I was able to do it in no time.

While everything was OK with LEGO Racers game, LEGO Island 2 had some issues.

It was working EXACTLY the same as 20 years ago.

If you've ever played LEGO Island 2 you probably remember 2 things about it: big (for those times), open-world-alike levels and **THOSE FREAKING-LONG LOADING TIMES**.

And for those who never played this game I mean it - loading times was really long.

The **really-really** long ones.

To visualize it: no matter how big level had to be loaded, the loading screen (a spinning CD with printed pizza on top if it + *Loading* label) would take from couple to a dozen minutes (sic!) 🙄.

![img](/static/lego-island-loading.jpg)
*Screen from hell*

After a short investigation (also knows as: *googling*) I've learned that authors of this game set higher priority to loading screen framerate than to loading data itself - so they've set an top limit of data amount that can be loaded per animation frame (sic! level over 9000 🤣).

Fortunately, some clever minds has created a patch app that is able to remove this limit (and also couple other "issues").

And that wasn't the only sin of this production, for more details please take a look on the [original source thread](https://www.rockraidersunited.com/topic/6724-the-sins-of-lego-island-2/) I've found while searching for help with the installation process.

-- ł.
