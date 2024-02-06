import { handlerPath } from '@libs/handler-resolver';

type Route = {
    handler: string;
    events: any[];
}

export const sendMail: Route = {
  /**
   * @function: api/src/functions/mail/handler.getAll
   */
  handler: `${handlerPath(__dirname)}/handler.sendMail`,
  events: [
    {
      http: {
        method: 'post',
        path: 'mail/',
      },
    },
  ],
};
