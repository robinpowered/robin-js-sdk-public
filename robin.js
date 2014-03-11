var organizations = require ("./lib/organizations")
  , robin_core_sdk = require ("./lib/robin_core_sdk")
  , sdk_utils = require ("./lib/sdk_utils")
  , settings = require ("./lib/settings")
  , users = require ("./lib/users")
  ;

var Robin = {

  organizations: organizations,
  settings: settings,
  users: users

};

module.exports = Robin;