---
title: Let's create dot, dot-dot, dot-dot-dot CSS loading animation
date: 2019/08/01
category: programming, css, tech
tags: programming, webdev, css, front-end, animation, sass, stylesheet
active: 2
---

During this week I had to add loading indication without using any graphical assets. When browsing existing ideas I've decided to use just plain `Loading` text with three animated dots (`.`, `..`, `...`) after it.

It turned out (what a surprise) that someone already had similar issue and created a thread on [stackoverflow](https://stackoverflow.com/questions/4639716/dot-dotdot-dotdotdot-as-loading/) about this.

Yeah, the title of this question is super intuitive :D

I was a bit surprised though - most of the answers were JavaScript-based or css ones were in my opinion a bit overcomplicated (e.g. [this one](https://codepen.io/vkjgr/pen/gbPaVx)).

At this point (of course!) I've decided to try solve this by myself.

Going straight to the solution:

```
// HTML
<p class='loading-paragraph'>Loading<span></span><p>

// CSS (nested SASS)
.loading-paragraph
  span
    &:before
      animation: dots 2s linear infinite
      content: ''

  @keyframes dots
    0%, 20%
      content: '.'
    40%
      content: '..'
    60%
      content: '...'
    90%, 100%
      content: ''
```

And the result:

<p class='loading-paragraph'>Loading<span></span></p>

[You can also check it on codepen](https://codepen.io/lukaszkups/pen/NQjeVN).

Voila! It's that simple! You're welcome ;)

If you want to promote this solution - feel free to upvote [my answer on stackoverflow](https://stackoverflow.com/a/57289650/1004946) ;)

And that's all folks! Happy coding!

-- ł.
