function render (context, template, options) {
  var pathClass = context.path.split('/');
  var classText = pathClass[pathClass.length-1];
  console.log(pathClass, classText);
  
  $('.main-nav')
    .removeClass()
    .addClass('main-nav ' + classText);

  $('.main-content')
    .removeClass()
    .addClass('main-content ' + classText)
    .html(template(options));
}

module.exports = render;