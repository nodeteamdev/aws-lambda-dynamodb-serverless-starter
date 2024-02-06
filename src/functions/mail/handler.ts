import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const ses = new SESClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: 'MockAccessKeyId',
    secretAccessKey: 'MockSecretAccessKey',
  },
});

type APIGatewayProxyEventWithBody<TBody> = Omit<APIGatewayProxyEvent, 'body'> & { body: TBody };

/**
 * @function: ./src/functions/mail/handler.sendMail
 * @description: Send Mail
 * @example: curl -X POST http://localhost:3000/dev/mail -d '{"to": "test@test"}'
 */
const sendMail = middyfy(
  {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['to'],
        properties: {
          to: { type: 'string', format: 'email' },
        },
      },
    },
  },
  async (event: APIGatewayProxyEventWithBody<any>): Promise<APIGatewayProxyResult> => {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [event.body.to],
      },
      Message: {
        Body: {
          Text: { Data: 'Test' },
        },

        Subject: { Data: 'Test Email' },
      },
      Source: 'SourceEmailAddress',
    });

    const response = await ses.send(command);

    return formatJSONResponse({
      response,
    });
  },
);

module.exports = {
  sendMail,
};
