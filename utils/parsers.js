'use strict';

const Busboy = require('busboy');

/**
 * Get content type from event
 *
 * @param {*} event
 * @returns
 */
const getContentType = headers => {
  let contentType = headers['content-type'];
  if (!contentType) {
    return headers['Content-Type'];
  }
  return contentType;
};

/**
 * Parser for form-data using busboy
 * Promise that will resolve a lambda event.
 *
 * @param {*} event
 *
 */
exports.formParser = event =>
  new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: { 'content-type': getContentType(event.headers) } });

    const result = {};

    busboy
      .on('file', function(fieldname, file, filename, encoding, mimetype) {
        file
          .on('data', data => {
            result.file = data;
            result.filename = filename;
          })
          .on('end', () => console.log('File [%s] parsed', filename));
      })
      .on('finish', () => {
        event.body = result;
        resolve(event);
      })
      .on('error', err => {
        console.log('[Error Parsing Form]', err);
        reject(err);
      });

    busboy.end(event.body);
  });
