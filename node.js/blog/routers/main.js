var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');


var data;

/**
 * 使用中间件处理通用数据
 */
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: [] //用于头部分类显示
    };

    Category.find().sort({_id: -1}).then(function (categories) {
        //读取所有的分类信息
        data.categories = categories;
    });
    next();
});


//可以使用子路由
//这里路径为 /user
router.get('/', function (req, res, next) {

    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;
    data.count = 0;
    data.contents = [];
    data.category = req.query.category || '';


    var where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).count().then(function (count) {
        data.count = count;
        //计算总页数。ceil 为向上取整
        data.pages = Math.ceil(count / data.limit);
        //取值不能超过 pages(总页数)
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        return Content.where(where)
            .find().sort({_id: -1}).limit(data.limit).skip(skip)
            .populate(['category', 'user']);

    }).then(function (contents) {
        data.contents = contents;
        // console.log(data);
        res.render('main/index', {data: data});
    })

});


/**
 * 内容详情页
 */
router.get('/view', function (req, res) {
    var contentid = req.query.contentid || '';

    Content.findOne({
        _id: contentid
    }).populate(['category', 'user']).then(function (content) {
        if (!content) {
            res.send("<h1>没有内容</h1>");
        } else {
            data.content = content;
            //在渲染之前，这样简单的增加阅读数，再保存即可
            content.views++;
            content.save();
            res.render('main/view', {data: data});

            // Content.update({
            //     _id:contentid
            // },{
            //     "$inc":{"views":1}
            // });
        }
    })
});


module.exports = router;
