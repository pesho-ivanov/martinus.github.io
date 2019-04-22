---
layout: post
title: Hashmaps Benchmarks - Find 1-500k Entries
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
   * **[Find 1 -- 1M std::string](/2019/04/01/hashmap-benchmarks-04-05-result-RandomFindString_1000000/)** 👈
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-06-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----
 
Again much like [Find 1-2000 size_t](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/), except that this time we use 13 byte strings. Every time we insert 4 strings, 800 lookups are performed. This is repeated until 1 million entries are inserted.

# Results

## Hashes

In [Insert & Erase std::string](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/) we have evaluated that `robin_hood::hash` is fastest for 100 byte strings, and this is also the case in this benchmark. `libstdc++-v3`s performance is a tad slower, `FNV1a` is very slow.

## Hashmaps

Here the advantage of `robin_hood::unordered_node_map` becomes even more pronounced. It beats all competitors by a nice margin. Memory usage is the second best, only `tsl::sparse_map` has lower memory usage.

# Chart

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_6cffbaf2" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "spp::sparse_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "ska::bytell_hash_map", "folly::F14ValueMap", "tsl::robin_map", "<b>tsl::sparse_map</b>", "absl::flat_hash_map", "phmap::flat_hash_map", "folly::F14NodeMap", "robin_hood::<br>unordered_flat_map", "absl::node_hash_map", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m1y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "spp::sparse_hash_map", "tsl::hopscotch_map", "tsl::robin_map", "ska::bytell_hash_map", "emilib1::HashMap", "folly::F14ValueMap", "<b>tsl::sparse_map</b>", "absl::flat_hash_map", "folly::F14NodeMap", "phmap::flat_hash_map", "robin_hood::<br>unordered_flat_map", "absl::node_hash_map", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m2y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "tsl::hopscotch_map", "spp::sparse_hash_map", "emilib1::HashMap", "ska::bytell_hash_map", "tsl::robin_map", "folly::F14ValueMap", "<b>tsl::sparse_map</b>", "folly::F14NodeMap", "absl::flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_flat_map", "absl::node_hash_map", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m3y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "tsl::hopscotch_map", "spp::sparse_hash_map", "tsl::robin_map", "emilib1::HashMap", "ska::bytell_hash_map", "folly::F14ValueMap", "<b>tsl::sparse_map</b>", "absl::flat_hash_map", "phmap::flat_hash_map", "absl::node_hash_map", "robin_hood::<br>unordered_flat_map", "folly::F14NodeMap", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m4y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "tsl::robin_map", "emilib1::HashMap", "tsl::hopscotch_map", "ska::bytell_hash_map", "folly::F14ValueMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "absl::flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_flat_map", "folly::F14NodeMap", "absl::node_hash_map", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var measurement_names = [ "0% 13 byte", "100% 13 byte", "25% 13 byte", "50% 13 byte", "75% 13 byte" ];

    var data = [
        { x: [ 1.1088900000000001e-07, 9.9817e-08, 6.9219e-08, 6.96445e-08, 6.773925e-08, 5.10045e-08, 4.48526e-08, 4.85949e-08, 4.9387275e-08, 4.552945e-08, 3.179815e-08, 4.2708749999999995e-08, 3.7706425e-08, 2.0538224999999997e-08, 2.003135e-08, 2.7114925e-08, 1.8045325e-08, 2.4807025000000003e-08, 2.406135e-08, 1.9723875e-08 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 8.882725e-08, 7.7289e-08, 6.573050000000001e-08, 5.994225e-08, 5.2643000000000004e-08, 6.534999999999999e-08, 5.8228250000000004e-08, 5.42765e-08, 5.1513000000000006e-08, 5.2930250000000005e-08, 6.2106e-08, 5.066875e-08, 5.2839e-08, 5.2066e-08, 5.106875e-08, 4.0712275000000006e-08, 4.7698225000000004e-08, 3.9993825e-08, 3.91584e-08, 3.7827e-08 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 1.1853350000000001e-07, 1.0749549999999998e-07, 7.902775e-08, 7.7978e-08, 7.465675e-08, 6.209775e-08, 5.778725e-08, 5.6439499999999994e-08, 5.47635e-08, 5.350525e-08, 4.6398500000000004e-08, 5.1429750000000004e-08, 4.9755699999999996e-08, 3.7006149999999996e-08, 3.602095e-08, 3.94061e-08, 3.4061e-08, 3.965405e-08, 3.925635e-08, 3.3417075e-08 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 1.152845e-07, 1.0419775000000001e-07, 7.843775e-08, 7.589900000000001e-08, 7.219475e-08, 6.745024999999999e-08, 6.159625e-08, 6.11865e-08, 5.6911e-08, 5.6686999999999997e-08, 5.5356500000000003e-08, 5.474375e-08, 5.37955e-08, 4.5588699999999996e-08, 4.416692500000001e-08, 4.347915e-08, 4.3209175e-08, 4.22838e-08, 4.1717125e-08, 3.7287149999999996e-08 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 1.03669e-07, 9.265925e-08, 7.39625e-08, 7.001975000000001e-08, 6.347975e-08, 6.791149999999999e-08, 6.101525e-08, 5.8047500000000004e-08, 5.59385e-08, 5.5679000000000005e-08, 6.017575e-08, 5.386e-08, 5.43305e-08, 4.98277e-08, 4.855395e-08, 4.2789925e-08, 4.72308e-08, 4.1670275e-08, 4.1274475000000005e-08, 3.913935e-08 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "107ns avg<br>72.8MB", "96.3ns avg<br>64.6MB", "73.3ns avg<br>56.9MB", "70.7ns avg<br>60.5MB", "66.1ns avg<br>70.5MB", "62.8ns avg<br>88.8MB", "56.7ns avg<br>38.2MB", "55.7ns avg<br>135MB", "53.7ns avg<br>135MB", "52.9ns avg<br>114MB", "51.2ns avg<br>100MB", "50.7ns avg<br>135MB", "<b>49.7ns avg<br>36.7MB</b>", "41.0ns avg<br>115MB", "40.0ns avg<br>115MB", "38.7ns avg<br>67.7MB", "38.0ns avg<br>114MB", "37.7ns avg<br>67.2MB", "37.1ns avg<br>68.4MB", "<b>33.5ns avg<br>50.8MB</b>" ],
        },
        { x: [ 1.1077999999999999e-07, 1.1406e-07, 7.21475e-08, 7.43385e-08, 7.367425000000001e-08, 5.3944500000000004e-08, 4.6518125e-08, 5.2347750000000006e-08, 5.0914e-08, 5.05555e-08, 5.218050000000001e-08, 3.475035e-08, 4.0935774999999995e-08, 2.337575e-08, 3.0649675e-08, 2.278425e-08, 2.0900625e-08, 2.7738800000000004e-08, 2.7e-08, 2.2564774999999998e-08 ],
          y: m1y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 9.21455e-08, 8.227825e-08, 6.755775e-08, 6.10765e-08, 5.4241749999999997e-08, 6.705025e-08, 5.98575e-08, 5.596775e-08, 5.360925e-08, 5.449575e-08, 5.31405e-08, 6.77755e-08, 5.5256749999999996e-08, 5.4074e-08, 4.4948275000000005e-08, 5.30975e-08, 5.0206e-08, 4.21654e-08, 4.180095e-08, 4.0037225e-08 ],
          y: m1y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 1.1919675e-07, 1.2137475e-07, 8.17645e-08, 8.169950000000001e-08, 7.837424999999999e-08, 6.459025e-08, 5.8867499999999994e-08, 5.89475e-08, 5.8836250000000005e-08, 5.78945e-08, 5.6641000000000004e-08, 4.962335e-08, 5.2968e-08, 4.0088575e-08, 4.3819274999999995e-08, 3.91024e-08, 3.6690025000000004e-08, 4.3225725e-08, 4.2839850000000004e-08, 3.576695e-08 ],
          y: m1y, name: measurement_names[2] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 1.1962e-07, 1.1388199999999999e-07, 8.135775e-08, 7.917225e-08, 7.285250000000001e-08, 7.02525e-08, 6.347900000000001e-08, 6.084225e-08, 6.076075e-08, 6.042025000000001e-08, 5.8883750000000006e-08, 5.9798e-08, 5.7178250000000004e-08, 4.820565e-08, 4.7450975e-08, 4.6927075e-08, 4.602165e-08, 4.4785875e-08, 4.4604075e-08, 4.0242900000000006e-08 ],
          y: m1y, name: measurement_names[3] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 1.1128375e-07, 1.00249e-07, 7.6671e-08, 7.200525e-08, 6.526350000000001e-08, 7.039124999999999e-08, 6.240149999999999e-08, 5.9303e-08, 5.790075e-08, 5.825975e-08, 5.7528750000000005e-08, 6.580375e-08, 5.734325e-08, 5.1919500000000004e-08, 4.739595e-08, 5.078075e-08, 5.018075e-08, 4.408635e-08, 4.3604325e-08, 4.1916249999999997e-08 ],
          y: m1y, name: measurement_names[4] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "111ns avg<br>66.9MB", "106ns avg<br>60.7MB", "75.9ns avg<br>57.2MB", "73.7ns avg<br>64.2MB", "68.9ns avg<br>82.7MB", "65.2ns avg<br>93.9MB", "58.2ns avg<br>38.4MB", "57.5ns avg<br>135MB", "56.4ns avg<br>135MB", "56.3ns avg<br>114MB", "55.7ns avg<br>135MB", "55.6ns avg<br>100MB", "<b>52.7ns avg<br>37.0MB</b>", "43.5ns avg<br>115MB", "42.9ns avg<br>65.6MB", "42.5ns avg<br>115MB", "40.8ns avg<br>114MB", "40.4ns avg<br>69.0MB", "40.0ns avg<br>67.8MB", "<b>36.1ns avg<br>50.7MB</b>" ],
        },
        { x: [ 1.15881e-07, 1.1919549999999999e-07, 7.673824999999999e-08, 7.938375000000001e-08, 7.9781e-08, 5.8134750000000004e-08, 5.8165750000000006e-08, 5.1844250000000004e-08, 5.829425e-08, 5.5193250000000004e-08, 5.6172499999999996e-08, 3.8206274999999996e-08, 4.45544e-08, 3.4146700000000005e-08, 2.5748650000000002e-08, 2.56277e-08, 2.3939374999999997e-08, 3.025425e-08, 2.9779500000000002e-08, 2.5616075e-08 ],
          y: m2y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 9.631975000000001e-08, 8.732e-08, 7.23725e-08, 6.725125e-08, 5.8324e-08, 7.174825e-08, 6.12115e-08, 6.37665e-08, 5.979525e-08, 5.9961e-08, 5.7769000000000006e-08, 7.168775e-08, 5.988725e-08, 4.918265e-08, 5.761975e-08, 5.6968e-08, 5.431e-08, 4.536815e-08, 4.5461e-08, 4.4895025000000004e-08 ],
          y: m2y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 1.2586825e-07, 1.2482575e-07, 8.813600000000002e-08, 8.836375e-08, 8.426125e-08, 7.064349999999999e-08, 6.51885e-08, 6.501575e-08, 6.388925e-08, 6.342050000000001e-08, 6.4075e-08, 5.3866e-08, 5.7648e-08, 4.85032e-08, 4.3283125e-08, 4.2676225e-08, 3.99607e-08, 4.652905e-08, 4.641915e-08, 3.9471625e-08 ],
          y: m2y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 1.237025e-07, 1.1841375000000001e-07, 8.729400000000001e-08, 8.60735e-08, 7.994825e-08, 7.619375e-08, 6.8318e-08, 6.902674999999999e-08, 6.679049999999999e-08, 6.6174e-08, 6.637724999999999e-08, 6.439725e-08, 6.261249999999999e-08, 5.202875e-08, 5.204625e-08, 5.132075e-08, 4.9865925e-08, 4.8705075000000006e-08, 4.8923775e-08, 4.465134999999999e-08 ],
          y: m2y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 1.120875e-07, 1.0392925000000001e-07, 8.16345e-08, 7.876725e-08, 7.059725000000001e-08, 7.578975e-08, 6.548175e-08, 6.7286e-08, 6.493850000000001e-08, 6.381225e-08, 6.307000000000001e-08, 7.072025e-08, 6.257775e-08, 5.23225e-08, 5.55255e-08, 5.491525e-08, 5.425625e-08, 4.7813575e-08, 4.777477500000001e-08, 4.7470625e-08 ],
          y: m2y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "115ns avg<br>72.9MB", "111ns avg<br>64.5MB", "81.2ns avg<br>57.7MB", "80.0ns avg<br>63.5MB", "74.6ns avg<br>76.8MB", "70.5ns avg<br>90.9MB", "63.7ns avg<br>135MB", "63.4ns avg<br>38.4MB", "62.7ns avg<br>135MB", "61.7ns avg<br>114MB", "61.5ns avg<br>135MB", "59.8ns avg<br>100MB", "<b>57.5ns avg<br>36.7MB</b>", "47.2ns avg<br>65.9MB", "46.8ns avg<br>115MB", "46.3ns avg<br>115MB", "44.5ns avg<br>114MB", "43.7ns avg<br>69.0MB", "43.7ns avg<br>68.0MB", "<b>40.4ns avg<br>50.7MB</b>" ],
        },
        { x: [ 1.3959425e-07, 1.18467e-07, 8.163175e-08, 7.902225e-08, 7.913050000000001e-08, 5.956825e-08, 5.7563e-08, 5.206475e-08, 5.5934750000000004e-08, 5.757125e-08, 5.5207e-08, 3.7631275e-08, 4.44699e-08, 2.7219799999999997e-08, 2.6076875e-08, 3.1817375e-08, 2.4175650000000002e-08, 3.1961850000000004e-08, 3.0357950000000004e-08, 2.605455e-08 ],
          y: m3y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 1.23014e-07, 8.683325000000001e-08, 7.337275e-08, 6.664225e-08, 5.904225e-08, 7.4469e-08, 6.219525e-08, 6.404875e-08, 6.043575e-08, 5.8846249999999997e-08, 5.906425e-08, 7.0648e-08, 5.8718e-08, 6.0201e-08, 5.7351e-08, 4.6803025000000004e-08, 5.41935e-08, 4.60347e-08, 4.54603e-08, 4.400025e-08 ],
          y: m3y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 1.5079575000000002e-07, 1.2624275000000002e-07, 9.20115e-08, 8.797399999999999e-08, 8.4924e-08, 7.2144e-08, 6.508925e-08, 6.487e-08, 6.38745e-08, 6.316375e-08, 6.3188e-08, 5.1575250000000004e-08, 5.74605e-08, 4.478965e-08, 4.2379975e-08, 4.784205e-08, 4.036895e-08, 4.4108375000000004e-08, 4.616835e-08, 3.9671725e-08 ],
          y: m3y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 1.48802e-07, 1.1853e-07, 9.01735e-08, 8.567074999999999e-08, 8.106475000000001e-08, 7.8402e-08, 6.68235e-08, 6.881150000000001e-08, 6.736650000000001e-08, 6.595075e-08, 6.57105e-08, 6.17785e-08, 6.136625e-08, 5.3264e-08, 5.100575e-08, 5.033e-08, 5.003025e-08, 4.811925e-08, 4.8581075e-08, 4.4385225e-08 ],
          y: m3y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 1.3800075e-07, 1.044075e-07, 8.31425e-08, 7.810425e-08, 7.1764e-08, 7.772675e-08, 6.64845e-08, 6.73e-08, 6.527825e-08, 6.4355e-08, 6.405825e-08, 6.780875e-08, 6.117225e-08, 5.808725e-08, 5.4922999999999995e-08, 4.8945799999999996e-08, 5.420525e-08, 4.86625e-08, 4.76159e-08, 4.6222125e-08 ],
          y: m3y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "140ns avg<br>67.0MB", "111ns avg<br>60.7MB", "84.1ns avg<br>57.1MB", "79.5ns avg<br>64.3MB", "75.2ns avg<br>82.7MB", "72.5ns avg<br>87.8MB", "63.6ns avg<br>135MB", "63.4ns avg<br>38.4MB", "62.6ns avg<br>135MB", "62.0ns avg<br>135MB", "61.4ns avg<br>114MB", "57.9ns avg<br>101MB", "<b>56.6ns avg<br>36.8MB</b>", "48.7ns avg<br>115MB", "46.3ns avg<br>115MB", "45.1ns avg<br>69.3MB", "44.6ns avg<br>114MB", "43.8ns avg<br>65.2MB", "43.6ns avg<br>66.6MB", "<b>40.1ns avg<br>50.6MB</b>" ],
        },
        { x: [ 1.6153375e-07, 1.4981725e-07, 9.553675000000001e-08, 1.066655e-07, 1.1071425e-07, 7.166575e-08, 8.5061e-08, 8.2383e-08, 8.1397e-08, 7.6805e-08, 5.6513e-08, 6.001525e-08, 5.5322250000000004e-08, 3.528795e-08, 3.4375125e-08, 3.035055e-08, 4.9182250000000004e-08, 4.0449275e-08, 3.9052699999999996e-08, 3.2681325e-08 ],
          y: m4y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 1.3143499999999999e-07, 1.2399575e-07, 1.0008025e-07, 8.664975e-08, 7.827700000000001e-08, 1.0745275e-07, 8.7215e-08, 8.471525e-08, 8.372975000000002e-08, 8.512625e-08, 1.0237825e-07, 9.439674999999999e-08, 8.975750000000001e-08, 9.5841e-08, 9.380224999999999e-08, 8.205074999999999e-08, 6.328875e-08, 6.941525e-08, 6.883550000000001e-08, 5.4995250000000004e-08 ],
          y: m4y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 1.6398775e-07, 1.5329425e-07, 1.0566275e-07, 1.114935e-07, 1.1215675000000001e-07, 8.263925000000001e-08, 8.964125e-08, 8.474175e-08, 8.487625e-08, 8.19695e-08, 7.243225e-08, 7.23735e-08, 6.7371e-08, 5.4027750000000005e-08, 5.269425e-08, 4.8786375e-08, 6.043025e-08, 5.7777e-08, 5.6596e-08, 4.7911375e-08 ],
          y: m4y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 1.5308625e-07, 1.464465e-07, 1.0668275e-07, 1.047235e-07, 1.016725e-07, 9.264525e-08, 9.106699999999999e-08, 8.624500000000002e-08, 8.589975e-08, 8.448975e-08, 8.525725e-08, 8.177925000000001e-08, 7.746075e-08, 6.9724e-08, 6.8425e-08, 6.446e-08, 6.294400000000001e-08, 6.3089e-08, 6.273975000000001e-08, 5.410425e-08 ],
          y: m4y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 1.4280600000000001e-07, 1.3681975000000002e-07, 1.0554400000000001e-07, 9.661875e-08, 9.105175000000001e-08, 1.0144075000000001e-07, 8.977875e-08, 8.656025e-08, 8.529725e-08, 8.515925000000001e-08, 9.493575000000002e-08, 8.888475000000001e-08, 8.375099999999999e-08, 8.340150000000001e-08, 8.181525e-08, 7.616550000000001e-08, 6.319074999999999e-08, 6.676549999999999e-08, 6.65545e-08, 5.699475e-08 ],
          y: m4y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "151ns avg<br>67.5MB", "142ns avg<br>63.4MB", "103ns avg<br>57.5MB", "101ns avg<br>64.3MB", "98.8ns avg<br>82.3MB", "91.2ns avg<br>90.9MB", "88.6ns avg<br>135MB", "84.9ns avg<br>135MB", "84.2ns avg<br>135MB", "82.7ns avg<br>114MB", "82.3ns avg<br>100MB", "79.5ns avg<br>38.4MB", "<b>74.7ns avg<br>36.7MB</b>", "67.7ns avg<br>115MB", "66.2ns avg<br>115MB", "60.4ns avg<br>114MB", "59.8ns avg<br>66.3MB", "59.5ns avg<br>68.9MB", "58.8ns avg<br>67.7MB", "<b>49.3ns avg<br>50.8MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomFindString_1000000'},
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
        yaxis2: { title: 'libstdc++-v3', automargin: true, },
        yaxis3: { title: 'FNV1a', automargin: true, },
        yaxis4: { title: 'folly::hasher', automargin: true, },
        yaxis5: { title: 'absl::Hash', automargin: true, },
        xaxis: { automargin: true,  range: [0, 8.055481625e-07]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_6cffbaf2', data, layout);
</script>
