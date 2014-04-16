/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Accounts, q, util;
util = require('../util');
q = require('q');

Accounts = (function () {

  function Accounts (robin) {
    util.__copyProperties(this, robin);
  }

  return Accounts;

})();

module.exports = Accounts;