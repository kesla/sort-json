/**
 * Sorts the keys on objects
 * @param {*} old                           - An object to sort the keys of, if not object just
 *                                            returns whatever was given
 * @param {Object} [sortOptions = {}]           - optional parameters
 * @param [options.reverse = false]         - When sorting keys, converts all keys to lowercase so
 *                                            that capitalization doesn't interfere with sort order
 * @param [options.ignoreCase = false]      - When sorting keys, converts all keys to
 * @param [options.depth = Infinity]        - Depth's level sorting keys on a
 *                                            multidimensional object
 * @returns {*}                             - Object with sorted keys, if old wasn't an object
 *                                            returns whatever was passed
 */
function visit(old, options) {
  const sortOptions = options || {};

  const reverse = sortOptions.reverse || false;
  const depth = sortOptions.depth || Infinity;
  const level = sortOptions.level || 1;
  const processing = level <= depth;

  if (typeof (old) !== 'object' || old === null) {
    return old;
  }

  const copy = Array.isArray(old) ? [] : {};
  let keys = Object.keys(old);
  if (processing) {
    const sorter = (left, right, { ignoreCase, secondaryValueSort }) => {
      if (secondaryValueSort && old[left] instanceof Object && old[right] instanceof Object) {
        const sortedLeft = visit(old[left], options);
        const sortedRight = visit(old[right], options);

        if (ignoreCase) {
          return JSON.stringify(sortedLeft)
            .toLowerCase()
            .localeCompare(JSON.stringify(sortedRight).toLowerCase());
        }
        return JSON.stringify(sortedLeft).localeCompare(JSON.stringify(sortedRight));
      }

      if (ignoreCase) {
        return left.toLowerCase().localeCompare(right.toLowerCase());
      }

      return left.localeCompare(right);
    };
    keys.sort((left, right) => sorter(left, right, sortOptions));
  }

  if (reverse) {
    keys = keys.reverse();
  }

  keys.forEach((key) => {
    const subSortOptions = Object.assign({}, sortOptions);
    subSortOptions.level = level + 1;
    const sortedValue = visit(old[key], subSortOptions);

    if (Array.isArray(copy)) {
      copy.push(sortedValue);
    } else {
      copy[key] = sortedValue;
    }
  });

  return copy;
}

module.exports = visit;
