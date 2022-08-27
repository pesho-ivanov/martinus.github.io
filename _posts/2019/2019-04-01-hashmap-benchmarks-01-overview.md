---
layout: post
title: Hashmaps Benchmarks - Overview
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

## Table of Contents

* **[Overview](/2019/04/01/hashmap-benchmarks-01-overview/)** 👈
* Construction Benchmarks
   * [Construction & Destruction](/2019/04/01/hashmap-benchmarks-02-01-result-CtorDtorEmptyMap/)
   * [Construction & Insert 1 int & Destruction](/2019/04/01/hashmap-benchmarks-02-02-result-CtorDtorSingleEntryMap/)
* Modifying Benchmarks
   * [Insert & Erase 100M int](/2019/04/01/hashmap-benchmarks-03-01-result-InsertHugeInt/)
   * [Insert & Access with Varying Probability int](/2019/04/01/hashmap-benchmarks-03-02-result-RandomDistinct2/)
   * [Insert & Erase uint64_t](/2019/04/01/hashmap-benchmarks-03-03-result-RandomInsertErase/)
   * [Insert & Erase std::string](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/)
* Accessing
   * [Find 1 -- 2000 uint64_t](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/)
   * [Find 1 -- 500k uint64_t](/2019/04/01/hashmap-benchmarks-04-03-result-RandomFind_500000/)
   * [Find 1 -- 100k std::string](/2019/04/01/hashmap-benchmarks-04-04-result-RandomFindString/)
   * [Find 1 -- 1M std::string](/2019/04/01/hashmap-benchmarks-04-05-result-RandomFindString_1000000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-06-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----

I've spent a long time developing my [robin_hood::unordered_map](https://github.com/martinus/robin-hood-hashing), and after claiming that [it is now the fastest hashmap](https://www.reddit.com/r/cpp/comments/anbmol/robin_hoodunordered_map_is_now_the_fastest_hashmap/) I understandably got quite a few skeptic comments. Some of the comments were quite right, and my benchmarks were not as unbiased as they could be, I did not test as many unordered maps as I should have, my compiler options were not choosen well, and so on.

That's why I have now spent considerable time to create a highly improved benchmarks, where I have tried to remedy ~~all~~ most of the critique that I got. The results are not as flattering to my [robin_hood::unordered_map](https://github.com/martinus/robin-hood-hashing), but I am still very pleased with the results.

# What is actually Benchmarked?

This benchmark has evalued 20 different unordered_map implementations, each with 5 different hashing implementations. So there are a total of 20*5 = 100 hashmap variants to benchmark. Each of this 100 hashmaps was evaluated in 10 different benchmarks, so in total 1000 benchmark evaluations. I ran each benchmark 9 times and show the median, to filter out any outliers. So in total I ran 9000 benchmarks, which took about 6 days on my Intel i7-8700 at 3200 MHz. To get highly accurate results, I've [isolated a core to only benchmarking](https://perf.readthedocs.io/en/latest/system.html), and [disabled all frequency scaling](https://perf.readthedocs.io/en/latest/system.html).

## Hashmaps

* [Google's Abseil](https://abseil.io/docs/cpp/guides/container)'s `abseil::flat_hash_map`, `abseil::node_hash_map`. They are brand new, and have just recently pushed the boundary on what's possible to achieve for unordered_maps. It uses several interesting optimizations, described in [CppCon 2017: Matt Kulukundis “Designing a Fast, Efficient, Cache-friendly Hash Table, Step by Step](https://www.youtube.com/watch?v=ncHmEUmJZf4).
* [boost multiindex](https://www.boost.org/doc/libs/1_69_0/libs/multi_index/doc/index.html): `boost::multi_index::hashed_unique`. Boost.MultiIndex is a versatile container that is highly configurable, it's main features is not speed but it's versatility. It is not a straight forward `std::unordered_map` replacement, the implementation for the wrapper was thankfully provided by [joaquintides](https://github.com/martinus/map_benchmark/issues/2).
* [Boost's unordered map](https://www.boost.org/doc/libs/1_69_0/doc/html/boost/unordered_map.html) `boost::unordered_map` is very similar to `std::unordered_map`, just boosts (older) version before `std::unordered_map` was a thing. I've tested with boost version 1.65.1.
* [EASTL](https://github.com/electronicarts/EASTL) has `eastl::hash_map`. The Electronic Arts Standard Template Library, an STL implementation with emphasis on high performance. It seems to be a bit dated though.
* [Facebook's folly](https://github.com/facebook/folly): `folly::F14ValueMap` and `folly::F14NodeMap`. C++14 conform and high performance in mind. The maps are described in the [F14 Hash Table](https://github.com/facebook/folly/blob/master/folly/container/F14.md) document.
* [greg7mdp's parallel hashmap](https://github.com/greg7mdp/parallel-hashmap): `phmap::flat_hash_map` and `phmap::node_hash_map` are closely based on Abseil's map, but simpler to integrate since they are header only. `phmap::parallel_flat_hash_map` and `phmap::parallel_node_hash_map` use a novel improvement that makes the maps a tad slower but usable in parallel. Also, peak memory requirements are a bit lower. Read more in "[The Parallel Hashmap](https://greg7mdp.github.io/parallel-hashmap/)".
* [greg7mdp's sparsepp](https://github.com/greg7mdp/sparsepp): `spp::sparse_hash_map` tuned to be memory efficient.
* [ktprime's HashMap](https://github.com/ktprime/ktprime): A rather unknown implementation `emilib1::HashMap` by [/u/huangyuanbing](https://www.reddit.com/user/huangyuanbing). It might not be as stable and well tested as other implementations here, but the numbers look very promising.
* [martinus's robin-hood-hashing](https://github.com/martinus/robin-hood-hashing): A single-file header-only implementation that contains `robin_hood::unordered_flat_map` and `robin_hood::unordered_node_map`. I am the author of the maps, so I might not be perfectly unbiased... The numbers won't lie though, and I try to be as objective as possible.
* [Malte Skarupke's Bytell Map](https://github.com/skarupke/flat_hash_map) After first claiming [I Wrote The Fastest Hashtable](https://probablydance.com/2017/02/26/i-wrote-the-fastest-hashtable/) and later [A new fast hash table in response to Google’s new fast hash table](https://probablydance.com/2018/05/28/a-new-fast-hash-table-in-response-to-googles-new-fast-hash-table/), his maps `ska::flat_hash_map` and `ska::bytell_hash_map` are obvious choices for this benchmark.
* [std::unordered_map](https://en.cppreference.com/w/cpp/container/unordered_map) Of course, the standard implementation of `std::unordered_map` has to be included has well Since I am using g++ 8.2, this uses the libstdc++ implementation.
* [tessil's maps](https://tessil.github.io/): Tessil has done lots and lots of work on hashmaps, in all kinds of flavours. Here I am benchmarking `tsl::hopscotch_map`, `tsl::robin_map`, and `tsl::sparse_map`. They are all available [on github](https://github.com/Tessil).

## Hashes

Some hashmap implementations come with their own hashing methods, each with different properties. In my benchmarks I have used either integral types like `int` or `uint64_t`, and `std::string` as the keys.

* [Abseil's Hash](https://abseil.io/docs/cpp/guides/hash) `absl:Hash`: An extremely fast hash, that works very well in all situations I have tested.
* [FNV1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function#FNV-1a_hash) A very simple hash that is used by Microsoft in  Visual Studio 2017. Interestingly, they even use this byte-wise hash for integral types. My benchmark has its own implementation, but in my experiments it has produced the same assembler code as the original Microsoft variant.
* [Folly's Hash](https://github.com/facebook/folly/tree/master/folly/hash) `folly::hasher`: Unfortunately I could not find any documentation. It seems to be well optimized and uses native crc instruction if available. Unfortunately the result is only a 32bit hash which can work badly for some hashmap variants.
* [libstdc++-v3](https://github.com/gcc-mirror/gcc/blob/master/libstdc++-v3/include/bits/functional_hash.h) simply casts integral types to `size_t` and uses this as a hash function. It is obviously the fastest hash, but many hashmap implementations rely on a somewhat good avalanching hash quality so this seems to be a rather bad choice.
* [martinus's robin-hood-hashing](https://github.com/martinus/robin-hood-hashing) `robin_hood::hash` is based on abseil's hash for integral types, with minor modifications.

# How is benchmarked?

## Build

* I've used g++ 8.2.0 with `-O3 -march=native`:
  ```sh
  g++-8 (Ubuntu 8.2.0-1ubuntu2~18.04) 8.2.0
  ```
* CMake build is done with `Release` mode
* and I've set `FOLLY_CXX_FLAGS` to `-march=native`.
* For the `ktprime` map benchmarks I had to add `-fno-strict-aliasing`.

## System Configuration

* All benchmarks were run on an Linux. `uname -a` output:
  ```
  Linux dualit 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
  ```
* Processor Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz, locked to 3200 MHz.
* Isolated a core with it's hyperthreading companion by editing `/etc/default/grub` and changing `GRUB_CMDLINE_LINUX_DEFAULT` so it looks like this:
  ```sh
  GRUB_CMDLINE_LINUX_DEFAULT="quiet splash isolcpus=5,11 rcu_nocbs=5,11"
  ```
* Turbo boost and frequency scaling were disabled with the python tool [perf](https://perf.readthedocs.io/en/latest/) with the command
  ```sh
  sudo python3 -m perf system tune
  ```
  This sets cores 5 and 11 to 3200 MHz, sets scaling governor to *performance*, disables Turbo Boost, sets irqbalances service to inactive, IRQ affinity to all CPUs except 5 and 11.
* Each benchmarks is run in a separately started process.
* Isolated cores are used with `taskset -c 5,11`
* To get rid of any potential outliers and to average effects of [ASLR](https://en.wikipedia.org/wiki/Address_space_layout_randomization), all benchmarks were run 9 times and I show only the median result.

# Benchmarks

Enough talk, onwards to the benchmarks!