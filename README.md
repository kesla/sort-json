sort-json
=========

It takes a JSON file and returns a copy of the same file, but with the sorted keys.

installation
------------

` [sudo] npm -g install sort-json`


usage
-----

```js
const sortJson = require('sort-json');

const options1 = { ignoreCase: true, reverse: true };
const copy = sortJson({ AA: 123, a: 1, b: 21 }, options1);
// copy => { b: 21, AA: 123, a: 1 }

sortJson.overwrite('some/absolute/path.json');
// sorts the json at absolute path and overwrites file, also returns sorted object

sortJson.overwrite(['some/absolute/path1.json', 'some/absolute/path2.json']);
// sorts the json at absolute paths and overwrites files, also returns array of sorted objects
```

CLI usage
---------
`sort-json file.json` => sorts and overwrites file.json

`-i` or `--ignore-case` to ignore case when sorting.

`-r` or `--reverse` to reverse order z -> a

tests
-----

`npm test`
