import { sendHtmlEmail } from '../aws';
import { buildResponseData } from '../utils';

export default async function sendEmail(event) {
  const { body, httpMethod = '' } = event || {};

  if (httpMethod.toUpperCase() !== 'POST') {
    return buildResponseData('Invalid request method!', 400);
  }

  try {
    const params = JSON.parse(body);
    const data = await sendHtmlEmail(params);

    return buildResponseData('Success!', 200, data);
  } catch (error) {
    const { message } = error;
    return buildResponseData('Invalid request!', 400, { message });
  }
}
