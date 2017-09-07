#!/usr/bin/env node

// Core dependencies
var fs = require('fs');
var path = require('path');

// NPM dependencies
var detectIndent = require('detect-indent');
var sortJson = require('./');

// Get all the files
var files = process.argv.splice(2, 3);
var key = null;

for (var x = 0; x < files.length; x++){
  if (files[x] === "-k" || files[x] === '--key'){
    if (files.length !== x + 2){
      console.log("error: no key was given, ignoring the flag");
      files.pop();
      break;
    } else {
      key = files.pop();
      files.pop();
      break;
    }
  }
}

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
    var sortedObject = sortJson(json, key);

    // Saving to file
    fs.writeFile(filePath, JSON.stringify(sortedObject, null, indent) + ((eol && eol.length === 2) ? eol[1] : ''), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
}
