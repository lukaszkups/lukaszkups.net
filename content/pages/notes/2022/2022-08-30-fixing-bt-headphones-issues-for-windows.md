---
title: Fixing Bluetooth Headphone issues on Windows 10 and 11
date: 2022/08/30
category: windows, sysops, hardware, software
tags: windows, windows11, windows10, win11, win10, windows 10, windows 11, bluetooth, headphones, edifier, edifier x2
active: 2
---

# Problem's Background

In the last year I've switched laptop twice - first to MSI GS66 and now I work on ASUS Zenbook 14 OLED model.

During that time I've also started using bluetooth wireless headphones - Edifier X2 to be exact.

It was working flawlessly, besides the times when it doesn't.

Most often scenario it was when I was moving pointer over the video timeline on youtube or switching between audio sources (e.g. Firefox and Spotify app) - all of the sudden it was muting any sound in my BT headphones (my built-in speakers were playing it without any problems though).

# Failed fix attempts

I've googled and tried tons of solutions avaialble on the web.

From stopping/starting various Windows processes manually or via regedit or command line, to re-adding, disabling or enabling audio devices in the Control Panel.

Nothing really worked.

# Successful kind-of solutions

Best working solution was to simply restart the computer. But this bug was happening multiple times per day so it was super annoying to do it while trying to work.

The other "weirdest working solution I've seen in my life" was to open Sound Card properties in Control Panel, and click on "Recordings" tab.

Yes, simply clicking the tab was magically enabling sound in my headphones.

Yes, I'm not crazy and there's no typo. **RECORDINGS** tab.

This solution though had a flaw, as the sound was in really bad quality.

I've asked for help in multiple Microsoft/Windows support channels, but every suggestion was a duplicate of the existing one I've already found online.

# One solution to rule them all

Suddenly, it hit me.

Of course I've tried to check if Windows will find any driver/software updates available for any device, but I've decided to double check specifically on Intel's website for the latest Bluetooth Audio Drivers.

And of course there was a MINOR version update.

Since I've downloaded and installed it, I didn't experience this problem anymore - and I hope my solution will help you too.

Best,

-- ł.
