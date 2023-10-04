---
title: Tavuelo 0.12.2 release notes
date: 2020/04/27
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

This release contains fixes for a feature introduced in previous version - selecting rows (single, whole page, all in table).

I have noticed that when table row selection change, a pagination will always reset to the first page - now the table will keep (set on the `.$nextTick`) the currently active page.

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)
