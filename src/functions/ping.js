const { buildResponseData } = require('../utils');

function ping(/* event, context */) {
  return buildResponseData({
    // context,
    // event,
    message: 'Serverless setup successfully!',
  });
}

module.exports = ping;
