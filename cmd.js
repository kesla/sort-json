#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var detectIndent = require('detect-indent');

var filename = path.resolve(process.argv[2]);
var file = fs.readFileSync(filename, 'utf8');

// Try to detect the indentation and fall back to two spaces if unable.
var indent = detectIndent(file).indent || '  ';

var json = JSON.parse(file);

var visit = require('./');

var result = visit(json);

fs.writeFile(filename, JSON.stringify(result, null, indent));
