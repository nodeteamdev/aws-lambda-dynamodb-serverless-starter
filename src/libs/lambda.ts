import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';

export const middyfy = (schema, handler?) => {
  if (typeof schema === 'object') {
    return middy(handler).use(middyJsonBodyParser()).use(
      validator({
        eventSchema: transpileSchema(schema),
      }),
    ).use({
      onError: (request) => {
        const { error } = request;

        if (error['statusCode'] === 400) {
          request.response = {
            statusCode: 400,
            body: JSON.stringify({
              message: error.message,
              validationErrors: error.cause,
            }),
          };
        } else {
          request.response = {
            statusCode: 500,
            body: JSON.stringify({
              message: error.message,
            }),
          };
        }
      },
    });
  }
  return middy(schema).use(middyJsonBodyParser());
};
