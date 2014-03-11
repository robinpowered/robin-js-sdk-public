var devices = require ("./lib/devices"),
  organizations = require ("./lib/organizations"),
  robin_core_sdk = require ("./lib/robin_core_sdk"),
  sdk_utils = require ("./lib/sdk_utils"),
  settings = require ("./lib/settings"),
  users = require ("./lib/users");

function Robin (access_token) {

  this.util = sdk_utils;

  this.init(access_token);

}

Robin.prototype.init = function (access_token) {

  this.util.setAuthToken(access_token);

};

Robin.prototype.devices = devices;

Robin.prototype.organizations = organizations,

Robin.prototype.settings = settings,

Robin.prototype.users = users;

module.exports = Robin;