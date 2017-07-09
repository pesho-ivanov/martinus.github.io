---
author: martin.ankerl@gmail.com
comments: true
date: 2006-07-16 14:13:58+00:00
layout: post
link: http://martin.ankerl.com/2006/07/16/self-hosting-subversion-configuration/
slug: self-hosting-subversion-configuration
title: Self-hosting Subversion Configuration
wordpress_id: 65
categories:
- programming
---

How to configure [Subversion](http://subversion.tigris.org/) with Subversion: check out the configuration files, and have subversion automatically use the latest commited version. You do not need to have access to the repository server any more, just a subversion client and a text editor is enough. If you need to change access rights and users regularly, this can be a huge time saver.

With a bit of trickery it is possible to make the subversion configuration self-hosting, this is how it can be done:

1. First, you have to import your current subversion configuration into subversion itself. Create a folder `/admin/subversion` in your repository, check it out, copy over your repositories `conf` and `hooks` directory, and add them. Now your repositories directory layout should look somewhat like this:

   ```
   /admin/subversion/conf/svnauth
   /admin/subversion/conf/svnusers
   /admin/subversion/hooks/post-commit.tmpl
   /admin/subversion/hooks/post-revprop-change.tmpl
   ...
   ```

1. Whenever you commit something to Subversion, you have to automatically update your configuration in case you have changed it. This is possible with the Subversion's hooks. In your checked out hooks directory, create a file `post-commit`.

1. In this example I am using `/var/svn` as the repository location, so you have to change this to wherever your repository is located.

   Copy this into the file post-commit:

   ```bash    
   #!/bin/sh
   # WARNING this file has to have LF as linefeed (and NOT CR+LF)
   # otherwise updating won't work!
   svn up /var/svn/hooks
   svn up /var/svn/conf
   ```

1. Add `post-commit` to subversion, but don't forget to do this:

   Give it the executable property, or otherwise it won't be executed.

   Whatever text editor you are using, the line ending has to be LF. In Windows CR+LF is the standard, so you might have to convert it. I use the [Scite editor](http://www.scintilla.org/SciTE.html) which can do this quite easily.

1. Now you can try to bootstrap the whole process. On your repository server check out the configuration using the local access method, e.g. execute something like this:

   ```bash 
   svn co /var/svn/admin/subversion
   ```

   Backup your original `conf` and `hooks` directory from the repository, and move over the checked out directories.


1. Give all your files the correct permissions, e.g. if you usually use the web access change it to apache:
 
   ```bash 
   chown -Rvf apache:apache conf hooks
   ```

   Be aware that when you commit something using the local access method, the owner any created files will be your local user and not apache. So if you did this you should execute `chown -Rvf apache:apache *` to correct the whole repository.


1. Now you should be able to check out your subversion configuration, and have it automatically updated on commit. The first thing you might want to try is to restrict access to the admin directory to only the subversion administrators, and see if the configuration has updated on the server. If that was successful, you are all clear!


This works perfectly for Subversion 1.1.4. If you have any further questions, please post them!
