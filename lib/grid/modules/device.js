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
  var Connection = require('../connection'),
    util = require('util'),
    RbnUtil = require('../../util');

  function Device (grid) {
    RbnUtil.__copyProperties(this, grid);
  }

  util.inherits(Device, Connection);

  Device.prototype.connect = function (identifier) {
    if (identifier) {
      this.endpoint = 'devices';
      this.identifier = identifier;
      return new Connection(this);
    } else {
      throw new TypeError('An the identifier of the entity to which you wish to connect must be supplied');
    }
  };

  return Device;
}).call(this);
