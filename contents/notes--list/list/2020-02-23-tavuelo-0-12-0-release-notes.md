---
title: Tavuelo 0.12.0 release notes
date: 2020/02/23
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

This release introduces new feature related to row selection. You can now enable selecting entries by simply setting `selectableRows` prop to `true`. Tavuelo will automatically append new column for each row with checkbox input. To read value you can pass an array variable through `selectedRows.sync` prop.

In addition, you can also enable selecting all entries button (via `selectAllRowsButton` boolean prop) and/or button to select all entries on current page (via `selectRowsOnPageButton` boolean prop).

As always, readme file that contains API guide / documentation has been updated as well. You can check it [here](https://www.npmjs.com/package/tavuelo).

# Road to 1.0.0

I'm proud to announce, that next release version will be an official release candidate - there won't be any API changes between 0.13.x and 1.0.0 - only removing unnecessary dependencies and demo code that can be run independently on localhost at the moment.

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)
