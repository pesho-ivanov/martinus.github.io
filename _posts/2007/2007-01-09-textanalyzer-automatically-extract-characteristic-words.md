---
author: martin.ankerl@gmail.com
comments: true
date: 2007-01-09 14:36:56+00:00
layout: post
slug: textanalyzer-automatically-extract-characteristic-words
title: TextAnalyzer - Automatically Extract Characteristic Words
wordpress_id: 80
categories:
- programming
tags:
- characteristic words
- programming
- ruby
- textanalyzer
---

[TextAnalzyer](/files/2007/01/textanalyze.rb) is a text analyzer tool that finds out words that are characteristic for a given input file. It is independent from any language, and even seems to work well with HTML files.

This program is only a little prototype, that shows that this technique seems to work. It's public domain, feel free to do whatever you like with it:

## Download

[textanalyze.rb](/files/2007/01/textanalyze.rb), Licence: Public Domain.

## Example

1. Build an index with a reasonably large amount of data, it should be much larger than the text you want to analyze. For example, I have indexed 76 of Grimm's fairy tales with this command:
   ```bash
   cat *.txt | ruby ../textanalzye.rb c
   ```
   This creates the file wordcount.dat that contains the word count of each word.
1. To find out which words are characteristic for a specific text, the previously generated reference data is used. To continue the example:
   ```bash
   cat LittleRedRidingHood.txt |ruby ../textanalzye.rb a
   ```
   This produces the output
   ```
   hood, grandma, riding, hunter, red
   ```
   So the above words seem to be very relevant to LittleRedRidingHood.txt when compared to all of Grimm's tales.


## Other Uses

The previous example seems a bit useless, but there certainly are a lot of useful applications. Here are some ideas:

* Quickly find out what an unknown text is about
* Automatically extract important words from blog entries
* Find out what a text is about by reading just 5 words
* Automatically create very short descriptions for a large number of documents

The currently implemented algorithm even works well with HTML files (To my own surprise. Actually, I am surprised that it works at all…)

## Algorithm

The main idea is quite simple: the algorithm assumes, that important words are :

1. Often used in the to-be-analyzed text
1. Seldom used in other texts

For example, the second condition ensures that words like "the", "and" etc. are not considered important.

The full algorithm to calculate the score of a word (higher==more important) is done with this formula:

```cpp
tanh(curVal/curWords*200) - 5*tanh((allVal-curVal)/(allWords-curWords)*200)
```

The variables:

* `curVal`: How often the word to score is present in the to-be-analyzed text.
* `curWords`: Total number of words in the to-be-analyzed text.
* `allVal`: How often the word to score is present in the indexed dataset.
* `allWords`: Total number of words of the indexed dataset.

Please don't ask me how or why this works. I have no idea. I have invented this formula in one of the rare moments when I was enlighted for approximately 10 seconds, quickly wrote it down, and immediately forgot how it worked because my mind was overwhelmed by its beauty and simplicity... Or something like that :wink: