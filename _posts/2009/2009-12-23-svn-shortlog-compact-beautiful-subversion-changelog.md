---
author: martin.ankerl@gmail.com
comments: true
date: 2009-12-23 16:58:17+00:00
layout: post
slug: svn-shortlog-compact-beautiful-subversion-changelog
title: svn-shortlog -- Compact & Beautiful Subversion Changelog
wordpress_id: 303
categories:
- programming
---

At work we periodically have short developer meetings to discuss what has happened in the last month. To do this, we go through the bugs in our issue tracking system, and the subversion commits in our repository. Unfortunately, getting an overview of the subversion commits was rather cumbersome, and we could not find any efficient tool to do this. Hence, **svn-shortlog** was born.

This is an attempt to format the subversion log of a one-month period in the following way:

* Beautiful HTML output.
* Compact representation of lots of information
* Usable with a not-so color rich beamer.
* Fully automatic.


## Usage

1. Install [Ruby](http://www.ruby-lang.org/de/) (both 1.8 or 1.9 should work).
1. Download [svn-shortlog.rb](https://github.com/martinus/svn-shortlog/blob/master/svn-shortlog.rb)
1. Open `svn-shortlog.rb` with your favourite text editor, and configure the config section according to your needs.
1. Doubleclick `svn-shortlog.rb`
1. Open the generated `changelog_....html` file with your favourite browser.


## Sample Output

Here is a [sample output of one month of boost commits](/files/2009/12/changes_2009-12-01_to_2009-12-31.html) into trunk, taken from the [public repository of boost](http://www.boost.org/users/download/#repository). The output is quite information dense. A quick description is here in the screenshot:

![Svn Shortlog Documentation](/img/2009/12/svn-shortlog-documentation.png)

All commits are structured by user, then by date. Each commit is on one line. You can click each line to see the full information related to a commit.



## Issues

Ideas, suggestions, problems? Please post them as a comment here, at the [bug tracker](https://github.com/martinus/svn-shortlog/issues).

## Credits

This tool is based on the idea from my colleague [Christoph Heindl](http://cheind.wordpress.com/) and inspired by [Linus' Kernel shortlog](http://groups.google.com/group/linux.kernel/msg/d43224c9ba53f0cc?) and [Gmail](http://mail.google.com/).
