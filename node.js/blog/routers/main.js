var express = require('express');
var router = express.Router();

var Category = require('../models/Category');


//可以使用子路由
//这里路径为 /user
router.get('/',function (req, res, next) {
    //读取所有的分类信息
    //sort进行排序，默认的id中包含了时间戳，所以生成的id应该是递增的。-1表示降序
    Category.find().sort({_id:-1}).then(function (categories) {

            res.render('main/index',{
                userInfo:req.userInfo,
                categories:categories
            });

    })

});

module.exports = router;
