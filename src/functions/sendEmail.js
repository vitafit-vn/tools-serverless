import { sendHtmlEmail } from '../aws';
import { buildResponseData } from '../utils';

export default async function sendEmail(event) {
  const { body, httpMethod = '' } = event || {};

  if (httpMethod.toUpperCase() !== 'POST') {
    return buildResponseData({ code: 400, message: 'Invalid request method!' });
  }

  try {
    const params = JSON.parse(body);
    const data = await sendHtmlEmail(params);

    return buildResponseData({ data, message: 'Success!' });
  } catch (error) {
    return buildResponseData({ error, code: 400, message: 'Invalid request!' });
  }
}
