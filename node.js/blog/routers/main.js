var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');


//可以使用子路由
//这里路径为 /user
router.get('/',function (req, res, next) {

    var data = {
        userInfo:req.userInfo,
        categories:[], //用于头部分类显示
        page:Number(req.query.page || 1),
        limit:5,
        pages:0,
        count:0,
        contents:[],
        category:req.query.category || ''
    };

    var where = {};
    if (data.category){
        where.category = data.category
    }

    Category.find().sort({_id:-1}).then(function (categories) {
        //读取所有的分类信息
        data.categories = categories;
        //读取内容数
        return Content.where(where).count();
    }).then(function (count) {
        data.count = count;
        //计算总页数。ceil 为向上取整
        data.pages = Math.ceil(count / data.limit);
        //取值不能超过 pages(总页数)
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        return Content.where(where).find().sort({_id:-1}).limit(data.limit).skip(skip).populate(['category','user']);
    }).then(function(contents) {
        data.contents = contents;
        console.log(data);
        res.render('main/index', {data:data});
    })

});

module.exports = router;
