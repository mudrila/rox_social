const baseResponse = require('../baseResponse/index');
const baseSuccessResponse = baseResponse.baseSuccessResponse;

function get(request, response) {
  response.status(200).json(baseSuccessResponse('Gotcha', {test: 'passed'}))
}
function post(request, response) {
  response.status(200).json(baseSuccessResponse('Success in POST', {test: 'passed'}))
}
module.exports = {
  get: get,
  post: post
};
