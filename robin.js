var devices = require ("./lib/devices"),
  organizations = require ("./lib/organizations"),
  robin_core_sdk = require ("./lib/robin_core_sdk"),
  sdk_utils = require ("./lib/sdk_utils"),
  settings = require ("./lib/settings"),
  users = require ("./lib/users");

function Robin (authToken) {

  // Keep utils private
  this._utils = sdk_utils;
  this._utils.setAuthToken(authToken);

  // Public Robin Modules
  this.devices = new devices(this);
  // modules = (function (robin) {
  //   return {
  //     devices: new Devices(robin)
  //   }
  // })(this);


}

module.exports = Robin;