---
layout: post
title: Hashmaps Benchmarks - Iterating
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

## Table of Contents

* [Overview](/2019/04/01/hashmap-benchmarks-01-overview/)
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
   * **[Iterating](/2019/04/01/hashmap-benchmarks-04-04-result-IterateIntegers/)** 👈
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----

Iteration benchmark works like this: I create a `Map<uint64_t, uint64_t>`,  and each time I insert one random element the whole map is iterated. Once 50k elements are inserted, elements are removed one by one and each time the map is iterated again. In total, exactly 2.5 billion entries are iterated.

```cpp
Map<uint64_t, uint64_t> map;

auto const initialRngState = rng.state();

// measure insert than iterate whole map
for (size_t n = 0; n < num_iters; ++n) {
    map[rng()] = n;
    for (auto const& keyVal : map) {
        result += keyVal.second;
    }
}

// reset rng back to inital state
rng.state(initialRngState);

// measure erase than iterate whole map
for (size_t n = 0; n < num_iters; ++n) {
    map.erase(rng());
    for (auto const& keyVal : map) {
        result += keyVal.second;
    }
}
```

# Results

## Hashes

In this benchmark the hash function should be completely irrelevant. And it is; the results for the different hashers are practically the same.

## Hashmaps

Here it is all about cache locality. So the more compact your data is bunched together, the faster you can make iteration. That's why `tsl::sparse_map` is so blazingly fast, only followed by the second sparse map in this benchmark `spp::sparse_hash_map`. 

`robin_hood::unordered_flat_map` is third, it is thus the fastest non-sparse map. It gets that speed by making use of its 1-byte overhead structure: the map can skip up to 8 entries at once if they are empty. `robin_hood::unordered_node_map` is slower due to the additional indirection, but it is still faster than the rest. Interestingly, `tsl::robin_map` is quite slow here. I assume it is just not optimized for fast iteration.

