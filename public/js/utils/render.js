const parseContext = require('./parse-context');
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

  $('.main-content')
    .removeClass()
    .addClass('main-content ' + ctx.classText)
    .html(template(options));

  $('html, body').scrollTop(0);
}

module.exports = render;