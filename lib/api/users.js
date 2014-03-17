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

var Users, q;
q = require('q');

Users = (function () {

  var _robin;

  function Users (robin) {
    _robin = robin;
  }

  Users.prototype.findUsers = function(params) {
    d = q.defer();
    if (params && params.query) {
      _robin.sendRequest('/users', 'GET', d, null, params.query);
    } else {
      d.reject('Bad Request. An query Object must be supplied in params object.');
    }
    return d.promise;
  };

  return Users;

})();

module.exports = Users;