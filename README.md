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
or if you want to sort by key ("id" for example):
`sort-json file.json -k id` or `sort-json file.json --key id`
The original file will be overwritten by a sorted JSON file, keeping the indentation of the original file.

tests
-----

`npm test`
