var page = require('page');
// Views
var home = require('./views/home/home');
var restos = require('./views/restos/restos');
// Vendor global scripts
var pace = require('../vendor/pace.min');

$(document).ready(function() {

  page.base('/#');

  page('*', function(context, next) {
    console.log('all routes');
    console.log(pace);
    pace.start();
    next();
  });

  page('/', home);

  page('/restos', restos);

  page();

});