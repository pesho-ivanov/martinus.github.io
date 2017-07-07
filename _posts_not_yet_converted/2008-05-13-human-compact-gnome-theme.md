---
author: martin.ankerl@gmail.com
comments: true
date: 2008-05-13 19:46:28+00:00
layout: post
link: http://martin.ankerl.com/2008/05/13/human-compact-gnome-theme/
slug: human-compact-gnome-theme
title: Human Compact Gnome Theme (for Ubuntu 8.04)
wordpress_id: 146
categories:
- linux
- programming
---

[![](http://brainstorm.ubuntu.com/idea/6772/image/1/)](http://brainstorm.ubuntu.com/idea/6772/)Thanks to the overwhelming success of the [Clearlooks Compact Theme](http://martin.ankerl.com/2007/11/04/clearlooks-compact-gnome-theme/) and demand from several users I have now created a _Human Compact_ theme. Basically it features the same compactness as Clearlooks Compact, but the look & feel of the [Ubuntu](http://www.ubuntu.com/) Human theme. So, if you want compactness and did not like the cold blue look of clearlooks, this is for you. It should also work well with the Eee pc, there even is a [nice tutorial here](http://wiki.eeeuser.com/ubuntu:eeexubuntu:customization).

**UPDATE**: [Human Compact Theme for Ubuntu 8.10 (Intrepid Ibex)](http://martin.ankerl.com/2008/11/04/human-compact-themes-for-ubuntu-810/) is available!



# Comparison


Move your mouse over the image to see the difference of a save dialog between Ubuntu's 8.04 _Human_, and _Human Compact_. Buttons and spacing is much smaller which results in a lot more free space for the actual content. See for yourself:













Here are some other screenshots. The eclipse window uses 800x480 resolution, which is the same as the eee pc has.

[![eclipse](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-java-koagent-src-test-feasibility-at-profactor-inspector-graphvizvisitorjava-eclipse-platform.thumbnail.png)](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-java-koagent-src-test-feasibility-at-profactor-inspector-graphvizvisitorjava-eclipse-platform.png) [![inkscape](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-infosvg-inkscape.thumbnail.png)](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-infosvg-inkscape.png) [![calc](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-calculator-scientific.thumbnail.png)](http://martin.ankerl.com/wp-content/uploads/2008/05/screenshot-calculator-scientific.png)




# Download and Installation






  1. Save the file [HumanCompact.tar.bz2](/files/HumanCompact.tar.bz2) to your computer.

  2. Open the gnome's appearence dialog with System > Preferences > Appearance.

  3. Drag and drop the downloaded file into the Theme tab of the appearance dialog.

  4. Choose "Apply new theme" in the popup dialog.

Most changes will occur immediately, but for e.g. the icon sizes it is best to log out and log in again. When you change the theme, you can get the Human Compact theme back by clicking on Customize, and then selecting Human Compact.

Any question, praise or flames? please post them!



# Install for root (e.g. Synaptic)


Some readers asked how to get this to work for applications that run as root (e.g. synaptic), so here it is: simply copy the copy the theme file into the root’s home directory, like this (exchange _username_ with your own name):


    
    sudo cp /home/username/.themes/Human\ Compact/gtk-2.0/gtkrc /root/.gtkrc-2.0



Afterwards synaptic uses the human compact theme.