# Chart

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_39ef4b07" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::node_hash_map", "absl::node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m1y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::node_hash_map", "phmap::<br>parallel_flat_hash_map", "absl::node_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m2y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m3y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m4y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "absl::node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var measurement_names = [ "iterate while adding", "iterate while removing" ];

    var data = [
        { x: [ 25.82005, 13.5969, 13.891850000000002, 13.07535, 11.6004, 8.457239999999999, 8.34977, 7.241664999999999, 5.9849049999999995, 5.79838, 5.461309999999999, 5.47756, 5.52954, 5.334655, 5.3349150000000005, 5.246175, 4.938935000000001, 4.267445, 1.9675850000000001, 1.553665 ],
          y: m0y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 29.2716, 15.718599999999999, 14.935500000000001, 13.21235, 11.08555, 12.48275, 10.430299999999999, 11.1235, 10.17455, 10.23835, 6.96978, 6.9315549999999995, 6.86907, 6.94448, 6.86334, 6.8071850000000005, 5.15869, 4.55988, 2.55706, 1.910965 ],
          y: m0y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0MB", "29.3s<br>0MB", "28.8s<br>0MB", "26.3s<br>0MB", "22.7s<br>0MB", "20.9s<br>0MB", "18.8s<br>0MB", "18.4s<br>0MB", "16.2s<br>0MB", "16.0s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.3s<br>0MB", "12.2s<br>0MB", "12.1s<br>0MB", "10.1s<br>0MB", "8.83s<br>0MB", "4.52s<br>0MB", "<b>3.46s<br>0MB</b>" ],
        },
        { x: [ 25.721049999999998, 13.094899999999999, 13.8104, 13.063600000000001, 13.069700000000001, 9.612925, 8.265654999999999, 7.199645, 5.90855, 5.62235, 5.499935000000001, 5.53234, 5.339555000000001, 5.490539999999999, 5.38829, 5.01674, 4.90854, 4.27628, 1.9599449999999998, 1.567225 ],
          y: m1y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 29.280450000000002, 15.77695, 14.892949999999999, 13.1813, 12.414349999999999, 13.05855, 10.41875, 11.192350000000001, 10.262699999999999, 10.122900000000001, 7.061865, 6.834815000000001, 6.9592600000000004, 6.662985, 6.522225, 6.80007, 5.164935, 4.605715, 2.724555, 1.891405 ],
          y: m1y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.0s<br>0MB", "28.9s<br>0MB", "28.7s<br>0MB", "26.2s<br>0MB", "25.5s<br>0MB", "22.7s<br>0MB", "18.7s<br>0MB", "18.4s<br>0MB", "16.2s<br>0MB", "15.7s<br>0MB", "12.6s<br>0MB", "12.4s<br>0MB", "12.3s<br>0MB", "12.2s<br>0MB", "11.9s<br>0MB", "11.8s<br>0MB", "10.1s<br>0MB", "8.88s<br>0MB", "4.68s<br>0MB", "<b>3.46s<br>0MB</b>" ],
        },
        { x: [ 25.808549999999997, 13.722000000000001, 13.61625, 13.06455, 13.0303, 8.748465, 8.358775, 6.929774999999999, 5.88408, 5.755839999999999, 5.717465000000001, 5.342275000000001, 5.43818, 5.435945, 5.156995, 5.225945, 4.915805, 4.297145, 1.93534, 1.5576400000000001 ],
          y: m2y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 29.29835, 16.9224, 14.8423, 13.201, 12.405349999999999, 12.49615, 10.40315, 11.4986, 10.148499999999999, 10.23115, 6.98113, 7.042415, 6.93701, 6.925435, 6.883570000000001, 6.530355, 5.187615, 4.575200000000001, 2.75359, 1.89933 ],
          y: m2y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0MB", "30.6s<br>0MB", "28.5s<br>0MB", "26.3s<br>0MB", "25.4s<br>0MB", "21.2s<br>0MB", "18.8s<br>0MB", "18.4s<br>0MB", "16.0s<br>0MB", "16.0s<br>0MB", "12.7s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.0s<br>0MB", "11.8s<br>0MB", "10.1s<br>0MB", "8.87s<br>0MB", "4.69s<br>0MB", "<b>3.46s<br>0MB</b>" ],
        },
        { x: [ 25.73655, 13.783100000000001, 13.9287, 13.063649999999999, 13.01355, 9.58103, 8.439599999999999, 7.12205, 5.874615, 5.67104, 5.580755, 5.38181, 5.304525, 5.481925, 5.42296, 5.34433, 4.903420000000001, 4.297665, 2.032355, 1.56573 ],
          y: m3y, name: measurement_names[0] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 29.2389, 16.022199999999998, 14.92075, 13.186350000000001, 12.364550000000001, 13.0158, 10.4421, 11.0656, 10.2781, 10.123149999999999, 6.939535, 7.08582, 7.086270000000001, 6.888815, 6.94148, 6.8645499999999995, 5.167415, 4.574805, 2.54491, 1.86506 ],
          y: m3y, name: measurement_names[1] + ' (libstdc++-v3)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.0s<br>0MB", "29.8s<br>0MB", "28.8s<br>0MB", "26.2s<br>0MB", "25.4s<br>0MB", "22.6s<br>0MB", "18.9s<br>0MB", "18.2s<br>0MB", "16.2s<br>0MB", "15.8s<br>0MB", "12.5s<br>0MB", "12.5s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.2s<br>0MB", "10.1s<br>0MB", "8.87s<br>0MB", "4.58s<br>0MB", "<b>3.43s<br>0MB</b>" ],
        },
        { x: [ 25.81995, 13.764399999999998, 13.6237, 13.0872, 13.061250000000001, 9.29095, 8.258485, 6.943795, 5.903980000000001, 5.74072, 5.7240850000000005, 5.528370000000001, 5.43025, 5.445449999999999, 5.22238, 5.2093, 4.883324999999999, 4.301355, 1.948855, 1.56482 ],
          y: m4y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 29.291150000000002, 16.93085, 14.936350000000001, 13.1998, 12.38505, 13.04805, 10.5391, 11.57405, 10.2821, 10.19255, 6.982705, 7.03617, 6.981719999999999, 6.93977, 6.865355, 6.55584, 5.17026, 5.37277, 2.582775, 1.816975 ],
          y: m4y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0MB", "30.7s<br>0MB", "28.6s<br>0MB", "26.3s<br>0MB", "25.4s<br>0MB", "22.3s<br>0MB", "18.8s<br>0MB", "18.5s<br>0MB", "16.2s<br>0MB", "15.9s<br>0MB", "12.7s<br>0MB", "12.6s<br>0MB", "12.4s<br>0MB", "12.4s<br>0MB", "12.1s<br>0MB", "11.8s<br>0MB", "10.1s<br>0MB", "9.67s<br>0MB", "4.53s<br>0MB", "<b>3.38s<br>0MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'IterateIntegers'},
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
        yaxis: { title: 'folly::hasher', automargin: true, },
        yaxis2: { title: 'FNV1a', automargin: true, },
        yaxis3: { title: 'robin_hood::hash', automargin: true, },
        yaxis4: { title: 'libstdc++-v3', automargin: true, },
        yaxis5: { title: 'absl::Hash', automargin: true, },
        xaxis: { automargin: true,  range: [0, 58.968877000000006]  },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_39ef4b07', data, layout);
</script>
