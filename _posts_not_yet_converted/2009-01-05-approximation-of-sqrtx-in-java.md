---
author: martin.ankerl@gmail.com
comments: true
date: 2009-01-05 11:51:50+00:00
layout: post
slug: approximation-of-sqrtx-in-java
title: Approximation of sqrt(x) in Java
wordpress_id: 195
categories:
- programming
---

Yesterday I have played a bit with reinventing a fast approximation for sqrt() in Java. This might be handy with J2ME. Wikipedia has a nice article about [Approximations that depend on IEEE representation](http://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Approximations_that_depend_on_IEEE_representation).  My version works, and on my Intel Dual Core with an average error of 1.57%, maximum error 4.02% it is 3.5 times faster than the original sqrt. In addition, it is very simple to improve the precision to 0.000161% average error and 0.000775% maximum error which is then 1.56 times faster than Math.sqrt().



## Sourcecode


I use floating point tricks based on my [pow() approximation](http://martin.ankerl.com/2007/10/04/optimized-pow-approximation-for-java-and-c-c/). Basically I just took the pow() formula and for a^b I substitued b with 0.5, then simplified this as much as possible. As it turns out the result is very simple and short. This initial approximation can be easily made more precise with [Newton's method](http://en.wikipedia.org/wiki/Newton%27s_method):


    
    public static double sqrt(final double a) {
        final long x = Double.doubleToLongBits(a) >> 32;
        double y = Double.longBitsToDouble((x + 1072632448) << 31);
    
        // repeat the following line for more precision
        //y = (y + a / y) * 0.5;
        return y;
    }



Here is a comparison of the performance and accurancy versus the number of repetitions:

<table width="100%" >
<tr >RepetitionsAverage  
errorMaximum  
errorSpeedup</tr>
<tr >
<td >0
</td>
<td >1.57%
</td>
<td >4.02%
</td>
<td >3.53
</td></tr>
<tr >
<td >1
</td>
<td >0.000161%
</td>
<td >0.000775%
</td>
<td >1.56
</td></tr>
<tr >
<td >2
</td>
<td >2.51e-8%
</td>
<td >3.00e-7
</td>
<td >0.838
</td></tr>
</table>

With 2 repetitions, the trouble is not worth the effort, as the approximation is already slower than the original Math.sqrt() which is more precise.
