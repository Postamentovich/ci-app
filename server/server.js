const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.json());

app.use('/api/settings', require('./routes/settings-route'));

app.use('/api/builds', require('./routes/build-route'));

app.use('/', express.static(path.join(__dirname, '../client', 'dist')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
