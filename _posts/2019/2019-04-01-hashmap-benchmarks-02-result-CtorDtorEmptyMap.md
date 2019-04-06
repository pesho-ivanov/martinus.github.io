---
layout: post
title: Hashmaps Benchmarks - Construction & Destruction
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

## Table of Contents

* [Overview](/2019/04/01/hashmap-benchmarks-01-overview/)
* Construction Benchmarks
   * **&rarr; [Construction & Destruction](/2019/04/01/hashmap-benchmarks-02-result-CtorDtorEmptyMap/) &larr;**
   * [Construction & Insert 1 Element & Destruction](/2019/04/01/hashmap-benchmarks-02-result-CtorDtorSingleEntryMap/)
* Modifying Benchmarks
   * [Insert & Erase 100M Entries](/2019/04/01/hashmap-benchmarks-02-result-InsertHugeInt/)
   * [Insert or Access, Varying Probability](/2019/04/01/hashmap-benchmarks-02-result-RandomDistinct2/)
   * [Insert & Erase](/2019/04/01/hashmap-benchmarks-02-result-RandomInsertErase/)
   * [Insert & Erase Strings](/2019/04/01/hashmap-benchmarks-02-result-RandomInsertEraseStrings/)
* Accessing
   * [Find 1-200 Entries](/2019/04/01/hashmap-benchmarks-02-result-RandomFind_200/)
   * [Find 1-2000 Entries](/2019/04/01/hashmap-benchmarks-02-result-RandomFind_2000/)
   * [Find 1-500k Entries](/2019/04/01/hashmap-benchmarks-02-result-RandomFind_500000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-02-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-03-conclusion/)

----

To get started, the first benchmark is a very simple one: measure how fast the hashmap can be constructed and destructed. Some maps perform some kind of lazy initialization, where data is only allocated when the first element is inserted, some immediately initialize their data structures. 


# Benchmark Code

The full benchmark code is this: 

```cpp
for (size_t n = 0; n < 100'000'000; ++n) {
    Map<int, int> map;
    result += map.size();
}
```

After the loop is done, the variable `result` is used in a verifcation step. It also helps that the compiler does not simply optimize the code away.

## Results

