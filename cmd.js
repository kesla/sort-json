#!/usr/bin/env node

// Core dependencies
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

// NPM dependencies
var detectIndent = require('detect-indent');
var sortJson = require('./');

// Get all the files
var files = process.argv.slice(2);
var ignoreCase = _.includes(process.argv, '--ignore-case') || _.includes(process.argv, '-i');
var reverse = _.includes(process.argv, '--reverse') || _.includes(process.argv, '-r');

files.forEach(readEachFile);

function readEachFile(fileName) {
  var filePath = path.resolve(fileName);
  fs.readFile(filePath, 'utf8', readingFile);

  function readingFile(err, file) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Detect indentation if none is detectable fall back to two spaces
    var indent = detectIndent(file).indent || '  ';
    // Detect end of line if any
    var eol = /}(\r\n|\n|\r)$/.exec(file, 'gm');

    // Parse JSON
    var json;
    try {
      json = JSON.parse(file);
    } catch(err) {
      return console.error(err + ' => ' + filePath);
    }

    // Sorting
    var sortedObject = sortJson(json, { ignoreCase: ignoreCase, reverse: reverse });

    // Saving to file
    fs.writeFile(filePath, JSON.stringify(sortedObject, null, indent) + ((eol && eol.length === 2) ? eol[1] : ''), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
}
