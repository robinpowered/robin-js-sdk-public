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
util = require('../../util');
q = require('q');

Accounts = (function () {

  function Accounts (robin) {
    util.__copyProperties(this, robin);
  }

  Accounts.prototype.get = function (slug) {
    var d = q.defer();
    if (slug) {
      this.sendRequest('/accounts/' + slug, 'GET', d);
    }
    else {
      d.reject('Bad Request. A slug must be supplied for this operation');
    }
    return d.promise;
  };

  return Accounts;

})();

module.exports = Accounts;
