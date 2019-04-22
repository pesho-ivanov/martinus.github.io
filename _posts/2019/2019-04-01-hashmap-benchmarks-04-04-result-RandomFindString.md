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
   * **[Find 1 -- 100k std::string](/2019/04/01/hashmap-benchmarks-04-04-result-RandomFindString/)** 👈
   * [Find 1 -- 1M std::string](/2019/04/01/hashmap-benchmarks-04-05-result-RandomFindString_1000000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-06-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----

This test is practically exactly the same as [Find 1-2000 size_t](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/), except that it uses 100 byte long `std::string`. There are 4000 lookups every 4 inserts, until 100k entries inserts.

# Results

## Hashes

In [Insert & Erase std::string](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/) we have evaluated that `robin_hood::hash` is fastest for 100 byte strings, and this is also the case in this benchmark. `libstdc++-v3`s performance is a tad slower, `FNV1a` is very slow.

## Hashmaps

Here, the `robin_hood::unordered_node_map` is the clear winner, only narrowly followed by `robin_hood::unordered_flat_map`. It can clearly be seen that the 1-byte overhead structure is quite important here: in the 0% lookup success case, the performance is much higher because this byte saves us from a lot of `std::string` comparison checks.

Not only is `robin_hood::unordered_node_map` the fastest, it has also quite low peak memory usage, only beaten by `tsl::sparse_map`. E.g. `tsl::robin_map` uses more than 3 times as much memory.

# Chart
Each entry shows average time for a single `find` and access operation (if found). The final number is average over all entries.

1. **blue**: 0% find success, 100 byte size `std::string`
1. **orange**: 25% find success, 100 byte size `std::string`
1. **green**: 50% find success, 100 byte size `std::string`
1. **red**: 75% find success, 100 byte size `std::string`
1. **magenta**: 100% find success, 100 byte size `std::string`

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_bfccb34e" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "boost::unordered_map", "emilib1::HashMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "tsl::hopscotch_map", "tsl::robin_map", "ska::bytell_hash_map", "<b>tsl::sparse_map</b>", "folly::F14ValueMap", "folly::F14NodeMap", "absl::flat_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "phmap::node_hash_map", "robin_hood::<br>unordered_flat_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m1y = [ "std::unordered_map", "boost::unordered_map", "emilib1::HashMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "<b>spp::sparse_hash_map</b>", "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "tsl::hopscotch_map", "ska::bytell_hash_map", "<b>tsl::sparse_map</b>", "folly::F14ValueMap", "folly::F14NodeMap", "absl::flat_hash_map", "phmap::flat_hash_map", "absl::node_hash_map", "phmap::node_hash_map", "robin_hood::<br>unordered_flat_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m2y = [ "boost::unordered_map", "std::unordered_map", "emilib1::HashMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "tsl::hopscotch_map", "ska::bytell_hash_map", "<b>tsl::sparse_map</b>", "folly::F14ValueMap", "folly::F14NodeMap", "absl::flat_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "phmap::node_hash_map", "robin_hood::<br>unordered_flat_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m3y = [ "std::unordered_map", "boost::unordered_map", "emilib1::HashMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "spp::sparse_hash_map", "tsl::robin_map", "tsl::hopscotch_map", "ska::bytell_hash_map", "<b>tsl::sparse_map</b>", "folly::F14ValueMap", "absl::flat_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "folly::F14NodeMap", "phmap::node_hash_map", "robin_hood::<br>unordered_flat_map", "<b>robin_hood::<br>unordered_node_map</b>"];
    var m4y = [ "boost::unordered_map", "std::unordered_map", "emilib1::HashMap", "phmap::<br>parallel_flat_hash_map", "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "boost::multi_index::<br>hashed_unique", "spp::sparse_hash_map", "tsl::robin_map", "tsl::hopscotch_map", "ska::bytell_hash_map", "<b>tsl::sparse_map</b>", "folly::F14ValueMap", "folly::F14NodeMap", "absl::flat_hash_map", "phmap::flat_hash_map", "absl::node_hash_map", "phmap::node_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var measurement_names = [ "0% 100 byte", "25% 100 byte", "50% 100 byte", "75% 100 byte", "100% 100 byte" ];

    var data = [
        { x: [ 8.32161e-08, 8.487955000000001e-08, 6.726995e-08, 6.45315e-08, 6.709375e-08, 6.718465e-08, 5.6253550000000004e-08, 6.746825e-08, 6.039295000000001e-08, 5.336120000000001e-08, 6.04882e-08, 4.836105e-08, 3.6029600000000004e-08, 3.4209250000000006e-08, 2.9641300000000004e-08, 2.98745e-08, 2.7762e-08, 2.846075e-08, 2.5575500000000003e-08, 2.652925e-08 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 9.59397e-08, 9.489390000000001e-08, 7.713675e-08, 7.894535000000001e-08, 8.035965e-08, 7.963845e-08, 7.19036e-08, 7.764745e-08, 7.218505e-08, 6.943764999999999e-08, 7.080684999999999e-08, 6.40952e-08, 5.0244050000000006e-08, 4.7306600000000006e-08, 4.3863e-08, 4.433135e-08, 4.199215e-08, 4.31405e-08, 3.734e-08, 3.89713e-08 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 9.48827e-08, 9.472425e-08, 8.345045e-08, 8.28226e-08, 8.220629999999999e-08, 7.933615e-08, 7.865845e-08, 7.645815e-08, 7.21136e-08, 7.254255e-08, 7.110725e-08, 7.072245000000001e-08, 5.73768e-08, 5.2603350000000004e-08, 5.087665e-08, 4.9950999999999995e-08, 4.914375e-08, 4.9225149999999994e-08, 4.43894e-08, 4.436475000000001e-08 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 8.876610000000001e-08, 8.89998e-08, 8.543185e-08, 8.25823e-08, 7.94346e-08, 7.536980000000001e-08, 7.896385e-08, 7.067715e-08, 6.85439e-08, 7.11307e-08, 6.74806e-08, 7.070465e-08, 6.09504e-08, 5.48127e-08, 5.479445e-08, 5.18895e-08, 5.28118e-08, 5.09772e-08, 4.9613050000000005e-08, 4.773705e-08 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 8.00072e-08, 7.831315000000001e-08, 8.299295e-08, 7.768355e-08, 7.191895e-08, 6.720905e-08, 7.492855e-08, 6.10646e-08, 6.188620000000001e-08, 6.5794e-08, 6.03389e-08, 6.680715e-08, 6.04112e-08, 5.139225000000001e-08, 5.532705e-08, 5.0078350000000006e-08, 5.258455e-08, 4.8005e-08, 4.843835e-08, 4.5558000000000003e-08 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "88.6ns avg<br>8.80MB", "88.4ns avg<br>9.00MB", "79.3ns avg<br>10.2MB", "77.3ns avg<br>7.51MB", "76.2ns avg<br>7.69MB", "73.7ns avg<br>8.93MB", "72.1ns avg<br>6.70MB", "70.7ns avg<br>11.7MB", "67.0ns avg<br>10.5MB", "66.5ns avg<br>22.7MB", "66.0ns avg<br>12.1MB", "<b>64.1ns avg<br>6.58MB</b>", "53.0ns avg<br>18.1MB", "48.1ns avg<br>10.3MB", "46.9ns avg<br>11.2MB", "45.2ns avg<br>8.54MB", "44.9ns avg<br>8.53MB", "44.0ns avg<br>7.72MB", "41.1ns avg<br>9.46MB", "<b>40.6ns avg<br>7.01MB</b>" ],
        },
        { x: [ 8.947715000000002e-08, 8.888504999999999e-08, 7.10034e-08, 6.66862e-08, 6.910705000000001e-08, 7.254855e-08, 5.5248899999999995e-08, 6.901825e-08, 5.85773e-08, 6.3073e-08, 6.29783e-08, 5.0149200000000005e-08, 3.769205e-08, 3.53293e-08, 2.9754699999999998e-08, 2.94552e-08, 3.029625e-08, 2.99593e-08, 2.801125e-08, 2.8600700000000003e-08 ],
          y: m1y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 9.854130000000001e-08, 9.722535e-08, 7.956555000000001e-08, 7.98742e-08, 8.105195000000001e-08, 8.20408e-08, 7.125385e-08, 7.855675e-08, 7.488785e-08, 7.353905e-08, 7.203620000000001e-08, 6.543965000000001e-08, 5.296925000000001e-08, 4.93446e-08, 4.404305e-08, 4.3355850000000006e-08, 4.495e-08, 4.429485e-08, 4.0226350000000005e-08, 4.10457e-08 ],
          y: m1y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 9.549185e-08, 9.548535000000001e-08, 8.484145e-08, 8.326320000000001e-08, 8.240245e-08, 8.054615e-08, 7.81376e-08, 7.67759e-08, 7.559395e-08, 7.276255000000001e-08, 7.16251e-08, 7.232435e-08, 5.80035e-08, 5.40372e-08, 5.083475e-08, 5.006985e-08, 5.025925e-08, 4.9523899999999995e-08, 4.67586e-08, 4.605765e-08 ],
          y: m1y, name: measurement_names[2] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 8.924524999999998e-08, 9.037045e-08, 8.665375e-08, 8.29296e-08, 7.996995e-08, 7.66865e-08, 7.843525000000001e-08, 7.12789e-08, 7.334125e-08, 6.890255e-08, 6.7951e-08, 7.28069e-08, 6.074755e-08, 5.500415000000001e-08, 5.45927e-08, 5.4141450000000006e-08, 5.263615e-08, 5.207255e-08, 5.058725e-08, 4.8901550000000006e-08 ],
          y: m1y, name: measurement_names[3] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 8.064775e-08, 8.049114999999999e-08, 8.419310000000001e-08, 7.819365e-08, 7.322625e-08, 6.861165000000001e-08, 7.452075e-08, 6.163525e-08, 6.76548e-08, 6.179435e-08, 6.10947e-08, 7.00643e-08, 5.939685e-08, 5.193125e-08, 5.4661e-08, 5.37509e-08, 5.09683e-08, 4.984415e-08, 4.947325e-08, 4.711905e-08 ],
          y: m1y, name: measurement_names[4] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "90.7ns avg<br>8.79MB", "90.5ns avg<br>9.10MB", "81.3ns avg<br>9.49MB", "78.2ns avg<br>7.42MB", "77.2ns avg<br>7.74MB", "76.1ns avg<br>8.93MB", "<b>71.5ns avg<br>6.46MB</b>", "71.5ns avg<br>11.8MB", "70.0ns avg<br>22.3MB", "68.0ns avg<br>9.46MB", "67.1ns avg<br>9.21MB", "<b>66.2ns avg<br>6.48MB</b>", "53.8ns avg<br>17.4MB", "49.1ns avg<br>10.2MB", "46.8ns avg<br>10.2MB", "46.2ns avg<br>9.90MB", "45.8ns avg<br>8.45MB", "45.1ns avg<br>7.70MB", "43.0ns avg<br>9.49MB", "<b>42.3ns avg<br>7.05MB</b>" ],
        },
        { x: [ 9.95701e-08, 9.630045e-08, 8.274895e-08, 7.697540000000001e-08, 7.98116e-08, 8.08986e-08, 6.627020000000001e-08, 7.93163e-08, 7.06177e-08, 7.42017e-08, 7.42707e-08, 6.1047e-08, 4.9905750000000003e-08, 4.772055e-08, 3.978985e-08, 4.07886e-08, 3.9251199999999996e-08, 3.971425e-08, 3.619655e-08, 3.72871e-08 ],
          y: m2y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 1.0669000000000001e-07, 1.062035e-07, 8.945444999999999e-08, 8.84999e-08, 8.97583e-08, 8.96234e-08, 8.037835e-08, 8.70282e-08, 8.343785000000001e-08, 8.22837e-08, 8.152855e-08, 7.48265e-08, 6.350995e-08, 6.01734e-08, 5.407795000000001e-08, 5.5557350000000005e-08, 5.3653900000000006e-08, 5.433185e-08, 4.9222099999999994e-08, 5.063140000000001e-08 ],
          y: m2y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 1.051675e-07, 1.0338300000000001e-07, 9.481265e-08, 9.23385e-08, 9.129295e-08, 8.76862e-08, 8.670815e-08, 8.507300000000001e-08, 8.449705e-08, 8.121519999999999e-08, 8.047735000000001e-08, 8.126415e-08, 6.84332e-08, 6.3769e-08, 6.13546e-08, 6.07337e-08, 6.045e-08, 5.99274e-08, 5.636855e-08, 5.626865e-08 ],
          y: m2y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 1.0116650000000001e-07, 9.786505e-08, 9.785935e-08, 9.365425e-08, 8.991655e-08, 8.447985e-08, 8.81657e-08, 8.009619999999999e-08, 8.30263e-08, 7.797254999999999e-08, 7.783175e-08, 8.309580000000001e-08, 7.19523e-08, 6.52015e-08, 6.70025e-08, 6.483145e-08, 6.59403e-08, 6.378470000000001e-08, 6.164785000000001e-08, 5.9304799999999996e-08 ],
          y: m2y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 9.253135000000001e-08, 9.0154e-08, 9.790074999999999e-08, 9.14801e-08, 8.50616e-08, 7.75345e-08, 8.62181e-08, 7.179075e-08, 7.93816e-08, 7.23562e-08, 7.253035e-08, 8.255220000000001e-08, 7.3395e-08, 6.412050000000001e-08, 6.978635000000001e-08, 6.60791e-08, 6.851960000000001e-08, 6.42092e-08, 6.198575e-08, 5.80744e-08 ],
          y: m2y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "101ns avg<br>9.26MB", "98.8ns avg<br>8.72MB", "92.6ns avg<br>10.8MB", "88.6ns avg<br>7.44MB", "87.2ns avg<br>7.81MB", "84.0ns avg<br>8.94MB", "81.5ns avg<br>6.67MB", "80.7ns avg<br>11.8MB", "80.2ns avg<br>23.0MB", "77.6ns avg<br>10.4MB", "77.3ns avg<br>9.61MB", "<b>76.6ns avg<br>6.65MB</b>", "65.4ns avg<br>17.4MB", "60.2ns avg<br>10.1MB", "58.4ns avg<br>9.18MB", "57.6ns avg<br>8.42MB", "57.6ns avg<br>9.16MB", "56.4ns avg<br>7.68MB", "53.1ns avg<br>9.48MB", "<b>52.3ns avg<br>7.03MB</b>" ],
        },
        { x: [ 9.87508e-08, 9.9587e-08, 8.16372e-08, 7.75879e-08, 8.057975000000002e-08, 8.11129e-08, 8.10057e-08, 6.631380000000001e-08, 6.951755000000001e-08, 7.353854999999999e-08, 7.38546e-08, 6.20904e-08, 4.6201350000000004e-08, 4.480335e-08, 4.524455e-08, 4.3857e-08, 4.46927e-08, 4.431545e-08, 4.16395e-08, 4.215295e-08 ],
          y: m3y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 1.11237e-07, 1.0995299999999999e-07, 9.191215e-08, 9.25556e-08, 9.4451e-08, 9.346419999999999e-08, 9.19665e-08, 8.36069e-08, 8.724285e-08, 8.59828e-08, 8.49979e-08, 7.870124999999999e-08, 6.017180000000001e-08, 5.732405e-08, 5.8125600000000005e-08, 5.62555e-08, 5.77208e-08, 5.7394099999999996e-08, 5.246795e-08, 5.3259700000000005e-08 ],
          y: m3y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 1.0936200000000001e-07, 1.0940750000000001e-07, 9.83761e-08, 9.65519e-08, 9.651760000000001e-08, 9.280425e-08, 9.07702e-08, 9.067195e-08, 8.933335e-08, 8.58347e-08, 8.507135000000001e-08, 8.461780000000001e-08, 6.673995e-08, 6.328635e-08, 6.290515000000001e-08, 6.238745e-08, 6.3032e-08, 6.214260000000001e-08, 5.976535e-08, 5.9009550000000006e-08 ],
          y: m3y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 1.028305e-07, 1.031885e-07, 9.910015e-08, 9.435595e-08, 9.252120000000001e-08, 8.806725e-08, 8.38379e-08, 8.957719999999999e-08, 8.622385e-08, 8.153415000000001e-08, 8.088765e-08, 8.3023e-08, 6.919915e-08, 6.65174e-08, 6.443145000000001e-08, 6.46536e-08, 6.374269999999999e-08, 6.301230000000001e-08, 6.39231e-08, 6.267135e-08 ],
          y: m3y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 9.27602e-08, 9.1865e-08, 9.44317e-08, 8.780515e-08, 8.40777e-08, 7.856605e-08, 7.272964999999999e-08, 8.386655e-08, 7.93048e-08, 7.396825e-08, 7.272095000000001e-08, 7.79589e-08, 6.807465000000001e-08, 6.576515e-08, 6.16618e-08, 6.308494999999999e-08, 6.010205000000001e-08, 5.981805000000001e-08, 6.22573e-08, 6.06006e-08 ],
          y: m3y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "103ns avg<br>8.81MB", "103ns avg<br>9.00MB", "93.1ns avg<br>13.8MB", "89.8ns avg<br>7.21MB", "89.6ns avg<br>7.74MB", "86.8ns avg<br>8.99MB", "84.1ns avg<br>11.8MB", "82.8ns avg<br>6.92MB", "82.3ns avg<br>22.8MB", "80.2ns avg<br>13.8MB", "79.5ns avg<br>12.0MB", "<b>77.3ns avg<br>6.50MB</b>", "62.1ns avg<br>19.2MB", "59.5ns avg<br>9.45MB", "58.5ns avg<br>8.42MB", "58.0ns avg<br>10.0MB", "57.9ns avg<br>10.2MB", "57.3ns avg<br>7.75MB", "56.0ns avg<br>9.50MB", "<b>55.5ns avg<br>7.03MB</b>" ],
        },
        { x: [ 1.86798e-07, 1.8309700000000001e-07, 1.67608e-07, 1.64474e-07, 1.656395e-07, 1.671935e-07, 1.6533049999999997e-07, 1.5017000000000003e-07, 1.561775e-07, 1.596365e-07, 1.573605e-07, 1.42716e-07, 1.304705e-07, 1.275895e-07, 1.2081550000000003e-07, 1.2057350000000002e-07, 1.21213e-07, 1.2090799999999999e-07, 1.1786850000000001e-07, 1.1660950000000001e-07 ],
          y: m4y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 1.990025e-07, 2.00796e-07, 1.8012450000000002e-07, 1.83213e-07, 1.83919e-07, 1.8329450000000001e-07, 1.80352e-07, 1.74732e-07, 1.7696049999999998e-07, 1.7486249999999998e-07, 1.7253350000000001e-07, 1.6704700000000003e-07, 1.513465e-07, 1.47978e-07, 1.36877e-07, 1.36431e-07, 1.376e-07, 1.3695600000000003e-07, 1.33071e-07, 1.31161e-07 ],
          y: m4y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 1.9913450000000003e-07, 1.980785e-07, 1.883915e-07, 1.8664600000000002e-07, 1.8540250000000002e-07, 1.82892e-07, 1.7990950000000001e-07, 1.818145e-07, 1.79652e-07, 1.7626600000000002e-07, 1.7372100000000002e-07, 1.735785e-07, 1.6175750000000002e-07, 1.571605e-07, 1.5300499999999999e-07, 1.52054e-07, 1.5159450000000001e-07, 1.502825e-07, 1.42394e-07, 1.42329e-07 ],
          y: m4y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 1.924165e-07, 1.887235e-07, 1.8780199999999998e-07, 1.8253600000000001e-07, 1.79532e-07, 1.75151e-07, 1.707745e-07, 1.76936e-07, 1.7294649999999998e-07, 1.6954650000000002e-07, 1.672035e-07, 1.6861950000000002e-07, 1.583245e-07, 1.51806e-07, 1.508915e-07, 1.49356e-07, 1.477365e-07, 1.464745e-07, 1.4988449999999998e-07, 1.505795e-07 ],
          y: m4y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 1.779105e-07, 1.761435e-07, 1.804265e-07, 1.7382650000000002e-07, 1.6901450000000002e-07, 1.6362750000000003e-07, 1.5742100000000002e-07, 1.6919700000000003e-07, 1.615305e-07, 1.59015e-07, 1.570165e-07, 1.6113650000000003e-07, 1.5321900000000002e-07, 1.45497e-07, 1.471055e-07, 1.4535200000000002e-07, 1.42425e-07, 1.405175e-07, 1.451395e-07, 1.460955e-07 ],
          y: m4y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "191ns avg<br>9.08MB", "189ns avg<br>8.78MB", "181ns avg<br>10.6MB", "178ns avg<br>7.39MB", "177ns avg<br>7.80MB", "174ns avg<br>8.98MB", "171ns avg<br>11.7MB", "171ns avg<br>6.89MB", "169ns avg<br>22.6MB", "168ns avg<br>10.4MB", "166ns avg<br>12.0MB", "<b>163ns avg<br>6.53MB</b>", "151ns avg<br>19.6MB", "146ns avg<br>9.90MB", "142ns avg<br>10.3MB", "141ns avg<br>8.47MB", "140ns avg<br>8.42MB", "139ns avg<br>7.67MB", "<b>138ns avg<br>6.98MB</b>", "<b>137ns avg<br>9.51MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomFindString'},
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
        yaxis3: { title: 'absl::Hash', automargin: true, },
        yaxis4: { title: 'folly::hasher', automargin: true, },
        yaxis5: { title: 'FNV1a', automargin: true, },
        xaxis: { automargin: true,  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_bfccb34e', data, layout);
</script>