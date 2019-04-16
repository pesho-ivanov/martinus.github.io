---
layout: post
title: Hashmaps Benchmarks - Insert & Erase
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
   * **[Insert & Erase](/2019/04/01/hashmap-benchmarks-03-03-result-RandomInsertErase/)** 👈
   * [Insert & Erase Strings](/2019/04/01/hashmap-benchmarks-03-04-result-RandomInsertEraseStrings/)
* Accessing
   * [Find 1-200 Entries](/2019/04/01/hashmap-benchmarks-04-01-result-RandomFind_200/)
   * [Find 1-2000 Entries](/2019/04/01/hashmap-benchmarks-04-02-result-RandomFind_2000/)
   * [Find 1-500k Entries](/2019/04/01/hashmap-benchmarks-04-03-result-RandomFind_500000/)
   * [Iterating](/2019/04/01/hashmap-benchmarks-04-04-result-IterateIntegers/)
* [Conclusion](/2019/04/01/hashmap-benchmarks-05-conclusion/)

----



# Results

## Hashes

## Hashmaps

# Chart

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="id_ea181734" style="height:250em"></div>
<script>
    var colors = Plotly.d3.scale.category10().range();
    var m0y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "<b>tsl::sparse_map</b>", "phmap::node_hash_map", "absl::node_hash_map", "folly::F14ValueMap", "<b>phmap::<br>parallel_flat_hash_map</b>", "phmap::flat_hash_map", "ska::bytell_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "absl::flat_hash_map", "tsl::hopscotch_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m1y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_node_hash_map", "<b>tsl::sparse_map</b>", "folly::F14NodeMap", "phmap::node_hash_map", "absl::node_hash_map", "folly::F14ValueMap", "<b>phmap::<br>parallel_flat_hash_map</b>", "phmap::flat_hash_map", "<b>robin_hood::<br>unordered_node_map</b>", "tsl::hopscotch_map", "ska::bytell_hash_map", "absl::flat_hash_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m2y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "phmap::<br>parallel_node_hash_map", "<b>tsl::sparse_map</b>", "folly::F14NodeMap", "phmap::node_hash_map", "absl::node_hash_map", "<b>phmap::<br>parallel_flat_hash_map</b>", "folly::F14ValueMap", "<b>robin_hood::<br>unordered_node_map</b>", "ska::bytell_hash_map", "tsl::hopscotch_map", "phmap::flat_hash_map", "absl::flat_hash_map", "emilib1::HashMap", "<b>robin_hood::<br>unordered_flat_map</b>", "<b>tsl::robin_map</b>"];
    var m3y = [ "std::unordered_map", "boost::unordered_map", "spp::sparse_hash_map", "boost::multi_index::<br>hashed_unique", "eastl::hash_map", "<b>tsl::sparse_map</b>", "phmap::<br>parallel_node_hash_map", "folly::F14NodeMap", "absl::node_hash_map", "phmap::node_hash_map", "folly::F14ValueMap", "<b>phmap::<br>parallel_flat_hash_map</b>", "robin_hood::<br>unordered_flat_map", "<b>robin_hood::<br>unordered_node_map</b>", "tsl::hopscotch_map", "phmap::flat_hash_map", "absl::flat_hash_map", "<b>ska::bytell_hash_map</b>", "emilib1::HashMap", "<b>tsl::robin_map</b>"];
    var m4y = [ "tsl::sparse_map", "tsl::robin_map", "tsl::hopscotch_map", "spp::sparse_hash_map", "robin_hood::<br>unordered_node_map", "robin_hood::<br>unordered_flat_map", "phmap::<br>parallel_node_hash_map", "phmap::<br>parallel_flat_hash_map", "phmap::node_hash_map", "phmap::flat_hash_map", "emilib1::HashMap", "absl::node_hash_map", "absl::flat_hash_map", "std::unordered_map", "boost::unordered_map", "boost::multi_index::<br>hashed_unique", "<b>eastl::hash_map</b>", "folly::F14NodeMap", "<b>folly::F14ValueMap</b>", "<b>ska::bytell_hash_map</b>"];
    var measurement_names = [ "4 bits, 50M cycles", "8 bits, 50M cycles", "12 bits, 50M cycles", "16 bits, 50M cycles", "20 bits, 50M cycles", "24 bits, 50M cycles" ];

    var data = [
        { x: [ 3.982195, 2.97911, 4.0314499999999995, 1.9062549999999998, 2.66929, 1.96028, 2.82944, 2.827625, 2.16433, 1.88701, 2.496945, 1.6477, 1.80122, 1.749195, 0.96661, 1.56816, 1.20834, 1.01449, 0.98049, 1.01279 ],
          y: m0y, name: measurement_names[0] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[0], },
        },
        { x: [ 3.8805300000000003, 2.778705, 4.49204, 2.1979699999999998, 3.07029, 2.54433, 3.0872200000000003, 3.7367, 2.42078, 2.196545, 2.701225, 2.17071, 2.26249, 1.659095, 1.3434599999999999, 2.073245, 1.7546249999999999, 1.35016, 1.33594, 1.256175 ],
          y: m0y, name: measurement_names[1] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[1], },
        },
        { x: [ 4.402794999999999, 3.2571950000000003, 4.401915000000001, 2.5417699999999996, 3.212015, 3.12454, 3.137405, 3.3273099999999998, 2.4901, 2.26613, 2.74787, 2.62764, 2.08409, 1.9567350000000001, 1.592565, 1.803775, 1.99023, 1.52431, 1.5581450000000001, 1.270965 ],
          y: m0y, name: measurement_names[2] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[2], },
        },
        { x: [ 6.669045, 5.143025, 5.111135, 4.140525, 4.27915, 4.02253, 3.925415, 3.8623399999999997, 3.12925, 2.9794349999999996, 3.305535, 2.96617, 2.21687, 2.246055, 1.748015, 1.969625, 2.300135, 1.7396449999999999, 1.639845, 1.41218 ],
          y: m0y, name: measurement_names[3] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[3], },
        },
        { x: [ 14.4041, 11.963750000000001, 7.81282, 9.24701, 8.13203, 8.72492, 6.833335, 5.043055, 6.34372, 6.325395, 5.000745, 5.04235, 3.55618, 3.30878, 3.25023, 3.1724699999999997, 3.617305, 3.0101050000000003, 2.3059000000000003, 2.64465 ],
          y: m0y, name: measurement_names[4] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[4], },
        },
        { x: [ 21.8159, 18.33755, 13.4892, 15.997, 13.39825, 13.7057, 10.20645, 9.79648, 10.5519, 10.2346, 7.60447, 7.69069, 5.8602, 5.529925, 7.52579, 5.5680250000000004, 4.988735, 4.916905, 3.9807550000000003, 4.025684999999999 ],
          y: m0y, name: measurement_names[5] + ' (robin_hood::hash)', type: 'bar', orientation: 'h', yaxis: 'y', marker: { color: colors[5], },
            textposition: 'outside',
            text: [ "55.2s<br>510MB", "44.5s<br>468MB", "39.3s<br>213MB", "36.0s<br>517MB", "34.8s<br>312MB", "34.1s<br>391MB", "30.0s<br>375MB", "<b>28.6s<br>180MB</b>", "27.1s<br>419MB", "25.9s<br>418MB", "23.9s<br>375MB", "<b>22.1s<br>272MB</b>", "17.8s<br>399MB", "16.4s<br>398MB", "<b>16.4s<br>308MB</b>", "16.2s<br>398MB", "15.9s<br>565MB", "13.6s<br>565MB", "<b>11.8s<br>397MB</b>", "<b>11.6s<br>565MB</b>" ],
        },
        { x: [ 3.59788, 2.838175, 4.012415, 1.92337, 2.7833550000000002, 2.06853, 3.14398, 2.94, 2.16517, 1.9741499999999998, 2.62462, 1.69129, 1.86518, 1.1185049999999999, 1.262355, 1.78739, 1.665155, 0.9940424999999999, 1.0726, 1.1251 ],
          y: m1y, name: measurement_names[0] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[0], },
        },
        { x: [ 4.115155, 2.92345, 4.90569, 2.359995, 3.2044949999999996, 2.59925, 4.4474599999999995, 3.11531, 2.93936, 2.63794, 2.718695, 2.28548, 2.52451, 2.11451, 2.47623, 1.83581, 2.35802, 1.7099600000000001, 2.0839100000000004, 1.750705 ],
          y: m1y, name: measurement_names[1] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[1], },
        },
        { x: [ 4.48281, 3.385885, 4.37866, 2.703545, 3.324605, 3.04634, 3.325235, 3.215325, 2.44533, 2.2449950000000003, 2.81425, 2.60893, 2.10622, 1.71774, 1.9698, 1.9655749999999999, 1.84775, 1.53754, 1.6546949999999998, 1.3161450000000001 ],
          y: m1y, name: measurement_names[2] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[2], },
        },
        { x: [ 6.68063, 5.133435, 5.36875, 4.25877, 4.541985, 3.78493, 4.111605, 4.00252, 3.01955, 2.7075, 3.3842800000000004, 2.81203, 2.2604, 2.027725, 2.47448, 2.362435, 1.948505, 1.90951, 1.9255499999999999, 1.642555 ],
          y: m1y, name: measurement_names[3] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[3], },
        },
        { x: [ 14.75415, 12.1735, 8.177715, 9.36989, 8.414785, 8.4342, 5.449655, 6.8696, 6.4766, 6.382335, 5.080665, 4.89709, 3.70857, 3.53636, 3.830125, 3.42883, 3.33607, 3.21229, 2.61621, 2.91564 ],
          y: m1y, name: measurement_names[4] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[4], },
        },
        { x: [ 22.5749, 18.2757, 13.74635, 15.53515, 13.85465, 13.7229, 10.0475, 10.309249999999999, 10.4996, 10.6297, 7.47842, 7.83665, 5.98554, 7.815545, 5.2382349999999995, 5.536745, 5.599475, 5.23651, 4.41671, 4.29061 ],
          y: m1y, name: measurement_names[5] + ' (absl::Hash)', type: 'bar', orientation: 'h', yaxis: 'y2', marker: { color: colors[5], },
            textposition: 'outside',
            text: [ "56.2s<br>510MB", "44.7s<br>468MB", "40.6s<br>212MB", "36.2s<br>517MB", "36.1s<br>312MB", "33.7s<br>391MB", "<b>30.5s<br>181MB</b>", "30.5s<br>375MB", "27.5s<br>420MB", "26.6s<br>418MB", "24.1s<br>375MB", "<b>22.1s<br>272MB</b>", "18.5s<br>399MB", "<b>18.3s<br>308MB</b>", "17.3s<br>565MB", "16.9s<br>398MB", "16.8s<br>398MB", "14.6s<br>565MB", "<b>13.8s<br>397MB</b>", "<b>13.0s<br>565MB</b>" ],
        },
        { x: [ 4.03276, 3.09187, 4.13341, 2.17812, 2.80372, 2.41271, 2.6258999999999997, 2.968045, 2.27867, 2.2139800000000003, 2.04142, 2.5947649999999998, 1.219015, 2.25045, 1.34848, 1.92726, 1.856765, 1.1481249999999998, 1.225825, 1.162725 ],
          y: m2y, name: measurement_names[0] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[0], },
        },
        { x: [ 4.578015, 3.2586950000000003, 4.641755, 2.732685, 3.309285, 2.89172, 3.717035, 3.20249, 2.9165, 2.78335, 2.47393, 2.7825699999999998, 1.959825, 2.191955, 2.13837, 2.50303, 2.482935, 1.68433, 1.92238, 1.38151 ],
          y: m2y, name: measurement_names[1] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[1], },
        },
        { x: [ 4.72636, 3.624425, 5.005615, 2.98826, 3.5415099999999997, 3.52378, 3.992175, 3.282345, 2.65972, 2.65688, 3.00238, 2.86343, 2.04537, 2.262695, 2.45101, 2.2582, 2.2164599999999997, 1.9087049999999999, 1.99981, 1.629245 ],
          y: m2y, name: measurement_names[2] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[2], },
        },
        { x: [ 7.05255, 5.473045, 5.8461549999999995, 4.56623, 4.8317499999999995, 4.24802, 4.4563, 4.07493, 3.08305, 3.0818, 3.26027, 3.4242850000000002, 2.39644, 2.731935, 2.921435, 2.3473, 2.26982, 2.316525, 2.2413600000000002, 1.940725 ],
          y: m2y, name: measurement_names[3] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[3], },
        },
        { x: [ 14.20795, 12.5199, 8.652875, 9.877055, 8.69997, 8.93972, 5.68969, 6.8699449999999995, 6.3973, 6.509045, 5.39343, 5.1064050000000005, 3.93512, 3.89039, 4.271715, 3.70658, 3.67612, 3.647645, 2.957135, 3.3167 ],
          y: m2y, name: measurement_names[4] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[4], },
        },
        { x: [ 23.16085, 18.4277, 14.35265, 16.329, 14.150749999999999, 14.3715, 10.4971, 10.25585, 10.4466, 10.53435, 8.37654, 7.75553, 8.146094999999999, 6.099825, 5.826505, 5.67996, 5.88307, 5.655725, 4.79455, 4.72592 ],
          y: m2y, name: measurement_names[5] + ' (folly::hasher)', type: 'bar', orientation: 'h', yaxis: 'y3', marker: { color: colors[5], },
            textposition: 'outside',
            text: [ "57.8s<br>395MB", "46.4s<br>468MB", "42.6s<br>211MB", "38.7s<br>517MB", "37.3s<br>312MB", "36.4s<br>391MB", "<b>31.0s<br>181MB</b>", "30.7s<br>375MB", "27.8s<br>420MB", "27.8s<br>418MB", "<b>24.5s<br>272MB</b>", "24.5s<br>375MB", "<b>19.7s<br>308MB</b>", "19.4s<br>398MB", "19.0s<br>565MB", "18.4s<br>399MB", "18.4s<br>398MB", "16.4s<br>565MB", "<b>15.1s<br>397MB</b>", "<b>14.2s<br>565MB</b>" ],
        },
        { x: [ 4.454465, 3.4894600000000002, 5.57058, 2.613695, 3.362745, 4.26948, 2.67621, 3.47652, 2.933275, 3.02222, 3.134535, 2.37456, 2.8077, 2.5361599999999997, 2.71514, 2.65845, 2.519405, 1.96923, 2.3329250000000004, 2.33964 ],
          y: m3y, name: measurement_names[0] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[0], },
        },
        { x: [ 4.816935000000001, 3.9252700000000003, 5.510870000000001, 3.3550500000000003, 3.74186, 4.699655, 3.56167, 3.7162800000000002, 3.219225, 3.25278, 3.320735, 3.19266, 2.9459999999999997, 2.6573849999999997, 2.944845, 3.16623, 2.9645099999999998, 2.61953, 2.4466900000000003, 2.146 ],
          y: m3y, name: measurement_names[1] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[1], },
        },
        { x: [ 5.278404999999999, 4.078355, 5.462535, 3.41206, 3.910705, 4.68858, 3.64527, 3.8164949999999997, 2.95583, 3.02578, 3.4037, 3.25387, 2.482715, 2.132225, 2.540515, 2.58708, 2.53888, 2.50397, 2.0820350000000003, 1.964405 ],
          y: m3y, name: measurement_names[2] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[2], },
        },
        { x: [ 7.36004, 6.015985, 6.16441, 5.10197, 5.21415, 5.07032, 4.55639, 4.74528, 3.49191, 3.51868, 4.039315, 3.64697, 3.0684250000000004, 2.72701, 3.22166, 2.77749, 2.701225, 3.08509, 2.6721500000000002, 2.31471 ],
          y: m3y, name: measurement_names[3] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[3], },
        },
        { x: [ 16.45115, 13.293849999999999, 9.37511, 10.616399999999999, 9.535074999999999, 7.35219, 9.41858, 7.9249600000000004, 7.4897, 7.3191, 5.893585, 6.00904, 4.8916249999999994, 4.737825, 5.183615, 4.55647, 4.583455, 4.419845, 4.6105599999999995, 4.264935 ],
          y: m3y, name: measurement_names[4] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[4], },
        },
        { x: [ 23.5915, 19.2189, 15.18795, 17.008850000000002, 14.7333, 13.76265, 15.1511, 11.6569, 11.21205, 11.1292, 8.67895, 9.47965, 7.916435, 8.88907, 6.8187549999999995, 6.51517, 6.62665, 6.8512, 6.66675, 5.797175 ],
          y: m3y, name: measurement_names[5] + ' (FNV1a)', type: 'bar', orientation: 'h', yaxis: 'y4', marker: { color: colors[5], },
            textposition: 'outside',
            text: [ "62.0s<br>510MB", "50.0s<br>468MB", "47.3s<br>212MB", "42.1s<br>517MB", "40.5s<br>312MB", "<b>39.8s<br>181MB</b>", "39.0s<br>391MB", "35.3s<br>375MB", "31.3s<br>418MB", "31.3s<br>420MB", "28.5s<br>375MB", "<b>28.0s<br>272MB</b>", "24.1s<br>397MB", "<b>23.7s<br>308MB</b>", "23.4s<br>565MB", "22.3s<br>399MB", "21.9s<br>398MB", "<b>21.4s<br>398MB</b>", "20.8s<br>565MB", "<b>18.8s<br>565MB</b>" ],
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3.9876300000000002, 3.0170500000000002, 1.627305, 2.61124, 3.3476299999999997, 2.88, 1.322305 ],
          y: m4y, name: measurement_names[0] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[0], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3.95988, 2.7770200000000003, 2.141985, 3.04899, 2.797115, 2.37681, 1.63263 ],
          y: m4y, name: measurement_names[1] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[1], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4.54997, 3.77959, 2.860785, 3.207435, 3.04422, 2.61423, 1.7491400000000001 ],
          y: m4y, name: measurement_names[2] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[2], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6.56328, 5.155965, 4.0577950000000005, 4.27468, 3.6417200000000003, 2.9993600000000002, 2.070005 ],
          y: m4y, name: measurement_names[3] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[3], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14.85065, 16.0306, 11.4648, 7.74329, 6.371555, 4.62676, 3.1353549999999997 ],
          y: m4y, name: measurement_names[4] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[4], },
        },
        { x: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21.747799999999998, 19.83785, 16.91735, 12.9372, 9.971319999999999, 7.26949, 5.204219999999999 ],
          y: m4y, name: measurement_names[5] + ' (Identity)', type: 'bar', orientation: 'h', yaxis: 'y5', marker: { color: colors[5], },
            textposition: 'outside',
            text: [ "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "timeout", "55.7s<br>510MB", "50.6s<br>468MB", "39.1s<br>517MB", "<b>33.8s<br>312MB</b>", "29.2s<br>375MB", "<b>22.8s<br>375MB</b>", "<b>15.1s<br>398MB</b>" ],
        },
    ];

    var layout = {
        // title: { text: 'RandomInsertErase'},
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
        yaxis3: { title: 'folly::hasher', automargin: true, },
        yaxis4: { title: 'FNV1a', automargin: true, },
        yaxis5: { title: 'Identity', automargin: true, },
        xaxis: { automargin: true, },
        legend: { traceorder: 'normal' },
        margin: { pad: 0, l:0, r:0, t:0, b:0, },
        showlegend:false,
    };

    Plotly.newPlot('id_ea181734', data, layout);
</script>
