#!/usr/bin/env node

/* eslint-disable no-use-before-define */

// Core dependencies
var path = require('path');
var _ = require('lodash');

// NPM dependencies
var sortJson = require('./');

// Get all the files
var files = process.argv.slice(0).filter(arg => arg.endsWith('.json') || arg.endsWith('.rc'));
var ignoreCase = _.includes(process.argv, '--ignore-case') || _.includes(process.argv, '-i');
var reverse = _.includes(process.argv, '--reverse') || _.includes(process.argv, '-r');

sortJson.overwrite(
  files.map(function (f) {
    return path.resolve(f);
  }),
  { ignoreCase, reverse }
);
