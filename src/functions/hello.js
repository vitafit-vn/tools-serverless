const { buildResponseData } = require('../utils');

function hello(event, context) {
  return buildResponseData({
    context,
    event,
    message: 'Serverless setup successfully!',
  });
}

module.exports = hello;
