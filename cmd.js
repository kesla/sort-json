#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var filename = path.resolve(process.argv[2]);

var json = require(filename);

function visit(old) {
    if (Array.isArray(old) || typeof(old) !== 'object') {
        return old;
    }
    var sorted = {};
    var keys = Object.keys(old).sort();
    keys.forEach(function(key) {
        sorted[key] = visit(old[key]);
    });
    return sorted;
}

var result = visit(json);

fs.writeFile(filename, JSON.stringify(result, null, '  '));