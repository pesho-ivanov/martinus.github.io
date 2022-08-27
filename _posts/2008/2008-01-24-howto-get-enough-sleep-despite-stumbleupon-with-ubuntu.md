---
author: martin.ankerl@gmail.com
comments: true
date: 2008-01-24 22:06:44+00:00
layout: post
slug: howto-get-enough-sleep-despite-stumbleupon-with-ubuntu
title: Howto Get Enough Sleep Despite StumbleUpon with Ubuntu
wordpress_id: 106
categories:
- linux
tags:
- cron
- getsomesleep
- howto
- lifehack
- linux
- ubuntu
bigimg: "/img/2008/01/stumbling-insomnia.jpg"
---

## What?

I am a long-term [StumbleUpon](http://www.stumbleupon.com/) user, which means that I don't get much sleep. Now, after [almost 4 years of stumbling](http://martinus.stumbleupon.com/public/), I have decided to get my life back. Well, at least some sleep!


## What does this do?

Every night when I have to work on the next day (Sunday night to Thursday night), at 23:25 my computer shows me this little warning message:

![go to bed warning](/img/2008/01/screenshot-warning.png)

After the 5 minutes have passed, the computer shuts itself automatically down.

I use this little trick with [Ubuntu](http://www.ubuntu.com/), but it should work anywhere where [Gnome](http://www.gnome.org/) is installed.


## How?

Thanks to the power of Linux, this is not difficult to do for yourself, and configure it however you want it to behave:


1. Open `/etc/crontab` with your favourite text editor (no need for `crontab -e` since this is the system wide crontab), e.g. 
   ```bash
   sudo gedit /etc/crontab
   ```

1. Add the following lines (replace `manker` with *your* username!)
   ```    
   25 23 * * 0-4   manker  /usr/bin/zenity --display :0 --warning --text="Shutdown in 5 minutes. Go to bed."
   25 23 * * 0-4   root    shutdown -h +5
   ```

1. The first part of both lines `25 23 * * 0-4` means that the commands are executed at 23:25, but only Sunday (day 0) to Thursday (day 4). Read `man 5 crontab` for a detailed description of that format.

1. The first command uses `zenity` to show a warning message. You have to execute this as the same user that you use for working, or you will not see the message, so change `manker` to your username (root does not work either).

1. The second command `shutdown -h +5` means that the computer will halt in 5 minutes.  This has to be run as *root*, and it also shows nice warning messages in all your open terminals so you can't really miss it.

1. Save the file, and stumble until it is 23:25.


Sweet dreams!
