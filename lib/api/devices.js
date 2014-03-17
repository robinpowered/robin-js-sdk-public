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