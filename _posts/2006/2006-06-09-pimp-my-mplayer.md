---
author: martin.ankerl@gmail.com
comments: true
date: 2006-06-09 22:16:01+00:00
layout: post
slug: pimp-my-mplayer
title: Pimp My MPlayer
wordpress_id: 60
categories:
- linux
---

[MPlayer](http://http://www2.mplayerhq.hu/) is my media player of choice. It is available [for Windows](http://oss.netfarm.it/mplayer-win32.php) and [Linux](http://www.mplayerhq.hu/homepage/design7/dload.html), and plays most about [every file format](http://www.mplayerhq.hu/homepage/design7/info.html) in a completely borderless window (a feature I miss in [vlc](http://www.videolan.org/vlc/), [totem](http://www.gnome.org/projects/totem/), [kmplayer](http://kmplayer.kde.org/) etc.). Here you can find useful configurations to maximise your viewing pleasure:

## Prevent Skipping


If your system is under heavy load mplayer might not be so smooth. If you notice this error message in your console:
 
```
Linux RTC init error in ioctl (rtc_irqp_set 1024): Permission denied
Try adding "echo 1024 > /proc/sys/dev/rtc/max-user-freq" to your system startup scripts.
```

You can either execute `sudo echo 1024 > /proc/sys/dev/rtc/max-user-freq`, or for a permanent setting edit `/etc/sysctl.conf` and append this line:

    
```
dev.rtc.max-user-freq=1024
```

now execute `sudo sysctl -p` or reboot and enjoy your improved playback.


## Smooth Streaming

If your playback from webstreams, DVD or CD-ROM skips, you can try to increase the buffer size. Add these settings to your `~/.mplayer/config`:

```
cache=8192
cache-min=4
```

Which means that you will have a buffer of 8MB, which should be large enough for most about all media. The second setting, cache-min=4 means that playback begins when 4% of the 8MB (~330kB) are already buffered. So your playback starts pretty early, but still builds up a large buffer while playing so that later download interruptions are not noticed.

## Video Output

add `vo=xv` to your `~/.mplayer/config`. This is the fastest solution. If your graphic card driver does not support this, you might want to give `vo=gl2` a try.


## Aspect for Widescreen Notebooks


If you have a 1280x800, 1440x900 or other 16:10 resolution notebook, edit `~/.mplayer/config` and add the line `monitoraspect=16:10` for correct playback ratio.


## Volume too silent / too loud


Some movies have a very silent volume. Add the setting `af=volnorm` to your `~/.mplayer/config` to automatically maximize the volume without disorting the sound.

Be aware that when you use this setting, you will most likely get bad results when you use mplayer to extract the audio into a wav file.



## Subtitle Fonts


To use _Bitstream Vera Sans_ as the playback font, copy
`/usr/share/fonts/truetype/ttf-bitstream-vera/Vera.ttf` to `~/.mplayer/subfont.ttf`. If it is not there try to find it via locate `Vera.ttf` and install it if unavailable. Other good fonts are `trebuchet.ttf`, `tahoma.ttf`, or `comic.ttf` for e.g. anime.

## Subtitle Size


If your subtitles are too big / too small, try the setting `subfont-text-scale=3` in your config. You might want to play with the scale ratio for your maximum viewing pleasure.



## Borderless Playback


This depends on your window manager. I use KDE, and to get a borderless window do this:

  1. Start KControl
  2. go to _Desktop_ > _Window-Specific Settings_
  3. Click _new_
  4. Play something with mplayer
  5. Click _Detect_ and click on an open mplayer window, select _Use window class (whole application)_ and click OK
  6. Geometry tab
     * [x] Desktop, Apply Initially, All Desktops
  7. Preferences tab
     * [x] Keep above, Apply Initially, [x]
     * [x] No border, Force, [x]

You can move the window with , resize it with Alt+right mouse (just like all other KDE windows). Enjoy the new slick look!

## Hotkeys

These are the most important hotkeys for daily use:

  * **f** - Toggles fullscreen
  * **q**, **ESC** - Quit mplayer
  * **j** - Switch through subtitles
  * **space**, **p** - Pause
  * **Alt+left mouse** - Move window (KDE specific)
  * **Alt+right mouse** - Resize window (KDE specific)

For moving around:

  * **right** - 10 seconds forward
  * **left** - 10 seconds backward
  * **up** - 1 minute forward
  * **down** - 1 minute backward
  * **PgUp** - 10 minute forward
  * **PgDown** - 10 minute backward
