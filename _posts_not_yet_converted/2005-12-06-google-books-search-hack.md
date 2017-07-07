---
author: martin.ankerl@gmail.com
comments: true
date: 2005-12-06 14:59:04+00:00
layout: post
link: http://martin.ankerl.com/2005/12/06/google-books-search-hack/
slug: google-books-search-hack
title: Google Books Search Hack
wordpress_id: 41
categories:
- programming
---


	

[Googles book search](http://books.google.com/) does not allow browsing all the pages of books. My first try to go around this was to search a book for words like and which should be available on most pages. Google does not allow this, but have a look at the following funny search term:


	
    
    of|on


	

This should display all pages that contain the words of or on. Google does not search for either of the two words because they are too general, but strangely returns _ALL_ the pages.


	

So, there you go. All pages browsable.


	

## Update 2005-12-07:


	

It looks like Google has quickly fixed the problem, when browsing a few pages you get the error message


	

<blockquote>Your search is too general. Please try again with a more specific query.
> 
> </blockquote>
