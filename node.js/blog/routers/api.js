var express = require('express');
var router = express.Router();


//统一返回格式
var responseData;

//TODO: 没有讲解
router.use(function (req, res, next) {
    responseData = {
        code:0,
        message: ""
    }
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
//这里路径为 /api/user
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

    responseData.code = 0;
    responseData.message = "注册成功";
    res.json(responseData);

});

module.exports = router;