Construction is generally very fast, and a non-issue. The slowest map to construct is `boost::multi_index::hashed_unique`, which takes 40.7ns to construct. Anything below 2-3ns is probably just measurement noise. Note that the benchmark results are very consistent regardless of the used hash function (as it should be).

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_fb078d1a" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_node_hash_map", "emilib1::HashMap", "spp::sparse_hash_map", "boost::unordered_map", "tsl::hopscotch_map", "folly::F14ValueMap", "folly::F14NodeMap", "ska::bytell_hash_map", "tsl::sparse_map", "eastl::hash_map", "tsl::robin_map", "robin_hood::<br>unordered_flat_map", "robin_hood::<br>unordered_node_map", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "phmap::flat_hash_map", "phmap::node_hash_map", "absl::flat_hash_map", "<b>absl::node_hash_map</b>"];
    var m1y = [ "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_node_hash_map", "emilib1::HashMap", "spp::sparse_hash_map", "boost::unordered_map", "tsl::hopscotch_map", "folly::F14NodeMap", "folly::F14ValueMap", "ska::bytell_hash_map", "eastl::hash_map", "tsl::sparse_map", "tsl::robin_map", "phmap::flat_hash_map", "phmap::node_hash_map", "phmap::<br>parallel_flat_hash_map", "robin_hood::<br>unordered_flat_map", "robin_hood::<br>unordered_node_map", "std::unordered_map", "absl::node_hash_map", "<b>absl::flat_hash_map</b>"];
    var m2y = [ "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_node_hash_map", "emilib1::HashMap", "spp::sparse_hash_map", "boost::unordered_map", "tsl::hopscotch_map", "folly::F14NodeMap", "folly::F14ValueMap", "ska::bytell_hash_map", "tsl::sparse_map", "eastl::hash_map", "tsl::robin_map", "phmap::node_hash_map", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_flat_map", "robin_hood::<br>unordered_node_map", "absl::node_hash_map", "<b>absl::flat_hash_map</b>"];
    var m3y = [ "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_node_hash_map", "emilib1::HashMap", "spp::sparse_hash_map", "boost::unordered_map", "tsl::hopscotch_map", "folly::F14NodeMap", "folly::F14ValueMap", "ska::bytell_hash_map", "eastl::hash_map", "tsl::sparse_map", "tsl::robin_map", "phmap::node_hash_map", "robin_hood::<br>unordered_node_map", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "robin_hood::<br>unordered_flat_map", "phmap::flat_hash_map", "absl::node_hash_map", "<b>absl::flat_hash_map</b>"];
    var m4y = [ "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_node_hash_map", "emilib1::HashMap", "spp::sparse_hash_map", "boost::unordered_map", "tsl::hopscotch_map", "folly::F14NodeMap", "folly::F14ValueMap", "eastl::hash_map", "ska::bytell_hash_map", "tsl::sparse_map", "tsl::robin_map", "phmap::flat_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "std::unordered_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "absl::node_hash_map", "<b>absl::flat_hash_map</b>"];
    var measurement_names = [ "ctor & dtor empty map" ];

    var data = [
        { x: [ 4.0655249999999996e-08, 2.87797e-08, 1.08427e-08, 1.0058450000000001e-08, 3.75871e-09, 3.753950000000001e-09, 1.87625e-09, 1.78233e-09, 4.691945e-10, 3.131685e-10, 3.13053e-10, 3.1289550000000004e-10, 1.18e-15, 1.155e-15, 1.14e-15, 1.125e-15, 1.125e-15, 1.08e-15, 8.6e-16, 8.4e-16 ],
          y: m0y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "40.7ns<br>0.0MB", "28.8ns<br>0.0MB", "10.8ns<br>0.0MB", "10.1ns<br>0.0MB", "3.76ns<br>0.0MB", "3.75ns<br>0.0MB", "1.88ns<br>0.0MB", "1.78ns<br>0.0MB", "469ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "1.18fs<br>0.0MB", "1.16fs<br>0.0MB", "1.14fs<br>0.0MB", "1.12fs<br>0.0MB", "1.12fs<br>0.0MB", "1.08fs<br>0.0MB", "860as<br>0.0MB", "<b>840as<br>0.0MB</b>" ],
        },
        { x: [ 4.06564e-08, 2.8794900000000002e-08, 1.08469e-08, 1.00372e-08, 4.390035e-09, 3.75224e-09, 1.87645e-09, 1.7852599999999999e-09, 6.255380000000001e-10, 3.1308049999999997e-10, 3.1294250000000003e-10, 3.1286400000000003e-10, 1.175e-15, 1.17e-15, 1.1449999999999999e-15, 1.13e-15, 1.1150000000000002e-15, 1.1000000000000001e-15, 8.55e-16, 8.449999999999999e-16 ],
          y: m1y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "40.7ns<br>0.0MB", "28.8ns<br>0.0MB", "10.8ns<br>0.0MB", "10.0ns<br>0.0MB", "4.39ns<br>0.0MB", "3.75ns<br>0.0MB", "1.88ns<br>0.0MB", "1.79ns<br>0.0MB", "626ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "1.18fs<br>0.0MB", "1.17fs<br>0.0MB", "1.14fs<br>0.0MB", "1.13fs<br>0.0MB", "1.12fs<br>0.0MB", "1.10fs<br>0.0MB", "855as<br>0.0MB", "<b>845as<br>0.0MB</b>" ],
        },
        { x: [ 4.06617e-08, 2.87694e-08, 1.0846399999999998e-08, 1.003005e-08, 4.68986e-09, 3.7531500000000004e-09, 1.8763600000000003e-09, 1.786015e-09, 4.69374e-10, 3.1302300000000005e-10, 3.1297e-10, 3.1287150000000004e-10, 1.18e-15, 1.1449999999999999e-15, 1.1150000000000002e-15, 1.1150000000000002e-15, 1.105e-15, 1.08e-15, 8.7e-16, 8.2e-16 ],
          y: m2y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "40.7ns<br>0.0MB", "28.8ns<br>0.0MB", "10.8ns<br>0.0MB", "10.0ns<br>0.0MB", "4.69ns<br>0.0MB", "3.75ns<br>0.0MB", "1.88ns<br>0.0MB", "1.79ns<br>0.0MB", "469ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "1.18fs<br>0.0MB", "1.14fs<br>0.0MB", "1.12fs<br>0.0MB", "1.12fs<br>0.0MB", "1.10fs<br>0.0MB", "1.08fs<br>0.0MB", "870as<br>0.0MB", "<b>820as<br>0.0MB</b>" ],
        },
        { x: [ 4.065955e-08, 2.8851350000000004e-08, 1.08424e-08, 1.003605e-08, 4.689925e-09, 3.7521900000000005e-09, 1.87632e-09, 1.78581e-09, 6.256635e-10, 3.1298999999999997e-10, 3.12943e-10, 3.12893e-10, 1.205e-15, 1.1600000000000001e-15, 1.16e-15, 1.1500000000000001e-15, 1.125e-15, 1.11e-15, 8.55e-16, 8.499999999999999e-16 ],
          y: m3y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "40.7ns<br>0.0MB", "28.9ns<br>0.0MB", "10.8ns<br>0.0MB", "10.0ns<br>0.0MB", "4.69ns<br>0.0MB", "3.75ns<br>0.0MB", "1.88ns<br>0.0MB", "1.79ns<br>0.0MB", "626ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "1.20fs<br>0.0MB", "1.16fs<br>0.0MB", "1.16fs<br>0.0MB", "1.15fs<br>0.0MB", "1.12fs<br>0.0MB", "1.11fs<br>0.0MB", "855as<br>0.0MB", "<b>850as<br>0.0MB</b>" ],
        },
        { x: [ 4.066565e-08, 2.8847300000000003e-08, 1.0843950000000002e-08, 1.0065800000000001e-08, 4.6901700000000006e-09, 3.752175000000001e-09, 1.876195e-09, 1.7817650000000002e-09, 6.257225e-10, 6.255459999999999e-10, 3.128555e-10, 3.12833e-10, 1.1650000000000002e-15, 1.1600000000000001e-15, 1.16e-15, 1.155e-15, 1.155e-15, 1.105e-15, 8.55e-16, 8.449999999999999e-16 ],
          y: m4y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "40.7ns<br>0.0MB", "28.8ns<br>0.0MB", "10.8ns<br>0.0MB", "10.1ns<br>0.0MB", "4.69ns<br>0.0MB", "3.75ns<br>0.0MB", "1.88ns<br>0.0MB", "1.78ns<br>0.0MB", "626ps<br>0.0MB", "626ps<br>0.0MB", "313ps<br>0.0MB", "313ps<br>0.0MB", "1.16fs<br>0.0MB", "1.16fs<br>0.0MB", "1.16fs<br>0.0MB", "1.16fs<br>0.0MB", "1.16fs<br>0.0MB", "1.10fs<br>0.0MB", "855as<br>0.0MB", "<b>845as<br>0.0MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'CtorDtorEmptyMap'},
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
        yaxis: { title: 'absl::Hash', automargin: true, },
        yaxis2: { title: 'folly::hasher', automargin: true, },
        yaxis3: { title: 'robin_hood::hash', automargin: true, },
        yaxis4: { title: 'Identity', automargin: true, },
        yaxis5: { title: 'FNV1a', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_fb078d1a', data, layout);
</script>
