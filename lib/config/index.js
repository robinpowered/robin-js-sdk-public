var env,
    cfg,
    fs = require('fs'),
    path = require('path');

env = process.env.NODE_ENV || 'development';
// cfg = require('./env/'+env+'.js');
cfg = require('lib/config/env/'+env);

exports.config = cfg;
