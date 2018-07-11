const config = require('../../config/index');
const dbConfig = require('../../config/database');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./user/routes');

const app = express();

// Configure Mongo
mongoose.connect(dbConfig.mongoUrl, {useNewUrlParser: true}, error => {
  if (error) {
    console.error('Some problems while connecting to Mongo:', error);
    throw error
  }
});
// Enable CORS and body parser
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false}));

app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'))
});
// End-points
app.use('/api/user', userRouter);

// Run server
app.listen(config.port, error => {
  if (error) {
    console.error('Error while running server:', error)
  }
  console.info(`Express listening on port ${config.port}`)
});

module.exports = app;