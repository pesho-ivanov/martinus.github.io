---
author: martin.ankerl@gmail.com
comments: true
date: 2011-06-06 15:57:14+00:00
layout: post
slug: smallest-working-qr-code
title: Smallest working QR Code
wordpress_id: 580
categories:
- programming
---

I've been playing a bit with QR code generators, and tried to generated a very small one for this homepage. This is the result:
![](http://martin.ankerl.com/wp-content/uploads/2011/06/martinankerl-small.png)

The file is 21x21 pixels, and has just <strike>178</strike> 165 bytes. It works with my cellphone from a distance of about 7cm, and gets you to [http://martin.ankerl.com/](http://martin.ankerl.com/).

How did I create it?





  * Create very short URL to the link you want to create the QR code for. I've used [j.mp](http://j.mp/) with the customize link feature, and played a bit with special characters like _ until I got a working link.

  * Create a QR code for this link, with low error code correction. [This generator](http://www.racoindustries.com/barcodegenerator/2d/qr-code.aspx) has this option.

  * Open the file with your favourite image editor, cut off the border, resize it by factor 1/4 with resample to get a QR code where each black dot is one pixel wide.

  * Save as .png, without any additional information.

  * use [IrfanView's PNGOUT](http://www.irfanview.com/plugins.htm), and afterwards [optipng](http://optipng.sourceforge.net/) -o9 to recompress the picture.


Can you make a smaller QR code with working weblink?

Have fun!
