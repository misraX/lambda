"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid/v4");
const S3 = new AWS.S3(require("../../s3config")());

module.exports = (event, callback) => {
  S3.upload(
    {
      Bucket: "anon-bucket-x",
      Key: `${uuid()}`,
      Body: event.body
    },
    (err, res) => {
      console.log(err, res);
      callback(err, Object.assign(res, { event }));
    }
  );
};
