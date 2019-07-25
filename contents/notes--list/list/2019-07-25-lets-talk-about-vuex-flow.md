---
title: Lets talk about Vuex flow
date: 2019/07/05
category: programming, vue.js, tech
tags: programming, webdev, vue.js, vuex, javascript, js, development, webdev, front-end
active: 2
---

DISCLAIMER: In this article I don't want to introduce you how Vuex works (as it's already written at [Vuex's official website](https://vuex.vuejs.org/))

Instead, I would like to discuss about different approaches I've found people use when working with this library.

## What is Vuex?

Just as a quick reminder, quoting the official website:

> Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

If you haven't ever worked with it, this article then won't be really interesting for you ;)

## Ok, but what about this *flow* thing?

So, I've found that different people handles vuex coding style *flow* differently. Long story short:

1. This is the flow I personally use - always dispatch actions and use generic mutation to change the state:

- Using Vuex modules to separate component's logic. So there are modules like `user`, `auth`, `contacts`, `editor`, `comments` etc. (but it's up to you if you want to have it - I personally do, even in the smalles projects out there)

- I define in every module the `updateProp` action which dispatches mutation that has the same name. It takes 2 arguments: `propName` and `newValue`. The reason for this is that I don't trigger/commit mutations directly - I always use `updateProp` action that commits the final mutation of the chosen property - very often each vuex module have only one generic mutation definition.

Example:

```
// user.js vuex module inside store/modules folder
// ...
// actions definitions
updateProp ({ commit }, payload) {
  commit(updateProp, payload)
},
// method that saves props returned from GET request in the store
updateUserProfile ({ dispatch }, payload) {
  dispatch('updateProp, { propName: 'firstName', newVal: payload.first_name })
  dispatch('updateProp, { propName: 'lastName', newVal: payload.last_name })
  dispatch('updateProp, { propName: 'age', newVal: payload.age })
}
// ...
// mutation definition
updateProp (state, payload) {
  state[payload.propName] = payload.newValue
}
```

2. Dispatching actions only when commiting multiple mutations flow:

- Used in module-based vuex architecture or not - depends on the project I've found.

- Using actions only if there's need of commiting multiple mutations at once (to reduce code lines in the component's code).

- Commits mutations directly from component's code if only single property needs to be updated.

Example:

```
// user.js vuex module inside store/modules folder
// ...
// action definition
updateUserProfile ({ commit, state }, payload) {
  commit('updateNames', { firstName: payload.first_name', lastName: payload.last_name })
  commit('updateAge, payload.age)
  commit('updateAvatar, payload.avatar_url)
}
// but then also in component's code:
// ...
data () {
  return {
    localAge: 34
  }
},
// ...
methods: {
  updateAge () {
    // can commit mutation directly from component's code
    this.$store.commit('user/updateAge', this.localAge)
  }
}
```

3. Using actions only for async stuff flow:

- Like in #2, it randomly vary if it uses vuex modules or not - depends mostly on project size

- Commits mutations directly from component's code.

- Use actions only for asynchronous tasks (e.g. fetching data from API).

4. Always use actions, but they can commit multiple mutations inside:

- Same as in #2 and #3 regarding vuex modules usage or not.

- Component's logic always dispatches actions, but they freely commits as many mutations as they want.

Example:

```
// user.js vuex module inside store/modules folder
// ...
// actions definitions
updateUserProfile ({ commit }, payload) {
  commit('updateNames', { firstName: payload.first_name', lastName: payload.last_name })
  commit('updateAge, payload.age)
  commit('updateAvatar, payload.avatar_url)
},
updateAge ({ commit }, payload) {
  commit('updateAge, payload.age)
}
// but then also in component's code:
// ...
data () {
  return {
    localAge: 34
  }
},
// ...
methods: {
  updateAge () {
    // from components, we always dispatch actions in this flow
    this.$store.dispatch('user/updateAge', this.localAge)
  }
}
```

5. Using dedicated mutations and actions:

- Same as in #2, #3 and #3 regarding vuex modules usage or not.

- Using dedicated mutations for any kind of value change. Very often it makes vuex files pretty big.

Example:

```
// user.js vuex module inside store/modules folder
// ...
// actions definitions
updateUserProfile ({ dispatch }, payload) {
  dispatch('updateFirstName, payload.first_name)
  dispatch('updatelastName, payload.last_name)
  dispatch('updateAge, payload.age)
},
updateFirstName ({ commit }, payload) {
  commit('updateFirstName, payload.age)
},
updateFirstName ({ commit }, payload) {
  commit('updateFirstName, payload.age)
},
updateAge ({ commit }, payload) {
  commit('updateAge, payload.age)
}
// ...
// mutations definitions
updateFirstName (state, payload) {
  state.firstName = payload
},
updateLastName (state, payload) {
  state.lastName = payload
},
updateAge (state, payload) {
  state.age = payload
},
```

6. Non-unified flow:

- Again, same as in #2, #3, #4 & #5 regarding vuex modules usage or not.

- There's clearly no pattern - sometimes action code dispatches mutations, sometimes mutations are commited directly from component's code.

## Summary

As you can see there's an easy way to spot the differencies. To be honest, I'm not sure if there's one, true *the Vue way* of handling this (if you do, please let me know! :) ). I've just found the #1 one as the most consistent of handling data flow in the app (but at the same time I'm not sure if it's not an amount-of-updateProp-actions-dispatch-overkill - what do you think?)

Btw. If you know/met different Vuex *flows* - please let me know :)

-- ł.
