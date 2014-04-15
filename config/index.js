var env, config;

env = process.env.NODE_ENV || 'development';
cfg = require('./env/'+env);

module.exports = cfg;