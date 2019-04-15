---
layout: post
title: Hashmaps Benchmarks - Construction & Insert 1 Element & Destruction
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---
## Table of Contents

* Overview
* Construction Benchmarks
   * [Construction & Destruction](/2019/04/01/hashmap-benchmarks-02-01-result-CtorDtorEmptyMap/)
   * [Construction & Insert 1 Element & Destruction](/2019/04/01/hashmap-benchmarks-02-02-result-CtorDtorSingleEntryMap/)
* Modifying Benchmarks
   * [Insert & Erase 100M Entries](/2019/04/01/hashmap-benchmarks-03-01-result-InsertHugeInt/)
   * [Insert or Access, Varying Probability](/2019/04/01/hashmap-benchmarks-03-02-result-RandomDistinct2/)
   * [Insert & Erase](/2019/04/01/hashmap-benchmarks-03-03-result-RandomInsertErase/)
   * [Insert & Erase Strings](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/)
* Accessing
   * [Find 1-200 Entries](/2019/04/01/hashmap-benchmarks-04-01-result-RandomFind_200/)
   * [Find 1-2000 Entries](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/)
   * [Find 1-500k Entries](/2019/04/01/hashmap-benchmarks-04-03-result-RandomFind_500000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-04-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)


----

Almost the same as [Construction & Destruction](/2019/04/01/hashmap-benchmarks-CtorDtorEmptyMap/), but this time a single element is inserted. All maps that do lazy initialization are now forced to actually provide storage memory, and they have to calculate the hash function at least once to find a proper slot.

## Benchmark Code

The full benchmark code is this: 

```cpp
for (size_t n = 0; n < 50'000'000; ++n) {
    Map<int, int> map;
    map[123];
    result += map.size();
}
```

After the loop is done, the variable `result` is used in a verifcation step. It should always be 50'000'000.

## Results

