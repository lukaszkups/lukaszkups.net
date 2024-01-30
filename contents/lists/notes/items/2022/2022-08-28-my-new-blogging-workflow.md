---
title: My new blogging workflow
date: 2022/08/28
category: webdev, programming, blog
tags: webdev, programming, blog, blogging
active: 2
---

I've recently moved my personal website from private FTP-based hosting into [github pages](https://pages.github.com/) solution.

I have now 2 dedicated repositories - one for uncompiled website and its contents and another one that contains final website.

As some of you might already know, for managing my website I'm using my very own static site generator - [Writteli](https://github.com/writteli/writteli).

When I run `compile` command, it creates new `output` folder, which contains whole website structure, ready to upload to the server. Until now I've been opening this folder via FTP app/interface (my favorite solution for this task was [FileZilla](https://filezilla-project.org/)) and I was simply copying everything into my main domain folder.

For several years, every year my hosting provider was increasing price for their services, even though I was basically using it only for hosting this static website.

This year after the price raise it become clear, that I'm paying way to much for what I need - so that I've decided to abandon that service and move to github pages.

[I've been using](https://lukaszkups.net/notes/using-nanoc-with-github-pages/) github pages in the past when I've started blogging, but was using [Nanoc static site generator](https://nanoc.app/).

At that time, I've been using a single repository to keep both raw project files and generated website, but on separate branches. It wasn't ideal but it was a decent solution for my needs.

I've recently learned about [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) which in my opinion is pretty neat. Instead of constantly switching branches I could simply enter the `output` folder and git will automatically switch its repository pointer target to github pages one.

With this simple command:

```
git submodule add -f <link-to-your-github-pages-repo> output
```

I've created a perfect solution for my needs.

My new workflow looks like this:

```
npm run compile
cd output
git commit -am '<commit-message>'
git push
```

And voila! After couple seconds, github will automatically populate my latest changes to my website 🙂

-- ł.
