var express = require('express');
var router = express.Router();

var User = require('../models/user');


// 避免非管理员通过直接输入地址的方式进入后台管理界面
// 访问 /admin 下的任何子目录都会执行该中间件
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin){
        //非管理员
        res.send("<h1 style='color: red'>只有管理员才能进入后台管理界面</h1>");
    }
    next();
});



router.get('/',function (req, res, next) {
    // res.send('Admin - User');
    res.render('admin/index', {userInfo:req.userInfo})
});


//可以使用子路由
//这里路径为 /admin

/*
* 用户管理
* */

router.get('/user',function (req, res) {

    /*
    * 从数据库中读取所有的用户数据
    * */
    User.find().then(function (users) {
        // console.log(users);
        res.render('admin/user_index',{
            userInfo:req.userInfo,
            users:users
        });

    });

});

module.exports = router;

