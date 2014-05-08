/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Spaces, q, util;
util = require('../../util');
q = require('q');

Spaces = (function () {

  function Spaces (robin) {
    //Need to use the places api url
    util.__copyProperties(this, robin);
  }

  Spaces.prototype.get = function (id) {
    if (id) {
      return this.sendRequest('/spaces/' + id, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space id must be supplied.');
    }
  };

  Spaces.prototype.update = function (id, data) {
    if (id && data) {
      return this.sendRequest('/spaces/' + id, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A Space id and space data must be supplied.');
    }
  };

  Spaces.prototype.remove = function (id) {
    if (id) {
      return this.sendRequest('/spaces/' + id, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Space id must be supplied.');
    }
  };

  Spaces.prototype.getDevices = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space id must be supplied.');
    }
  };

  Spaces.prototype.getSpaceDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and device Id must be supplied.');
    }
  };

  Spaces.prototype.addDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and device Id must be supplied.');
    }
  };

  Spaces.prototype.createDevice = function (spaceId, deviceData) {
    if (spaceId && deviceData) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/', 'POST', deviceData);
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and device data must be supplied.');
    }
  };

  Spaces.prototype.removeDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Both a Space id and device Id must be supplied.');
    }
  };

  return Spaces;

}).apply(this, arguments);

module.exports = Spaces;
