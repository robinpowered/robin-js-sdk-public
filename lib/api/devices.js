'use strict';

var Devices;
var q = require ('q');

Devices = (function () {

  function Devices (robin) {
    this._robin = robin;
  }

  Devices.prototype.getAll = function (params) {
      var d = q.defer();
      this._robin.sendRequest('/devices/', 'GET', d, null, params);
      return d.promise;
    };

  Devices.prototype.getUserDevices = function (params) {
    var d = q.defer();
    this._robin.sendRequest('/me/devices/', 'GET', d, null, params);
    return d.promise;
  };

  return Devices;

})();

module.exports = Devices;