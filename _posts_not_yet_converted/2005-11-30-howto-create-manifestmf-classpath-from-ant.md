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


	
    
    Class-Path: lib/log4j.jar lib/commons.jar


	

In a project I work on, we keep all our dependencies in a lib directory, where we add and remove libraries from time to time, therefore it would be nice if the above text can be generated automatically. Fortunately, this is possible using just [Ant](http://ant.apache.org/). Unfortunately, this is rather cumbersome. (If you want something more powerful and simpler to use, have a look at [Rake](http://rake.rubyforge.org/)).


	

In a nutshell, this is how I did it:


<!-- more -->
	


	
  1. First, let's define some properties:

    
    
    <property name="jar.name" value="ourjarfile.jar"></property>
    
    
    <property name="dist.home" value="dist"></property>
    
    
    <property name="build.home" value="target"></property>
    
    
    <property name="lib.home" value="lib"></property>
    




	
  2. Now to the fun part, create a nice .jar file. This generates the MANIFEST.MF but first generates a property libs.project that contains all .jar files, sperated with space. If you later look at the generated MANIFEST.MF you will notice that the paths are wrapped every 72 character, even in the middle of the word. Although this looks like an error, it works correctly.

    
    <target depends="compile" name="jar" description="Create jar and MANIFEST.MF">
    
      
      <pathconvert property="libs.project" pathsep=" ">
        <mapper>
          <chainedmapper>
    
            
            <flattenmapper></flattenmapper>
    
            
            <globmapper to="lib/*" from="*"></globmapper>
          </chainedmapper>
        </mapper>
    
        <path>
    
          
          <fileset dir="${lib.home}">
            <include name="**/*.jar"></include>
          </fileset>
        </path>
      </pathconvert>
    
      
      <jar basedir="${build.home}/classes" jarfile="${build.home}/${jar.name}">
    
        
        <manifest>
          <attribute name="Built-By" value="${user.name}"></attribute>
          <attribute name="Main-Class" value="my.path.to.the.main.Application"></attribute>
          <section name="common">
            <attribute name="Specification-Title" value="${component.name}"></attribute>
            <attribute name="Specification-Version" value="${component.version}"></attribute>
            <attribute name="Specification-Vendor" value="${component.vendor}"></attribute>
            <attribute name="Implementation-Title" value="${component.name}"></attribute>
            <attribute name="Implementation-Version" value="${component.version} ${TODAY}"></attribute>
            <attribute name="Implementation-Vendor" value="${component.vendor}"></attribute>
          </section>
    
          
          <attribute name="Class-Path" value="${libs.project}"></attribute>
        </manifest>
      </jar>
    </target>
    




	
  3. Finally we need to create a distribution by copying all .jar files into dist/lib while using a flat directory structure:

    
    <target depends="jar" name="dist" description="Create binary distribution">
      <delete dir="${dist.home}"></delete>
    
      
      <mkdir dir="${dist.home}/lib"></mkdir>
    
      <copy todir="${dist.home}" file="${build.home}/${jar.name}"></copy>
    
      <copy filtering="off" todir="${dist.home}/lib">
    
        
        <flattenmapper></flattenmapper>
        <fileset dir="${lib.home}" includes="**/*.jar"></fileset>
      </copy>
    </target>




	
	

I use Ant 1.6.2, and this works perfectly for me. Have fun!

