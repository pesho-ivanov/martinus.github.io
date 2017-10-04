---
author: martin.ankerl@gmail.com
comments: true
date: 2017-05-09 06:20:30+00:00
layout: post
slug: essential-linux-dev-stuff
title: Essential Linux Dev Stuff
wordpress_id: 1727
categories:
- linux
bigimg: /img/2017/05/glances-1.png
---

I've recently started developing more in Linux, here is a collection of tools, tips and tricks to get the most out of the box. I'll expand this list from time to time.

## Appearance

### Terminal &amp; Editor font: Hack
Here is a test pattern I am using to evaluate fonts:

```
o0O s5S z2Z !|l1Iij {([|})] .,;: ``''"" 
a@#* vVuUwW <>;^°=-~ öÖüÜäÄßµ \/\/ 
the quick brown fox jumps over the lazy dog
THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
0123456789 &-+@ for (int i=0; i<j; ++i) { }
```
This is how the pattern looks like with [Hack](https://github.com/chrissimpkins/Hack), my favourite programming font:

![font test pattern](/img/2017/05/testpattern.png)

All characters are very distinguishable, e.g. 0 and O, 1 and l. Subpixel hinting is also excellent.


### colormake

Simple wrapper around make to colorize its output.

```bash
sudo apt install colormake
```

### redshift

Install `redshift-gtk`, which is similar to [f.lux](https://justgetflux.com/) but is more robust on my graphics card. I use this config for redshift (geoloc provider has problems). 

In file `~/.config/redshift.conf`:

```ini
; Global settings
[redshift]
location-provider=manual
 
; Linz, Austria
[manual]
lat=48.306940
lon=14.285830
```

## Tools

### Terminator

Multi-window terminal with lots of features.

```bash
sudo apt install terminator
```

### ripgrep

Extremely fast grep tool, similar to [ack](http://beyondgrep.com/) but much faster, even faster than [silver searcher](https://github.com/ggreer/the_silver_searcher). It searches through my 48GB subversion folder in 1 second. Also available for Windows! See [here for installation instructions](https://github.com/BurntSushi/ripgrep).

I've also added some aliases in `~/.bash_aliases`:

```bash
# only sarch for cpp files, smart case handling.
alias rgc='rg -tcpp -S'

# only cpp, and only in test subfolders
alias rgct='rg -tcpp -g "*/test/cpp/**/*" -S'

# only cpp, everything but test subfolders
alias rgcnt='rg -tcpp -g \!"*/test/cpp/**/*" -S'
```

### geany

Replacement for `gedit`, for basic editing tasks. It's not excellent but usually does the job. I'm not a vim/emacs guy.

### Visual Studio Code

Nice and highly configurable editor, also great in Linux. Just open a directory and you are ready to go. [Get it here](https://code.visualstudio.com). Essential extensions are:

* [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides) - An extension for more guide lines
* [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons) - Icons for Visual Studio Code
* [Dracula Syntax Theme](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) - A dark theme for many editors, shells, and more.

There are many others, but these are the bare minimum I use.


### glances

[Glances](http://nicolargo.github.io/glances/) gives a fantastic overview of what's going on in the system. Using you can see at a glance if e.g. your memory, disk space, swap is running out. The version you'll get with `apt` is unfortunately quite outdate, so I am installing it with pip (see the homepage).

![glances](/img/2017/05/glances-1.png)


## Useful Time Savers

### Clear Terminal buffer

In `~/.bash_aliases`, put this:

```bash
alias cls='printf "\033c"'
```

While `Ctrl`+`L` just clears the screen, `cls` will now clear the whole buffer. Convenient for a large build job and you want to scroll up to find something without scrolling too far.

### Sleep Until

I use this ruby script to sleep until a given time. It's in ruby so I can also easily use it in Windows:

```ruby
#!/usr/bin/ruby

# sudo gem install chronic
require 'chronic'

exit(0) if ARGV.empty?

t = Chronic.parse(ARGV.join(" "))
now = Time.now
t += 60*60*24 if t < now
delaySeconds = t - now
puts "Sleeping #{delaySeconds.to_i} seconds until #{t.rfc2822}"
sleep(delaySeconds)
```

I use this to schedule builds, so that when I arrive at the office everything is already built with the latest version so I can start working right away.

```
$ sleepuntil monday && svn up && make -j4 build
Sleeping 71605 seconds until Tue, 6 Dec 2016 03:00:00 +0100
```

### bash prompt with runtime and errorcode

See my [Linux Bash Prompt](/2016/11/04/linux-bash-prompt/) post. It's awesome.

![bash prompt](/img/2016/11/Screenshot_2016-11-07_06-24-23.png)


## Optimizations

### ccache

Use ccache, and use it on an SSD disk. Here are my settings from `~/.ccache/ccache.conf`:

```ini
max_size = 16G
compression = true
compression_level = 1
```

I'm using this for a huge C++ project where I build debug, release both in 32bit and 64bit, so a large ccache helps. Using `compression_level` is only a very minor slowdown, but practically increases cache size by a factor of 3-5 or so.


### Use `tmpfs` for `/tmp`

Much faster compilation. Add this to `/etc/fstab`:
 
```
tmpfs	/tmp	tmpfs	mode=1777,nosuid,nodev	0	0
``` 

### Compressed RAM

Especially in virtual machines or low-end machines where memory is constrained, zram provides memory compression.

```bash
sudo apt install zram-config
``` 

Reboot your machine, and everything is well configured. For more information, see

* [zram: Compressed RAM based block devices](https://www.kernel.org/doc/Documentation/blockdev/zram.txt)
* [Transparent Memory Compression in Linux (2013)](https://events.linuxfoundation.org/sites/events/files/slides/tmc_sjennings_linuxcon2013.pdf)


## Disk Cleanup

### Remove libreoffice
 
```bash
sudo apt remove --purge libreoffice*
sudo apt clean
sudo apt autoremove
```

### Remove old Kernels 

```bash
sudo apt install byobu
sudo purge-old-kernels
``` 

Source: [How to Easily Remove Old Kernels in Ubuntu 16.04](http://ubuntuhandbook.org/index.php/2016/05/remove-old-kernels-ubuntu-16-04/)



## Virtualbox

### Dynamic Disk Size

Don't do it. It's much slower. If you have to, be aware of this:

### Enable TRIM support
<aside class="warning">
Don't do this. I've got file corruptions!
</aside>

This will shrink the `.vdi` file, even when it does not have a dynamic size.

1. In Windows host, list the available VMS. This gives me `LinuxMint180GB`.
   ```
   VBoxManage.exe" list vms
   ```   
1. In the Windows host, enable SSD and TRIM support for the image (see [here](http://blog.glehmann.net/2015/01/20/Shrinking-VirtualBox-vdi-files/)):
   ```
   VBoxManage storageattach LinuxMint180GB --storagectl "SATA" --port 0 --discard on --nonrotational on
   ```
1. In Linux guest, perform TRIM, you'll see the `.vdi` disk shrinking while this runs:
   ```
   sudo fstrim -va
   ```
1. Add a nightly task to crontab with `sudo crontab -e`, there add this line:
   ```
   @midnight fstrim -a
   ```


I also tried to mount the image with the `discard` option (see [here](https://wiki.ubuntuusers.de/SSD/TRIM/)), but it caused my Linux to hang so I disabled it again

### Mount shared folder

Add the user to the `vboxsf` group:

```bash
sudo usermod -G vboxsf -a martinus
```

Edit `/etc/fstab` e.g. like this:

```
Share_VB        /media/sf_Share_VB      vboxsf  defaults,noauto 0       0
```


### GNOME keyring Without Password Prompt

It's unfortunate when a scheduled `svn up` asks for password because it has not been entered for a while. To disable the password question, do this:

1. `sudo apt install seahorse`
1. Follow [this guide](http://askubuntu.com/a/875).


### Optimize Disk Scheduler: use `noop`

When using virtualbox, it's best to use the `noop` scheduler. See [this](https://access.redhat.com/solutions/5427). From [here](https://sites.google.com/site/easylinuxtipsproject/ssd):

1. `cat /sys/block/sda/queue/scheduler`
1. `sudo gedit /etc/default/grub`
1. Change the line 
   ```ini
   GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
   ```
   into
   ```ini
   GRUB_CMDLINE_LINUX_DEFAULT="elevator=noop quiet splash"
   ```
1. `sudo update-grub`
