var express = require('express');
var router = express.Router();

/* GET  */
router.get('/reg', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
