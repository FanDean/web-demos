/*
* 应用程序的入口（启动）文件
* */

//加载express模块
var express = require('express');

//加载模板
var swig = require('swig');
//加载 path
var path = require('path');
//加载数据库模块
var mongoose = require('mongoose');
//加载 body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var cookies = require('cookies');
//获取user模型
var User = require('./models/User');

//创建 app 应用  => Node.js createrServer();
var app = express();

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀
//第二个参数: 表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是 views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数固定，第二个参数为上面 app.engine方法中定义的模板引擎的名称
app.set('view engine', 'html');
//在开发过程中需要取消模板缓存
swig.setDefaults({cache:false});


//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应 __dirname + '/public' 下的文件
// app.use('public',express.static(__dirname + '/public'));
//新方法
app.use(express.static(path.join(__dirname, 'public')));


//bodyparser设置
//使用该方法返回的中间件。 Returns middleware that only parses urlencoded bodies.
//参数 extended的作用
app.use(bodyParser.urlencoded({extended:true}));


//设置cookie
app.use(function (req, res, next) {
    //通过cookies的方法将cookie加载进req对象中
    req.cookies = new cookies(req,res);

    //处理请求中的cookies。（在服务器向客户端发送过cookies后）

    //利用这种方法判断userInfo的类型，再考虑如何解析
    // console.log(typeof req.cookies.get('userInfo'));

    //在很多地方需要用户信息，所以我们最好将用户信息保存在一个全局对象中
    //这里我们可以选择在 req 中增加一个属性，用来保存这些信息
    req.userInfo = {};

    //解析登录用户的cookies信息
    if (req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录的用户是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e){
            next();
        }
    } else {
        next();
    }

});

/*
 * req request对象
 * res response对象
 * next
 */
// app.get('/',function (req,res,next) {
//     // res.send('<h1>欢迎光临我的博客</h1>');
//
//     //
//     // 读取views目录下的指定文件，解析并返回给客户端
//     // 第一个参数：表示模板的文件，相对于views目录
//     // 第二个参数：传递给模板使用的数据
//     //
//     res.render('index');
// })


//手动处理css等静态文件
//但是这样太过麻烦，对于静态文件只需要请求时原封不动的返回即可，所以express为我们提供了一个中间件
/*
app.get('/main.css',function (req,res,next) {
    //默认发送的是html文件，需要改为 css 类型
    res.setHeader('content-type','text/css');
    res.send("body {background: red;}");
})
*/


/*
 * 根据不同的功能划分模块
 */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));




// 连接到blog数据库
// mongoose.connect('mongodb://127.0.0.1:27017/blog',function (err) {
//     if (err){
//         console.log('数据库连接失败');
//     } else {
//         console.log('数据库连接成功');
//         //只有数据库连接成功才开始监听
//         app.listen(8081);
//     }
// });

// 连接到blog数据库
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useMongoClient: true
});
promise.then(function (db) {
    if (db){
        console.log('数据库连接成功');
        //只有数据库连接成功才开始监听
        app.listen(8081);
    } else {
        console.log('数据库连接失败');
    }
});

