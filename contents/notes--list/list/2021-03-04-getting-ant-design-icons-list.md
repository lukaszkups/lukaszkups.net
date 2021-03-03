---
title: Getting Ant Design icons list
date: 2021/03/04
category: programming, vue.js, tech
tags: vue, vue.js, programming, webdev, front-end, web development, web developer, front-end developer, front-end development, javascript, js, ant, ant design, ant-design, ant-design vue, ant design vue, antdv, icons, icon, icon picker
active: 2
---

> I've recently had to create an icon picker component in the application that is using [Ant Design Vue](https://antdv.com/docs/vue/introduce/) UI framework

Ok, but how I should get all available icons that are available in Ant Design? Unfortunately I haven't found any straightforward guide for this use case in the available resources.

But fear no more, I've done some research and analyzed the code of the Ant's icon component itself and found a solution;

First, import icons as a module from original Ant Design (non-vue) package - as you should already have it installed if you're using Ant Design Vue:

```
import * as Icons from '@ant-design/icons'
```

If you try to `console.log` it, you're gonna see the following:

```
Module {…}
  AccountBookFill: Object
    icon: {tag: "svg", attrs: {…}, children: Array(1)}
    name: "account-book"
    theme: "fill"
    __proto__: Object
  AccountBookOutline: (...)
  AccountBookTwoTone: (...)
  AlertFill: (...)
  AlertOutline: (...)
  ...
  // etc. etc.
```

So, you might want to format is in the way you want, but to make it work with the `<a-icon />` Ant Design Vue library, we need to adjust the theme enum, as it's a bit different than the one you'll receive from `@ant-design/icons`:

```
const themeEnum = {
  fill: 'filled',
  outline: 'outlined',
  twotone: 'twoTone'
}
const icons = {...Icons};

this.yourVariable = Object.keys(icons).map((key) => ({
  description: key.toLowerCase(),
  icon: icons[key].name,
  theme: themeEnum[icons[key].theme]
}));
```

And that's it! You can now loop over `this.yourVariable` in your Vue.js component template and list all the icons.

If you have any questions, feel free to [contact me](https://twitter.com/lukaszkups)!

-- ł.
