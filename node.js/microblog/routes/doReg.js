var express = require('express');
var router = express.Router();

/* post */
router.post('/reg', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
