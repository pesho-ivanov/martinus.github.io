---
author: martin.ankerl@gmail.com
comments: true
date: 2005-11-07 09:40:14+00:00
layout: post
link: http://martin.ankerl.com/2005/11/07/subversion-propset-script-20/
slug: subversion-propset-script-20
title: Subversion Propset Script 2.0
wordpress_id: 33
categories:
- programming
---

This [Ruby](http://www.ruby-lang.org/en/) script is pretty convenient to set the svn:keywords of given filetypes. It uses regular expressions to match file names, and also supports exclude patterns as well. Just modify the $includes and $excludes variables as you need.


```ruby 
#!/usr/bin/ruby
# $Id: setSvnKeywordProperties.rb 2397 2005-11-07 10:57:56Z manker $

require 'find'

$includes = [
  /\.txt$/,
  /\.java$/,
  /\.xml$/,
  /\.properties$/,
  /\.sh$/,
  /\.sample$/,
  /\.rb/
]
$excludes = [ /\.svn$/ ]
$keywords = "Date Id Rev Author"

# Findes all files that match one of the patterns defined in the includes but
# does not match one of the patterns defined in the excludes. (excludes are pruned)
class PatternFinder
  def initialize(includes, excludes)
    @includes = includes
    @excludes = excludes
  end

  def find(base_dir)
    files_count = 0
    Find.find(base_dir) do |file_name|
      # check excludes
      @excludes.each do |pattern|
        Find.prune if file_name.match(pattern)
      end

      is_found = @includes.detect do |pattern|
        file_name.match(pattern)
      end
      if is_found
        yield is_found, file_name
      end
    end
  end
end

if __FILE__ == $0
  pf = PatternFinder.new($includes, $excludes)
  pf.find(".") do |pattern, file_name|
    printf("%-20s %s\n", pattern.inspect, file_name)
    system "svn propset svn:keywords \"#{$keywords}\" #{file_name}"
  end
end
```

Usage is very simple, just execute the script in the base directory of your working copy.
