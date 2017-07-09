---
author: martin.ankerl@gmail.com
comments: true
date: 2007-01-04 20:54:33+00:00
layout: post
link: http://martin.ankerl.com/2007/01/04/statistical-unit-tests-with-ensure4j/
slug: statistical-unit-tests-with-ensure4j
title: Statistical Unit Tests with ensure4j
wordpress_id: 78
categories:
- programming
tags:
- ensure4j
- java
- junit
- programming
- statistics
- tdd
---

As part of another project I am developing [ensure4j](/2006/08/02/redesigning-junit-asserts/). The syntax (see the examples in [redesigning junit asserts](/2006/08/02/redesigning-junit-asserts/)) is working quite nicely, ensure4j is already very useful for internal use.

Lately I was busy adding tests that are able to verify if some code (e.g. an optimizer that uses random, like [genetic algorithm](http://en.wikipedia.org/wiki/Genetic_algorithm), [simulated annealing](http://en.wikipedia.org/wiki/Simulated_annealing), ...) produces the desired in e.g. 95% of the cases (Wikipedia has [a nice practical example](http://en.wikipedia.org/wiki/Confidence_interval#Practical_example) for confidence intervals).

## Example Usage


Here is an example that tests the nonsense code `Math.random() * 2`.

```java    
ensure(new Experiment() {
    public double measure() {
        return Math.random() * 2;
    }
}).between(0.9, 1.1, 0.95).sample(10, 100);
```

The code most likely does not make much sense out of context like this, so here is an explanation of what it does:

## Explanation

In that example we want to verify that the code  returns values whose **95% confidence interval is between 0.9 and 1.1**. At first take **10 samples** to verify this. If the mean is not as expected between the interval, there is still the chance that this was just bad luck. We can take further samples (**up to 1000**) to rule bad luck out. When we have to take more than 1000 samples and the mean is still not in the specified  still not met, there is a very high probability that the code does not produce the desired result, so we have to fail.

I hope the above description is somewhat understandable. It's no piece of cake, and there is no way to cheat around the complexity involved with that kind of statistical tests. I have tried to make the interface as clean and simple as possible, suggestions are always welcome.

## Open Source?

I am developing ensure4j partly at work, and partly in my free time. I would like to make it open source, but I need to get the OK from my boss first.

ensure4j is the the only implementation I know of that uses statistical tests that can be used with JUnit. If you know something similar than this, please post!
