---
author: martin.ankerl@gmail.com
comments: true
date: 2010-12-10 22:04:36+00:00
layout: post
slug: cleverness-considered-harmful
title: Cleverness Considered Harmful
wordpress_id: 501
categories:
- programming
---

I have just read this nice quote at the stackoverflow question "[Why is cleverness considered harmful in programming by some people?](http://programmers.stackexchange.com/questions/25276)":



<blockquote>Fools ignore complexity; pragmatists suffer it; experts avoid it; geniuses remove it.
-- Alan Perlis</blockquote>



Which reminds me of a little code piece I have written recently. I've recently tried to implement a small, little parser for a very simple custom data format, in C++. To do this, I have tried several approaches:



## 1. Boost.Spirit


Since we use Boost in our projects, I have started reading about [Boost.Spirit](http://boost-spirit.com/home/), and took some time to decipher the tutorials which contains code [like this](http://www.boost.org/doc/libs/1_45_0/libs/spirit/doc/html/spirit/qi/tutorials/complex___our_first_complex_parser.html):

    
    bool r = phrase_parse(first, last,
      //  Begin grammar
      (
          '(' >> double_[ref(rN) = _1]
              >> -(',' >> double_[ref(iN) = _1]) >> ')'
      |   double_[ref(rN) = _1]
      ),
      //  End grammar
     space);



After half an hour I got annoyed because it simply is too much effort. I don't care how well thought out the library is and how powerful it is, it is simply unusable. Maybe I am too stupid, but I am sure that even when I manage to understand it enough to write a decent parser, half a year later I can never debug my code again: it's simply too clever.



## 2. Coco


I've ditched Boost.Spirit, and tried to use [Coco](http://www.ssw.uni-linz.ac.at/Coco/). I am unfamiliar with this but have seen a colleague use it, so I gave it a try. I was reading the documentation, which looks nice but has 42 pages and since I am a lazy bastard I stopped right there because I just want to get something working, and quickly.



## 3. Hand Written Large Switch


I have ditched Cocomo, and started to write my own, very simple code that basically looked like this:


    
    while (instream >> sym) {
      switch (symbol_map[sym]) {
      case START:
        // do this
        break;
      case WHATEVER:
        // do that
        break;
      }
    }


After just 10 minutes I got a minimal parser that worked good enough and was extremly readable and understandable code. Everybody with basic C++ understanding can skim over this code and get it. The [number of WTF's per minute](http://www.flickr.com/photos/smitty/2245445147/) when reading this code is close to zero. I am very happy with this approach, and it really rocks because it is so dead simple.

You can rightfully say that a simple switch is very inflexible, and not extensible. You are right, but who cares? Almost all code that I have seen that was planed ahead for flexibility that you might need, gets too complicated because what you planed ahead for might never be needed; even worse: most of the time you need flexibility that you cannot know in advance, it only becomes apparent when you have something and running and use it for a while.





## Final Words


Back to the original quote, based on my experience I would extend it a bit:



<blockquote>Ignorants add complexity; fools ignore complexity; pragmatists suffer it; experts avoid it; geniuses remove it.
-- Martin Ankerl</blockquote>



If you find this interesting you might also like consider reading the [Three Laws of Software Development](http://martin.ankerl.com/2007/01/05/three-laws-of-software-development/).

What do you think?
