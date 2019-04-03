---
layout: post
title: Hashmaps Benchmarks - Iterating
subtitle: Finding the Fastest, Memory Efficient Hashmap
bigimg: /img/2019/X-15_in_flight_small.jpg
---

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
<div id="id_857d8b8e" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "absl::node_hash_map", "phmap::node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m1y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::node_hash_map", "phmap::<br>parallel_flat_hash_map", "absl::node_hash_map", "absl::flat_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m2y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "phmap::node_hash_map", "absl::node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m3y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "absl::flat_hash_map", "phmap::<br>parallel_node_hash_map", "phmap::node_hash_map", "phmap::<br>parallel_flat_hash_map", "absl::node_hash_map", "phmap::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var m4y = [ "boost::multi_index::<br>hashed_unique", "tsl::robin_map", "eastl::hash_map", "boost::unordered_map", "std::unordered_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "folly::F14NodeMap", "folly::F14ValueMap", "phmap::<br>parallel_node_hash_map", "absl::node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "absl::flat_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>"];
    var measurement_names = [ "iterate while adding", "iterate while removing" ];

    var data = [
        { x: [ 25.82005, 13.5969, 13.891850000000002, 13.07535, 11.6004, 8.457239999999999, 8.34977, 7.241664999999999, 5.9849049999999995, 5.79838, 5.45603, 5.52954, 5.44928, 5.33372, 5.33966, 5.246175, 4.938935000000001, 4.267445, 1.9675850000000001, 1.553665 ],
          y: m0y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 29.2716, 15.718599999999999, 14.935500000000001, 13.21235, 11.08555, 12.48275, 10.430299999999999, 11.1235, 10.17455, 10.23835, 6.969255, 6.86907, 6.9285049999999995, 6.941599999999999, 6.861205, 6.8071850000000005, 5.15869, 4.55988, 2.55706, 1.910965 ],
          y: m0y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0.0MB", "29.3s<br>0.0MB", "28.8s<br>0.0MB", "26.3s<br>0.0MB", "22.7s<br>0.0MB", "20.9s<br>0.0MB", "18.8s<br>0.0MB", "18.4s<br>0.0MB", "16.2s<br>0.0MB", "16.0s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.3s<br>0.0MB", "12.2s<br>0.0MB", "12.1s<br>0.0MB", "10.1s<br>0.0MB", "8.83s<br>0.0MB", "4.52s<br>0.0MB", "<b>3.46s<br>0.0MB</b>" ],
        },
        { x: [ 25.721049999999998, 13.094899999999999, 13.8104, 13.063600000000001, 13.069700000000001, 9.612925, 8.265654999999999, 7.199645, 5.90855, 5.62235, 5.488365, 5.506315, 5.347165, 5.490539999999999, 5.38829, 5.01674, 4.90854, 4.27628, 1.9599449999999998, 1.567225 ],
          y: m1y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 29.280450000000002, 15.77695, 14.892949999999999, 13.1813, 12.414349999999999, 13.05855, 10.41875, 11.192350000000001, 10.262699999999999, 10.122900000000001, 7.038779999999999, 6.84742, 6.971055, 6.662985, 6.522225, 6.80007, 5.164935, 4.605715, 2.724555, 1.891405 ],
          y: m1y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.0s<br>0.0MB", "28.9s<br>0.0MB", "28.7s<br>0.0MB", "26.2s<br>0.0MB", "25.5s<br>0.0MB", "22.7s<br>0.0MB", "18.7s<br>0.0MB", "18.4s<br>0.0MB", "16.2s<br>0.0MB", "15.7s<br>0.0MB", "12.5s<br>0.0MB", "12.4s<br>0.0MB", "12.3s<br>0.0MB", "12.2s<br>0.0MB", "11.9s<br>0.0MB", "11.8s<br>0.0MB", "10.1s<br>0.0MB", "8.88s<br>0.0MB", "4.68s<br>0.0MB", "<b>3.46s<br>0.0MB</b>" ],
        },
        { x: [ 25.808549999999997, 13.722000000000001, 13.61625, 13.06455, 13.0303, 8.748465, 8.358775, 6.929774999999999, 5.88408, 5.755839999999999, 5.715085, 5.43818, 5.435945, 5.303615, 5.165605, 5.225945, 4.915805, 4.297145, 1.93534, 1.5576400000000001 ],
          y: m2y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 29.29835, 16.9224, 14.8423, 13.201, 12.405349999999999, 12.49615, 10.40315, 11.4986, 10.148499999999999, 10.23115, 6.98663, 6.93701, 6.925435, 7.042415, 6.88062, 6.530355, 5.187615, 4.575200000000001, 2.75359, 1.89933 ],
          y: m2y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0.0MB", "30.6s<br>0.0MB", "28.5s<br>0.0MB", "26.3s<br>0.0MB", "25.4s<br>0.0MB", "21.2s<br>0.0MB", "18.8s<br>0.0MB", "18.4s<br>0.0MB", "16.0s<br>0.0MB", "16.0s<br>0.0MB", "12.7s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.3s<br>0.0MB", "12.0s<br>0.0MB", "11.8s<br>0.0MB", "10.1s<br>0.0MB", "8.87s<br>0.0MB", "4.69s<br>0.0MB", "<b>3.46s<br>0.0MB</b>" ],
        },
        { x: [ 25.73655, 13.783100000000001, 13.9287, 13.063649999999999, 13.01355, 9.58103, 8.439599999999999, 7.12205, 5.874615, 5.67104, 5.580755, 5.4013100000000005, 5.522215, 5.29969, 5.42296, 5.3606, 4.903420000000001, 4.297665, 2.032355, 1.56573 ],
          y: m3y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 29.2389, 16.022199999999998, 14.92075, 13.186350000000001, 12.364550000000001, 13.0158, 10.4421, 11.0656, 10.2781, 10.123149999999999, 6.939535, 7.0905450000000005, 6.881695000000001, 7.082465, 6.94148, 6.8645499999999995, 5.167415, 4.574805, 2.54491, 1.86506 ],
          y: m3y, name: measurement_names[1] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.0s<br>0.0MB", "29.8s<br>0.0MB", "28.8s<br>0.0MB", "26.2s<br>0.0MB", "25.4s<br>0.0MB", "22.6s<br>0.0MB", "18.9s<br>0.0MB", "18.2s<br>0.0MB", "16.2s<br>0.0MB", "15.8s<br>0.0MB", "12.5s<br>0.0MB", "12.5s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.2s<br>0.0MB", "10.1s<br>0.0MB", "8.87s<br>0.0MB", "4.58s<br>0.0MB", "<b>3.43s<br>0.0MB</b>" ],
        },
        { x: [ 25.81995, 13.764399999999998, 13.6237, 13.0872, 13.061250000000001, 9.29095, 8.258485, 6.943795, 5.903980000000001, 5.74072, 5.719075, 5.528370000000001, 5.424045, 5.427265, 5.22238, 5.2093, 4.883324999999999, 4.301355, 1.948855, 1.56482 ],
          y: m4y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 29.291150000000002, 16.93085, 14.936350000000001, 13.1998, 12.38505, 13.04805, 10.5391, 11.57405, 10.2821, 10.19255, 6.982705, 7.03617, 6.970924999999999, 6.9306149999999995, 6.863545, 6.55584, 5.17026, 5.37277, 2.582775, 1.816975 ],
          y: m4y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
            textposition: 'outside',
            text: [ "55.1s<br>0.0MB", "30.7s<br>0.0MB", "28.6s<br>0.0MB", "26.3s<br>0.0MB", "25.4s<br>0.0MB", "22.3s<br>0.0MB", "18.8s<br>0.0MB", "18.5s<br>0.0MB", "16.2s<br>0.0MB", "15.9s<br>0.0MB", "12.7s<br>0.0MB", "12.6s<br>0.0MB", "12.4s<br>0.0MB", "12.4s<br>0.0MB", "12.1s<br>0.0MB", "11.8s<br>0.0MB", "10.1s<br>0.0MB", "9.67s<br>0.0MB", "4.53s<br>0.0MB", "<b>3.38s<br>0.0MB</b>" ],
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
        yaxis4: { title: 'Identity', automargin: true, },
        yaxis5: { title: 'absl::Hash', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_857d8b8e', data, layout);
</script>


