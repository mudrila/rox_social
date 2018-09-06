const Router = require('express').Router;
const TestingController = require('./controller');

let testRouter = Router();

testRouter.route('/get').get(TestingController.get);
testRouter.route('/post').post(TestingController.post);

module.exports = testRouter;
