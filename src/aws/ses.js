const AWS = require('aws-sdk'); // eslint-disable-line

const SOURCE_KEYS = {
  HLV_ONLINE: 'HlvOnline',
  SALES: 'Sales',
};

const SOURCES_MAPPING = {
  [SOURCE_KEYS.HLV_ONLINE]: {
    // CcAddresses: ['ops.vitafit@gmail.com'],
    ConfigurationSetName: 'HlvOnlineEmails',
    Source: 'hlv-online@vitafit.vn',
  },
  [SOURCE_KEYS.SALES]: {
    // CcAddresses: ['sales.vitafit@gmail.com'],
    ConfigurationSetName: 'SalesEmails',
    Source: 'sales@vitafit.vn',
  },
};

function sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress }) {
  const ses = new AWS.SES({ region: 'us-east-1' });
  const { CcAddresses, ConfigurationSetName, Source } = SOURCES_MAPPING[sourceKey];

  const params = {
    ConfigurationSetName,
    Source,
    Destination: {
      CcAddresses,
      ToAddresses: [toAddress],
    },
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
  };

  return ses.sendEmail(params).promise();
}

module.exports = { SOURCE_KEYS, sendHtmlEmail };
