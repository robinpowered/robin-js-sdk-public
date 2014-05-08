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
util = require('../../util');
q = require('q');

Channels = (function () {

  function Channels (robin) {
    util.__copyProperties(this, robin);
  }

  Channels.prototype.getAll = function () {
    return this.sendRequest('/channels/', 'GET');
  };

  Channels.prototype.add = function (data) {
    if (data) {
      return this.sendRequest('/channels/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Channel data must be supplied.');
    }
  };

  Channels.prototype.get = function(id) {
    if (id) {
      return this.sendRequest('/channels/' + id, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A channel id must be supplied.');
    }
  };

  Channels.prototype.update = function(id, data) {
    if (id && data) {
      return this.sendRequest('/channels/' + id, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both a channel id and new channel data must be supplied.');
    }
  };

  Channels.prototype.remove = function (id) {
    if (id) {
      return this.sendRequest('/channels/' + id, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A channel id must be supplied.');
    }
  };

  /*
   * Channel Data
   */
  Channels.prototype.getAllData = function (channelId) {
    if (channelId) {
      return this.sendRequest('/channels/' + channelId + '/data/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel id must be supplied.');
    }
  };

  Channels.prototype.addData = function (channelId, data) {
    if (channelId && data) {
      return this.sendRequest('/channels/' + channelId + '/data/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Channel id and data must be supplied.');
    }
  };

  Channels.prototype.getData = function(channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel id and data id must be supplied.');
    }
  };

  Channels.prototype.removeData = function (channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Channel id and data id must be supplied.');
    }
  };

  return Channels;

}).apply(this, arguments);

module.exports = Channels;
