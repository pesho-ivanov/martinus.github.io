---
layout: post
title: Hashmaps Benchmarks - Insert & Erase std::string
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
   * **[Insert & Erase std::string](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/)** 👈
* Accessing
   * [Find 1 -- 2000 uint64_t](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/)
   * [Find 1 -- 500k uint64_t](/2019/04/01/hashmap-benchmarks-04-03-result-RandomFind_500000/)
   * [Find 1 -- 100k std::string](/2019/04/01/hashmap-benchmarks-04-04-result-RandomFindString/)
   * [Find 1 -- 1M std::string](/2019/04/01/hashmap-benchmarks-04-05-result-RandomFindString_1000000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-06-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)


----
This benchmark is very similar to [Insert & Erase](/2019/04/01/hashmap-benchmarks-03-03-result-RandomInsertErase/), but with a `Map<std::string, std::string>`. It constantly inserts and removes random strings. The benchmark is run with different sizes of `std::string`: 7, 8, 13, 100, and 1000 bytes. Each time a string is inserted or queried, only the last few bytes are modified. That means if two hashes of the string are the same, `std::equal` will have to check quite a few bytes, especially for longer strings. Since comparisons and hashing takes much longer for longer strings, I have adapted the runtime for each benchmark:

* 7 bytes: 20M iterations
* 8 bytes: 20M iterations
* 13 bytes: 20M iterations
* 100 bytes: 12M iterations
* 1000 bytes: 6M iteratons

The benchmark code looks like this. It takes great care that the random string is not unnecessarily copied or recreated.

```cpp
std::string str(string_length, 'x');

Map<std::string, std::string> map;
for (size_t i = 0; i < max_n; ++i) {    
    // create an entry.
    randomize(str);
    map[str];

    // find and erase entry.
    randomize(str);
    auto it = map.find(str);
    if (it != map.end()) {
        ++verifier;
        map.erase(it);
    }
}
```

# Results

## Hashes

Here, `libstdc++-v3` hash is uses the MurmurHash 2 algorithm. `robin_hood::hash` also uses the Murmur Hash 2, but does not care about endianness and uses a slightly different implementation, which seems to be generally a bit faster, especially for short strings. Here the individual entries are extremely interesting, as it shows that each hash has different strenghts.

I have created a separate benchmark, that just compares hashing performance of strings with different lengths. Times are in ns per hash calculation:

|    length | robin_hood::hash | libstdc++ | absl::Hash | folly::hasher |   FNV1a |
|----------:|-----------------:|----------:|-----------:|--------------:|--------:|
|    7 byte |             3.75 |      5.77 |   **2.61** |          9.20 |    5.04 |
|    8 byte |             3.05 |      3.44 |   **2.60** |          8.39 |    5.63 |
|   13 byte |         **4.23** |      6.05 |       8.44 |          8.84 |    8.12 |
|  100 byte |        **14.40** |      15.6 |      17.70 |         31.11 |  102.33 |
| 1000 byte |           153.82 |    152.76 |  **77.85** |        107.73 | 1228.32 |

