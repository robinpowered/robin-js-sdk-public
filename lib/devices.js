'use strict';

var q = require ('q');

function Devices (robin) {

  if (!(this instanceof Devices)) {
    return new Devices(robin);
  }

  this._robin = robin;

  return this;

}

Devices.prototype.getAll = function () {
    var d = q.defer();
    this._robin.sendRequest('/devices/', 'GET', d);
    return d.promise;
  };

Devices.prototype.getUserDevices = function () {
  var d = q.defer();
  this._robin.sendRequest('/me/devices/', 'GET', d);
  return d.promise;
};


module.exports = Devices;