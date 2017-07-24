---
author: martin.ankerl@gmail.com
comments: true
date: 2007-02-11 22:20:14+00:00
layout: post
slug: optimized-exponential-functions-for-java
title: Optimized Exponential Functions for Java
wordpress_id: 82
categories:
- programming
---

Usually microoptimization is only done in C or C++, but it works quite well in Java too. For a project I needed very fast `log()` and `exp()` calculations, and Java's `Math.log()` and `Math.exp()` just doesn't cut it. After a bit of research I have found the following approximations that are good enough for me:

**UPDATE** This `pow()` approximation is obsolete. [I have a much faster and more accurate approximation version here](/2007/10/04/optimized-pow-approximation-for-java-and-c-c/).


## Fast Exponential Function in Java


The paper "[A Fast, Compact Approximation of the Exponential Function](http://nic.schraudolph.org/pubs/Schraudolph99.pdf)" describes a C macro that does a good job at exploiting the IEEE 754 floating-point representation to calculate `e^x`. I have transformed the macro into Java code:

```java    
public static double exp(double val) {
    final long tmp = (long) (1512775 * val + 1072632447);
    return Double.longBitsToDouble(tmp << 32);
}
```

This code is **5.3 times** faster than `Math.exp()` on my computer. Beware that it is only an approximation, for a detailed analysis read [the  paper](http://citeseer.ist.psu.edu/schraudolph98fast.html).

## Fast Natural Logarithm in Java

I have found the following approximation [here](http://www.dattalo.com/technical/theory/logs.html), and there is not much information about it except that it is called "Borchardt's Algorithm" and it is from the book "Dead Reconing: Calculating without instruments". The approximation is **not very good** (some might say very bad...), it gets worse the larger the values are. But the approximation is also a monotonic, slowly increasing function, which is good enough for my use case.

```java    
public static double log(double x) {
    return 6 * (x - 1) / (x + 1 + 4 * (Math.sqrt(x)));
}
```

This approximation is **11.7 times** faster than ``Math.log()`.

## Fast Power Calculation

Equiped with these optimized functions, it is possible to do several other optimizations. For example you can replace
    
```java
Math.pow(a, b)
```

with

```java 
Math.exp(b * Math.log(a))
```

And then use the approximation functions for a highly optimized pow calculation. You can even combine the calculations and simplify it into this:
    
```java 
public static double pow(double a, double b) {
    long tmp = (long)(9076650*(a-1) / (a+1+4*(Math.sqrt(a)))*b + 1072632447);
    return Double.longBitsToDouble(tmp << 32);
}
```

This is **8.7 times** faster than the `Math.pow(a, b)`.

## Accuracy

The above functions are very inaccurate, especially the log calculation. So before you use this code you have to test it if the approximation is good enough for you!

Have fun!