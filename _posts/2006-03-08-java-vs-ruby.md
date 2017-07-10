---
author: martin.ankerl@gmail.com
comments: true
date: 2006-03-08 11:24:43+00:00
layout: post
slug: java-vs-ruby
title: Java vs. Ruby
wordpress_id: 54
categories:
- programming
---

Here are two example solutions for the problem

> Write a threaded server that offers the time.

The first example is written in [Java](http://java.sun.com/), the second in [Ruby](http://www.ruby-lang.org/en/) (taken from the excellent book ["The Ruby Way"](http://hypermetrics.com/rubyhacker/coralbook/)). Both versions are implemented to be very simple. Please judge for yourself:

# Java

31 lines of code:

```java
package at.martinus;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

public class TimeServer {
  private static class TellTime extends Thread {
    private Socket soc;

    public TellTime(Socket soc) {
      super();
      this.soc = soc;
    }

    public void run() {
      try {
        this.soc.getOutputStream().write(new Date().toString().getBytes());
      } catch (Exception e) {
      } finally {
        try {
          this.soc.close();
        } catch (IOException e1) {
        }
      }
    }
  }

  public static void main(String args[]) throws Exception {
    ServerSocket server = new ServerSocket(12345);
    while (true) {
      new TellTime(server.accept()).start();
    }
  }
}
```

Starting it:

    
```bash
javac at/martinus/TimeServer.java
java at.martinus.TimeServer -cp .
```

# Ruby

8 lines of codes:

```ruby
require "socket"

server = TCPServer.new(12345)

while (session = server.accept)
  Thread.new(session) do |my_session|
    my_session.puts Time.new
    my_session.close
  end
end
```

Starting it:

    
```bash
ruby timeserver.rb
```

Taken from [my comment](http://groups.google.com/group/comp.lang.ruby/msg/4eca1a847fbd3fea) at `comp.lang.ruby`.
