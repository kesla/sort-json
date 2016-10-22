const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;
const visit = require('./index');

chai.use(dirtyChai);

describe('visit', () => {
  it('returns undefined for undefined', () => {
    expect(visit(undefined)).to.be.undefined();
  });
});
