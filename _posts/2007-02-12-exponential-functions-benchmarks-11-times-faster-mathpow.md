---
author: martin.ankerl@gmail.com
comments: true
date: 2007-02-12 15:26:53+00:00
layout: post
slug: exponential-functions-benchmarks-11-times-faster-mathpow
title: 'Exponential Functions: Benchmarks, 8 Times Faster Math.pow()'
wordpress_id: 83
categories:
- programming
tags:
- approximation
- benchmark
- java
- math
- pow
---

I have updated the code for the Math.pow() approximation, now it is 11 times faster on my Pentium IV. Read [Optimized Exponential Functions for Java  ](http://martin.ankerl.com/2007/02/11/optimized-exponential-functions-for-java/) for more information. Now I can also give you some benchmarks:

## Benchmarks

### Math.log() -- 11.7 times faster

* 6.233 sec, `Math.log(x)`
* 0.531 sec, `6*(x-1)/ (x + 1 + 4*(Math.sqrt(x)))`

### Math.exp() -- 5.3 times faster

* 5.920 sec, `Math.exp(x)`
* 1.108 sec, `exp` optimized with IEEE 754 trick

### Math.pow() -- 8.7 times faster

* 15.967 sec, `Math.pow(a, b)`
* 11.014 sec, `e^(b * log(a))`
* 7.607 sec, `e^(b * log(a))` + IEEE 754 trick
* 2.109 sec, `e^(b * log(a))` + IEEE 754 trick + LOG approximation
* 1.827 sec, simplified everything, see [Optimized Exponential Functions for Java  ](http://martin.ankerl.com/2007/02/11/optimized-exponential-functions-for-java/)

For accurate measurements I have performed each calculation 20 million times and used a random number generator to prevent optimization. I have measured the overhead of iterating and random number generation (3.969 sec) and substracted this from each measurement so that only the pure functional code is measured.