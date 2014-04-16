/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Apps, q, util;
util = require('../util');
q = require('q');

Apps = (function () {

  function Apps (robin) {
    util.__copyProperties(this, robin);
  }

  return Apps;

})();

module.exports = Apps;