---
author: martin.ankerl@gmail.com
comments: true
date: 2005-09-22 17:22:03+00:00
layout: post
link: http://martin.ankerl.com/2005/09/22/secure-ssh-cvs-scp-without-password-prompt/
slug: secure-ssh-cvs-scp-without-password-prompt
title: Secure SSH, CVS, SCP without Password Prompt
wordpress_id: 28
categories:
- linux
---

For the old version of this homepage I have used [CVS](http://http://www.nongnu.org/cvs/) to update the websites. I have done this via SSH, which is pretty secure but has the annoying disadvantage of asking for a password for each operation. If you can trust the security of your client computer, there is a way to get rid of the password altogehter, without loosing security:

	
1. Suppose the domain name of your server is server, and your login name loginname.	
1. On the client, generate a public and private key.

   ```bash 
   ssh-keygen -C loginname@server -t dsa
   ```

   When asked for a password, simply press return. The private key is stored in `~/.ssh/id_dsa`, and the public key in `~/.ssh/id_dsa.pub`. **Never give the private key away!**

1. Copy the public file to the server with

   ```bash 
   scp ~/.ssh/id_dsa.pub loginname@server:~/
   ```

1. Login on the server with
	
   ```bash 
   ssh loginname@server
   ```

   append the copied file to `~/.ssh/authorized_keys` with

   ```bash 
   cat ~/id_dsa.pub >>~/.ssh/authorized_keys
   ```

1. If you want to enable this features on other servers, just repeat step 3 on each of the servers.


That's it! If you have done everything correctly, the next time you login via SSH or use CVS over SSH, you will not need to enter a password yet you have a secure connenction.

