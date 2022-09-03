---
layout: post
title: Hashmap Benchmarks 2022
subtitle: With lots of benchmarks
cover-img: /img/2022/wanderfalke_edit.jpg
---

It's been over 3 years since I've spent considerable time finding [the best C++ hashmap](/2019/04/01/hashmap-benchmarks-01-overview/). After several requests I finally gave in and redid the benchmark with state of C++ hashmaps as of August 2022. This took much more work than I initially anticipated, mostly due to the fact that benchmarks take a looong time, and writing everything up and creating a representation that is actually useful takes even more time. Thanks everyone who
annoyingly kept asking me for updates :wink:

# Table of Contents <!-- omit in toc -->

- [Benchmark Infrastructure](#benchmark-infrastructure)
  - [Hardware](#hardware)
  - [Software](#software)
- [Benchmark Results Table](#benchmark-results-table)
- [Benchmark Result Analysis](#benchmark-result-analysis)
  - [Containers](#containers)
  - [Hashes](#hashes)
  - [Allocators](#allocators)
  - [Benchmark & Results](#benchmark--results)
- [Conclusion](#conclusion)

This time I have evaluated 29 different hashmaps + allocator variants. Each of these was combined with 6 differend hashes, resulting in 174 different combinations to benchmark. Each of these combinations was evaluated in 11 different benchmarks, totaling in 1914 benchmark evaluations. This almost doubles the number of benchmarks from my evaluation in 2019.

# Benchmark Infrastructure

## Hardware
* All benchmarks ran on an Intel i7-8700, locked at 3200 MHz.
* The benchmarks ran on an [isolated core dedicated to benchmarking](https://pyperf.readthedocs.io/en/latest/system.html)
* I disabled frequency scaling and turbo boost.
* the PC was kept completely idle otherwise while running the benchmarks.

## Software

* I used Manjaro Linux with an up to date kernel.
* All benchmarks are done with clang++ 13, which at that time was the default compiler on Manjaro Linux.
* I used the compile flags `-O3 -march=native`.
* Each benchmark was run multiple times, and I'm using the median so outliers are not an issue.


# Benchmark Results Table

Each column shows benchmark runtime normalized to 100 for the best performer. So 100 means fastest, 110 means 10% slower than the fastest. The last 3 rows show summarized results. Click a row for sorting, enter text in map/hash field for filtering.

<link href="https://unpkg.com/tabulator-tables/dist/css/tabulator_semanticui.min.css" rel="stylesheet">
<script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
<style>
.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort="ascending"] {
  background-color: #DAE1E7;
}
.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort="descending"] {
  background-color: #DAE1E7;
}
.martinus_big_table {
  width: 90vw;
  position: relative;
  left: calc(-45vw + 50%);
}
.martinus_highlight {
    font-weight: bolder;
}
</style>
<a name="table" />
<div id="table_map_benchmark" class="martinus_big_table ui very compact black celled table" />
<script type="text/javascript" src="/files/2022/map_benchmark.js"></script>

# Benchmark Result Analysis

## Containers

### <a name="absl__flat_hash_map"/> absl::flat_hash_map [↑](#table)

Google's Abseil's `absl::flat_hash_map` stores `value_type` directly in the slot array, and Google recommends these for general use. They were brand new in 2019 and pushed the boundary on what's possible to achieve for unordered_maps. It uses several interesting optimizations, described in [CppCon 2017: Matt Kulukundis “Designing a Fast, Efficient, Cache-friendly Hash Table, Step by Step](https://www.youtube.com/watch?v=ncHmEUmJZf4).

The Good
: 3 years ago `absl::flat_hash_map` was one of the fastest maps. It still is quite fast, and seems to perform especially well for large maps. This map and `gtl::flat_hash_map`, which is based on that map, are the fastest in the **RandomFind_500000** benchmark. Find is reasonably fast, especially for strings.

The Bad
: Copying and iterating the map is comparatively slow. The map is highly sensitive to the used hash, and benchmarks are incredibly slow (timeout) out when bad hash is used. E.g. `std::hash` or `boost::hash` for number types.

About
: Website:<a href="https://abseil.io/docs/cpp/guides/container">https://abseil.io/docs/cpp/guides/container</a>, Tested version: [736458b5 (master)](https://github.com/abseil/abseil-cpp), License: `Apache License 2.0`


### <a name="absl__node_hash_map"/> absl::node_hash_map [↑](#table)

Google's [absl::node_hash_map](https://abseil.io/docs/cpp/guides/container) is a near drop-in replacement for `std::unordered_map` with stable pointers & references. Bound to be a bit slower than `absl::flat_hash_map` due to the indirection.

The Good
: Being node based pointers & references are stable. Search performance is still very good, there is only little slowdown compared to `absl::flat_hash_map`. 

The Bad
: Memory usage, copying, inserting elements is very slow, even much slower than `std::unordered_map`.

About
: Website:<a href="https://abseil.io/docs/cpp/guides/container">https://abseil.io/docs/cpp/guides/container</a>, Tested version: [736458b5 (master)](https://github.com/abseil/abseil-cpp), License: `Apache License 2.0`

### <a name="ankerl__unordered_dense__map" /> ankerl::unordered_dense::map [↑](#table)

Full disclaimer: I'm the author! This map is designed to be very fast, simple, but still feature rich. It achieves that by combining ideas from `robin_hood::unordered_flat_map` and using a simple `std::vector` as storage. Iteration is therefore as fast as it gets since all data is stored linearly in memory. I consider this implementation as a successor of my old robin_hood map.

The Good
: The map is an excellent allrounder. Search is very fast, string search is fastest in one benchmark. Iteration speed is unbeatable because all the data lies in a contiguous block of memory. It has support for custom allocators, custom containers, and fancy pointers. It is e.g. possible to simply replace the internally used `std::vector` with other types to make use of shared memory.

The Bad
: Removing an element can be relatively slow, since it requires two lookups because the map keeps a densely stored vector at all times.

About
: Website: <a href="https://github.com/martinus/unordered_dense">https://github.com/martinus/unordered_dense</a>, Tested version: [v1.0.2](https://github.com/martinus/unordered_dense), License: `MIT License`


### <a name="boost__multi_index__hashed_unique" /> boost::multi_index::hashed_unique [↑](#table)

Boost's [boost::multi_index](https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html) library is extremely powerful. You can use multiple indices at once. In this benchmark I'm just using `boost::multi_index::hashed_unique` to see how well it performs.

The Good
: Lookup is reasonably fast, and memory usage is ok. If you need multiple indices for the same data this is the most user friendly choice.

The Bad
: Copying the map is really slow - 100 times slower than `ankerl::unordered_dense::map`.

About
: Website:<a href="https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html">https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html</a>, Tested version: [1.80.0](https://github.com/boostorg/boost), License: `Boost Software License 1.0`

### <a name="boost__unordered_map" /> boost::unordered_map [↑](#table)

In version 1.80 there has been a complete rewrite of `boost::unordered_map`. That was actually the main reason why I have decided to redo this whole benchmark. It comes with extensive documentation and [benchmarks](https://www.boost.org/doc/libs/1_80_0/libs/unordered/doc/html/unordered.html#benchmarks). I took the opportunity to test the map, and also try it with different allocators as my initial experiments indicated quite a big performance difference with a specialized allocator.

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html">https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html</a>, Tested version: [1.80.0](https://github.com/boostorg/boost), License: `Boost Software License 1.0`

### <a name="boost__unordered_map_PoolAllocator" /> boost::unordered_map & PoolAllocator [↑](#table)

TODO `boost::unordered_map` with [PoolAllocator](https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h)
: Since boost::unordered_map is node based, it has to allocate one node for each element. Thus it can potentially gain a lot from a custom allocator. I actually wrote `PoolAllocator` for Bitcoin, where an `std::unordered_map` is heavily used and using this `PoolAllocator` [speeds up initial block indexing significantly](https://github.com/bitcoin/bitcoin/pull/25325).

The Good
: TODO

The Bad
: TODO

About
: Website: <a href="https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h">https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h</a>, Tested version: `644b2fa (master)`, License: `MIT License`

### <a name="boost__unordered_map_unsynchronized_pool_resource" /> boost::unordered_map & boost::container::pmr::unsynchronized_pool_resource [↑](#table)

Boost comes with its own implementation of [Polymorphic Memory Resources](https://www.boost.org/doc/libs/1_80_0/doc/html/container/cpp_conformance.html#container.cpp_conformance.polymorphic_memory_resources), which should behave similar to `PoolAllocator`. And it does, at least for find. I wouldn't expect any differenc there anyways.

The Good
: It's boost's own implementation, and it gives a big speedup for inserting elements, and is also much faster than a plain `boost::unordered_map` when many inserts & erase happen. Using this custom allocator also brings down memory usage quite a lot, because it doesn't have to pay the malloc overhead for each node.

The Bad
: The time to copy the map is about the same than without a custom allocator. In comparison, with `PoolAllocator` the performnace here is almost doubled, this looks like a lost opportunity to me!

About
: Website:<a href="https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html">https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html</a>, Tested version: [1.80.0](https://github.com/boostorg/boost), License: `Boost Software License 1.0`

### <a name="emhash7__HashMap" /> emhash7::HashMap [↑](#table)

[emhash7::HashMap](https://github.com/ktprime/emhash) These are very high performance hashmaps and the author is constantly updating them. There are different versions of the maps with different propertices concerning performance vs. memory. This map has very fast iteration speed.

TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/ktprime/emhash">https://github.com/ktprime/emhash</a>, Tested version: `9a3f7189 (master)`, License: `MIT License`

### <a name="emhash8__HashMap" /> emhash8::HashMap [↑](#table)

[emhash8::HashMap](https://github.com/ktprime/emhash) Another variant of the emhash map with different memory & performance properties
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/ktprime/emhash">https://github.com/ktprime/emhash</a>, Tested version: `9a3f7189 (master)`, License: `MIT License`

### <a name="folly__F14NodeMap" /> folly::F14NodeMap [↑](#table)

[folly::F14NodeMap](https://github.com/facebook/folly) A supposedly high performance hashmap implementation from Facebook / Meta. It stores values indirectly, calling malloc for each node.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/facebook/folly">https://github.com/facebook/folly</a>, Tested version: `v2022.06.27.00`, License: `Apache License 2.0`

### <a name="folly__F14ValueMap" /> folly::F14ValueMap [↑](#table)

[folly::F14ValueMap](https://github.com/facebook/folly) A supposedly high performance hashmap implementation from Facebook / Meta. It stores values directly.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/facebook/folly">https://github.com/facebook/folly</a>, Tested version: `v2022.06.27.00`, License: `Apache License 2.0`

### <a name="fph__DynamicFphMap" /> fph::DynamicFphMap [↑](#table)

[fph::DynamicFphMap](https://github.com/renzibei/fph-table) A very interesting new contender: This hashmap implementation uses a perfect hash, thus it doesn't have any collisions. This should make it extremely fast for lookups, but with a potentially high overhead for insert/removal. 
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/renzibei/fph-table/tree/noseed">https://github.com/renzibei/fph-table/tree/noseed</a>, Tested version: `1a613aba (noseed)`, License: `none specified`

### <a name="gtl__btree_map" /> gtl::btree_map [↑](#table)

[gtl::btree_map](https://github.com/greg7mdp/gtl#btree-containers) Containers from greg's template library. This is actually not a hashmap at all, but it is an ordered container much like `std::map`. I added this one to see if it is possible if non-hashmap implementations could compete in this benchmark.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/gtl">https://github.com/greg7mdp/gtl</a>, Tested version: `v1.1.2`, License: `Apache License 2.0`

### <a name="gtl__flat_hash_map" /> gtl::flat_hash_map [↑](#table)

[gtl::flat_hash_map](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md)
: A hashmap implementation based on Google's Abseil. It lists changes to the original implementation [here](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md#changes-to-abseils-hashmaps). This one is the flat variant.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/gtl">https://github.com/greg7mdp/gtl</a>, Tested version: `v1.1.2`, License: `Apache License 2.0`

### <a name="gtl__node_hash_map" /> gtl::node_hash_map [↑](#table)

[gtl::node_hash_map](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md) The node map based on google abseil's `absl::node_hash_map`.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/gtl">https://github.com/greg7mdp/gtl</a>, Tested version: `v1.1.2`, License: `Apache License 2.0`

### <a name="gtl__parallel_flat_hash_map" /> gtl::parallel_flat_hash_map [↑](#table)

[gtl::parallel_flat_hash_map](https://github.com/greg7mdp/gtl#parallel-hash-containers) The parallel variants of the hashmaps have reduced peak memory usage and multithreading support. This is done by splitting up the data into multiple sub-hashmaps. See [Parallel hash containers provided by gtl](https://github.com/greg7mdp/gtl/blob/main/docs/phmap.md) for more information.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/gtl">https://github.com/greg7mdp/gtl</a>, Tested version: `v1.1.2`, License: `Apache License 2.0`

### <a name="gtl__parallel_node_hash_map" /> gtl::parallel_node_hash_map [↑](#table)

[gtl::parallel_node_hash_map](https://github.com/greg7mdp/gtl#parallel-hash-containers) The node variant of the parallel hashmap.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/gtl">https://github.com/greg7mdp/gtl</a>, Tested version: `v1.1.2`, License: `Apache License 2.0`

### <a name="jg__dense_hash_map" /> jg::dense_hash_map [↑](#table)

[jg::dense_hash_map](https://github.com/Jiwan/dense_hash_map) A simple replacement for `std::unordered_map` with better performance but loose stable addressing as a trade-off. This too is a new contender, see below how well it fares!
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/Jiwan/dense_hash_map">https://github.com/Jiwan/dense_hash_map</a>, Tested version: `74277fc4 (master)`, License: `MIT License`

### <a name="robin_hood__unordered_flat_map" /> robin_hood::unordered_flat_map [↑](#table)

[robin_hood::unordered_flat_map](https://github.com/martinus/robin-hood-hashing) Full disclaimer: I'm the author! This is a flat map that is very fast, and I have spent considerable time optimizing it. At that point though it has become hard for me to further support it, and will only provide bug fixes. I consider `ankerl::unordered_dense::map` its successor!
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/martinus/robin-hood-hashing">https://github.com/martinus/robin-hood-hashing</a>, Tested version: `3.11.5`, License: `MIT License`

### <a name="robin_hood__unordered_node_map" /> robin_hood::unordered_node_map [↑](#table)

[robin_hood::unordered_node_map](https://github.com/martinus/robin-hood-hashing) Similar to `robin_hood::unordered_flat_map`, but with stable references & pointers. To make this fast it uses a specialized allocator implementation.
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/martinus/robin-hood-hashing">https://github.com/martinus/robin-hood-hashing</a>, Tested version: `3.11.5`, License: `MIT License`

### <a name="ska__bytell_hash_map" /> ska::bytell_hash_map [↑](#table)

[ska::bytell_hash_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/skarupke/flat_hash_map">https://github.com/skarupke/flat_hash_map</a>, Tested version: `2c468743 (master)`, License: `Boost Software License 1.0`

### <a name="ska__flat_hash_map" /> ska::flat_hash_map [↑](#table)

[ska::flat_hash_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/skarupke/flat_hash_map">https://github.com/skarupke/flat_hash_map</a>, Tested version: `2c468743 (master)`, License: `Boost Software License 1.0`

### <a name="spp__sparse_hash_map" /> spp::sparse_hash_map [↑](#table)

[spp::sparse_hash_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/greg7mdp/sparsepp">https://github.com/greg7mdp/sparsepp</a>, Tested version: `1.22`, License: `modified MIT`

### <a name="std__unordered_map" /> std::unordered_map [↑](#table)

[std::unordered_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://gcc.gnu.org/onlinedocs/libstdc++/">https://gcc.gnu.org/onlinedocs/libstdc++/</a>, Tested version: `v3`, License: [modified GPL](https://gcc.gnu.org/onlinedocs/libstdc++/manual/license.html)

### <a name="std__unordered_map__PoolAllocator" /> std::unordered_map & PoolAllocator [↑](#table)

`std::unordered_map` & [PoolAllocator](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website: <a href="https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h">https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h</a>, Tested version: `644b2fa (master)`, License: `MIT License`

### <a name="std__unordered_map__unsynchronized_pool_resource" /> std::unordered_map & std::pmr::unsynchronized_pool_resource [↑](#table)

`std::unordered_map` & [std::pmr::unsynchronized_pool_resource](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://gcc.gnu.org/onlinedocs/libstdc++/">https://gcc.gnu.org/onlinedocs/libstdc++/</a>, Tested version: `v3`, License: [modified GPL](https://gcc.gnu.org/onlinedocs/libstdc++/manual/license.html)

### <a name="tsl__hopscotch_map" /> tsl::hopscotch_map [↑](#table)

[tsl::hopscotch_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/Tessil/hopscotch-map">https://github.com/Tessil/hopscotch-map</a>, Tested version: `v2.3.0`, License: `MIT license `

### <a name="tsl__robin_map" /> tsl::robin_map [↑](#table)

[tsl::robin_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/Tessil/robin-map">https://github.com/Tessil/robin-map</a>, Tested version: `1.0.1`, License: `MIT License`

### <a name="tsl__sparse_map" /> tsl::sparse_map [↑](#table)

[tsl::sparse_map](TODO) TODO
TODO

The Good
: TODO

The Bad
: TODO

About
: Website:<a href="https://github.com/Tessil/sparse-map">https://github.com/Tessil/sparse-map</a>, Tested version: `v0.6.2`, License: `MIT license`

## Hashes

### <a name="std__hash" /> std::hash [↑](#table)

TODO

### <a name="boost__hash" /> boost::hash [↑](#table)

TODO

### <a name="absl__Hash" /> absl::Hash [↑](#table)

TODO

### <a name="ankerl__unordered_dense__hash" /> ankerl::unordered_dense::hash [↑](#table)

TODO

### <a name="robin_hood__hash" /> robin_hood::hash [↑](#table)

TODO

### <a name="mumx" /> mumx [↑](#table)

## Allocators

### PoolAllocator

TODO

### std::pmr::unsynchronized_pool_resource [↑](#table)

TODO

### boost::container::pmr::unsynchronized_pool_resource [↑](#table)

[boost::container::pmr::unsynchronized_pool_resource](https://www.boost.org/doc/libs/1_80_0/doc/html/boost/container/pmr/unsynchronized_po_idm19164.html)

TODO

## Benchmark & Results

### Copy

### InsertHugeInt

### RandomDistinct2

### RandomInsertErase

### RandomFind_200

### RandomFind_2000

### RandomFind_500000

### RandomInsertEraseStrings

### RandomFindString

### RandomFindString_1000000

### geometric mean number find

### geometric mean string find

### geometric mean all

# Conclusion

TODO
