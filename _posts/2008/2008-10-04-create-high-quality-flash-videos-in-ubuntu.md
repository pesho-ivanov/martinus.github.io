---
author: martin.ankerl@gmail.com
comments: true
date: 2008-10-04 18:40:59+00:00
layout: post
slug: create-high-quality-flash-videos-in-ubuntu
title: Create High Quality Flash Videos in Ubuntu
wordpress_id: 178
categories:
- fun
---

I recently got a nice new camera that can shoot HDTV videos, and the only way to show off the awesome quality to the world is by creating flash videos by myself. Unfortunately I have lost the example, so you have to trust me. on this. I only have the screenshot left:

![screenshot](/img/2008/10/p1000369.jpg)

I use Ubuntu, so this tutorial won't work on Windows. I have encoded the video into the [H.264](http://en.wikipedia.org/wiki/H.264) format, left the original resolution at 848 x 480, and the [framerate](http://en.wikipedia.org/wiki/Frame_rate) at 30 Hz. I use <em>constant quality</em> setting because then the video look very good even when the camera moves quickly, and it uses less bitrate when not needed. The disadvantage is that the required bitrate is uneven, so make sure youre buffer is large enough before you start playing.

Here is how to do this:

1. Encode your video with [mencoder](http://www.mplayerhq.hu/design7/news.html) ([click to install](apt:mencoder)). It has to be x264 for video (0 or 1 bframes), and faac for audio.
1. Convert the result into an mp4 using mp4creator ([click to install](apt:mpeg4ip-server)), as described [here](http://www.mplayerhq.hu/DOCS/HTML/en/menc-feat-quicktime-7.html).
1. Now you have an mp4 file that can be played with [JW player](http://www.jeroenwijering.com/). Download it, have a look at the readme.html, and follow the example described there.
1. The player requires 20 pixels in height, so add this to the SWFObject creation.

I have written a small ruby script to convert any movie to a MP4 file. The first parameter is the input file, second parameter is the framerate. Save this file as e.g. `convert2mp4.rb`.

```ruby
#!/usr/bin/ruby

# constant quality setting
if ARGV.size != 3
	puts "usage: #{__FILE__} <inputvideo> <framerate> <quality, 1.0-50.0>"
	exit
end

# set output filenames
input = ARGV[0]
rate = ARGV[1]
quality = ARGV[2]
noext = input.gsub(/\.\w*$/, "")

converted = '"' + noext + '_tmp.avi"'
aac = '"' + noext + '.aac"'
h264 = '"' + noext + '.h264"'
mp4 = '"' + noext + '.mp4"'

# encode
cmd = "mencoder \"#{input}\" -o #{converted}"
cmd += " -ovc x264 -x264encopts threads=auto:crf=#{quality}:subq=6:partitions=all:8x8dct:me=umh:frameref=5:bframes=1:b_pyramid:weight_b"
cmd += " -oac faac -faacopts br=192 -channels 2 -srate 48000"
puts cmd
system(cmd)

# convert to mp4
system("rm -f #{mp4}")
system("mplayer #{converted} -dumpaudio -dumpfile #{aac}")
system("mplayer #{converted} -dumpvideo -dumpfile #{h264}")
system("mp4creator -create=#{aac} #{mp4}")
system("mp4creator -create=#{h264} -rate #{rate} #{mp4}")
system("mp4creator -hint=1 #{mp4}")
system("mp4creator -hint=2 #{mp4}")
system("mp4creator -optimize #{mp4}")
system("rm -f #{aac} #{h264} #{converted}")</pre>
```

Have fun!