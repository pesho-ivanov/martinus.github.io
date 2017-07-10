---
author: martin.ankerl@gmail.com
comments: true
date: 2008-08-30 08:15:12+00:00
layout: post
slug: actioncam-damberg-kriterium
title: ActionCam Damberg Kriterium
wordpress_id: 158
categories:
- fun
tags:
- bike
- cycling
- profactor
---

On 29th August, we went on a cool mountain biking trip around the Damberg. Here is a map of the famous  [Damberg Kriterium](http://www.bikemap.net/route/58073). It is about 43 km, and 850 meters in altitude (bikemap overestimates 1040m). It was a fun trip, thanks for [Jürgen](http://www.youtube.com/user/iron717) (who was _NOT_ the organizer) for organizing this! Here is the route:

I got a brand new [Panasonic Lumix DMC-TZ5](http://www.dpreview.com/reviews/panasonictz5/), which is an absolutely excellent compact camera. It can record HDTV 16:9 videos, so I did what obviously everybody should do: mount it on a cycling helmet. The construction seems adventurous: I use the camera's, one cut-off mini tripod, one rubber band, my cycling helmet,  the camera's wristband as a safety backup, and a healthy dose of good faith. That's it! The whole construct may look a bit fragile, but simplicity is the key; it is actually very sturdy, because of the simple design there is almost nothing that can go wrong. The camera position is excellent too. Jürgen has made a really cool remix of the videos:




  
Bike route [58073](http://www.bikemap.net/route/58073) - powered by [Bikemap](http://www.bikemap.net)




If you want the the videos in all their length and glory, I have encoded the clips with very high quality for your maximum viewing pleasure. You need a fast computer, an [up-to-date flash](http://www.adobe.com/products/flashplayer/) player, and a fast internet connection (press play and then pause to start caching the whole clip if the connection is too slow.).

<!-- more -->



## On the Damberg


Recorded at 15:29:57. Just riding uphill and discussions about how to best reach the top.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.


	
	





## Right Before the Dambergwarte


Recorded at 16:11:31. A few meters before the Dambergwarte. This is the only time you see us standing around!



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.








## Speeding Past the Dambergwarte


Recorded at 16:13:11. Alex in the front, me right behind him. The track is fast, but partly muddy and bumpy. I almost hit a tree at 1:25, Alex looses his precious chocolate bar at 2:20.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.








## Downhill to the Hertlerwiese


Recorded at 16:24:36. Following right behind Juu, carrying over a tree, down through the narrow forrest onto the beautiful Hertlerwiese. Amazing how Harald survived this with the citybike :-)




[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.








## Around the Schwarzberg


Recorded at 16:50:50. Gravel road round the Schwarzberg, going pretty fast.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.








## Challenging Downhill from Schwarzberg Peak


Recorded at 17:49:39. This was the most demanding downhill track. Narrow bushes, very steep, lots of roots that have already built steps. Christoph in front of me, going fast.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.









## From Wood to Grassland


Recorded at 18:00:18. A bumpy start, but on 1:38 we reach the grassland, which is really nice to drive. High speed! Christoph and me wait at 2:40 for the others.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.








## Bumpy Ride and Christoph's Not So Controlled Dismount


Recorded at 18:06:19. Ten seconds into the video Christoph decides to jump over the front of his bike, hehe :) The rest is somewhat difficult terrain, Juu in front of me after we cross the gravel road.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.









## Slipstream Speeding on Tared Road


Recorded at 18:13:03. Slipstream riding behind Christoph, Juu, Harald. They got surprised when I zipped by them at 1:55, so they gave everything they could and overtook me at 2:20. Watch out Harald at 2:25, hehe :) Speeding all the way down.



[Get the Flash Player](http://www.macromedia.com/go/getflashplayer) to see this player.






That's it. As you can see the head mounted camera was a huge success, the videos turned out to be really great. Its a bit shaky, but you can't seriously expect anything else from downhill tracks like this.



#### How did I create the flash clips?


I use Ubuntu, so this is a little linux tutorial and won't work on Windows.  The clipse are encoded into the [H.264](http://en.wikipedia.org/wiki/H.264) format, I left the original resolution at 848x480 and the [framerate](http://en.wikipedia.org/wiki/Frame_rate) at 30 Hz. I use constant quality because then the clips look very good even when the camera moves very quickly, and it uses less bitrate when not needed. The disadvantage is that the bitrate can vary a lot, so make sure to cache a bit before you start playing.




  1. Encode the movies with [mencoder](http://www.mplayerhq.hu/design7/news.html) ([click to install](apt:mencoder)). It has to be x264 for video (0 or 1 bframes), and faac for audio.

  2. Convert the result into an mp4 using mp4creator ([click to install](apt:mpeg4ip-server)), as described [here](http://www.mplayerhq.hu/DOCS/HTML/en/menc-feat-quicktime-7.html).

  3. Now you have an mp4 file that can be played with [JW player](http://www.jeroenwijering.com/). Download it, have a look at the readme.html, and follow the example described there.

  4. The player requires 20 pixels in height, so add this to the SWFObject creation.


I have written a small ruby script to convert any movie to a MP4 file. The first parameter is the input file, second parameter is the framerate. Save this file as e.g. convert2mp4.rb.


    
    #!/usr/bin/ruby
    
    # constant quality setting
    quality = 30
    
    if ARGV.size != 2
    	puts "usage: #{__FILE__} <inputvideo> <framerate>"
    	exit
    end
    
    # set output filenames
    input = ARGV[0]
    rate = ARGV[1]
    noext = input.gsub(/\.\w*$/, "")
    
    converted = '"' + noext + '_tmp.avi"'
    aac = '"' + noext + '.aac"'
    h264 = '"' + noext + '.h264"'
    mp4 = '"' + noext + '.mp4"'
    
    # encode
    system("mencoder \"#{input}\" -o #{converted}
    -x264encopts threads=auto:crf=#{quality}:subq=6:partitions=all:8x8dct:me=umh:frameref=5:bframes=1:b_pyramid:weight_b
    -oac faac -faacopts br=192 -channels 2 -srate 48000")
    
    # convert to mp4
    system("rm -f #{mp4}")
    system("mplayer #{converted} -dumpaudio -dumpfile #{aac}")
    system("mplayer #{converted} -dumpvideo -dumpfile #{h264}")
    system("mp4creator -create=#{aac} #{mp4}")
    system("mp4creator -create=#{h264} -rate #{rate} #{mp4}")
    system("mp4creator -hint=1 #{mp4}")
    system("mp4creator -hint=2 #{mp4}")
    system("mp4creator -optimize #{mp4}")
    system("rm -f #{aac} #{h264} #{converted}")



Have fun!
