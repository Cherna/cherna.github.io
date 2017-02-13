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
  var sideBar = $('#main-nav');
  sideBar.find('.selected').removeClass('selected');
  var parsedContext = parseContext(context);
  if (!parsedContext || !parsedContext.classText) { return; }
  sideBar.find('[data-btn-handle="' + parsedContext.classText.toLowerCase() + '"]').addClass('selected');
}

$(document).ready(() => {

  initScript();

  page.base('/#');

  page((context, next) => {
    document.title = getCurrentSafeTitle(context);
    initPace();
    selectSidebarItem(context);
    next();
  });

  page.exit((context, next) => {
    $('.inner-body').addClass('hide');
    next();
  });

  page('/', '/works/' + window.latestWorks);

  page('/works', '/home');

  page('/works/caves', restos);

  page('/works/inner-spaces', alambres);

  page('/works/sculpture', sculpture);

  // 404 handler
  page('*', () => {
    render('404', notFound);
  })

  page();

});