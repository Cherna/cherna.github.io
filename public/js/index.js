var page = require('page');
var $ = require('jquery');
// Views
var home = require('./views/home/home');
var restos = require('./views/restos/restos');

$(document).ready(function() {

  page.base('/#');

  page('/', home);

  page('/restos', restos);

  page();

});