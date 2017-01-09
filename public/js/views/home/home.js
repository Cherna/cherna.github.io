const template = require('./home.jade');
const render = require('../../utils/render');

function home (context, next) {
  render(context, template);
}

function homeExit (context, next) {
  next();
}

module.exports = {
  homeEnter: home,
  homeExit: homeExit
};