/* eslint-disable import/prefer-default-export */

export function buildResponseData({ code = 200, message, ...rest }) {
  return {
    body: JSON.stringify({ message, ...rest }, null, 2),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      'Content-Type': 'application/json',
    },
    statusCode: code,
  };
}
