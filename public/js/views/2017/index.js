const template = require('./2017.pug');
const render = require('../../utils/render');

module.exports = function sculpture (context, next) {
  render(context, template);
}