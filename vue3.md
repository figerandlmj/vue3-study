# 脚手架工具 vite 与 webpack 比较

- vite 法语，快，搭建工程的脚手架
- webpack，modules 模块通过 webpack 打包 bundle,然后开启 devServer 开发服务器，模块间依赖关系，改动后的热替换 HMR
- vite，没有打包过程，直接启动 devServer 开发服务器(koa)，访问服务器，给你文件，type(es module),现代浏览器才支持，会改动访问文件路径，将 css 编译成字符串，将 vue 编译成 js(@vue/compiler-sfc)，模板编译成了 render 函数，预编译,请求数量变多，本地请求不影响效率
- 总结：webpack 会先打包，然后启动开发服务器，vite 直接启动开发服务器，请求哪个模块再对该模块进行实时编译；vite 充分利用现代浏览器支持 es module 特性，将开发环境下的模块文件作为浏览器要执行的文件，而不像 webpack 进行打包合并；vite 启动时不需要打包合并，所以不需要处理依赖、编译的工作，所以速度会很快，这种请求哪个模块再编译的动态编译方式特别适合模块多、项目复杂的工程；在 HMR 热替换方面，因为改动哪个模块再重新请求哪个模块，不需要重新处理依赖关系全部编译一次，所以速度更快；vite 使用传统的 rollup 打包方式，优势体现在开发阶段；vite 使用 es module 特性,代码中不可以使用 commonJs(require)

# vue3 效率提升 （react 很多地方需要手动控制效率）

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

# vue3 为啥去掉 Vue 构造函数 => createApp()创建应用

- 一个页面多个 vue 应用(new Vue())时，Vue.use()、Vue.mixin()、Vue.component()的使用会作用在多个应用上；createApp(App).use().mixin().component().mount('#app');
- 总结：调用构造函数的静态方法，会对所有 vue 应用生效，不利于隔离不同应用；Vue 构造函数集成了太多功能，不利于 tree shaking(消除最终文件中未使用的代码来优化体积)，vue3 将其使用普通函数导出，能充分利用 tree shaking 优化打包体积；vue2 没有将组件实例和 vue 应用概念区分开，创建的对象既是一个应用又是一个特殊的组件，vue3 通过 createApp 创建的是一个应用，而内部提供的方法针对的是整个应用，而不再是一个特殊的组件

# 组件实例中的 API

- vue3 中，组件实例（this）是一个 Proxy

# vue3 数据响应式的理解

- beforCreate() => 注入和响应式 => created()
- Object.defineProperty()，组件初始阶段递归遍历对象重新定义，增减属性无法响应（$set, $delete）
- new Proxy()，代理对象是动态的，不用遍历，访问时动态获取和设置，可以监控到属性的增加、删除和索引访问

# 模板中的变化

- eg: goods-manage

# 组件的变化

- eg: sync-comp

# Reactivity Api 响应式 Api

- 获取响应式数据

1. reactive, 传入 plain object, 返回对象代理, 深度代理对象中的所有成员
2. readonly, 传入 plain object or proxy, 返回对象代理, 只能读取对象中的成员，不可修改
3. ref, 传入 any, 返回{value: ...}, 对 value 的访问是响应式的，如果给 value 的值是一个对象，则会通过 reactive 函数进行代理，如果已经是代理，则直接使用代理
4. computed, 传入 function, 返回{value: ...}, 当读取 value 值时，会根据情况决定是否运行函数

> 如果想让一个对象变成响应式数据，使用 reactive 或 ref

> 如果想让一个对象所有属性只读，使用 readonly

> 如果想让一个非对象变成响应式数据，使用 ref

> 如果想要根据已知响应式数据得到一个新的响应式数据，使用 computed

- 监听数据变化

```javascript
const stop = watchEffect(() => {
  // 该函数会立即执行，然后追踪函数中用到的响应式数据，收集依赖，响应式数据变化后会再次执行
});
stop(); // 停止监听
```

```javascript
// 监听单个数据的变化
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (newValue, oldValue) => {
    // ...
  },
  {
    immediate: true, // 立即执行
  }
);

const countRef = ref(0);
watch(
  countRef,
  (newValue, oldValue) => {
    // ...
  },
  options
);

// 监听多个数据的变化
watch(
  [() => state.count, countRef],
  ([new1, new2], [old1, old2]) => {
    // ...
  },
  options
);
```

> 当依赖变化时，回调函数的运行都是异步的（微队列）

