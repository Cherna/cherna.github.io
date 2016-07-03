var template = require('./alambres.jade');
var render = require('../../utils/render');

module.exports = function alambres (context, next) {
  render(context, template)
}