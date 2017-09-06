sort-json
=========

It takes a JSON file and returns a copy of the same file, but with the sorted keys.

installation
------------

` [sudo] npm -g install sort-json`


usage
-----

```js
var ignoreCase = false;

var sortJson = require('sort-json');

var copy = sortJson(object, ignoreCase);
```

CLI usage
---------
`sort-json file.json`

`-i` or `--ignore-case` to ignore case when sorting.

`-r` or `--reverse` to reverse order z -> a

tests
-----

`npm test`
