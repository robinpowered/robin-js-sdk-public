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

  // util.inherits(Channels, RequestBase);

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

var CHANNELS = 'channels',
    DATA = 'data',
    TRIGGERS = 'triggers';

module.exports = {
  /**
   * Get all the channels or a particular channel identified by the `identifier` parameter
   * @param  {String|Integer|undefined} identifier A Robin channel identifier
   * @param  {Object|undefined}         params     A querystring object
   * @return {Function}                            A Promise
   */
  get: function (identifier, params) {
    var path = this.constructPath(CHANNELS, identifier);
    return this.Core.GET(path, params);
  },

  /**
   * Create a channel
   * @param  {Object}   data           A data object
   * @return {Function}                A Promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(CHANNELS);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required.');
    }
  },

  /**
   * Update a channel
   * @param  {String|Integer|undefined} identifier A Robin channel identifier
   * @param  {Object}                   data       A data object
   * @return {Function}                            A Promise
   */
  update: function (identifier, data) {
    var path;
    if (identifier && data) {
      path = this.constructPath(CHANNELS, identifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: A channel identifier and a data object are required.');
    }
  },

  /**
   * Delete a channel
   * @param  {String|Integer|undefined} identifier A Robin channel identifier
   * @return {Function}                            A Promise
   */
  delete: function (identifier)  {
    var path;
    if (identifier) {
      path = this.constructPath(CHANNELS, identifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A channel identifier is required.');
    }
  },

  /**
   * Channel Data
   * @type {Object}
   */
  data: {
    /**
     * Get all the data from a channel or a particular channel data point identified by `dataIdentifier`
     * @param  {String|Integer}           channelIdentifier A Robin channel identifier
     * @param  {String|Integer|undefined} dataIdentifier    A Robin channel data point identifier
     * @param  {Object|undefined}         params            A querystring object
     * @return {Function}                                   A Promise
     */
    get: function (channelIdentifier, dataIdentifier, params) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, DATA, dataIdentifier);
        this.Core.GET(path, params);
      } else {
        this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Add data to a channel
     * @param  {String|Integer}   channelIdentifier A Robin channel identifier
     * @param  {Object}           data              A querystring object
     * @return {Function}                           A Promise
     */
    add: function (channelIdentifier, data) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, DATA);
        this.Core.POST(path, data);
      } else {
        this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Delete a data point from a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} dataIdentifier    A Robin channel data point identifier
     * @return {Function}                         A Promise
     */
    delete: function (channelIdentifier, dataIdentifier) {
      var path;
      if (channelIdentifier && dataIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, DATA, dataIdentifier);
        this.Core.DELETE(path);
      } else {
        this.rejectRequest('Bad Request: A channel identifier and a data point identifier are required.');
      }
    }
  },

  /**
   * Channel Triggers
   * @type {Object}
   */
  triggers: {
    /**
     * Get all the triggers on a channel or a particular channel trigger identified by `triggerIdentifier`
     * @param  {String|Integer}           channelIdentifier A Robin channel identifier
     * @param  {String|Integer|undefined} triggerIdentifier A Robin channel trigger identifier
     * @param  {Object|undefined}         params            A querystring object
     * @return {Function}                                   A Promise
     */
    get: function (channelIdentifier, triggerIdentifier, params) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, TRIGGERS, triggerIdentifier);
        this.Core.GET(path, params);
      } else {
        this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Add a trigger to a channel
     * @param  {String|Integer}   channelIdentifier A Robin channel identifier
     * @param  {Object}           data              A querystring object
     * @return {Function}                           A Promise
     */
    add: function (channelIdentifier, data) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, TRIGGERS);
        this.Core.POST(path, data);
      } else {
        this.rejectRequest('Bad Request: A channel identifier and a data object are required.');
      }
    },

    /**
     * Update a trigger on a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} triggerIdentifier A Robin channel trigger identifier
     * @param  {Object}         data              A querystring object
     * @return {Function}                         A Promise
     */
    update: function (channelIdentifier, triggerIdentifier, data) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, TRIGGERS);
        this.Core.PATCH(path, data);
      } else {
        this.rejectRequest('Bad Request: A channel identifier, a trigger identifier and a data object are required.');
      }
    },

    /**
     * Delete a trigger from a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} triggerIdentifier A Robin channel data point identifier
     * @return {Function}                         A Promise
     */
    delete: function (channelIdentifier, triggerIdentifier) {
      var path;
      if (channelIdentifier && triggerIdentifier) {
        path = this.constructPath(CHANNELS, channelIdentifier, TRIGGERS, triggerIdentifier);
        this.Core.DELETE(path);
      } else {
        this.rejectRequest('Bad Request: A channel identifier and a trigger identifier are required.');
      }
    }
  }
};
