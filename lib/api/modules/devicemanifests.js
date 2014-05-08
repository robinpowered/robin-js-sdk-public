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
util = require('../../util');
q = require('q');

DeviceManifests = (function () {

  function DeviceManifests (robin) {
    util.__copyProperties(this, robin);
  }

  DeviceManifests.prototype.getAll = function () {
    return this.sendRequest('/device-manifests/', 'GET');
  };

  DeviceManifests.prototype.add = function (data) {
    if (data) {
      return this.sendRequest('/device-manifests/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Device manifest data must be supplied.');
    }
  };

  DeviceManifests.prototype.get = function (manifestRef) {
    if (manifestRef) {
      return this.sendRequest('/device-manifests/' + manifestRef, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.update = function (manifestRef, data) {
    if (manifestRef && data) {
      return this.sendRequest('/device-manifests/' + manifestRef, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.remove = function (manifestRef) {
    if (manifestRef) {
      return this.sendRequest('/device-manifests/' + manifestRef, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  /*
   * Feeds
   */

  DeviceManifests.prototype.getAllFeeds = function (manifestRef) {
    if (manifestRef) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/feeds/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.addFeed = function (manifestRef, data) {
    if (manifestRef && data) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/feeds/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.getFeed = function (manifestRef, feedId) {
    if (manifestRef && feedId) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a device manifest reference and a feed id must be supplied.');
    }
  };

  DeviceManifests.prototype.updateFeed = function (manifestRef, feedId, data) {
    if (manifestRef && feedId && data) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference, a feed id and feed data must be supplied.');
    }
  };

  DeviceManifests.prototype.removeFeed = function (manifestRef, feedId) {
    if (manifestRef && feedId) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/feeds/' + feedId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  /*
   * Devices
   */

  DeviceManifests.prototype.getAllDevices = function (manifestRef) {
    if (manifestRef) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/devices/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.getDevice = function (manifestRef, feedId) {
    if (manifestRef && feedId) {
      return this.sendRequest('/device-manifests/' + manifestRef + '/devices/' + feedId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a device manifest reference and a device id must be supplied.');
    }
  };

  return DeviceManifests;

}).apply(this, arguments);

module.exports = DeviceManifests;
