'use strict';

const listS3 = require('../../utils/s3').listS3;

module.exports = (event, callback) => {
  return listS3(event, callback);
};
