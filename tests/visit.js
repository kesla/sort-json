const chai = require('chai');
const dirtyChai = require('dirty-chai');
const visit = require('../index');

const expect = chai.expect;
chai.use(dirtyChai);

describe('visit', () => {
  it('returns undefined for undefined', () => {
    expect(visit(undefined)).to.be.undefined();
  });

  it('does not change array order', () => {
    const givenData = [1, 5, 2, -1, 3];

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(givenData));
  });

  it('sorts object by keys', () => {
    const givenData = { foo: 123, bar: 456, baz: 789 };
    const expectedData = { bar: 456, baz: 789, foo: 123 };

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('sorts nested object', () => {
    const givenData = {
      foo: [1, 2, 5, 2],
      bar: {
        foo: 3,
        bar: 'lorem ipsum',
        baz: [1, { foo2: 444 }],
      },
      foo2: '',
      bar2: null,
    };
    const expectedData = {
      bar: {
        bar: 'lorem ipsum',
        baz: [1, { foo2: 444 }],
        foo: 3,
      },
      bar2: null,
      foo: [1, 2, 5, 2],
      foo2: '',
    };

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns empty object for empty object', () => {
    const givenData = {};
    const expectedData = {};

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns empty array for empty array', () => {
    const givenData = [];
    const expectedData = [];

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns null for null', () => {
    const givenData = null;
    const expectedData = null;

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns true for true', () => {
    const givenData = true;
    const expectedData = true;

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns false for false', () => {
    const givenData = false;
    const expectedData = false;

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns number for number', () => {
    const givenData = 123;
    const expectedData = 123;

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });

  it('returns string for string', () => {
    const givenData = 'foo';
    const expectedData = 'foo';

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });
});
