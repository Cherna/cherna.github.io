const mappings = require('./title-mappings');
const parseContext = require('./parse-context');
function getCurrentTitle (context) {
  var parsedContext = parseContext(context);

  var mappingIndex = Object.keys(mappings).find((val) => {
    return val == parsedContext.classText;
  });

  return `${mappings[mappingIndex]} - Tomas Chernov`;
}

module.exports = getCurrentTitle;