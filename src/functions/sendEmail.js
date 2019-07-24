const { SOURCE_KEYS, sendHtmlEmail } = require('../aws').ses;
const { buildResponseData } = require('../utils');

async function sendEmail(event) {
  const { body, httpMethod } = event || {};

  if (httpMethod.toUpperCase() !== 'POST') {
    return buildResponseData({ code: 400, message: 'Invalid request method!' });
  }

  try {
    const { htmlBody, subject, toAddress } = JSON.parse(body);
    const data = await sendHtmlEmail({ htmlBody, subject, toAddress, sourceKey: SOURCE_KEYS.HLV_ONLINE });

    return buildResponseData({ data, message: 'Success!' });
  } catch (error) {
    return buildResponseData({ error, code: 400, message: 'Invalid request!' });
  }
}

module.exports = sendEmail;