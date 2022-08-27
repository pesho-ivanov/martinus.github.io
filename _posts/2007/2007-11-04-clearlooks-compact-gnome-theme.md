---
author: martin.ankerl@gmail.com
comments: true
date: 2007-11-04 20:59:42+00:00
layout: post
slug: clearlooks-compact-gnome-theme
title: Clearlooks Compact Gnome Theme
wordpress_id: 100
categories:
- linux
- programming
tags:
- clearlooks
- comparison
- gtk
- linux
- release
- theme
- ubuntu
---

I have been using [Ubuntu](http://www.ubuntu.com/) for quite a while now, but one thing I really dislike is that all the themes are huge space wasters compared to Windows XP. This finally got me angry enough to create a customized version of the [Clearlooks](http://clearlooks.sourceforge.net/) theme that tries to be very compact but still maintain its beautiful look. I like the result quite a lot, I have been using this theme for more than two weeks now and it works great. It is especially nice for intense applications like [Eclipse](http://www.eclipse.org).

**UPDATE**: [Human Compact Theme for Ubuntu 8.10 (Intrepid Ibex)](/2008/11/04/human-compact-themes-for-ubuntu-810/) is available!


## Comparison

Move your mouse over the image to see how the dialog looks like with clearlooks-compact. The buttons and spacing are smaller, which results in much more visible space for the actual content.


<style type="text/css">
<!--
#clearlooks a {
    display:block;
    background-image:url(/img/2007/11/clearlooks.png);
    width:435px;
    height:421px;
}
#clearlooks a:hover {
    background-image:url(/img/2007/11/clearlooks-compact.png);
}
-->
</style>

<center>
    <div id="clearlooks">
        <a href="#">&nbsp;</a>
    </div>
</center>


## More Screenshots

Here are some more screenshots that I have taken with Clearlooks Compact enabled. Especially the Eclipse shot is great, there the theme really shines. It is even more compact than the Windows XP look.

### Gnome Calculator
![Gnome Calculator](/img/2007/11/calc.png)

### Gnome File Selector
![Gnome File Selector](/img//2007/11/clearlooks-compact.png)

### Eclipse
![Eclipse with Compact Theme](/img/2007/11/eclipse-compact.png)

### Tracker
![Tracker Search Tool](/img/2007/11/tracker.png)


If you are curious, I have used [Tahoma](http://www.google.at/search?q=tahoma+ttf), size 9 for the application font, and the [MiscFixed](https://www.google.com/search?q=miscfixed++ttf) for the sourcecode.


## Download & Installation

Installation is extremely simple, in Ubuntu 7.10 (Gutsy Gibbon) you can do it this way:


1. Click System > Preferences > Appearance.
1. Drag & drop the link [ClearlooksCompact-1.5.tar.bz2](/files/2007/11/ClearlooksCompact-1.5.tar.bz2) into the *Appearence* window.

Beware that this is just definition of the Clearlooks control spacings. That means you have to have the clearlooks engine installed (which you most likely have, it is the default theme of Ubuntu). To change back, click on the currently active Theme, choose "Customize", and select other controls instead of "Clearlooks Compact".


## History

I will regularly update this page when I update the theme with a new screenshot and the development history:

### April 9th, 2009: Version 1.5
A bit smaller checkbox + selection box, less blurry and smaller progress bar.

### April 5th, 2009, Version 1.4
Added LGPL, index.theme, version number.

### April 11th, 2008, Version 1.3
Small panel menu

### November 11th, 2007, Version 1.2
Major update: Smaller handlers sizes, smaller scrollbars, no scrollbar spacing, less overall padding, and some more.

### November 7th, 2007, Version 1.1
Now even more compact by reducing the default icon size to 16×16 pixels.

## November 4th, 2007, Version 1.0
First release of Clearlooks Compact.