import { buildResponseData } from '../utils';

export default function hello(event, context) {
  return buildResponseData({
    context,
    event,
    message: 'Serverless setup successfully!',
  });
}
