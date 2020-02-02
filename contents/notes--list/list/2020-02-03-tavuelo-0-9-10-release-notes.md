---
title: Tavuelo 0.9.10 release notes
date: 2020/02/03
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

Added new properties:

- `downloadDataButton` - it's a boolean prop (default value: `false`) that toggles visibility of the button that enables download data that is currently sorted and filtered in table. Tt will be the exact copy of the data that is currently available in the table, so if any custom sorting or filtering is applied, it will be reflected in the downloaded file.

- `downloadDataFileType` - a string prop (available values: `json` (default) and `csv`). It determines what file format will be available to download.

Updated example components code, so you can easily check and customize table code with newly added properties.

Fixed versions of dependency packages that contained various vulnerabilitites (i.e. `serialize-javascript` version bump to `^2.1.1`).

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)

-- ł.
