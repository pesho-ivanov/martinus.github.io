---
author: martin.ankerl@gmail.com
comments: true
date: 2008-12-22 21:53:59+00:00
layout: post
slug: amazing-caching-proxy-in-java
title: Amazing Caching Proxy in Java
wordpress_id: 184
categories:
- programming
---

## Use Case

Imagine you have some Java code that does lots and lots of computation. All the time intensive calculations is performed by the class `SlowCalculator` which implements the interface `Calculator`:

```java
public static interface Calculator {
    public String calculate(int a, String b);
}

public static void main(String[] args) {
    Calculator c = new SlowCalculator();
    // call c.calculate() a lot of times here...
}
```

You notice that `calculate()` is often called with the same parameters which lead to the exact same result (`SlowCalculator` is stateless). This means it is possible to cache values so there's no need to recompute. Using the generic CachingProxy&trade; described below, you can create a cached proxy for any class with just one single line of code:

```java
// ...

public static void main(String[] args) {
    Calculator c = new SlowCalculator();
    c = CachedProxy.create(Calculator.class, c);
    // call c.calculate() a lot of times here...
}
```

That's it, and the application is blazingly fast again.

**UPDATE**: Support for `null` values, transparently handles exceptions, better hash, nullpointer-bugfix.

**UPDATE**: Here is an article "[Memoization in Java Using Dynamic Proxy Classes](http://www.onjava.com/pub/a/onjava/2003/08/20/memoization.html)" that does (almost) exactly the same as this code.

## How To Do This

All this sounds nice, but can you do this in java? Turns out you can and it is not that difficult either. The feature that makes it all possible is [Dynamic Proxy](http://java.sun.com/j2se/1.4.2/docs/guide/reflection/proxy.html). With it you can implement interfaces *at runtime*. You take an interface, create a proxy for it with `Proxy.newProxyInstance(...)`, supply an `InvocationHandler` that implements the `invoke()` method, and you are done.

The code for the `CachedProxy.create()` method is this:
```java
/**
 * Creates an intermediate proxy object that uses cached results if
 * available, otherwise calls the given code.
 *
 * @param <t>
 *            Type of the class.
 * @param cl
 *            The interface for which the proxy should be created.
 * @param code
 *            The actual calculation code that should be cached.
 * @return The proxy.
 */
@SuppressWarnings("unchecked")
public static <t> T create(final Class<t> cl, final T code) {
  // create the cache
  final Map<args, Object> argsToOutput = new HashMap<args, Object>();

  // proxy for the interface T
  return (T) Proxy.newProxyInstance(cl.getClassLoader(), new Class<?>[] { cl }, new InvocationHandler() {

    @Override
    public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
      final Args input = new Args(method, args);
      Object result = argsToOutput.get(input);
      // check containsKey to support null values
      if (result == null && !argsToOutput.containsKey(input)) {
        // make sure exceptions are handled transparently
        try {
          result = method.invoke(code, args);
          argsToOutput.put(input, result);
        } catch (InvocationTargetException e) {
          throw e.getTargetException();
        }
      }
      return result;
    }
  });
}
```

1. First I create a `HashMap` that is the cache for the return values. I have written a class `Args` (omitted here) that is as the key to map from the method and the parameters to the cached output.
1. A Proxy is created for the interface `cl`, with an InvocationHandler that does all the magic.
1. The magic is actually very simple: If there is no cached result already available (line 25), perform the computation (line 26) and store the result in the map, then return the result.


## Download
You can get the full code at my github repository:
 
[CachedProxy](http://github.com/martinus/java-playground/tree/master/src/java/com/ankerl/proxy/CachedProxy.java)

## Benchmarks

In my benchmark I can run about 8 million calls per secons via the cached proxy. That's not too bad, given all the additional overhead with reflection and the HashMap.

Do you know of any way to improve this? Any ideas or suggestions are welcome!