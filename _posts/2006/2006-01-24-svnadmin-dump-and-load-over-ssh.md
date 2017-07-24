---
author: martin.ankerl@gmail.com
comments: true
date: 2006-01-24 16:46:37+00:00
layout: post
slug: svnadmin-dump-and-load-over-ssh
title: Svnadmin Dump And Load Over SSH
wordpress_id: 50
categories:
- linux
- programming
---

This is how I mirrored my subversion repository over a SSH connection:

```bash
svnadmin dump /path/to/repository |ssh -C username@servername 'svnadmin -q load /path/to/repository/on/server'
```

Before this works you need to log in on the server servername and create a repository with e.g. svnadmin create /path/to/repository/on/server.
