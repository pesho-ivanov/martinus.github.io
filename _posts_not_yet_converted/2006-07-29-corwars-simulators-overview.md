---
author: martin.ankerl@gmail.com
comments: true
date: 2006-07-29 12:48:16+00:00
layout: post
link: http://martin.ankerl.com/2006/07/29/corwars-simulators-overview/
slug: corwars-simulators-overview
title: CoreWars Simulators Overview
wordpress_id: 68
categories:
- programming
---

I have just received a patch for qMars from [Pavel Šavara](http://nmars.sourceforge.net/), so I have finally got some updated information about the different [CoreWars](http://www.corewars.org/) simulators I have written. All of them have quite different properties, so have a look and choose whichever suites you best:

<!-- more -->


# qMars






  * **Download**: [qmars_1.1.tar.bz2](/files/qmars_1.1.tar.bz2)

  * **Speed**: Pretty fast

  * **Coolness**: Very cool

  * **Techniques**: To achieve the speed, qMars uses a code generator that generates a very big switch-statement (383 cases) which allows for highly optimized code that would not be possible to write by hand. It is written in C++ and uses some [template metaprogramming](http://osl.iu.edu/~tveldhui/papers/Template-Metaprograms/meta-art.html) tricks which gives it a high coolness factor.




# exhaust-ma






  * **Download**: [exhaust-ma.zip](/files/exhaust-ma.zip)

  * **Speed**: Pretty damn fast

  * **Coolness**: Cool enough

  * **Techniques**: This is a modified [exhaust](http://www.cs.helsinki.fi/u/jpihlaja/exhaust/exhaust.html) with some quite obscure optimization tricks. It achieves its  speed through hand-optimized code for the most commonly used commands (MOV.I, DJN, SPL). It uses several bit operations and lots of macros which makes the it exceptinally fast and the source exceptionally unreadable. It is written in C, and compiles quite fast.




# exMARS






  * **Download**: [exmars-0.01.tar.gz](/files/exmars-0.01.tar.gz)

  * **Speed**: Pretty damn fast

  * **Coolness**: Extremely amazing Cool

  * **Techniques** exMARS combines the best parts of exhaus-ma with [pmars](http://www.ecst.csuchico.edu/%7Epizza/koth/pmars.html) and goes even further:


    * exMARS uses the parser of pmars which means that you can read in _any_ warrior file, no need to preparse the warriors like in exhaust or qMars.

    * exMARS uses the simulator engine of exhaust-ma which means it is pretty damn fast.

    * exMARS contains several fixes to memory leaks of the pmars parser and the interface has been rewritten, so now you can embedd exMARS in your application and have _multiple different mars simulators at once_.

    * There is more, read this slowly to let it slowly sink in: _exMARS has [Ruby](http://www.ruby-lang.org/en/) bindings_. That means you can write an evolver in Ruby and still have an exceptionally fast simulator. Usage is like this:

    
    require "mars"
    mars = Mars.standard(2) # standard mars settings, two warriors.
    
    w1 = mars.parse("warriors/94nop/behemot.red")
    w2 = mars.parse("warriors/94nop/reepicheep.red")
    
    mars.rounds = 200
    puts m.fight(w1, w2).results_str



Told you it is cool.


On a side note, somebody has taken these ideas to the extreme and wrote [fmars](http://www.v-lo.krakow.pl/~michal/fmars.html), which is the currently fastest corewars simulator on the planet, which rightfully deserves to be called "pretty amazing damn fast". Unfortunately it can be a bit tricky to compile and only works with [gcc](http://gcc.gnu.org/). But he has also a Python interface (with [SWIG](http://www.swig.org/), so generating Ruby, Java or whatever interface you like should be very simple).
