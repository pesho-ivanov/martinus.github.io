---
author: martin.ankerl@gmail.com
comments: true
date: 2009-04-16 06:11:00+00:00
layout: post
slug: java-challenge-the-mysterious-method-wrapper
title: Java Challenge - The Mysterious Method Wrapper
wordpress_id: 209
categories:
- programming
---

Here is the challenge. Create some Java code so that this [JUnit](http://www.junit.org/) test works:


```java    
public class EachMethodTest {

    /**
     * Simple test object.
     */
    public static class Fu {
        @Callable
        public int fu() {
            return 1;
        }

        @Callable
        public int bar() {
            return 2;
        }
    }

    /**
     * Call all methods that have the @Callable annotation.
     * The MethodsToProc works for ANY type of object, not just Fu.
     */
    @Test
    public void eachMethodTest() {
        final Fu fu = new Fu();

        int sum = 0;
        for (final Proc<integer> c : new MethodsToProc<integer>(fu)) {
            sum += c.call();
        }

        Assert.assertEquals(3, sum);
    }
}
```

Basically what I want to do is be able to automatically create wrappers for some object, so that each method with the `@Callable` can be called with a single common wrapper interface `call()`. It should be possible to specify the return type via Generics, and the ctor of `MethodsToProc` should be able to take any type of object.

See if you can do a general solution without cheating! The simpler, the better. You can post code snippets e.g. at [snipit](http://snipt.org/) or [gist](http://gist.github.com/). Have fun!