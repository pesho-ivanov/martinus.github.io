---
author: martin.ankerl@gmail.com
comments: true
date: 2008-08-09 19:32:30+00:00
layout: post
slug: two-word-anagram-finder-algorithm
title: Two Word Anagram Finder Algorithm (in Ruby)
wordpress_id: 156
categories:
- programming
tags:
- programming
- ruby
---

Today I have got some sourcecode for you. There is a little programming challenge named [The Self-Documenting Code Contest](http://selfexplanatorycode.blogspot.com/) that is quite fun, they try to find the cleanest and easiest to read code for this task:

> Write a program that generates all two-word anagrams of the string "documenting". Here's a word list you might want to use: [wordlist.zip](/files/2008/08/wordlist.zip).
> When you're done, send the results to [selfdocumenting@hotmail.com](mailto:selfdocumenting@hotmail.com).
>
> Good luck!

So this caught my interest and i wrote a little entry in Ruby that is 23 lines long with whitespace and very nice to read. But I won't show you this code until the contest is over, and this is not the reason for this post. The reason is, that the nice version takes about 2 seconds, and somebody else has coded a Python solution that takes only 1 second (I have no idea what his code looks like). This post is about a fast anagram finding algorithm, and how I developed this algorithm. The final result takes about 0.11 seconds.


## Algorithm


The most basic algorithm has two phases:

1. Read in the file
2. Build all combinations of two words and compare the letter count with the query.

Building the combinations is usually done with two nested loops and takes *O(n^2)* runtime. This is slow, so I have added another step in between:



## Idea #1: Filter out Candidate Words


The second step is really slow, but it would be a lot faster if it has to handle less words. So I wrote a little filtering step that lets only words through which are made out of the same letters as the query word.

For example when the query is documenting, the word men or go and even too are extracted, even if the number of letters might not match. But that's not important, what is important is that the number of possible words are reduced a lot, and so the next phase is faster.


## Idea #2: Use a Commutative Hashing Function

String comparisons are slow. To common way to find out if the strings coming with tuned is an anagram of the word documenting is to sort the letters and make a comparison, like this:

```ruby 
irb(main):003:0> "documenting".unpack("c*").sort.pack("c*")
=> "cdegimnnotu"
irb(main):004:0> ("coming" + "tuned").unpack("c*").sort.pack("c*")
=> "cdegimnnotu"
```

The strings are equal, so we have a match. But this comparison is terribly slow! What's worse, the computations have to be redone for each match. It would be much better to just compare hash values, and find a hash function to quickly check if we might have a match, and only do the string comparison when the hash check matches. The hash has to be good enough that we don't have too much false positives (hashes are equal but the real comparisons not) to get a speed advantage. So why not just sum up all the letters bytes?

```ruby
irb(main):005:0> "documenting".sum
=> 1181
irb(main):006:0> "coming".sum + "tuned".sum
=> 1181
```

Ruby's [String#sum](http://www.ruby-doc.org/core/classes/String.html#M000857) does exactly this. we can now precalculate the sum for each word, and to find a match we just add the two hashes and compare the result to the query's hash:

```ruby
irb(main):007:0> query="documenting"; first="coming"; second="tuned"
=> "tuned"
irb(main):008:0> first.sum + second.sum == query.sum
=> true
```

When this very quick check returns true, we have to do the string comparison to be absolutely sure it is a match. This considerably speeds up the whole program, but it is still *O(n^2)*.


## Idea #3: Reformulate Problem


Now here comes the trickiest and coolest part. Since Idea #2 the slowest part is matching the numbers, with still quadratic complexity. But the hard task is not anagram finding any more, we have reduced it to finding two hashes that combined have the same hash as the query. We can reformulate this problem into something completely detached from the anagram problem:

> Given a list of numbers, find all combination of two numbers that add up to a given number

When we concentrate on just this problem and ignore the rest, we might come up with a better way of doing things.

I came up with a fast solution, described below. Somebody posted a better solution that is both faster and simpler, if you want just this final solution skip ahead to Idea #4 as the following description is outdated.

It clearly looks stupid to just try all combinations to add the numbers.
So lets sort them first. Quicksort is fast, especially with numbers, so no worries here. Now consider a list of numbers like this example:

```    
1   3   7   10   10   12   17   20   22   23   24   24   25   26   30
```

Find all the combinations of two number that add up to 27. They are

* 1 + 26 = 27
* 3 + 24 = 27
* 7 + 20 = 27
* 10 + 17 = 27
* 10 + 17 = 27 (a second time)

You can detect a pattern here: the first number always increases, the second number always decreases! We can now formulate an algorithm for this:

We can have two pointers to the array, one starting from the left side, the other starting from the right side. When the numbers behind the pointers add up to a bigger result than the query (e.g. 1 + 30 = 31), we decrease the right pointer to find a smaller combination (1 + 26 = 27). When the sums are too small (1 + 25 = 26), we move the left pointer to the right (3 + 25 = 28).

This way we walk through the whole array in O(n) time and the sum of the pointers is always kept as close the the desired result as possible. When the pointers meet each other, we can stop the whole process or otherwise we would just reverse the words.

This algorithm gets a bit more complicated when you consider that we might have lots of numbers in it that are equal, whenever this happens you have to fall back into an *O(n^2)* matching algorithm for just this section.


## Idea #4: Use Hash directly


**UPDATE** Scrap the implementation in idea #3. A blog post here from a reader of this article posted a way to do this really in *O(n)*, without any sorting which is *O(n*log(n))*. The idea is to use a hashmap that maps from the hash key of the word to its matches:

```ruby
M = {}
S = the target sum
for each element e in the list
    if M[S-e] exists? (e,S-e) is a pair
        add e to the M
```

Just use a Hashmap that maps from the cummulative hash of a word to a list of words that have the same hash. Whenever a new word is added, get the list of words that is stored under `query.sum - current_word.sum`. When the hashes are the same we just have to create a list of all the matches under this key, and check each of the matches sequentially for equality. This is just normal hash collision handling through a linked list. That's very simple and works like a charm.

I have revised the code, it got both simpler and faster. That's a win-win situation, wohoo!


# The Sourcecode


I hope the code is understandable now with the above explanation. If you have any questions or ideas, please share them here!


    
```ruby
#!/usr/bin/ruby

# created by Martin Ankerl http://martin.ankerl.com/

class String
    # creates an array of characters
    def letters
        unpack("c*")
    end
end

class Array
    # converts an array of letters back into a String
    def word
        pack("c*")
    end
end

query = "documenting"
query_letters_sorted = query.letters.sort
txt = File.read('wordlist.txt').downcase

# to quickly check if a letter is part of the query word
used_letters = Array.new(256, nil)
query_letters_sorted.each do |letter|
    used_letters[letter] = true
end

# Maps from cummulative hash of a word to a list of words that have this hash code.
hashToWords = Hash.new do |hash, key|
    hash[key] = Array.new
end

query_hash = query.sum

prev = 0
txt_size = txt.size
separator = 10
idx = txt.index(separator, prev)
while prev < txt_size

    letter_idx = prev

    # no need to check end of word because it is \n
    # which is not part of the word anyways
    while used_letters[txt[letter_idx]]
        letter_idx += 1
    end

    # ignore word if the above quick check fails
    if letter_idx == idx
        word = txt[prev, idx-prev]

        # check all key matches
        key = word.sum
        hashToWords[query_hash - key].each do |other_word|
            if (word.letters + other_word.letters).sort == query_letters_sorted
                puts "#{word} #{other_word}"
                puts "#{other_word} #{word}"
            end
        end

        # insert word
        hashToWords[key] << word
    end

    prev = idx + 1

    # no need to check end of file because we have to end with new line
    idx = txt.index(separator, prev)
end
```


When you rewrite the algorithm in C++ or Java or Python I am sure it will be faster than this one. But this is not the point of this post. The point is, "The Best Optimizer is between Your Ears" (Michael Abrash, [Graphics Programming Black Book](http://www.byte.com/abrash/)).

Have fun!
