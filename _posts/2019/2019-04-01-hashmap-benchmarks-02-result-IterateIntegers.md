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

