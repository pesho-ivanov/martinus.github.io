---
author: martin.ankerl@gmail.com
comments: true
date: 2007-04-01 19:35:05+00:00
layout: post
slug: rfind-quickly-find-files
title: RFind - Quickly Find Files
wordpress_id: 86
categories:
- programming
tags:
- freeware
- release
- RFind
- ruby
---

RFind is a little application that indexes the filenames of a given directory, and allows to quickly search this index with regular expressions.

The motivation behind this app was that someone thought this had to be in C++ to be fast, so I proved him wrong: search-on-typing with more than 500,000 indexed filenames is easily possible :smiley:

I have tried to make this little tool very configurable so that is can be useful to everyone. Some of the features are:

* Hierarchical presented search results
* Search-on-typing
* Define rules to execute on mouseclick

## Download

[rfind-1.0.zip](/files/2007/04/rfind-1.0.zip)

This tool is written in Ruby and requires fxruby 1.0, which is a bit out of date. I will try to update it to a recent version of fxruby soon.