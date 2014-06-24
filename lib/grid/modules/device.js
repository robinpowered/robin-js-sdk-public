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
    util = require('../../util'),
    Device;

  function Device (grid) {
    util.__copyProperties(this, grid);
  }

  util.__extends(Device, Connection);

  Device.prototype.connect = function (identifier) {
    this.endpoint = 'devices';
    this.identifier = identifier;
    return new Connection(this);
  };

  return Device;
}).call(this);
