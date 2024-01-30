---
title:  BJQS Slider Responsiveness Hack
date: 2015/02/24
category: programming
tags: bjqs, slider, bjqs slider, js, javascript, programming, web dev, web developer, web development, front-end, front-end developer, front-end development
active: 2
---

[BJQS slider](http://www.basicslider.com/) is one of my favorite slider's plugin. It is really easy to use and customize for various needs.

> The problem with plugin appears, when we want to make it responsive (e.g. on full screen width)

Slider becomes laggy and doesn't scale slides properly. But I've managed to hack the solution for this little bug.

When You're initializing the plugin, You can define the dimensions (width and height) of the slider - and You should define there the largest possible value for it. At the same time, it will be the maximum size of the single slide. This value should equal Your device's parameters:

```
$('#mySlider').bjqs({
    ...
    width: window.screen.width,
    responsive: true,
    ...
});
```

After plugin initialization, we should trigger the resize event on page (because if active browser window won't be in maximized mode, then slider will be bigger and not visible in 100%):

```
$(window).trigger('resize');
```

PS. In case You are using slider pagination bullets and You want to keep them centered horizontally, then You should add this code before triggering the resize event:

```
$(window).resize(function(){
    $('#mySlider .bjq-markers.h-centered').css({'left':0});
});
```

This solution works on firefox & chrome - not tested with IE & other stuff - if You have any info about it, please let me know about it.

-- ł.
