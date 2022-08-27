---
author: martin.ankerl@gmail.com
comments: true
date: 2009-11-15 11:57:37+00:00
layout: post
slug: how-to-download-any-flash-video-with-flashrip-in-ubuntu
title: 'How To: Download Any Flash Video with flashrip in Ubuntu'
wordpress_id: 218
categories:
- linux
- programming
---

Downloading flash videos in Linux was already [not too difficult](https://www.youtube.com/watch?v=vxBGr2T1Ueo), but thanks to [flashrip](/files/2009/11/flashrip.sh), it has gotten very easy. Here is a little demo how it works:

Once installed, you basically use one click to get a video preview and then a prompt with the filename to save the file. The script works by looking into the newest flash files in your `/tmp` folder, and creates a hardlink to the save destination. When the video has fully loaded, you can close the browser window. The temp file will get deleted, and the linked copy will remain.


## Installing flashrip

Download it [here](/files/2009/11/flashrip.sh), or install it like this. Open a terminal like gnome-terminal or konsole, and run these commands:

```bash    
wget https://martin.ankerl.com/files/2009/11/flashrip.sh
chmod 755 flashrip.sh
sudo mv flashrip.sh /usr/local/bin
```


Now all thats left to do is to create a link in your gnome panel for ease of use: Right click the gnome panel, "Add to panel...", choose "Custom Application Launcher...". Choose a proper name, and a command like this: 

```bash   
/usr/local/bin/flashrip.sh /home/manker/Videos
```

For the command, replace the second parameter with the default location where you want to save the ripped videos (you have to use the full path here!)

I have tested this in Ubuntu, but it should work on any linux where gnome is installed.

Have fun!
