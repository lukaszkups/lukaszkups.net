---
title: Let's create desktop app using Vue.js and NW.js
date: 2020/05/26
category: programming
tags: programming, development, tech, technology, software, desktop, desktop app, app, application, javascript, js, vue, vue.js, nw.js, node-webkit, node, node.js, webkit, node webkit
active: 2
---

As some of you already now, I'm working currently on my very own desktop app. I've been trying out various approaches for desktop app development that is available out there, such as:

- plain JavaScript + [electron.js](https://www.electronjs.org/)
- [meteor.js](https://www.meteor.com/) + electron.js
- [Vue.js](https://vuejs.org/) + electron.js
- [Express.js](https://expressjs.com/) + electron.js
- Vue.js + [NW.js](https://nwjs.io/)

To be honest, most of them was really painful to even start work with.

Seriously, making it work on Windows machine with WSL enabled was almost impossible.

But finally, I've found the greatest pair of tools that enables me to start working almost instantly - it was the last position mentioned above: **Vue.js + NW.js**.

## Setup

First, you need to install must-have dependencies, that is [Vue CLI](https://cli.vuejs.org/) and NW.js SDK:

```
npm install -g @vue/cli
```

Then, initialize the project via Vue CLI:

```
vue create your-first-desktop-app
```

In the next step enter the folder of the newly created project and install SDK:

```
cd your-first-desktop-app
npm install --save-dev nw@sdk
```

Alright, now you can add a npm command that will initialize the NW.js app - in the `package.json`:

```
"scripts": {
  ...,
  "start": "nw ."
}
```

And that's basically it! You have now properly configured basic app setup 🙂


