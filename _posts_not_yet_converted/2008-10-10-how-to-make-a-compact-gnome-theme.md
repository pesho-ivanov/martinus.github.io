---
author: martin.ankerl@gmail.com
comments: true
date: 2008-10-10 22:18:31+00:00
layout: post
slug: how-to-make-a-compact-gnome-theme
title: How to Make a Compact Gnome Theme
wordpress_id: 179
categories:
- linux
---

[![](http://brainstorm.ubuntu.com/idea/6772/image/1/)](http://brainstorm.ubuntu.com/idea/6772/)The themes [Human Compact](/2008/05/13/human-compact-gnome-theme/) and [Clearlooks Compact](/2007/11/04/clearlooks-compact-gnome-theme/) have been quite a success, and I got several requests to make a tutorial on how to create such a compact theme.

**UPDATE**: [Human Compact Theme for Ubuntu 8.10 (Intrepid Ibex)](/2008/11/04/human-compact-themes-for-ubuntu-810/) is available!

Well, it is a bit difficult to create a step-by-step tutorial, but I will try anyways. Prepare to fiddle around with your configuration and try it out several times until you get the desired results.




  1. All your Gnome themes are located under /usr/share/themes. Find the theme of which you want to create a compact one, and copy it into your home directory with e.g.

    
    cp -r /usr/share/themes/Human ~/.themes/Human-Compact



  2. If there is a file index.theme, open it and change all the names (e.g. add "Compact" where appropriate). This file is necessary if you want to directly choose the theme from the Appearance Preferences; if it is not available you have to choose a theme and select "customize" to select the compact controls for it.

  3. Now to the fiddling part. Open gtk-2.0/gtkrc, and change lots of thickness and width settings... When you do this, always check how your changes work visibly, e.g. if the application still have usable borders etc. To help with the fiddling, I have added a diff of the Human vs. the Compact theme, you might be able to reuse some of the settings there.

  4. Once you are satisfied with your theme, you can create a .tar.bz2 distribution for backup or to be used by others, e.g. with this command:

    
    cd ~/.themes
    tar cjvf ~/Human-Compact.tar.bz2 Human-Compact



  5. That's it. Have fun with your theme!

<!-- more -->
Diff between "Human" and "Human Compact"


    
    --- /usr/share/themes/Human/gtk-2.0/gtkrc	2008-07-03 18:13:20.000000000 +0200
    +++ .themes/Human Compact/gtk-2.0/gtkrc	2008-05-22 21:11:07.000000000 +0200
    @@ -10,29 +10,61 @@
    
     gtk_color_scheme = "fg_color:#101010\nbg_color:#EFEBE7\nbase_color:#FFF\ntext_color:#000\nselected_bg_color:#FFD799\nselected_fg_color:#000\ntooltip_bg_color:#F5F5B5\ntooltip_fg_color:#000\norange_color:#FF6D0C\nmetacity_frame_color:#CC863E\nextra_view_widgets_color:#F5C07F"
    
    -gtk-icon-sizes = "panel-menu=24,24"
    +gtk-icon-sizes = "panel-menu=16,16 : gtk-menu=16,16 : gtk-button=16,16 : gtk-small-toolbar=16,16 : gtk-large-toolbar=16,16 : gtk-dialog=32,32 : gtk-dnd=32,32"
    
     style "ubuntulooks-default"
     {
    -	GtkButton      ::default_border    = { 0, 0, 0, 0 }
    +	# base class for everything
    +        # setting this to 0 has *very* tight packing. 1-2 looks better.
    +	GtkWidget      ::focus_padding        = 0
    +
    +	GtkButton      ::child-displacement-x = 1
    +	GtkButton      ::child-displacement-y = 1
    +	GtkButton      ::default-border       = { 0, 0, 0, 0 }
    +	GtkButton      ::default-outside-border={ 0, 0, 0, 0 }
    +
    +	GtkButtonBox   ::child_min_width      = 0
    +	GtkButtonBox   ::child_min_heigth     = 0
    +	GtkButtonBox   ::child_internal_pad_x = 0
    +	GtkButtonBox   ::child_internal_pad_y = 0
    +
    +	GtkPaned       ::handle_size       = 4
    +
     	GtkRange       ::trough_border     = 0
    -	GtkPaned       ::handle_size       = 6
    -	GtkRange       ::slider_width      = 15
    +	GtkRange       ::slider_width      = 14
     	GtkRange       ::stepper_size      = 15
    +	GtkRange       ::stepper_spacing   = 0
    
    -	GtkScrollbar   ::min_slider_length = 35
    +	GtkScrollbar   ::min_slider_length = 30
    +	GtkScrolledWindow::scrollbar_spacing = 0
     	GtkCheckButton ::indicator_size    = 14
     	GtkMenuBar     ::internal-padding  = 0
    -	GtkTreeView    ::expander_size     = 14
    -	GtkExpander    ::expander_size     = 16
    -	GtkScale       ::slider-length     = 31
    +
    +	GtkMenu        ::horizontal-padding   = 0
    +	GtkMenu        ::vertical-padding     = 0
    +
    +	GtkOptionMenu  ::indicator_size       = 0
    +	GtkOptionMenu  ::indicator_spacing    = 0
    +
    +
    +	GtkTreeView    ::expander_size     = 11
    +	GtkTreeView    ::expander_spacing  = 0
    +	GtkTreeView    ::vertical-separator = 0
    +	GtkTreeView    ::horizontal-separator = 0
    +
    +	GtkExpander    ::expander_size     = 11
    +	GtkExpander    ::expander_spacing  = 0
    +	GtkScale       ::slider-length     = 23
    +	GtkScale       ::value_spacing     = 0
    +
    +	GtkToolbar     ::internal-padding  = 0
    +	GtkToolbar     ::space-size        = 10
    +
     	# GtkToolbar     ::button-relief     = GTK_RELIEF_NORMAL
     	# GtkMenuBar     ::shadow-type       = GTK_SHADOW_OUT
     	# GtkScrollbar   ::has-secondary-forward-stepper = 1
     	# GtkScrollbar   ::has-secondary-backward-stepper = 1
    
    -	GtkButton      ::child-displacement-x = 0
    -	GtkButton      ::child-displacement-y = 0
    
     	xthickness = 1
     	ythickness = 1
    @@ -92,8 +124,8 @@
    
     style "ubuntulooks-wide" = "ubuntulooks-default"
     {
    -	xthickness = 2
    -	ythickness = 2
    +	xthickness = 0
    +	ythickness = 0
     }
    
     style "ubuntulooks-wide-orange" = "ubuntulooks-wide"
    @@ -104,7 +136,7 @@
     style "ubuntulooks-wider" = "ubuntulooks-default"
     {
     	xthickness = 3
    -	ythickness = 3
    +	ythickness = 2
     }
    
     style "ubuntulooks-wider-orange" = "ubuntulooks-wider"
    @@ -114,12 +146,18 @@
    
     style "ubuntulooks-button" = "ubuntulooks-wider-orange"
     {
    +	xthickness   = 0
    +	ythickness   = 0
    +
     	bg[PRELIGHT] = shade (1.02, @bg_color)
     	bg[ACTIVE]   = shade (0.90, @bg_color)
     }
    
     style "ubuntulooks-notebook" = "ubuntulooks-wide-orange"
     {
    +	xthickness = 0
    +	ythickness = 0
    +
     	bg[NORMAL]      = shade (0.99, @bg_color)
     	bg[ACTIVE]      = shade (0.85, @bg_color)
     	bg[INSENSITIVE] = shade (0.99, @bg_color)
    @@ -127,14 +165,14 @@
    
     style "ubuntulooks-tasklist" = "ubuntulooks-default"
     {
    -	xthickness = 5
    -	ythickness = 3
    +	xthickness = 0
    +	ythickness = 0
     }
    
     style "ubuntulooks-menu" = "ubuntulooks-default"
     {
    -	xthickness = 2
    -	ythickness = 1
    +	xthickness = 0
    +	ythickness = 0
     	bg[NORMAL] = shade (1.04, @bg_color)
     }
    
    @@ -145,8 +183,9 @@
    
     style "ubuntulooks-menu-item" = "ubuntulooks-default"
     {
    -	xthickness     = 2
    -	ythickness     = 3
    +	xthickness     = 1
    +	ythickness     = 1
    +
     	bg[SELECTED]   = @selected_bg_color
     	fg[PRELIGHT]   = @selected_fg_color
     	text[PRELIGHT] = @text_color
    @@ -171,19 +210,26 @@
    
     style "ubuntulooks-progressbar" = "ubuntulooks-wide-orange"
     {
    -	xthickness    = 2
    -	ythickness    = 2
    +	xthickness    = 0
    +	ythickness    = 0
     	fg[PRELIGHT]  = @base_color
     }
    
     style "ubuntulooks-treeview" = "ubuntulooks-wide-orange"
     {
    -	xthickness    = 2
    -	ythickness    = 2
    +	xthickness    = 0
    +	ythickness    = 0
     	fg[NORMAL]  = @text_color
     	fg[SELECTED]  = @base_color
     }
    
    +# style are overriden again.
    +style "ubuntulooks-treeview-header" = "ubuntulooks-default"
    +{
    +	xthickness = 0
    +	ythickness = 0
    +}
    +
     style "ubuntulooks-combo" = "ubuntulooks-button"
     {
     }
    
    
    
    Any questions, comments?
