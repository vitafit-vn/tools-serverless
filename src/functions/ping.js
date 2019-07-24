import { buildResponseData } from '../utils';

export default function ping(event, context) {
  return buildResponseData({
    context,
    event,
    message: 'Serverless setup successfully!',
  });
}
