var express = require('express');
var router = express.Router();
var User = require('../models/user');


//统一返回格式
var responseData;

//TODO: 没有讲解
router.use(function (req, res, next) {
    responseData = {
        code:0,
        message: ""
    };
    next();
});


/*
 *  对用户提交的数据进行简单的验证
 *  1. 用户名不能为空
 *  2. 密码不能为空
 *  3. 两次输入的密码必须一致
 *
 *  1.用户是否已经被注册
 *      数据库查询
 */

//可以使用子路由
//这里路径为 /api/user/
//注意这里需要是 post 方法，而非get方法
router.post('/user/register',function (req, res, next) {
    // res.send('api - User');
    // console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户是否为空
    if (username == ""){
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;
    }


    //密码是否为空
    if(password == ""){
        responseData.code = 2;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
    }

    //两次输入的密码不一致
    if (password != repassword){
        responseData.code = 3;
        responseData.message = "两次输入的密码不一致";
        res.json(responseData);
        return;
    }


    // 用户是否已经被注册。这里需要将该语句放在最后
    // findOne()返回一个 promise 对象
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo){
            //表示数据库中有该记录
            responseData.code = 4;
            responseData.message = "用户名已经被注册";
            res.json(responseData);
            return;
        }

        //保存用户注册的信息到数据库中
        var user = new User({
            username:username,
            password:password
        });
        console.log("执行user.save()前");
        //保存成功后，依旧会返回一个 promise对象，可以继续使用 then
        return user.save();

    }).then(function (newUserInfo) {
        //这里比较怪异；当重复用户名时，这句还是会输出，但下面的语句不会执行。
        console.log("执行user.save()后的then方法：" + newUserInfo);
        responseData.message = "注册成功";
        res.json(responseData);
        console.log("发送：注册成功");
    });

});



/*
 * 登录
 */
router.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "" || password == ""){
        responseData.code =1;
        responseData.message = "用户名或密码不能为空";
        res.json(responseData);
        return;
    }


    //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
    User.findOne({ //查询条件同时为用户名和密码
        username:username,
        password:password
    }).then(function (userInfo) {
        if (!userInfo){
            responseData.code = 2;
            responseData.message = "用户名或密码错误";
            res.json(responseData);
            return;
        }

        //用户登录成功
        responseData.code = 0;
        responseData.message = "登录成功";
        //TODO 为responseData随时添加的值
        responseData.userInfo = {
            _id:userInfo.id,
            username: userInfo.username
        };
        res.json(responseData);
        return;

    })
});


module.exports = router;
