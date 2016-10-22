const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;
const visit = require('./index');

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
    const givenData = { foo: 123, bar: 456, baz: 789};
    const expectedData = { bar: 456, baz: 789, foo: 123};

    expect(JSON.stringify(visit(givenData))).to.equal(JSON.stringify(expectedData));
  });
});
