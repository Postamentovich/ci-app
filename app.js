const express = require('express');
require('dotenv').config();
const path = require('path');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const errorHandler = require('./server/middlewares/erorr-handler');

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: true,
});

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'School CI server' },
    basePath: '/api/',
  },
  apis: [
    './server/swagger/swagger.yaml',
    './server/routes/build-route.js',
    './server/routes/settings-route.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(expressLogger);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/settings', require('./server/routes/settings-route'));

app.use('/api/builds', require('./server/routes/build-route'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => next(createError(404)));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
