var page = require('page');
// Views
var home = require('./views/home/home').homeEnter;
var homeExit = require('./views/home/home').homeExit;
var obra = require('./views/obra/obra');
var restos = require('./views/restos/restos');
var alambres = require('./views/alambres/alambres');
// Vendor global scripts
var pace = require('../vendor/pace.min');

$(document).ready(function() {

  page.base('/#');

  page(function(context, next) {
    $('.pace-done, .pace-inactive').removeClass('pace-done pace-inactive');
    pace.start();
    pace.on('done', function() {
      console.log('done');
      $('.inner-body').removeClass('hide');
    })
    next();
  });

  page.exit(function(context, next) {
    pace.off('done');
    $('.inner-body').addClass('hide');
    next();
  });

  page('/', '/home');

  page('/home', home);
  page.exit('/home', homeExit);

  page('/obra', obra);

  page('/obra/restos', restos);

  page('/obra/alambres', alambres);

  page();

});