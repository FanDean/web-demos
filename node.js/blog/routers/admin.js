var express = require('express');
var router = express.Router();

//可以使用子路由
//这里路径为 /admin/user
router.get('/user',function (req, res, next) {
    res.send('Admin - User');
});

module.exports = router;

