---
author: martin.ankerl@gmail.com
comments: true
date: 2005-09-24 12:10:36+00:00
layout: post
link: http://martin.ankerl.com/2005/09/24/subversion-propset-script/
slug: subversion-propset-script
title: Subversion Propset Script
wordpress_id: 30
categories:
- programming
---

I use a script to set the svn:keywords properties recursively for all files of a given pattern:

```bash    
#!/bin/sh
PATTERNS="*.txt *.java build.xml *.properties *.sh *.sample"
KEYWORDS="Date Id Rev Author"

for PATTERN in $PATTERNS
do
    find . -name "$PATTERN" -prune -exec svn propset svn:keywords "$KEYWORDS" \{\} \;
    echo "-----------------"
done

echo
echo "don't forget to execute 'svn commit'."
```

Modify the PATTERNS and KEYWORDS variables as you like, and execute it with

```bash    
./setSvnKeywordProperties.sh .
```

to set properties for all the files found by the script. You can do a
	    
```bash    
svn st
```

to list all files that are modified with this action, and commit via
    
```bash    
svn commit
```