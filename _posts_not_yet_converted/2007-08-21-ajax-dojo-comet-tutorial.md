---
author: martin.ankerl@gmail.com
comments: true
date: 2007-08-21 12:41:22+00:00
layout: post
link: http://martin.ankerl.com/2007/08/21/ajax-dojo-comet-tutorial/
slug: ajax-dojo-comet-tutorial
title: Ajax Dojo Comet Tutorial
wordpress_id: 92
categories:
- programming
tags:
- ajax
- comet
- dojo
- howto
- programming
- tutorial
---

**EDIT**: This tutorial is for an old version of dojo / comet, and it will not work in a recent version!

Markus Holzmann, an intern at [Profactor](http://www.profactor.at/) of my fellow colleague [Philipp Hartl](http://leanaustria.net/), had the opportunity to experiment with [Ajax](http://en.wikipedia.org/wiki/Ajax_(programming)) during his job. He wrote a tutorial about how to push events from the server to the client. For example, display popup messages on all browsers at the same time (see screencast in [full resolution here](/files/hello_comet.html)):

[  
    
    
  
](/files/hello_comet.html)

Read on how Markus did this:

<!-- more -->



# Cometd Hello World





I've read Chris Bucchere's [Say Hello World to Comet](http://thebdgway.blogspot.com/2006/11/say-hello-world-to-comet.html) and built an application based on this using a more current version of [Jetty](http://www.mortbay.org/) (version [6.1.5](http://dist.codehaus.org/jetty/jetty-6.1.5/)) which I embedded into a [Tomcat](http://tomcat.apache.org/) v5.5 Server. For the developing I used [Eclipse](http://www.eclipse.org/) 3.2.





# Start your Engines


At first you have to get the server running. As I mentioned I embedded Jetty into a Tomcat server. Therefore you have configure the libraries:







  1. Add the packages org.mortbay.cometd and dojox.cometd to your source folder and delete the client package in the org.mortbay.cometd package.


  2. Add jetty-util-6.1.5.jar, jetty-6.1.5.jar and servlet-api-2.5-6.1.5.jar to your build path.


  3. Copy the jetty-util-6.1.5.jar file into the /lib folder in the WEB-INF directory.


Replace the existing servlets in your web.xml - file in the WEB-INF - folder with the following servlets:


    
    <servlet>
      <servlet-name>cometd</servlet-name>
      <servlet-class>org.mortbay.cometd.continuation.ContinuationCometdServlet</servlet-class>
      <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
      <servlet-name>cometd</servlet-name>
      <url-pattern>/cometd/*</url-pattern>
     </servlet-mapping>
    


For the project I used the [dojo toolkit](http://dojotoolkit.org/) (version 0.4.3) which has an integrated [COMETd](http://www.cometd.com/) class that makes it easy to build comet projects. [Download it](http://download.dojotoolkit.org/release-0.4.3/dojo-0.4.3-ajax.tar.gz) and add it to your WebContent folder.



When you've done all this, the hardest piece of work for this program is already done.



# Hack the Code


Now you can implement the code for the client side: You need a HTML file with a button on it. The code for this looks like this ([download](/files/hello_comet_test.html)):

    
    <html>
      <head>
        <script src="../dojo.js" type="text/javascript"></script>
        <script type="text/javascript">
          dojo.require("dojo.io.cometd");
    
          cometd.init({}, "cometd");
    
          cometd.subscribe("/hello/world", false, "publishHandler");
    
          publishHandler = function(msg) {
            alert(msg.data.test);
          }
        </script>
      </head>
      <body>
        <input type="button" value="Click Me!" onclick="<b>cometd.publish('/hello/world', { test: 'hello world' } )</b>">
      </body>
    </html>


Line by line, the above bold code works like this:




  1. In the line 
    
    <script src="../dojo.js" type="text/javascript"></script>

you integrate the dojo toolkit into the project.

  2. To activate the cometd class of dojo: 
    
    dojo.require("dojo.io.cometd");



  3. Connect the server with the client: 
    
    cometd.init({}, "cometd");



  4. Here we say what to do when there is a subscribe event: 
    
    cometd.subscribe("/hello/world", false, "publishHandler");



  5. Last but not least, the publishHandler function serves as the callback function, which uses alert to show a simple message box: 
    
    publishHandler = function(msg) {
      alert(msg.data.test);
    }






# Give it a Try


When you load the HTML file now, you can click on the button and an alert box saying _hello world_ will appear:



![](/files/helloworld.png)



The reason for this is that when you click the code 
    
    cometd.publish('/hello/world', { test: 'hello world' } )

is executed which publishes a text on the channel with the id /hello/world.



The funny thing is that this is able to run on any number of browsers. Everytime when a client clicks the button, on _all_ browsers that view this page the alert box is shown. (See screencast above).



# Pushing Data from Server to Client


You can also add serverside code to trigger an event. I wrote a JSP file with the following code:

    
    <%@page import="java.util.*"%>
    <%@page import="dojox.cometd.*" %>
    <%
    Bayeux b = (Bayeux)getServletContext().getAttribute(Bayeux.DOJOX_COMETD_BAYEUX);
    Channel c = b.getChannel("/hello/world",false);
    
    Map<string,object> message = new HashMap<string,object>();
    message.put("test", "jsp: hello world");
    
    c.publish(b.newClient("server_user",null),message, "new server message");
    %>



When this page is loaded, an alert popup appears at the page saying _jsp: hello world_.

That's it. Happy hacking!
