---
author: martin.ankerl@gmail.com
comments: true
date: 2006-01-25 04:33:46+00:00
layout: post
link: http://martin.ankerl.com/2006/01/25/software-design-principles/
slug: software-design-principles
title: Software Design Principles
wordpress_id: 51
categories:
- programming
---

I have tried to collect the most important principles of software development. At least I consider them extremely important, I am sure that other people think otherwise. Good software designs should follow these principles as much as possible. Follow the links to learn more about the principles:

	
  * [DRY](http://www.artima.com/intv/dry.html) Don't Repeat Yourself

  * [PoLS](http://en.wikipedia.org/wiki/Principle_of_least_surprise) Principle of Least Surprise

  * [DTSTTCPW](http://c2.com/cgi/wiki?DoTheSimplestThingThatCouldPossiblyWork) Do The Simplest Thing That Could Possibly Work
	
  * [YAGNI](http://www.artima.com/weblogs/viewpost.jsp?thread=36529) You Aren't Gonna Need It
	

## DRY

Goes beyond code duplication. It says that each kind of information that you have to represent should be represented exactly once, that includes that there should be only one way to represent one kind of information. For example when you have an application that uses a database and define the database schema in the database, then in the application, then in wrapper classes. That's a load of stuff that highly depends on each other, and a big source of failures due to inconsistencies.

## PoLS

Probably is the most often ignored principle. Developers always try to solve complex problem, and most of the time they are so in love with their solutions to the problems that they do not care about the people that have to use their code. An excellent example is most about everything done in Java. For example, let's try to save a picture as a jpg image with a compression quality of 80%. This is the Java way:

```java
// Find a jpeg writer
ImageWriter writer = null;
Iterator iter = ImageIO.getImageWritersByFormatName("jpg");
if (iter.hasNext()) {
    writer = (ImageWriter) iter.next();
}

// Prepare output file
ImageOutputStream ios = ImageIO.createImageOutputStream(f);
writer.setOutput(ios);

// Set the compression quality
ImageWriteParam iwparam = new MyImageWriteParam();
iwparam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
iwparam.setCompressionQuality(0.8);

// Write the image
writer.write(null, new IIOImage(img, null, null), iwparam);

// Cleanup
ios.flush();
writer.dispose();
ios.close();
```

One can immediately see that Java has a very flexible API that allows to do a lot of interesting stuff. But most of the time I do not want this complexity! This is how it is done if you try to follow the Principle of Least Surprise when designing your API, like [Ruby](http://www.ruby-lang.org/en/) tries to do:

```ruby  
image.write('output.jpg') do
  self.compression = Magick::JPEGCompression
  self.quality = 80
end
```

I bet you can see the difference. This is exactly why technologies like J2EE are so complex and unmaintainable, because they ignore the PoLS.


## DTSTTCPW

Do The Simplest Thing That Could Possibly Work. If you implement functionality, do it as simple as possible. The code will be very readable, short and therefore maintainable because you can understand it quickly. It will also be less buggy. So do not try to be smart by writing complex code when it is not needed. Try to be smart by writing the simplest code possible, wich can actually be a very difficult task.


## YAGNI

Says that you should never implement functionality if you do not need it _right now_. That would be premature design, in most cases you will never need the functionality because requirements change too quickly, or you just guessed wrong. The quickest and most fail-save code is the code that does not exist - so don't code it if you are not absolutely sure you need it.

Together DTSTTCPW and YAGNI are very similar to KISS (Keep It Simple, Stupid), if not the same. DTSTTCPW says you should keep it simple, YAGNI says you should keep it stupid. But I think it is better to have these both principles to make it clearer what they mean. Be aware that in both DTSTTCPW and YAGNI you have to be able to easily refactor your program, because you need to add functionality when it is needed, and not earlier. Therefore you should have a good regression suite that [buys you confidence to allow for quickly refactoring](http://www.clarkware.com/articles/JUnitPrimer.html#usage) your code.
