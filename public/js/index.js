// Include page manager
const page = require('page');

// Global script
const initScript = require('./utils/init-script');

// Views
const notFound = require('./views/base/notfound.pug');
const obra = require('./views/obra/obra');
const restos = require('./views/restos/restos');
const alambres = require('./views/alambres/alambres');
const sculpture = require('./views/sculpture/sculpture');
const about = require('./views/about/about');

// Vendor global scripts
const pace = require('../vendor/pace.min');
const wow = require('../vendor/wow.min').WOW;
const getCurrentSafeTitle = require('./utils/get-title');

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

$(document).ready(() => {

  initScript();

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

  page('/', '/works/' + window.__latestWorks);

  page('/works', '/home');

  page('/works/caves', restos);

  page('/works/inner-spaces', alambres);

  page('/works/sculpture', sculpture);

  page('/about', about);

  // 404 handler
  page('*', () => {
    render('404', notFound);
  })

  page();

});