var express = require('express');
var router = express.Router();

/* post . */
router.post('/post', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
