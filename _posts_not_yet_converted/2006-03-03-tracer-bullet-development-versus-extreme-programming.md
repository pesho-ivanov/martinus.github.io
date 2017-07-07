---
author: martin.ankerl@gmail.com
comments: true
date: 2006-03-03 11:48:28+00:00
layout: post
link: http://martin.ankerl.com/2006/03/03/tracer-bullet-development-versus-extreme-programming/
slug: tracer-bullet-development-versus-extreme-programming
title: Tracer Bullet Development versus Extreme Programming
wordpress_id: 53
categories:
- programming
---

I have just read the excellent book [Ship It!](http://www.pragmaticprogrammer.com/titles/prj/), which has an article about [Tracer Bullet Development](http://www.artima.com/intv/tracer.html).  Beeing an [XP](http://www.extremeprogramming.org/) and [Test Driven Development](http://testdriven.com/) enthusiast, I am not really sure what to make of this development technique. I will try to contrast XP with TBD:



<!-- more -->
	


The main difference boils down to the fact that TBD uses up-front design, while XP uses only evolutionary design. 



	

## Extreme Programming



	

You don't do upfront design. You create User Stories used for release planning, create acceptance tests from them, then implement the functionality test driven. This is a highly evolutionary way of developing software, which has a lot of nice benefits but is only possible with a good testing framework to enable refactoring as the design tool.


	

## Tracer Bullet Development


	

At first you identify the major parts of your project, and design the big-picture structure of the project. Each block will at first be implemented as a very simple mock object, so that you have a working prototype with the basic skeleton as soon as possible.


	

## So, which is better?


	

The difference is that TBD enforces to design an overall skeleton for the whole application, while in XP it is not necessary to do any upfront design. Martin Fowler's article [Is Design Dead?](http://www.martinfowler.com/articles/designDead.html) discusses exactly this problem, namely the difference between _planned design_ and _evolutionary design_. The evolutionary design of XP works, because it relies on the testing framework to give the security that refactoring is possible. On the other side, planned design is difficult because requirements change over time and it is very difficult to get right the first time. But it also has the big advantages: It is easier to parallelize work, and the working structure for the overall project is in place at a very early stage.


	

The problem is that it _very_ difficult to get up-front design right. The only advantage I can think of is when you have different teams working on a project and communication is an issue (too large teams, teams in different time zones, …), and that is where I believe Tracer Bullet Development can be very helpful. But you should always be prepared that the communication between the blocks and even the initial designed structure will have to change over time.


	

To be able to do so, I believe the following approach could work:


	


	
  1. Identify the major parts of the project that are most likely to be there even with changing requirements. This should be done centralized, so that all development partners are involved. Be very careful, the structure you define here will be difficult to change later, so identify only few parts, just enough necessary to parallelize the work.
	
  2. Write [Acceptance Tests](http://www.extremeprogramming.org/rules/functionaltests.html) / [Mock Client Tests](http://www.jaredrichardson.net/blog/2005/06/20/) that uses the whole application structure.Do not write any tests that check if the designed structure is used or not. The acceptance tests should just check the functionality, and not the underlying structure. The structure is only here to help create the desired result, it is no means in itself so it makes no sense testing it with acceptance test.
	
  3. Use Test Driven Development to implement the structure and the tests to get the acceptance tests working in the simplest possible way (just with mock objects). This can be done parallelized, and with all the nice XP-style tools and techniques.
	
  4. Once the initial acceptance tests run successfully with the dummy data they provide and that is returned by the blocks, it is possible to gradually flesh out the blocks with real code and to smoothly progress to real working code.

	

I believe that if you have a small team and the team is not too split up in different locations, XP is the way to go. As the project gets larger and the development teams more distributed, TBD will become more and more necessary.

