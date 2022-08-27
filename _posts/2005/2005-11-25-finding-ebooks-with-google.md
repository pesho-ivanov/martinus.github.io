---
author: martin.ankerl@gmail.com
comments: true
date: 2005-11-25 16:28:20+00:00
layout: post
slug: finding-ebooks-with-google
title: Finding eBooks with Google
wordpress_id: 35
categories:
- programming
---

Google is a very mighty tool. I have played a bit with search keywords to find eBooks, and this is the result:
	
**[Google for eBooks](http://www.google.com/search?safe=off&c2coff=1&q=%28pdf%7Cchm%7Czip%7Crar%29+%28book%7Cebook%7Cebooks%7Cbooks%29+-bz2+-tar.gz+-tgz+-rpm+-filetype%3Apdf+intitle%3A%22index+of%22+-inurl%3A%28htm%7Chtml%7Casp%29+%28reilly%7Caddison%7Ckluwer%7CMIT%29)**

The search uses these keywords:

```
(pdf|chm|zip|rar) (book|ebook|ebooks|books) -filetype:pdf intitle:"index of" -inurl:(htm|html|asp) (reilly|addison|kluwer|MIT)
```

Step-by-step, this works like this:
	
1. `intitle:"index of"` This tries to limit the search to all pages that have the typical apache directory listing.	
1. `-inurl:(htm|html|asp)` Helps limiting down to real directory indexes, because these do not have the typical .html extention.
1. `(pdf|chm|zip|rar)` Searches for all pages that contain the text pdf, chm, zip, or rar. These are all file extensions usually used by eBooks.
1. `(book|ebook|ebooks|books)` Limit search to pages talking about books or something like this.
1. `-bz2 -tar.gz -tgz -rpm` A lot of directory indexes contain just archives of Linux/BSD packages, we do not want these show up in the results.
1. `(reilly|addison|kluwer|MIT)` Each directory index of eBooks should contain at least one book from one of these large publishers.

That's it. To further limit down the search, add your own keywords (e.g. Java, J2EE, or whatever)
