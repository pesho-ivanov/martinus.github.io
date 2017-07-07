---
author: martin.ankerl@gmail.com
comments: true
date: 2006-08-02 07:55:25+00:00
layout: post
link: http://martin.ankerl.com/2006/08/02/behaviour-driven-development/
slug: behaviour-driven-development
title: Behaviour Driven Development
wordpress_id: 69
categories:
- programming
---

Recently there has been quite a bit of fuss about [Behaviour Driven Development](http://behaviour-driven.org/). So, what is it all about? You should have a look at that presentation from [Dave Astels](http://www.daveastels.com/), it is quite interesting:



# Presentation: "Beyond Test Driven Development: Behaviour Driven Development"


You can also view and download the video [here](http://video.google.com/videoplay?docid=8135690990081075324&q=behaviour+driven+development).





<!-- more -->



# What this is about?


In short, Behaviour Driven Development can be summarized into just one sentence:



<blockquote>Behaviour Driven Development is exactly what you are doing if you do [Test Driven Development](http://www.agiledata.org/essays/tdd.html) right.</blockquote>



That's it? Yep, that's it. Test driven Development is truely excellent in theory, but in practice it takes a long time to master. The people behind Behaviour Driven Development argue that this is due to bad naming. Language strongly influences how you think, and when you develop test-driven, you constantly talk about "tests", "units", "asserts" etc. If you are unexperienced this puts you in a wrong mindstate, because TDD it is not so much about testing. Here is why:





  * When you talk about **tests**, you mostly think you need to validate _how_ the code does something. That's not what you should do. In fact you should not care at all how the code does someting, you should only care about _what_ it does, In short, you want to know it the codes has a desired behaviour. So lets replace the word "test" with another catchy name **spec**. So from now on you are not writing tests to test something, but you are writing specifications for behaviours. Sweet.





  * Everybody has a different idea what a **unit** is. Some think it's a class, others think it is a tiny piece of code, others talk about an entity of code that somehow belongs together. This ambiguousness is bad, so let's ditch it. Lets just talk about **behaviours**: This is independent of the structure of what you want to test, and clearly describes what you should be validating all along; if you talk about unit tests you are limiting your scope to whatever you think a unit represents. When thinking about behaviours you are free to validate what you really should.




  * The syntax of the **asserts** can be cleaned up quite a bit. So in [Ruby](http://www.ruby-lang.org/en/) with [rUnit](http://www.ruby-doc.org/stdlib/libdoc/runit/rdoc/index.html) you write assert_equals(expected, actual), but wouldn't it be much nicer if you could write actual.should_be expected. In fact this is exactly how it works in [rSpec](http://rspec.rubyforge.org/).







# What now?


Behaviour Driven Development is a very recent invention, and work around this has just started. I expect that after [rSpec](http://rspec.rubyforge.org/) we will soon see jSpec, pSpec, and lots of other tools. I hope this will change peoples mindset and allows us to [grok](http://www.answers.com/grok) how software engineering should work more thoroughly.
