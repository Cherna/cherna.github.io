var template = require('./sculpture.pug');
var render = require('../../utils/render');

module.exports = function sculpture (context, next) {
  render(context, template)
}