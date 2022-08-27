---
layout: post
title: Hashmaps Benchmarks - Construction & Insert 1 int & Destruction
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

## Table of Contents

* [Overview](/2019/04/01/hashmap-benchmarks-01-overview/)
* Construction Benchmarks
   * [Construction & Destruction](/2019/04/01/hashmap-benchmarks-02-01-result-CtorDtorEmptyMap/)
   * **[Construction & Insert 1 int & Destruction](/2019/04/01/hashmap-benchmarks-02-02-result-CtorDtorSingleEntryMap/)** 👈
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

Almost the same as [Construction & Destruction](/2019/04/01/hashmap-benchmarks-CtorDtorEmptyMap/), but this time a single element is inserted. All maps that do lazy initialization are now forced to actually provide storage memory, and they have to calculate the hash function at least once to find a proper slot.

The full benchmark code is this: 

```cpp
for (int n = 0; n < 50'000'000; ++n) {
    Map<int, int> map;
    map[n];
    result += map.size();
}
```

After the loop is done, the variable `result` is used in a verification step. It should always be 50'000'000.

# Results

## Hashes

This time a single element is hashed and inserted into the map. The overhead of hashing should only insofar be an influence that it is called once. No collision problems with a single entry. Naturally, `libstdc++-v3` is the fastest hashing for that use case because it does practically nothing. Note that the groups in the graph below are sorted: `libstdc++-v3` comes first because total runtime is fastest, and `robin_hood::hash` comes second with a slight overhead.

## Hashmaps

`emilib1::HashMap` is the winner here, with `tsl::robin_map` a close second, and on par with any hash function except `libstdc++-v3`.

`phmap::parallel_node_hash_map` is the slowest of the bunch here, because it allocates multiple tables to be able to operate fast in parallel.

# Chart

