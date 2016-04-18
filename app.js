var express = require('express');
var app = express();
var routes = require('./routes/routes.js');
var port = process.env.PORT || 3000;

app.use(routes);

app.set('view engine', 'jade');
app.use(express.static('dist'));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

app.listen(port, function () {
  console.log('Listening on port 3000. Do as you will...');
});