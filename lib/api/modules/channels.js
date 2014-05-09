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

  Channels.prototype.get = function(channelId) {
    if (channelId) {
      return this.sendRequest('/channels/' + channelId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A channel channelId must be supplied.');
    }
  };

  Channels.prototype.update = function(channelId, data) {
    if (channelId && data) {
      return this.sendRequest('/channels/' + channelId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both a channel channelId and new channel data must be supplied.');
    }
  };

  Channels.prototype.remove = function (channelId) {
    if (channelId) {
      return this.sendRequest('/channels/' + channelId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A channel channelId must be supplied.');
    }
  };

  /*
   * Channel Data
   */

  Channels.prototype.getAllData = function (channelId) {
    if (channelId) {
      return this.sendRequest('/channels/' + channelId + '/data/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId must be supplied.');
    }
  };

  Channels.prototype.addData = function (channelId, data) {
    if (channelId && data) {
      return this.sendRequest('/channels/' + channelId + '/data/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and data must be supplied.');
    }
  };

  Channels.prototype.getData = function(channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and data channelId must be supplied.');
    }
  };

  Channels.prototype.removeData = function (channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest('/channels/' + channelId + '/data/' + dataId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and data channelId must be supplied.');
    }
  };

  /*
   * Channel Triggers
   */

  Channels.prototype.getAllTriggers = function (channelId) {
    if (channelId) {
      return this.sendRequest('/channels/' + channelId + '/triggers/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId must be supplied.');
    }
  };

  Channels.prototype.addTrigger = function (channelId, triggerData) {
    if (channelId && triggerData) {
      return this.sendRequest('/channels/' + channelId + '/triggers/', 'POST', triggerData);
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and trigger data must be supplied.');
    }
  };

  Channels.prototype.getTrigger = function(channelId, triggerId) {
    if (channelId && triggerId) {
      return this.sendRequest('/channels/' + channelId + '/triggers/' + triggerId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and trigger channelId must be supplied.');
    }
  };

  Channels.prototype.removeTrigger = function (channelId, triggerId) {
    if (channelId && triggerId) {
      return this.sendRequest('/channels/' + channelId + '/triggers/' + triggerId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. Channel channelId and trigger channelId must be supplied.');
    }
  };

  return Channels;

}).apply(this, arguments);

module.exports = Channels;
