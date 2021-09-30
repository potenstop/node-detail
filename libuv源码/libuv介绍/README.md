# 简介
libuv 是一个跨平台支持库，原先为 NodeJS 而写。它围绕着事件驱动的异步I/O模型而设计。
这个库提供不仅仅是对不同I/O轮询机制的简单抽象，还包括：handles和stream对sockets和其他实体提供了高级别的抽象； 也提供了跨平台的文件I/O和线程功能，以及其他一些东西。
![libuv 官网的架构图](http://docs.libuv.org/en/v1.x/_images/architecture.png)
- epoll: linux轮询机制。
- kqueue: mac OS和其他BSD轮询机制。
- event ports: SunOS轮询机制。
- IOCP: windows轮询机制。
- Thread pool: 线程池，处理那些不被事件循环支持的 IO 操作

从上图看出libuv的主要工作概括为:
- 封装不同系统的IO模型，抽象出统一的API。
- 对于可以用系统调用的IO操作(如TCP等)使用统一API。
- 对于不可以用系统调用的IO操作(如文件操作)，使用Thread pool的模拟出异步API。
- 最后将统一的API和Thread pool模拟的API统一封装对外部提供
# kqueue的事件循环
因为电脑是macbook，所以以kqueue来介绍。
> [参考地址](https://www.cnblogs.com/cool-fire/p/14690040.html)
```cpp
#include <sys/event.h>
#include <err.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
     struct    kevent event;     /* Event we want to monitor */
     struct    kevent tevent;     /* Event triggered */
     int kq, fd, ret;


     // 打开文件，拿到文件描述符
     fd = open("1.txt", O_RDONLY);
     if (fd    == -1)
         err(EXIT_FAILURE, "Failed to open");

     /* Create kqueue. */
     // 创建kqueue队列，返回描述符
     kq = kqueue();
     if (kq    == -1)
         err(EXIT_FAILURE, "kqueue() failed");
  
  // EV_SET(kev, ident,    filter,    flags, fflags, data, udata);
  /*
     初始化kevent结构体
     ident：为文件描述符
     EVFILE_VNODE： 用这个filter
     EV_ADD：添加到kqueue
     EV_CLEAR：每次事件被取走，状态重置
     NOTE_WRITE：每当ident指向的文件描述符有写入时返回
     不用太纠结为什么要用EVFILE_VNODE这个filter，按照官网来说，这个filter就是要用监听文件变化的。
   */
     EV_SET(&event,    fd, EVFILT_VNODE, EV_ADD | EV_CLEAR, NOTE_WRITE, 0,    NULL);
     /*
        int kevent(
            int    kq, 
            const struct kevent    *changelist, 
            int nchanges,
            struct    kevent *eventlist, 
            int nevents,
            const struct timespec *timeout
        );
        参数changlist、eventlist都是指向kevent结构的指针，changelist是要监听的事件，如果事件发生，会放在eventlist里。
        函数返回放在eventlist里事件的数量，即放了多少个事件到eventlist。
        其中有个比较重要的设定，如果nevents值是0，那kevent()会立即返回；如果nevents不为0，且timeout指针为空，那么kevent()会永久阻塞，直到事件发生。
     */
     ret = kevent(kq, &event, 1, NULL, 0, NULL);

     if (ret == -1) // 注册失败会返回-1
         err(EXIT_FAILURE, "kevent register");

     if (event.flags & EV_ERROR) // 有其他错误，会置flags的EV_RROR位为1，错误数据放在data字段
         errx(EXIT_FAILURE,    "Event error: %s", strerror(event.data));

     // 开启循环
     for (;;) {
         /*    Sleep until something happens. */
         // 这里nevents不为0，eventlist为这NULL，且timeout为空指针，那会永久阻塞，直到有事件产生
         ret = kevent(kq, NULL, 0, &tevent,    1, NULL);

         if (ret ==    -1) {
            err(EXIT_FAILURE, "kevent wait");

         } else if (ret > 0) {

            // 每当有东西写到文件里了，就会触发事件
            printf("Something was written in \n");
         }
     }
}

```


# 事件循环
事件循环是libuv的核心组件。可以在每个线程中运行一个事件循环，并且支持所有的IO操作。
libuv事件循环不是线程安全的，除非另行说明。网络型的IO使用的事件循环是通过不同操作系统实现，
非网络型的IO则通过线程池实现。
> 下面是官网的一个图，显示了一次循环迭代的所有阶段：

![阶段](https://libuv-docs-chinese.readthedocs.io/zh/latest/_images/loop_iteration.png)
结果uv_run(src/unix/core.c)函数的源码来分析下上面的图的意思
```cpp
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;
  // 判断loop是否为活动的  r==0则为不活动的
  r = uv__loop_alive(loop);
  if (!r)
    // 不活动情况下 更新time
    uv__update_time(loop);
  while (r != 0 && loop->stop_flag == 0) {
    // 更新time
    uv__update_time(loop);
    // 执行timer队列
    uv__run_timers(loop);
    // 执行pending队列
    ran_pending = uv__run_pending(loop);
    // 执行idle队列
    uv__run_idle(loop);
    // 执行prepare队列
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);

    /* Run one final update on the provider_idle_time in case uv__io_poll
     * returned because the timeout expired, but no events were received. This
     * call will be ignored if the provider_entry_time was either never set (if
     * the timeout == 0) or was already updated b/c an event was received.
     */
    uv__metrics_update_idle_time(loop);

    uv__run_check(loop);
    uv__run_closing_handles(loop);

    if (mode == UV_RUN_ONCE) {
      /* UV_RUN_ONCE implies forward progress: at least one callback must have
       * been invoked when it returns. uv__io_poll() can return without doing
       * I/O (meaning: no callbacks) when its timeout expires - which means we
       * have pending timers that satisfy the forward progress constraint.
       *
       * UV_RUN_NOWAIT makes no guarantees about progress so it's omitted from
       * the check.
       */
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }

  /* The if statement lets gcc compile it to a conditional store. Avoids
   * dirtying a cache line.
   */
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```

