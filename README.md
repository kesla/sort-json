sort-json
=========

It takes a JSON file and returns a copy of the same file, but with the sorted keys.

installation
------------

` [sudo] npm -g install sort-json`


usage
-----

```js
var sortJson = require('sort-json');

var copy = sortJson(object);
```

CLI usage
---------
`sort-json file.json`

For now sort-json takes no other arguments, so the original file will be overwritten by a sorted JSON file, keeping the indentation of the original file.

tests
-----

`npm test`
