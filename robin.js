var devices = require ("./lib/devices"),
  organizations = require ("./lib/organizations"),
  // robin_core_sdk = require ("./lib/robin_core_sdk"),
  sdk_utils = require ("./lib/sdk_utils"),
  settings = require ("./lib/settings"),
  users = require ("./lib/users");

function Robin () {

  // Keep utils private, but it's going to be needed in sub-modules
  this._util = sdk_utils;

  // Expose setAuthToken method, so a user can authenticate
  // Do we want to do this in a constructor instead?
  this.setAuthToken = function (token) {
    return this._util.setAuthToken(token);
  }

  this.getAuthToken = function () {
    return this._util._authToken || null;
  }

  this.setBaseUrl = function (baseUrl) {
    return this._util.setBaseUrl(baseUrl);
  }

  // Public Robin Modules
  this.devices = new devices(this);

}

module.exports = Robin;