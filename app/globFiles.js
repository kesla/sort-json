/**
 * Takes in a list of file-paths and returns a list of filtered file-paths.
 * @param {String|Array} args   - String: path to json file to sort and overwrite
 *                              - Array: paths to json files to sort and overwrite
 * @returns {String[]}          - List of all json files that are included in the args
 */
async function globFiles(args) {
  return args.filter(arg => arg.endsWith('.json') || arg.endsWith('.rc'));
}

module.exports = globFiles;
