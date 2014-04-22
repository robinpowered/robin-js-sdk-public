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
RobinGridBase = (function () {

  function _RobinGridBase() {
  }

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

  _RobinGridBase.prototype.setupFayeClient = function () {
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

})();

/**
 * This is the Robin Grid class
 * @return {Function} The Robin Grid object.
 */
RobinGrid = (function (_super) {

  function _RobinGrid (accessToken, baseUrl) {
    _RobinGrid.__super__.constructor.apply(this, arguments);
    this.setAccessToken(accessToken);
    this.setBaseUrl(baseUrl);
    this.setupFayeClient();
    console.log(this.fayeClient);
    this.fayeClient.publish('/devices/55', {message: 'foobar'});
  }

  util.__extends(_RobinGrid, _super);

  return _RobinGrid;

})(RobinGridBase);

module.exports = RobinGrid;
