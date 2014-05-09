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

  DeviceManifests.prototype.get = function (deviceManifestId) {
    if (deviceManifestId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.update = function (deviceManifestId, data) {
    if (deviceManifestId && data) {
      return this.sendRequest('/device-manifests/' + deviceManifestId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.remove = function (deviceManifestId) {
    if (deviceManifestId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  /*
   * Feeds
   */

  DeviceManifests.prototype.getAllFeeds = function (deviceManifestId) {
    if (deviceManifestId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/feeds/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.addFeed = function (deviceManifestId, data) {
    if (deviceManifestId && data) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/feeds/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Both device manifest data and a manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.getFeed = function (deviceManifestId, feedId) {
    if (deviceManifestId && feedId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/feeds/' + feedId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a device manifest reference and a feed id must be supplied.');
    }
  };

  DeviceManifests.prototype.updateFeed = function (deviceManifestId, feedId, data) {
    if (deviceManifestId && feedId && data) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/feeds/' + feedId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference, a feed id and feed data must be supplied.');
    }
  };

  DeviceManifests.prototype.removeFeed = function (deviceManifestId, feedId) {
    if (deviceManifestId && feedId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/feeds/' + feedId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  /*
   * Devices
   */

  DeviceManifests.prototype.getAllDevices = function (deviceManifestId) {
    if (deviceManifestId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/devices/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A device manifest reference must be supplied.');
    }
  };

  DeviceManifests.prototype.getDevice = function (deviceManifestId, deviceId) {
    if (deviceManifestId && deviceId) {
      return this.sendRequest('/device-manifests/' + deviceManifestId + '/devices/' + deviceId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Both a device manifest reference and a device id must be supplied.');
    }
  };

  return DeviceManifests;

}).apply(this, arguments);

module.exports = DeviceManifests;
