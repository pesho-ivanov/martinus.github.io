---
author: martin.ankerl@gmail.com
comments: true
date: 2008-05-27 11:22:36+00:00
layout: post
link: http://martin.ankerl.com/2008/05/27/job-interview-question-sorting-records/
slug: job-interview-question-sorting-records
title: 'Job Interview Question: Sorting Records'
wordpress_id: 154
categories:
- programming
---

[Dev102.com](http://www.dev102.com/) has a few postings about interesting job interview question. [His fifth challenge](http://www.dev102.com/2008/05/26/a-programming-job-interview-challenge-5-records-sorting/) is this neat task:


<blockquote>You are asked to sort a collection of records. The records are stored in a file on the disk, and the size of the file is much bigger than available memory you can work with. Assume a record size is 10 bytes and file size is 1GB. you read and write data to/from disk in units of pages where each page is 1KB big. You have few (less than 10) available pages of physical memory. Assume you are given a method to compare two records.</blockquote>



Here is how I would approach this problem. It was just a quick direct writeup of the thoughts that popped up in my mind:





  1. Easiest solution: use Unix's [sort](http://www.softpanorama.org/Tools/sort.shtml) tool, with -S option to specify max memory usage.

  2. If this is not allowed, the second easiest solution is to implement a simple [Merge sort](http://en.wikipedia.org/wiki/Merge_sort), and use multiple passes with one temporary file until everything is sorted.

  3. If speed is an issue, you can have a pre-pass before the merge sort that loads as much data junks into memory as possible, sorts this junk with [Quicksort](http://en.wikipedia.org/wiki/Quick_Sort), and write each sorted junk back into the temporary file.

  4. If you want to go even faster, you can go crazy with 10 passes at once and use a [sorting network](http://en.wikipedia.org/wiki/Sorting_network) to merge these 10 streams. Here comes the point where you should benchmark before coding, because caching, harddisk properties etc. might have an enormous influence.


I believe this is a quite reasonable approach. It is important to have multiple solutions for a problem to select from, then you can choose the simplest one that works. This is the [Do The Simplest Thing That Could Possibly Work (DTSTTCPW)](http://martin.ankerl.com/2006/01/25/software-design-principles/) - Principle. This approach is very important in test driven development, and in general a big part of the [scientific method](http://en.wikipedia.org/wiki/Scientific_method) (see also [Occams' Razor](http://en.wikipedia.org/wiki/Occam's_Razor)). If the simplest solution is enough, that's great! If this is not enough, you can try again with the second simplest solution. Repeat until the problem is solved :-)

I have use this approach for a long time now, and its really productive. Never go for cool and interesting but complex solutions just because they are cool and interesting. These kind of solutions are just for your own ego. There are even [10 commandments for egoless programming](http://www.codinghorror.com/blog/archives/000584.html).
