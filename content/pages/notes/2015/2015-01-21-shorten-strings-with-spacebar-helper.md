---
title: Shorten strings with spacebar helper
date: 2015/01/21
category: programming
tags: javascript, js, meteor.js, meteor, meteorjs, spacebar, haml, helper, string, substr, webdev, webdevelopment, web development, node, node.js, nodejs
active: 2
---

# Shorten Your title/name/link(You name it!) strings with spacebar helper

If You're building some lists view (e.g. posts list) and You want to shorten their names You can achieve that using this UI helper:

```
UI.registerHelper('shortIt', function(stringToShorten, maxCharsAmount){
	var shorter = stringToShorten.substr(0, maxCharsAmount);

	shorter = shorter.substr(0, Math.min(shorter.length, shorter.lastIndexOf(' '))) + '...';
	return shorter;
});
```

It will cut the string to the (whole) word placed after last space character.

Usage:

```
{{#each PostList}}
	{{shortIt this.title 15}}
{{/each}}
```

And that's it! Enjoy!

-- ł.
