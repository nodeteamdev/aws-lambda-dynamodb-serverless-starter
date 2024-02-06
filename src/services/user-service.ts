import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import User from '../model/User';

export default class UserService {
  private TableName: string = 'UsersTable';

  constructor(private docClient: DocumentClient) { }

  async getAll(): Promise<User[]> {
    const users = await this.docClient.scan({
      TableName: this.TableName,
    }).promise();

    return users.Items as User[];
  }

  async getById(userId: string): Promise<User> {
    const user = await this.docClient.get({
      TableName: this.TableName,
      Key: {
        userId,
      },
    }).promise();

    return user.Item as User;
  }

  async getByEmail(email: string): Promise<DocumentClient.AttributeMap[]> {
    const user = await this.docClient.query({
      TableName: this.TableName,
      IndexName: 'email-index',
      KeyConditionExpression: '#email = :email',
      Limit: 1,
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email,
      },
    }).promise();

    return user.Items;
  }

  async setVerified(user: Pick<User, 'userId' | 'isVerified'>): Promise<Pick<User, 'userId' | 'isVerified'>> {
    await this.docClient.update({
      TableName: this.TableName,
      Key: {
        userId: user.userId,
      },
      UpdateExpression: 'set isVerified = :isVerified',
      ConditionExpression: 'attribute_exists(userId)',
      ExpressionAttributeValues: {
        ':isVerified': user.isVerified,
      },
      ReturnValues: 'UPDATED_NEW',
    }).promise();

    return user;
  }

  async create(user: User): Promise<User> {
    await this.docClient.put({
      TableName: this.TableName,
      Item: {
        ...user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }).promise();

    return user;
  }
}
