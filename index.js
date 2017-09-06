var fs = require('fs');

function visit(old, options) {
  options = options || {};
  var overwrite = options.overwrite;
  var absolutePaths = overwrite ? arrIfNot(old) : undefined;

  if (absolutePaths) {
    var results = absolutePaths.map(p => overwriteFile(p, options));
    return results.length > 1 ? results : results[0];
  }

  return visitRec(old, options);
}

function visitRec(old, options) {
    options = options || {};
    var ignoreCase = options.ignoreCase;
    var reverse = options.reverse;

    if (typeof(old) !== 'object' || old === null) {
        return old;
    }
    var copy = Array.isArray(old) ? [] : {};
    var keys = ignoreCase ?
      Object.keys(old).sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
      }) :
      Object.keys(old).sort();

    if (reverse) {
        keys = keys.reverse();
    }

    keys.forEach(function(key) {
        copy[key] = visitRec(old[key], options);
    });

    return copy;
}

function overwriteFile(p, options) {
  var newData = visitRec(require(p), options);
  var newJson = JSON.stringify(newData, null, 2);
  // append new line at EOF
  var content = newJson[newJson.length - 1] === '\n' ? newJson : newJson + '\n';
  fs.writeFileSync(p, content, 'utf8');
  return newData;
}

function arrIfNot(x) {
  if (Array.isArray(x)) {
    return x;
  }

  return [x];
}

module.exports = visit;
