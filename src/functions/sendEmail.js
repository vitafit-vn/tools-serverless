import { sendHtmlEmail } from '../aws';
import { buildResponseData } from '../utils';

export default async function sendEmail(event) {
  const { body, httpMethod } = event || {};

  if ((httpMethod || '').toUpperCase() !== 'POST') {
    return buildResponseData({ code: 400, message: 'Invalid request method!' });
  }

  try {
    const { htmlBody, sourceKey, subject, toAddress } = JSON.parse(body);
    const data = await sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress });

    return buildResponseData({ data, message: 'Success!' });
  } catch (error) {
    return buildResponseData({ error, code: 400, message: 'Invalid request!' });
  }
}
