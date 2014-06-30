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
 * @return {Function}      The Robin SDK Object.
 */
module.exports = (function () {
  var RobinApi = require('./lib/api'),
      RobinGrid = require('./lib/grid'),
      util = require('util'),
      EventEmitter = require('events').EventEmitter;

  function Robin (accessToken) {
    if (!accessToken) {
      throw new TypeError('A Robin Access Token must be supplied');
    }
    Robin.super_.constructor.call(this);
    var coreApiUrl = 'https://api.robinpowered.com/v1.0',
        placesApiUrl = 'https://apps.robinpowered.com/v1.0',
        gridUrl = 'https://grid.robinpowered.com/v1.0';
    this.api = new RobinApi(accessToken, coreApiUrl, placesApiUrl);
    this.grid = new RobinGrid(accessToken, gridUrl);
  }

  util.inherits(Robin, EventEmitter);

  /**
   * Set a relay identifier for requests to Robin
   * @param {String} relayIdentifier A Robin Identifier for a relay device.
   */
  Robin.prototype.setRelayIdentifier = function (relayIdentifier) {
    this.api.setRelayIdentifier(relayIdentifier);
    this.grid.setRelayIdentifier(relayIdentifier);
  };

  return Robin;
}).call(this);
