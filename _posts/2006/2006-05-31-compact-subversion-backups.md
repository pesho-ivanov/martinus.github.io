---
author: martin.ankerl@gmail.com
comments: true
date: 2006-05-31 15:23:20+00:00
layout: post
slug: compact-subversion-backups
title: Compact Subversion Backups
wordpress_id: 59
categories:
- programming
---

If you have a large [Subversion](http://subversion.tigris.org/) repository and want to back it up using as few space as possible, use this command (replace `repo` with your actual repository path):

```bash
svnadmin dump --deltas /repo |bzip2 |tee dump.bz2 | md5sum >dump.md5
```

Step by step:

1. The important part is `--deltas`, which uses a more CPU intense but more storage efficient delta method.

1. `bzip2` is slower than `gzip` but compresses better.

1. Now to another fun part: `tee` redirects the compressed data stream into the file `dump.bz2`, but also writes the stream to stdout which in turn is redirected into the MD5 calculation tool.


To restore the repository, test checksum, create empty repository, restore backup:

```bash
md5sum -c dump.md5 <dump.bz2
svnadmin create newrepo
bzcat dump.bz2 | svnadmin load newrepo
```

Enjoy your compact and MD5 summed backup, and store dump.md5 and dump.bz2 somewhere really safe.