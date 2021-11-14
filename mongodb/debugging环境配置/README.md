#mac 环境说明
- 系统: debian 10.6
- vscode: 1.61.1
- python: 3.7.3
- mongodb: 4.4
- gcc: 8.3.0
- pip: 20.x
- 参考build地址: https://github.com/mongodb/mongo/blob/v4.4/docs/building.md
# 安装依赖
```shell
sudo apt install  libcurl4-openssl-dev
sudo apt install liblzma-dev
```

# 安装mongod
```shell
git clone https://github.com/mongodb/mongo 
cd mongo
python3 buildscripts/scons.py install-mongod
```


# vscode 调试
打开vscode加载libuv项目。
添加launch.json
```json5
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "gcc - 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: gcc 生成活动文件"
        }
    ]
}
```
添加tasks.json  注意args要添加-luv,因为libuv的头文件生成功到include/uv目录下
```json5
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: gcc 生成活动文件",
            "command": "/usr/bin/gcc",
            "args": [
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}",
                "-luv"
            ],
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "调试器生成的任务。"
        }
    ],
    "version": "2.0.0"
}
```
创建my-test/test-once.c
```cpp

#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

int main()
{
    uv_loop_t *loop = malloc(sizeof(uv_loop_t));
    uv_loop_init(loop);
    
    printf("suc\n");
    uv_run(loop, UV_RUN_DEFAULT);

    uv_loop_close(loop);
    free(loop);
    return 0;
}

```
点击debug
![debugging](debugging.png)
