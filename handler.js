const AWS = require('aws-sdk');

function buildErrorResponse({ message, statusCode = 400, ...rest }) {
  return {
    statusCode,
    body: JSON.stringify({ message, ...rest }, null, 2),
  };
}

function sendHlvOnlineEmail({ htmlBody, subject, toAddress }) {
  const ses = new AWS.SES({ region: 'us-east-1' });

  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    ConfigurationSetName: 'HlvOnlineEmails',
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: 'hlv-online@vitafit.vn',
  };

  return ses.sendEmail(params).promise();
}

async function hello(event, context) {
  const body = {
    message: 'Serverless setup successfully!',
    context,
    event,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body, null, 2),
  };
}

async function sendEmail(event) {
  const { body, httpMethod } = event;

  if (httpMethod !== 'POST') return buildErrorResponse({ message: 'Invalid request method!' });

  try {
    const { htmlBody, subject, toAddress } = JSON.parse(body);
    const data = await sendHlvOnlineEmail({ htmlBody, subject, toAddress });

    return {
      statusCode: 200,
      body: JSON.stringify(data, null, 2),
    };
  } catch (error) {
    if (httpMethod !== 'POST') return buildErrorResponse({ error, message: 'Invalid request body!' });
  }

  return buildErrorResponse({ message: 'Invalid request!' });
}

module.exports = { hello, sendEmail };
