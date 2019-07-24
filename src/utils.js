/* eslint-disable import/prefer-default-export */

const RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
  'Content-Type': 'application/json',
};

export function buildResponseData({ code = 200, message, ...rest }) {
  return {
    body: JSON.stringify({ message, ...rest }, null, 2),
    headers: RESPONSE_HEADERS,
    statusCode: code,
  };
}
