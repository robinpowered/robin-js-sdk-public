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

  function Connection (_endpoint, _identifier, _type) {
    this.endpoint = _endpoint;
    this.identifier = _identifier;
    this.type = _type;
  }

  util.__extends(Connection, Grid);

  Connection.prototype.join = function (_endpoint, _identifier, _type, callback) {
    this.connectStr = '/' + this.endpoint + '/' + this.identifier + '/' +  this.type;
    this.connection = this.fayeClient.subscribe(this.connectStr, function (message) {
      this.emit(this.type, message);
    }.bind(this));

    this.connection.then(function (resp) {
      if (callback) {
        callback(null, resp);
      }
    }.bind(this), function (err) {
      if (callback) {
        callback(err);
      }
      this.emit('err', err);
    }.bind(this));
  };

  Connection.prototype.leave = function (callback) {
    if (this.connection) {
      this.connection.cancel();
    }
  };

  return Connection;
}).call(this);
