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
util = require('../util');
q = require('q');

Devices = (function () {

  function Devices (robin) {
    util.__copyProperties(this, robin);
  }

  Devices.prototype.getAll = function () {
    var d = q.defer();
    this.sendRequest('/devices/', 'GET', d);
    return d.promise;
  };

  Devices.prototype.get = function (deviceId) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId, 'GET', d);
    }
    else {
      d.reject('Bad Request. A device id must be supplied.');
    }
    return d.promise;
  };

  Devices.prototype.update = function (deviceId, data) {
    var d = q.defer();
    if (deviceId && data) {
      this.sendRequest('/devices/' + deviceId, 'PATCH', d, data);
    }
    else {
      d.reject('Bad Request. Both a device id and device data must be supplied.');
    }
    return d.promise;
  };

  Devices.prototype.remove = function (deviceId) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A device id must be supplied');
    }
    return d.promise;
  };

  /*
   * Identifiers
   */

  // getAllIdentifiers
  Devices.prototype.getAllIdentifiers = function (deviceId) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/', 'GET', d);
    }
    else {
      d.reject('Bad Request. A device id must be supplied.');
    }
    return d.promise;
  };

  // createIdentifier
  Devices.prototype.createIdentifier = function (deviceId) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. A device id must be supplied.');
    }
    return d.promise;
  };

  // addIdentifier
  Devices.prototype.addIdentifier = function (deviceId, identifier) {
    var d = q.defer();
    if (deviceId && identifier) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/' + identifier, 'PUT', d, data);
    }
    else {
      d.reject('Bad Request. A device id and identifier must be supplied.');
    }
    return d.promise;
  };

  // remove
  Devices.prototype.removeIdentifier = function (deviceId, identifier) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/' + identifier, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A device id and identifier must be supplied.');
    }
    return d.promise;
  };

  /*
   * Channels
   */

  Devices.prototype.getAllChannels = function (deviceId) {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId + '/channels/', 'GET', d);
    }
    else {
      d.reject('Bad Request. A device id must be supplied.');
    }
    return d.promise;
  };

  Devices.prototype.createChannel = function (deviceId, data) {
    var d = q.defer();
    if (deviceId && data) {
      this.sendRequest('/devices/' + deviceId + '/channels/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Both a device id and channel data must be supplied.');
    }
    return d.promise;
  };

  Devices.prototype.addChannel = function (deviceId, channelId) {
    var d = q.defer();
    if (deviceId && channelId) {
      this.sendRequest('/devices/' + deviceId + '/channels/' + channelId, 'PUT', d);
    }
    else {
      d.reject('Bad Request. Both a device id and a channel id must be supplied.');
    }
    return d.promise;
  };

  Devices.prototype.removeChannel = function (deviceId, channelId) {
    var d = q.defer();
    if (deviceId && channelId) {
      this.sendRequest('/devices/' + deviceId + '/channels/' + channelId, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. Both a device id and channel id must be supplied.');
    }
    return d.promise;
  };

  return Devices;

})();

module.exports = Devices;
