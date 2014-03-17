'use strict';
/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 * When this module is required in JavaScript source, it will allow a
 * child class to extend a parent class, by invoking the function exported
 * by this module.
 */

var Robin = require("../robin"),
  testConfig = require("./config");

// Set up robin classes with tokens of different permission levels
var robinObjects = {

  admin: function () {
    var robin = new Robin();
    robin.api.setAuthToken(testConfig.tokens.admin);
    robin.api.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  },

  user: function () {
    var robin = new Robin();
    robin.api.setAuthToken(testConfig.tokens.user);
    robin.api.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  }

};

module.exports = robinObjects;