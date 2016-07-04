function init () {
  $('.main-nav').on('click', '.nav-item', function(e) {
    var $clickedEl = $(e.target);

    if ( $clickedEl.hasClass('expand') || $clickedEl.hasClass('item-text') ) {
      var $link = $(e.target).closest('.nav-item');
      $link.toggleClass('expanded');
      $link.find('.inner-list').slideToggle();
    }
  });
}

module.exports = init;