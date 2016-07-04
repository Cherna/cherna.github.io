function render (context, template, options) {
  var pathClass = context.path.split('/');
  
  $('.main-nav')
    .removeClass()
    .addClass('main-nav ' + pathClass[pathClass.length-1]);

  $('.main-content')
    .removeClass()
    .addClass('main-content ' + pathClass[pathClass.length-1])
    .html(template(options));
}

module.exports = render;