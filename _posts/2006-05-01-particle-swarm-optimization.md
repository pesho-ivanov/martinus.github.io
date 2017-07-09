---
author: martin.ankerl@gmail.com
comments: true
date: 2006-05-01 07:55:04+00:00
layout: post
link: http://martin.ankerl.com/2006/05/01/particle-swarm-optimization/
slug: particle-swarm-optimization
title: Particle Swarm Optimization
wordpress_id: 58
categories:
- programming
---

For the company I work with I have implemented a [Particle Swarm Optimizer](http://en.wikipedia.org/wiki/Particle_swarm_optimization) (PSO). You can think of a PSO like a flock of birds that are flying around and searching for food. Each bird is talking to its friends, like "hey, I have found lots of food where I am right now!". Other birds think to themselves: "Cool. I might check it out".

It is fascinating how real life swarms (be it birds, bees, fish...) are really efficient at such difficult tasks like finding food in a large, dangerous environment. A PSO tries to imitate this behaviour in a computer program and use it to optimize. In contrast, the more well known [Genetic Algorithms](http://en.wikipedia.org/wiki/Genetic_algorithm) (GA) uses evolution mechanisms (mutation, crossover, survival of the fittest) for optimization. It works well too, otherwise mankind would not exist.

Having some experience with Genetic Algorithms I was eager to implement a PSO (which is also a global optimization technique) to compare it with GA. In short, I am very impressed. Here are some of my findings:

## Stability

A PSO is an extremly stable beast. It has just a few parameters to play with, but if you choose reasonable default values they will probably work for a wide range of problems. My friend implemented a [plane fitting](http://www.mathworks.com/products/statistics/demos.html?file=/products/demos/shipping/stats/orthoregdemo.html) algorithm with the PSO and used the exact same parameters as I have used for a completely different problem. It works flawlessly every time.

## Scalability

I have successfully used the PSO for problems with 300,000 dimensions, or thousands of particles. With 300,000 dimensions my test function has a hell of a lot more local minima, so the PSO was not able to find the global optimum. But it came very close to it, and this with just 20 particles.

## Speed

It is very fast. The PSO reliably found the global minimum of the plane fitting problem after about 50 iterations with 20 particles. For a GA I would have needed about 500 particles with 100 iterations or so, and then I would have come only somewhat near the optimal solution.

The operations of a PSO are very simple, just a few simple matrix multiplications. It usually requires no more than 20 or so particles, which is pretty independent of the problem. In experiments with high dimension problems (3,000 dimensions) the PSO works very good with just 20 particles.

The calculations required to move a particle around are very simple and fast. In fact it is only 5 readable lines of code.

## Explorative Behaviour

The PSO has a nice parameter called _inertia_, which when bigger than 1 makes the swarm to expand and explore. When smaller than 1, the particles optimize and narrow down on solutions. So when starting the iteration process I usually use an inertia of 1.2 and gradually decrease it to 0.6. When animating the particles this looks really life like: At first the particles swarm out in every direction, then suddenly they more and more cluster at good solutions.

## Optimizing on a Solution

Once the PSO has found an optimum, it really narrows down on it. For a test problem, the PSO quickly found the global optimum (the fitness optimum was 0). Here are exemplenary results:

1. 50 iterations: best fitness 0.0321
1. 100 iterations: best fitness 0.000136
1. 150 iterations: best fitness 7.89472e-6
1. 200 iterations: best fitness 1.31593e-20

So once a PSO finds an optimum, it can really narrow down on it, no matter what the scale of the problem is.

## What about Genetic Algorithms?

I am really fascinated by the power of particle swarms. In direct comparison it finds a global optimum much faster than a genetic algorithm. PSO is a relatively new technique with only few research ([google scholar](http://scholar.google.at/) finds [2,720 papers](http://scholar.google.at/scholar?hl=en&lr=&q=%22Particle+Swarm+Optimization%22&btnG=Search) about "Particle Swarm Optimization", and [176,000](http://scholar.google.at/scholar?hl=en&lr=&q=%22genetic+algorithms%22&btnG=Search) about "Genetic Algorithms").

Of course, there surely are problems where a GA is better than a PSO. But it is also the other way round. In fact, it is not too difficult to combine the features of both: If you want you can look at a PSO like it is a very smart mutation algorithm. This might be a pretty straightforward way to combine the powers of GA with PSO. Maybe I'll do that in the future.
