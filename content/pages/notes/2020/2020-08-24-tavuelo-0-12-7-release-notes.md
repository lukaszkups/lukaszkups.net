---
title: Tavuelo 0.12.7 release notes
date: 2020/08/24
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

I've started using Tavuelo in my other project recently and I've spotted a [bug](https://github.com/lukaszkups/tavuelo/issues/26).

Long story short: user was unable to activate sorting, until given column has been included in `searchColumns` prop - which is wrong, as that property is related to search feature, not sort one. New update contains a fix for this issue and has resolved vulnerable (depth level: 4) dependencies.

New version includes:

- Updated vulnerable dependency of `acorn` package

- Added new property: `sortColumns` - an array prop (default value: `[]`) - contains a list of column data sources, which should handle column sort functionality

- Added new propery: `sortAllColumns` - a boolean prop (default value: `false`) - toggle if all columns should handle sort functionality out of the box or not

- Updated README file

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)
