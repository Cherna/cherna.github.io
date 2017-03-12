const template = require('./sculpture.pug');
const render = require('../../utils/render');

module.exports = function sculpture (context, next) {
  render(context, template)
}