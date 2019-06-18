---
title: How to save time when defining computed properties
date: 2019/06/18
category: vue.js, programming, tech
tags: vue.js, vue, js, javascript, programming, development, front-end, front-end developer, front-end development, architecture, spa, single page apps, single page application, web development, vuex
active: 2
---

> Hi again! I'm alive and so this blog as well - just not spending so much time after work on it as I would like to - but will try my best from now!

When you want to define read-only computed property that is purely based on vuex, you write something like this:

```
computed: {
  myComputedProperty () {
    return this.$store.state.myFancyModule.myFancyPropertyFromStore
  }
}
```

Usually, when I create new vuex module, the first thing I add is `updateProp` action and mutation:

```
const actions = {
  updateProp ({commit}, payload) {
    commit('updateProp', payload)
  }
}

const mutations = {
  updateProp (state, payload) {
    state[payload.propName] = payload.newVal
  }
}
```

This way I have defined the very basic methods to manage values of my vuex module properties.

Based on this, you can now define a computed property with getter and setter like:

```
computed: {
  myComputedProperty: {
    get () {
      return this.$store.state.myFancyModule.myFancyPropertyFromStore
    },
    set (newVal) {
      this.$store.dispatch('myFancyModule/updateProp', {propName: 'myFancyPropertyFromStore', newVal: newVal})
    }
  }
}
```

But this might take too much time and space to write again and again, for multiple properties per component right?

Lets create a helper method then!

```
export const computedValueHelper = (vuexModuleName, vuexPropertyName) => {
  return {
    get () {
      return this.$store.state[vuexModuleName][vuexPropertyName]
    },
    set (newVal) {
      this.$store.dispatch(`${vuexModuleName}/updateProp`, {propName: vuexPropertyName, newVal: newVal})
    }
  }
}
```

Now, we can import it directly to our component and define computed properties (with getter and setter already) like this:

```
import { computedValueHelper } from '@/helpers/globalHelpers'

export default {
  name: 'MyFancyComponent',
  computed: {
    myFancyLocalComputedProp: computedValueHelper('myFancyModule', 'myFancyPropertyFromStore')
  }
}
```

Voila! You can now quickly & easily define your computed properties like a boss :)

If you're working on legacy codebase that have already defined multiple various store methods to update properties in every module, you can enhance helper method e.g. like this:

```
export const computedValueHelper = (vuexModuleName, vuexPropertyName, vuexUpdatePropMethodName, vuexNewPropPropName, vuexNewValPropName) => {
  return {
    get () {
      return this.$store.state[vuexModuleName][vuexPropertyName]
    },
    set (newVal) {
      let updatePayload = {}
      updatePayload[vuexNewPropPropName || 'propName'] = vuexPropertyName
      updatePayload[vuexNewValPropName || 'newVal'] = newVal
      this.$store.dispatch(`${vuexModuleName}/${vuexUpdatePropMethodName || 'updateProp'}`, updatePayload)
    }
  }
}
```

This one might look a bit weird, but then you can use it to your unusual modules as well:

```
computed: {
  myFancyLocalComputedProp: computedValueHelper('myFancyModule', 'myFancyPropertyFromStore'), // thanks to values fallback, you don't need to add additional props if your updateProp method looks like mine!
  otherFancyComputedProp: computedValueHelper('bModule', 'otherFancyProp', 'updateBModulePropName', 'bModulePropName', 'newValue')
}
```

Based on second computed property, you can assume that I have defined in my `bModule` vuex module an update action and mutation that looks like this:

```
const actions = {
  updateBModulePropName ({commit}, payload) {
    commit('updateBModulePropName', payload)
  }
}

const mutations = {
  updateBModulePropName (state, payload) {
    state[payload.bModulePropName] = payload.newValue
  }
}
```

<a href="https://codesandbox.io/s/86tqt" target="_blank">Here</a> you can see this in action - I hope you'll find it handy in your projects!

-- ł.
