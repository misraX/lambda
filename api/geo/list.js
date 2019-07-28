'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3(require('../../s3config')());

module.exports = (event, callback) => {
  S3.listObjectsV2(
    {
      Bucket: 'anon-bucket-x'
    },
    (err, res) => {
      console.log(err, res);
      const formatResponse = {
        Contents: res['Contents'] ? res['Contents'] : [],
        KeyCount: res['KeyCount'] ? res['KeyCount'] : 0
      };
      callback(err, formatResponse);
      // Disable retrying
      return;
    }
  );
};
