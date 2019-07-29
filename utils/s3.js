'use strict';
const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const S3 = new AWS.S3(require('../s3Config')());
const GeoPoint = require('geopoint');

exports.uploadToS3 = (event, callback) =>
  S3.upload(
    {
      Bucket: 'anon-bucket-x',
      Key: `${event.filename}-${uuid()}`,
      Body: event.file
    },
    (err, res) => {
      console.log('[Error uploadToS3]: ', err, '[Response]: ', res);
      if (err) {
        callback({ statusCode: 409 }, { error: 'Error while uploading.' });
      }
      let response = { data: { Key: res.Key } };
      console.log('[Response getS3]: ', response);
      callback(err, response);
      return;
    }
  );

/**
 * GetObject from s3 bucket.
 *
 * @param {*} event
 * @param {*} callback
 */
exports.getS3 = (event, callback) =>
  S3.getObject(
    {
      Bucket: 'anon-bucket-x',
      Key: event.pathParameters.key
    },
    (err, res) => {
      console.log('[Error getS3]: ', err, '[Response]: ', res);
      if (err) {
        callback({ statusCode: 409 }, { error: 'Error while getting an object.' });
      }
      let data = JSON.parse(res.Body.toString('utf-8'));
      let point1 = new GeoPoint(52.502931, 13.408249);
      let point2 = new GeoPoint(data['latitude'], data['longitude']);
      let distance = point1.distanceTo(point2, true);
      Object.assign(data, { distance });
      let response = data;
      console.log('[Response getS3]: ', response);
      callback(err, response);
      // Disable retrying
      return;
    }
  );

/**
 * List s3 objects.
 *
 * @param {*} event
 * @param {*} callback
 */
exports.listS3 = (event, callback) =>
  S3.listObjectsV2(
    {
      Bucket: 'anon-bucket-x'
    },
    (err, res) => {
      if (err) {
        console.log('[Error listS3]: ', err);
        callback({ statusCode: 409 }, { error: 'Error while listing objects.' });
      }
      let response = {
        data: {
          Contents: res['Contents'] ? res['Contents'] : [],
          KeyCount: res['KeyCount'] ? res['KeyCount'] : 0
        }
      };
      console.log('[Response listS3]: ', res);

      callback(err, response);
      // Disable retrying
      return;
    }
  );
