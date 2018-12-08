---
layout: post
title: Fast Random bool in C++
subtitle: With lots of benchmarks
bigimg: /img/2018/09/utxo_header.jpg
---

While playing around with fast random number generators, I've started contemplating what's the fastest way to uniformly generate random boolean values. The correct solution is this (never mind the bad seeding of mt19973, but it's just too cumbersome to do it correctly):

```
std::mt19937 rng(std::random_device{}());
bool rand_bool = std::uniform_int_distribution<>{0, 1}(rng);
```

But is this fast? unfortunately, not so much. It can't be fast, because each call to the `std::uniform_int_distribution<>` object has to request a new random number from `rng`, which means from the 32 random bits that are generated only a single one is used. What a colossal waste.

On my quest to find a faster way, I have written [this gist](https://gist.github.com/martinus/c43d99ad0008e11fcdbf06982e25f464) which contains lots of different variants, and a benchmark. 

# Benchmarking Protocol

To get accurate numbers, I do this:

1. Compile the benchmark with both `g++ -O2` and `clang++ -O2`. Benchmark both executables.
1. Evaluate each random-bool algorithm with 
   * 3 different random number generators: `std::mt19973`, `std::mt19973_64`, and the fantastic `sfc64` (more on that later).
   * Single loop, and a 4 x unrolled loop. Unrolling checks that against code bloat slowdowns.
1. Perform each evaluation 7 times, with 1 trillion iterations. So in total I have 7 x 6 timing results for each algorithm.
1. Choose the median of the 7 evaluations, then calculate the [geometric mean](https://en.wikipedia.org/wiki/Geometric_mean) of the remaining 6 results. The result should be a quite accurate representation of the performance of the random bool algorithm.

performs 7 evaluations of each algorithm with 3 different random number generators: .  More on that later. For a final benchmarking result, I take the median of each of the 7 evaluations to get rid of outliers, so I am left with 3 results for each of the generators. I then calculate the geometric mean of 3 numbers to get the final result.

# Results

## std::uniform_int_distribution<>{0, 1}

```
class UniformDistribution {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        return std::uniform_int_distribution<>{0, 1}(rng);
    }
};
```
 * **fastest**: 1.59 ns/bool sfc64, clang++ -O2, 4x unrolled
 * **slowest**: 18.3 ns/bool std::mt19937, g++ -O2, not unrolled
 * **memory**: 0 bytes

Like explained above, this can be extremely slow. Interestingly, clang++ produces much faster results than g++. The performance is highly dependent on both the random number generator's speed and obviously `std::uniform_int_distribution`.

* 1.83 ns/bool for clang++ with `sfc64`
* 17.96 ns/bool for g++ with `std::mt19937_64`

### Verdict: not recommended.

## 
