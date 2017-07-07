---
author: martin.ankerl@gmail.com
comments: true
date: 2007-05-06 18:55:47+00:00
layout: post
link: http://martin.ankerl.com/2007/05/06/erlang-syntax-highlighting/
slug: erlang-syntax-highlighting
title: Erlang Syntax Highlighting
wordpress_id: 88
categories:
- linux
- programming
tags:
- editor
- erlang
- gedit
- programming
- syntax highlighting
---

I have written a language definition file for [GtkSourceView](http://gtksourceview.sourceforge.net/) to get a nice syntax highlighting for [Erlang](http://www.erlang.org/) with applications that use this component, e.g. Gnome's standard editor [gedit](http://www.gnome.org/projects/gedit/).

The highlighting looks like this:

![Screenshot gedit with Erlang sourcecode](/files/erlang-gedit.png)


Here is how to get this to work:
<!-- more -->


# Install Erlang Language File






  1. Download the file [erlang.lang](/files/erlang.lang).


  2. Copy the file to /usr/share/gtksourceview-1.0/language-specs/erlang.lang.


  3. Start gedit, open an Erlang file, and choose View > Highlight Mode > Sources > Erlang.




# Automatically Recognize *.erl


If you want gedit to automatically recognize that all .erl files should be correctly highlighted, you have to define the mime type (more info is [here](http://zerokspot.com/node/35)):





  1. Create directory to override mime types, in the command line type

    
    mkdirhier ~/.local/share/mime/packages




  2. Download the custom mime file [Override.xml](/files/Override.xml) into this directory (if the file already exists, you have to copy the relevant lines by hand):

    
    cd ~/.local/share/mime/packages
    wget http://martin.ankerl.com/files/Override.xml




  3. Update the mime database by merging the file:

    
    update-mime-database ~/.local/share/mime




  4. Restart nautilus (or logout & login again):

    
    killall nautilus







There you go, Erlang code in all its glory. Happy hacking!
