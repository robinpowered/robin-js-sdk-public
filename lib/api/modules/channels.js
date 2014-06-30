/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinUtil = require('../../util'),
    RequestBase = require('../requestBase'),
    util = require('util');

module.exports = (function () {

  function Channels (robin) {
    RobinUtil.__copyProperties(this, robin);
    this.endpoint = '/channels/';
  }

  util.inherits(Channels, RequestBase);

  Channels.prototype.getAll = function () {
    return this.sendRequest(this.endpoint, 'GET');
  };

  Channels.prototype.add = function (data) {
    if (data) {
      return this.sendRequest(this.endpoint, 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Channel data must be supplied.');
    }
  };

  Channels.prototype.get = function (channelId) {
    if (channelId) {
      return this.sendRequest(this.endpoint + channelId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Channel id must be supplied.');
    }
  };

  Channels.prototype.update = function (channelId, data) {
    if (channelId && data) {
      return this.sendRequest(this.endpoint + channelId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. Both a Channel id and new channel data must be supplied.');
    }
  };

  Channels.prototype.remove = function (channelId) {
    if (channelId) {
      return this.sendRequest(this.endpoint + channelId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Channel id must be supplied.');
    }
  };

  /*
   * Channel Data
   */

  Channels.prototype.getAllData = function (channelId) {
    if (channelId) {
      return this.sendRequest(this.endpoint + channelId + '/data/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id must be supplied.');
    }
  };

  Channels.prototype.addData = function (channelId, data) {
    if (channelId && data) {
      return this.sendRequest(this.endpoint + channelId + '/data/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and data must be supplied.');
    }
  };

  Channels.prototype.getData = function (channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest(this.endpoint + channelId + '/data/' + dataId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and data id must be supplied.');
    }
  };

  Channels.prototype.removeData = function (channelId, dataId) {
    if (channelId && dataId) {
      return this.sendRequest(this.endpoint + channelId + '/data/' + dataId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and data id must be supplied.');
    }
  };

  /*
   * Channel Triggers
   */

  Channels.prototype.getAllTriggers = function (channelId) {
    if (channelId) {
      return this.sendRequest(this.endpoint + channelId + '/triggers/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id must be supplied.');
    }
  };

  Channels.prototype.addTrigger = function (channelId, triggerData) {
    if (channelId && triggerData) {
      return this.sendRequest(this.endpoint + channelId + '/triggers/', 'POST', triggerData);
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and trigger data must be supplied.');
    }
  };

  Channels.prototype.getTrigger = function (channelId, triggerId) {
    if (channelId && triggerId) {
      return this.sendRequest(this.endpoint + channelId + '/triggers/' + triggerId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and trigger id must be supplied.');
    }
  };

  Channels.prototype.removeTrigger = function (channelId, triggerId) {
    if (channelId && triggerId) {
      return this.sendRequest(this.endpoint + channelId + '/triggers/' + triggerId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Channel Id and trigger id must be supplied.');
    }
  };

  return Channels;
}).call(this);
