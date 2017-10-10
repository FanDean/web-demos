var express = require('express');
var router = express.Router();

//可以使用子路由
//这里路径为 /user
router.get('/',function (req, res, next) {
    res.send(' 首页 ');
});

module.exports = router;
