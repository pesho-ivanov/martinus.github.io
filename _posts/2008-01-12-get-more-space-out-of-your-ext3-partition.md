---
author: martin.ankerl@gmail.com
comments: true
date: 2008-01-12 11:56:24+00:00
layout: post
slug: get-more-space-out-of-your-ext3-partition
title: Get More Space Out of Your ext3 Partition
wordpress_id: 104
categories:
- linux
- programming
tags:
- ext3
- harddisk
- howto
- linux
- trick
- ubuntu
- wastedspace
---

I have just discovered that ext3 defaults to reserving 5% of its partition exclusively for root, as a precaution measure that your system does not get FUBAR when you use it for your root partition. I have a 230GB external USB disk that I use for all my big storage requirements, downloaded stuff, backups etc. Due to this reservation I had 11.5GB of unusable disk space, thankfully this is easy to fix:

```bash
tune2fs -m 0 /dev/sdf1
```

Replace `sdf1` with your partition name. You don't even have to unmount your disk. Voilá, 11.5 GB more space for free :-) Here is the output of `df -h` as proof:


## Before
```
Filesystem            Size  Used Avail Use% Mounted on
/dev/sdf1             230G  193G   26G  89% /media/disk
```

## After
```    
Filesystem            Size  Used Avail Use% Mounted on
/dev/sdf1             230G  193G   38G  84% /media/disk
```

If you like this, you might also be interested in [How to change Ubuntu forced fsck](/2007/11/03/howto-change-ubuntu-forced-fsck/).

**Update:** The free space limitation is also used to prevent fragmentation. So if you set the limit to zero and operate on a very full harddisk for a while, your filesystem might slow down.
