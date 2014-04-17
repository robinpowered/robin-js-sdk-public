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
    util.__copyProperties(this, robin);
  }

  DeviceManifests.prototype.getAll = function () {
    var d = q.defer();
    this.sendRequest('/device-manifests/', 'GET', d);
    return d.promise;
  };

  DeviceManifests.prototype.add = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/device-manifests/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Device manifest data must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.get = function (manifestRef) {
    var d = q.defer();
    if (manifestRef) {
      this.sendRequest('/device-manifests/' + manifestRef, 'GET', d);
    }
    else {
      d.reject('Bad Request. A device manifest reference must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.update = function (manifestRef, data) {
    var d = q.defer();
    if (manifestRef && data) {
      this.sendRequest('/device-manifests/' + manifestRef, 'PATCH', d, data);
    }
    else {
      d.reject('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.remove = function (manifestRef) {
    var d = q.defer();
    if (manifestRef) {
      this.sendRequest('/device-manifests/' + manifestRef, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A device manifest reference must be supplied.');
    }
    return d.promise;
  };

  /*
   * Feeds
   */

  DeviceManifests.prototype.getAllFeeds = function (manifestRef) {
    var d = q.defer();
    if (manifestRef) {
      this.sendRequest('/device-manifests/' + manifestRef + '/feeds/', 'GET', d);
    }
    else {
      d.reject('Bad Request. A device manifest reference must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.addFeed = function (manifestRef, data) {
    var d = q.defer();
    if (manifestRef && data) {
      this.sendRequest('/device-manifests/' + manifestRef + '/feeds/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.getFeed = function (manifestRef, feedId) {
    var d = q.defer();
    if (manifestRef && feedId) {
      this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'GET', d);
    }
    else {
      d.reject('Bad Request. Both a device manifest reference and a feed id must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.updateFeed = function (manifestRef, feedId, data) {
    var d = q.defer();
    if (manifestRef && feedId && data) {
      this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'PATCH', d, data);
    }
    else {
      d.reject('Bad Request. A device manifest reference, a feed id and feed data must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.removeFeed = function (manifestRef, feedId) {
    var d = q.defer();
    if (manifestRef && feedId) {
      this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A device manifest reference must be supplied.');
    }
    return d.promise;
  };

  /*
   * Devices
   */

  DeviceManifests.prototype.getAllDevices = function (manifestRef) {
    var d = q.defer();
    if (manifestRef) {
      this.sendRequest('/device-manifests/' + manifestRef + '/devices/', 'GET', d);
    }
    else {
      d.reject('Bad Request. A device manifest reference must be supplied.');
    }
    return d.promise;
  };

  DeviceManifests.prototype.getDevice = function (manifestRef, feedId) {
    var d = q.defer();
    if (manifestRef && feedId) {
      this.sendRequest('/device-manifests/' + manifestRef + '/devices/' + feedId, 'GET', d);
    }
    else {
      d.reject('Bad Request. Both a device manifest reference and a device id must be supplied.');
    }
    return d.promise;
  };

  return DeviceManifests;

})();

module.exports = DeviceManifests;
