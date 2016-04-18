var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('../public/js/views/base/layout');
});

module.exports = router;