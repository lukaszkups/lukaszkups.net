
---
title: How to setup a desktop app project with Vue.js and NW.js
date: 2020/12/15
category: programming
tags: programming, vue.js vue, webdev, web development, programming, development, js, javascript
active: 2
draft: true
---

> As some of you might already know, I've been working on my side-project, [Lem]() which will be a desktop application, built with [Vue.js](https://vuejs.org) and [NW.js](https://nwjs.io/). In this article I would like to share with you my experience with setting up the project.

## Prerequisites

A basic knowledge of working with [node.js](https://nodejs.org/en/), [npm](npmjs.com/) and command line environments (windows(bash)/linux) is required. You should also have [Vue.js CLI](https://cli.vuejs.org/) already installed.

## Dependencies

Create a regular Vue.js project via Vue-CLI:

```
vue create my-app
```

Enter project folder (`cd my-app`) and install NW.js in SDK version:

```
npm i --save nw@sdk
```

> Why SDK? While using this version you'll be able to debug your app via vue devtools or like a regular browser application. In non-SDK version the right-click context menu is disabled. Once you finish developing your app, you should reinstall this package in non-SDK version.

Let's install now other required dependencies for development (vue devtools and builder package):

```
npm i --save-dev nw-vue-devtools-prebuilt nwjs-builder-phoenix
```

## Project configuration

Open `package.json` file with your preferred code editor and add following lines:

- Target NW.js build version - you can set the latest one that is available on [NW.js website](https://nwjs.io/downloads/)

```
"build": {
  "nwVersion": "0.47.3"
},
```

- Configuration options that enable us to use Vue.js dev tools:

```
"developer": {
  "showDevToolsOnStartup": true
},
"chromium-args": "--load-extension='./node_modules/nw-vue-devtools-prebuilt/extension'",
```

- Main thread of the app (in our case - a Vue.js server):

```
"main": "http://localhost:8080",
"node-remote": "http://localhost",
```

- NW.js local server command:

```
"scripts": {
  ...
  "nwserve": "nw . --mixed-context"
}
```

## First launch

To run an app with this configuration, you're gonna need 2 terminals opened at the same time, inside the location of the project.

On the first terminal, run Vue.js app:

```
npm run serve
```

And on the second one, run the NW.js:

```
npm run nwserve
```

Most probably NW.js will launch sooner, so you're gonna see an empty window (or window with error inside), but once Vue.js compiles everything, you should see the following screen:

