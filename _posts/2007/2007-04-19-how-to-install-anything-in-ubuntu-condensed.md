---
author: martin.ankerl@gmail.com
comments: true
date: 2007-04-19 14:24:22+00:00
layout: post
slug: how-to-install-anything-in-ubuntu-condensed
title: How to Install Anything in Ubuntu Condensed
wordpress_id: 87
categories:
- linux
tags:
- howto
- install
- linux
- ubuntu
---

This is a very condensed excerpt of the excellent article [How to install ANYTHING in Ubuntu](http://amitech.50webs.com/installing/index.php.html).

## Search, install, remove available packages
preferred method

```bash
sudo aptitude search ABC
sudo aptitude install ABC
sudo aptitude remove ABC
```

## .deb
you have to take care of dependencies on your own

```bash
sudo dpkg -i ABC.deb
```

## .rpm
requires sudo aptitude install alien

```bash
sudo alien -i *.rpm
```

## .tar.gz
requires sudo aptitude install checkinstall

```bash
tar xzvf ABC.tar.gz
cd ABC
./configure
make
sudo checkinstall
```

## .package, .sh, .bin
Just download and execute
    
```bash
chmod +x ABC
./ABC
```    

## .exe
requires sudo aptitude install wine

```bash
wine ABC.exe
```