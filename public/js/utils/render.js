var parseContext = require('./parse-context');
function render (context, template, options) {
  var ctx = parseContext(context);
  console.log(ctx);
  
  $('.main-nav')
    .removeClass()
    .addClass('main-nav ' + ctx.classText);

  $('.main-content')
    .removeClass()
    .addClass('main-content ' + ctx.classText)
    .html(template(options));
}

module.exports = render;