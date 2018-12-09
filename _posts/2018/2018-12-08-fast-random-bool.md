---
layout: post
title: Fast Random bool in C++
subtitle: With lots of benchmarks
bigimg: /img/2018/09/utxo_header.jpg
---

While playing around with fast random number generators, I've started contemplating what's the fastest way to uniformly generate random boolean values. The correct solution is this (never mind the bad seeding of mt19973, but it's just too cumbersome to do it correctly):

```cpp
std::mt19937 rng(std::random_device{}());
bool rand_bool = std::uniform_int_distribution<>{0, 1}(rng);
```

But is this fast? unfortunately, not so much. It can't be fast, because each call to the `std::uniform_int_distribution<>` object has to request a new random number from `rng`, which means from the 32 random bits that are generated only a single one is used. What a colossal waste.

On my quest to find a faster way, I have written [this gist](https://gist.github.com/martinus/c43d99ad0008e11fcdbf06982e25f464) which contains lots of different variants, and a benchmark. 

# Benchmarking Protocol

To get accurate numbers, I do this:

1. Evaluate each random-bool algorithm with 
   * 2 different compilers: `clang++ -O2` and `g++ -O2`. 
   * 3 different random number generators: `std::mt19973`, `std::mt19973_64`, and the fantastic `sfc64` (more on that later).
   * 2 uses: Single loop, and in a 4 x unrolled loop. Unrolling checks that against code bloat slowdowns.
1. Perform each evaluation 7 times, with 1 trillion iterations. So in total I have 7 x (2 x 3 x 2) = 7 x 12 timing results for each algorithm.
1. Choose the median of the 7 evaluations, then calculate the [geometric mean](https://en.wikipedia.org/wiki/Geometric_mean) of the remaining 12 results.

The resulting geometric mean of each algorithm should be a quite representation of the performance of the random bool algorithm. 

All tests are done one my i7-8700 @ 3.20GHz. The [sourcecode is here](https://gist.github.com/martinus/c43d99ad0008e11fcdbf06982e25f464), and the [results are in this spreadsheet](https://docs.google.com/spreadsheets/d/1cMqhMLNVnbddW8WKDA7C2M-swWm-4sqq13fALzDUOqY/edit?usp=sharing).
I make sure the compiler can't optimize important logic away by counting & printing the number of times `true` is returned.

# Results

## std::uniform_int_distribution<>{0, 1}

```cpp
class UniformDistribution {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        return std::uniform_int_distribution<>{0, 1}(rng);
    }
};
```

 * **8.41 ns/bool geometric mean**
 * 1.59 ns/bool fastest result: sfc64, clang++ -O2, 4x unrolled
 * 18.30 ns/bool slowest result: std::mt19937, g++ -O2, not unrolled
 * 0 byte required

Like explained above, this can be extremely slow. Interestingly, clang++ produces much faster results than g++. The performance is highly dependent on both the random number generator's speed and obviously `std::uniform_int_distribution`.

Verdict: don't use this if performance is important.

## Use Last Bit

```cpp
template <typename U = uint64_t> class BinaryAndUnbiased {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        return (std::uniform_int_distribution<U>{}(rng)) & 1;
    }
};
```

 * **4.29 ns/bool geometric mean**
 * 1.02 ns/bool fastest result: sfc64, clang++ -O2, not unrolled
 * 16.00 ns/bool slowest result: std::mt19937, g++ -O2, not unrolled
 * 0 byte required

It's faster than the `std::uniform_int_distribution<>{0, 1}` solution, but still quite slow because it is so wasteful with the random bits. Note that recently popular random number generators [xoroshiro128+](https://en.wikipedia.org/wiki/Xoroshiro128%2B)'s last bit has some bad random properties, so don't use this in that way.

Verdict: use this if performans is not important or you absolutely can't have any additional memory.

## Use Every Bit with Counter

```cpp
#define UNLIKELY(x) __builtin_expect((x), 0)

template <typename U = uint64_t> class RandomizerWithCounterT {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        if (UNLIKELY(0 == m_counter)) {
            m_rand = std::uniform_int_distribution<U>{}(rng);
            m_counter = sizeof(m_rand) * 8;
        }
        return (m_rand >> --m_counter) & 1;
    }

  private:
    U m_rand = 0;
    int m_counter = 0;
};
```

 * **0.68 ns/bool geometric mean**
 * 0.37 ns/bool fastest result: sfc64, clang++ -O2, 4x unrolled
 * 1.43 ns/bool slowest result: std::mt19937, g++ -O2, 4x unrolled
 * 16 bytes required

This implementation uses a counter to extract a single random bit of a 64bit random number. Huge advantage is that every random bit is used, so it is much less reliant on the random number's time. It is therefore quite fast.

Interestingly, clang++ does a much better job optimizing here. The UNLIKELY macro definitely helps clang++ much more than g++. Unfortunately g++ makes a bad job when unrolling the loop, it gets much slower then.

Verdict: It's much faster than anything above, but uses 16 bytes and there are better ways.

## Counter with Mask

```cpp
#define UNLIKELY(x) __builtin_expect((x), 0)

template <typename U = uint64_t> class RandomizerWithCounter2 {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        auto b = m_counter & s_mask;
        if (UNLIKELY(0 == b)) {
            m_rand = std::uniform_int_distribution<U>{}(rng);
        }
        ++m_counter;
        return (m_rand >> b) & 1;
    }

  private:
    static constexpr U s_mask = sizeof(U) * 8 - 1;
    U m_rand = 0;
    uint_fast8_t m_counter = 0;
};
```

 * **0.59 ns/bool geometric mean**
 * 0.32 ns/bool fastest result: sfc64, clang++ -O2, 4x unrolled
 * 0.94 ns/bool slowest result: std::mt19937, g++ -O2, not unrolled
 * 16 bytes required

In contrast to the previous solution, this one fares much better when used in unrolled code. It's also a bit faster  with the same memory requirements. The trick here is that instead of resetting a counter we always use a mask with it I guess that means there is less branch prediction errors. 

Verdict: Quite good, but we can do even better!

## Sacrifice One Random Bit As Sentinel

```cpp
#define UNLIKELY(x) __builtin_expect((x), 0)

template <typename U = uint64_t> class RandomizerWithShiftT {
  public:
    template <typename Rng> bool operator()(Rng &rng) {
        if (UNLIKELY(1 == m_rand)) {
            m_rand = std::uniform_int_distribution<U>{}(rng) | s_mask_left1;
        }
        bool const ret = m_rand & 1;
        m_rand >>= 1;
        return ret;
    }

  private:
    static constexpr const U s_mask_left1 = U(1) << (sizeof(U) * 8 - 1);
    U m_rand = 1;
};
```

 * **0.53 ns/bool geometric mean**
 * 0.41 ns/bool fastest result: sfc64, clang++ -O2, 4x unrolled
 * 0.74 ns/bool slowest result: std::mt19937, g++ -O2, not unrolled
 * 8 bytes required

The top speed is a bit slower than the previous solution, but this is the most well rounded solution in my benchmarks. It does very well with both unrolled and not unrolled loops, and both g++ and clang++ produce very fast code. Also, it uses only a single `uint64_t` as memory instead of two.

The trick is that we sacrifice the upper bit of the 64bit random number and replace it with 1, which is the sentinel. Each time we extract a bool and rightshift `m_rand`. Since we have the sentinel, we know that we've used up all random bits when `m_rand == 1`, then we fetch a new random number. So instead of 64 bits we use only 63, a loss of 1.6%. 

Verdict: It's awesome, use this from now on.


# Small Fast Counting RNG, version 4

This random number generator is from [PractRand](http://pracrand.sourceforge.net/). It is extremly fast, in my tests faster than [pcg64fast](http://www.pcg-random.org/), [xoshiro256\*\*](http://xoshiro.di.unimi.it/) and [xoroshiro128\*\*](http://xoshiro.di.unimi.it/), and even [splitmix64](http://xoshiro.di.unimi.it/splitmix64.c). It produces high quality random numbers, and passes PractRand. In the words of it's author:

> This has not been as thoroughly tested as the jsf algorithm, but on my tests so far it appears superior to jsf in both quality and speed.  It's basically a good small chaotic RNG driven by a bad smaller linear RNG.  The combination gives it the strengths of each - good chaotic behavior, but enough structure to avoid short cycles.  

My implementation:

```cpp
// extremely fast random number generator that also produces very high quality random.
// see PractRand: http://pracrand.sourceforge.net/PractRand.txt
class sfc64 {
  public:
    using result_type = uint64_t;

    static constexpr uint64_t(min)() { return 0; }
    static constexpr uint64_t(max)() { return UINT64_C(-1); }

    sfc64() : sfc64(std::random_device{}()) {}

    explicit sfc64(uint64_t seed) : m_a(seed), m_b(seed), m_c(seed), m_counter(1) {
        for (int i = 0; i < 12; ++i) {
            operator()();
        }
    }

    uint64_t operator()() noexcept {
        auto const tmp = m_a + m_b + m_counter++;
        m_a = m_b ^ (m_b >> right_shift);
        m_b = m_c + (m_c << left_shift);
        m_c = rotl(m_c, rotation) + tmp;
        return tmp;
    }

  private:
    template <typename T> T rotl(T const x, int k) { return (x << k) | (x >> (8 * sizeof(T) - k)); }

    static constexpr int rotation = 24;
    static constexpr int right_shift = 11;
    static constexpr int left_shift = 3;
    uint64_t m_a;
    uint64_t m_b;
    uint64_t m_c;
    uint64_t m_counter;
};
```
