'use strict';

const uploadToS3 = require('../../utils/s3').uploadToS3;
const formParser = require('../../utils/parsers').formParser;

module.exports = async (event, callback) => {
  try {
    console.log('EventBeforeParser: ', event);
    let eventParser = await formParser(event);
    console.log('EventAfterParser: ', eventParser);
    uploadToS3(eventParser.body, callback);
  } catch (error) {
    console.log('[Error Create]: ', error);
    callback({ statusCode: 409 }, { error: 'Error while creating an object.' });
  }
};
