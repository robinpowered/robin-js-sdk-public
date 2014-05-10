/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinGridBase,
    util = require('../util'),
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

  _RobinGridBase.prototype.setBaseStationIdentifier = function(baseStationIdentifier) {
    if (baseStationIdentifier) {
      this._baseStationIdentifier = baseStationIdentifier;
    }
  };

  _RobinGridBase.prototype.getBaseStationIdentifier = function() {
    if (this._baseStationIdentifier) {
      return this._baseStationIdentifier;
    }
  };

  _RobinGridBase.prototype.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  _RobinGridBase.prototype.setupFayeClient = function (clientCallback) {
    var _grid = this,
        _accessToken = this.getAccessToken(),
        _baseStationIdentifier = this.getBaseStationIdentifier();

    if (this._baseUrl) {
      this.fayeClient = new faye.Client(this._baseUrl);
      this.fayeClient.on('transport:down', function () {
        _grid.emit('error', 'Grid transport is down.');
      });
      this.fayeClient.addExtension({
        outgoing: function (message, callback) {
          // Add ext field if it's not present
          if (!message.ext) {
            message.ext = {};
          }
          message.ext.accessToken = _accessToken;
          message.ext.baseStationIdentifier = _baseStationIdentifier;
          callback(message);
        }
      });
    }
  };

  return _RobinGridBase;

}).apply(this, [EventEmitter]);

module.exports = RobinGridBase;
