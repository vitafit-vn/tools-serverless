function buildResponseData({ code = 200, message, ...rest }) {
  return {
    body: JSON.stringify({ message, ...rest }, null, 2),
    statusCode: code,
  };
}

module.exports = { buildResponseData };
