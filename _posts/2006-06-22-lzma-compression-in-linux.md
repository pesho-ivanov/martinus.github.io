---
author: martin.ankerl@gmail.com
comments: true
date: 2006-06-22 18:32:45+00:00
layout: post
slug: lzma-compression-in-linux
title: LZMA Compression in Linux
wordpress_id: 63
categories:
- linux
---

[7-zip](http://http://www.7-zip.org/) has one of the best compression ratio / decompression speed ratios of the planet. Give it a try, compression ratio is a bit better than [RAR](http://www.rarlab.com/), and decompression is faster. The linux port is [p7zip](http://p7zip.sourceforge.net/).

Unfortunately you cannot use 7zip for streams like gzip or bzip2. 7zip uses LZMA as the compression routine, and it is possible to use just this high end compressor to get the best of both worlds.

This is how to get it:

1. Download LZMA SDK from [here](http://www.7-zip.org/download.html).
1. Extract it
   ```bash
   mkdir lzma
   cd lzma
   tar xjvf ../lzma443.tar.bz2
   ```
1. Compile LZMA_Alone
   ```bash
   cd C/7zip/Compress/LZMA_Alone
   make -f makefile.gcc
   ```
   You get a lot of warning, just ignore them.
1. If compilation was successful, copy lzma somewhere into your path:
   ```bash
   sudo cp lzma /usr/local/bin/
   ```

Now you are ready to compress/decompress stuff. Here are some examples, when compressing the folder gimp:

* Fast compression: 
   ```bash    
   tar -cv gimp |lzma e -a0 -d15 -fb16 -mfhc4 -si -so >gimp.tar.lzma
   ```
* Normal compression: 
   ```bash    
   tar -cv gimp |lzma e -d21 -fb32 -si -so >gimp.tar.lzma
   ```
* Maximum compression: 
   ```bash   
   tar -cv gimp |lzma e -si -so >gimp.tar.lzma
   ```
* Ultra compression: 
   ```bash   
   tar -cv gimp |lzma e -d25 -si -so >gimp.tar.lzma
   ```

And finally, this is how to extract gimp.tar.lzma:

```bash   
cat gimp.tar.lzma | lzma d -si -so | tar xv
```

Have fun!
