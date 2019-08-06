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
    ConfigurationSetName: 'HlvOnlineEmails',
    Source: '"HLV VitaFit" <hlv@vitafit.vn>',
  },
  [SOURCE_KEYS.SALES]: {
    ConfigurationSetName: 'SalesEmails',
    Source: '"Sales VitaFit" <sales@vitafit.vn>',
  },
};

function validateEmailParams(params) {
  const { htmlBody, sourceKey, subject, toAddresses } = params;
  if (_.isEmpty(sourceKey) || !_.includes(_.values(SOURCE_KEYS), sourceKey)) throw new Error('Invalid sourceKey');
  if (_.isEmpty(htmlBody)) throw new Error('Invalid htmlBody');
  if (_.isEmpty(subject)) throw new Error('Invalid subject');
  if (_.isEmpty(toAddresses)) throw new Error('Invalid toAddresses');
}

export async function sendHtmlEmail(params) {
  validateEmailParams(params);

  const ses = new AWS.SES({ region: 'us-east-1' });
  const { bccAddresses, ccAddresses, htmlBody, sourceKey, subject, toAddresses } = params;

  const { ConfigurationSetName, Source } = SOURCES_MAPPING[sourceKey] || {};
  if (_.isEmpty(Source)) throw new Error('Invalid sourceKey');

  const htmlData = await inlineCss(htmlBody, { removeHtmlSelectors: true, url: PUBLIC_PATH });

  const sendParams = {
    ConfigurationSetName,
    Source,
    Destination: {
      BccAddresses: bccAddresses,
      CcAddresses: ccAddresses,
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        Html: { Charset, Data: htmlData },
      },
      Subject: { Charset, Data: subject },
    },
  };

  const response = await ses.sendEmail(sendParams).promise();
  return response;
}
