var template = require('./2016.pug');
var render = require('../../utils/render');

module.exports = function year2016 (context, next) {
  render(context, template);
}