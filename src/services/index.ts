import dynamoDBClient from '../model';
import UserService from './user-service';
import ShopService from './shop-service';

const userService = new UserService(dynamoDBClient());
const shopService = new ShopService(dynamoDBClient());

export {
  userService,
  shopService,
};
