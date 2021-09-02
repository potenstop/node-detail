#mac 环境说明
- 系统: mac 10.15.7 
- vscode: 1.59.1
- node：16.8.0
- python: 3.6.12

# 下载源码 编译 编译大概需要一个小时左右
```shell script
$ git clone https://github.com/nodejs/node.git
$ cd node
$ ./configure --debug
$ make -j4
```

# make过程中如果有libtool报错
Try 'libtool --help' for more information.
libtool:   error: unrecognised option: '-static' 
> 解决方法: 删除自己编译安装的libtool,使用mac自带的libtool, 才有-static参数。


# 编译完成后

