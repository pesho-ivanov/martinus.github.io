---
author: martin.ankerl@gmail.com
comments: true
date: 2016-09-15 06:32:39+00:00
layout: post
link: http://martin.ankerl.com/2016/09/15/very-fast-hashmap-in-c-part-1/
slug: very-fast-hashmap-in-c-part-1
title: 'Very Fast HashMap in C++: Hopscotch & Robin Hood Hashing (Part 1)'
wordpress_id: 1581
categories:
- programming
---

  * [Part 1: Hopscotch & Robin Hood Hashing](http://martin.ankerl.com/2016/09/15/very-fast-hashmap-in-c-part-1/)


  * [Part 2: Implementation Variants](http://martin.ankerl.com/2016/09/21/very-fast-hashmap-in-c-part-2/)


  * [Part 3: Benchmark Results](http://martin.ankerl.com/2016/09/21/very-fast-hashmap-in-c-part-3/)




* * *



A while ago I've spent significant time researching and implementing a fast [Hopscotch](https://en.wikipedia.org/wiki/Hopscotch_hashing) hash table for C++. My current source code can be found in my github repository at [martinus/robin-hood-hashing](https://github.com/martinus/robin-hood-hashing). After spending some time optimizing, I am mostly happy with the results. Insertion time is much faster than [std::unordered_map](http://en.cppreference.com/w/cpp/container/unordered_map) and it uses far less memory.


# Benchmarks


In this simple benchmark I have measured time while sequentially adding an entry (int -> int) to the hashmap, similar to [incise.org's benchmark](http://incise.org/hash-table-benchmarks.html). As a hash function, I am using [std::hash](http://en.cppreference.com/w/cpp/utility/hash):

[![hopscotch_std_time](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_std_time.png)](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_std_time.png)
Whenever a jump occurs, the hashmap got too full and it is reallocating. Interestingly, std::unordered_map has to allocate memory whenever it inserts an element (since it's a linked list), while the Hopscotch hash table only allocates once and uses that memory.

[![hopscotch_std_mem](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_std_mem.png)](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_std_mem.png)

I am using Visual Studio 2015 Update 3, 64 bit, Intel i5-4670 @ 3.4GHZ. Here is a comparison table (best values **bold**)

<table >
<tr >HashtableTime insert 30M integersMemory insert 30M integersTime query 30M existingTime query 30M nonexisting</tr>
<tr >unordered_map
<td >11.56 sec (100%)
</td>
<td >1493 MB (100%)
</td>
<td >1.84 sec (100%)
</td>
<td >1.92 sec (100%)
</td></tr>
<tr >Hopscotch
<td >**3.44 sec (30%)**
</td>
<td >**321 MB (22%)**
</td>
<td >**1.50 sec (81%)**
</td>
<td >**1.48 sec (77%)**
</td></tr>
</table>

Insertion is really fast and much more efficient, query time is also a bit faster than std::unordered_map, even though we need to check the hop bitmap of 32 elements.



# Robin Hood Hashing vs. Hopscotch


After contemplating a while, I have come to the conclusion that Hopscotch is just a bad version of [Robin Hood Hashing](http://codecapsule.com/2013/11/11/robin-hood-hashing/). Here is my reasoning:




  1. Hopscotch's bitmap naturally has to be quite sparse. For a perfectly full hashmap, where each bucket contains a corresponding entry, of the 32 hop bits there will be just a single bit that is set to 1. Wikipedia has a [nice representation](https://en.wikipedia.org/wiki/Hopscotch_hashing): [![hopscotch-wiki-example](http://martin.ankerl.com/wp-content/uploads/2016/09/Hopscotch-wiki-example.png)](http://martin.ankerl.com/wp-content/uploads/2016/09/Hopscotch-wiki-example.png)


  2. Is there a better way to represent the hop bitmap? On way would be a linked list of offsets. Unfortunately, linked lists are not very cache friendly.


  3. To store the linked list more efficiently, we can put them into an array. How about just storing the offsets next to the buckets? So the above example from a) could be stored like this: [![hopscotch_as_offsetarray](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_as_offsetarray.png)](http://martin.ankerl.com/wp-content/uploads/2016/09/hopscotch_as_offsetarray.png)
Will this work? Surprisingly, yes! When querying for an element, we just need to sequentially check the offsets. Say we want to check if 'b' is in the map:


    1. We hash 'b' and get index 6. 

    2. The offset at index 6 is 0: That means at index 6 is an element that actually belongs there: It's not b, so we have to continue checking.

    3. At index 7 we would expect an offset 1 if it contains an element that was indexed to 6. Since it is taken by something else, it will have a higher value, so we are certain this is not the bucket we are looking for.

    4. At index 8 we expect an offset 2 if it contains an element that was indexed to 6. It is to, so check the value, and bam! We found the element.


If we query an element that is not in the map, we just need to check hop size offsets.


  4. All this sounds increasingly similar to Robin Hood Hashing. Once we have the offset, we can use it as clever as robin hood hashing does: It enables us to use the cool "take from the rich" algorithm. So now we can ditch the hop size, and just keep swapping elements exactly like robin hood hashing does.



# What now?


With these insights, I believe I have a great idea to implement a highly efficient variant of the robin hood hash table, that takes some ideas from the hopscotch implementation. In my next post, [part 2](http://martin.ankerl.com/2016/09/21/very-fast-hashmap-in-c-part-2/), I will explain these ideas and (hopefully) have a fantastically fast and memory efficient hash table in my repository.

