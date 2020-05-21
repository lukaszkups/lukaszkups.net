---
title: Circular reference problem in Vue
date: 2020/05/21
category: programming
tags: programming, tech, development, webdev, vue, vue.js, javascript, js, web development, front-end, front-end development, front-end developer
active: 2
---

For the last couple days I've been working on a component that is meant to reuse itself if needed recursively. Everything was going smooth until I've met the case where it actually had an opportunity to do it. Unfortunately, I've got an error:

```
[Vue warn]: Unknown custom element: XYZ - did you register the component correctly? For recursive components, make sure to provide the "name" option.
```

I was confused. Why does it throw me such error if everything seems to work just fine, I've already registered the component's name, everything was looking just fine.

When I double-checked all the stuff I thought might relate to this error message, I've started blind guessing - change this or change that and see what happens. But nothing was preventing error from being thrown.

Until I've commented out the component's calling itself it its template.

I was then: OK, so this is really something related to component's recursion - but what's going on exacltly? I'm providing `name` option and all the other stuff.

Then, I've found out this nice piece of Vue documentation, [Handling edge cases](https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components):

> To explain what’s happening, let’s call our components A and B. The module system sees that it needs A, but first A needs B, but B needs A, but A needs B, etc. It’s stuck in a loop, not knowing how to fully resolve either component without first resolving the other.

And to solve that, you can wait until `beforeCreate` lifecycle with registering the component:

```
beforeCreate () {
  this.$options.components.XyzComponent = require('./XyzComponent.vue').default
}
```

but personally, I prefer another option, that's using Webpack's asynchronous import:

```
components: {
  XyzComponent: () => import('./XyzComponent.vue')
}
```

And voila! It should fix the case related to circular component references.

-- ł.
