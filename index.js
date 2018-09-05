const server = require('./app/server');
const config = require('./config');
// Run server
module.exports = server.listen(config.port, error => {
  if (error) {
    console.error('Error while running server:', error)
  }
  console.info(`Express listening on port ${config.port}`)
});
