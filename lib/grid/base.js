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

/*
 * We're overriding the faye channel names regex to allow `:` characters through
 */

faye.Grammar.CHANNEL_NAME = /^\/(((([a-z]|[A-Z])|[0-9])|(\:|\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\:|\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/;
faye.Grammar.CHANNEL_PATTERN = /^(\/(((([a-z]|[A-Z])|[0-9])|(\:|\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/;

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

  _RobinGridBase.prototype.setRelayIdentifier = function(relayIdentifier) {
    if (relayIdentifier) {
      this._relayIdentifier = relayIdentifier;
    }
  };

  _RobinGridBase.prototype.getRelayIdentifier = function() {
    if (this._relayIdentifier) {
      return this._relayIdentifier;
    }
  };

  _RobinGridBase.prototype.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  _RobinGridBase.prototype.setupFayeClient = function (clientCallback) {
    var outgoingExt;

    if (this._baseUrl) {
      this.fayeClient = new faye.Client(this._baseUrl);
      this.fayeClient.on('transport:down', function () {
        this.emit('error', 'Grid transport is down.');
      }.bind(this));
      outgoingExt = function (message, callback) {
          // Add ext field if it's not present
        if (!message.ext) {
          message.ext = {};
        }
        message.ext.accessToken = this.getAccessToken();
        message.ext.relayIdentifier = this.getRelayIdentifier();
        callback(message);
      }.bind(this);
      this.fayeClient.addExtension({
        outgoing: outgoingExt
      });
    }
  };

  return _RobinGridBase;

}).apply(this, [EventEmitter]);

module.exports = RobinGridBase;
