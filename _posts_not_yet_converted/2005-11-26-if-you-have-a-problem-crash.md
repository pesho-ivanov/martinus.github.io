---
author: martin.ankerl@gmail.com
comments: true
date: 2005-11-26 05:32:31+00:00
layout: post
link: http://martin.ankerl.com/2005/11/26/if-you-have-a-problem-crash/
slug: if-you-have-a-problem-crash
title: If You Have a Problem, Crash.
wordpress_id: 36
categories:
- programming
---


	

In a Java project I currently work on I am responsible for the software architecture. Here is a little anecdote and lesson that I learned:


	


At first, when problems occured in our application, people just threw an exception. They were too lazy to catch them decently so the application crashed a lot. But this was not so bad, because the developers had to fix the problems, otherwise the application would not run.


	


After a while I thought "hey, let's catch exceptions where it makes sense, and use a a logger to get an error message. This surely helps against all these crashes".


	


For a while, life was good. The application did not crash that often any more, and most of the println's got replaced with the logging mechanism. The logging file grew in size, and had a lot of useful error messages and the application did not crash.


	


This all looked quite good at first. But it turned out to be a very bad decision after all: The time presure on the project was quite high, so the developers never really got around looking at the log messages to fix their problems. New features were introduced, new exceptions thrown, catched, and reported in the log file which then was completely ignored.


	


The morale of this story? As always, this is a problem with us lazy humans. Developers have to be forced to fix their bugs, so do not try to make an application stable by working around bugs. If you encounter a problem, crash. Throw an exception and never catch it, so that the whole application goes up in flames and leave you just with a thick red stack trace when the dust settles.

