#mac 环境说明
- 系统: deepin 20 - Linux 5.10
- vscode: 1.59.1
- node：v16
- python: 3.7

# 下载源码 编译 编译大概需要两个小时左右
```shell script
$ git clone https://github.com/nodejs/node.git
$ cd node
# 需要加--debug 否则断点会不生效
$ ./configure --debug
$ make -j4
# 需要增加build cache 加速每次修改的编译 则/etc/profile增加下面两行
#export CC="ccache gcc"
#export CXX="ccache g++"
```

# make过程中如果有libtool报错
Try 'libtool --help' for more information.
libtool:   error: unrecognised option: '-static' 
> 解决方法: 删除自己编译安装的libtool,如果使用mac自带的libtool, 才有-static参数。


# 编译完成
检查out/Debug是否生成了node可执行文件。如果没有生成，检查下错误解决后重新生成。

# 打开工程
用vscode打开项目。目录结构如下
```
├── benchmark       性能单元测试
├── deps            外部依赖
│   ├── acorn       JavaScript解析器
│   ├── brotli      压缩算法
│   ├── cares       异步DNS解析库
│   ├── cjs-module-lexer  CommonJS 模块语法词法分析器
│   ├── corepack    Node和包管理器之间的桥梁
│   ├── googletest  google测试框架
│   ├── histogram   高动态范围直方图
│   ├── icu-small 
│   ├── llhttp      http解析器
│   ├── nghttp2     http2库
│   ├── ngtcp2      实现QUIC和HTTP/3
│   ├── npm         包管理器
│   ├── openssl     TLS/SSL加密库
│   ├── uv          跨平台的异步IO库
│   ├── uvwasi      针对wasi的uv库
│   ├── v8          javascript引擎
│   └── zlib        数据压缩库   
├── doc             文档
├── lib             JavaScript实现的node标准库
├── out             编译输出目录
├── src             c/c++实现源码
├── test            单元测试
├── tools           工具类
└── typings         ts.d
```
# vscode安装插件
c/c++(c/c++的支持、语法提示、调试等功能)和CodeLLDB(调试、断点等功能)
![插件](./插件.png)

# 如何开始调式
打开src/node_main.cc或者如何一个.cc文件，然后运行->以非调式模式运行
![调试](./调试1.png)
选择c++(GDB/LLDB)
![调试](./调试2.png)
选择默认配置
![调试](./调试3.png)
此时在.vscode中生成了launch.json文件，修改了program
```json5
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(gdb) 启动",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/out/Debug/node",
      "args": [],
      "stopAtEntry": false,
      "cwd": "${fileDirname}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      "setupCommands": [
        {
          "description": "为 gdb 启用整齐打印",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        },
        {
          "description": "将反汇编风格设置为 Intel",
          "text": "-gdb-set disassembly-flavor intel",
          "ignoreFailures": true
        }
      ]
    }
  ]
}
```
切换到调式窗口 增加断点 就可以调式了
![调试](./调试4.png)









