// Include page manager
var page = require('page');
// global script
var initScript = require('./utils/init-script');
// Views
var home = require('./views/home/home').homeEnter;
var homeExit = require('./views/home/home').homeExit;
var obra = require('./views/obra/obra');
var restos = require('./views/restos/restos');
var alambres = require('./views/alambres/alambres');
// Vendor global scripts
var pace = require('../vendor/pace.min');
var wow = require('../vendor/wow.min').WOW;

$(document).ready(function() {

  page.base('/#');

  page(function(context, next) {
    $('.pace-done, .pace-inactive').removeClass('pace-done pace-inactive');
    pace.once('done', function() {
      // console.log('done');
      $('.inner-body').removeClass('hide');
      new wow().init();
    });
    pace.start();
    next();
  });

  page.exit(function(context, next) {
    $('.inner-body').addClass('hide');
    next();
  });

  page('/', '/home');

  page('/home', home);
  page.exit('/home', homeExit);

  page('/works', '/home');

  page('/works/caves', restos);

  page('/works/inner-spaces', alambres);

  page();

  initScript();

});