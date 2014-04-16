/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Triggers, q, util;
util = require('../util');
q = require('q');

Triggers = (function () {

  function Triggers (robin) {
    util.__copyProperties(this, robin);
  }

  return Triggers;

})();

module.exports = Triggers;