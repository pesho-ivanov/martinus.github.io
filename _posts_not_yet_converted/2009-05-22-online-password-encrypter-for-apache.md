---
author: martin.ankerl@gmail.com
comments: true
date: 2009-05-22 21:33:35+00:00
layout: post
slug: online-password-encrypter-for-apache
title: Online Password Encrypter for Apache
wordpress_id: 213
categories:
- linux
- programming
---

Apache uses (among other hashes) SHA-1 keys for encryption in the .htpasswd. I administer a subversion server, and from time to time I have to add new external users to the system. This is usually rather cumbersome because there is no easy way to get to their encrypted password.

Thats why I have created [The Online Password Encrypter](/files/2009/05/pwd-encrypter.html). Here users can enter their desired username and password, and the encrypted key is automatically generated online, without transmitting anything to any server.

Here is an iframe of the file. [Click here for full screen](/files/2009/05/pwd-encrypter.html).



Your browser does not support iframes.




The [Online Password Encrypter](/files/2009/05/pwd-encrypter.html) is just one single HTML page, it does not depend on any other files. So it is easy to download it, modify and send it around. Feel free do whatever you want with it.

Have fun,
Martin
