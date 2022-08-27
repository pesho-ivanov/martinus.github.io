---
author: martin.ankerl@gmail.com
comments: true
date: 2006-06-16 21:28:16+00:00
layout: post
slug: exception-handling-versus-logging
title: Exception Handling versus Logging
wordpress_id: 62
categories:
- programming
---

# Exceptions versus Logging

The big question is, when to use logging and when exceptions? Let me tell you a story:

Not so long ago I have been working in a Java project where I introduced [log4j](http://logging.apache.org/log4j/docs/), and was very happy to see that all the System.out.println's got removed and replaced with the much more sophisticated logging. For a while, life was good. But soon something startet to smell. At first it was a faint scent, and nobody noticed it. Then it got bigger. And bigger. And even bigger.

A huge, unbearable stench: After each run of our application, we accumulated about 20MB of logging messages. Fixing problems became increasingly difficult, even with log4j's features it was very difficult to locate the source of problems.

We decided that something needed to change. Slowly but surely, we removed most of the logging output and replaced it with exceptions that are thrown but never catched. Oh, what an uproar! Our app crashed all the time. You think that's bad? It was a blessing! Finally the developers (including me) had a motivation to fix the problems, and in the end the product got a lot more stable and everyone lived happily ever after.

# Why is logging bad?

The disadvantage of logging is that it requires user interaction, so it scales very badly. Each logged message has a probability of beeing overlooked, misunderstood, or willingly ignored. Logging requires user interaction, only if somebody is reading the logs you get something out of it.

# My Advice

* Be afraid of logging, be very afraid. It is dangerous, use it only when you have absolutely no other chance. Consider better exception handling, better Unit Tests, or simpler code instead.

* Although logging is better than writing something to the console, it's basically the same: nobody will read it anyway, it will be lost in the data nirvana.

* Fail fast and hard: If you have a problem, crash right away. Make a huge *bang* and stop working. Your customer might not like it when your application crashes sometimes, but crashing is way better than continuing to operate on erronous data, you never know to what that could lead...

* If you think you need logging for debugging purpose, try to write a Unit Test instead. This might be more difficult, but has the huge advantage of beeing automatable.


# Exception Handling Rules

Here some rules of thumb about exception handling:

* **Be Specific** - Use as specific exceptions as possible, even if you have to create a new exception subclass. (e.g. throw a ServiceUnavailableException instead of Exception)

* **Throw Early** - fail fast, throw as soon as possible. The exception becomes both more specific and more accurate.

* **Catch Late** - Never catch an exception you don't know how to handle. If you can't actually make things better by catching it, don't. Let it go up until somebody higher up does.


If you cannot handle an exception and want to avoid the [throw-the-kichen-sink](http://today.java.net/pub/a/today/2006/04/06/exception-handling-antipatterns.html) antipattern, wrap the exception up and rethrow the wrapped one. For example:


```java
try {
    // ...
} catch (CodecException e) {
    throw new ServiceComponentException(e);
} catch (OntologyException e) {
    throw new ServiceComponentException(e);
}
```

# Logging Rules

If you still have to use logging, here are some guidelines when to use which logging level:

* **Fatal** - component cannot continue or recover, and is throwing in the towel
* **Error** - errors in the component, continuing may be possible
* **Warn** - something is not ideal, but I can continue
* **Info** - information for the deployer
* **Debug** - debugging for the developer, will be removed later

# References

* [Three Rules for Effective Exception Handling](http://today.java.net/pub/a/today/2003/12/04/exceptions.html)
* [Logging Best Practices](http://www.ja-sig.org/wiki/display/UPC/LoggingBestPractices)
