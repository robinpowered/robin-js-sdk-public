/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var DeviceManifests, q, util;
util = require('../util');
q = require('q');

DeviceManifests = (function () {

  function DeviceManifests (robin) {
    util.__extends(this, robin);
  }

  DeviceManifests.prototype.getAll = function () {
    var d = q.defer();
    this.sendRequest('/device-manifests/', 'GET', d);
    return d.promise;
  };

  return DeviceManifests;

})();

module.exports = DeviceManifests;
