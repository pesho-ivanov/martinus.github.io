---
author: martin.ankerl@gmail.com
comments: true
date: 2005-11-30 15:46:01+00:00
layout: post
link: http://martin.ankerl.com/2005/11/30/howto-create-manifestmf-classpath-from-ant/
slug: howto-create-manifestmf-classpath-from-ant
title: HOWTO Create MANIFEST.MF Classpath From Ant
wordpress_id: 38
categories:
- programming
---

**UPDATE** It seems this is at least partly outdated, have a look at [manifestclasspath](http://ant.apache.org/manual/CoreTasks/manifestclasspath.html).

It is possible to define .jar dependencies in the MANIFEST.MF of the main .jar file, it is just a comma seperated string which looks like this:
    
```
Class-Path: lib/log4j.jar lib/commons.jar
```

In a project I work on, we keep all our dependencies in a lib directory, where we add and remove libraries from time to time, therefore it would be nice if the above text can be generated automatically. Fortunately, this is possible using just [Ant](http://ant.apache.org/). Unfortunately, this is rather cumbersome. (If you want something more powerful and simpler to use, have a look at [Rake](http://rake.rubyforge.org/)).

In a nutshell, this is how I did it:
	
1. First, let's define some properties:

   ```xml   
   <!-- name of the output .jar file -->
   <property name="jar.name" value="ourjarfile.jar" />

   <!-- base directory for distribution target -->
   <property name="dist.home" value="dist" />

   <!-- base directory for compilation targets -->
   <property name="build.home" value="target" />

   <!-- The base directory for all libraries (jar) files -->
   <property name="lib.home" value="lib" />
   ```

1. Now to the fun part, create a nice `.jar` file. This generates the `MANIFEST.MF` but first generates a property `libs.project` that contains all `.jar` files, sperated with space. If you later look at the generated `MANIFEST.MF` you will notice that the paths are wrapped every 72 character, even in the middle of the word. Although this looks like an error, it works correctly.

   ```xml
   <target name="jar" depends="compile" description="Create jar and MANIFEST.MF">

     <!-- create a property containing all .jar files, prefix lib/, and seperated with a space -->
     <pathconvert property="libs.project" pathsep=" ">
       <mapper>
         <chainedmapper>

           <!-- remove absolute path -->
           <flattenmapper />

           <!-- add lib/ prefix -->
           <globmapper from="*" to="lib/*" />
         </chainedmapper>
       </mapper>

       <path>

         <!-- lib.home contains all jar files, in several subdirectories -->
         <fileset dir="${lib.home}">
           <include name="**/*.jar" />
         </fileset>
       </path>
     </pathconvert>

     <!-- create the jar -->
     <jar jarfile="${build.home}/${jar.name}" basedir="${build.home}/classes">

       <!-- define MANIFEST.MF -->
       <manifest>
         <attribute name="Built-By" value="${user.name}" />
         <attribute name="Main-Class" value="my.path.to.the.main.Application" />
         <section name="common">
           <attribute name="Specification-Title" value="${component.name}" />
           <attribute name="Specification-Version" value="${component.version}" />
           <attribute name="Specification-Vendor" value="${component.vendor}" />
           <attribute name="Implementation-Title" value="${component.name}" />
           <attribute name="Implementation-Version" value="${component.version} ${TODAY}" />
           <attribute name="Implementation-Vendor" value="${component.vendor}" />
         </section>

         <!-- finally, use the magically generated libs path -->
         <attribute name="Class-Path" value="${libs.project}" />
       </manifest>
     </jar>
   </target>
   ```

1. Finally we need to create a distribution by copying all .jar files into dist/lib while using a flat directory structure:

   ```xml
   <target name="dist" depends="jar" description="Create binary distribution">
     <delete dir="${dist.home}" />

     <!-- contains all library dependencies -->
     <mkdir dir="${dist.home}/lib" />

     <copy todir="${dist.home}" file="${build.home}/${jar.name}" />

     <copy todir="${dist.home}/lib" filtering="off">

       <!-- remove the directory hierarchy: lib contains no subdirectories -->
       <flattenmapper />
       <fileset dir="${lib.home}" includes="**/*.jar" />
     </copy>
   </target>
   ```

I use Ant 1.6.2, and this works perfectly for me. Have fun!

