# v6
v6.0.0(2016-04-26)-v6.17.1(2019-04-03)
- 模块加载性能比当前的v4版本要快上4倍。
- 更新了v8版本，支持更多的es6的新特性。
- 新增Buffer.from(), Buffer.alloc() ,Buffer.allocUnsafe()
- process.nextTick传的参数不是函数则抛异常, 并且提高20%的性能。
- 新增util.inspect(),不可序列化的属性也能被序列化，如function、RegExp
# v7
v7.0.0(2016-10-25)-v7.10.1(2017-05-02)
- v8升级到5.4, 支持async/await
- new Buffer 弃用警告
- Buffer.from() 的性能提高约 50%
- URL实验性支持

#v8
v8.0.0(2017-05-30)-v8.17.0(2019-12-17)
- 新增async_hook
- 新增perf_hooks
- 新增http2的支持
- 添加了对新 N-API API 的实验性支持
- URL 实现现在是 Node.js 中完全支持的非实验性API
- 新增util.promisify() 可以对异步方法promise化
- console.debug的支持

#v9
v9.0.0(2017-10-31)-v9.11.2(2018-06-12)
- 优化buffer
- 优化http2


#v10
v10.0.0(2018-04-24)-v10.24.1(2018-10-10)
- new Buffer()及Buffer()调用时发出一个运行时弃用警告
- 新增console.table()
- 新增fs/promises模块(实验性)
- 新增os.getPriority和os.setPriority，允许操纵进程的调度优先级
- http2 非实验性模块

#v11
v11.0.0(2018-10-23)-v11.15.0(2019-04-30)
- v8进入7.x版本
- util.inspect()默认情况下，输出大小限制为128MB
- process.binding()已被弃用
- 实验性的实验llhttp解析HTTP

#v12
v12.0.0(2018-10-23)-v12.12.0(2019-10-11)
- TLS从1.2升级到了1.3，更安全且更易配置。通过使用 TLS 1.3，Node 程序可以减少 Https 握手所需时间来提升请求性能
- 将默认解析器切换到 llhttp, 比http-parser快156%
- 增加诊断报告，包括崩溃、性能下降、内存泄露、CPU
- worker实验开关已取消，可正式使用
- ES6module的支持依然处于实验阶段，需要通过--experimental-modules 开启

#v13
v13.0.0(2019-10-22)-v13.14.0(2020-04-29)
- V8已更新至7.8版。这包括对对象解构、内存使用和WebAssembly启动时间的性能改进
- http,http2删除了默认服务器超时 

#v14
v14.0.0(2020-04-21)-v14.14.0(2020-10-15)
- REPL支持输入自动联想
- 异步函数之外使用带有--experimental-top-level-await标志的 await 关键字

#v15
v15.0.0(2020-10-20)-v15.14.0(2021-04-06)
- npm7 更新，支持workspaces和peerDependencies
- 新增diagnostics_channel



