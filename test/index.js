/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Robin, testConfig;

Robin = require('../robin');
testConfig = require('./config');

// Set up robin classes with tokens of different permission levels
var robinObjects = {

  admin: function () {
    var robin = new Robin(testConfig.tokens.admin, 'test');
    return robin;
  },

  user: function () {
    var robin = new Robin(testConfig.tokens.user, 'test');
    return robin;
  }

};

module.exports = robinObjects;
