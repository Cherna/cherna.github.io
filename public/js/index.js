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
    $('.main-content').hide();
    pace.start();
    pace.on('done', function() {
      $('.main-content').fadeIn(1000);
    })
    next();
  });

  page('/', home);

  page('/restos', restos);

  page();

});