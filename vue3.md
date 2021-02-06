1. 脚手架工具 vite 与 webpack 比较

- vite 法语，快，搭建工程的脚手架
- webpack，modules 模块通过 webpack 打包 bundle,然后开启 devServer 开发服务器，模块间依赖关系，改动后的热替换 HMR
- vite，没有打包过程，直接启动 devServer 开发服务器(koa)，访问服务器，给你文件，type(es module),现代浏览器才支持，会改动访问文件路径，将 css 编译成字符串，将 vue 编译成 js(@vue/compiler-sfc)，模板编译成了 render 函数，预编译,请求数量变多，本地请求不影响效率
- 总结：webpack 会先打包，然后启动开发服务器，vite 直接启动开发服务器，请求哪个模块再对该模块进行实时编译；vite 充分利用现代浏览器支持 es module 特性，将开发环境下的模块文件作为浏览器要执行的文件，而不像 webpack 进行打包合并；vite 启动时不需要打包合并，所以不需要处理依赖、编译的工作，所以速度会很快，这种请求哪个模块再编译的动态编译方式特别适合模块多、项目复杂的工程；在 HMR 热替换方面，因为改动哪个模块再重新请求哪个模块，不需要重新处理依赖关系全部编译一次，所以速度更快；vite 使用传统的 rollup 打包方式，优势体现在开发阶段；vite 使用 es module 特性,代码中不可以使用 commonJs(require)

2. vue3 效率提升 （react 很多地方需要手动控制效率）

- 静态提升：编译器（模板编译成 render 函数），发现静态节点（元素节点，没有绑定动态内容）或静态属性，createVNode(静态节点)提升到 render 函数外面，减少创建次数
- 预字符串化：页面模板中动/静比很小，大量（20）连续静态元素，createStaticVNode('')，SSR(服务器端渲染)作用特别明显
- 缓存事件处理函数：

```javascript
render(ctx, _cache) {
  return createVNode('button', {
    onClick: _cache[0] || (_cache[0] = ($event) => (ctx.count ++))
  })
}
```

- Block Tree：更新时新旧两颗树对比，动静节点标记，所有动态节点提取到根节点中（block 节点），对比时找到 block 节点，循环对比，跳过了很多不需要对比的节点
- PatchFlag 比对标记：对比某一个节点时，标记哪一块是动态的

3. vue3 为啥去掉 Vue 构造函数 => createApp()创建应用

- 一个页面多个 vue 应用(new Vue())时，Vue.use()、Vue.mixin()、Vue.component()的使用会作用在多个应用上；createApp(App).use().mixin().component().mount('#app');
- 总结：调用构造函数的静态方法，会对所有 vue 应用生效，不利于隔离不同应用；Vue 构造函数集成了太多功能，不利于 tree shaking(消除最终文件中未使用的代码来优化体积)，vue3 将其使用普通函数导出，能充分利用 tree shaking 优化打包体积；vue2 没有将组件实例和 vue 应用概念区分开，创建的对象既是一个应用又是一个特殊的组件，vue3 通过 createApp 创建的是一个应用，而内部提供的方法针对的是整个应用，而不再是一个特殊的组件

4. 组件实例中的 API

- vue3 中，组件实例（this）是一个 Proxy

5. vue3 数据响应式的理解

- beforCreate() => 注入和响应式 => created()
- Object.defineProperty()，组件初始阶段递归遍历对象重新定义，增减属性无法响应（$set, $delete）
- new Proxy()，代理对象是动态的，不用遍历，访问时动态获取和设置，可以监控到属性的增加、删除和索引访问

6. 模板中的变化
