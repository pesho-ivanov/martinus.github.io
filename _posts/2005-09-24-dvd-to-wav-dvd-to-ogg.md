---
author: martin.ankerl@gmail.com
comments: true
date: 2005-09-24 12:14:53+00:00
layout: post
link: http://martin.ankerl.com/2005/09/24/dvd-to-wav-dvd-to-ogg/
slug: dvd-to-wav-dvd-to-ogg
title: DVD to WAV, DVD to OGG
wordpress_id: 31
categories:
- programming
---

Converting the audio of a DVD into a WAV is a piece of cake, with the right tools and if one is willing to use the command line:

```bash
mplayer dvd://1 -vc null -vo null -ao pcm -quiet -mc 0 -ni
```
This is already pretty neat, but I usually want to convert backup the DVD’s audio into an Ogg Vorbis stream. This is possible without an intermediate wav file:

```sh
mkfifo pipe
mplayer dvd://1 -vc null -vo null -ao pcm:file=pipe -quiet -mc 0 -ni &
oggenc -o out.ogg - <pipe
vorbisgain out.ogg
rm pipe
```

Yet another example of the power of named pipes 😎