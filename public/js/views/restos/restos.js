var template = require('./restos.jade');
var render = require('../../utils/render');

module.exports = function restos (context, next) {
  render(template)
}