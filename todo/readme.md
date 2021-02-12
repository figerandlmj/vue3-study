- composition api =>  react hooks
- vue-cli: vue create toto 升级vue-cli到最新版本
- webpack 构建工具
- vite 构建工具 速度更快，除了js，其他引用要加上后缀名
- npm init vite-app todo 临时下载vite-app搭建工程
- breaking 截断式的更新
- 不存在构造函数Vue: new Vue(options) => app = createApp(App)
- 使用插件，Vue.use() => 实例 app.use()
- this指向，vue实例 => Proxy（组件代理对象）
- options api 配置式  => composition api 组合式
- 简单组件  功能联系紧密  代码零散  大项目 复杂组件 吃力
- 复杂组件 代码紧凑 高内聚 低耦合
- setup() 所有生命周期钩子函数之前调用; this是undefined; 返回的对象所有属性会挂载到组件实例上; 不具有响应式;
- ref()返回的变量具有响应式, 实例环境中直接访问，否则通过.value访问

```javascript
export default {
  data: () => ({
    count: 0,
  }),
  methods: {
    increase() {
      console.log(this);
      this.count++;
    },
  }
}
```
```javascript
import { ref } from "vue";
export default {
  setup() {
    let countRef = ref(0);
    const increase = () => {
      countRef.value++;
    };
    return {
      countRef,
      increase,
    };
  },
};

```
