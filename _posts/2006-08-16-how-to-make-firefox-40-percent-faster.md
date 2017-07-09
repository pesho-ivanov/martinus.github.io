---
author: martin.ankerl@gmail.com
comments: true
date: 2006-08-16 18:37:11+00:00
layout: post
link: http://martin.ankerl.com/2006/08/16/how-to-make-firefox-40-percent-faster/
slug: how-to-make-firefox-40-percent-faster
title: How To Make Firefox Over 40% Faster
wordpress_id: 73
categories:
- linux
---

If you use Linux on a Laptop, chances are high that you can dramatically improve the responsiveness of all your GUI applications. This tip will work for you if you:

* Use a frequency scaling application like [powernowd](http://www.deater.net/john/powernowd.html) ([Ubuntu](http://www.ubuntu.com/) does this by default), [cpudynd](http://mnm.uib.es/gallir/cpudyn/), or [cpufreqd](http://cpufreqd.sourceforge.net/).
* Have Kernel 2.6.9 or better.

In short, the trick is to _disable powernowd and use the [ondemand](http://linux.inet.hr/ols2006_the_ondemand_governor.html) governor instead_. How to do this in Ubuntu comes later, let me first show you what this change gets you. In short, you get maximum performance _and_ a longer battery life.

## Benchmark

I have a laptop with a Pentium-M that allows frequencies between 600MHz and 1500MHz. Running on 600MHz gives a long battery lifetime and a quiet notebook, on 1500MHz I get good performance. The trick is to switch between the frequencies so that you can have the best of both sides.

This are the rendering times of the [CNN](http://www.cnn.com/) site, with different CPU frequency scaling settings. Each measurement was performed 4 times, and the average is show.

![ondemand](/img/2006/08/ondemand.png)

Here is an explanation for the graphs:

1. **powersave (600MHz)**: Since kernel 2.6.9 there are CPU governor in the kernel that allow different frequency scaling behaviour. In the first benchmark the CPU was set to "powersave" which means that only the lowest possible frequency is used. With 600MHz it takes 9.38 seconds processor time to render CNN.com.

1. **performance (1500MHz)**: The governor "performance" always keeps the CPU at the maximum setting, 3.82 seconds render time is the fastest I can possibly get from of my machine.

1. **powernowd -q -m 3**: This one is interesting, here the governor "userspace" was used which means the frequency can be controlled by a userspace application, which in this case was powernowd. The load time is somewhere inbetween the previous two benchmarks, which means that powernowd correctly recognizes that there is a high CPU demand, and switches to the highest frequency. This detection takes quite a bit of time so precious _1.73 seconds are lost_ compared to what is truly possible with this computer! This is very bad.

1. **ondemand**: Finally the glorious "ondemand" governor. This governor switches to the highest frequency if processor usage goes above 80%, and switches back to the lowest frequency where the CPU has less than 80% utilization as soon as possible.


This is not much different from powernowd, except that it can sample the CPU utilization 25 times per seconds which means it can react in mere milliseconds on a change. Since the governors are kernel modules this does not have the high overhead that a userspace tools like powernowd would have with such a sampling rate. The result speaks for itself, the ondemand governor provides almost exactly the same performance as with constantly running at maximum speed. Not only does it have almost no performance difference to the maximum settings, it is also very good for the battery because it is equaly fast when switching back to lower frequencies.

For more background information about the algorithm behind the ondemand governor have a look at the paper [The Ondemand Governor](http://linux.inet.hr/files/ols2006/pallipadi-reprint.pdf).


## How To Benchmark For Yourself

You do not need anything special for this benchmark, this is how I have done it:

1. Install the [Fasterfox](http://fasterfox.mozdev.org/) extension, this has a page load timer
1. Browse to any website (I used [CNN](http://www.cnn.com/) since it is a quite complicated site that takes a while to render).
1. Save the website (File > Save As).
1. Now enter the name of your saved file into the address bar (e.g. `/home/martinus/CNN.html` for me). It is important to use the saved file, so that the load measurement contains the raw rendering performance and not how fast you can download
1. Wait about 5 seconds, so that you can be sure whatever you use for frequency scaling has switched to the lowest MHz setting.
1. Press Enter.
1. Have a look at the timer (lower right corner of firefox) when the page has finished loading.


## How To Use Ondemand Governor In Ubuntu Dapper

This is quite simple. See [this](http://dietrich.wordpress.com/2006/06/22/ubuntu-ondemand-cpu-frequency/) For a longer description.

1. Uninstall powernowd
   ```bash
   sudo apt-get remove powernowd
   ```
1. Enable speed stepping (I have a centrino, you might need a different module)
   ```bash
   sudo modprobe speedstep-centrino
   ```
3. Enable the "ondemand" governor
   ```bash   
   sudo modprobe cpufreq-ondemand
   ```
1. Switch to the ondemand governor (default is performance). As someone in the comments has pointed out sudo does not work here, so use this:
   ```bash
   sudo bash
   echo "ondemand" > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
   exit
   ```


For permanent settings:

1. Open `/etc/modules` and add the following lines (if you do not have a centrino chipset you need to exchange speedstep-centrio with something else)
   ```bash
   speedstep-centrino
   cpufreq-ondemand
   ```
1. Install sysfsutils with
   ```bash
   sudo apt-get install sysfsutils
   ```
1. Open `/etc/sysfs.conf` and add the line
   ```
   devices/system/cpu/cpu0/cpufreq/scaling_governor=ondemand
   ```
