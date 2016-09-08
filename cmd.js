#!/usr/bin/env node

// Core dependencies
var fs = require('fs');
var path = require('path');

// NPM dependencies
var detectIndent = require('detect-indent');
var sortJson = require('./');

// Get all the files
var files = process.argv.slice(2);

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
    var sortedObject = sortJson(json);

    // Saving to file
    fs.writeFile(filePath, JSON.stringify(sortedObject, null, indent) + ((eol && eol.length === 2) ? eol[1] : ''));
  }
}