> 使用 watch 的情况：不希望回调函数一开始就执行；数据改变时，需要参考旧值；需要监控一些回调函数中不会用到的数据；

- 判断

> isProxy 判断某个数据是否是由 reactive/readonly 生成的

> isReactive 判断某个数据是否由 reactive 生成的

> isReadonly 判断某个数据是否由 readonly 创建的

> isRef 判断某个数据是否是一个 ref 对象

- 转换

> unref => isRef(val) ? val.value : val

> toRef 得到一个响应式对象某个属性的 ref 格式

```javascript
const state = reactive({ foo: 1, bar: 2 });
const fooRef = toRef(state, 'foo');
fooRef.value++;
console.log(state.foo); // 2
state.foo++;
console.log(fooRef.value); // 3
```

> toRefs 把一个响应式对象的所有属性转换为 ref 格式，然后包装到一个 plain-object 中返回

```javascript
const state = reactive({
  foo: 1,
  bar: 2,
});
const stateRefs = toRefs(state);
// not a proxy
// {
//   foo: {value: ...},
//   bar: {value: ...}
// }

// 应用在展开时
setup(){
  const state1 = reactive({a: 1, b: 2});
  const state2 = reactive({c: 3, d: 4});
  return {
    ...state1, // lost reactivity
    ...state2, // lost reactivity
  };
}
setup() {
  const state1 = reactive({a: 1, b: 2});
  const state2 = reactive({c: 3, d: 4});
  return {
    ...toRefs(state1), // reactivity
    ...toRefs(state2), // reactivity
  }
}

// 应用在解构时
function usePos() {
  const pos = reactive({x:0, y: 0});
  return pos;
}
setup() {
  const {x, y} = usePos(); // lost reactivity
  const {x, y} = toRefs(usePos()); // reactivity
}
```

- 降低心智负担

> 所有的 composition function 均以 ref 的结果返回，以保证 setup 函数的返回结果中不包含 reactive 或 readonly 直接产生的数据

```javascript
function usePos() {
  const pos = reactive({ x: 0, y: 0 });
  return toRefs(pos); // {x: refObj, y: refObj}
}
function useBooks() {
  const books = ref([]);
  return { books }; // {books: refObj}
}
function useLoginUser() {
  const user = readonly({
    isLogin: false,
    loginId: null,
  });
  return toRefs(user); // {isLogin: refObj, loginId: refObj} all ref is readonly
}
setup(){
  // 在setup函数中，尽量保证解构，展示出来的所有响应式数据均是ref
  return {
    ...usePos(),
    ...useBooks(),
    ...useLoginUser()
  }
}
```

9. Composition Api 组合式 Api

- setup

```javascript
setup(props, context) {
  // 该函数在组件属性被赋值后立即执行，早于所有生命周期钩子
  // props是一个对象，包含了所有的组件属性
  // context是一个对象，提供了组件所属的上下文信息
  // context: attrs、slots、emit
}
```

- 生命周期函数

|     vue2      |        vue3        |          composition api          |
| :-----------: | :----------------: | :-------------------------------: |
| beforeCreate  |    beforeCreate    | 不再需要，代码可直接置于 setup 中 |
|    created    |      created       | 不再需要，代码可直接置于 setup 中 |
|  beforeMount  |    beforeMount     |           onBeforeMount           |
|    mounted    |      mounted       |             onMounted             |
| beforeUpdate  |    beforeUpdate    |          onBeforeUpdate           |
|    updated    |      updated       |             onUpdated             |
| beforeDestroy |  改 beforeUnmount  |          onBeforeUnmount          |
|   destroyed   |    改 unmounted    |            onUnmounted            |
| errorCaptured |   errorCaptured    |          onErrorCaptured          |
|       -       |  新 renderTracked  |          onRenderTracked          |
|       -       | 新 renderTriggered |         onRenderTriggered         |

> renderTracked 渲染 vdom 收集到的每一次依赖时, 调试时使用到

> renderTriggered 当某个依赖更该触发重新渲染时，调试时使用到

- composition api 相比 options api 的优势

> 1.为了更好的逻辑复用和代码组织；2.更好的类型推导

> composition 配合 reactivity 使用，可在组件内部进行更加细粒度的控制，使得组件不同的功能高度聚合，提升了代码的可维护性，对于不同组件的相同功能，也能够更好的复用；相比 options，composition 中没有了指向奇怪的 this，所有 api 变得更加函数化，有利于和类型推导系统（ts）深度配合。

10. 共享数据
