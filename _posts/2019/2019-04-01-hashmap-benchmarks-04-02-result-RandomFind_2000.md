---
layout: post
title: Hashmaps Benchmarks - Find 1 -- 2000 uint64_t
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
   * **[Find 1 -- 2000 uint64_t](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/)** 👈
   * [Find 1 -- 500k uint64_t](/2019/04/01/hashmap-benchmarks-04-03-result-RandomFind_500000/)
   * [Find 1 -- 100k std::string](/2019/04/01/hashmap-benchmarks-04-04-result-RandomFindString/)
   * [Find 1 -- 1M std::string](/2019/04/01/hashmap-benchmarks-04-05-result-RandomFindString_1000000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-06-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----

In many use cases `find` performance is probably considered the most important benchmark. This benchmark was tricky to implement, as it should be as unbiased as possible. It tries to do the following:

* Lookup with different probability of being found: 0%, 25%, 50%, 75%, and 100% success ratio, to make sure we are not biased about lookup probability.
* Lookups with different amount of data in the map, to make sure we have a wide range of fullness factors.
* Lookups with different bitmasks of the entry, to make sure we are not biased towards small numbers. 

It works this way:

1. Each iteration, 4 random entries are created in a `Map<size_t, size_t>`. Depending on the desired lookup probability, 0, 1, 2, 3, or all 4 entries will be chosen either from a unique random number generator, or one with the same initial seed used for the lookups. Additionally, the order of these 4 entries is shuffled to introduce even more randomness.
1. After insertion, a number of lookups are performed, and when an entry is found it's value is accessed.
1. Repeat until the map is full.

Here, we perform 2 million lookups for every 4 inserts, until the map contains 2000 elements.

# Results

## Hashes

As always, `robin_hood::hash` is fastest, closely followed by `absl::Hash`. `libstdc++-v3` has quite a few problems with the upper bitmask, resulting in huge numbers for many hashmaps and several timeouts.

## Hashmaps

In this benchmark both `emilib::HashMap` is the fastest with `robin_hood::hash`. `tsl::robin_map` comes close, but no ciguar. Unfortunately it was not possible to get any peak memory numbers, the maps are just to small for that. `std::unordered_map` is by far the slowest. 

# Chart
Each entry shows average time for a single `find` and access operation (if found). The final number is average over all entries.

1. **blue**: 0% find success, bitmask `0x00000000FFFFFFFF` (only lower bits)
1. **orange**: 0% find success, bitmask `0xFFFFFFFF00000000` (only upper bits)
1. **green**: 25% find success, bitmask `0x00000000FFFFFFFF` (only lower bits)
1. **red**: 25% find success, bitmask `0xFFFFFFFF00000000` (only upper bits)
1. **magenta**: 50% find success, bitmask `0x00000000FFFFFFFF` (only lower bits)
1. **brown**: 50% find success, bitmask `0xFFFFFFFF00000000` (only upper bits)
1. **pink**: 75% find success, bitmask `0x00000000FFFFFFFF` (only lower bits)
1. **gray**: 75% find success, bitmask `0xFFFFFFFF00000000` (only upper bits)
1. **lime**: 100% find success, bitmask `0x00000000FFFFFFFF` (only lower bits)
1. **cyan**: 100% find success, bitmask `0xFFFFFFFF00000000` (only upper bits)


<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_4355bc38" style="height:260em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "eastl::hash_map", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "tsl::hopscotch_map", "boost::multi_index::<br>hashed_unique", "tsl::sparse_map", "robin_hood::<br>unordered_flat_map", "robin_hood::<br>unordered_node_map", "absl::node_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "phmap::node_hash_map", "ska::bytell_hash_map", "ska::flat_hash_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m1y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "eastl::hash_map", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "tsl::hopscotch_map", "absl::node_hash_map", "robin_hood::<br>unordered_node_map", "boost::multi_index::<br>hashed_unique", "robin_hood::<br>unordered_flat_map", "tsl::sparse_map", "phmap::node_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "ska::bytell_hash_map", "ska::flat_hash_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m2y = [ "std::unordered_map", "spp::sparse_hash_map", "boost::unordered_map", "eastl::hash_map", "folly::F14ValueMap", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "boost::multi_index::<br>hashed_unique", "tsl::hopscotch_map", "tsl::sparse_map", "phmap::node_hash_map", "absl::flat_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_flat_map", "robin_hood::<br>unordered_node_map", "ska::bytell_hash_map", "tsl::robin_map", "emilib1::HashMap", "<b>ska::flat_hash_map</b>"];
    var m3y = [ "std::unordered_map", "spp::sparse_hash_map", "folly::F14ValueMap", "boost::unordered_map", "folly::F14NodeMap", "eastl::hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "tsl::sparse_map", "tsl::hopscotch_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "phmap::node_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "ska::bytell_hash_map", "tsl::robin_map", "ska::flat_hash_map", "<b>emilib1::HashMap</b>"];
    var m4y = [ "tsl::sparse_map", "tsl::robin_map", "tsl::hopscotch_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "emilib1::HashMap", "absl::node_hash_map", "absl::flat_hash_map", "std::unordered_map", "boost::unordered_map", "eastl::hash_map", "folly::F14NodeMap", "folly::F14ValueMap", "boost::multi_index::<br>hashed_unique", "ska::bytell_hash_map", "<b>ska::flat_hash_map</b>"];
    var measurement_names = [ "0% success, 0x00000000ffffffff", "0% success, 0xffffffff00000000", "25% success, 0x00000000ffffffff", "25% success, 0xffffffff00000000", "50% success, 0x00000000ffffffff", "50% success, 0xffffffff00000000", "75% success, 0x00000000ffffffff", "75% success, 0xffffffff00000000", "100% success, 0x00000000ffffffff", "100% success, 0xffffffff00000000" ];

    var data = [
        { x: [ 1.6315700000000002e-08, 1.1539150000000001e-08, 1.3123150000000003e-08, 1.0344350000000002e-08, 6.246335e-09, 6.30072e-09, 7.40685e-09, 6.8658950000000005e-09, 4.1338950000000004e-09, 4.896980000000001e-09, 5.60864e-09, 5.17254e-09, 5.127305000000001e-09, 4.533705e-09, 4.323835e-09, 4.311515e-09, 4.285970000000001e-09, 3.515975e-09, 3.708635e-09, 3.4467750000000004e-09, 2.8761300000000005e-09 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 1.6366400000000004e-08, 1.1569550000000001e-08, 1.274165e-08, 1.03549e-08, 6.260275e-09, 6.306440000000001e-09, 7.315945000000001e-09, 6.85231e-09, 4.123515e-09, 4.83866e-09, 5.3775700000000005e-09, 5.064060000000001e-09, 5.033030000000001e-09, 4.567695e-09, 4.333589999999999e-09, 4.301315e-09, 4.277345000000001e-09, 3.531285e-09, 3.78114e-09, 3.35223e-09, 2.8472200000000004e-09 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 1.5013850000000003e-08, 1.1190300000000001e-08, 1.32007e-08, 1.1924850000000001e-08, 8.533605000000002e-09, 8.19117e-09, 6.876170000000001e-09, 7.08692e-09, 5.463395000000001e-09, 6.1938299999999995e-09, 4.780940000000001e-09, 5.07536e-09, 4.832170000000001e-09, 4.45778e-09, 4.34062e-09, 4.36765e-09, 4.34491e-09, 3.7001e-09, 3.5992250000000003e-09, 3.543625e-09, 2.9409e-09 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 1.50562e-08, 1.115205e-08, 1.331535e-08, 1.19328e-08, 8.495429999999999e-09, 8.147960000000002e-09, 6.901220000000001e-09, 7.131815000000001e-09, 5.4613800000000004e-09, 6.295785e-09, 4.851655e-09, 5.1165e-09, 4.892455e-09, 4.51124e-09, 4.36126e-09, 4.358625e-09, 4.337335e-09, 3.77457e-09, 3.600125e-09, 3.5191050000000003e-09, 2.90354e-09 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 1.4408850000000002e-08, 1.15717e-08, 1.1884050000000002e-08, 1.05676e-08, 1.06696e-08, 1.023245e-08, 6.699185e-09, 6.5384000000000005e-09, 6.125450000000001e-09, 6.000485e-09, 4.347520000000001e-09, 4.84539e-09, 4.4578950000000006e-09, 4.39062e-09, 4.41829e-09, 4.331690000000001e-09, 4.36221e-09, 4.047505e-09, 3.70567e-09, 3.4269300000000003e-09, 3.3439600000000005e-09 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
        },
        { x: [ 1.444945e-08, 1.16568e-08, 1.179925e-08, 1.0484400000000002e-08, 1.0827950000000002e-08, 1.03336e-08, 6.76211e-09, 6.6436099999999996e-09, 6.24518e-09, 5.909535e-09, 4.337545e-09, 4.775555e-09, 4.396770000000001e-09, 4.385135e-09, 4.439645e-09, 4.308365e-09, 4.365985e-09, 4.113625e-09, 3.727420000000001e-09, 3.45849e-09, 3.3541850000000004e-09 ],
          y: m0y, name: measurement_names[5] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[5], },
        },
        { x: [ 1.3804650000000001e-08, 1.132975e-08, 1.0196450000000002e-08, 1.08096e-08, 1.26369e-08, 1.231045e-08, 6.56975e-09, 6.70344e-09, 6.603835000000001e-09, 5.5732899999999995e-09, 5.228670000000001e-09, 4.431055e-09, 4.164630000000001e-09, 4.2377e-09, 4.2909800000000004e-09, 4.26338e-09, 4.20992e-09, 4.35858e-09, 3.7683200000000005e-09, 3.396965e-09, 3.1689200000000003e-09 ],
          y: m0y, name: measurement_names[6] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[6], },
        },
        { x: [ 1.374025e-08, 1.145495e-08, 1.0002355e-08, 1.0828e-08, 1.2691000000000001e-08, 1.2391100000000002e-08, 6.576260000000001e-09, 6.66338e-09, 6.497775000000001e-09, 5.595125e-09, 5.22045e-09, 4.410065e-09, 4.19196e-09, 4.23456e-09, 4.2748450000000005e-09, 4.249285e-09, 4.181775e-09, 4.4084100000000005e-09, 3.78435e-09, 3.4096000000000003e-09, 3.168205e-09 ],
          y: m0y, name: measurement_names[7] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[7], },
        },
        { x: [ 1.3305450000000002e-08, 1.205025e-08, 8.12543e-09, 1.10062e-08, 1.32606e-08, 1.2875400000000001e-08, 7.981415e-09, 7.192815000000001e-09, 5.791565e-09, 4.672105e-09, 5.383160000000001e-09, 4.21379e-09, 4.01364e-09, 4.499085e-09, 4.59093e-09, 4.6070600000000004e-09, 4.477955e-09, 4.35335e-09, 4.61979e-09, 3.4638050000000003e-09, 3.494065e-09 ],
          y: m0y, name: measurement_names[8] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[8], },
        },
        { x: [ 1.331075e-08, 1.2070050000000001e-08, 8.240875e-09, 1.10145e-08, 1.322695e-08, 1.2847400000000001e-08, 8.015410000000001e-09, 7.2204650000000005e-09, 5.70413e-09, 4.718715e-09, 5.442285e-09, 4.2221450000000004e-09, 3.995245e-09, 4.507370000000001e-09, 4.58401e-09, 4.6233950000000005e-09, 4.4822350000000005e-09, 4.4382850000000005e-09, 4.56305e-09, 3.466695e-09, 3.4605850000000004e-09 ],
          y: m0y, name: measurement_names[9] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[9], },
            textposition: 'outside',
            text: [ "14.6ns avg<br>0MB", "11.6ns avg<br>0MB", "11.3ns avg<br>0MB", "10.9ns avg<br>0MB", "10.3ns avg<br>0MB", "9.99ns avg<br>0MB", "7.11ns avg<br>0MB", "6.89ns avg<br>0MB", "5.62ns avg<br>0MB", "5.47ns avg<br>0MB", "5.06ns avg<br>0MB", "4.73ns avg<br>0MB", "4.51ns avg<br>0MB", "4.43ns avg<br>0MB", "4.40ns avg<br>0MB", "4.37ns avg<br>0MB", "4.33ns avg<br>0MB", "4.02ns avg<br>0MB", "3.89ns avg<br>0MB", "3.45ns avg<br>0MB", "<b>3.16ns avg<br>0MB</b>" ],
        },
        { x: [ 1.656295e-08, 1.1819550000000001e-08, 1.2915200000000001e-08, 1.10385e-08, 6.38297e-09, 6.470230000000001e-09, 7.758694999999999e-09, 7.969935e-09, 4.5637150000000005e-09, 5.076945e-09, 5.361290000000001e-09, 5.868715000000001e-09, 5.50132e-09, 5.8076750000000004e-09, 4.630375e-09, 4.83273e-09, 4.5114250000000005e-09, 4.3762850000000005e-09, 3.5934150000000003e-09, 3.2748600000000004e-09, 3.0612600000000002e-09 ],
          y: m1y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 1.65699e-08, 1.1863150000000002e-08, 1.292735e-08, 1.1060350000000002e-08, 6.34136e-09, 6.56967e-09, 7.765965e-09, 8.262935e-09, 4.634965e-09, 5.211850000000001e-09, 5.42775e-09, 5.84008e-09, 5.584975e-09, 5.8975749999999995e-09, 4.901955e-09, 4.911450000000001e-09, 4.566425000000001e-09, 4.394065e-09, 3.59892e-09, 3.23633e-09, 3.0709650000000003e-09 ],
          y: m1y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 1.5003800000000002e-08, 1.1591699999999999e-08, 1.3565400000000001e-08, 1.060155e-08, 8.493320000000001e-09, 8.511685e-09, 7.233000000000001e-09, 7.42394e-09, 6.510195e-09, 5.056965000000001e-09, 5.572955e-09, 4.613915e-09, 5.599575000000001e-09, 5.003715e-09, 5.561345e-09, 4.96348e-09, 4.61339e-09, 3.96372e-09, 3.72923e-09, 3.85547e-09, 3.41509e-09 ],
          y: m1y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 1.50554e-08, 1.16108e-08, 1.3507300000000001e-08, 1.0584250000000001e-08, 8.484935e-09, 8.552619999999999e-09, 7.322745e-09, 7.4492e-09, 6.42687e-09, 5.060055e-09, 5.5588450000000006e-09, 4.647765000000001e-09, 5.591090000000001e-09, 5.122915e-09, 5.589425e-09, 4.946565e-09, 4.614415e-09, 3.987235e-09, 3.737065e-09, 3.844995000000001e-09, 3.39958e-09 ],
          y: m1y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 1.4586500000000001e-08, 1.154405e-08, 1.209605e-08, 1.2228799999999999e-08, 1.08498e-08, 1.09091e-08, 7.18415e-09, 7.290295000000001e-09, 6.389845000000001e-09, 5.6394e-09, 5.3953400000000005e-09, 4.790415e-09, 5.187905000000001e-09, 4.6954e-09, 5.345565000000001e-09, 4.64238e-09, 4.555985e-09, 4.7666000000000005e-09, 3.8953200000000006e-09, 3.4114400000000004e-09, 3.2989600000000004e-09 ],
          y: m1y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
        },
        { x: [ 1.4558900000000001e-08, 1.154305e-08, 1.2094300000000002e-08, 1.2158850000000002e-08, 1.0887350000000003e-08, 1.0827749999999999e-08, 7.218720000000001e-09, 7.347710000000001e-09, 6.2726250000000006e-09, 5.771405e-09, 5.339855e-09, 4.8318850000000004e-09, 5.1461e-09, 4.74967e-09, 5.470035e-09, 4.7049450000000004e-09, 4.586025e-09, 4.821955000000001e-09, 3.9044200000000005e-09, 3.397955e-09, 3.2970050000000004e-09 ],
          y: m1y, name: measurement_names[5] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[5], },
        },
        { x: [ 1.606345e-08, 1.1346500000000002e-08, 1.0518000000000002e-08, 1.0720150000000001e-08, 1.28229e-08, 1.253425e-08, 6.890535e-09, 6.933830000000001e-09, 6.93987e-09, 5.3099700000000004e-09, 4.913985e-09, 5.19044e-09, 4.752624999999999e-09, 4.657340000000001e-09, 4.6469199999999995e-09, 4.58182e-09, 4.569175000000001e-09, 4.6402000000000006e-09, 3.83591e-09, 3.2135200000000003e-09, 3.5074150000000003e-09 ],
          y: m1y, name: measurement_names[6] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[6], },
        },
        { x: [ 1.61661e-08, 1.1392e-08, 1.0513650000000002e-08, 1.0701550000000001e-08, 1.2801300000000001e-08, 1.251635e-08, 6.875505000000001e-09, 6.942425e-09, 7.099755e-09, 5.309255e-09, 4.892480000000001e-09, 5.22726e-09, 4.733080000000001e-09, 4.7043900000000005e-09, 4.650930000000001e-09, 4.594805000000001e-09, 4.5778799999999995e-09, 4.6352100000000006e-09, 3.83281e-09, 3.1941400000000003e-09, 3.50367e-09 ],
          y: m1y, name: measurement_names[7] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[7], },
        },
        { x: [ 1.35355e-08, 1.1758000000000002e-08, 8.868705e-09, 1.088185e-08, 1.3324150000000002e-08, 1.3076100000000001e-08, 1.05423e-08, 7.443670000000001e-09, 6.236655000000001e-09, 4.829445e-09, 4.796925000000001e-09, 5.452525e-09, 4.62499e-09, 5.059455e-09, 4.8205e-09, 4.924155000000001e-09, 4.937095e-09, 4.776615e-09, 4.750205e-09, 3.48215e-09, 3.74203e-09 ],
          y: m1y, name: measurement_names[8] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[8], },
        },
        { x: [ 1.354475e-08, 1.1773200000000001e-08, 8.83579e-09, 1.0854e-08, 1.3354600000000001e-08, 1.3061450000000001e-08, 1.0508e-08, 7.4221100000000005e-09, 6.143155000000001e-09, 4.816665e-09, 4.773935e-09, 5.46509e-09, 4.6586700000000004e-09, 5.11674e-09, 4.8309200000000005e-09, 4.893065e-09, 4.911905000000001e-09, 4.7251700000000005e-09, 4.77291e-09, 3.4063550000000003e-09, 3.7648950000000006e-09 ],
          y: m1y, name: measurement_names[9] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[9], },
            textposition: 'outside',
            text: [ "15.2ns avg<br>0MB", "11.6ns avg<br>0MB", "11.6ns avg<br>0MB", "11.1ns avg<br>0MB", "10.4ns avg<br>0MB", "10.3ns avg<br>0MB", "7.93ns avg<br>0MB", "7.45ns avg<br>0MB", "6.12ns avg<br>0MB", "5.21ns avg<br>0MB", "5.20ns avg<br>0MB", "5.19ns avg<br>0MB", "5.14ns avg<br>0MB", "5.08ns avg<br>0MB", "5.04ns avg<br>0MB", "4.80ns avg<br>0MB", "4.64ns avg<br>0MB", "4.51ns avg<br>0MB", "3.97ns avg<br>0MB", "3.43ns avg<br>0MB", "<b>3.41ns avg<br>0MB</b>" ],
        },
        { x: [ 2.2815850000000002e-08, 1.424055e-08, 1.2459550000000001e-08, 1.1768000000000002e-08, 7.268030000000001e-09, 7.110605000000001e-09, 1.002661e-08, 9.720015e-09, 7.3426900000000004e-09, 6.07705e-09, 7.540155e-09, 6.69729e-09, 6.220975e-09, 6.468165e-09, 6.22634e-09, 6.2653850000000005e-09, 6.127755e-09, 5.254535e-09, 5.0749649999999995e-09, 4.283544999999999e-09, 4.2214600000000004e-09 ],
          y: m2y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 2.272595e-08, 1.3933550000000001e-08, 1.25241e-08, 1.170605e-08, 7.34689e-09, 7.15234e-09, 1.020485e-08, 9.913465e-09, 7.3022800000000006e-09, 6.022225e-09, 7.460955e-09, 6.586505000000001e-09, 6.240835000000001e-09, 6.426150000000001e-09, 6.237075000000001e-09, 6.041815000000001e-09, 5.917715000000001e-09, 5.1248500000000006e-09, 5.0532e-09, 4.3125750000000005e-09, 4.223815000000001e-09 ],
          y: m2y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 2.10631e-08, 1.50034e-08, 1.2099450000000001e-08, 1.104945e-08, 9.225520000000002e-09, 9.25936e-09, 9.238645e-09, 9.136755e-09, 7.599210000000002e-09, 5.8441650000000006e-09, 6.547855e-09, 6.92098e-09, 6.522780000000001e-09, 6.603190000000001e-09, 6.575690000000001e-09, 6.1202000000000004e-09, 6.24522e-09, 5.3129750000000005e-09, 5.66237e-09, 4.3201000000000004e-09, 4.420915e-09 ],
          y: m2y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 2.07396e-08, 1.4924000000000002e-08, 1.2189500000000001e-08, 1.106805e-08, 9.221935e-09, 9.249650000000001e-09, 9.194475e-09, 9.140775e-09, 7.590175e-09, 5.703235e-09, 6.5680600000000006e-09, 6.8540099999999996e-09, 6.32178e-09, 6.462375000000001e-09, 6.376870000000001e-09, 6.14587e-09, 6.228655e-09, 5.18649e-09, 5.7224950000000005e-09, 4.266835000000001e-09, 4.38823e-09 ],
          y: m2y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 1.9500500000000003e-08, 1.4095400000000002e-08, 1.235115e-08, 1.2461850000000001e-08, 1.157465e-08, 1.1480500000000001e-08, 9.136925e-09, 9.299340000000002e-09, 7.849070000000002e-09, 7.319140000000001e-09, 6.240065000000001e-09, 6.6132e-09, 6.358035000000001e-09, 6.4696350000000005e-09, 6.343830000000001e-09, 6.309455e-09, 6.02535e-09, 6.3752e-09, 5.519285e-09, 4.80983e-09, 4.565615e-09 ],
          y: m2y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
        },
        { x: [ 1.91955e-08, 1.41733e-08, 1.23808e-08, 1.22569e-08, 1.15099e-08, 1.1499950000000001e-08, 9.169294999999999e-09, 9.33558e-09, 8.026900000000001e-09, 7.44674e-09, 6.294830000000001e-09, 6.54394e-09, 6.2761900000000004e-09, 6.391425000000001e-09, 6.29046e-09, 6.255615e-09, 6.01972e-09, 6.232185e-09, 5.5606250000000005e-09, 4.855615e-09, 4.473330000000001e-09 ],
          y: m2y, name: measurement_names[5] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[5], },
        },
        { x: [ 1.8556950000000003e-08, 1.17637e-08, 1.257825e-08, 1.122645e-08, 1.3676400000000001e-08, 1.37347e-08, 9.17398e-09, 8.948445000000001e-09, 6.227145e-09, 7.612765000000001e-09, 6.197840000000001e-09, 6.459365000000001e-09, 6.603015e-09, 6.1953e-09, 6.3047600000000005e-09, 5.950624999999999e-09, 5.797775e-09, 6.20935e-09, 4.883785e-09, 4.846015000000001e-09, 4.528815000000001e-09 ],
          y: m2y, name: measurement_names[6] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[6], },
        },
        { x: [ 1.8218849999999998e-08, 1.195255e-08, 1.27969e-08, 1.12224e-08, 1.3682450000000001e-08, 1.3757350000000001e-08, 9.113515000000002e-09, 8.947600000000002e-09, 6.260705000000001e-09, 8.065670000000002e-09, 6.2813e-09, 6.461185e-09, 6.5601350000000005e-09, 6.207955000000001e-09, 6.311485e-09, 6.038065e-09, 5.893640000000001e-09, 6.052125e-09, 4.96987e-09, 4.863995e-09, 4.45754e-09 ],
          y: m2y, name: measurement_names[7] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[7], },
        },
        { x: [ 1.7402050000000002e-08, 9.846014999999999e-09, 1.2787250000000001e-08, 1.1774700000000002e-08, 1.42188e-08, 1.4241450000000003e-08, 1.00995e-08, 9.097335e-09, 6.775040000000001e-09, 7.220105e-09, 7.635325000000001e-09, 6.526475000000001e-09, 6.717675e-09, 6.509595e-09, 6.678075e-09, 5.681880000000001e-09, 5.790735e-09, 6.246225000000001e-09, 4.640250000000001e-09, 5.0689499999999995e-09, 4.826715e-09 ],
          y: m2y, name: measurement_names[8] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[8], },
        },
        { x: [ 1.73232e-08, 1.0054050000000001e-08, 1.2860200000000002e-08, 1.169495e-08, 1.4214900000000001e-08, 1.4249200000000002e-08, 1.0087300000000003e-08, 9.228705e-09, 6.827045e-09, 7.96435e-09, 7.973275e-09, 6.557930000000001e-09, 6.727845000000001e-09, 6.5351150000000005e-09, 6.722520000000001e-09, 5.88947e-09, 5.919840000000001e-09, 6.1780300000000004e-09, 4.748745e-09, 5.1209550000000005e-09, 4.789405000000001e-09 ],
          y: m2y, name: measurement_names[9] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[9], },
            textposition: 'outside',
            text: [ "19.8ns avg<br>0MB", "13.0ns avg<br>0MB", "12.5ns avg<br>0MB", "11.6ns avg<br>0MB", "11.2ns avg<br>0MB", "11.2ns avg<br>0MB", "9.54ns avg<br>0MB", "9.28ns avg<br>0MB", "7.18ns avg<br>0MB", "6.93ns avg<br>0MB", "6.87ns avg<br>0MB", "6.62ns avg<br>0MB", "6.45ns avg<br>0MB", "6.43ns avg<br>0MB", "6.41ns avg<br>0MB", "6.07ns avg<br>0MB", "6.00ns avg<br>0MB", "5.82ns avg<br>0MB", "5.18ns avg<br>0MB", "4.67ns avg<br>0MB", "<b>4.49ns avg<br>0MB</b>" ],
        },
        { x: [ 2.028055e-08, 1.7262200000000004e-08, 1.0940500000000001e-08, 1.482165e-08, 1.076455e-08, 1.30456e-08, 1.2366150000000001e-08, 1.1953300000000001e-08, 1.0128650000000002e-08, 7.88543e-09, 8.315655000000002e-09, 8.704079999999999e-09, 8.276834999999999e-09, 8.266930000000001e-09, 8.23349e-09, 8.457304999999999e-09, 8.587115e-09, 7.198690000000001e-09, 6.748110000000001e-09, 6.695745000000001e-09, 6.36722e-09 ],
          y: m3y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 1.975315e-08, 1.7328450000000003e-08, 1.0737100000000001e-08, 1.4848750000000001e-08, 1.06057e-08, 1.31258e-08, 1.234965e-08, 1.1939850000000002e-08, 1.021705e-08, 7.98212e-09, 8.3787e-09, 8.730985e-09, 8.379580000000001e-09, 8.311255000000001e-09, 8.339255e-09, 8.22017e-09, 8.348e-09, 7.3791900000000004e-09, 6.754735e-09, 6.708245000000001e-09, 6.423140000000001e-09 ],
          y: m3y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 1.9417500000000002e-08, 1.78904e-08, 1.310785e-08, 1.61009e-08, 1.28488e-08, 1.5039e-08, 1.1794050000000002e-08, 1.2602000000000003e-08, 9.174030000000001e-09, 8.618685000000001e-09, 1.01633e-08, 8.440615e-09, 8.821885000000001e-09, 8.636000000000002e-09, 8.260555e-09, 8.557395e-09, 8.43931e-09, 7.23633e-09, 7.93586e-09, 6.87518e-09, 6.9144950000000005e-09 ],
          y: m3y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 1.8953100000000003e-08, 1.7941400000000003e-08, 1.32002e-08, 1.599125e-08, 1.2887300000000001e-08, 1.512175e-08, 1.171545e-08, 1.251795e-08, 9.118984999999999e-09, 8.76382e-09, 1.0311350000000001e-08, 8.467605e-09, 8.75926e-09, 8.62335e-09, 8.23866e-09, 8.490725000000001e-09, 8.37008e-09, 7.20808e-09, 7.89419e-09, 6.895405e-09, 6.91061e-09 ],
          y: m3y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 1.870835e-08, 1.68587e-08, 1.5732700000000003e-08, 1.4510400000000002e-08, 1.5244900000000003e-08, 1.4836500000000002e-08, 1.1758250000000002e-08, 1.1858000000000001e-08, 8.84598e-09, 9.638909999999999e-09, 8.667015e-09, 8.762704999999999e-09, 8.67227e-09, 8.34027e-09, 8.439005e-09, 8.295825e-09, 8.237255000000001e-09, 8.50005e-09, 7.616035000000001e-09, 6.842915e-09, 6.8378750000000004e-09 ],
          y: m3y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
        },
        { x: [ 1.849475e-08, 1.6701000000000002e-08, 1.5708e-08, 1.4511650000000002e-08, 1.522645e-08, 1.51065e-08, 1.1765100000000002e-08, 1.170215e-08, 8.80112e-09, 9.707205000000001e-09, 8.64649e-09, 8.836065e-09, 8.66839e-09, 8.344185000000001e-09, 8.44126e-09, 8.324585e-09, 8.27304e-09, 8.524565e-09, 7.43485e-09, 6.862585e-09, 6.863755000000001e-09 ],
          y: m3y, name: measurement_names[5] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[5], },
        },
        { x: [ 1.75353e-08, 1.4545350000000001e-08, 1.775125e-08, 1.4549200000000001e-08, 1.755825e-08, 1.30916e-08, 1.1623550000000001e-08, 1.1672200000000001e-08, 8.568630000000002e-09, 9.510735e-09, 8.55027e-09, 9.52859e-09, 8.88713e-09, 8.406835e-09, 8.419105000000001e-09, 7.87287e-09, 7.81381e-09, 7.962780000000001e-09, 7.050930000000001e-09, 6.915405e-09, 7.03254e-09 ],
          y: m3y, name: measurement_names[6] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[6], },
        },
        { x: [ 1.730725e-08, 1.45971e-08, 1.773545e-08, 1.45367e-08, 1.754995e-08, 1.3110600000000002e-08, 1.16299e-08, 1.1846900000000001e-08, 8.69175e-09, 9.631905000000001e-09, 8.547514999999999e-09, 9.553415000000001e-09, 8.822285000000001e-09, 8.44052e-09, 8.43809e-09, 7.851775000000001e-09, 7.770880000000002e-09, 7.931e-09, 6.941195e-09, 6.92716e-09, 7.066730000000001e-09 ],
          y: m3y, name: measurement_names[7] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[7], },
        },
        { x: [ 1.686055e-08, 1.2586550000000001e-08, 1.77987e-08, 1.4807400000000002e-08, 1.7595300000000003e-08, 1.3178750000000001e-08, 1.4909750000000002e-08, 1.2328950000000001e-08, 9.484075000000001e-09, 9.64314e-09, 8.81967e-09, 9.007325e-09, 8.82127e-09, 8.666910000000002e-09, 8.6725e-09, 7.733005e-09, 7.774875e-09, 8.58508e-09, 6.8987100000000005e-09, 7.589569999999999e-09, 7.27253e-09 ],
          y: m3y, name: measurement_names[8] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[8], },
        },
        { x: [ 1.66382e-08, 1.2826600000000001e-08, 1.7801400000000003e-08, 1.496615e-08, 1.758395e-08, 1.314495e-08, 1.505835e-08, 1.265945e-08, 9.684405000000001e-09, 1.004645e-08, 8.77628e-09, 8.987450000000001e-09, 8.837590000000001e-09, 8.66336e-09, 8.653175000000001e-09, 7.67397e-09, 7.731965000000001e-09, 8.680095000000001e-09, 6.828245e-09, 7.609355e-09, 7.2932600000000005e-09 ],
          y: m3y, name: measurement_names[9] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[9], },
            textposition: 'outside',
            text: [ "18.4ns avg<br>0MB", "15.9ns avg<br>0MB", "15.1ns avg<br>0MB", "15.0ns avg<br>0MB", "14.8ns avg<br>0MB", "13.9ns avg<br>0MB", "12.5ns avg<br>0MB", "12.1ns avg<br>0MB", "9.27ns avg<br>0MB", "9.14ns avg<br>0MB", "8.92ns avg<br>0MB", "8.90ns avg<br>0MB", "8.69ns avg<br>0MB", "8.47ns avg<br>0MB", "8.41ns avg<br>0MB", "8.15ns avg<br>0MB", "8.13ns avg<br>0MB", "7.92ns avg<br>0MB", "7.21ns avg<br>0MB", "6.99ns avg<br>0MB", "<b>6.90ns avg<br>0MB</b>" ],
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.56614e-08, 1.135545e-08, 1.04575e-08, 5.57138e-09, 5.66844e-09, 4.2873450000000006e-09, 3.0617e-09, 2.41622e-09 ],
          y: m4y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.57947e-08, 1.1413450000000002e-08, 1.051435e-08, 5.7862000000000006e-09, 5.871900000000001e-09, 4.288565e-09, 3.082005e-09, 2.40764e-09 ],
          y: m4y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.47587e-08, 1.080535e-08, 1.112065e-08, 7.907289999999999e-09, 7.781455000000001e-09, 5.091045e-09, 3.19786e-09, 2.4884850000000004e-09 ],
          y: m4y, name: measurement_names[2] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.468625e-08, 1.0821250000000002e-08, 1.1377150000000001e-08, 7.997605e-09, 7.785735e-09, 4.950980000000001e-09, 3.2205650000000007e-09, 2.446255e-09 ],
          y: m4y, name: measurement_names[3] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.4259650000000001e-08, 1.0967450000000001e-08, 1.0052049999999999e-08, 9.969145000000001e-09, 9.789285e-09, 4.436465e-09, 3.977535e-09, 2.521165e-09 ],
          y: m4y, name: measurement_names[4] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.4190700000000001e-08, 1.104675e-08, 1.0081e-08, 1.0025249999999999e-08, 9.798660000000001e-09, 4.47667e-09, 4.02311e-09, 2.523275e-09 ],
          y: m4y, name: measurement_names[5] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[5], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3863900000000002e-08, 1.0900500000000002e-08, 1.018425e-08, 1.2227100000000001e-08, 1.188155e-08, 4.692035e-09, 3.82025e-09, 2.7965050000000004e-09 ],
          y: m4y, name: measurement_names[6] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[6], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3859050000000001e-08, 1.093675e-08, 1.03028e-08, 1.2267e-08, 1.1943050000000001e-08, 4.631125e-09, 3.782305e-09, 2.7951400000000003e-09 ],
          y: m4y, name: measurement_names[7] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[7], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3365400000000001e-08, 1.139525e-08, 1.025015e-08, 1.25076e-08, 1.222545e-08, 4.55904e-09, 3.9434e-09, 2.960125e-09 ],
          y: m4y, name: measurement_names[8] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[8], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.33763e-08, 1.131915e-08, 1.025815e-08, 1.2505050000000001e-08, 1.22269e-08, 4.60318e-09, 3.919085000000001e-09, 3.0500450000000003e-09 ],
          y: m4y, name: measurement_names[9] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[9], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "14.4ns avg<br>0MB", "11.1ns avg<br>0MB", "10.5ns avg<br>0MB", "9.68ns avg<br>0MB", "9.50ns avg<br>0MB", "4.60ns avg<br>0MB", "3.60ns avg<br>0MB", "<b>2.64ns avg<br>0MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomFind_2000'},
        grid: {
            ygap: 0.1,
            subplots: [
            ['xy'],
            ['xy2'],
            ['xy3'],
            ['xy4'],
            ['xy5'],
        ] },

        barmode: 'stack',
        yaxis: { title: 'robin_hood::hash', automargin: true, },
        yaxis2: { title: 'absl::Hash', automargin: true, },
        yaxis3: { title: 'folly::hasher', automargin: true, },
        yaxis4: { title: 'FNV1a', automargin: true, },
        yaxis5: { title: 'libstdc++-v3', automargin: true, },
        xaxis: { automargin: true,  range: [0, 1.538831735e-07]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_4355bc38', data, layout);
</script>
