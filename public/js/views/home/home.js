var $ = require('jquery');
var template = require('./home.jade');
var three = require('../../../vendor/three.min');
var orbitControls = require('../../../vendor/OrbitControls');
var subdivision = require('../../../vendor/SubdivisionModifier');
var custom3D = require('./home3.js');

var home = function (context, next) {
  console.log(custom3D);
  custom3D();
  $('.main-content').append(template());
  console.log(template());
  console.log('home');
  console.log(context);
}

module.exports = home;