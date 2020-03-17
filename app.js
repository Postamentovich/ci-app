const express = require('express');
require('dotenv').config();
const path = require('path');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const createError = require('http-errors');
const errorHandler = require('./server/routes/erorr-handler');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
});

const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(expressLogger);

app.use('/api/settings', require('./server/routes/settings-route'));

app.use('/api/builds', require('./server/routes/build-route'));

app.use('/', express.static(path.join(__dirname, '../client', 'dist')));

app.use((req, res, next) => next(createError(404)));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
