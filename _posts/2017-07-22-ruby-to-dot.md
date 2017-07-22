---
author: martin.ankerl@gmail.com
comments: true
date: 2017-07-22 08:26:58+02:00
layout: post
title: 'Ruby to Dot - Graph any Class Hierarchy'
categories:
- programming
---

While cleaning up my blog I have found an old ruby program from 2005: [rtd.rb](/files/2017/07/rtd.rb). What this does it it can create pretty graphs from ruby class hierarchy. Interestingly, it still works :smiley:

It is quite easy to use, here is a small tutorial:

## Usage Tutorial

1. Generate graph for the ruby module `time`. Create a file `rtd-json.rb` with this content:
   ```ruby
   require "./rtd.rb"
   stats = RubyToDot.new
   stats.hide_current_state
   require 'time'
   puts stats.generate
   ```
   Now run this command (requires `dot`, install in Ubuntu with `sudo apt install graphviz`):
   ```bash
   ruby rtd-time.rb | dot -Tpng >time.png
   ```
   The generates this graph:

   ![time](/img/2017/07/time-1.png)
1. This does not yet look very nice. Let hide the module `Kernel`, and draw the graph from top down:
   ```ruby
   require "./rtd.rb"
   stats = RubyToDot.new
   stats.hide_current_state
   require 'time'
   stats.hide(Kernel)
   stats.left_to_right = false
   puts stats.generate
   ```
   This is the generated graph:
   
   ![time top down](/img/2017/07/time-2.png)


## json Example

For larger modules the graph can get pretty complex. E.g. here is a graph for JSON. I've hid the modules `Kernel` and `JSON::Ext::Generator::GeneratorMethods::Object`. Click to enlarge:

[![JSON](/img/2017/07/json.png)](/img/2017/07/json.png)

## net/ftp Example

Another graph for `net/ftp`:

[![net/ftp](/img/2017/07/net-ftp.png)](/img/2017/07/net-ftp.png)

