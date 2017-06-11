var template = require('./2016.pug');
var render = require('../../utils/render');

module.exports = function alambres (context, next) {
  render(context, template);
}