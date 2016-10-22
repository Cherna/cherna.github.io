function parseContext(context) {
  var pathClass = context.path.split('/');
  return {
    pathClass: pathClass,
    classText: pathClass[pathClass.length-1]
  }
}

module.exports = parseContext;