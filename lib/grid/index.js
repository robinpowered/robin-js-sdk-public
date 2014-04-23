/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinGrid,
    RobinGridBase,
    util = require('../util'),
    config = require('../../config'),
    q = require('q'),
    faye = require('faye'),
    EventEmitter = require('events').EventEmitter;

/**
 * This is the base class for the Robin Grid integration. This should be the
 * place where authentication and authorization is set up.
 * @return {Function} The Robin Grid base class object.
 */
RobinGridBase = (function (_super) {

  function _RobinGridBase() {

  }

  util.__extends(_RobinGridBase, _super);

  _RobinGridBase.prototype.setAccessToken = function(token) {
    if (token) {
      this._accessToken = token;
    }
  };

  _RobinGridBase.prototype.getAccessToken = function() {
    if (this._accessToken) {
      return this._accessToken;
    }
  };

  _RobinGridBase.prototype.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  _RobinGridBase.prototype.setupFayeClient = function (clientCallback) {
    var _accessToken = this._accessToken;
    if (this._baseUrl) {
      this.fayeClient = new faye.Client(this._baseUrl);
      this.fayeClient.addExtension({
        outgoing: function (message, callback) {
          // Add ext field if it's not present
          if (!message.ext) {
            message.ext = {};
          }
          message.ext.accessToken = _accessToken;
          callback(message);
        }
      });
    }
  };

  return _RobinGridBase;

})(EventEmitter);

/**
 * This is the Robin Grid class
 * It exposes several methods:
 *   - join
 *   - leave
 *   - send
 * @return {Function} The Robin Grid object.
 */
RobinGrid = (function (_super) {

  function _RobinGrid (accessToken, baseUrl) {
    _RobinGrid.__super__.constructor.apply(this, arguments);
    this.subscriptions = {};
    this.setAccessToken(accessToken);
    this.setBaseUrl(baseUrl);
    this.setupFayeClient();
  }

  util.__extends(_RobinGrid, _super);

  /**
   * Subscribes a client to a channel, fired on a join event
   * @param  {Object} data Object with parameters for joining, including channel to join.
   */
  _RobinGrid.prototype.join = function (channel) {
    var subscription,
        _grid = this;

    subscription = this.fayeClient.subscribe(channel, function (message) {
      // Handle message coming through from subscription
      // Emit on this grid instance
      _grid.emit(channel, message);
    });

    subscription.then(function (resp) {
      console.log('[JOIN::SUCCESS] ' + JSON.stringify(resp));
      _grid.subscriptions[channel] = subscription;
    }, function (err) {
      console.log('[JOIN::ERROR] ' + JSON.stringify(err));
      throw new Error(err);
    });
  };

  /**
   * Disconnect from a channel subscription
   * @param  {String} channel A channel identifier
   */
  _RobinGrid.prototype.leave = function (channel) {
    this.subscriptions[channel].disconnect();
    this.subscriptions[channel] = undefined;
  };

  /**
   * Send a message to a channel
   * @param  {String} channel A channel identifier
   * @param  {Object} message An object that contains what you want to send to a channel
   */
  _RobinGrid.prototype.send = function (channel, message) {
    this.fayeClient.publish(channel, message);
  };

  return _RobinGrid;

})(RobinGridBase);

module.exports = RobinGrid;
