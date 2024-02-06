import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Shop from '../model/Shop';

export default class ShopService {
  private TableName: string = 'ShopsTable';

  constructor(private docClient: DocumentClient) { }

  async create(shop: Shop): Promise<Shop> {
    await this.docClient.put({
      TableName: this.TableName,
      Item: {
        ...shop,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }).promise();

    return shop;
  }

  async getById(shopId: string): Promise<Shop> {
    const shop = await this.docClient.get({
      TableName: this.TableName,
      Key: {
        shopId,
      },
    }).promise();

    return shop.Item as Shop;
  }
}
