---
author: martin.ankerl@gmail.com
comments: true
date: 2009-01-22 20:59:03+00:00
layout: post
slug: beautiful-font-hinting-in-ubuntu-810
title: Beautiful Font Hinting in Ubuntu 8.10 and 9.04
wordpress_id: 197
categories:
- linux
- programming
---

Even though I have an LCD monitor, I always have the subpixel hinting switched off because it is just painfully ugly to my eyes. Even when hinting is switched to maximum, the fonts are quite blurry (if you don't believe me, type xmag and take a screenshot of your font. You can see red and blue linese everywhere). My eyes hurt when I see this.

Thanks to [Johan Kivinemi](http://johan.kiviniemi.name/blag/ubuntu-fonts/) I have just found out how to bring back the excellent legacy subpixel hinting engine. This has a much more crisp hinting, and uses subpixels only where it really is an improvement:

Just open these files in your home directory, and copy the content into them:


## ~/.fonts.conf



    
    
    
    <fontconfig>
      <match target="font">
        <edit name="antialias" mode="assign">
          <bool>true</bool>
        </edit>
        <edit name="hinting" mode="assign">
          <bool>true</bool>
        </edit>
        <edit name="hintstyle" mode="assign">
          <const>hintfull</const>
        </edit>
        <edit name="lcdfilter" mode="assign">
          <const>lcdlegacy</const>
        </edit>
        <edit name="rgba" mode="assign">
          <const>rgb</const>
        </edit>
      </match>
    </fontconfig>





## ~/.Xresources



    
    Xft.antialias:  true
    Xft.hinting:    true
    Xft.hintstyle:  hintfull
    Xft.lcdfilter:  lcdlegacy
    Xft.rgba:       rgb



This should work in Ubuntu 8.04, 8.10, and 9.04 too, and makes all fonts much more crisp. Of course, your mileage may vary.



# UPDATE: Comparison Screenshots


As promised on [reddit](http://www.reddit.com/r/linux/comments/7ru91/beautiful_font_hinting_in_ubuntu_810/), I got back from an awesome snowboard trip so I am able to put up extensive comparison screenshots of the two subpixel hinting engines. Move your mouse over the following images to see the differences. Watch especially out for letters like "m" where the spacing between the lines is very small. You might have to wait a bit for the image to load.

I have used all of the most important fonts that I usually use, and just for fun I have added "Dijkstra", which just looks cool.



## Sans Fonts


Mouse to see the same fonts with the legacy hinter.











## Mono Fonts


Mouse to see the same fonts with the legacy hinter.












## Zoomed Comparison Screenhots


Here is an excerpt with 400% magnifications. Mouse over the pictures to see the legacy hinter.


### Zoomed Sans













### Zoomed Mono








