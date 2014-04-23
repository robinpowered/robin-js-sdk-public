/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Robin,
  RobinApi = require('./lib/api'),
  RobinGrid = require('./lib/grid'),
  util = require('./lib/util'),
  config = require('./config'),
  EventEmitter = require('events').EventEmitter;

/**
 * The Robin SDK provides the interface for interactions with the API
 * as well as the grid.
 * @param  {Object} _super The superclass this Robin module inherits from.
 * In this case, it is an EventEmitter.
 * @return {Function}      The Robin SDK Object.
 */
Robin = (function(_super) {

  function _Robin (accessToken) {
    _Robin.__super__.constructor.call(this);
    this.api = new RobinApi(accessToken, config.apiUrl);
    this.grid = new RobinGrid(accessToken, config.gridUrl);
    this.setupHandlers();
  }

  util.__extends(_Robin, _super);

  /**
   * Setup any event handlers for this SDK.
   */
  _Robin.prototype.setupHandlers = function () {
    this.grid.on('error', util.__bind(this.onError, this));
  };

  /**
   * Handle any errors that bubble up. Want to intercept them here so we can log them.
   * @param  {[String|Object]} err An error of some form.
   */
  _Robin.prototype.onError = function (err) {
    this.emit('error', err);
  };

  return _Robin;

})(EventEmitter);

module.exports = Robin;
