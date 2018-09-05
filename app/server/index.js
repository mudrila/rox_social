const dbConfig = require('../../config/database');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./user/routes');

const app = express();
let mongoUrl;
if (process.env.NODE_ENV === 'production') {
  mongoUrl = 'mongodb://heroku_f8hbkxcw:t0gk652b0mmusqmnmlcpk3fn19@ds235181.mlab.com:35181/heroku_f8hbkxcw'
} else {
  mongoUrl = dbConfig.mongoUrl
}
// Configure Mongo
mongoose.connect(mongoUrl, {useNewUrlParser: true}, error => {
  if (error) {
    console.error('Some problems while connecting to Mongo:', error);
    throw error
  }
});
// Enable CORS and body parser
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false}));

// End-points
app.use('/api/user', userRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./testing/routes');
  app.use('/api/test', testingRouter);
}
// Serve static
app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'))
});

module.exports = app;
