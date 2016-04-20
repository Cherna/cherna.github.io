var template = require('./obra.jade');
var render = require('../../utils/render');

module.exports = function obra (context, next) {
  render(context, template)
}