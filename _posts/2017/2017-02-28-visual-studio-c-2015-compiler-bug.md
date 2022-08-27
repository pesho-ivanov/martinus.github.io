---
layout: post
title: Visual Studio C++ 2015 Compiler Bug
subtitle: Found a bug, it has been fixed.
cover-img: /img/2017/02/bug_flat.jpg
---

I think I've unfortunately found a compiler bug in Visual Studio 2015, all the way back to at least VS2010. Here is the code:

```cpp    
#include <iostream>
#include <stdint.h>

int main(int, char**) {
    for (uint32_t i = 1; i < 3; ++i) {
        uint32_t a = i * 0xfbd1e995;
        uint64_t b = a;

        std::cout << a << " 32bit" << std::endl;
        std::cout << b << " 64bit" << std::endl;
    }
}
```

Compile and run in 64bit, Release. This is the expected output (as with `g++`, `clang++`, or in debug):
    
```
4224838037 32bit
4224838037 64bit
4154708778 32bit
4154708778 64bit
```

This is what I get with 64bit, Release:
    
```
4224838037 32bit
4224838037 64bit
4154708778 32bit
8449676074 64bit
```


Also see [my stackoverflow post](http://stackoverflow.com/q/42511458/48181). The compiler seems to optimize too much, and directly uses a 64bit number instead of making sure the 32bit value is casted to 64bit. [I have already reported the bug to Microsoft](https://connect.microsoft.com/VisualStudio/feedback/details/3125746/optimizer-uses-64bit-operation-instead-of-32bit-operation), and wait for feedback.


## Update

It has been fixed.