---
layout: post
title: Hashmaps Benchmarks - Insert & Erase
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
<div id="id_c5946b90" style="height:210em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "eastl::hash_map", "absl::node_hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "robin_hood::<br>unordered_node_map", "<b>folly::F14ValueMap</b>", "absl::flat_hash_map", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m1y = [ "std::unordered_map", "eastl::hash_map", "absl::node_hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "robin_hood::<br>unordered_node_map", "absl::flat_hash_map", "<b>folly::F14ValueMap</b>", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m2y = [ "std::unordered_map", "absl::node_hash_map", "eastl::hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "robin_hood::<br>unordered_node_map", "<b>folly::F14ValueMap</b>", "absl::flat_hash_map", "tsl::hopscotch_map", "ska::bytell_hash_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m3y = [ "absl::node_hash_map", "absl::flat_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "robin_hood::<br>unordered_node_map", "<b>folly::F14ValueMap</b>", "tsl::hopscotch_map", "ska::bytell_hash_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m4y = [ "absl::node_hash_map", "absl::flat_hash_map", "std::unordered_map", "eastl::hash_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "folly::F14NodeMap", "spp::sparse_hash_map", "<b>tsl::sparse_map</b>", "robin_hood::<br>unordered_node_map", "<b>folly::F14ValueMap</b>", "ska::bytell_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var measurement_names = [ "insert 100M int", "clear 100M int", "reinsert 100M int", "remove 100M int", "destructor empty map" ];

    var data = [
        { x: [ 39.59545, 41.4139, 24.74455, 33.6502, 32.589349999999996, 19.590899999999998, 24.63375, 20.25805, 16.300649999999997, 14.24495, 10.9056, 11.6269, 11.40575, 10.719100000000001, 8.012775, 6.67978 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 6.1396999999999995, 11.5892, 12.0696, 5.991065000000001, 5.976805, 11.93455, 2.406165, 0.840023, 1.3073549999999998, 0.03022375, 0.0367541, 0.386626, 0.124466, 0.406495, 0.0054538699999999996, 1.044285 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 24.9743, 18.9979, 40.103, 22.813299999999998, 18.646500000000003, 36.16265, 24.596899999999998, 15.74495, 10.41575, 14.2927, 13.76025, 6.44811, 6.746895, 4.781395, 4.696125, 2.774605 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 28.9088, 25.4235, 17.445349999999998, 30.212400000000002, 25.7814, 11.9021, 13.6167, 10.20655, 17.3543, 11.11205, 14.00625, 3.93709, 3.7538549999999997, 3.6026049999999996, 4.192265, 3.1097099999999998 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 0.0682477, 0.17683749999999998, 0.0963347, 0.02218545, 0.0206082, 0.027288350000000003, 0.0140955, 0.8404425, 0.11337, 0.0301907, 0.03698745, 0.1236915, 0.05695325, 0.045899800000000004, 0.03629435, 0.08555170000000001 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "99.7s<br>3986MB", "97.6s<br>4153MB", "94.5s<br>4716MB", "92.7s<br>3774MB", "83.0s<br>3774MB", "79.6s<br>4542MB", "65.3s<br>1230MB", "47.9s<br>1120MB", "45.5s<br>2293MB", "39.7s<br>1534MB", "38.7s<br>1718MB", "22.5s<br>1717MB", "22.1s<br>3061MB", "19.6s<br>2293MB", "16.9s<br>1717MB", "13.7s<br>4597MB" ],
        },
        { x: [ 39.59375, 41.094, 24.94295, 33.518, 32.7066, 19.654600000000002, 25.0517, 20.4631, 16.78015, 13.859, 14.32375, 11.6955, 11.77035, 10.7469, 8.43496, 6.939814999999999 ],
          y: m1y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 6.247665, 11.635100000000001, 12.0841, 5.902559999999999, 5.9186049999999994, 12.03455, 1.7790599999999999, 0.8233809999999999, 1.311925, 0.0394552, 0.032602599999999995, 0.38625149999999997, 0.1255445, 0.42315400000000003, 0.005454795, 1.03822 ],
          y: m1y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 25.6336, 18.396749999999997, 40.49185, 22.317050000000002, 18.2821, 36.23485, 25.652050000000003, 15.808250000000001, 10.5715, 13.85525, 14.5042, 6.563815, 6.951465, 4.9989349999999995, 5.158825, 2.790685 ],
          y: m1y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 29.275, 25.62465, 17.4488, 29.575899999999997, 25.472450000000002, 12.03345, 13.6759, 10.233450000000001, 17.3748, 14.078050000000001, 11.379249999999999, 3.977785, 3.705615, 3.825665, 4.33915, 3.181875 ],
          y: m1y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 0.06835925, 0.1333965, 0.11755099999999999, 0.02149635, 0.020614399999999998, 0.0272918, 0.0143814, 0.8354035, 0.1180585, 0.0392862, 0.03266905, 0.1216005, 0.058876349999999994, 0.043818449999999995, 0.0378997, 0.084713 ],
          y: m1y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "101s<br>3986MB", "96.9s<br>4153MB", "95.1s<br>4734MB", "91.3s<br>3774MB", "82.4s<br>3774MB", "80.0s<br>4542MB", "66.2s<br>1230MB", "48.2s<br>1119MB", "46.2s<br>2293MB", "41.9s<br>1718MB", "40.3s<br>1534MB", "22.7s<br>1717MB", "22.6s<br>3061MB", "20.0s<br>2293MB", "18.0s<br>1717MB", "14.0s<br>4597MB" ],
        },
        { x: [ 39.6849, 26.2414, 41.596599999999995, 33.9436, 32.950900000000004, 20.17235, 25.383899999999997, 20.71925, 17.4568, 14.7014, 11.7774, 12.17615, 11.67845, 11.476600000000001, 8.81049, 7.42228 ],
          y: m2y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 6.175985, 12.18805, 11.59205, 5.9609000000000005, 5.933485, 12.016200000000001, 1.11545, 0.828782, 1.31172, 0.0302172, 0.03692525, 0.125806, 0.384351, 0.4154215, 0.00544304, 1.0370300000000001 ],
          y: m2y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 25.6265, 41.731049999999996, 18.83985, 22.893099999999997, 18.872, 36.65875, 26.5337, 15.822199999999999, 10.319749999999999, 14.8607, 11.84695, 7.276485, 6.659865, 5.434089999999999, 5.239305, 3.4185499999999998 ],
          y: m2y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 29.15365, 17.62025, 25.3301, 29.76965, 25.48995, 12.3711, 13.690999999999999, 10.49495, 17.3204, 11.4449, 14.0957, 4.106535, 4.255025, 4.1677599999999995, 4.427235, 3.48832 ],
          y: m2y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 0.06803635, 0.09647875, 0.1325755, 0.02265925, 0.020844849999999998, 0.027395799999999998, 0.0141995, 0.828391, 0.1155255, 0.0301467, 0.0368403, 0.0595404, 0.12131549999999999, 0.0441938, 0.036859050000000004, 0.0844547 ],
          y: m2y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "101s<br>3986MB", "97.9s<br>4734MB", "97.5s<br>4153MB", "92.6s<br>3774MB", "83.3s<br>3774MB", "81.2s<br>4542MB", "66.7s<br>1230MB", "48.7s<br>1119MB", "46.5s<br>2293MB", "41.1s<br>1534MB", "37.8s<br>1718MB", "23.7s<br>3061MB", "23.1s<br>1717MB", "21.5s<br>2293MB", "18.5s<br>1717MB", "15.5s<br>4597MB" ],
        },
        { x: [ 0, 0, 38.900549999999996, 37.5437, 33.1457, 31.834049999999998, 19.797600000000003, 24.38845, 20.0932, 16.3087, 14.05405, 11.31045, 10.7677, 10.3179, 8.01291, 6.43342 ],
          y: m3y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 6.1679200000000005, 11.6466, 5.976990000000001, 5.93216, 11.97725, 1.114395, 0.8329225, 1.311665, 0.03021555, 0.125429, 0.38795100000000005, 0.40853, 0.00546376, 1.0539399999999999 ],
          y: m3y, name: measurement_names[1] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 24.609, 18.72455, 21.86175, 18.127200000000002, 36.68275, 25.6044, 15.921899999999999, 10.525500000000001, 14.210799999999999, 6.6469000000000005, 5.74176, 4.545975, 4.632745, 2.662235 ],
          y: m3y, name: measurement_names[2] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 28.8453, 25.40735, 29.1931, 25.19115, 11.778099999999998, 13.51295, 10.25695, 17.5531, 11.22825, 3.4113249999999997, 3.77418, 3.606265, 4.05891, 2.740135 ],
          y: m3y, name: measurement_names[3] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 0, 0, 0.06815635, 0.1331185, 0.0219629, 0.0209347, 0.0273286, 0.014119099999999999, 0.838443, 0.113712, 0.03025445, 0.0578818, 0.14018599999999998, 0.04385165, 0.03816715, 0.08430445 ],
          y: m3y, name: measurement_names[4] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "98.6s<br>3986MB", "93.5s<br>4153MB", "90.2s<br>3774MB", "81.1s<br>3774MB", "80.3s<br>4472MB", "64.6s<br>1230MB", "47.9s<br>1116MB", "45.8s<br>2293MB", "39.6s<br>1534MB", "21.6s<br>3061MB", "20.8s<br>1717MB", "18.9s<br>2293MB", "16.7s<br>1717MB", "13.0s<br>4597MB" ],
        },
        { x: [ 0, 0, 40.85445, 39.314499999999995, 33.75364999999999, 32.54675, 20.3152, 25.676299999999998, 20.771500000000003, 18.7208, 14.892800000000001, 12.05495, 12.05555, 11.500699999999998, 9.58469, 7.68047 ],
          y: m4y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 6.195625, 11.58075, 5.9747900000000005, 5.89313, 11.939699999999998, 2.42347, 0.8311815, 1.307485, 0.03018195, 0.3864195, 0.125831, 0.40614150000000004, 0.005435775, 1.04647 ],
          y: m4y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 25.645899999999997, 19.146349999999998, 22.5345, 18.784100000000002, 36.63665, 25.591749999999998, 15.85305, 9.91714, 14.930250000000001, 6.75028, 7.13134, 5.28754, 5.68849, 3.43095 ],
          y: m4y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 28.59655, 25.323999999999998, 29.4077, 25.19865, 12.3153, 13.9145, 10.512550000000001, 17.32075, 11.466349999999998, 4.364325, 4.260350000000001, 4.049495, 4.7356750000000005, 3.52102 ],
          y: m4y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 0, 0, 0.06830585, 0.17685, 0.0215867, 0.02065055, 0.02728425, 0.0141233, 0.8378715, 0.1131335, 0.0302235, 0.1224655, 0.0599468, 0.044055300000000006, 0.037406800000000004, 0.08425975 ],
          y: m4y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "101s<br>3986MB", "95.5s<br>4153MB", "91.7s<br>3774MB", "82.4s<br>3774MB", "81.2s<br>4489MB", "67.6s<br>1231MB", "48.8s<br>1120MB", "47.4s<br>2293MB", "41.3s<br>1534MB", "23.7s<br>1717MB", "23.6s<br>3061MB", "21.3s<br>2293MB", "20.1s<br>1717MB", "15.8s<br>4597MB" ],
        },
    ];

    var layout = {
        // title: { text: 'InsertHugeInt'},
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
        yaxis4: { title: 'Identity', automargin: true, },
        yaxis5: { title: 'folly::hasher', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_c5946b90', data, layout);
</script>
