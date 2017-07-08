---
author: martin.ankerl@gmail.com
comments: true
date: 2006-01-18 07:16:55+00:00
layout: post
link: http://martin.ankerl.com/2006/01/18/how-to-find-research-papers-efficiently/
slug: how-to-find-research-papers-efficiently
title: How to Find Research Papers Efficiently
wordpress_id: 45
categories:
- meta
---

Google has a very nice search engine for scientific papers, namely [scholar.google.com](http://scholar.google.com/). The only problem is that a lot of search results contain links to services that are not free. I believe information should be available for free, so this is what I do against this problem:
	
1. Search for something, e.g. `multi-agent systems`.

1. Whenever you click on a paper that does not lead anywhere except to a site asking you to spend your precious money, ignore this server in your search parameter, like that: `-inurl:acm.org`.

1. Repeat until you are happy.

I usually have this ignore list:

```
-inurl:springerlink -inurl:kluweronline -inurl:ieee.org -inurl:acm.org
```

Now you get the search results that _really_ matter.

