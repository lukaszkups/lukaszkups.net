---
title: Tavuelo 0.12.6 release notes
date: 2020/08/17
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

That was a quick one! Because of making a silly mistake with version 0.12.5, I had to republish package with bumped version, so 0.12.4 -> 0.12.6 is the official update path.

New version includes:

- Removed unnecesary files so the bundle size has been reduced (from 1.47MB to 459kB unpacked! (25.26 KiB Gzipped))

- Library build contains now only UMD-MIN option - tavuelo in CommonJS version has been discontinued (but you can build it from source - just remove `--formats umd-min` part from `build-bundle` command that's inside `package.json`)

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)
