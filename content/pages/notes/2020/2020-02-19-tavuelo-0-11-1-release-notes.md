---
title: Tavuelo 0.11.1 release notes
date: 2020/02/19
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

This release contains changes for pagination. I've decided to separate it from table template and created dedicated pagination component that is imported into tavuelo.

Added new property:

- `showAllPages` - a boolean prop (default value: `false`) - it controls how pagination is displayed. If set to `true`, it will display all available pages as clickable boxes:

![img](/static/tavuelo-pagination-2.png)

If you want to use default mode (`false`), it's gonna be displayed like this:

![img](/static/tavuelo-pagination-1.png)

The input field will switch active page automatically on blur event.

Besides development side, I have also created official logo for tavuelo:

<img src='/static/tavuelo-logo.svg' width='125' height='125' alt='Tavuelo logo'/>
*(yes, colors that I've used here are the same as in official Vue.js logo 😉)*

Readme file that contains API guide / documentation has been updated as well. You can check it [here](https://www.npmjs.com/package/tavuelo).

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)

-- ł.
