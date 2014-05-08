/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Locations, q, util;
util = require('../../util');
q = require('q');

Locations = (function () {

  function Locations (robin) {
    util.__copyProperties(this, robin);
  }

  Locations.prototype.get = function (locationId) {
    if (locationId) {
      return this.sendRequest('/locations/' + locationId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Location id must be supplied.');
    }
  };

  Locations.prototype.update = function (locationId, data) {
    if (locationId && data) {
      return this.sendRequest('/locations/' + locationId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A Location id must be supplied.');
    }
  };

  Locations.prototype.remove = function (locationId) {
    if (locationId) {
      return this.sendRequest('/locations/' + locationId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Location id must be supplied.');
    }
  };

  Locations.prototype.getSpaces = function (locationId) {
    if (locationId) {
      return this.sendRequest('/locations/' + locationId + '/spaces', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Location id must be supplied.');
    }
  };

  Locations.prototype.createSpace = function (locationId, spaceData) {
    if (locationId && spaceData) {
      return this.sendRequest('/locations/' + locationId + '/spaces', 'POST', spaceData);
    } else {
      return this.rejectRequest('Bad Request. A Location id and space data must be supplied.');
    }
  };

  return Locations;

}).apply(this, arguments);

module.exports = Locations;
