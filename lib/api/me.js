/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Me, q, util;
util = require('../util');
q = require('q');

Me = (function () {

  function Me (robin) {
    util.__copyProperties(this, robin);
  }

  Me.prototype.get = function () {
    var d = q.defer();
    this.sendRequest('/me/', 'GET', d);
    return d.promise;
  };

  return Me;

})();

module.exports = Me;
