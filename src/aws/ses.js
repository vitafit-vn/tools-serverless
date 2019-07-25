import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies
import inlineCss from 'inline-css';
import _ from 'lodash';

// Constants
import { PUBLIC_PATH } from '../constants';

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

export async function sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress }) {
  const ses = new AWS.SES({ region: 'us-east-1' });
  const { CcAddresses, ConfigurationSetName, Source } = SOURCES_MAPPING[sourceKey] || {};
  if (_.isEmpty(Source)) throw new Error('Invalid sourceKey');

  const htmlData = await inlineCss(htmlBody, { removeHtmlSelectors: true, url: PUBLIC_PATH });

  const params = {
    ConfigurationSetName,
    Source,
    Destination: {
      CcAddresses,
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: { Charset, Data: htmlData },
      },
      Subject: { Charset, Data: subject },
    },
  };

  const response = await ses.sendEmail(params).promise();
  return response;
}
