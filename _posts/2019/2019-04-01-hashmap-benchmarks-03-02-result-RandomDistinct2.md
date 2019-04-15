---
layout: post
title: Hashmaps Benchmarks - Insert or Access, Varying Probability
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

Now it gets a lot more interesting.

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_b563064e" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "phmap::<br>parallel_node_hash_map", "eastl::hash_map", "std::unordered_map", "phmap::node_hash_map", "absl::node_hash_map", "boost::unordered_map", "folly::F14NodeMap", "boost::multi_index::<br>hashed_unique", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m1y = [ "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "phmap::node_hash_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m2y = [ "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "phmap::node_hash_map", "absl::node_hash_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "phmap::flat_hash_map", "absl::flat_hash_map", "ska::bytell_hash_map", "emilib1::HashMap", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m3y = [ "absl::node_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "<b>tsl::sparse_map</b>", "<b>phmap::<br>parallel_flat_hash_map</b>", "<b>folly::F14ValueMap</b>", "emilib1::HashMap", "ska::bytell_hash_map", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m4y = [ "phmap::node_hash_map", "phmap::flat_hash_map", "absl::node_hash_map", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "emilib1::HashMap", "eastl::hash_map", "std::unordered_map", "boost::unordered_map", "folly::F14NodeMap", "boost::multi_index::<br>hashed_unique", "robin_hood::<br>unordered_node_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "<b>folly::F14ValueMap</b>", "ska::bytell_hash_map", "tsl::hopscotch_map", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var measurement_names = [ "5% distinct", "25% distinct", "50% distinct", "100% distinct" ];

    var data = [
        { x: [ 9.55518, 11.5495, 9.225185, 8.547930000000001, 8.617105, 9.223289999999999, 7.48536, 6.77613, 3.7915900000000002, 6.30993, 2.893245, 3.186395, 3.512035, 3.0734950000000003, 3.105015, 1.094475, 1.298575, 1.0936, 1.05048, 0.9821605 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 13.5557, 12.1585, 16.4469, 12.719100000000001, 12.64675, 11.272649999999999, 10.1288, 9.113579999999999, 7.696835, 7.5249500000000005, 6.590400000000001, 6.10594, 5.311615, 5.71022, 5.761095, 2.404185, 2.11265, 1.990105, 1.6857, 1.53815 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 21.301650000000002, 17.2521, 17.8553, 15.9864, 16.08805, 13.5281, 12.71905, 11.49165, 9.324645, 8.049150000000001, 7.86087, 6.693425, 6.061525, 5.92165, 5.9585550000000005, 4.567745, 3.01206, 2.9722600000000003, 2.195445, 2.146795 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 29.64975, 27.2618, 23.147100000000002, 21.6956, 21.4679, 19.68085, 18.19095, 19.15285, 13.34845, 8.516615, 10.55435, 6.87912, 7.0733250000000005, 6.6352899999999995, 6.339145, 5.891125000000001, 5.4201250000000005, 5.630789999999999, 4.0084800000000005, 3.4419649999999997 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "74.1s<br>2084MB", "68.2s<br>2071MB", "66.7s<br>1989MB", "58.9s<br>2084MB", "58.8s<br>2083MB", "53.7s<br>1890MB", "48.5s<br>2019MB", "46.5s<br>1890MB", "34.2s<br>612MB", "30.4s<br>1141MB", "<b>27.9s<br>554MB</b>", "<b>22.9s<br>640MB</b>", "<b>22.0s<br>762MB</b>", "21.3s<br>855MB", "21.2s<br>854MB", "14.0s<br>854MB", "11.8s<br>1141MB", "11.7s<br>1525MB", "<b>8.94s<br>853MB</b>", "<b>8.11s<br>2293MB</b>" ],
        },
        { x: [ 9.18608, 10.7606, 7.544449999999999, 10.702200000000001, 8.620365, 8.678825, 7.93336, 7.568665, 3.7399899999999997, 6.05361, 3.0406950000000004, 2.98451, 3.53027, 2.7955550000000002, 2.8976800000000003, 1.429155, 1.6348850000000001, 1.47965, 1.566735, 1.16876 ],
          y: m1y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 14.113399999999999, 14.411750000000001, 12.10805, 14.05985, 12.7519, 12.7865, 11.37435, 10.21565, 7.783905, 7.302835, 6.591255, 6.20071, 5.058555, 5.792260000000001, 5.7982, 2.67626, 2.777125, 2.493435, 2.54218, 1.81479 ],
          y: m1y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 21.15495, 17.71895, 17.4906, 16.233600000000003, 16.4011, 16.322699999999998, 14.104500000000002, 12.7599, 9.492595, 8.109075, 8.149585, 6.91179, 6.076544999999999, 6.144755, 6.033799999999999, 3.74779, 3.7815149999999997, 3.3858800000000002, 2.944045, 2.4793200000000004 ],
          y: m1y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 28.8114, 23.463250000000002, 27.209200000000003, 20.228749999999998, 21.65035, 21.37375, 19.693550000000002, 18.26885, 12.8991, 8.750499999999999, 10.6131, 6.494714999999999, 7.33652, 6.645569999999999, 6.31647, 5.945345, 5.5519750000000005, 5.710710000000001, 4.23161, 3.51597 ],
          y: m1y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "73.3s<br>2084MB", "66.4s<br>1989MB", "64.4s<br>2071MB", "61.2s<br>1890MB", "59.4s<br>2084MB", "59.2s<br>2083MB", "53.1s<br>1890MB", "48.8s<br>2019MB", "33.9s<br>612MB", "30.2s<br>1141MB", "<b>28.4s<br>554MB</b>", "<b>22.6s<br>654MB</b>", "<b>22.0s<br>762MB</b>", "21.4s<br>855MB", "21.0s<br>854MB", "13.8s<br>854MB", "13.7s<br>1141MB", "13.1s<br>1525MB", "<b>11.3s<br>853MB</b>", "<b>8.98s<br>2293MB</b>" ],
        },
        { x: [ 9.00483, 10.82475, 7.553075, 11.96555, 8.623764999999999, 8.64315, 10.69775, 7.497035, 3.68784, 6.161185, 2.822195, 3.09512, 3.5602, 2.9090100000000003, 2.9996400000000003, 1.59391, 1.59708, 1.24097, 1.41234, 1.18335 ],
          y: m2y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 14.30945, 13.857099999999999, 12.29415, 13.3832, 12.7928, 12.822, 11.661200000000001, 10.018450000000001, 7.6257, 7.27937, 6.308045, 6.4417349999999995, 5.458275, 5.855935, 5.892465, 2.67919, 2.65579, 2.317805, 2.208365, 1.8909150000000001 ],
          y: m2y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 20.3562, 17.43805, 18.1707, 15.3987, 16.47065, 16.44095, 13.7997, 12.66475, 9.43741, 8.167750000000002, 8.106494999999999, 7.226145000000001, 6.18915, 6.344095, 6.246175, 3.799085, 3.68059, 3.421425, 2.7743399999999996, 2.68689 ],
          y: m2y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 30.1082, 23.61705, 27.53655, 20.3161, 21.52375, 21.2701, 19.796300000000002, 18.52875, 13.6882, 8.81398, 10.82515, 7.160769999999999, 7.51496, 5.859425, 5.511375, 6.05961, 5.84302, 5.94114, 4.550055, 3.84603 ],
          y: m2y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "73.8s<br>2084MB", "65.7s<br>1989MB", "65.6s<br>2071MB", "61.1s<br>1890MB", "59.4s<br>2084MB", "59.2s<br>2083MB", "56.0s<br>1890MB", "48.7s<br>2019MB", "34.4s<br>612MB", "30.4s<br>1141MB", "<b>28.1s<br>554MB</b>", "<b>23.9s<br>671MB</b>", "<b>22.7s<br>762MB</b>", "21.0s<br>855MB", "20.6s<br>854MB", "14.1s<br>854MB", "13.8s<br>1141MB", "12.9s<br>1525MB", "<b>10.9s<br>853MB</b>", "<b>9.61s<br>2293MB</b>" ],
        },
        { x: [ 8.761545, 8.676115, 2.879385, 2.83635, 9.168865, 10.804950000000002, 7.57164, 10.69445, 9.241095, 7.44789, 3.7409100000000004, 5.9974, 3.236805, 3.2134, 3.62555, 1.93315, 1.6957650000000002, 1.783125, 1.96807, 1.45742 ],
          y: m3y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 12.94705, 12.895800000000001, 5.77322, 5.7961, 14.3163, 14.436, 12.24025, 13.9021, 12.184750000000001, 10.181899999999999, 7.73775, 7.304105, 6.702585, 6.301895, 5.455209999999999, 3.129885, 2.8971099999999996, 2.83019, 2.9585749999999997, 2.168605 ],
          y: m3y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 16.5155, 16.56165, 6.258005, 6.15822, 21.66665, 17.88125, 17.514200000000002, 16.30325, 14.69265, 12.76315, 9.78082, 8.25263, 8.317555, 7.0559449999999995, 6.156219999999999, 4.18706, 4.0676, 3.7231300000000003, 3.441405, 2.85101 ],
          y: m3y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 784.3945, 780.6935000000001, 573.5585, 571.2860000000001, 29.084, 23.68805, 26.85565, 20.42305, 19.77905, 18.50165, 13.61015, 9.014515, 10.88675, 6.88522, 7.4159749999999995, 5.82744, 6.216835, 5.879655, 4.754965, 3.81395 ],
          y: m3y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "823s<br>1950MB", "819s<br>1952MB", "588s<br>599MB", "586s<br>598MB", "74.2s<br>2084MB", "66.8s<br>1989MB", "64.2s<br>2071MB", "61.3s<br>1890MB", "55.9s<br>1890MB", "48.9s<br>2019MB", "34.9s<br>612MB", "30.6s<br>1141MB", "<b>29.1s<br>554MB</b>", "<b>23.5s<br>654MB</b>", "<b>22.7s<br>762MB</b>", "15.1s<br>1141MB", "14.9s<br>854MB", "14.2s<br>1525MB", "<b>13.1s<br>853MB</b>", "<b>10.3s<br>2293MB</b>" ],
        },
        { x: [ 0, 0, 0, 0, 96.94579999999999, 59.56505, 2.1526, 6.77286, 8.858995, 8.213895, 7.4725850000000005, 6.3285599999999995, 6.261875, 1.9562149999999998, 1.861625, 3.48137, 0.94509, 0.900229, 0.9903504999999999, 0.7576995 ],
          y: m4y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 0, 0, 268.4095, 184.938, 17.1782, 10.862, 11.57615, 10.6508, 10.138449999999999, 8.573094999999999, 7.67464, 6.31842, 5.13954, 5.2400850000000005, 1.7699850000000001, 1.739855, 1.575325, 1.374155 ],
          y: m4y, name: measurement_names[1] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 0, 0, 370.454, 271.007, 48.51235, 15.27535, 14.04965, 12.114049999999999, 12.773, 10.11025, 8.123935, 8.434560000000001, 6.98464, 5.94469, 2.71948, 2.647665, 2.14662, 1.9622600000000001 ],
          y: m4y, name: measurement_names[2] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 0, 0, 25.25665, 6.7356300000000005, 4.969405, 25.8725, 22.14315, 19.11225, 18.282400000000003, 18.4662, 8.440909999999999, 12.9134, 10.394449999999999, 7.047969999999999, 5.69681, 5.54155, 3.9569650000000003, 3.300705 ],
          y: m4y, name: measurement_names[3] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "timeout", "timeout", "761s<br>2084MB", "522s<br>624MB", "72.8s<br>1141MB", "58.8s<br>2071MB", "56.6s<br>1989MB", "50.1s<br>1890MB", "48.7s<br>2019MB", "43.5s<br>1890MB", "30.5s<br>1141MB", "29.6s<br>612MB", "<b>24.4s<br>554MB</b>", "<b>21.7s<br>762MB</b>", "11.1s<br>853MB", "10.8s<br>1525MB", "<b>8.67s<br>853MB</b>", "<b>7.39s<br>2293MB</b>" ],
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
        yaxis5: { title: 'Identity', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_b563064e', data, layout);
</script>
