var template = require('./restos.pug');
var render = require('../../utils/render');

module.exports = function restos (context, next) {
  render(context, template)
}