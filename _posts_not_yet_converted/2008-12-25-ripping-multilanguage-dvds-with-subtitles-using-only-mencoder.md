---
author: martin.ankerl@gmail.com
comments: true
date: 2008-12-25 22:06:11+00:00
layout: post
slug: ripping-multilanguage-dvds-with-subtitles-using-only-mencoder
title: Ripping Multilanguage DVDs with Subtitles using Mencoder
wordpress_id: 185
categories:
- linux
---

Yesterday at Christmas I got the [Akira Kurosawa](http://en.wikipedia.org/wiki/Akira_Kurosawa) Samurai Edition, which is a 7 disc DVD set of his awesome movies. I am converting it into the best quality files currently possible: MKV as the container, x264 codec for the video, dual audio, and with subtitles. This is short Howto so that I won't forget how :-)
<!-- more -->




  1. Create a file ~/.mplayer/mencoder.conf with default compression settings. I use this, with encoding quality settings I have from [mplayer's x264 examples](http://www.mplayerhq.hu/DOCS/HTML/en/menc-feat-x264.html#menc-feat-x264-example-settings):

    
    o=out.avi
    ovc=x264=yes
    oac=mp3lame=yes
    
    #lameopts=preset=medium
    lameopts=aq=2:vbr=4
    #lameopts=preset=voice
    
    # the lower crf, the better
    # 20: very good
    # 22: Medium Quality DVD rips
    # 23: quite ok
    # 25: so-so
    # 30: acceptable
    # 40: my eyes hurt
    # 50: my eyes bleed
    x264encopts=threads=auto:crf=20:subq=7:partitions=all:8x8dct:me=umh:frameref=5:bframes=3:b_pyramid:weight_b
    
    # deinterlace
    # vf=yadif
    
    # slight denoise
    # vf=hqdn3d=3:2:3:3
    
    # turbo encoding (low quality!)
    #x264encopts=threads=auto:crf=23:turbo=2:subq=1:frameref=1




  2. I use constant quality setting. The advantage is that it requires only one pass, and you get, well, constant quality :-) In the config file find the crf=20 section and change it to your desire.


  3. Find out which DVD chapter you want to rip, starting with 1 up (e.g. mplayer dvd://1).





  4. If the DVD has black borders, find out their sizes with 
    
    mplayer dvd://2 -vf cropdetect

Fast forward a bit into the movie so that the ratio can be trusted.
**WARNING** Some DVDs like Natural Born Killers are shot with multiple different films, so the border changes! Take care not to crop anything important away. Copy the -crop printouts into the clipboard.


  5. Open another console window, run mplayer dvd://2 -identify, and quit. Now scroll up, there is some important information about the tracks which you need in the next step. I have extraced the important information here:

    
    ID_AUDIO_ID=128
    ID_AID_128_LANG=de
    ...
    ID_AUDIO_ID=129
    ID_AID_129_LANG=ja
    ...
    subtitle ( sid ): 0 language: de
    ...
    subtitle ( sid ): 1 language: de



So there is audio language de and ja, and 2 subtitles for de. Mplayer the DVD and press J to find out which subtitles you want to have. (mplayer shows the ID, like (0) de).


  6. I have chosen AID 129 and sid 1. In the other window, start ripping the movie:

    
    mencoder dvd://2 -vf crop=704:432:0:72 -aid 129 -o Yojimbo.avi -vobsubout subs -vobsuboutindex 0 -sid 1


This will get you 3 files: Yojimbo.avi with Japanese audio and x264 encoded movie video, and subs.idx and subs.sub with the subtitles. Play the movie to check everything works as it should.


  7. Rip additional sound tracks now, if you want them. You can rip one additional subtitle at the same time. To do this, increase the vobsuboutindex by one, or choose another filename. I choose to rip the german audio and another subtitle track:

    
    mencoder dvd://2 -aid 128 -ovc frameno -o de.avi -vobsubout out -vobsuboutindex 0 -sid 1


The -ovc frameno part is important, because this skips video encoding. Encoding is much faster this way because we already have the video anyways.


  8. Merge everything together with mmg, this is a GUI interface for mkvmerge which you get via sudo apt-get install mkvtoolnix. Select the correct languages for the audio and subtitle tracks.


I think that's about it. This way you will get very high quality, multi language rips with subtitles. Oh, some other interesting points to note:


  * I _always_ encode with the same resolution as the source, no rescaling. Rescaling is very bad, I much prefer that quality is reduced by the codec and not preemptively through scaling down. Even a HDTV ripped to 700MB gets you a much better quality when not rescaled than a DVD ripped to 700MB. The x264 does an awesome job at preserving quality where it is important.

  * I only rip with variable bitrate VBR. It has very good quality, but it is not surround sound.

