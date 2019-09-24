const template = require('./2017.pug');
const render = require('../../utils/render');

module.exports = function year2017 (context, next) {
  render(context, template);
}