var express = require('express');
var router = express.Router();

//可以使用子路由
//这里路径为 /user
router.get('/',function (req, res, next) {
    // res.send(' 首页 ');
    res.render('main/index',{   //第二个参数中的数据用于分配给模板使用
        userInfo:req.userInfo
    });
});

module.exports = router;
