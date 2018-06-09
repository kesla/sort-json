#!/usr/bin/env node

/* eslint-disable no-use-before-define */

// Core dependencies
const path = require('path');
const _ = require('lodash');

// NPM dependencies
const sortJson = require('./');

// Get all the files
const files = process.argv.slice(0).filter(arg => arg.endsWith('.json') || arg.endsWith('.rc'));
const ignoreCase = _.includes(process.argv, '--ignore-case') || _.includes(process.argv, '-i');
const reverse = _.includes(process.argv, '--reverse') || _.includes(process.argv, '-r');
const dirtyDepth = process.argv.slice(0).filter(arg => arg.startsWith('-d') || arg.startsWith('--depth'));
const depth = dirtyDepth.length > 0 ? parseInt(dirtyDepth[0].split('=')[1], 10) : Infinity;

sortJson.overwrite(
  files.map(file => path.resolve(file)),
  { ignoreCase, reverse, depth }
);
