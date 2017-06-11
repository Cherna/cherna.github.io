const parseContext = require('./parse-context');
const createSlider = require('./createSlider');

function render (context, template, options) {
  let ctx = {};
  if (typeof context === 'string') {
    ctx.classText = context;
  } else {
    ctx = parseContext(context);
  }
  
  $('.main-nav')
    .removeClass()
    .addClass('main-nav ' + ctx.classText);

  const $mainContent = $('.main-content');
  $mainContent
    .removeClass()
    .addClass('main-content ' + ctx.classText)
    .html(template(options))
  
  const $contentCarousels = $mainContent.find('[data-carousel]');
  if ($contentCarousels.length) {
    $contentCarousels.each((i, el) => {
      createSlider($(el).find('.image-box-inner'));
    });
  }

  $('html, body').scrollTop(0);
}

module.exports = render;