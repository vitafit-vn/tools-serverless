const AWS = require('aws-sdk');

const hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const sendEmail = async (/* event */) => {
  const ses = new AWS.SES({ region: 'us-east-1' });

  const params = {
    Destination: {
      ToAddresses: ['thanhnx.vitafit@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: '<html><body><b style="color: red;">hello world</b></body></html>',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test HLV Online email',
      },
    },
    Source: 'hlv-online@vitafit.vn',
  };

  try {
    const data = await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'Error!', error }, null, 2),
    };
  }
};

module.exports = {
  hello,
  sendEmail,
};
