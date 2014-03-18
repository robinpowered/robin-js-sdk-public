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

  Devices.prototype.getAll = function (params) {
    var d = q.defer();
    this.sendRequest('/devices/', 'GET', d, null, params);
    return d.promise;
  };

  Devices.prototype.getUserDevices = function (params) {
    var d = q.defer();
    this.sendRequest('/me/devices/', 'GET', d, null, params);
    return d.promise;
  };

  Devices.prototype.addUserDevice = function (data) {
    var d = q.defer();
    this.sendRequest('/me/devices', 'POST', d, data);
    return d.promise;
  };

  return Devices;

})();

module.exports = Devices;
