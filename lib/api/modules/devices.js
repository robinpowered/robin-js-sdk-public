/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Devices, q, util;
util = require('../../util');
q = require('q');

Devices = (function () {

  function Devices (robin) {
    util.__copyProperties(this, robin);
  }

  Devices.prototype.getAll = function () {
    return this.sendRequest('/devices/', 'GET');
  };

  Devices.prototype.get = function (deviceId) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied.');
    }
  };

  Devices.prototype.update = function (deviceId, data) {
    if (deviceId && data) {
      return this.sendRequest('/devices/' + deviceId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both a device id and device data must be supplied.');
    }
  };

  Devices.prototype.remove = function (deviceId) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied');
    }
  };

  /*
   * Identifiers
   */

  Devices.prototype.getAllIdentifiers = function (deviceId) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId + '/identifiers/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied.');
    }
  };

  Devices.prototype.createIdentifier = function (deviceId, data) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId + '/identifiers/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied.');
    }
  };

  Devices.prototype.addIdentifier = function (deviceId, identifier) {
    if (deviceId && identifier) {
      return this.sendRequest('/devices/' + deviceId + '/identifiers/' + identifier, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. A device id and identifier must be supplied.');
    }
  };

  Devices.prototype.removeIdentifier = function (deviceId, identifier) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId + '/identifiers/' + identifier, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device id and identifier must be supplied.');
    }
  };

  /*
   * Channels
   */

  Devices.prototype.getAllChannels = function (deviceId) {
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId + '/channels/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied.');
    }
  };

  Devices.prototype.createChannel = function (deviceId, data) {
    if (deviceId && data) {
      return this.sendRequest('/devices/' + deviceId + '/channels/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Both a device id and channel data must be supplied.');
    }
  };

  Devices.prototype.addChannel = function (deviceId, channelId) {
    if (deviceId && channelId) {
      return this.sendRequest('/devices/' + deviceId + '/channels/' + channelId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. Both a device id and a channel id must be supplied.');
    }
  };

  Devices.prototype.removeChannel = function (deviceId, channelId) {
    if (deviceId && channelId) {
      return this.sendRequest('/devices/' + deviceId + '/channels/' + channelId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Both a device id and channel id must be supplied.');
    }
  };

  /*
   * Spaces
   */

  Devices.prototype.getAllChannels = function (deviceId) {
    var usePlacesApi = true;
    if (deviceId) {
      return this.sendRequest('/devices/' + deviceId + '/spaces/', 'GET', null, null, usePlacesApi);
    } else {
      return this.rejectRequest('Bad Request. A device id must be supplied.');
    }
  };

  return Devices;

}).apply(this, arguments);

module.exports = Devices;
