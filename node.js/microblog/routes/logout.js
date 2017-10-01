var express = require('express');
var router = express.Router();

/* GET  */
router.get('/logout', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
