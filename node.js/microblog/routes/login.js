var express = require('express');
var router = express.Router();

/* GET */
router.get('/login', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
