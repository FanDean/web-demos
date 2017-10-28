# translate

> A Vue.js project

[Vue实战项目(在线翻译)_腾讯课堂](https://ke.qq.com/course/227593 "Vue实战项目(在线翻译)_腾讯课堂")

更改服务器端口号：

- 方法1: 直接修改文件 build/dev-server.js 中的如下行的内容
  ```
  // default port where dev server listens for incoming traffic
  const port = process.env.PORT || config.dev.port
  ```
  直接指定为某端口号
  ```
  `var port = 端口号`
  ```
- 方法2: 修改 config/index.js 中如下行的 8080 端口
  ```
  port: process.env.PORT || 8080,
  ```


将在TranslateForm.vue中获取到的用户输入的内容传递给App.vue，
这里使用注册事件的方式来达成目的。

`this.$emit();` 默认参数为你需要注册的事件。


翻译用的API是 Yandex.Translate API (俄罗斯的)

1. 注册Yandex帐号
2. 进入[Developers](https://translate.yandex.com/developers "Developers")
3. 点击 "Get a free [API key](https://translate.yandex.com/developers/keys "API key")."创建新的Key
4. 阅读文档：[Translate API — Documentation](https://tech.yandex.com/translate/doc/dg/concepts/About-docpage/ "Translate API — About this guide — Yandex Technologies")



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
