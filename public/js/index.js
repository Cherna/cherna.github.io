// Global
const $ = require('jquery');
const page = require('page');
const wow = require('wowjs').WOW;
const pace = require('pace-js');
const initScript = require('./utils/init-script');
const getCurrentSafeTitle = require('./utils/get-title');

// Views
const notFound = require('./views/base/notfound.pug');
const year2016 = require('./views/2016');
const year2017 = require('./views/2017');
const about = require('./views/about');

// Helpers
const render = require('./utils/render');
const parseContext = require('./utils/parse-context');

function initPace () {
  $('.pace-done, .pace-inactive').removeClass('pace-done pace-inactive');
  pace.once('done', function() {
    $('.inner-body').removeClass('hide');
    new wow().init();
  });
  pace.start();
}

function selectSidebarItem (context) {
  const sideBar = $('#main-nav');
  sideBar.find('.selected').removeClass('selected');
  const parsedContext = parseContext(context);
  if (!parsedContext || !parsedContext.classText) { return; }
  sideBar.find('[data-btn-handle="' + parsedContext.classText.toLowerCase() + '"]').addClass('selected');
}

function closeSidebar () {
  const mobileNav = $('#mobile-nav');
  mobileNav.removeClass('mobile-open');
}

function fullScreenImg () {
  const $fullScreenImgCont = $('.full-screen-image-container');
  $('html').on('click', function(e) {
    if (!$fullScreenImgCont.hasClass('img-open')
        && e.target
        && ($(e.target).hasClass('image-wrapper')
        || $(e.target).hasClass('image-box-img')))
    {
      $fullScreenImgCont.empty();
      $(e.target)
        .clone()
        .appendTo($fullScreenImgCont);
      $fullScreenImgCont.addClass('img-open');
    } else if ($fullScreenImgCont.hasClass('img-open')) {
      $fullScreenImgCont.empty().removeClass('img-open');
    }
  });
}

$(document).ready(() => {
  initScript();
  fullScreenImg();

  page.base('/#');

  page((context, next) => {
    document.title = getCurrentSafeTitle(context);
    initPace();
    selectSidebarItem(context);
    closeSidebar();
    next();
  });

  page.exit((context, next) => {
    $('.inner-body').addClass('hide');
    next();
  });

  // Latest year of works
  page('/', '/works/2017');
  // Redirect generic works to latest
  page('/works', '/#');
  // Works pages
  page('/works/2017', year2017);
  page('/works/2016', year2016);
  // Other pages
  page('/about', about);

  // 404 handler
  // Executes when no other route was found
  page('*', () => {
    render('404', notFound);
  })

  page();

});