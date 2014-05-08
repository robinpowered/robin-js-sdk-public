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
util = require('../../util');
q = require('q');

Auth = (function () {

  function Auth (robin) {
    util.__copyProperties(this, robin);
  }

  Auth.prototype.getAccessTokenInfo = function () {
    return this.sendRequest('/auth/', 'GET');
  };

  return Auth;

}).apply(this, arguments);

module.exports = Auth;
