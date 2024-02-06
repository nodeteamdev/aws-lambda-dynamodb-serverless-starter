import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { shopService } from '../../services';

type APIGatewayProxyEventWithBody<TBody> = Omit<APIGatewayProxyEvent, 'body'> & { body: TBody };

/**
 * @function: ./src/functions/shop/handler.create
 * @description: Create a Shop
 * @returns: { shop: Shop }
 * @example: curl -X POST http://localhost:3000/dev/shop -d '{"email": "test@test"}'
 */
const create = middyfy(
  {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['email', 'phone', 'name', 'address', 'location'],
        properties: {
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          name: { type: 'string' },
          address: { type: 'string' },
          location: { type: 'array' },
        },
      },
    },
  },
  async (event: APIGatewayProxyEventWithBody<any>): Promise<APIGatewayProxyResult> => {
    const shop = await shopService.create({
      shopId: uuidv4(),
      email: event.body.email,
      phone: event.body.phone,
      name: event.body.name,
      address: event.body.address,
      location: event.body.location,
    });

    return formatJSONResponse({
      shop,
    });
  },
);

/**
 * @function: ./src/functions/shop/handler.getById
 * @description: Get a shop by id
 * @returns: { shop: Shop }
 * @example: curl -X GET http://localhost:3000/dev/shop/123
 */
const getById = middyfy(
  {
    type: 'object',
    required: ['pathParameters'],
    properties: {
      pathParameters: {
        type: 'object',
        required: ['shopId'],
        properties: {
          shopId: { type: 'string', format: 'uuid' },
        },
      },
    },
  },
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const shop = await shopService.getById(event.pathParameters.shopId);

    return formatJSONResponse({
      shop,
    });
  },
);

module.exports = {
  create,
  getById,
};
