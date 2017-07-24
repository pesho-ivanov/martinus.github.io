---
author: martin.ankerl@gmail.com
comments: true
date: 2008-02-04 23:08:47+00:00
layout: post
slug: logical-volume-manager-cheatsheet
title: Logical Volume Manager Cheatsheet
wordpress_id: 119
categories:
- linux
tags:
- howto
- linux
- tutorial
- ubuntu
---

Today I got a new harddisk, so it was finally time for me to have an in depth look at [LVM](http://sources.redhat.com/lvm2/). I use it to combine two harddisks `/dev/sdg1` and `/dev/sdb1` into one volume group `ext_vg` which contains one big logical volume `/dev/ext_vg/ext`. In short, my 250GB and 500GB harddisks are used in one big 750GB ext3 mount point.

I followed the excellent [LVM Tutorial](http://www.linuxconfig.org/Linux_lvm_-_Logical_Volume_Manager), and was surprised how easy everything goes. Here is a short cheat sheet of the important commands (take care to exchange the partition/volume names if you use this):


## Installation

I use [Ubuntu](http://www.ubuntu.com/), so this is a piece of cake: 
    
```bash
sudo apt-get install lvm2
```

There is also [a GUI available](http://ubuntuforums.org/showthread.php?t=216117), but I found the command line tools are very easy to use so there is no real need. I wouldn't use [EVMS](https://wiki.ubuntu.com/Evms) as it is not supported in Ubuntu 7.10 and may cause problems

## Create a New Filesystem


First I create the physical volume on the partition `sdg1`, create a new volume group `ext_vg` that contains this physical volume, and create a new logical volume of size 450GB within the volume group. Finally create the filesystem (disabled reservation space, see [Get More Space Out of Your ext3 Partition](/2008/01/12/get-more-space-out-of-your-ext3-partition/)). 

```bash
sudo pvcreate /dev/sdg1
sudo vgcreate ext_vg /dev/sdg1
sudo lvcreate -L 450G -n ext ext_vg
sudo mkfs.ext3 -m 0 /dev/ext_vg/ext
```

## Show Status

Each LVM layer has its corresponding command to get information about the metadata:
```bash    
sudo pvdisplay
sudo vgdisplay
sudo lvdisplay
sudo pvs
sudo vgs
sudo lvs
```

## Mount via fstab

I use the filesystem mainly for data, so allowing just rw is enough (no executables allowed). noatime allows quicker access. 
```bash  
sudo mkdir /media/mega
/dev/ext_vg/ext /media/mega     ext3    rw,noatime,user 0       2
mount /media/mega
```


## Resize


It is even possible to do an online resize of the system, wohoo :smiley: This extends the logical volume by 200MB. 
```bash
sudo lvextend -L +200 /dev/ext_vg/ext
sudo resize2fs -p /dev/ext_vg/ext
```

You can watch the resize process going on with `df -h`.


## Add Another Partition to the Logical Volume

To add another partition and use up all the available space in the logical volume, first add the physical volume to the volume group, then use `pvdisplay` to find out the total available number of free PE (add the numbers from the physical volumes), then use `lvextend` to use up all this available space. 

```bash  
sudo pvcreate /dev/sdb1
sudo vgextend ext_vg /dev/sdb1
sudo pvdisplay
sudo lvextend -l +63602 /dev/ext_vg/ext
sudo resize2fs /dev/ext_vg/ext
```


That's it! Any questions? please post!
