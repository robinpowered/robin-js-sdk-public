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
 * @return {Function} The Robin Grid object.
 */
RobinGrid = (function (_super) {

  function _RobinGrid (accessToken, baseUrl) {
    _RobinGrid.__super__.constructor.apply(this, arguments);
    this.subscriptions = [];
    this.setAccessToken(accessToken);
    this.setBaseUrl(baseUrl);
    this.setupBindings();
    this.setupFayeClient();
  }

  util.__extends(_RobinGrid, _super);

  /**
   * Bind functions called by emitters to `this`, so that we don't have scope issues.
   */
  _RobinGrid.prototype.setupBindings = function () {
    this.on('joined', this.joined);
    this.join = util.__bind(this.join, this);
  }

  /**
   * Subscribes a client to a channel, fired on a join event
   * @param  {Object} data Object with parameters for joining, including channel to join.
   */
  _RobinGrid.prototype.join = function (channel) {
    var subscription,
        _grid = this;

    subscription = this.fayeClient.subscribe(data.channel, function (message) {
      // Handle message coming through from subscription
    });

    subscription.then(function (resp) {
      console.log('[JOIN::SUCCESS] ' + JSON.stringify(resp));
      _grid.emit('joined', data, subscription);
    }, function (err) {
      console.log('[JOIN::ERROR] ' + JSON.stringify(err));
      throw new Error(err);
    });
  };

  _RobinGrid.prototype.leave = function (channel) {
    console.log('foo');
    this.subscriptions.push(data);
  };

  _RobinGrid.prototype.send = function (channel, data) {

  };

  /**
   * This function sets up the event handling for the Robin SDK.
   * List of events to handle:
   *  - join (channel)
   *  - leave (channel)
   *  - data
   *  - command
   *  - send (message)
   */
  _Robin.prototype.setupEventHandlers = function () {
    this.on('join', this.grid.join);
    // this.on('leave', this.grid.leave);
  };

  return _RobinGrid;

})(RobinGridBase);

module.exports = RobinGrid;
