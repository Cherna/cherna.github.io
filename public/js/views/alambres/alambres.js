var template = require('./alambres.pug');
var render = require('../../utils/render');

module.exports = function alambres (context, next) {
  render(context, template)
}