const chai = require('chai');
const expect = chai.expect;
const fetch = require('node-fetch');

const url = 'https://5u094xtgk8.execute-api.us-east-1.amazonaws.com/dev/geo';
const headers = {
  'Access-Control-Allow-Origin': '*'
};

describe('Handlers', () => {
  it('should list all s3 objects..', done => {
    fetch(url, {
      headers: headers,
      method: 'GET'
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        expect(data.Contents).to.be.an('array');
        expect(data.KeyCount).to.be.a('number');
        done();
      });
  });
});
