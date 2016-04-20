function render (context, template, options) {
  var pathClass = context.path.split('/');
  $('.main-content')
    .removeClass()
    .addClass('main-content ' + pathClass[pathClass.length-1])
    .html(template(options));
}

module.exports = render;