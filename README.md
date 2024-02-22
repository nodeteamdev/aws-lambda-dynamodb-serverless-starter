# Description
It is a serverless application that uses AWS lambda, dynamodb, and api gateway. It is written in typescript and uses the serverless framework.

# Setup
## Prerequisites
- nodejs
- npm
- serverless framework
- aws cli
- aws credentials
- dynamodb local
- dynamodb admin
- dynamodb migrate
- Java Runtime Engine (JRE) version 6.x or newer

# Features

- User
  - Create a user
  - Get a user
  - Update a user
  - Delete a user
- Shop
    - Create a shop
    - Get a shop
- Mail - send an email via [AWS SES](https://aws.amazon.com/ses/)

## Installation

Setup npm dependencies

```bash
npm install
```

Setup serverless framework

```bash
npm install -g serverless
```

Install dynamodb local

DynamoDb Oflline Plugin Requires:
 - serverless@^1
 - Java Runtime Engine (JRE) version 6.x or newer

```bash
npx sls dynamodb install
```

Install dynamodb admin

```bash
npm install -g dynamodb-admin
```
after installation, run the following command to start dynamodb admin
```bash
dynamodb-admin
```
_note: admin will be available at http://localhost:8001

Install dynamodb migrate

```bash
npm install -g dynamodb-migrate
```

## Run
```bash
npx serverless offline start --stage=dev
```

## Deploy
```bash
npx serverless deploy --stage=<name>
```

## Remove
```bash
npx serverless remove --stage=<name>
```

# API Documentation
Will be available at  http://localhost:3000/swagger

# Project Structure
```bash
src
├── functions
│   ├── mail
│   │   ├── handler.ts
│   │   └── routes.ts
│   ├── shop
│   │   ├── handler.ts
│   │   └── routes.ts
│   └── user
│       ├── handler.ts
│       └── routes.ts
├── libs
│   ├── api-gateway.ts
│   ├── handler-resolver.ts
│   └── lambda.ts
├── model
│   ├── Shop.ts
│   ├── User.ts
│   └── index.ts
└── services
    ├── index.ts
    ├── shop-service.ts
    └── user-service.ts
```
Each function has its own folder with a handler and routes file. The handler file contains the lambda function and the routes file contains the api gateway routes.
Example of the handler file:
```typescript
const create = middyfy(
    {
        type: 'object',
        required: ['body'],
        properties: {
            body: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: { type: 'string', format: 'email' },
                },
            },
        },
    },
    async (event: APIGatewayProxyEventWithBody<any>): Promise<APIGatewayProxyResult> => {
        const user = await userService.create({
            email: event.body.email,
            userId: uuidv4(),
            isVerified: false,
        });

        return formatJSONResponse({
            user,
        });
    },
);
```
`middify` - is a helper function that wraps the lambda function with params validation and error handling.

# Contributing Guide
## Branching
- `master` - production branch
- `dev` - development branch
- `feature/<name>` - feature branch
- `bugfix/<name>` - bugfix branch
- `hotfix/<name>` - hotfix branch
- `release/<name>` - release branch
- `docs/<name>` - documentation branch
- `test/<name>` - test branch
- `chore/<name>` - chore branch
- `refactor/<name>` - refactor branch
- `style/<name>` - style branch
- `ci/<name>` - ci branch

## Commit Message
```bash
<type>[optional scope]: <description>
```
Example:
```bash
feat(api): send an email to the customer when a product is shipped
```
Commit message should be with the next format - conventionalcommits We are use commitizen for commit message formatting.
