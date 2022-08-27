---
author: martin.ankerl@gmail.com
comments: true
date: 2006-08-02 20:02:18+00:00
layout: post
slug: redesigning-junit-asserts
title: Redesigning JUnit Asserts
wordpress_id: 70
categories:
- programming
---

After reading about [Behaviour Driven Development](/2006/08/02/behaviour-driven-development/), using [jMock](http://www.jmock.org/) for a while, and since I am very fond of [Ruby](http://www.ruby-lang.org/en/)'s [core class API](http://www.rubycentral.com/ref/)s, I am sure the assertations of JUnit need a major overhaul.

This are the goals I have for the redesign:

* Make the code expressive and as readable as possbile. This means the code should look like plain english.
* Usability is more important than flexibility.
* Allow for much more poweful checks.

Usability is very important. The good thing is that it is easy to analyze how JUnit is used (download some test driven developed open source projects, grep for `assertTrue`, and there you have all the cases where JUnit's asserts were not good enough :smiley:)

I am playing around with a few ideas, and this is the API I am currently after:


## Assertions Example Usage

```java   
public void testInt() {
  int num = 4+1;
  ensure(num).is(5);
  ensure(num).either(4, 5, 6);
  ensure(num).between(3, 10);
}

public void testDouble() {
  double val = 4 + 0.4;
  // an epsilon is mandatory when comparing double
  ensure(val).is(4.4, 0.0001);
  ensure(val).between(4.3, 4.5);
}

public void testArray() {
  int[] a = { 1, 2, 3, 4, 5 };
  ensure(a).contains(3);
  ensure(a).size().either(5, 6);
  ensure(a).contains(2, 3, 4);
  ensure(a).contains().either(3, 10, 11);
  ensure(a).contains().neither(6, 7, 9);
  ensure(a).contains().any(3, 4);
  ensure(a).contains().all(3, 4, 5);
  ensure(a).isSorted();
  ensure(a).isUnique();
}
```

Starting point is always `ensure()`. You put in the actual value, then execute some operations that modify the following constraint check, then the last command is the constraint check. The last command is always the constraint check, so you can only do one check per line of code. That's not as flexible as jMock, but it is simpler and more readable and good enough.

Technically all this is very doable. Probably quite a bit of work, and most likely requires a code generator since lots of code is almost the same but not reusable (e.g. arrays for primitive data types), but that's not a problem. I have done a few simple feasibility studies and I don't see a big problem with this interface.

Please tell me what you think about this!


# Updates

From time to time I will update this page with progress reports, until I have something that is stable enough to give away.

* **2006-08-05**: I have started developing this. So far I am very happy with it, its a fun project to implement :smiley: I will probably create a project on sourceforge and opensource it, but I am not sure about the licence.
