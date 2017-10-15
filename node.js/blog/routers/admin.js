var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/Category');
var Content = require('../models/Content');


// 避免非管理员通过直接输入地址的方式进入后台管理界面
// 访问 /admin 下的任何子目录都会执行该中间件
// 使用next()方法实现中间件
router.use(function (req, res, next) {
    if (req.userInfo.isAdmin) {
        next();
    } else {
        //非管理员
        res.send("<h1 style='color: red'>只有管理员才能进入后台管理界面</h1>");
        // next(new Error(req.userInfo.username + ", " + "sorry，你不是管理员。"))
    }
});


router.get('/', function (req, res, next) {
    // res.send('Admin - User');
    res.render('admin/index', {userInfo: req.userInfo})
});


//可以使用子路由
//这里路径为 /admin

/*
* 用户管理
* */

router.get('/user', function (req, res) {

    /*
    * 从数据库中读取所有的用户数据
    *
    * 分页实现：
    * 利用 limit()和skip()方法
    * 跳过的页数 = （当前页 -1）* 每页显示的页数
    * */


    //默认值为1
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    User.count().then(function (count) {

        //计算总页数。ceil 为向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过 pages(总页数)
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;


        User.find().limit(limit).skip(skip).then(function (users) {
            // console.log(users);
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                page: page,
                pages: pages,
                limit: limit,
                count: count,
                url:"/admin/user"
            });

        });
    });

});


/*
* 分类首页
* */
router.get('/category', function (req, res, next) {


    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Category.count().then(function (count) {

        //计算总页数。ceil 为向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过 pages(总页数)
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;


        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
            // console.log(categories);
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,
                page: page,
                pages: pages,
                limit: limit,
                count: count,
                url:"/admin/category"
            });

        });
    });

});


/**
 * 分类的添加
 *
 * 以get方式访问，返回界面
 */
router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
});


/**
 * 分类的保存
 *
 * 以post访问，则保存其提交过来的数据
 */
router.post('/category/add', function (req, res) {

    // console.log(req.body.name);

    var name = req.body.name || '';

    if (name == '') { //这里没有利用ajax，所以当数据非法则直接返回一个错误页面
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名分类
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            //数据库中已经存在该分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类已经存在"
            })
        } else {
            //保存到数据库
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    })
});


/**
 * 分类的修改
 *
 * 获取要修改的分类信息，并且用表单的形式展现出来
 */
router.get('/category/edit', function (req, res) {
    var id = req.query.id || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类信息不存在"
            });
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    })
});


/**
 * 分类修改的保存
 */
router.post('/category/edit', function (req, res) {
    //获取get提交的id
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';
    // console.log("post获得的分类 " + id + name);

    //需要进行判断
    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类信息不存在"
            });
            return Promise.reject();
            // return;

        } else {
            //当用户没有做任何的修改就提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: "修改成功",
                    url: '/admin/category'
                });
                return Promise.reject();
                // return;
            } else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {$ne: id}, //查询是否有 id与当前id不同，但名称却相同的数据
                    name: name
                });

            }
        }
    }).then(function (sameCategory) {

        if (sameCategory) {
            //已经存在同名的分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "数据库中已经存在同名分类"
            });
            return Promise.reject();
            // return;
        } else {
            //不存在，则保存修改
            // console.log("更新分类 " + id + name);
            return Category.update({
                _id: id
            }, {
                name: name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "修改成功",
            url: '/admin/category'
        });
    });
});


/**
 * 分类的删除
 */
router.get('/category/delete', function (req, res) {
    //获取get提交的id
    var id = req.query.id || '';

    //这里没有判断id是否存在，实际应用时考虑添加
    
    Category.remove({
        _id:id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "删除成功",
            url: '/admin/category'
        });
    })
});


/**
 * 内容首页
 */
router.get('/content',function (req, res) {

    //分页
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Content.count().then(function (count) {

        //计算总页数。ceil 为向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过 pages(总页数)
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        //因为Content关联了Category，所以我们可以使用populate将其数据一起带出
        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function (contents) {
            console.log(contents);

            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,
                page: page,
                pages: pages,
                limit: limit,
                count: count,
                url:"/admin/content"
            });

        });
    });


    // res.render('admin/content_index',{
    //     userInfo:req.userInfo,
    //     url:'/admin/content'
    // });
});


/**
 * 内容添加
 */
router.get('/content/add',function (req, res) {

    //读取分类信息
    Category.find().then(function (categories) {
        res.render('admin/content_add',{
            userInfo:req.userInfo,
            categories:categories
        });
    });

});


/**
 * 内容保存
 */
router.post('/content/add',function (req, res) {
    console.log(req.body);

    //只是简单的验证数据，还有很多漏洞
    if(req.body.categories == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"内容分类不能为空"
        });
        return;
    }

    if(req.body.title == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"内容标题不能为空"
        });
        return;
    }

    if(req.body.content == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"内容不能为空"
        });
        return;
    }

    //保存数据到数据库
    new Content({
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        content:req.body.content
    }).save().then(function (newContent) {
        if (newContent){
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:"内容保存成功"
            });
        }
    });
});



module.exports = router;

