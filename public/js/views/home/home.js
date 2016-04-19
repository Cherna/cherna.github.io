var template = require('./home.jade');
var render = require('../../utils/render');

var three = require('../../../vendor/three.min');
var orbitControls = require('../../../vendor/OrbitControls');
var subdivision = require('../../../vendor/SubdivisionModifier');
var custom3D = require('./home3.js');

function home (context, next) {
  render(template);
  custom3D();
}

module.exports = home;