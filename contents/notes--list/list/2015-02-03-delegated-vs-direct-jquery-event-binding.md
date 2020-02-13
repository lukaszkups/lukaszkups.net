---
title: Delegated vs direct jQuery event binding
date: 2015/05/03
category: programming
tags: javascript, jquery, js, webdev, webdevelopment, web development, front-end, front-end development, programming, event delegation, event binding
active: 2
---

# Delegated vs direct jQuery event binding

Today I would like to show the difference between two event binding methods (as a example I will take `.on()` method):

- direct:

```
$('div span').on('click', function(){
	console.log('clicked!');
});
```

- and delegated one:

```
$('div').on('click', 'span', function(){
	console.log('clicked!');
});
```

The difference in code is very subtle, but in functionality (spoiler alert) delegated version of the code is far more flexible and universal.

## Delgated vs direct === Dynamic vs static

Direct version of jQuery `.on()` method allows You to bind the event to actually added elements in the document.

On the other side, dynamic version of jQuery `on()` method allows You to bind events to all elements that will match the query - also those added dynamically (e.g. added by other jQuery methods).

So, if we have a HTML like this:

```
<ul id="exampleList">
	<li></li>
</ul>
```

..and we'll bind the events to `<li>` elements:

```
//first solution:
$('ul#exampleList li').on('click', function(){
	console.log('clicked!');
});

//second solution:
$('ul#exampleList').on('click', 'li', function(){
	console.log('clicked!');
});
```

And then we're add dynamically couple new `<li>` elements:

```
for(var i=0; i<3; i++){
	$('ul#exampleList').append('<li></li>');
}
```

So we will have something like this:

```
<ul id="exampleList">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

Using first solution of event binding, the click event will work only for first `<li>` element - the one that existed before code execution.

The second solution provides event binding support for elements which exists during event binding code execution and those which will be dynamically added later.

So, if You want to work with dynamically loaded elements, use the second (*Delegated*) solution of event binding.

-- ł.
