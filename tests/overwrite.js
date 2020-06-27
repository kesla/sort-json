/* eslint-disable */
'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sortJson = require('../');

const expect = chai.expect;
chai.use(dirtyChai);

const tempFile = path.resolve(__dirname, './temp_file_test.json');
const tempFile2 = path.resolve(__dirname, './temp_file_2_test.json');

afterEach(() => {
  try { fs.unlinkSync(tempFile); fs.unlinkSync(tempFile2) } catch (e) {}
});

describe('overwrite', () => {
  it('sorts file by keys', () => {
    const givenData = { foo: 123, bar: 456, baz: 789 };
    const expectedData = { bar: 456, baz: 789, foo: 123 };
    fs.writeFileSync(tempFile, JSON.stringify(givenData), 'utf8');
    sortJson.overwrite(tempFile);

    // parse then stringify to remove white space issues
    expect(JSON.stringify(JSON.parse(fs.readFileSync(tempFile, 'utf8')))).to.equal(JSON.stringify(expectedData));
  });

  it('sorts files by keys', () => {
    const givenData = { foo: 123, bar: 456, baz: 789 };
    const expectedData = { bar: 456, baz: 789, foo: 123 };
    fs.writeFileSync(tempFile, JSON.stringify(givenData), 'utf8');
    fs.writeFileSync(tempFile2, JSON.stringify(givenData), 'utf8');
    sortJson.overwrite([tempFile, tempFile2]);

    // parse then stringify to remove white space issues
    expect(JSON.stringify(JSON.parse(fs.readFileSync(tempFile, 'utf8')))).to.equal(JSON.stringify(expectedData));
    expect(JSON.stringify(JSON.parse(fs.readFileSync(tempFile2, 'utf8')))).to.equal(JSON.stringify(expectedData));
  });

  it('sorts file in reverse by keys if reverse enabled', () => {
    const givenData = { abc: 123, def: 456, hij: 789 };
    const expectedData = { hij: 789, def: 456, abc: 123 };

    fs.writeFileSync(tempFile, JSON.stringify(givenData), 'utf8');
    sortJson.overwrite(tempFile, { reverse: true });

    // parse then stringify to remove white space issues
    expect(JSON.stringify(JSON.parse(fs.readFileSync(tempFile, 'utf8')))).to.equal(JSON.stringify(expectedData));
  });

  it('sorts file by keys and ignores case if ignoreCase enabled', () => {
    const givenData = { foo: 123, bar: 456, baz: 789, Quax: 999, Foo2: 123 };
    const expectedData = { bar: 456, baz: 789, foo: 123, Foo2: 123, Quax: 999 };

    fs.writeFileSync(tempFile, JSON.stringify(givenData), 'utf8');
    sortJson.overwrite(tempFile, { ignoreCase: true });

    // parse then stringify to remove white space issues
    expect(JSON.stringify(JSON.parse(fs.readFileSync(tempFile, 'utf8')))).to.equal(JSON.stringify(expectedData));
  });

  it('persists the indentation when modifying the file', () => {
    const givenData = { foo: 123 };

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile);

    const result = fs.readFileSync(tempFile, 'utf8');
    expect(result).to.equal('{\n    "foo": 123\n}\n');
  });

  it('persists the \\n end-of-line marker when modifying the file', () => {
    const givenData = '{\n    "foo": 123,\n    "bar": 456\n}\n';

    fs.writeFileSync(tempFile, givenData, 'utf8');
    sortJson.overwrite(tempFile);

    const result = fs.readFileSync(tempFile, 'utf8');
    expect(result).to.equal('{\n    "bar": 456,\n    "foo": 123\n}\n');
  });

  it('persists the \\r\\n end-of-line marker when modifying the file', () => {
    const givenData = '{\r\n    "foo": 123,\r\n    "bar": 456\r\n}\r\n';

    fs.writeFileSync(tempFile, givenData, 'utf8');
    sortJson.overwrite(tempFile);

    const result = fs.readFileSync(tempFile, 'utf8');
    expect(result).to.equal('{\r\n    "bar": 456,\r\n    "foo": 123\r\n}\r\n');
  });

  it('does not insert an end-of-line marker if noFinalNewLine is enabled', () => {
    const givenData = { foo: 123 };

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { noFinalNewLine: true });

    const result = fs.readFileSync(tempFile, 'utf8');
    expect(result).to.equal('{\n    "foo": 123\n}');
  });
  it('sorts an array of objects in ascending order with the specified key', () => {

    const givenData = [{ _id: 'chips' }, { _id: 'arm' }, { _id: 'very good trip' }];
    const expectedData = [ { _id: 'arm' }, { _id: 'chips' }, { _id: 'very good trip' }];

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');

    sortJson.overwrite(tempFile, { key: '$._id' });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts an array of objects in descending order with the specified key', () => {

    const givenData = [
      { _id: 'arm' },
      { _id: 'chips' },
      { _id: 'very good trip' }
    ];
    const expectedData = [
      { _id: 'very good trip' },
      { _id: 'chips' },
      { _id: 'arm' }
    ];

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '$._id', DESC: true });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts a nested array in an array of objects in ascending order with the specified key', () => {

    const givenData = [
      {
        _id: [
          { nested: 'chips' },
          { nested: 'very good trip' },
          { nested: 'arm' }
        ]
      }
    ];
    const expectedData = [
      {
        _id: [
          { nested: 'arm' },
          { nested: 'chips' },
          { nested: 'very good trip' },
        ]
      }
    ];

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '$._id.$.nested', DESC: false });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts an array of objects in an object in ascending order with the specified key', () => {

    const givenData = {
      lola: 'test',
      a: 'test',
      _id: [
        { nested: 'chips' },
        { nested: 'very good trip' },
        { nested: 'arm' }
      ]
    }
    const expectedData = {
      _id: [
        { nested: 'arm' },
        { nested: 'chips' },
        { nested: 'very good trip' },
      ],
      a: 'test',
      lola: 'test'
    }

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '_id.$.nested', DESC: false });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts an array of numbers in ascending order', () => {

    const givenData = [ 10, 9, 6, 5, 2, 1, 3 ]
    const expectedData = [ 1, 2, 3, 5, 6, 9, 10 ]

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '$.', DESC: false });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts an array of numbers in descending order', () => {

    const givenData = [ 10, 9, 6, 5, 2, 1, 3 ]
    const expectedData = [ 10, 9, 6, 5, 3, 2, 1 ]

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '$.', DESC: true });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
  it('sorts an array of strings in ascending order', () => {

    const givenData = [ 'world', 'hello', 'we', 'are', 'your', 'friends' ]
    const expectedData = [ 'are', 'friends', 'hello', 'we', 'world', 'your' ]

    fs.writeFileSync(tempFile, JSON.stringify(givenData, null, 4), 'utf8');
    sortJson.overwrite(tempFile, { key: '$.', DESC: false });

    const result = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    expect(result).deep.equal(expectedData);
  });
});
