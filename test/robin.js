'use strict';

var Robin = require("../robin"),
  testConfig = require("./config");

// Set up robin classes with tokens of different permission levels
var robinObjects = {

  user: function () {
    var robin = new Robin();
    robin.api.setAuthToken(testConfig.tokens.user);
    robin.api.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  },

  admin: function () {
    var robin = Robin();
    robin.api.setAuthToken(testConfig.tokens.admin);
    robin.api.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  }

};

module.exports = robinObjects;