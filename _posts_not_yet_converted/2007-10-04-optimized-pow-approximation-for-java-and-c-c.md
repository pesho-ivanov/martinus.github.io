---
author: martin.ankerl@gmail.com
comments: true
date: 2007-10-04 22:48:08+00:00
layout: post
link: http://martin.ankerl.com/2007/10/04/optimized-pow-approximation-for-java-and-c-c/
slug: optimized-pow-approximation-for-java-and-c-c
title: Optimized pow() approximation for Java, C / C++, and C#
wordpress_id: 96
categories:
- linux
- programming
tags:
- C++
- floating point
- java
- optimization
- programming
---

I have already written about approximations of e^x, log(x) and pow(a, b) in my post [Optimized Exponential Functions for Java](http://martin.ankerl.com/2007/02/11/optimized-exponential-functions-for-java/). Now I have more :-) In particular, the pow() function is now even faster, simpler, and more accurate. Without further ado, I proudly give you the brand new approximation:



# Approximation of pow() in Java



    
    public static double pow(final double a, final double b) {
        final int x = (int) (Double.doubleToLongBits(a) >> 32);
        final int y = (int) (b * (x - 1072632447) + 1072632447);
        return Double.longBitsToDouble(((long) y) << 32);
    }


This is really very compact. The calculation only requires 2 shifts, 1 mul, 2 add, and 2 register operations. That's it! In my tests it usually within an error margin of 5% to 12%, in extreme cases sometimes up to 25%. A careful analysis is left as an exercise for the reader. This is very usable for in e.g. [metaheuristics](http://en.wikipedia.org/wiki/Metaheuristic) or [neural nets](http://en.wikipedia.org/wiki/Artificial_neural_network).



## UPDATE, December 10, 2011


I just managed to make the above code about 30% faster than the one above on my machine. The error is a tiny fraction different (not better or worse).

    
    public static double pow(final double a, final double b) {
    	final long tmp = Double.doubleToLongBits(a);
        final long tmp2 = (long)(b * (tmp - 4606921280493453312L)) + 4606921280493453312L;
        return Double.longBitsToDouble(tmp2);
    }


This new approximation is about **23 times** as fast as Math.pow() on my machine (Intel Core2 Quad, Q9550, Java 1.7.0_01-b08, 64-Bit Server VM). Unfortunately, microbenchmarks are difficult to do in Java, so your mileage may vary. You can download the benchmark [PowBench.java](/files/PowBench.java) and have a look, I have tried to prevent overoptimization, and substract the overhead introduced due to this preventation.



# Approximation of pow() in C and C++




## UPDATE, January 25, 2012


The code below is updated with using union, you do not need -fno-strict-aliasing any more for compiling. Also, here is a [more precise version of the approximation](http://martin.ankerl.com/2012/01/25/optimized-approximative-pow-in-c-and-cpp/).


    
    double fastPow(double a, double b) {
      union {
        double d;
        int x[2];
      } u = { a };
      u.x[1] = (int)(b * (u.x[1] - 1072632447) + 1072632447);
      u.x[0] = 0;
      return u.d;
    }



Compiled on my Pentium-M with gcc 4.1.2: 
    
    gcc -O3 -march=pentium-m -fomit-frame-pointer


This version is **7.8 times** faster than pow() from the standard library.





# Approximation of pow() in C#


Jason Jung has posted a port of the this code to C#:

    
    public static double PowerA(double a, double b) {
      int tmp = (int)(BitConverter.DoubleToInt64Bits(a) >> 32);
      int tmp2 = (int)(b * (tmp - 1072632447) + 1072632447);
      return BitConverter.Int64BitsToDouble(((long)tmp2) << 32);
    }





# How the Approximation was Developed


It is quite impossible to understand what is going on in this function, it just magically works. To shine a bit more light on it, here is a detailed description how I have developed this.



## Approximation of e^x


As described [here](http://martin.ankerl.com/2007/02/11/optimized-exponential-functions-for-java/), the paper "[A Fast, Compact Approximation of the Exponential Function](http://citeseer.ist.psu.edu/schraudolph98fast.html)" develops a C macro that does a good job at exploiting the IEEE 754 floating-point representation to calculate e^x. This macro can be transformed into Java code straightforward, which looks like this:


    
    public static double exp(double val) {
        final long tmp = (long) (1512775 * val + (1072693248 - 60801));
        return Double.longBitsToDouble(tmp << 32);
    }





## Use Exponential Functions for a^b


Thanks to the power of math, we know that a^b can be transformed like this:




  1. Take exponential 
    
    a^b = e^(ln(a^b))



  2. Extract b 
    
    a^b = e^(ln(a)*b)




Now we have expressed the pow calculation with e^x and ln(x). We already have the e^x approximation, but no good ln(x). The [old approximation](http://martin.ankerl.com/2007/02/11/optimized-exponential-functions-for-java/) is very bad, so we need a better one. So what now?



## Approximation of ln(x)


Here comes the big trick: Rember that we have the nice e^x approximation? Well, ln(x) is exactly the inverse function! That means we just need to transform the above approximation so that the output of e^x is transformed back into the original input.

That's not too difficult. Have a look at the above code, we now take the output and move backwards to undo the calculation. First reverse the shift:

    
    final double tmp = (Double.doubleToLongBits(val) >> 32);


Now solve the equation 
    
    tmp = (1512775 * val + (1072693248 - 60801))

for val:




  1. The original formula 
    
    tmp = (1512775 * val + (1072693248 - 60801))



  2. Perform subtraction 
    
    tmp = 1512775 * val + 1072632447



  3. Bring value to other side 
    
    tmp - 1072632447 = 1512775 * val



  4. Divide by factor 
    
    (tmp - 1072632447) / 1512775 = val



  5. Finally, val on the left side 
    
    val = (tmp - 1072632447) / 1512775




Voíla, now we have a nice approximation of ln(x):

    
    public double ln(double val) {
        final double x = (Double.doubleToLongBits(val) >> 32);
        return (x - 1072632447) / 1512775;
    }





## Combine Both Approximations


Finally we can combine the two approximations into e^(ln(a) * b):

    
    public static double pow1(final double a, final double b) {
        // calculate ln(a)
        final double x = (Double.doubleToLongBits(a) >> 32);
        final double ln_a = (x - 1072632447) / 1512775;
    
        // ln(a) * b
        final double tmp1 = ln_a * b;
    
        // e^(ln(a) * b)
        final long tmp2 = (long) (1512775 * tmp1 + (1072693248 - 60801));
        return Double.longBitsToDouble(tmp2 << 32);
    }



Between the two shifts, we can simply insert the tmp1 calculation into the tmp2 calculation to get

    
    public static double pow2(final double a, final double b) {
        final double x = (Double.doubleToLongBits(a) >> 32);
        final long tmp2 = (long) (1512775 * (x - 1072632447) / 1512775 * b + (1072693248 - 60801));
        return Double.longBitsToDouble(tmp2 << 32);
    }



Now simplify tmp2 calculation:




  1. The original formula 
    
    tmp2 = (1512775 * (x - 1072632447) / 1512775 * b + (1072693248 - 60801))



  2. We can drop the factor 1512775
    
    tmp2 = (x - 1072632447) * b + (1072693248 - 60801)



  3. And finally, calculate the substraction 
    
    tmp2 = b * (x - 1072632447) + 1072632447






## The Result


That's it! Add some casts, and the complete function is the same as above.

    
    public static double pow(final double a, final double b) {
        final int tmp = (int) (Double.doubleToLongBits(a) >> 32);
        final int tmp2 = (int) (b * (tmp - 1072632447) + 1072632447);
        return Double.longBitsToDouble(((long) tmp2) << 32);
    }



This concludes my little tutorial on microoptimization of the pow() function. If you have come this far, I congratulate your presistence :-)


**UPDATE** Recently there several other approximative pow calculation methods have been developed, here are some others that I have found through [reddit](http://www.reddit.com/r/programming/comments/8kftl/fast_pow_approximation_in_java_and_c/):




	
  * [Fast pow() With Adjustable Accuracy](http://www.hxa.name/articles/content/fast-pow-adjustable_hxa7241_2007.html) -- This looks quite a bit more sophisticated and precise than my approximation. Written in C and for float values. A Java port should not be too difficult.



	
  * [Fast SSE2 pow: tables or polynomials?](http://jrfonseca.blogspot.com/2008/09/fast-sse2-pow-tables-or-polynomials.html) -- Uses [SSE ](http://en.wikipedia.org/wiki/Streaming_SIMD_Extensions) operation and seems to be a bit faster than the table approach from the link above with the potential to scale better when due to less cache usage.





Please post what you think about this!
