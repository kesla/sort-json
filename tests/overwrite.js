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
});
