---
title: Using Nanoc with Github Pages
date: 2015/10/22
category: programming, blog
tags: github, git, static site, deployment, hosting, nanoc, static site generator, blog, blogging, blogger
active: 2
---

> This guide is based on the originally posted article at [Schmurfy's blog](http://schmurfy.github.io/2011/05/06/create_your_github_user_page_with_nanoc.html) - I've modified it for current github pages flow.

Let's get it started.

First, clone Your nanoc page repository to local disk and enter it:

```
git clone yourRepoCloneUrl
cd yourRepoFolder
```

Now, if You don't have `output` folder yet create it, then clone Your repo again into that directory:

```
mkdir output
git clone yourRepoCloneUrl output
```

Let's enter this folder and create isolated (orphan) branch, `gh-pages`:

```
cd output
git checkout --orphan gh-pages
```

Next we have to clean all the contents from our `output` folder's git track:

```
git rm -rf .
```

Now re-check if You are on `gh-pages` branch - there's possibility that You're now on detached state - if so then type:

```
git checkout gh-pages
```

To avoid problems in the future, remove the `master` branch binding from the `output` folder:

```
git branch -d master
```

Everything should be set here, so now enter the main project folder and try to compile it:

```
cd ..
nanoc aco
```

And that's it! Everything that is outside the output folder belongs to Your `master` branch (so You should push every change You want to keep.

If You want to publicize Your nanoc page, compile the project, enter the `output` folder (you should be switched automatically to `gh-pages` branch) then commit and push Your changes to Your `gh-pages` repo branch.

And that's it! If You ever need any help with nanoc and `gh-pages` - just let me know.

-- ł.