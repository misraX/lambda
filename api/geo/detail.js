'use strict';

const getS3 = require('../../utils/s3').getS3;

module.exports = (event, callback) => {
  return getS3(event, callback);
};
