import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

const Charset = 'UTF-8';

export const SOURCE_KEYS = {
  HLV_ONLINE: 'HlvOnline',
  SALES: 'Sales',
};

const SOURCES_MAPPING = {
  [SOURCE_KEYS.HLV_ONLINE]: {
    // CcAddresses: ['reports.ops@vitafit.vn'],
    ConfigurationSetName: 'HlvOnlineEmails',
    Source: 'hlv-online@vitafit.vn',
  },
  [SOURCE_KEYS.SALES]: {
    // CcAddresses: ['reports.sales@vitafit.vn'],
    ConfigurationSetName: 'SalesEmails',
    Source: 'sales@vitafit.vn',
  },
};

export function sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress }) {
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
        Html: { Charset, Data: htmlBody },
      },
      Subject: { Charset, Data: subject },
    },
  };

  return ses.sendEmail(params).promise();
}
