---
layout: post
title: Hashmaps Benchmarks - Insert or Access, Varying Probability
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
   * **[Insert & Access with Varying Probability int](/2019/04/01/hashmap-benchmarks-03-02-result-RandomDistinct2/)** 👈
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

This benchmark has been adapted from attractivechaos' [Revisiting hash table performance](https://attractivechaos.wordpress.com/2018/01/13/revisiting-hash-table-performance/) code. It basically contains this main part:

```cpp
Map<int, int> map;
for (size_t i = 0; i < 50'000'000; ++i) {
    checksum += ++map[rng(max_rng)];
}
```

Here `rng(max_rng)` creates a random number in the range [0, max_rng(. If max_rng is small, not many elements will be inserted but most of them will be accessed. If max_rng is large, mostly new elements will be inserted.

In fact the benchmark is run 4 times, with different max_rng settings:

* 5% distinct: max_rng = 50M * 5% = 250k, so many values will be duplicates. After 50 million iterations, all 250k elements are inserted. So most map operations will be accesses.
* 25% distinct: max_rng = 50M * 25% = 12.5M. More inserts, less modifications.
* 50% distinct: max_rng = 50M * 50% = 25M. Note that due to randomness not all numbers from 0-25M will be inserted. Here the final map's size contains 21.6M entries. So actually its about 43% of the value range instead of 50%.
* 100% distinct: Here we make use of the full range of `int`, so 2^32 numbers are available. Practically all operations are new insertions.

# Results

## Hashes

Again, `robin_hood::hash` is the clear winner. The second fastest hash `absl::Hash` is in fact quite a bit slower in this benchmark. E.g. the fastest hashmap `tsl::robin_map` is about 10% faster when it uses `robin_hood::hash`. `libstdc++-v3` hash is still the fastest for many hashes, but again it is a dangerous choice: Absl maps and phmap simply timeout again. The reason `libstdc++-v3` hash works so well for some hashes is that the numbers are small, and change in the lower bits. If we would generate random numbers e.g. this way: `rng(max_rng) << 10` the trival hash from `libstdc++-v3` would have much worse performance due to many collisions.

`folly::hasher` is again dangerous as well. It does not time out, but the runtime is extremely bad for some maps. I belive the reason is this: the hash uses a native `crc32` instruction. While the instruction is quite fast, it only generates a 32bit hash. Some hashmaps rely on 64bit hash data though.

## Hashmaps

Again, `tsl::robin_map` is the performance winner. 5% distinct accesses take 0.98 seconds, 100% distinct takes 3.44 seconds with `robin_hood::hash`. Unfortunately the peak memory usage is also quite high: 2293MB. 

`robin_hood::unordered_flat_map` is the next on the pareto front: It only requires 853 MB peak memory, 2.7 times less, while being only about 10% slower. 

`folly::F14ValueMap` is already 2.7 times slower than `tsl::robin_map` again with a win of about 10% less memory. Very similar performance has `phmap::parallel_flat_hash_map` with even less memory. It is remarkable how fast this map is with so little peak memory.

If low memory usage is important to you, the best choice is `tsl::sparse_map`. It is more than twice as fast as `std::unordered_map`.

# Chart
Each entry is total runtime for creating a new map, 50M iterations, then destructing the map.

1. **blue**: 5% distinct
1. **orange**: 25% distinct
1. **green**: 50% distinct
1. **red**: 100% distinct

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_6f6eda74" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "std::unordered_map", "absl::node_hash_map", "phmap::node_hash_map", "boost::unordered_map", "folly::F14NodeMap", "boost::multi_index::<br>hashed_unique", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m1y = [ "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "phmap::node_hash_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m2y = [ "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "phmap::node_hash_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m3y = [ "absl::node_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "emilib1::HashMap", "ska::bytell_hash_map", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m4y = [ "phmap::node_hash_map", "phmap::flat_hash_map", "absl::node_hash_map", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "eastl::hash_map", "std::unordered_map", "boost::unordered_map", "folly::F14NodeMap", "boost::multi_index::<br>hashed_unique", "robin_hood::<br>unordered_node_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "<b>folly::F14ValueMap</b>", "ska::bytell_hash_map", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var measurement_names = [ "5% distinct", "25% distinct", "50% distinct", "100% distinct" ];

    var data = [
        { x: [ 9.55518, 11.5495, 9.225185, 8.617105, 8.55536, 9.223289999999999, 7.48536, 6.77613, 3.7915900000000002, 6.30993, 2.893245, 3.20488, 3.512035, 3.05361, 3.105015, 1.094475, 1.298575, 1.0936, 1.05048, 0.9821605 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 13.5433, 12.1585, 16.4469, 12.64675, 12.6467, 11.272649999999999, 10.1288, 9.113579999999999, 7.696835, 7.5249500000000005, 6.590400000000001, 6.11284, 5.311615, 5.7188, 5.761095, 2.404185, 2.11265, 1.990105, 1.6857, 1.53815 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 21.2462, 17.2521, 17.8553, 16.08805, 15.82325, 13.5281, 12.71905, 11.49165, 9.324645, 8.049150000000001, 7.86087, 6.714495, 6.061525, 5.947965, 5.9585550000000005, 4.567745, 3.01206, 2.9722600000000003, 2.195445, 2.146795 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 29.629199999999997, 27.2618, 23.147100000000002, 21.4679, 21.729599999999998, 19.68085, 18.19095, 19.15285, 13.34845, 8.516615, 10.55435, 6.88661, 7.0733250000000005, 6.643784999999999, 6.339145, 5.891125000000001, 5.4201250000000005, 5.630789999999999, 4.0084800000000005, 3.4419649999999997 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "74.0s<br>2084MB", "68.2s<br>2071MB", "66.7s<br>1989MB", "58.8s<br>2083MB", "58.8s<br>2083MB", "53.7s<br>1890MB", "48.5s<br>2019MB", "46.5s<br>1890MB", "34.2s<br>612MB", "30.4s<br>1141MB", "<b>27.9s<br>554MB</b>", "<b>22.9s<br>640MB</b>", "<b>22.0s<br>762MB</b>", "21.4s<br>855MB", "21.2s<br>854MB", "14.0s<br>854MB", "11.8s<br>1141MB", "11.7s<br>1525MB", "<b>8.94s<br>853MB</b>", "<b>8.11s<br>2293MB</b>" ],
        },
        { x: [ 9.200475, 10.7606, 7.544449999999999, 10.702200000000001, 8.638315, 8.678825, 7.93336, 7.568665, 3.7399899999999997, 6.05361, 3.0406950000000004, 3.0101899999999997, 3.53027, 2.83286, 2.8976800000000003, 1.429155, 1.6348850000000001, 1.47965, 1.566735, 1.16876 ],
          y: m1y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 14.1274, 14.411750000000001, 12.10805, 14.05985, 12.7637, 12.7865, 11.37435, 10.21565, 7.783905, 7.302835, 6.591255, 6.200695, 5.058555, 5.796095, 5.7982, 2.67626, 2.777125, 2.493435, 2.54218, 1.81479 ],
          y: m1y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 21.0455, 17.71895, 17.4906, 16.233600000000003, 16.415100000000002, 16.322699999999998, 14.104500000000002, 12.7599, 9.492595, 8.109075, 8.149585, 6.923455, 6.076544999999999, 6.14833, 6.033799999999999, 3.74779, 3.7815149999999997, 3.3858800000000002, 2.944045, 2.4793200000000004 ],
          y: m1y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 28.8114, 23.463250000000002, 27.209200000000003, 20.228749999999998, 21.6765, 21.37375, 19.693550000000002, 18.26885, 12.8991, 8.750499999999999, 10.6131, 6.504405, 7.33652, 6.655615, 6.31647, 5.945345, 5.5519750000000005, 5.710710000000001, 4.23161, 3.51597 ],
          y: m1y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "73.2s<br>2084MB", "66.4s<br>1989MB", "64.4s<br>2071MB", "61.2s<br>1890MB", "59.5s<br>2083MB", "59.2s<br>2083MB", "53.1s<br>1890MB", "48.8s<br>2019MB", "33.9s<br>612MB", "30.2s<br>1141MB", "<b>28.4s<br>554MB</b>", "<b>22.6s<br>662MB</b>", "<b>22.0s<br>762MB</b>", "21.4s<br>855MB", "21.0s<br>854MB", "13.8s<br>854MB", "13.7s<br>1141MB", "13.1s<br>1525MB", "<b>11.3s<br>853MB</b>", "<b>8.98s<br>2293MB</b>" ],
        },
        { x: [ 9.02519, 10.82475, 7.553075, 11.96555, 8.623764999999999, 8.64315, 10.69775, 7.497035, 3.68784, 6.161185, 2.822195, 3.091165, 3.5602, 2.954225, 2.9996400000000003, 1.59391, 1.59708, 1.24097, 1.41234, 1.18335 ],
          y: m2y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 14.32365, 13.857099999999999, 12.29415, 13.3832, 12.842600000000001, 12.822, 11.661200000000001, 10.018450000000001, 7.6257, 7.27937, 6.308045, 6.43632, 5.458275, 5.8664950000000005, 5.892465, 2.67919, 2.65579, 2.317805, 2.208365, 1.8909150000000001 ],
          y: m2y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 20.798450000000003, 17.43805, 18.1707, 15.3987, 16.5165, 16.44095, 13.7997, 12.66475, 9.43741, 8.167750000000002, 8.106494999999999, 7.219095, 6.18915, 6.344095, 6.246175, 3.799085, 3.68059, 3.421425, 2.7743399999999996, 2.68689 ],
          y: m2y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 29.57275, 23.61705, 27.53655, 20.3161, 21.532, 21.2701, 19.796300000000002, 18.52875, 13.6882, 8.81398, 10.82515, 7.156005, 7.51496, 5.866244999999999, 5.511375, 6.05961, 5.84302, 5.94114, 4.550055, 3.84603 ],
          y: m2y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "73.7s<br>2084MB", "65.7s<br>1989MB", "65.6s<br>2071MB", "61.1s<br>1890MB", "59.5s<br>2083MB", "59.2s<br>2083MB", "56.0s<br>1890MB", "48.7s<br>2019MB", "34.4s<br>612MB", "30.4s<br>1141MB", "<b>28.1s<br>554MB</b>", "<b>23.9s<br>670MB</b>", "<b>22.7s<br>762MB</b>", "21.0s<br>855MB", "20.6s<br>854MB", "14.1s<br>854MB", "13.8s<br>1141MB", "12.9s<br>1525MB", "<b>10.9s<br>853MB</b>", "<b>9.61s<br>2293MB</b>" ],
        },
        { x: [ 8.761545, 8.686544999999999, 2.876145, 2.83635, 9.18322, 10.804950000000002, 7.57164, 10.69445, 9.241095, 7.44789, 3.7409100000000004, 5.9974, 3.236805, 3.25352, 3.62555, 1.93315, 1.6957650000000002, 1.783125, 1.96807, 1.45742 ],
          y: m3y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 12.94705, 12.905550000000002, 5.7856950000000005, 5.7961, 14.252600000000001, 14.436, 12.24025, 13.9021, 12.184750000000001, 10.181899999999999, 7.73775, 7.304105, 6.702585, 6.311985, 5.455209999999999, 3.129885, 2.8971099999999996, 2.83019, 2.9585749999999997, 2.168605 ],
          y: m3y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 16.5155, 16.5743, 6.258005, 6.15822, 21.65185, 17.88125, 17.514200000000002, 16.30325, 14.69265, 12.76315, 9.78082, 8.25263, 8.317555, 7.0559449999999995, 6.156219999999999, 4.18706, 4.0676, 3.7231300000000003, 3.441405, 2.85101 ],
          y: m3y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 784.3945, 781.6890000000001, 573.5174999999999, 571.2860000000001, 29.11085, 23.68805, 26.85565, 20.42305, 19.77905, 18.50165, 13.61015, 9.014515, 10.88675, 6.868195, 7.4159749999999995, 5.82744, 6.216835, 5.879655, 4.754965, 3.81395 ],
          y: m3y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "823s<br>1950MB", "820s<br>1951MB", "588s<br>599MB", "586s<br>598MB", "74.2s<br>2084MB", "66.8s<br>1989MB", "64.2s<br>2071MB", "61.3s<br>1890MB", "55.9s<br>1890MB", "48.9s<br>2019MB", "34.9s<br>612MB", "30.6s<br>1141MB", "<b>29.1s<br>554MB</b>", "<b>23.5s<br>653MB</b>", "<b>22.7s<br>762MB</b>", "15.1s<br>1141MB", "14.9s<br>854MB", "14.2s<br>1525MB", "<b>13.1s<br>853MB</b>", "<b>10.3s<br>2293MB</b>" ],
        },
        { x: [ 0, 0, 0, 0, 96.43015, 59.56505, 2.1526, 6.77286, 8.858995, 8.213895, 7.4725850000000005, 6.3285599999999995, 6.261875, 1.9562149999999998, 1.861625, 3.48137, 0.94509, 0.900229, 0.9903504999999999, 0.7576995 ],
          y: m4y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 0, 0, 267.741, 184.08100000000002, 17.1782, 10.862, 11.57615, 10.6508, 10.138449999999999, 8.573094999999999, 7.67464, 6.31842, 5.13954, 5.2400850000000005, 1.7699850000000001, 1.739855, 1.575325, 1.374155 ],
          y: m4y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 0, 0, 372.8615, 271.007, 48.51235, 15.27535, 14.04965, 12.114049999999999, 12.773, 10.11025, 8.123935, 8.434560000000001, 6.98464, 5.94469, 2.71948, 2.647665, 2.14662, 1.9622600000000001 ],
          y: m4y, name: measurement_names[2] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 0, 0, 25.412300000000002, 6.78996, 4.969405, 25.8725, 22.14315, 19.11225, 18.282400000000003, 18.4662, 8.440909999999999, 12.9134, 10.394449999999999, 7.047969999999999, 5.69681, 5.54155, 3.9569650000000003, 3.300705 ],
          y: m4y, name: measurement_names[3] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "timeout", "timeout", "762s<br>2084MB", "521s<br>623MB", "72.8s<br>1141MB", "58.8s<br>2071MB", "56.6s<br>1989MB", "50.1s<br>1890MB", "48.7s<br>2019MB", "43.5s<br>1890MB", "30.5s<br>1141MB", "29.6s<br>612MB", "<b>24.4s<br>554MB</b>", "<b>21.7s<br>762MB</b>", "11.1s<br>853MB", "10.8s<br>1525MB", "<b>8.67s<br>853MB</b>", "<b>7.39s<br>2293MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomDistinct2'},
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
        yaxis3: { title: 'FNV1a', automargin: true, },
        yaxis4: { title: 'folly::hasher', automargin: true, },
        yaxis5: { title: 'libstdc++-v3', automargin: true, },
        xaxis: { automargin: true,  range: [0, 110.96082000000001]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_6f6eda74', data, layout);
</script>