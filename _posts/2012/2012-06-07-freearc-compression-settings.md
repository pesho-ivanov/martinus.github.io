---
author: martin.ankerl@gmail.com
comments: true
date: 2012-06-07 21:43:03+00:00
layout: post
slug: freearc-compression-settings
title: FreeArc Compression Settings
wordpress_id: 499
categories:
- programming
---

I have been playing around with compression tools for quite a while, and [FreeArc](http://freearc.org/Download-Alpha.aspx) is one of the best of the bunch. It has the best compression / runtime ratio of any compression tool I know. Here are two parameter sets I especially like:


## Fast compression

uses 4 cores to the max on a 4GB RAM machine, ~10MB per second. Compression ratio is usually above 7z max, while beeing much faster. Decompression is very fast.
    
```
-s; -ma- -m=rep:1024mb+mm+delta+dispack+4x4:lzma:50mb
```


## Maximum compression

Requires 2 pass on a 4GB RAM machine, ~1MB per second. Usually compresses better than freearc's default max compression. Decompression is fast too, and requires only one pass.

```
-s; -ma- -m=rep:2048mb+mm+delta+dispack+lzma:ultra:170mb
```

## Extreme Compression

Can take like forever, and needs executable for precomp042 and srep, and requires two temporary files that are about as large (or larger) than the whole uncompressed data set.

    
```
-s; -ma- -m=precomp042:c-:intense+srep:m3f:mem256mb+mm+dispack070+delta+lzma:max:512mb
```