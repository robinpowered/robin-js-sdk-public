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
      q = require('q'),
      util = require('./util');

  function Connection () {

  }

  util.__extends(Connection, Grid);

  Connection.prototype.join = function(first_argument) {

  };

  return Connection;
}).call(this);
