var fs = require('fs');

var visit = require('./visit');

/**
 * Sorts the files json with the visit function and then overwrites the file with sorted json
 * @see visit
 * @param {String|Array} absolutePaths   - String: Absolute path to json file to sort and overwrite
 *                                         Array: Absolute paths to json files to sort and overwrite
 * @param {Object} [options = {}]        - Optional parameters object, see visit for details
 * @returns {*}                          - Whatever is returned by visit
 */
function overwrite(absolutePaths, options) {
  absolutePaths = arrIfNot(absolutePaths);
  var results = absolutePaths.map(p => overwriteFile(p, options));
  return results.length > 1 ? results : results[0];
}

/**
 * Overwrite file with sorted json
 * @param {String} p                     - absolutePath
 * @param {Object} [options = {}]        - optional params
 * @returns {*}
 */
function overwriteFile(p, options) {
  var newData = null;
  try {
    newData = visit(JSON.parse(fs.readFileSync(p, 'utf8')), options);
  } catch (e) {
    console.error('Failed to retrieve json object from file');
    throw e;
  }
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

module.exports = overwrite;
