/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Presence, q, util;
util = require('../../util');
q = require('q');

Presence = (function () {

  function Auth (robin) {
    util.__copyProperties(this, robin);
  }

  Presence.prototype.getAllUsers = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId + '/users', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space id must be supplied.');
    }
  };

  Spaces.prototype.getUser = function (spaceId, userId) {
    if (spaceId && userId) {
      return this.sendRequest('/spaces/' + spaceId + '/users/' + userId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and user Id must be supplied.');
    }
  };

  Spaces.prototype.putUser = function (spaceId, userId) {
    if (spaceId && userId) {
      return this.sendRequest('/spaces/' + spaceId + '/users/' + userId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and user Id must be supplied.');
    }
  };

  return Presence;

}).apply(this, arguments);

module.exports = Presence;
