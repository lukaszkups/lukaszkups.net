---
title: Let's create desktop app using Vue.js and NW.js
date: 2020/05/27
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

First, you need to install dependencies:

```
npm install -g @vue/cli
```

Then, initialize the project via Vue CLI:

```
vue create your-first-desktop-app
```

In the next step enter the folder of the newly created project and install NW.js's SDK:

```
cd your-first-desktop-app
npm install --save-dev nw@sdk
```

In your `package.json` you need to define the starting point of your app - in our case it will be Vue.js server:

```
...
"main": "http://localhost:8080",
...
```

While you're in that file you can also add a npm command that will initialize the NW.js window:

```
"scripts": {
  ...,
  "nwstart": "nw ."
}
```

And that's basically it! You have now properly configured basic app setup 🙂

To run it, you need to open 2 terminal command lines, and start on it Vue.js server...

```
npm run serve
```

...and NW.js app:

```
npm run nwstart
```

# WSL anyone?

If you're a windows user that is using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (Window Subsystem for Linux) like me, you need to know there's a catch: you need to run the NW.js app via non-linux based terminal shell, e.g. via [Git Bash](https://gitforwindows.org/) - why? Well, if you want to run your app on Windows desktop environment you need to use compatible shell - in other case the app will think that you're trying to run the app on linux really and you'll end with no app running and bunch of errors 😉

-- ł.