1. **blue**: average time to construct map and insert one element.

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_f51bc8f8" style="height:260em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "folly::F14ValueMap", "tsl::hopscotch_map", "ska::flat_hash_map", "ska::bytell_hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "eastl::hash_map", "tsl::sparse_map", "phmap::node_hash_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m1y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "folly::F14ValueMap", "ska::bytell_hash_map", "tsl::hopscotch_map", "ska::flat_hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "eastl::hash_map", "tsl::sparse_map", "phmap::node_hash_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m2y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "ska::bytell_hash_map", "folly::F14ValueMap", "ska::flat_hash_map", "tsl::hopscotch_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "phmap::node_hash_map", "tsl::sparse_map", "boost::unordered_map", "robin_hood::<br>unordered_node_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m3y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "std::unordered_map", "phmap::<br>parallel_flat_hash_map", "ska::bytell_hash_map", "folly::F14ValueMap", "ska::flat_hash_map", "tsl::hopscotch_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "phmap::node_hash_map", "eastl::hash_map", "tsl::sparse_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m4y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "ska::bytell_hash_map", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "ska::flat_hash_map", "folly::F14ValueMap", "tsl::hopscotch_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::node_hash_map", "tsl::sparse_map", "boost::unordered_map", "robin_hood::<br>unordered_node_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var measurement_names = [ "ctor & dtor map with 1 entry" ];

    var data = [
        { x: [ 8.40579e-08, 8.18259e-08, 7.51052e-08, 6.69554e-08, 6.33625e-08, 6.139730000000001e-08, 6.06288e-08, 5.59655e-08, 5.31206e-08, 5.01403e-08, 4.9725099999999996e-08, 4.8765e-08, 4.80394e-08, 4.37112e-08, 4.2564900000000005e-08, 4.103350000000001e-08, 3.92615e-08, 2.79347e-08, 2.5020899999999997e-08, 1.3038949999999999e-08, 1.258499e-08 ],
          y: m0y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "84.1ns<br>0MB", "81.8ns<br>0MB", "75.1ns<br>0MB", "67.0ns<br>0MB", "63.4ns<br>0MB", "61.4ns<br>0MB", "60.6ns<br>0MB", "56.0ns<br>0MB", "53.1ns<br>0MB", "50.1ns<br>0MB", "49.7ns<br>0MB", "48.8ns<br>0MB", "48.0ns<br>0MB", "43.7ns<br>0MB", "42.6ns<br>0MB", "41.0ns<br>0MB", "39.3ns<br>0MB", "27.9ns<br>0MB", "25.0ns<br>0MB", "13.0ns<br>0MB", "<b>12.6ns<br>0MB</b>" ],
        },
        { x: [ 9.10539e-08, 8.31129e-08, 6.664250000000001e-08, 6.604730000000001e-08, 6.34945e-08, 6.17031e-08, 6.122210000000001e-08, 6.025600000000001e-08, 5.6867300000000005e-08, 5.29314e-08, 5.2155799999999996e-08, 5.11971e-08, 5.05712e-08, 4.4751800000000005e-08, 4.35597e-08, 4.2496399999999994e-08, 3.9537e-08, 2.8126600000000003e-08, 2.59566e-08, 1.344946e-08, 1.3416840000000002e-08 ],
          y: m1y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "91.1ns<br>0MB", "83.1ns<br>0MB", "66.6ns<br>0MB", "66.0ns<br>0MB", "63.5ns<br>0MB", "61.7ns<br>0MB", "61.2ns<br>0MB", "60.3ns<br>0MB", "56.9ns<br>0MB", "52.9ns<br>0MB", "52.2ns<br>0MB", "51.2ns<br>0MB", "50.6ns<br>0MB", "44.8ns<br>0MB", "43.6ns<br>0MB", "42.5ns<br>0MB", "39.5ns<br>0MB", "28.1ns<br>0MB", "26.0ns<br>0MB", "13.4ns<br>0MB", "<b>13.4ns<br>0MB</b>" ],
        },
        { x: [ 8.4749e-08, 8.25132e-08, 7.62078e-08, 6.752610000000001e-08, 6.59022e-08, 6.29043e-08, 6.20395e-08, 6.16949e-08, 5.71335e-08, 5.52929e-08, 5.2583e-08, 5.05987e-08, 4.97394e-08, 4.55219e-08, 4.44744e-08, 4.17588e-08, 3.99123e-08, 2.84141e-08, 2.56447e-08, 1.314527e-08, 1.312089e-08 ],
          y: m2y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "84.7ns<br>0MB", "82.5ns<br>0MB", "76.2ns<br>0MB", "67.5ns<br>0MB", "65.9ns<br>0MB", "62.9ns<br>0MB", "62.0ns<br>0MB", "61.7ns<br>0MB", "57.1ns<br>0MB", "55.3ns<br>0MB", "52.6ns<br>0MB", "50.6ns<br>0MB", "49.7ns<br>0MB", "45.5ns<br>0MB", "44.5ns<br>0MB", "41.8ns<br>0MB", "39.9ns<br>0MB", "28.4ns<br>0MB", "25.6ns<br>0MB", "13.1ns<br>0MB", "<b>13.1ns<br>0MB</b>" ],
        },
        { x: [ 8.985970000000001e-08, 8.29312e-08, 7.6343e-08, 6.846960000000001e-08, 6.790910000000001e-08, 6.362359999999999e-08, 6.2376e-08, 6.158630000000001e-08, 5.69418e-08, 5.55752e-08, 5.3392299999999996e-08, 5.11259e-08, 5.09923e-08, 4.47285e-08, 4.35116e-08, 4.25503e-08, 4.04567e-08, 2.7830800000000002e-08, 2.6272099999999997e-08, 1.3761320000000001e-08, 1.3479550000000001e-08 ],
          y: m3y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "89.9ns<br>0MB", "82.9ns<br>0MB", "76.3ns<br>0MB", "68.5ns<br>0MB", "67.9ns<br>0MB", "63.6ns<br>0MB", "62.4ns<br>0MB", "61.6ns<br>0MB", "56.9ns<br>0MB", "55.6ns<br>0MB", "53.4ns<br>0MB", "51.1ns<br>0MB", "51.0ns<br>0MB", "44.7ns<br>0MB", "43.5ns<br>0MB", "42.6ns<br>0MB", "40.5ns<br>0MB", "27.8ns<br>0MB", "26.3ns<br>0MB", "13.8ns<br>0MB", "<b>13.5ns<br>0MB</b>" ],
        },
        { x: [ 9.47441e-08, 8.22938e-08, 7.08083e-08, 6.80031e-08, 6.557630000000001e-08, 6.47156e-08, 6.3279e-08, 6.17617e-08, 5.67377e-08, 5.6590100000000005e-08, 5.475140000000001e-08, 5.43726e-08, 5.21742e-08, 4.63837e-08, 4.53652e-08, 4.3051700000000004e-08, 4.13036e-08, 2.79127e-08, 2.6584500000000002e-08, 1.407475e-08, 1.370957e-08 ],
          y: m4y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "94.7ns<br>0MB", "82.3ns<br>0MB", "70.8ns<br>0MB", "68.0ns<br>0MB", "65.6ns<br>0MB", "64.7ns<br>0MB", "63.3ns<br>0MB", "61.8ns<br>0MB", "56.7ns<br>0MB", "56.6ns<br>0MB", "54.8ns<br>0MB", "54.4ns<br>0MB", "52.2ns<br>0MB", "46.4ns<br>0MB", "45.4ns<br>0MB", "43.1ns<br>0MB", "41.3ns<br>0MB", "27.9ns<br>0MB", "26.6ns<br>0MB", "14.1ns<br>0MB", "<b>13.7ns<br>0MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'CtorDtorSingleEntryMap'},
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
        yaxis: { title: 'libstdc++-v3', automargin: true, },
        yaxis2: { title: 'robin_hood::hash', automargin: true, },
        yaxis3: { title: 'absl::Hash', automargin: true, },
        yaxis4: { title: 'FNV1a', automargin: true, },
        yaxis5: { title: 'folly::hasher', automargin: true, },
        xaxis: { automargin: true,  range: [0, 1.01376187e-07]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_f51bc8f8', data, layout);
</script>
