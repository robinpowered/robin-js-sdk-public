/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Auth, q, util;
util = require('../util');
q = require('q');

Auth = (function () {

  function Auth (robin) {
    util.__copyProperties(this, robin);
  }

  Auth.prototype.getAccessTokenInfo = function () {
    var d = q.defer();
    this.sendRequest('/auth/', 'GET', d);
    return d.promise;
  };

  return Auth;

})();

module.exports = Auth;
