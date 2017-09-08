/**
 * Sorts the keys on objects
 * @param {*} old                           - An object to sort the keys of, if not object just
 *                                            returns whatever was given
 * @param {Object} [options = {}]           - optional parameters
 * @param [options.reverse = false]         - When sorting keys, converts all keys to lowercase so
 *                                            that capitalization doesn't interfere with sort order
 * @param [options.ignoreCase = false]      - When sorting keys, converts all keys to
 * @returns {*}                             - Object with sorted keys, if old wasn't an object
 *                                            returns whatever was passed
 */
function visit(old, options) {
  options = options || {};
  var ignoreCase = options.ignoreCase || false;
  var reverse = options.reverse || false;

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

  keys.forEach(function (key) {
    copy[key] = visit(old[key], options);
  });

  return copy;
}

module.exports = visit;
