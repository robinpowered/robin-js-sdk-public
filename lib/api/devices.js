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

var Devices;
var q = require ('q');

Devices = (function () {

  var _robin;

  function Devices (robin) {
    _robin = robin;
  }

  Devices.prototype.getAll = function (params) {
      var d = q.defer();
      _robin.sendRequest('/devices/', 'GET', d, null, params);
      return d.promise;
    };

  Devices.prototype.getUserDevices = function (params) {
    var d = q.defer();
    _robin.sendRequest('/me/devices/', 'GET', d, null, params);
    return d.promise;
  };

  return Devices;

})();

module.exports = Devices;