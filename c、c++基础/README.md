##目的
总结出node源码中用到的一些用法，如果用c/c++开发经验的可以跳过。
## 1 文件后缀
```text
.h： 头文件
.c: C源代码文件
.cc: C++源码文件
```

## 2 include
### 2.1 介绍
告诉预处理器将指定头文件的内容插入到预处理器命令的相应位置。
### 2.2 实例
从当前目录中找 ，如果找不到在从函数库中寻找文件
```cpp
#include "node.h"
```
直接从编译器自带的函数库(系统目录)中寻找文件
```cpp
#include <cstdio>
```

## 3 宏定义
### 3.1 介绍
宏定义在C语言占有举足轻重的地位。底层框架自不用说，为了编译优化和方便，以及跨平台能力，宏被大量使用，可以说底层开发离开define将寸步难行。使用宏的好处是不言自明，在节省工作量的同时，代码可读性大大增加。
### 3.2 实例
对象宏 定义一个NODE_USE_V8_WASM_TRAP_HANDLER的宏 值为1
```text
#define NODE_USE_V8_WASM_TRAP_HANDLER 1
```
函数宏 定义一个函数名为MIN 只有两个参数 函数体为 return A < B ? A : B
```text
#define MIN(A, B)   A < B ? A : B
```
\#\# 用于拼接字符串  这里ElfW(1)将执行ElfW_1函数
```text
#define ElfW(name) Elf_##name()
```
\#ifdef 用于判断宏是否定义了
```text
#ifdef NODE_USE_V8_WASM_TRAP_HANDLER
...
#endif
```

\#if defined 等价于#ifdef  不过#if 可以写逻辑表达式
```text
#if defined(__APPLE__) || defined(__linux__) || defined(_WIN32)
#define NODE_USE_V8_WASM_TRAP_HANDLER 1
#else
#define NODE_USE_V8_WASM_TRAP_HANDLER 0
#endif
```
综合实例(来源node_binding.cc 有部分改造， 用于注册c++模块)
```cpp
#include <stdio.h>
// 第一步 定义NODE_BUILTIN_MODULES的对象宏， V为一个函数，调用V传入async_wrap字符串
#define NODE_BUILTIN_MODULES(V) V(async_wrap)
// 第四步 注册async_wrap模块的函数
void _register_async_wrap() {
    printf("_register_async_wrap");
}

void RegisterBuiltinModules() {
// 第三步 定义名称V的函数宏 参数为模块名称，V=function _register_modname(){}
#define V(modname) _register_##modname();
  NODE_BUILTIN_MODULES(V)
#undef V
}
// 实际编译的函数为
// void RegisterBuiltinModules() {
//    _register_async_wrap()
// }
int main(){
    // 第二步 调用RegisterBuiltinModules
    RegisterBuiltinModules();
}

```

### 3.3 各个平台的内置宏定义
```text
windows: WIN32、_WIN32、_WIN32_、WIN64、_WIN64、_WIN64_
Android: ANDROID、_ANDROID_
Linux: __linux__
iOS/Mac: __APPLE__、__MACH__、TARGET_OS_IPHONE、TARGET_IPHONE_SIMULATOR、TARGET_OS_MAC
FreeBSD: __FreeBSD__
Unix: __unix 、__unix__
```
代码判断
```cpp
#if defined(__APPLE__) || defined(__linux__) || defined(_WIN32)
#define NODE_USE_V8_WASM_TRAP_HANDLER 1
#else
#define NODE_USE_V8_WASM_TRAP_HANDLER 0
#endif
```





