var template = require('./obra.pug');
var render = require('../../utils/render');

module.exports = function obra (context, next) {
  render(context, template)
}