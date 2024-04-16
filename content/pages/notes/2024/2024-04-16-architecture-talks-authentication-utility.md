---
title: "Architecture talks: Authentication utility"
date: 2024/04/16
category: programming, architecture
tags: programming, js, javascript, ts, typescript, architecture, authentication
active: 2
---

So you are going to develop an application that will be used on various markets across the globe by thousands of users.

One of the first steps while building it is to create an utility that will enable you to authenticate those users and store information about their login session while they're using it.

While using existing open source solutions that are being built with [OAuth](https://en.wikipedia.org/wiki/OAuth) industry standard might be tempting, creating your very own custom implementation might be a better solution for you:

- it will be tailored precisely to your application's unique needs,
- you will have complete control over your codebase, so you won't be limited to modify any part of it if needed
- you will gain a better understanding of your own architecture and its authentication process, which improves confidence in the security of your system (which might be crucial for some industries that use very sensitive data such as e.g. finance, goverment or healthcare sectors)
- you will be able to reduce usage of external library dependencies and improve its (authentication utility) performance on the go 

Of course real world scenarios are not that perfect and decision of going custom might introduce some pain points, such as:

- **Costs** - building such utility takes some time and effort of preparing (API) documentation and user guides; Also, you will be the one that need to maintain it later
- **Risk of errors** - building your authentication utility increases the risk of introducing errors or vulnerabilities, especially if it's being built in a hurry and without proper care
