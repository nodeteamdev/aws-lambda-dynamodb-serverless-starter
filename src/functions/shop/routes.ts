import { handlerPath } from '@libs/handler-resolver';

type Route = {
    handler: string;
    events: any[];
}

export const create: Route = {
  /**
   * @function: api/src/functions/shop/handler.create
   */
  handler: `${handlerPath(__dirname)}/handler.create`,
  events: [
    {
      http: {
        method: 'post',
        path: 'shop',
      },
    },
  ],
};

export const getById: Route = {
  /**
  * @function: api/src/functions/shop/handler.getById
  */
  handler: `${handlerPath(__dirname)}/handler.getById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'shop/{shopId}',
      },
    },
  ],

};
