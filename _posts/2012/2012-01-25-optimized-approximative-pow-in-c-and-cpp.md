---
author: martin.ankerl@gmail.com
comments: true
date: 2012-01-25 19:48:39+00:00
layout: post
slug: optimized-approximative-pow-in-c-and-cpp
title: Optimized Approximative pow() in C / C++
wordpress_id: 894
categories:
- programming
cover-img: /img/2012/01/pow.png
---

Mostly thanks to [this reddit discussion](http://www.reddit.com/r/gamedev/comments/n7na0/fast_approximation_to_mathpow/), I have updated my [pow() approximation](http://martin.ankerl.com/2007/10/04/optimized-pow-approximation-for-java-and-c-c/) for C / C++. I have now two different versions:

```cpp
inline double fastPow(double a, double b) {
  union {
    double d;
    int x[2];
  } u = { a };
  u.x[1] = (int)(b * (u.x[1] - 1072632447) + 1072632447);
  u.x[0] = 0;
  return u.d;
}
```

This new code uses the union trick, instead of the weird casting trick I've used before. This means that `-fno-strict-aliasing` is no more required any more when compiling, and it is also a bit faster because one less temporary variables is needed. When you have a little endian machine, you have to exchange `u.x[0]` with `u.x[1]`. On my PC, this version is 4.2 times faster than the much more precise `pow()`.

Besides that, I also have now a slower approximation that has much less error when the exponent is larger than 1. It makes use [exponentiation by squaring](https://secure.wikimedia.org/wikipedia/en/wiki/Exponentiation_by_squaring), which is exact for the integer part of the exponent, and uses only the exponent's fraction for the approximation:


```cpp
// should be much more precise with large b
inline double fastPrecisePow(double a, double b) {
  // calculate approximation with fraction of the exponent
  int e = (int) b;
  union {
    double d;
    int x[2];
  } u = { a };
  u.x[1] = (int)((b - e) * (u.x[1] - 1072632447) + 1072632447);
  u.x[0] = 0;

  // exponentiation by squaring with the exponent's integer part
  // double r = u.d makes everything much slower, not sure why
  double r = 1.0;
  while (e) {
    if (e & 1) {
      r *= a;
    }
    a *= a;
    e >>= 1;
  }

  return r * u.d;
}
```

This code is 3.3 times faster than `pow()`. Writing a microbenchmark is not easy, so [I have posted mine here](http://pastebin.com/DRvPJL2K). [Here is also a Java version of the more accurate pow approximation](http://pastebin.com/ZW95gEyr).

Any ideas how this could be improved? Please post them!