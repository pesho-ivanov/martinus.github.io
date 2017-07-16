---
author: martin.ankerl@gmail.com
comments: true
date: 2015-12-22 07:35:55+00:00
layout: post
slug: beautiful-git-logs
title: Beautiful Git Logs
wordpress_id: 1346
categories:
- programming
---

git has a very configurable logging options. I've played a while with the configuration, and found an awesome alias that looks just beautiful. It only works as of git 1.8.3 (March 24, 2013) because it uses auto coloring.

```bash    
git config --global alias.l 'log --graph --pretty=format:"%C(auto)%h%<(3)%d %s %C(bold blue)(%cr, %an)%Creset" --abbrev-commit --all'
git config --global alias.ls 'log --graph --pretty=format:"%C(auto)%h%<(3)%d %s %C(bold blue)(%cr, %an)%Creset%n" --abbrev-commit --all --find-copies -M --stat'
```

## git l
Output of `git l`:

![git_l](/img/2015/12/git_l.png)


## git ls

Output of `git ls` is similar, just a bit more verbose:

![git_ls](/img/2015/12/git_ls-1.png)
