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

var Settings, q;
q = require('q');

Settings = (function () {

  var robin;

  function Settings(robin) {
    _robin = robin;
  }

  Settings.prototype.changePassword = function(params) {
    var d = q.defer();
    if (params && params.data && params.data.password && params.data.confirmPassword) {
      if (params.data.password === params.data.confirmPassword) {
        this._robin.sendRequest('/me/password', 'PUT', d, params.data)
      } else {
        d.reject('Passwords do not match.');
      }
    } else {
      d.reject('Bad Request. Data must be supplied in params object with a password and confirmPassword.');
    }
    return d.promise;
  }

  return Settings;

})();

module.exports = Settings;