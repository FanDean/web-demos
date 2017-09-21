## React Native零基础入门到项目实战

1. react-demo-01: 创建React工程
1. react-demo-02：JSX 的基本语法规则
1. react-demo-03：定义组件
1. react-demo-04：组件的样式
1. react-demo-05：复合组件
1. react-demo-06：props
1. react-demo-07：...this.props
1. react-demo-08：this.props.children
1. react-demo-09：PropTypes和设置默认属性
1. react-demo-10：点击事件处理
1. react-demo-11：state
1. react-demo-12：表单
2. react-demo-13：组件的生命周期
3. react-demo-14：数组
4. react-demo-15：获取真实的DOM
5. react-demo-16：定时器
6. react-demo-17：
7. react-demo-18：
8. react-demo-19：
9. react-demo-20：


## React

### React开发环境配置


**安装方法：**

[Installation - React](https://facebook.github.io/react/docs/installation.html#using-a-cdn "Installation - React")

[React 安装 - 菜鸟教程](http://www.runoob.com/react/react-install.html "React 安装 - 菜鸟教程")





React is available as the `react` package on [npm](https://www.npmjs.com/). It is also available on a [CDN](https://facebook.github.io/react/docs/installation.html#using-a-cdn).

在Github下载React最新发布的源代码，解压进入`react-15.*.*/examples/`目录查看此处示例的html源代码是如何使用(导入)React的；比如它有下面的一句：

```html
    <script src="../../build/react.js"></script>
    <script src="../../build/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
```

此时如果在浏览器中打开一个examples目录下的某个html文件，会看到有下面一句提示：
```html
If you can see this, React is not working right.
If you checked out the source from GitHub make sure to run grunt.
```

我们先不管 grunt，我们直接在`react-15.*.*`目录新建一个`build`目录，再放入 react.js 和 react-dom.js 文件。然后刷新浏览器即可正常工作。当然我们也可将上面的 browser.min.js 文件保存到本地。



- **react.min.js** - React 的核心库
- **react-dom.min.js** - 提供与 DOM 相关的功能
- **browser.min.js** - 用于将 JSX 语法转换为 JavaScript 语法



### JSX语法

 HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 [JSX 的语法](http://facebook.github.io/react/docs/displaying-data.html#jsx-syntax)，它允许 HTML 与 JavaScript 的混写。

 JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析


所以在JSX中的html标签中添加JS类型的注释的方法： `{/**/}`



`ReactDOM.render()`：

render：给予, 粉刷, 呈送，渲染




### React组件

创建一个组件类，用于输出Hello React

1. React中创建的组件类以大写字母开头，驼峰命名法（用于区分html自带的标签）
2. 在React中使用`React.createClass`方法创建一个组件类
3. 核心代码：每个组件类都必须实现自己的`render`方法。输出定义好的组件模板。返回值：null、false、组件模板。
4. 注意：组件类只能包含一个顶层标签



###  React组件样式

组件的样式：

- 内联样式
- 对象样式
- 选择器样式

书写格式：

1. 以 , 结尾
2. HTML5中key、value都不加引号。React中属于JavaScript对象，key的名字不能出现 - ，需要使用驼峰命名法。如果value为字符串，则需要加引号。
3. HTML5中，value如果是数字，需要带单位。React中不需要带单位。

React 推荐使用内联样式。我们可以使用 camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px 。


### 复合组件



### props属性

props 是组件自身的属性，一般用于嵌套的内外层组件中，负责传递信息（通常是由父层组件向子层组件传递）

注意：props 对象中的属性与组件的属性一一对应，不要直接修改props中属性的值。



`...this.props`： props提供的语法糖，可以将父组件中的全部属性都复制给子组件。

需求：定义一个组件Link；Link组件中只包含一个 `<a>`，我们不给`<a>`设置任何属性，所有属性全部从父组件复制得到。



`this.props.children`：表示组件的所有子节点。



属性验证： propTypes

用于验证组件实例的属性是否复合要求。



设置组件属性的默认值：

通过实现组件的getDefaultProps方法，对属性设置默认值。



事件处理

react中的事件名称，首字母小写，驼峰命名法。



### state

状态机

当state发生变换时，会调用组件内部的render方法。



### 组件的生命周期

组件的生命周期可分为三个状态：

- Mounting：组件挂载，已插入真实 DOM
- Updating：组件更新，正在被重新渲染
- Unmounting：组件移除，已移出真实 DOM


React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
```
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
```

此外，React 还提供两种特殊状态的处理函数。
```
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```


详见：[React.Component - React](https://facebook.github.io/react/docs/react-component.html "React.Component - React")


组件的生命周期可以分为四个阶段：

创建、实例化、更新、销毁

#### Mounting 组件挂载

1. componentWillMount：组件将要挂载。在rander之前执行，但只执行一次，即使多次重复渲染该组件，或者改变了组件的state。
2. componentDidMount：组件已经挂载。在render之后执行，同一个组件重复渲染只执行一次。

#### Updating组件更新相关

1. componentWillReceiveProps(object nextProps)：已加载组件收到新的props之前调用，注意组件初始化渲染时则不会执行。
2. shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用（返回true则表示需要更新）。该接口实际是在组件接收到了新的 props 或者新的 state的时候会立即调用，然后调用下面两个方法。
3. componentWillUpdate(object nextProps,object nextState)：组件将要更新
4. componentDidUpdate(object prevProps, object nextState): 组件已经更新


#### Unmounting组件移除相关

1. componentWillUnmount：在组件要被移除之前的时间点触发，可以利用该方法来执行一些必要的清理。


#### 生命周期中与props和state相关
1. getDefaultProps ：设置props属性默认值
2. getInitialState ：设置state属性初始值




## React Native

该套课程只是简单的介绍React和React Native。

特点：
- 可以同时为IOS和Android开发
- 混合开发：React开发的模块可以和原生模块可以进行无缝链接。所以可以取其各自的优势相互取长补短。比如可以利用React Native进行UI部分的开发；原生主要负责交互处理和数据处理的部分。
- 高效的UI开发。组件化开发，复用性高，容易跨平台，自动匹配不同屏幕的手机。


缺点：安装包相对较大，运行速度相对来说慢一点。
