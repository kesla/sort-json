#!/usr/bin/env node

// Core dependencies
const path = require('path');

// NPM dependencies
const minimist = require('minimist');
const sortJson = require('./');
const globFiles = require('./globFiles');

const alias = {
  depth: ['d'],
  reverse: ['r'],
  ignoreCase: ['ignore-case', 'i'],
  indentSize: ['indent-size', 'spaces'],
  noFinalNewLine: ['no-final-newline', 'nn'],
};

(async () => {
  const argv = minimist(process.argv.slice(2), { alias });

  // Get all the files
  const files = await globFiles(argv._);

  sortJson.overwrite(files.map(file => path.resolve(file)), argv);
})();
