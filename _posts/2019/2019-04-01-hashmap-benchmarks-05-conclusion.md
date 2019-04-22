---
layout: post
title: Hashmaps Benchmarks - Conclusion
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

## Table of Contents

* [Overview](/2019/04/01/hashmap-benchmarks-01-overview/)
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
* **[Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)** 👈

----

In conclusion, I can only say one thing with certainty: there is not one single best hashmap. What's best for you will depend on your usecase, and I advise you to create a representative benchmark for your use case, then run all the maps against it. Make sure your benchmark is unbiased and that the complier can't optimize important work away.

## Hashes

This summary is simple: in *all* benchmarks where hashing was involved, `robin_hood::hash` is overall the fastest. Only for long strings `absl::Hash` is faster. Having said that, `absl::Hash` has a lot more features and is backed by the power of Google, so it might be worth considering anyways.

I can only warn from the `libstdc++-v3` default implementation for integral types. Only use it if you are absolutely sure about what data you are about to insert.

## Hashmaps

If you are dealing with small maps and integral data types as keys, `emilib1::HashMap` might be fastest. But be aware that I cannot vouch for it's stability. It is very new, and while integrating it the author still had to fix a few kinks to get it working in my benchmark. If that does not bother you, it's search performance is very fast.

If you want a more stable map with very good performance, I'd go for `absl::flat_hash_map` as the default map. It is very stable, has lots of features, and definitely well tested.

If your map is modified with inserts and removals a lot, `tsl::robin_map` is fastest. It has high memory usage though. `robin_hood::unordered_flat_map` is only slightly slower but has much less memory requirements.

If your key is relatively slow to hash and to compare like a `std::string`, `robin_hood::unordered_node_map` is the way to go. It's memory usage is quite low and it is fastest. Integration is very easy, since it is a relatively small single header file.

Sometimes it is very important to iterate and process all entries in a map very fast, e.g. in games. In that case, `tsl::sparse_map` is the clear winner. Iteration is exceptionally fast, it uses little memory, and find & insert & erase performance is ok as well.

# Summary

This benchmark was quite a lot of work, so I hope you find it useful. I have tried to make the code simple to use, so if you want to add your own benchmark or want to add another hashmap, feel free to make pull requests at [github.com/martinus/map_benchmark](https://github.com/martinus/map_benchmark).