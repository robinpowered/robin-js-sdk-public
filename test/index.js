/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Robin = require("../robin"),
  testConfig = require("./config");

// Set up robin classes with tokens of different permission levels
var robinObjects = {

  admin: function () {
    var robin = new Robin(testConfig.tokens.admin, testConfig.rbnCoreEndpoint);
    return robin;
  },

  user: function () {
    var robin = new Robin(testConfig.tokens.user, testConfig.rbnCoreEndpoint);
    return robin;
  }

};

module.exports = robinObjects;