Construction is generally very fast, and a non-issue. The slowest map to construct is `boost::multi_index::hashed_unique`, which takes 40.7ns to construct. Anything below 2-3ns is probably just measurement noise. Note that the benchmark results are very consistent regardless of the used hash function (as it should be).

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_9b91b14f" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "folly::F14ValueMap", "tsl::hopscotch_map", "ska::bytell_hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "eastl::hash_map", "tsl::sparse_map", "phmap::node_hash_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m1y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "tsl::hopscotch_map", "folly::F14ValueMap", "ska::bytell_hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "tsl::sparse_map", "phmap::node_hash_map", "eastl::hash_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m2y = [ "folly::F14NodeMap", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "tsl::hopscotch_map", "folly::F14ValueMap", "ska::bytell_hash_map", "boost::multi_index::<br>hashed_unique", "absl::node_hash_map", "eastl::hash_map", "phmap::node_hash_map", "tsl::sparse_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "emilib1::HashMap", "<b>tsl::robin_map</b>"];
    var m3y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "folly::F14ValueMap", "tsl::hopscotch_map", "ska::bytell_hash_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "phmap::node_hash_map", "eastl::hash_map", "tsl::sparse_map", "robin_hood::<br>unordered_node_map", "boost::unordered_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var m4y = [ "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "phmap::<br>parallel_flat_hash_map", "std::unordered_map", "folly::F14ValueMap", "tsl::hopscotch_map", "ska::bytell_hash_map", "absl::node_hash_map", "phmap::node_hash_map", "boost::multi_index::<br>hashed_unique", "tsl::sparse_map", "eastl::hash_map", "boost::unordered_map", "robin_hood::<br>unordered_node_map", "absl::flat_hash_map", "phmap::flat_hash_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_flat_map", "tsl::robin_map", "<b>emilib1::HashMap</b>"];
    var measurement_names = [ "ctor & dtor map with 1 entry" ];

    var data = [
        { x: [ 8.1649e-08, 8.1613e-08, 6.73236e-08, 6.33545e-08, 6.22363e-08, 6.13859e-08, 5.41271e-08, 5.2758700000000006e-08, 4.99179e-08, 4.78665e-08, 4.77894e-08, 4.72769e-08, 4.29136e-08, 4.2752699999999996e-08, 4.06977e-08, 3.87318e-08, 2.4456599999999997e-08, 2.3164400000000003e-08, 1.2542940000000001e-08, 1.149732e-08 ],
          y: m0y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "81.6ns<br>0.0MB", "81.6ns<br>0.0MB", "67.3ns<br>0.0MB", "63.4ns<br>0.0MB", "62.2ns<br>0.0MB", "61.4ns<br>0.0MB", "54.1ns<br>0.0MB", "52.8ns<br>0.0MB", "49.9ns<br>0.0MB", "47.9ns<br>0.0MB", "47.8ns<br>0.0MB", "47.3ns<br>0.0MB", "42.9ns<br>0.0MB", "42.8ns<br>0.0MB", "40.7ns<br>0.0MB", "38.7ns<br>0.0MB", "24.5ns<br>0.0MB", "23.2ns<br>0.0MB", "12.5ns<br>0.0MB", "<b>11.5ns<br>0.0MB</b>" ],
        },
        { x: [ 8.284849999999999e-08, 8.083820000000001e-08, 6.767819999999999e-08, 6.33747e-08, 6.17907e-08, 6.177e-08, 5.33095e-08, 5.29242e-08, 5.10182e-08, 5.06029e-08, 4.8815099999999996e-08, 4.7803900000000004e-08, 4.2886600000000004e-08, 4.24784e-08, 4.1111500000000004e-08, 3.90967e-08, 2.44405e-08, 2.31947e-08, 1.253734e-08, 1.1497649999999999e-08 ],
          y: m1y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "82.8ns<br>0.0MB", "80.8ns<br>0.0MB", "67.7ns<br>0.0MB", "63.4ns<br>0.0MB", "61.8ns<br>0.0MB", "61.8ns<br>0.0MB", "53.3ns<br>0.0MB", "52.9ns<br>0.0MB", "51.0ns<br>0.0MB", "50.6ns<br>0.0MB", "48.8ns<br>0.0MB", "47.8ns<br>0.0MB", "42.9ns<br>0.0MB", "42.5ns<br>0.0MB", "41.1ns<br>0.0MB", "39.1ns<br>0.0MB", "24.4ns<br>0.0MB", "23.2ns<br>0.0MB", "12.5ns<br>0.0MB", "<b>11.5ns<br>0.0MB</b>" ],
        },
        { x: [ 8.132519999999999e-08, 8.12312e-08, 6.717540000000001e-08, 6.3265e-08, 6.22311e-08, 6.15801e-08, 5.4920799999999995e-08, 5.2808500000000006e-08, 5.13533e-08, 4.97936e-08, 4.90038e-08, 4.8093700000000004e-08, 4.42605e-08, 4.2546599999999995e-08, 4.1167399999999996e-08, 3.9153000000000007e-08, 2.62582e-08, 2.46993e-08, 1.2555930000000001e-08, 1.2547930000000002e-08 ],
          y: m2y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "81.3ns<br>0.0MB", "81.2ns<br>0.0MB", "67.2ns<br>0.0MB", "63.3ns<br>0.0MB", "62.2ns<br>0.0MB", "61.6ns<br>0.0MB", "54.9ns<br>0.0MB", "52.8ns<br>0.0MB", "51.4ns<br>0.0MB", "49.8ns<br>0.0MB", "49.0ns<br>0.0MB", "48.1ns<br>0.0MB", "44.3ns<br>0.0MB", "42.5ns<br>0.0MB", "41.2ns<br>0.0MB", "39.2ns<br>0.0MB", "26.3ns<br>0.0MB", "24.7ns<br>0.0MB", "12.6ns<br>0.0MB", "<b>12.5ns<br>0.0MB</b>" ],
        },
        { x: [ 8.64664e-08, 8.14717e-08, 6.693570000000001e-08, 6.34294e-08, 6.16422e-08, 6.1638e-08, 5.46969e-08, 5.41859e-08, 5.3577599999999997e-08, 5.2219100000000005e-08, 4.91491e-08, 4.7751400000000004e-08, 4.3414300000000004e-08, 4.17462e-08, 4.12173e-08, 3.91244e-08, 2.4605300000000004e-08, 2.4157499999999996e-08, 1.257241e-08, 1.149697e-08 ],
          y: m3y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "86.5ns<br>0.0MB", "81.5ns<br>0.0MB", "66.9ns<br>0.0MB", "63.4ns<br>0.0MB", "61.6ns<br>0.0MB", "61.6ns<br>0.0MB", "54.7ns<br>0.0MB", "54.2ns<br>0.0MB", "53.6ns<br>0.0MB", "52.2ns<br>0.0MB", "49.1ns<br>0.0MB", "47.8ns<br>0.0MB", "43.4ns<br>0.0MB", "41.7ns<br>0.0MB", "41.2ns<br>0.0MB", "39.1ns<br>0.0MB", "24.6ns<br>0.0MB", "24.2ns<br>0.0MB", "12.6ns<br>0.0MB", "<b>11.5ns<br>0.0MB</b>" ],
        },
        { x: [ 8.70006e-08, 8.11288e-08, 6.729809999999999e-08, 6.31595e-08, 6.211539999999999e-08, 6.13609e-08, 5.57014e-08, 5.4202100000000003e-08, 5.32431e-08, 5.27335e-08, 4.96447e-08, 4.866769999999999e-08, 4.42321e-08, 4.39878e-08, 4.1058900000000005e-08, 3.8801000000000004e-08, 2.44488e-08, 2.4133299999999998e-08, 1.343813e-08, 1.149798e-08 ],
          y: m4y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
            textposition: 'outside',
            text: [ "87.0ns<br>0.0MB", "81.1ns<br>0.0MB", "67.3ns<br>0.0MB", "63.2ns<br>0.0MB", "62.1ns<br>0.0MB", "61.4ns<br>0.0MB", "55.7ns<br>0.0MB", "54.2ns<br>0.0MB", "53.2ns<br>0.0MB", "52.7ns<br>0.0MB", "49.6ns<br>0.0MB", "48.7ns<br>0.0MB", "44.2ns<br>0.0MB", "44.0ns<br>0.0MB", "41.1ns<br>0.0MB", "38.8ns<br>0.0MB", "24.4ns<br>0.0MB", "24.1ns<br>0.0MB", "13.4ns<br>0.0MB", "<b>11.5ns<br>0.0MB</b>" ],
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
        yaxis: { title: 'Identity', automargin: true, },
        yaxis2: { title: 'robin_hood::hash', automargin: true, },
        yaxis3: { title: 'absl::Hash', automargin: true, },
        yaxis4: { title: 'FNV1a', automargin: true, },
        yaxis5: { title: 'folly::hasher', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_9b91b14f', data, layout);
</script>
