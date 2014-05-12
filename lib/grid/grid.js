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
    RobinGridBase = require('./base'),
    util = require('../util');

/**
 * This is the Robin Grid class
 * It exposes several methods:
 *   - join
 *   - leave
 *   - send
 * @return {Function} The Robin Grid object.
 */
RobinGrid = (function (_super) {

  function _RobinGrid (accessToken, baseStationIdentifier, baseUrl) {
    _RobinGrid.__super__.constructor.apply(this, arguments);
    this.subscriptions = {};
    this.setAccessToken(accessToken);
    this.setBaseStationIdentifier(baseStationIdentifier);
    this.setBaseUrl(baseUrl);
    this.setupFayeClient();
  }

  util.__extends(_RobinGrid, _super);

  /**
   * Subscribes a client to a channel, fired on a join event
   * @param  {Object} data Object with parameters for joining, including channel to join.
   */
  _RobinGrid.prototype.join = function (channel, callback) {
    var subscription,
        _grid = this;

    if (channel in this.subscriptions) {
      console.log('[JOIN::ERROR] You have already joined this channel');
    } else {
      subscription = this.fayeClient.subscribe(channel, function (message) {
        // TODO: Figure out how we want to emit these
        // Emit using the channel for now
        _grid.emit(channel, message);
      });

      subscription.then(function (resp) {
        console.log('[JOIN::SUCCESS] ' + JSON.stringify(resp));
        _grid.subscriptions[channel] = subscription;
        callback();
      }, function (err) {
        console.log('[JOIN::ERROR] ' + JSON.stringify(err));
        _grid.emit('error', err);
      });
    }
  };

  /**
   * Disconnect from a channel subscription
   * @param  {String} channel A channel identifier
   */
  _RobinGrid.prototype.leave = function (channel, callback) {
    if (channel) {
      if (channel in this.subscriptions) {
        console.log('[LEAVING] ' + channel);
        this.subscriptions[channel].cancel();
        this.subscriptions[channel] = undefined;
        callback();
      } else {
        this.emit('error', 'You have not joined this channel.');
      }
    } else {
      this.emit('error', 'You must provide a channel to leave.');
    }


  };

  /**
   * Send a message along the grid
   * @param  {String}   endpoint          A Robin endpoint to send this message to. Can be `'channels'` or `'data'`
   * @param  {String}   messageIdentifier The identifier of the device from which this message originates.
   * @param  {String}   messageType       The type of message to send can be `'command'` or `'data'`.
   * @param  {Object}   messageData       The message payload to send along the grid
   * @param  {Function} callback          A callback to execute after a message is successfully sent
   */
  _RobinGrid.prototype.send = function (endpoint, messageIdentifier, messageType, messageData, callback) {
    var robinChannel,
        published,
        _grid = this;

    robinChannel = '/' + endpoint + '/' + messageIdentifier + '/' + messageType;
    published = this.fayeClient.publish(robinChannel, messageData);

    published.then(function (resp) {
      callback(resp);
    }, function (err) {
      console.log('[SEND::ERROR] ' + JSON.stringify(err));
      _grid.emit('error', err);
    });
  };

  return _RobinGrid;

}).apply(this, [RobinGridBase]);

module.exports = RobinGrid;
