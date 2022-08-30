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

<link href="https://unpkg.com/tabulator-tables/dist/css/tabulator_semanticui.min.css" rel="stylesheet">
<script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
<style>
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

### <a name="absl__flat_hash_map"/> [↑](#table) absl::flat_hash_map

Overview
: Google's Abseil's [absl::flat_hash_map](https://abseil.io/docs/cpp/guides/container) stores `value_type` directly in the slot array, and Google recommends these for general use. They were brand new in 2019 and pushed the boundary on what's possible to achieve for unordered_maps. It uses several interesting optimizations, described in [CppCon 2017: Matt Kulukundis “Designing a Fast, Efficient, Cache-friendly Hash Table, Step by Step](https://www.youtube.com/watch?v=ncHmEUmJZf4).

The Good
: 3 years ago `absl::flat_hash_map` was one of the fastest maps. It still is quite fast, and seems to perform especially well for large maps. This map and `gtl::flat_hash_map`, which is based on that map, are the fastest in the **RandomFind_500000** benchmark. Find is reasonably fast, especially for strings.

The Bad
: Copying and iterating the map is comparatively slow. The map is highly sensitive to the used hash, and benchmarks are incredibly slow (timeout) out when bad hash is used. E.g. `std::hash` or `boost::hash` for number types.


### <a name="absl__node_hash_map"/> [↑](#table) absl::node_hash_map

Overview
: Google's [absl::node_hash_map](https://abseil.io/docs/cpp/guides/container) is a near drop-in replacement for `std::unordered_map` with stable pointers & references. Bound to be a bit slower than `absl::flat_hash_map` due to the indirection.

The Good
: Being node based pointers & references are stable. Search performance is still very good, there is only little slowdown compared to `absl::flat_hash_map`. 

The Bad
: Memory usage, copying, inserting elements is very slow, even much slower than `std::unordered_map`.

### <a name="ankerl__unordered_dense__map" /> [↑](#table) ankerl::unordered_dense::map

Overview
: Full disclaimer: I'm the author! This map is designed to be very fast, simple, but still feature rich. It achieves that by combining ideas from `robin_hood::unordered_flat_map` and using a simple `std::vector` as storage. Iteration is therefore as fast as it gets since all data is stored linearly in memory. I consider this implementation as a successor of my old robin_hood map.

The Good
: The map is an excellent alrounder. Search is very fast, string search is fastest in one benchmark. Iteration speed is unbeatable. It has support for custom allocators and custom containers (you can replace the internally used `std::vector` with other types)

The Bad
: Removing an element can be relatively slow, since it requires two lookups because the map keeps a densely stored vector at all times.

[boost::multi_index::hashed_unique](https://www.boost.org/doc/libs/1_80_0/libs/multi_index/doc/index.html)
: Boost's multi_index container library is extremely powerful. You can build your own indices. The question is, does that power come with a speed penalty?

[boost::unordered_map](https://www.boost.org/doc/libs/1_80_0/libs/unordered/doc/html/unordered.html)
: In version 1.80 there has been a big rewrite of `boost::unordered_map`. That was actually the main reason why I have decided to redo this whole benchmark. It comes with extensive documentation and [benchmarks](https://www.boost.org/doc/libs/1_80_0/libs/unordered/doc/html/unordered.html#benchmarks). I took the opportunity to test the map, and also try it with different allocators as my initial experiments indicated quite a big performance difference with a specialized allocator.

`boost::unordered_map` with [PoolAllocator](https://github.com/martinus/map_benchmark/blob/master/src/app/pool.h)
: Since boost::unordered_map is node based, it has to allocate one node for each element. Thus it can potentially gain a lot from a custom allocator. I actually wrote `PoolAllocator` for Bitcoin, where an `std::unordered_map` is heavily used and using this `PoolAllocator` [speeds up initial block indexing significantly](https://github.com/bitcoin/bitcoin/pull/25325).

`boost::unordered_map` with [boost::container::pmr::unsynchronized_pool_resource](https://www.boost.org/doc/libs/1_80_0/doc/html/boost/container/pmr/unsynchronized_po_idm19164.html)
: Boost comes with its own implementation of [Polymorphic Memory Resources](https://www.boost.org/doc/libs/1_80_0/doc/html/container/cpp_conformance.html#container.cpp_conformance.polymorphic_memory_resources), which should behave similar to `PoolAllocator`.

[emhash7::HashMap](https://github.com/ktprime/emhash)
: These are very high performance hashmaps and the author is constantly updating them. There are different versions of the maps with different propertices concerning performance vs. memory. This map has very fast iteration speed.

[emhash8::HashMap](https://github.com/ktprime/emhash)
: Another variant of the emhash map with different memory & performance properties

[folly::F14ValueMap](https://github.com/facebook/folly)
: A supposedly high performance hashmap implementation from Facebook / Meta. It stores values directly.

[folly::F14NodeMap](https://github.com/facebook/folly)
: A supposedly high performance hashmap implementation from Facebook / Meta. It stores values indirectly, calling malloc for each node.

[fph::DynamicFphMap](https://github.com/renzibei/fph-table)
: A very interesting new contender: This hashmap implementation uses a perfect hash, thus it doesn't have any collisions. This should make it extremely fast for lookups, but with a potentially high overhead for insert/removal. 

[gtl::btree_map](https://github.com/greg7mdp/gtl#btree-containers)
: Containers from greg's template library. This is actually not a hashmap at all, but it is an ordered container much like `std::map`. I added this one to see if it is possible if non-hashmap implementations could compete in this benchmark.

[gtl::flat_hash_map](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md)
: A hashmap implementation based on Google's Abseil. It lists changes to the original implementation [here](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md#changes-to-abseils-hashmaps). This one is the flat variant.

[gtl::node_hash_map](https://github.com/greg7mdp/gtl/blob/main/docs/hmap.md)
: The node map based on google abseil's `absl::node_hash_map`.

[gtl::parallel_flat_hash_map](https://github.com/greg7mdp/gtl#parallel-hash-containers)
: The parallel variants of the hashmaps have reduced peak memory usage and multithreading support. This is done by splitting up the data into multiple sub-hashmaps. See [Parallel hash containers provided by gtl](https://github.com/greg7mdp/gtl/blob/main/docs/phmap.md) for more information.

[gtl::parallel_node_hash_map](https://github.com/greg7mdp/gtl#parallel-hash-containers)
: The node variant of the parallel hashmap.

[jg::dense_hash_map](https://github.com/Jiwan/dense_hash_map)
: A simple replacement for `std::unordered_map` with better performance but loose stable addressing as a trade-off. This too is a new contender, see below how well it fares!

[robin_hood::unordered_flat_map](https://github.com/martinus/robin-hood-hashing)
: Full disclaimer: I'm the author! This is a flat map that is very fast, and I have spent considerable time optimizing it. At that point though it has become hard for me to further support it, and will only provide bug fixes. I consider `ankerl::unordered_dense::map` its successor!

[robin_hood::unordered_node_map](https://github.com/martinus/robin-hood-hashing)
: Similar to `robin_hood::unordered_flat_map`, but with stable references & pointers. To make this fast it uses a specialized allocator implementation.

[ska::bytell_hash_map](TODO)
: TODO

[ska::flat_hash_map](TODO)
: TODO

[spp::sparse_hash_map](TODO)
: TODO

[std::unordered_map](TODO)
: TODO

`std::unordered_map` & [PoolAllocator](TODO)
: TODO

`std::unordered_map` & [std::pmr::unsynchronized_pool_resource](TODO)
: TODO

[tsl::hopscotch_map](TODO)
: TODO

[tsl::robin_map](TODO)
: TODO

[tsl::sparse_map](TODO)
: TODO

## Hashes

[ankerl::unordered_dense::hash](TODO)
: TODO

[absl::Hash](TODO)
: TODO

[robin_hood::hash](TODO)
: TODO

[mumx](TODO)
: TODO

[std::hash](TODO)
: TODO

[boost::hash](TODO)
: TODO

## Allocators

[PoolAllocator](TODO)
: TODO

[std::pmr::unsynchronized_pool_resource](TODO)
: TODO

 [boost::container::pmr::unsynchronized_pool_resource](https://www.boost.org/doc/libs/1_80_0/doc/html/boost/container/pmr/unsynchronized_po_idm19164.html)
 : TODO

## Benchmark & Results

[Copy](TODO)
: TODO

[InsertHugeInt](TODO)
: TODO

[RandomDistinct2](TODO)
: TODO

[RandomInsertErase](TODO)
: TODO

[RandomFind_200](TODO)
: TODO

[RandomFind_2000](TODO)
: TODO

[RandomFind_500000](TODO)
: TODO

[RandomInsertEraseStrings](TODO)
: TODO

[RandomFindString](TODO)
: TODO

[RandomFindString_1000000](TODO)
: TODO

[geometric mean number find](TODO)
: TODO

[geometric mean string find](TODO)
: TODO

[geometric mean all](TODO)
: TODO
