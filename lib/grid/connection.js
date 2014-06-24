/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

module.exports = (function () {
  var Grid = require('./grid'),
      util = require('./util');

  function Connection (connectionModule) {
    try {
      util.__copyProperties(this, connectionModule);
      this.validate(endpoint, identifier);
      this.connectionStub = '/' + endpoint + '/' + identifier;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Validates the endpoint and identifier we're using
   * @param  {String} endpoint   A `Robin` endpoint to send this message to. Mirror the endpoints of the `Robin` API
   * @param  {String} identifier The `Robin` identifer of the entity we're making a connection to.
   * @return {[type]}            [description]
   */
  Connection.prototype.validate = function (endpoint, identifier) {
    if (!this.endpoint) {
      throw new TypeError('The supplied endpoint is invalid or malformed.');
    }
    if (!this.identifier) {
      throw new TypeError('The supplied identifier is invalid or malformed.');
    }
  };

  /**
   * Creates the connection with the grid and listens for messages. Emits each message
   * based on the `type` of that message.
   * @param  {Function|undefined} callback    An optional callback to execute. After the message is sent.
   *                                          `callback` should expect arguments of the form (error, response).
   */
  Connection.prototype.listen = function (callback) {
    //Asterisk listens to all message types, so we can emit for different message types
    var listeningChannel = this.connectionStub + '/*';
    this.connection = this.subscribe(listeningChannel, function (message) {
      this.emit(message.ext.type, message.data);
    }.bind(this));
    this.connection.then(function (resp) {
      if (callback) {
        callback(null, resp);
      }
    }, function (err) {
      if (callback) {
        callback(err);
      }
    });
  };

  /**
   * Stops emitting messages from this connection
   */
  Connection.prototype.stop = function (callback) {
    if (this.connection) {
      this.connection.cancel();
      if (callback) {
        callback(null);
      }
    } else {
      if (callback) {
        callback("No connection found");
      }
    }
  };

  /**
   * Send a message along the grid
   * @param  {String}             messageType The type of message to send.
   *                                          This will be used when `emitting` to listeners.
   * @param  {Object}             message     The message payload to send along the grid
   * @param  {Function|undefined} callback    An optional callback to execute. After the message is sent.
   *                                          `callback` should expect arguments of the form (error, response).
   */
  Connection.prototype.send = function(messageType, message, callback) {
    var published,
        sendingChannel = this.connectionStub + '/' + messageType;
    published = this.fayeClient.publish(sendingChannel, message);
    published.then(function (resp) {
      if (callback) {
        callback(null, resp);
      }
    }, function (err) {
      if (callback) {
        callback(err);
      }
    });
  };

  return Connection;
}).call(this);
