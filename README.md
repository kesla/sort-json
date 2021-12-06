# sort-json [![Build Status](https://travis-ci.org/kesla/sort-json.svg?branch=master)](https://travis-ci.org/kesla/sort-json)

It takes a JSON file and returns a copy of the same file, but with the sorted keys.

## Installation

`[sudo] npm -g install sort-json`

## Usage

```js
const sortJson = require('sort-json');

const options = { ignoreCase: true, reverse: true, depth: 1};
const copy = sortJson({ AA: 123, a: 1, b: 21 }, options);
// copy => { b: 21, AA: 123, a: 1 }

sortJson.overwrite('some/absolute/path.json', options);
// sorts the json at absolute path and overwrites file, also returns sorted object

sortJson.overwrite(['some/absolute/path1.json', 'some/absolute/path2.json'], options);
// sorts the json at absolute paths and overwrites files, also returns array of sorted objects
```

## CLI usage

`sort-json [options] [filenames]`
Sorts and overwrites .json or .rc files.

_Example_
`sort-json --ignore-case test.json`

### Options

`--ignore-case, -i`\
Ignore case when sorting.

`--reverse, -r`\
Reverse the ordering z -> a

`--depth=DEPTH, -d`\
The sorting _DEPTH_ on multidimensional objects.
Use a number greater then 0 for the _DEPTH_ value.

`--indent-size=SIZE, --spaces=SIZE`\
Formats the file content with an indentation of _SIZE_ spaces  (default: detects the used indentation of the file).
Use a number greater then 0 for the _SIZE_ value.

`--no-final-newline, -nn`\
No final new line will be added to the end of the file.

### Files

List of json files that should be sorted.
The paths can be absolute or relative to the current directory.

Filenames must end with `.json` or `.rc`. All other files are ignored.

## Upgrade to version 2.x

sort-json 2.0.0 will create a different output when the source JSON file does not use an indent size of 2 spaces.
Use `--indent-size=2` to always create an output file with 2 spaces.

## Tests

`npm test`
