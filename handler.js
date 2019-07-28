'use strict';
const List = require('./api/geo/list');
const Detail = require('./api/geo/detail');
const Create = require('./api/geo/create');

const makeResponse = (error, result) => {
  const statusCode = (error && error.statusCode) || 200;
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result)
  };
};

// List api for all geo uploads.
exports.list = (event, context, callback) => {
  List(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

// Detail api for a geo's json file.
exports.detail = (event, context, callback) => {
  Detail(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};

// Create api for a geo's json file.
exports.create = (event, context, callback) => {
  Create(event, (error, result) => {
    const response = makeResponse(error, result);
    context.succeed(response);
  });
};
