function render (template, options) {
  $('.main-content').html(template({options}));
}

module.exports = render;