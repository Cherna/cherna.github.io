var express = require('express');
var app = express();
var router = express.Router();

router.get('*', function(req, res, next) {
  res.render('base/layout');
});

module.exports = router;