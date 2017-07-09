---
author: martin.ankerl@gmail.com
comments: true
date: 2006-08-11 20:33:31+00:00
layout: post
link: http://martin.ankerl.com/2006/08/11/program-e-extract-any-archive/
slug: program-e-extract-any-archive
title: e - Extract Any Archive
wordpress_id: 71
categories:
- linux
- programming
---

## What?

With this little tool you can extract almost any archive in Linux so you do not need to remember which tool and what command lines are necessary.

## Why?

I got fed up with the sheer impossible number of compression formats out there. I am an avid linux command line user, but remembering 20 different commands with strange switches to get to the juicy content of a compressed files is too much for me.

Therefore I have just happily spent a few hours of my life to write the application `e` that identifies which extraction tool to call with what parameter in order to save me precious seconds of rereading forgotten manpages.

## Usage

This marvelous extraction tool works like this:

* Extract a zip file:
   ```bash
   e file.zip
   ```

* Extract a rar file:
   ```bash
   e file.rar
   ```

* Extract several archives, one after another:
   ```bash
   e a.tar.gz b.tar.bz2 c.cab d.deb e.rpm
   ```

* Extract every file from the current directory:
   ```bash
   e *
   ```

If possible, `e` identifies the file format by the content and not by the extension, so for most filetypes `e` can extract it no matter how you name it. It supports rar, zip, tar.gz, tar.bz2, cab, ace, 7zip, dep, rpm, lha, lzop, rzip, and some more; it is very easy to extend it to support other compression utilities.

I was also inspired by the ugliness of the tool [unp](http://www.debianhelp.co.uk/unp.htm) which tries to do exactly what `e` does. I did not like the implementation (written in Perl), and thought I can have the same features in a much simpler and more extensible way. The result is that `e` is just about 80 lines of code, where most of it is either comment or rules that define when to call what. If you know Ruby, [have a look at the code](/files/2006/08/e).



## Installation


For the impatient, installation on [Ubuntu](http://www.ubuntu.com/):

```bash
sudo apt-get install ruby
wget http://martin.ankerl.com/files/2006/08/e
chmod a+x e
sudo mv e /usr/local/bin
```

Step by step:

1. `e` is written in [Ruby](http://www.ruby-lang.org/en/), so you need to install this.
1. Download `e` from [here](/files/2006/08/e)
1. copy `e` into your `/usr/local/bin` directory
1. make it executable with `chmod +x /usr/local/bin/e`.


If you find an archive that `e` cannot extract and you know a working rule for it, please tell me and I will integrate it.

## Download

Get `e` [here](/files/2008/08/e).

## Requirements

Apart from Ruby, `e` uses the linux tool file to determine what kind of archive it is dealing with. This tool should be available on any proper Linux installation. Once `e` knows the archive type, the appropriate extraction tool is executed. You might need to install a missing tools if you do not have it already.

## ChangeLog

Here you can find the changes `e` has undergone over time.



### 25th June 2009
* Command for [NanoZip](http://www.nanozip.net/) added.  
* Extracting RPM now preserves the original file timestamps (thanks to Michael Gruys)

### 14th January 2009
* Support for [PowerISO](http://poweriso.com/) added.  
* When RAR extraction fails, broken files are not deleted any more.

### 24th February 2008
* Support for [FreeArc](http://freearc.sourceforge.net/) added, when the extension .arc is used.

### 8th January 2008
* Added support for extraction of self-extracting zip, thanks for [Samuel Jones](http://imnotpete.com/) for recognizing this. When `e` is called without parameters, it shows the release date and a copyright.

### 25th February 2007
* When extracting multiple archives and extraction fails, `e` now continues to extract the other files and prints an error message about all the files when it has finished.

### 28th December 2006
* In Ubuntu the [7z](http://www.7-zip.org/) executable is now called 7zr. Now `e` works with the executables 7z, 7za, and 7zr.

### 10th December 2006
* Added rules for ar, cpio, dar, uharc, and zzip. For uharc you need [wine](http://www.winehq.com/), and [uharc.exe](ftp://ftp.elf.stuba.sk/pub/pc/pack/uharc06b.zip) in your path.

### 14th August 2006
* Added comments, fixed a typo

### 12th August 2006
* ADD Extraction of  debian packages with ar if dpkg is not available  
* ADD support for [LZMA](http://martin.ankerl.org/2006/06/22/lzma-compression-in-linux/) tar archives (extension has to be .tar.lzma or .tlz)

### 11th August 2006
* First public release of e.
