---
author: martin.ankerl@gmail.com
comments: true
date: 2008-11-04 17:11:58+00:00
layout: post
slug: human-compact-themes-for-ubuntu-810
title: Human Compact Themes (for Ubuntu 8.10)
wordpress_id: 182
categories:
- linux
- programming
---

[![](http://brainstorm.ubuntu.com/idea/6772/image/1/)](http://brainstorm.ubuntu.com/idea/6772/)This is a new release of the compact theme, based on the original Ubuntu 8.10 (Intrepid) theme. It was created by Jan Suhr almost a month ago, based on my little [howto](/2008/10/10/how-to-make-a-compact-gnome-theme/).

I have now two versions of the theme: one with normal icon sizes, and one with the smaller 16x16 icons for even more compactness. Here is a comparison animation of the standard Human theme vs. the compact theme:


![](/files/compact8.10.gif)


You can download the themes here:




  * [HumanCompact-8.10.tar.bz2](/files/HumanCompact-8.10.tar.bz2)

  * [HumanCompactSmallIcons-8.10.tar.bz2](/files/HumanCompactSmallIcons-8.10.tar.bz2)





# Download and Installation






  1. Save the theme to your computer.

  2. Open the gnome's appearence dialog with System > Preferences > Appearance.

  3. Drag and drop the downloaded file into the Theme tab of the appearance dialog. If you get an error message "Can't move directory over directory", you have already installed a theme with the same name. To be able to reinstall it, remove the directory ~/.themes/Human Compact or ~/.themes/Human Compact Small Icons.

  4. Choose "Apply new theme" in the popup dialog.

Most changes will occur immediately, but for e.g. the icon sizes it is best to log out and log in again. When you change the theme, you can get the Human Compact theme back by clicking on Customize, and then selecting Human Compact.

Any question, praise or flames? please post them!



# Install for root (e.g. Synaptic)


Some readers asked how to get this to work for applications that run as root (e.g. synaptic), so here it is: simply copy the copy the theme file into the root’s home directory, like this (exchange _username_ with your own name):


    
    sudo cp /home/username/.themes/Human\ Compact/gtk-2.0/gtkrc /root/.gtkrc-2.0



Afterwards synaptic uses the human compact theme.



# Older Themes


Here is some information about the original compact themes I have created:




  * [How to Make a Human Compact Theme](http://martin.ankerl.com/2008/10/10/how-to-make-a-compact-gnome-theme/)

  * [Human Compact Theme (for Ubuntu 8.04)](/2008/05/13/human-compact-gnome-theme/)

  * [Clearlooks Compact Theme (for Ubuntu 8.04)](/2007/11/04/clearlooks-compact-gnome-theme/)

