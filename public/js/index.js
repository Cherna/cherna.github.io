var page = require('page');
var $ = require('jquery');
// Views
var home = require('./views/home');
var restos = require('./views/restos');

$(document).ready(function() {

  page.base('/#');

  page('/', home);

  page('/restos', restos);

  page();

});