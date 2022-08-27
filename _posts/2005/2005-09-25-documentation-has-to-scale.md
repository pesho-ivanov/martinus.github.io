---
author: martin.ankerl@gmail.com
comments: true
date: 2005-09-25 13:05:11+00:00
layout: post
slug: documentation-has-to-scale
title: Documentation has to Scale
wordpress_id: 32
categories:
- programming
---

Whenever you create a program and try to not suffer the [Not Invented Here](http://en.wikipedia.org/wiki/Not_Invented_Here) syndrom, you have to research all kind of libraries. The biggest obstactle at this point it mostly the lack of good documentation, that let you start _quickly_. I lay particular emphasis on quickly, because there are a lot of excellent libraries available that have very detailed and precice documentation, but take a lot of time just to find out what it does and how to use it. A nice example is [log4j](http://logging.apache.org/log4j/docs/). The first link in the documentation section links to [Short introduction to log4j](http://logging.apache.org/log4j/docs/manual.html), which contains about 5600 words.  That's not what I call short, and it is certainly too much if you just want to get a quick overview.

Documentation should scale. It has to allow the reader to get to the level of understanding he really needs. This is what I believe what good software documentation should contain.

You might notice that I have never written anything about a handbook. While a handbook can be a very nice thing to have, it is a lot of effort to create one and keep it updated, while the same information is more quickly available with the documents I have listed above.

## One sentence summary

In just one sentence, summarize what the purpose of the library is. For example, most of the [Jakarta Commons](http://jakarta.apache.org/commons/) have a neat oneliner for the subprojects.

## 1 minute decription

A very short description, that contains all the most important features, behaviour and properties of the library. [PicoContainer](http://www.picocontainer.org/One+minute+description) has a nice example of this.

## 2 minute tutorial

Something to get you started quickly. This should be a bit more than the typical "Hello, World!", and already show usage. Examples are [PicoContainer](http://www.picocontainer.org/Two+minute+tutorial) or [Coconut](http://coconut.codehaus.org/AIO+2+minute+tutorial).

## 5 minute introduction

Just have a look at [PicoContainer's 5 minute tutorial](http://www.picocontainer.org/Five+minute+introduction). This one is really excellent!

## API reference documentation

API documentation that can be generated from sourcecode should be available. One of the best examples I know if is [Sun's java documentation](http://java.sun.com/j2se/1.4.2/docs/api/index.html).

## Examples

Example code that shows best practices. Getting examples running is already satisfying, it shows that installation & configuration was successful. It is very convenient to have several examples that show off typical usage patterns.

## 1 Page Reference Card

A one page reference card one can print out and stick next to his monitor is very handy. Nice examples are [JUnit](http://www.digilife.be/quickreferences/QRC/JUnit%20Quick%20Reference.pdf), [XML](http://www.mulberrytech.com/quickref/XMLquickref.pdf), and [Vi](http://www.digilife.be/quickreferences/QRC/vi%20Quick%20Reference.pdf).
