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

  Spaces.prototype.get = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space Id must be supplied.');
    }
  };

  Spaces.prototype.update = function (spaceId, data) {
    if (spaceId && data) {
      return this.sendRequest('/spaces/' + spaceId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A Space Id and space data must be supplied.');
    }
  };

  Spaces.prototype.remove = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Space Id must be supplied.');
    }
  };

  /*
   * Devices
   */

  Spaces.prototype.getDevices = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space Id must be supplied.');
    }
  };

  Spaces.prototype.getSpaceDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and Device Id must be supplied.');
    }
  };

  Spaces.prototype.addDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and Device Id must be supplied.');
    }
  };

  Spaces.prototype.createDevice = function (spaceId, deviceData) {
    if (spaceId && deviceData) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/', 'POST', deviceData);
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and Device data must be supplied.');
    }
  };

  Spaces.prototype.removeDevice = function (spaceId, deviceId) {
    if (spaceId && deviceId) {
      return this.sendRequest('/spaces/' + spaceId + '/devices/' + deviceId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and Device Id must be supplied.');
    }
  };

  /*
   * Presence
   */

  Spaces.prototype.getAllPresence = function (spaceId) {
    if (spaceId) {
      return this.sendRequest('/spaces/' + spaceId + '/presence/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Space Id must be supplied.');
    }
  };

  Spaces.prototype.addPresence = function (spaceId, data) {
    if (spaceId && data) {
      return this.sendRequest('/spaces/' + spaceId + '/presence/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and a data object containing a Device Id, a User Id, or both must be supplied.');
    }
  };

  Spaces.prototype.removePresence = function (spaceId, data) {
    if (spaceId && data) {
      return this.sendRequest('/spaces/' + spaceId + '/presence/', 'DELETE', data);
    } else {
      return this.rejectRequest('Bad Request. Both a Space Id and a data object containing a Device Id, a Device Id, or both must be supplied.');
    }
  };

  return Spaces;

}).apply(this, arguments);

module.exports = Spaces;
