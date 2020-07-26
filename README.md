# CI Application

Build Server and Build Agent on repo https://github.com/Postamentovich/shri-ci-build

## Start 

```shell
$ npm install
$ npm run start
```

#### NPM scripts

`npm run start` - start project <br>
`npm run test` - start unit tests <br>
`npm run build` - build project <br>
`npm run analyze` - analyze bundle <br>
`npm run e2e` - start e2e tests <br>

## Description

### Server

#### Env variables

At the root of the project, add an authorization token to the .env file https://hw.shri.yandex/

API_TOKEN=YOUR_API_TOKEN

#### Node.js

Version Node.js - 13.5

#### Documentation

Swagger is available here /swagger

### Client

#### Technologies used

- Typescript
- @bem/react
- Redux Toolkit
- Jest
- Hermione

#### Project structure

```
├── config/               # configs for webpack, jest
├── scripts/              # NPM scripts
└── src/                  # source files
    ├── __test__/         # tests
    ├── __mocks__/        # mocks for tests
    ├── client/           # client
    ├── server/           # server
    └── shared/           # components

```
