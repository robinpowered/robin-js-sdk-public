var q = require ('q');

Devices = function (robin) {

  this._robin = robin;

  this.getAll = function (params) {
    var d = q.defer();
    this._robin._util.sendRequest('/devices/', 'GET', d);
    return d.promise;
  };

  this.getUserDevices = function (params) {
    var d = q.defer();
    this._robin._util.sendRequest('/me/devices/', 'GET', d);
    return d.promise;
  };

}

module.exports = Devices;