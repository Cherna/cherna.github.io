const template = require('./sculpture.pug');
const render = require('../../utils/render');
const createSlider = require('../../utils/createSlider');

module.exports = function sculpture (context, next) {
  render(context, template);

  const $section = $('#sculpture');
  createSlider($section.find('.image-slider .image-box-inner'));
}