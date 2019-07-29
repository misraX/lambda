const chai = require('chai');
const expect = chai.expect;
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

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
        expect(data['data'].Contents).to.be.an('array');
        expect(data['data'].KeyCount).to.be.a('number');
        done();
      });
  });

  it('should create an s3 object..', done => {
    const form = new FormData();
    form.append('file', fs.createReadStream('/home/misrax/lambda/Pyramids.json'));
    Object.assign(headers, { 'content-type': 'multipart/form-data' });
    fetch(url, {
      method: 'POST',
      body: form
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        expect(data['data'].Key).to.be.a('string');
        done();
      });
  });

  it('should get a detail of the uploaded s3 object..', done => {
    const form = new FormData();
    form.append('file', fs.createReadStream('/home/misrax/lambda/Pyramids.json'));
    Object.assign(headers, { 'content-type': 'multipart/form-data' });
    fetch(url, {
      method: 'POST',
      body: form
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        expect(data['data'].Key).to.be.a('string');
        fetch(url + data['data'].Key, {
          headers: headers,
          method: 'GET'
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            expect(data['data'].distance).to.be.a('number');
            done();
          });
        done();
      });
  });
});
