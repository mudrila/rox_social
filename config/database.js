const env = process.env;
module.exports =  {
  mongoUrl: env.MONGODB_URI || 'mongodb://localhost:27017/freeSocial'
};
