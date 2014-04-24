/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Users, q, util;
util = require('../../util');
q = require('q');

Users = (function () {

  function Users (robin) {
    util.__copyProperties(this, robin);
  }

  Users.prototype.findUsers = function(params) {
    d = q.defer();
    if (params && params.query) {
      this.sendRequest('/users', 'GET', d, null, params.query);
    } else {
      d.reject('Bad Request. An query Object must be supplied in params object.');
    }
    return d.promise;
  };

  return Users;

})();

module.exports = Users;
