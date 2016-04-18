var $ = require('jquery');
var template = require('../../../views/home.jade');
var three = require('../../vendor/three.min.js');

var home = function (context, next) {
  console.log(three);
  // $('canvas').hide();
  $('body').append(template());
  console.log(template());
  console.log('home');
  console.log(context);
}

module.exports = home;