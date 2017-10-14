var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/Category');


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
    *
    * 分页实现：
    * 利用 limit()和skip()方法
    * 跳过的页数 = （当前页 -1）* 每页显示的页数
    * */

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    User.count().then(function (count) {

        //计算总页数。ceil 为向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过 pages(总页数)
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page -1) * limit;


        User.find().limit(limit).skip(skip).then(function (users) {
            // console.log(users);
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                page:page,
                pages:pages,
                limit:limit,
                count:count
            });

        });
    });

});


/*
* 分类首页
* */
router.get('/category',function (req, res, next) {

    res.render('admin/category_index',{
        userInfo:req.userInfo
    })
});


/**
 * 分类的添加
 *
 * 以get方式访问，返回界面
 */
router.get('/category/add',function (req, res, next) {
    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
});


/**
 * 分类的保存
 *
 * 以post访问，则保存其提交过来的数据
 */
router.post('/category/add',function (req, res) {

    // console.log(req.body.name);

    var name = req.body.name || '';

    if (name == ''){ //这里没有利用ajax，所以当数据非法则直接返回一个错误页面
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名分类
    Category.findOne({
        name:name
    }).then(function (rs) {
        if (rs){
            //数据库中已经存在该分类
            res.render('admin/error',{
                userInfo:req.userInfo,
                message: "分类已经存在"
            })
        } else {
            //保存到数据库
            return new Category({
                name:name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'分类保存成功',
            url:'/admin/category'
        });
    })
});

module.exports = router;

