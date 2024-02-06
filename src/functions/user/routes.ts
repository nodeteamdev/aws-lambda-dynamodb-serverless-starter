import { handlerPath } from '@libs/handler-resolver';

type Route = {
    handler: string;
    events: any[];
}

export const getAll: Route = {
  /**
   * @function: api/src/functions/user/handler.getAll
   */
  handler: `${handlerPath(__dirname)}/handler.getAll`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/',
      },
    },
  ],
};

export const create: Route = {
  /**
   * @function: api/src/functions/user/handler.create
   */
  handler: `${handlerPath(__dirname)}/handler.create`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user',
      },
    },
  ],
};

export const getById: Route = {
  /**
   * @function: api/src/functions/user/handler.getById
   */
  handler: `${handlerPath(__dirname)}/handler.getById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/{userId}',
      },
    },
  ],
};

export const getByEmail: Route = {
  /**
   * @function: api/src/functions/user/handler.getByEmail
   */
  handler: `${handlerPath(__dirname)}/handler.getByEmail`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/email/{email}',
      },
    },
  ],
};

export const setVerified: Route = {
  /**
  * @function: api/src/functions/user/handler.setVerified
  */
  handler: `${handlerPath(__dirname)}/handler.setVerified`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'user/{userId}',
      },
    },
  ],
};
