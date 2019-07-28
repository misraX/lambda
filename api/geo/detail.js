'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3(require('../../s3config')());
const fs = require('fs');

module.exports = (event, callback) => {
  const file = fs.createWriteStream(event.pathParameters.key);

  S3.getObject(
    {
      Bucket: 'anon-bucket-x',
      Key: event.pathParameters.key
    },
    (err, res) => {
      console.log(err, res);
      callback(err, res);
    }
  )
    .createReadStream()
    .pipe(file);
};
