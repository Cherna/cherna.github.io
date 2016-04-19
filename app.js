var express = require('express');
var app = express();
var routes = require('./routes/routes.js');
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.set('views', 'public/js/views');
app.use(express.static('dist'));

app.use(routes);

app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

app.listen(port, function () {
  console.log('Listening on port ' + port + '. Do as you will...');
});