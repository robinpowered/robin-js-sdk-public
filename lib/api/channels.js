/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Channels, q, util;
util = require('../util');
q = require('q');

Channels = (function () {

  function Channels (robin) {
    util.__copyProperties(this, robin);
  }

  Channels.prototype.getAll = function () {
    var d = q.defer();
    this.sendRequest('/channels/', 'GET', d);
    return d.promise;
  };

  Channels.prototype.add = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/channels/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Channel data must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.get = function(id) {
    var d = q.defer();
    if (id) {
      this.sendRequest('/channels/' + id, 'GET', d);
    }
    else {
      d.reject('Bad Request. A channel id must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.update = function(id, data) {
    var d = q.defer();
    if (id && data) {
      this.sendRequest('/channels/' + id, 'PATCH', d, data);
    }
    else {
      d.reject('Bad Request. Both a channel id and new channel data must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.remove = function (id) {
    var d = q.defer();
    if (id) {
      this.sendRequest('/channels/' + id, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A channel id must be supplied.');
    }
    return d.promise;
  };

  /*
   * Channel Data
   */

  Channels.prototype.getAllData = function (channelId) {
    var d = q.defer();
    if (channelId) {
      this.sendRequest('/channels/' + channelId + '/data/', 'GET', d);
    }
    else {
      d.reject('Bad Request. Channel id must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.addData = function (channelId, data) {
    var d = q.defer();
    if (channelId && data) {
      this.sendRequest('/channels/' + channelId + '/data/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Channel id and data must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.getData = function(channelId, dataId) {
    var d = q.defer();
    if (channelId && dataId) {
      this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'GET', d);
    }
    else {
      d.reject('Bad Request. Channel id and data id must be supplied.');
    }
    return d.promise;
  };

  Channels.prototype.removeData = function (channelId, dataId) {
    var d = q.defer();
    if (channelId && dataId) {
      this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. Channel id and data id must be supplied.');
    }
    return d.promise;
  };

  return Channels;

})();

module.exports = Channels;
