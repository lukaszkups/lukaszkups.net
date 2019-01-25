---
title: How to structure big Vue.js apps?
date: 2018/11/04
category: tech, Vue.js tips & tricks
tags: vue.js, vue, js, javascript, programming, development, front-end, front-end developer, front-end development, architecture, spa, single page apps, single page application, web development
active: 2
---

Today I want to share with you my personal best way how I organize structure of the big Vue.js applications.

In the beginnings of my adventure with Vue.js I've seen opinions that this framework is not very suitable for big/complicated web applications and should be used mainly for small to medium size SPAs.

Personally, I've never believed in that statement.

At [QContact](https://qcontact.com) we develop our web application using Vue.js as a main front-end framework. Our product have already many various reusable components and over a dozen views (which are both CRUDs and totally customised ones) and we haven't noticed any problems with performance or code management (besides increasing production build time on each new feature delivery :) ).

Fortunately, I had an opportunity to join QContact in the very beginning of the front-end development phase so I could take part of the architecture design process.

At the same time I've also build couple side-projects using Vue. This enabled me to test various approaches of application structure so after of couple re-arrangements I've got into the point that suits to most project use-cases pretty well:

```
*--build                  // webpack & other build-related stuff
*--config                 // Vue-CLI & environment config-related stuff
*--src                    // main project folder with actual code
*--static                 // source of static (vendor mostly) files
   *--images
   *--js
   *--css
   *--...                 // other folders like e.g. CKEditor source or something
*--public                 // source of static files (such as e.g. graphic assets)
   *--images
*--tests                  // tests folder
```

The above's graph though represents the root level of the project, which is pretty standard compared to default project generated via Vue-CLI.

## Src & components folder

Things get interesting, when we dive into `/src` folder:

```
*--assets               // static files e.g. images / fonts etc.
*--components           // main source of app's components
*--helpers              // helper files like date parsers, custom events etc.
*--lang                 // translation files
*--mixins               // source of app's mixins
*--router               // router-related files
*--setup                // files that are handled during app initialisation
*--store                // Vuex's store-related files
*--styles               // folder that contains global stylesheet files
*--App.vue              // main app component file
*--main.js              // initialisation file
```

First interesting entry from this list is `/components`. I tend to start from adding there `/layout` and `/generic` folders inside.

The `layout` folder keeps all items that appear (almost) everywhere across the app e.g. nav menu, side bar, footer etc. The other one contains reusable components that I use across the app (e.g. input groups, tables, forms, popups, alerts, you name it).

Besides these folders I tend to group all components with the same business logic / router view per folder. So for example if we want to develop a CRUD view for users, then we're going to create a `user` folder with contents like this:

```
*--UsersTable.vue
*--UsersTableEntry.vue
*--UsersTableConfirmPopup.vue
*--UsersForm.vue
*--UsersComponent.vue
```

## Router folder

Next thing is the `/router` folder:

```
*--bundles
*--modules
*--index.js
*--routerGuard.js
```

In the `/modules` folder, I keep routes with similar business logic, e.g. /users, /users/create, /users/:id/edit.

Sometimes, we want to have multiple-nesting routes, and that's where /bundles folder comes to the rescue. So if we want e.g. have various routes under `/settings` route such as /settings/profile, /settings/plan or `/settings/payments` we're gonna merge route sets from the `/modules` folder here, and create proper webpack chunks from it (so the initial app load time will be much faster).

## Setup folder

If you're curious what's inside `/setup` folder, the answer is simple - I tend to setup there (in separate files) initial user authorisation mechanism or checking the user language and injecting proper translation file on initial load (i18n).

## Store folder

The last but not least folder is the `/store`. I keep there an almost stupid simple structure:

```
*--modules
*--constants.js
*--index.js
```

I really like Vuex concept. And I like even more, when it's handled with store modules. So I tend to keep my store modules in appropriate folder, across many files, split again by business logic.  In `constants.js` file, I keep all my (safe) constant variables and enumerable sets, so I can import it when necessary in the app (or bind it as a global Vue's variable).

## Summary

I hope you have enjoyed this article - I'm really curious what do you think about it and what you might think be upgraded there. It really works me well for medium and big size projects, but I'm always open for the improvements.

Or maybe you use totally different project architecture? Please let me know!

-- ł.

> This post is a part of my Vue.js tips & tricks article series, based on personal experience while working on real-life projects.
