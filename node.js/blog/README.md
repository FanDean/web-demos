## 项目简介

突然想到，对于这种集中式的demo项目，我们可以为每个项目都创建一个 git 分支。

更改了app.js文件后记得重新运行该app.js。


## 技术框架介绍


* Node.js：版本 v5.1.0
* Express：一个简介简洁灵活的node.js web框架。版本 v4.14.0
* Mongodb：数据库。版本 v3.2.4
* bodyParser：解析post请求数据
* cookies：读写cookie
* swig：模板解析引擎
* mongoose：操作mongodb数据
* markdown：markdown语法解析生成模块




## 项目开始

* 运行 `npm init` 初始化项目

* 安装所需模块：

  `npm install body-parser cookies express markdown mogoose swig --save `

* 创建目录结构：

  db : 数据库存储目录

  models: 数据库模型文件目录

  public：公共文件目录(css、js、image。。。)

  routers：路由文件目录

  schemas：数据库结构文件目录

  views：模板视图文件目录

  app.js：应用程序入口文件

  package.json：文件

* 编写 app.js 文件。然后右键点击运行：
  ```javascript
  //加载express模块
  var express = require('express');
  //创建 app 应用  => Node.js createrServer();
  var app = express();

  app.listen(8081);
  ```


## 处理请求输出

* 路由绑定
  通过app.get()或app.post()等方法可以把一个url路径和一个或N个函数绑定。


* 内容输出
  通过res.send(string)发送内容至客户端


## 使用模板
使后端逻辑和页面表现分离。（前后端分离）

模板配置：见app.js中的代码注释

注意：为了性能考虑，修改了模板文件后，刷新浏览器并不会看到更新后的内容，因为在第一次读取模板文件的时候，就已经将该文件缓存到内存中，并在下次使用时直接读取内存中的模板。
我们可以选择重启应用 或者 在开发时取消缓存机制。
```javascript
//在开发过程中需要取消模板缓存
swig.setDefaults({cache:false});
```


## 静态文件托管

为静态文件设置路由。

使用如下新方法：(视频中讲解的方法没有成功)

```javascript
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
```

在public文件夹中新建main.css文件，在 index.html 文件中引用。

> 如果有时看不到预期的效果，可以清空浏览器缓存再试试。


## 划分模块

根据功能进行模块划分：
* 前台模块
* 后台模块
* API模块

使用 app.use()进行模块划分



## 前台路由 + 模板

### main模块

路径 | 描述
---|---
/ | 首页 | 
/view | 内容页 | 

### api模块

路径 | 描述
---|---
/ | 首页 | 
/register | 用户注册|
/login | 用户登录|
/comment | 获取评论|
/comment/post 提交评论|
 

### admin模块

路径 | 描述
---|---
/ | 首页 |

用户管理：

路径 | 描述
---|---
/user | 用户列表 |


分类管理：  

路径 | 描述
---|---
/category |分类列表|
/category/add 分类添加|
/category/edit | 分类修改|
/category/delete | 分类删除|


文章内容管理：

路径 | 描述
---|---
/article | 内容列表
/article/add | 内容添加
/article/dite | 内容修改
/article/delete | 内容删除


评论内容管理：

路径 | 描述
---|---
/comment | 评论列表
/comment/delete | 评论删除 


## 功能开发顺序

功能模块开发顺序：
* 用户
* 栏目
* 内容
* 评论

> 先做后台管理，再做前台展示。

编码顺序：
* 通过Schema定义设计数据存储结构
* 功能逻辑
* 页面展示



## 用户注册

安装 mongodb 数据库。启动数据库服务：
```shell
mongod --dbpath /home/fan/workspace/web-demos/node.js/blog/db
```

连接到blog数据库：
```javascript
//连接到blog数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog',function (err) {});
```
该方法已经过时。提示：
(node:9559) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client



[Mongoose ODM v4.12.1](http://mongoosejs.com/)    
[Mongoose学习参考文档——基础篇 - CNode技术社区](http://cnodejs.org/topic/504b4924e2b84515770103dd)    
