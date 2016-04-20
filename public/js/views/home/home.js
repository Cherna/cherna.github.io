var template = require('./home.jade');
var render = require('../../utils/render');

var three = require('../../../vendor/three.min');
var orbitControls = require('../../../vendor/OrbitControls');
var subdivision = require('../../../vendor/SubdivisionModifier');
var custom3D = require('./home3.js');

var randomInt = require('../../utils/random-int');

var quotes = require('./quotes.js');

function selectQuote (quotes) {
  var newInt = randomInt(0, quotes.length-1);
  return quotes[newInt];
}

function home (context, next) {
  render(context, template, { quote: selectQuote(quotes) });
  custom3D();
}

module.exports = home;