`absl::Hash` performs very well, but the 13 byte case is almost twice as slow as for `robin_hood::hash`. `FNV1a` performs reasonably well for small data, and has the advantage that it is very easy to inline because the code is very short and simple (an effect that can't easily be seen with such a microbenchmark).

Based on this benchmark `absl::Hash` should be the winner in the map benchmark in theory. In practice, this is not the case. In practice, `robin_hood::hash` performs better than `absl::Hash` - at least in this benchmark. I believe the reason for this is that the `robin_hood::hash` implementation is much more compact and thus easier to inline and has less code bloat than `absl::Hash`.

## Hashmaps

This time, `robin_hood::unordered_flat_map` is the clear winner, by a nice margin. It has this wide margin regardless of the hash, even more so for slow hashes like `FNV1a`. It's memory usage is also very good: `tsl::robin_map` which has often been the speed king so far, uses more than twice as much memory.

I find it interesting that `robin_hood::unordered_node_map` is second fastest while at the same time having lowest peak memory usage - even lower than `tsl::sparse_map`.

# Chart
Each entry shows total runtime of that part of the benchmark.

1. **blue**: 7 bytes: 20M iterations
1. **orange**: 8 bytes: 20M iterations
1. **green**: 13 bytes: 20M iterations
1. **red**: 100 bytes: 12M iterations
1. **magenta**: 1000 bytes: 6M iteratons

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_73e84ae8" style="height:260em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "boost::unordered_map", "tsl::sparse_map", "spp::sparse_hash_map", "phmap::<br>parallel_node_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "absl::node_hash_map", "phmap::node_hash_map", "folly::F14NodeMap", "tsl::robin_map", "folly::F14ValueMap", "ska::bytell_hash_map", "ska::flat_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var m1y = [ "std::unordered_map", "boost::unordered_map", "tsl::sparse_map", "phmap::<br>parallel_node_hash_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "eastl::hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "phmap::node_hash_map", "absl::node_hash_map", "folly::F14NodeMap", "tsl::robin_map", "folly::F14ValueMap", "ska::bytell_hash_map", "ska::flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var m2y = [ "std::unordered_map", "boost::unordered_map", "tsl::sparse_map", "phmap::<br>parallel_node_hash_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "phmap::node_hash_map", "absl::node_hash_map", "folly::F14ValueMap", "tsl::robin_map", "folly::F14NodeMap", "ska::bytell_hash_map", "ska::flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var m3y = [ "std::unordered_map", "boost::unordered_map", "tsl::sparse_map", "spp::sparse_hash_map", "phmap::<br>parallel_node_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "phmap::node_hash_map", "absl::node_hash_map", "ska::bytell_hash_map", "tsl::robin_map", "folly::F14NodeMap", "folly::F14ValueMap", "ska::flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var m4y = [ "std::unordered_map", "boost::unordered_map", "phmap::<br>parallel_node_hash_map", "tsl::sparse_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "phmap::node_hash_map", "absl::node_hash_map", "eastl::hash_map", "ska::bytell_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "folly::F14NodeMap", "folly::F14ValueMap", "ska::flat_hash_map", "tsl::robin_map", "<b>robin_hood::<br>unordered_node_map</b>", "<b>robin_hood::<br>unordered_flat_map</b>"];
    var measurement_names = [ "7 bytes", "8 bytes", "13 bytes", "100 bytes", "1000 bytes" ];

    var data = [
        { x: [ 7.46533, 7.031385, 6.422325000000001, 5.9750250000000005, 5.79618, 5.8291450000000005, 4.721265000000001, 4.07191, 3.565905, 3.56925, 3.8332800000000002, 3.7186950000000003, 3.858405, 3.30875, 3.48485, 3.0577249999999996, 2.73049, 2.6648449999999997, 2.6227, 2.749705, 2.6991899999999998 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 9.71689, 9.19937, 7.195125, 6.755974999999999, 7.30672, 7.10721, 6.214005, 5.21331, 4.82399, 4.794115, 5.276755, 5.26267, 5.20027, 4.803555, 5.046495, 4.503175, 4.54441, 3.981065, 3.93246, 4.1196, 3.9182499999999996 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 7.59278, 7.16988, 6.4536549999999995, 5.963365, 5.8551, 5.87422, 4.85889, 4.1729199999999995, 3.63477, 3.690785, 3.92438, 3.840845, 3.968255, 3.36355, 3.53803, 3.12859, 2.787115, 2.73376, 2.703205, 2.8864099999999997, 2.750615 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 5.996995, 5.71807, 6.34653, 6.075699999999999, 5.1554, 4.711355, 4.01622, 5.493735, 4.9048549999999995, 4.69975, 3.459205, 3.4663500000000003, 3.208875, 4.25978, 3.842075, 4.364225, 4.0786, 3.7496, 3.7646800000000002, 3.56393, 3.28415 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 4.933065, 5.736515000000001, 5.65715, 5.4591899999999995, 5.646855, 5.12025, 4.693355, 5.241555, 5.338535, 4.89467, 4.493645, 4.54245, 3.9460550000000003, 4.21656, 3.85689, 4.476559999999999, 4.169535, 4.223425000000001, 4.297605000000001, 3.89612, 3.64049 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "35.7s<br>60.5MB", "34.9s<br>60.7MB", "32.1s<br>63.7MB", "30.2s<br>61.3MB", "29.8s<br>63.0MB", "28.6s<br>60.5MB", "24.5s<br>59.7MB", "24.2s<br>75.3MB", "22.3s<br>97.4MB", "21.6s<br>97.5MB", "21.0s<br>62.5MB", "20.8s<br>63.3MB", "20.2s<br>60.3MB", "20.0s<br>205MB", "19.8s<br>104MB", "19.5s<br>87.0MB", "18.3s<br>208MB", "17.4s<br>87.6MB", "17.3s<br>88.2MB", "<b>17.2s<br>59.4MB</b>", "<b>16.3s<br>87.0MB</b>" ],
        },
        { x: [ 7.869325, 7.2524999999999995, 6.592935000000001, 6.0492550000000005, 6.01199, 6.3363, 4.353875, 4.835355, 3.70265, 3.8774699999999998, 4.02661, 4.067455, 4.06968, 3.43791, 3.626315, 3.199955, 2.967765, 2.9720899999999997, 2.96328, 3.0144, 2.9922449999999996 ],
          y: m1y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 9.74398, 9.21354, 7.214435, 7.359500000000001, 6.7052, 7.08596, 5.209835, 6.1648700000000005, 4.772320000000001, 4.811185, 5.285920000000001, 5.281925, 4.946275, 4.815805, 5.025124999999999, 4.503645, 4.48541, 3.959205, 3.967965, 4.08076, 3.934475 ],
          y: m1y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 7.909215, 7.2094249999999995, 6.56874, 6.073225, 6.00448, 6.026515, 4.360305, 4.908605, 3.65419, 3.758755, 4.02863, 4.052289999999999, 3.928325, 3.372045, 3.60004, 3.219285, 2.91923, 2.9074099999999996, 2.89727, 2.9219350000000004, 2.8793499999999996 ],
          y: m1y, name: measurement_names[2] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 6.009964999999999, 5.70443, 6.322744999999999, 5.122365, 6.060805, 4.701105, 5.47707, 3.97426, 4.868385, 4.66051, 3.47745, 3.4678750000000003, 3.22393, 4.2200500000000005, 3.84696, 4.3528, 4.0754649999999994, 3.76303, 3.748095, 3.469325, 3.2517699999999996 ],
          y: m1y, name: measurement_names[3] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 4.943725000000001, 5.71131, 5.654685, 5.69322, 5.462235, 5.084605, 5.269785, 4.67404, 5.34401, 4.850944999999999, 4.5394950000000005, 4.48839, 3.9433350000000003, 4.185560000000001, 3.85084, 4.4924599999999995, 4.20437, 4.29712, 4.220505, 3.684005, 3.63668 ],
          y: m1y, name: measurement_names[4] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "36.5s<br>60.4MB", "35.1s<br>60.6MB", "32.4s<br>64.0MB", "30.3s<br>63.0MB", "30.2s<br>61.4MB", "29.2s<br>60.4MB", "24.7s<br>75.2MB", "24.6s<br>59.5MB", "22.3s<br>97.3MB", "22.0s<br>97.4MB", "21.4s<br>63.2MB", "21.4s<br>62.5MB", "20.1s<br>60.4MB", "20.0s<br>205MB", "19.9s<br>104MB", "19.8s<br>87.0MB", "18.7s<br>208MB", "17.9s<br>88.2MB", "17.8s<br>87.6MB", "<b>17.2s<br>59.4MB</b>", "<b>16.7s<br>87.0MB</b>" ],
        },
        { x: [ 9.642399999999999, 9.046535, 7.259155, 7.37293, 6.7256800000000005, 7.093615, 6.09864, 5.469655, 4.73762, 4.786515, 5.1611899999999995, 5.14805, 4.93474, 4.792205, 5.055365, 4.462435, 4.4684349999999995, 4.05716, 4.08711, 4.00244, 3.87456 ],
          y: m2y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 7.4442450000000004, 6.752635, 6.282500000000001, 5.74607, 5.757295, 5.818585000000001, 4.813385, 4.077585, 3.38485, 3.3046699999999998, 3.6793649999999998, 3.66113, 3.3922049999999997, 2.949935, 3.80898, 2.9715, 2.553725, 2.50542, 2.48691, 2.6495699999999998, 2.575905 ],
          y: m2y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 9.66997, 9.135725, 7.19121, 7.42751, 6.691575, 7.096355, 6.091340000000001, 5.47384, 4.783165, 4.749345, 5.200875, 5.117405, 4.94891, 4.784685, 4.95137, 4.485925, 4.4662500000000005, 4.02182, 4.04178, 4.016695, 3.872715 ],
          y: m2y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 6.28141, 6.020085, 6.505005, 5.436475, 6.325480000000001, 4.85666, 4.22539, 5.770155, 5.103025000000001, 4.89577, 3.7671099999999997, 3.763885, 4.19344, 4.4761, 3.41747, 4.696815, 4.36116, 4.084625, 4.087870000000001, 3.80246, 3.689875 ],
          y: m2y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 4.09354, 4.90607, 4.77834, 4.602815, 4.652480000000001, 4.20354, 3.84951, 4.196415, 4.09986, 3.800255, 3.4659750000000003, 3.4223, 3.03503, 3.34803, 3.072305, 3.655705, 3.35421, 3.26132, 3.2055249999999997, 2.862135, 2.82751 ],
          y: m2y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "37.1s<br>60.4MB", "35.9s<br>60.7MB", "32.0s<br>63.9MB", "30.6s<br>62.9MB", "30.2s<br>61.4MB", "29.1s<br>60.5MB", "25.1s<br>59.6MB", "25.0s<br>75.4MB", "22.1s<br>97.4MB", "21.5s<br>97.4MB", "21.3s<br>63.2MB", "21.1s<br>62.6MB", "20.5s<br>104MB", "20.4s<br>205MB", "20.3s<br>60.4MB", "20.3s<br>87.0MB", "19.2s<br>208MB", "17.9s<br>88.2MB", "17.9s<br>87.5MB", "<b>17.3s<br>59.4MB</b>", "<b>16.8s<br>87.0MB</b>" ],
        },
        { x: [ 9.316804999999999, 7.62307, 6.99031, 6.403275000000001, 6.455769999999999, 6.53782, 5.76257, 4.745565, 4.030485, 4.03749, 4.291155, 4.291105, 3.6678800000000003, 3.7548000000000004, 4.230955, 3.87829, 3.2152849999999997, 3.307175, 3.2565600000000003, 3.4386099999999997, 3.33453 ],
          y: m3y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 9.919495, 9.34319, 7.345625, 6.9049, 7.511545, 7.237385, 6.30506, 5.56823, 4.980955, 5.04527, 5.522225000000001, 5.455405, 4.64396, 4.93313, 5.18103, 4.92966, 4.630385, 4.1893650000000004, 4.147375, 4.230445, 4.08793 ],
          y: m3y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 9.280605000000001, 7.844435, 6.80694, 6.32899, 6.4147099999999995, 6.56292, 5.31817, 4.79608, 4.036545, 3.996375, 4.2820800000000006, 4.27387, 3.4988799999999998, 3.6281600000000003, 4.236205, 3.84366, 3.15069, 3.272305, 3.20822, 3.31114, 3.254505 ],
          y: m3y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 6.3694, 6.04303, 6.64741, 6.47877, 5.535995, 5.026619999999999, 4.32957, 5.91585, 5.339075, 5.133895, 3.8936349999999997, 3.88318, 4.767125, 4.5483899999999995, 3.4825049999999997, 4.0710999999999995, 4.427989999999999, 4.1836649999999995, 4.19255, 3.9090100000000003, 3.65048 ],
          y: m3y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 4.378674999999999, 5.1487099999999995, 5.077249999999999, 4.897005, 4.955665, 4.5530349999999995, 4.109385, 4.56756, 4.52878, 4.2095400000000005, 3.815295, 3.756425, 3.95711, 3.64018, 3.3262400000000003, 3.220675, 3.592955, 3.60506, 3.548475, 3.12359, 3.10938 ],
          y: m3y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "39.3s<br>60.5MB", "36.0s<br>60.8MB", "32.9s<br>63.8MB", "31.0s<br>61.3MB", "30.9s<br>62.9MB", "29.9s<br>60.4MB", "25.8s<br>59.7MB", "25.6s<br>75.1MB", "22.9s<br>97.4MB", "22.4s<br>97.4MB", "21.8s<br>63.3MB", "21.7s<br>62.6MB", "20.5s<br>87.0MB", "20.5s<br>205MB", "20.5s<br>60.4MB", "19.9s<br>104MB", "19.0s<br>208MB", "18.6s<br>88.2MB", "18.4s<br>87.6MB", "<b>18.0s<br>59.4MB</b>", "<b>17.4s<br>87.0MB</b>" ],
        },
        { x: [ 7.469995, 7.00454, 5.508875, 5.85938, 5.211259999999999, 5.722335, 3.8790449999999996, 3.2149650000000003, 3.383645, 3.678535, 3.68208, 4.77126, 3.0721100000000003, 2.60131, 2.5739400000000003, 3.9497549999999997, 3.5190599999999996, 2.7609199999999996, 2.8395849999999996, 2.8274749999999997, 2.5088150000000002 ],
          y: m4y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 7.381715, 7.060645, 5.438840000000001, 5.7397, 5.04215, 5.426164999999999, 3.92984, 3.17922, 3.180895, 3.7296300000000002, 3.77869, 4.541615, 3.490865, 2.623525, 2.57795, 3.8889050000000003, 3.578785, 2.775755, 2.937805, 2.865075, 2.4894100000000003 ],
          y: m4y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 8.093914999999999, 7.667335, 6.11615, 6.126939999999999, 5.465785, 6.042339999999999, 4.415595, 3.489885, 3.72493, 4.031625, 4.040405, 4.865435, 3.328735, 3.04644, 3.0052000000000003, 4.262255, 3.93708, 2.979145, 3.31873, 3.02667, 2.7367600000000003 ],
          y: m4y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 8.100915, 8.174965, 7.760845, 8.338944999999999, 8.161045, 6.890205, 7.96475, 8.349815, 7.707085, 6.4273050000000005, 6.3642, 6.09745, 7.50865, 6.540785, 6.555845, 5.68448, 6.32247, 6.9789, 6.332554999999999, 5.8172049999999995, 5.57284 ],
          y: m4y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 17.8607, 18.900100000000002, 21.7741, 18.686500000000002, 19.18775, 17.79355, 21.4277, 23.2145, 21.1057, 21.0808, 20.9938, 17.46005, 18.9354, 20.73355, 20.83095, 17.5704, 17.4979, 17.41955, 17.1851, 16.807499999999997, 16.76935 ],
          y: m4y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "48.9s<br>60.5MB", "48.8s<br>60.7MB", "46.6s<br>63.0MB", "44.8s<br>64.0MB", "43.1s<br>61.4MB", "41.9s<br>60.5MB", "41.6s<br>92.4MB", "41.4s<br>97.4MB", "39.1s<br>97.4MB", "38.9s<br>63.2MB", "38.9s<br>62.5MB", "37.7s<br>59.7MB", "36.3s<br>87.0MB", "35.5s<br>127MB", "35.5s<br>127MB", "35.4s<br>60.3MB", "34.9s<br>104MB", "32.9s<br>208MB", "32.6s<br>205MB", "<b>31.3s<br>59.4MB</b>", "<b>30.1s<br>87.0MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomInsertEraseStrings'},
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
        xaxis: { automargin: true,  range: [0, 52.33074680000001]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_73e84ae8', data, layout);
</script>
