function init () {
  // Set latest works
  window.latestWorks = "sculpture";

  // Nav functionality
  const $mobileNav = $('#mobile-nav');
  const $hamburgerIcon = $('.hamburger-cont');
  $hamburgerIcon.on('click', (e) => {
    $mobileNav.toggleClass('mobile-open');
  });
}

module.exports = init;