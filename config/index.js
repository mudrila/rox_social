const env = process.env;

export default {
  port: env.PORT || 4000,
  mode: env.NODE_MODE || 'development',
  jwtSecret: 'Hello!ThisIsMyFirstNodeJSApp!IamLearningYet:)'
}
