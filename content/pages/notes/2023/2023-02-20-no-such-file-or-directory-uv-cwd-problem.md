---
title: Solving ENOENT No such file or directory issue, related to uv_cwd
date: 2023/03/04
category: programming, tech
tags: programming, webdev, front-end, web development, web developer, front-end developer, front-end development, javascript, js, command line, cmd, bash, node.js, node, nodejs, npm, monorepo
active: 2
---

# Random errors appears

I've been refactoring recently a pretty huge monorepository. By mistake I've removed one of the packages from my project's npm workspace, but when I've spotted my mistake, I've simply copy-pasted package folder from different branch. 

And that's when the problems started to pile up.

When I was trying to commit my changes, all of the sudden my command line started screaming about lacking of `vue-cli` dependency installed. Once resolved, it complained about lack of some dependencies for scss linter package. 

So after resolving all missing global packages (that **REALLY** came out of nowhere o_O) I've stuck with the following error (when trying to commit something and pre-commit hook with linting gets triggered):

```
Error: ENOENT: no such file or directory, uv_cwd
```

After googling a little bit, I've noticed various people had similar issue but with totally different packages - there was one thing that was interconnecting though - they've deleted/removed-and-then-recovered some files in their projects.

I've struggled with this for a while - nothing really helped, until I've tried the following - just force commited previously removed package in my workspace and then commited random file change, just to force re-run linters.

And that was it, all the magic.

I hope this *hack* will solve your issue as well.

Best,

-- ł.
