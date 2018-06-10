const fs = require('fs');

const visit = require('./visit');

/**
 * Overwrite file with sorted json
 * @param {String} path                  - absolutePath
 * @param {Object} [options = {}]        - optional params
 * @returns {*}
 */
function overwriteFile(path, options) {
  let newData = null;
  try {
    newData = visit(JSON.parse(fs.readFileSync(path, 'utf8')), options);
  } catch (e) {
    console.error('Failed to retrieve json object from file');
    throw e;
  }
  const newJson = JSON.stringify(newData, null, 2);
  // append new line at EOF
  const content = newJson[newJson.length - 1] === '\n' ? newJson : `${newJson}\n`;
  fs.writeFileSync(path, content, 'utf8');
  return newData;
}

/**
 * Sorts the files json with the visit function and then overwrites the file with sorted json
 * @see visit
 * @param {String|Array} absolutePaths   - String: Absolute path to json file to sort and overwrite
 *                                         Array: Absolute paths to json files to sort and overwrite
 * @param {Object} [options = {}]        - Optional parameters object, see visit for details
 * @returns {*}                          - Whatever is returned by visit
 */
function overwrite(absolutePaths, options) {
  const paths = Array.isArray(absolutePaths) ? absolutePaths : [absolutePaths];
  const results = paths.map(path => overwriteFile(path, options));
  return results.length > 1 ? results : results[0];
}

module.exports = overwrite;
