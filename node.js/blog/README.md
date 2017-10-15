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


### 功能开发顺序

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


## 前端页面逻辑


Font Awesome:

网站：[Font Awesome，一套绝佳的图标字体库和CSS框架](http://fontawesome.dashgame.com/ "Font Awesome，一套绝佳的图标字体库和CSS框架")

官方示例：[Font Awesome，示例](http://fontawesome.dashgame.com/#basic "Font Awesome，一套绝佳的图标字体库和CSS框架")



[字体图标font-awesome - AminHuang - 博客园](http://www.cnblogs.com/AminHuang/p/4311916.html "字体图标font-awesome - AminHuang - 博客园")



## 用户注册逻辑

前端： 使用ajax提交数据。

如果没有 jQuery，AJAX 编程还是有些难度的。
[jQuery AJAX 简介 | 菜鸟教程](http://www.runoob.com/jquery/jquery-ajax-intro.html "jQuery AJAX 简介 | 菜鸟教程")

[AJAX 教程 | 菜鸟教程](http://www.runoob.com/ajax/ajax-tutorial.html "AJAX 教程 | 菜鸟教程")


后端：使用 body-parser 模块处理 Post 请求。

[body-parser-json](https://www.npmjs.com/package/body-parser-json "body-parser-json")

[express插件之body-parser - CSDN博客](http://blog.csdn.net/liangklfang/article/details/51003120?locationNum=3&fps=1 "express插件之body-parser - CSDN博客")


### 基于数据库的验证和用户信息保存

mongoose 的说明手册中；`Model#sava()`表示对象方法（先要new出一个对象）， `Model.find()`表示类方法（静态方法）。


#### promise对象

```javascript
    //用户是否已经被注册
    User.findOne({
        username: username
    }).then(function () {

    });
```
上面的 User.findOne()返回的是一个promise对象，所以可以继续调用 then() 方法。

**那么到底什么是 promise 对象？**

[mongoose 文档（十） Promises - Surahe - 博客园](http://www.cnblogs.com/surahe/p/5202543.html)

[Promises/A+](https://promisesaplus.com/ "Promises/A+")

[Promise 对象 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/promise "Promise 对象 - ECMAScript 6入门")




## 用户登录

略


## 使用cookie保存用户登录状态

需要借助 cookies 模块。


在app.js中使用cookies中间件，**这样无论请求的是哪个地址都会经过该中间件**。

```javascript
//设置cookie
app.use(function (req, res, next) {
    //通过cookies的方法将cookie加载进req对象中
    req.cookies = new cookies(req,res);

    next();
});
```

> 这也是大多数中间件在app.js中引入的原因。


只有登录成功才向客户端发送cookie。（api.js中）
```javascript
        //为请求设置cookie，这将会在res中将此cookie发送给客户端
        //之后刷新浏览器，就会发现发送的req中也会包含该cookie
        req.cookies.set('userInfo', JSON.stringify({ //将其转换为字符串，保存到名称为userInfo的对象中
            _id:userInfo.id,
            username: userInfo.username
        }));
```

//在很多地方需要用户信息，所以我们最好将用户信息保存在一个全局对象中   
//这里我们可以选择在 req 中增加一个属性，用来保存这些从req.cookies中解析出来的信息    
`req.userInfo = {};`


**如何解决当每次刷新主页时显示的是登录好的页面，而非当前的注册页面?**  

这里我们使用 swig 模板来实现。（在main.js中）

根据客户端给模板分配的数据来判断是显示用户面板、登录还是注册页面。


> Chrome调试技巧：   
> 切换到 Network 标签页来查看网络状态。  
> 在Name处点中某一次请求，就可以查看该此请求发送的数据；比如我们可以查看 Headers或Cookies等。  
> 可以直接在调试面板手动删除 cookie，再刷新来观察预期效果。删除的方法是：  
> 切换到 Application 标签页，展开Cookies，右键Clear某cookies即可。  


**退出登录：**  

流程： 
1. 当客户端点击退出，则通过ajax请求退出路径；
2. 服务器端接受到该路径的请求后清空cookie，并向客户端返回一个消息
3. 客户端在ajax中确认接收到消息后，重载浏览器页面。



## 普通用户和管理员功能的实现

在users schema中添加一个键用来表示当前用户是否是管理员。

注意，为了安全考虑是否是管理员的信息不能存放到cookie当中，而需要我们实时的进行验证。


## 后台管理功能及界面的搭建

需要避免非管理员通过直接输入地址的方式进入后台管理界面。

```javascript
//避免非管理员通过直接输入地址的方式进入后台管理界面
// 访问 /admin 下的任何子目录都会执行该中间件
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin){
        //非管理员
        res.send("<h1 style='color: red'>只有管理员才能进入后台管理界面</h1>");
    }
    next();
});
```

顶部导航：直接从Bootstrap网站提供的组件中复制，再删除不必要的部分

考虑到管理页面的顶部导航是不变的，
所以可以将导航栏作为模板(只需将其写入一个文件，一般为layout.html文件)。
模板中的可变部分，我们可以使用block进行占位，例如：下面定义一个名叫main的block。
```javascript
{%block main%}{endblock}
```


然后让其它文件继承此文件，并实现 block 中的内容。


> 存在一个issue，已经在Github中建立该issue， #3

### bootstrap的用法

进入bootstrap v3的中文文档页面，[Bootstrap 中文文档](http://v3.bootcss.com/)。  

* 从 “组件” 标签页中可以找到各种已经定义好的html组件。
* 从 “全局CSS样式” 标签页中可以找到能够应用于各元素的样式。更改组件的样式。

### 后台管理-注册用户数据展示

从bootstrap复制组件，应用到项目中。


### 后台管理-注册用户数据分页原理实现

原理，从数据库中读取数据时：

* 使用 limit(Number)：限制获取的数据条数
* 使用 skip(Number): 忽略数据的条数

比如每页显示两条：

* 第1页： 1-2  skip 0 
* 第2页： 3-4  skip 2 

规律就是：跳过的页数 = （当前页 -1）* 每页显示的页数

技巧  
```javascript
    //计算总页数。ceil 为向上取整
    pages = Math.ceil(count / limit);
    //取值不能超过 pages(总页数)
    page = Math.min(page,pages);
    //取值不能小于1
    page = Math.max(page,1);
```

同样，在很多地方需要用到分页，所以可以将其作为模板。



### 后台管理-添加博客分类功能


Bootstrap的表单在“全局CSS样式”中寻找。


可以这样返回上一步 ： 
```javascript
  <div class="panel-footer">
      <!-- 返回上一页 -->
      <a href="javascript:window.history.back();">返回上一步</a>
  </div>
```


凡是继承了layout.html的页面在渲染时都需要传入userInfo，因为layout.html中会用到。
```javascript
{% extends 'layout.html' %}
```



### 后台管理-博客分类的修改和删除


错误1： 

当在主页和admin之间多次跳转时出现下面的错误：
```javascript
_http_outgoing.js:356
    throw new Error('Can\'t set headers after they are sent.');
    ^

Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:356:11)
    at ServerResponse.header (/home/fan/workspace/web-demos/node.js/blog/node_modules/express/lib/response.js:767:10)
    at ServerResponse.send (/home/fan/workspace/web-demos/node.js/blog/node_modules/express/lib/response.js:170:12)
    at done (/home/fan/workspace/web-demos/node.js/blog/node_modules/express/lib/response.js:1004:10)
    at /home/fan/workspace/web-demos/node.js/blog/node_modules/swig/lib/swig.js:565:9
    at /home/fan/workspace/web-demos/node.js/blog/node_modules/swig/lib/swig.js:690:9
    at tryToString (fs.js:455:3)
    at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:442:12)
```
“Can’t set headers after they are sent.” => “不能发送headers因为已经发送过一次了” => 在处理HTTP请求时，服务器会先输出响应头，然后再输出主体内容，而一旦输出过一次响应头（比如执行过 res.writeHead() 或 res.write() 或 res.end()），你再尝试通过 res.setHeader() 或 res.writeHead() 来设置响应头时（有些方法比如 res.redirect() 会调用 res.writeHead()），就会报这个错误。

（说明：express中的 res.header() 相当于 res.writeHead() ，res.send() 相当于 res.write() ）

错误处理的过程见 GitHub issue。   
[Can't set headers after they are sent. · Issue #4 · FanDean/web-demos](https://github.com/FanDean/web-demos/issues/4 "Can't set headers after they are sent. · Issue #4 · FanDean/web-demos")


错误3:
```javascript
(node:19829) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
数据库连接成功
(node:19829) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
```
解决办法： [mongoose DeprecationWarning · Issue #5 · FanDean/web-demos](https://github.com/FanDean/web-demos/issues/5 "mongoose DeprecationWarning · Issue #5 · FanDean/web-demos")



## 视频地址

[Node.js 实战开发：博客系统_腾讯课堂](https://ke.qq.com/course/185893 "Node.js 实战开发：博客系统_腾讯课堂")

