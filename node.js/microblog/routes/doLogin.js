var express = require('express');
var router = express.Router();

/* post */
router.post('/login', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
