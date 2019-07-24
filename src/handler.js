import sendEmail from './functions/sendEmail';

function ping(event, context) {
  return {
    body: JSON.stringify({ context, event, message: 'Serverless setup successfully!' }, null, 2),
    statusCode: 200,
  };
}

export { ping, sendEmail };
