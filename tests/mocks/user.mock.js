const uuid = require('uuid/v4');
module.exports = {
  id: uuid(),
  uuid: uuid(),
  name: 'Mock user',
  creationTime: new Date().toDateString()
};
