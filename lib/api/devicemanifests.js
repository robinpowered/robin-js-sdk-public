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

var DeviceManifests, q;
q = require('q');

DeviceManifests = (function () {

  var _robin;

  function DeviceManifests (robin) {
    _robin = robin;
  }

  DeviceManifests.prototype.getAll = function () {
    var d = q.defer();
    _robin.sendRequest('/device-manifests/', 'GET', d);
    return d.promise;
  };

  return DeviceManifests;

})();

module.exports = DeviceManifests;