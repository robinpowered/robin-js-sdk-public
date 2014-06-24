/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

/**
 * The Robin SDK provides the interface for interactions with the API
 * as well as the grid.
 * @param  {Object} _super The superclass this Robin module inherits from.
 * In this case, it is an EventEmitter.
 * @return {Function}      The Robin SDK Object.
 */
module.exports = (function () {
  var RobinApi = require('./lib/api'),
      RobinGrid = require('./lib/grid'),
      util = require('./lib/util'),
      EventEmitter = require('events').EventEmitter;

  function Robin (accessToken, env) {
    if (!accessToken) {
      throw new TypeError('A Robin Access Token must be supplied');
    }
    try {
      Robin.__super__.constructor.call(this);
      var _apiUrl = util.__getRobinUrl('api', env),
          _placesApiUrl = util.__getRobinUrl('apps', env),
          _gridUrl = util.__getRobinUrl('grid', env);
      this.api = new RobinApi(accessToken, _apiUrl, _placesApiUrl);
      this.grid = new RobinGrid(accessToken, _gridUrl);
      this.setupHandlers();
    }
    catch (err) {
      throw err;
    }
  }

  util.__extends(Robin, EventEmitter);

  /**
   * Setup any event handlers for this SDK.
   */
  Robin.prototype.setupHandlers = function () {
    this.grid.on('error', util.__bind(this.onError, this));
  };

  /**
   * Handle any errors that bubble up. Want to intercept them here so we can log them.
   * @param  {String|Object} err An error of some form.
   */
  Robin.prototype.onError = function (err) {
    this.emit('error', err);
  };

  Robin.prototype.setRelayIdentifier = function(relayIdentifier) {
    this.api.setRelayIdentifier(relayIdentifier);
    this.grid.setRelayIdentifier(relayIdentifier);
  };

  return Robin;
}).call(this);
