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
    util = require('util'),
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

  util.inherits(_RobinGridBase, _super);

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

  _RobinGridBase.prototype.setupGridMessageHandler = function () {
    var incomingExt, outgoingExt;

    if (this._baseUrl) {
      this.fayeClient = new faye.Client(this._baseUrl);
      this.subscribe = this.fayeClient.subscribe;
      this.fayeClient.on('transport:down', function () {
        this.emit('error', 'Grid transport is down.');
      }.bind(this));
      incomingExt = function (message, callback) {
        var messageChannel = message.channel,
            messageChannelArr = messageChannel.replace(/^\//, '').split('/'),
            messageEndpoint = messageChannelArr[0],
            messageIdentifier = messageChannelArr[1],
            messageType = messageChannelArr[2],
            messageData = message.data;

        message.data = {
          data: messageData
        };
        message.data.ext = {
          channel: messageChannel,
          endpoint: messageEndpoint,
          identifier: messageIdentifier,
          type: messageType
        };
        callback(message);
      }.bind(this);
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
        incoming: incomingExt,
        outgoing: outgoingExt
      });
    }
  };

  return _RobinGridBase;
}).apply(this, [EventEmitter]);

module.exports = RobinGridBase;
