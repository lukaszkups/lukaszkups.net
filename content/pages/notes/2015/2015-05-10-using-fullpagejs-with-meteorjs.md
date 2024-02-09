---
title: Using Fullpage.js with Meteor.js
date: 2015/05/10
category: programming
tags: meteor, meteor.js, node, node.js, js, javascript, fullpage, fullpage.js, front-end, back-end
active: 2
---

If You ever wanted to make a website with full screen resolution sizes, You can use a [fullpage.js](https://alvarotrigo.com/fullPage/) plugin (it has even own [atmosphere](https://atmospherejs.com/lawshe/full-page) package).

## Installation

We will install `fullpage.js` as a Meteor.js package directly from atmosphere:

```
meteor add add lawshe:full-page
```

Now we have to prepare our templates for `fullpage.js` usage. Basing on documentation our template should have similar structure to this:

```
<div id="fullpage">
    <div class="section"><!-- place your section content here --></div>
    <div class="section"><!-- place your section content here --></div>
    <div class="section"><!-- place your section content here --></div>
    <div class="section"><!-- place your section content here --></div>
</div>
```

## Initialization

At this moment, our project should have `fullpage.js` installed, so we can initialize it on the desired view:

```
Template.yourTemplateName.rendered = function() {
    $('#fullpage').fullpage({
        verticalCentered: false,
        crollOverflow: false
    });
}
```

And that's it - our webpage should have `fullpage.js` functionality!

## Problems

If we want to have `fullpage.js` initialized at multiple views, then we can encounter a problem.

`Fullpage.js` will initialize multiple times when user leave one page with `fullpage.js` initialized and enter another with same functionality. As a result, page will "jump" on scroll in different directions or through multiple sections at once.

To fix that, we simply should add code below to our `/lib/router.js` file:

```
Router.onBeforeAction(function(){
    $.fn.fullpage.destroy();
});
```

It will destroy existing `fullpage.js` instance, so new one will work properly :) Enjoy!

-- ł.