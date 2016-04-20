var page = require('page');
// Views
var home = require('./views/home/home');
var obra = require('./views/obra/obra');
var restos = require('./views/obra/restos/restos');
// Vendor global scripts
var pace = require('../vendor/pace.min');

$(document).ready(function() {

  page.base('/#');

  page(function(context, next) {
    pace.start();
    pace.on('done', function() {
      console.log('done');
      $('.inner-body').removeClass('hide');
    })
    next();
  });

  page.exit(function(context, next) {
    $('.inner-body').addClass('hide');
    next();
  });

  page('/', '/home');

  page('/home', home);

  page('/obra', obra);

  page('/obra/restos', restos);

  page();

});