var template = require('./about.pug');
var render = require('../../utils/render');

module.exports = function alambres (context, next) {
  render(context, template);
}