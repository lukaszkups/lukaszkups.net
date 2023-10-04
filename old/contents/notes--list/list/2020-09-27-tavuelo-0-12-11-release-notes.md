---
title: Tavuelo 0.12.11 release notes
date: 2020/09/27
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

Busy weekend! This version contains:

- first custom event - `page-update`. When current page (its data or page number triggered by pagination/sorting/filtering change) updates then it is being emitted and propagate updated details (`{page: <page-number>, data: <array-with-current-page-data>}` object).
- fix for filtering issue, that might reset current page prop too often than it is necessary

Due to my build/forgetting about updating docs/package publish mistakes I had to bump its version couple times (from `0.12.8` to `0.12.11`) - mistakes happen, and I hope I'll learn from them for the future releases.

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)
