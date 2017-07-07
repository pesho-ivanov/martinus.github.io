---
author: martin.ankerl@gmail.com
comments: true
date: 2005-12-04 12:34:56+00:00
layout: post
link: http://martin.ankerl.com/2005/12/04/how-to-design-large-erlang-systems/
slug: how-to-design-large-erlang-systems
title: How to Design Large Erlang Systems
wordpress_id: 40
categories:
- programming
---

Once upon a time I wanted to give the programming language [Erlang](http://www.erlang.org/) a try because it seems to have a lot of features that are required for making a good [Multi-agent system](http://en.wikipedia.org/wiki/Multi-agent_system). So I asked at the [mailing list](http://www.erlang.org/ml-archive/erlang-questions/) how to design large systems using erlang, because it obviously needed a different approach from the usual object oriented decomposition. Luckily, I got a [very interesting response](http://www.erlang.org/ml-archive/erlang-questions/200504/msg00224.html) to [my question](http://www.erlang.org/ml-archive/erlang-questions/200504/msg00214.html) from the inventor of Erlang himself. Here is what he has to say (I added html syntax):  


<!-- more -->


* * *


	

## Quick answer:


	


	
  * OO design is all about identifying the objects

	
  * CO design is all about identifying the concurrency

	
	

To write an Erlang program you must identify the concurrency in your problem.


	

If this is a program that interacts or models the real-world then identifying the concurrency is easy - just look - use your eyes.


	

If you're writing a poker game with four players use four processes - If your are writing an IRC program connected to  5 servers and 25 groups use 5 server processes and 25 group processes etc. 


	

Make the number of processes in your pgram map 1:1 with the concurrent structure in your problem.


	


	

## Longer answer:


	

This is how I (In theory) go about things:


	


	
  1. **Restudy**  

Identify the most difficult problems that are unsolved - these are the "show stoppers" - write small prototypes to solve **all** such problems - if your have solved all such problems proceed otherwise give up

	
  2. **Identify the concurrency structure of the problem**  

Identify the processes you need and name all the processes. (If you don't name things you would be able to talk about them) Identify the message channels between the processes. Sketch the APIs that will create the processes and encapsulate the operation performed between processes.


	

Often the design will break down into well-understood programming patterns


	
	
    * Client-server

	
    * Logger

	
    * Supervision tree

	
    * etc.

	
	

Use these patterns wherever possible

	
  3. **Identify the failure paths at a process level**  

You need to think like this: "If process A dies then B will receive a error message and do the error recovery for A" - so identify which processes might die, and who is to do the error recovery if they do die.

	
  4. **Write down the APIs**  

Implement the design. Use one module per process class. I use the "flotilla" naming principle. A "main" module called xyz and a load of sub-modules with names like xyz_do_this xyz_do_that Cross process calls should always be made to main modules and not sub modules.


	

ie functions in xyx_abc can call any functions in xyz sub-modules (like xyz_foo) but only functions in pqr and not sub-modules to pqr.


	

Incidentally most problems only need a smallish number of process types so the name-space pollution problem is not that bad.

	
  5. **Implement the stuff process at a time testing as you go.**  

If your design involves the use of client-server etc. Use the OTP behaviours.


	

Write a clearly and as cleanly as possible - **DO NOT OPTIMISE YOUR CODE**


	

Start with the global registered processes they are easiest to debug.


	

Mail [this list](http://www.erlang.org/ml-archive/erlang-questions/) to see if anybody has already implemented what you want.


	

Keep the parts as isolated as possible so that errors in incorrect code cannot propagate to correct code.

	
  6. **Integrate/test/measure**  

Test the system - use invariants as much as possible.


	

In most cases your system will be efficient enough - if not measure and find out where the inefficiency is - look in two particular areas; I/O input especially where you have to parse the inputs and bad concurrency structures (two few or two many processes)

	
	

In practise I do bits of 1..6 simultaneously ![-)](http://martinus.geekisp.com/wp-images/smilies/icon_smile.gif)


	

The other thing is write clear specifications as you go - as you develop the program you will get sudden flashes of insight "ah ha - That's what it should do" - if you are on the right track carry on. If not throw away **ALL** your code and start again.


	

Oh and listen to your subconscious - if you get the "this is not right but I don't know why" feeling - stop - conversely if you get the "I know this is right" feeling don't stop, just turn off your brain and type the code in.


	

There is a mis-conception - the best programs "write themselves" so they need no design they have always been and they will always be - you just have to see them and write them down. At first you grope blindly and then you see them.


	

(This is the Platonic view of programming - that programs have a priori existence, we don't invent them, they have always been, we perceive them and write them down  ![-)](http://martinus.geekisp.com/wp-images/smilies/icon_smile.gif)


	

_This is the reason why two independent programmers when given a problem to solve often produce identical (to within renaming of parts) programs - since there is only one solution - the correct solution_


	

/Joe
