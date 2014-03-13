var Robin = require("../robin"),
  testConfig = require("./config");

// Set up robin classes with tokens of different permission levels
var robinObjects = {

  user: function () {
    robin = Robin();
    robin.setAuthToken(testConfig.tokens.user);
    robin.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  },

  admin: function () {
    robin = Robin();
    robin.setAuthToken(testConfig.tokens.admin);
    robin.setBaseUrl(testConfig.rbnCoreEndpoint);
    return robin;
  }

}

module.exports = robinObjects;