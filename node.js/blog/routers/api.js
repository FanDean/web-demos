var express = require('express');
var router = express.Router();

//可以使用子路由
//这里路径为 /api/user
router.get('/user',function (req, res, next) {
    res.send('api - User');
});

module.exports = router;
