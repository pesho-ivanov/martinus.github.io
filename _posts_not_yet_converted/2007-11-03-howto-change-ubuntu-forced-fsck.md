---
author: martin.ankerl@gmail.com
comments: true
date: 2007-11-03 00:28:01+00:00
layout: post
link: http://martin.ankerl.com/2007/11/03/howto-change-ubuntu-forced-fsck/
slug: howto-change-ubuntu-forced-fsck
title: Howto Change Ubuntu Forced fsck
wordpress_id: 97
categories:
- linux
tags:
- boot speed
- fsck
- harddisk
- howto
- tune2fs
- ubuntu
---

In Ubuntu 7.10 the boot hard disk is checked every 20 boots. I have to boot my laptop quite often, so about once a week booting takes more than 10 minutes. This clearly sucks. Fortunately, there is an easy way to fix this. With tune2fs it is possible to change the interval from mount-times to timed interval:


    
    sudo tune2fs -c 0 -i 1m /dev/sda3



This disables maximum mount time for forced check, but instead uses timed check. Every month the harddisk is forced to get checked. I can live with that.
