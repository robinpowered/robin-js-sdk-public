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

  Users.prototype.findUsers = function(queryParams) {
    if (queryParams) {
      return this.sendRequest('/users', 'GET', null, queryParams);
    } else {
      this.rejectRequest('Bad Request. An query Object must be supplied in params object.');
    }
  };

  return Users;

}).apply(this, arguments);

module.exports = Users;
