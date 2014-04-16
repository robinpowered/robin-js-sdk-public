/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Identifiers, q, util;
util = require('../util');
q = require('q');

Identifiers = (function () {

  function Identifiers (robin) {
    util.__copyProperties(this, robin);
  }

  return Identifiers;

})();

module.exports = Identifiers;