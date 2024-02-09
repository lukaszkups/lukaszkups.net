---
title: Getting value from bootstrap date inputs
date: 2015/05/06
category: programming
tags: javascript, jquery, js, webdev, webdevelopment, web development, front-end, front-end development, programming
active: 2
---

Today my friend asked me how to get the value (date) from bootstrap's date input. My first thought was like:

```
var myDate = $('input').val();
```

But instead of value I've got `""` (an empty string). I've inspected the input element in DOM and it was actually right behaviour - that input had no value.

Luckily, after little search I've found the solution:

```
var myDate = $('input').data('date');
```

And that's it - enjoy!

-- ł.
