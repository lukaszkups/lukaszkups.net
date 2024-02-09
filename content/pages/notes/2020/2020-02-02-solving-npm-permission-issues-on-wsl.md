---
title: Solving npm permission issues on WSL
date: 2020/02/02
category: tech
tags: tech, npm, wsl, windows, node, javascript, visual studio code, js, node.js, windows subsystem for linux, linux, win10, windows 10, visual studio
active: 2
---

> [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) is a compatibility layer for running Linux binary executables natively on Windows 10 and Windows Server 2019.

Thanks to this tool, I am happy Windows 10 user since the very beginning of 2019.

So far my experience working with it was painless (after learning some new workflow concepts during initial configuration but that's something for another note 😉).

Recently, I have started having issue by getting `EACCESS` errors when I was installing any new package via [npm](https://www.npmjs.com). It was happening only if I ran some npm command earlier (e.g. `npm run dev` or something).

It is caused by file watcher implementation of VSCode.

## Solution

There are 2 ways to solve this issue - restart your Visual Studio Code editor (😒) or find in your IDE preferences an option:

```
remote.WSL.fileWatcher.polling
```

and set its value to `true`.

And that's it! You're welcome 👨‍🏫.

If you're working on large workspace, you might also want to increase the polling interval config option (`remote.WSL.fileWatcher.pollingInterval`) and also exclude some folders that doesn't need to be watched (`files.watcherExclude` config option).

If you're an active Windows Insider member you can also install WSL 2 which doesn't have this problem at all.

*I've found this solution [here](https://code.visualstudio.com/docs/remote/wsl#_i-see-eaccess-permission-denied-error-trying-to-rename-a-folder-in-the-open-workspace)*.

-- ł.
