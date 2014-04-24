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
util = require('../../util');
q = require('q');

Identifiers = (function () {

  function Identifiers (robin) {
    util.__copyProperties(this, robin);
  }

  Identifiers.prototype.getAll = function () {
    var d = q.defer();
    this.sendRequest('/identifiers/', 'GET', d);
    return d.promise;
  };

  Identifiers.prototype.get = function (identifier) {
    var d = q.defer();
    if (identifier) {
      this.sendRequest('/identifiers/' + identifier, 'GET', d);
    }
    else {
      d.reject('Bad Request. An identifier must be supplied.');
    }
    return d.promise;
  };

  Identifiers.prototype.remove = function (identifier) {
    var d = q.defer();
    if (identifier) {
      this.sendRequest('/identifiers/' + identifier, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. An identifier must be supplied.');
    }
    return d.promise;
  };

  return Identifiers;

})();

module.exports = Identifiers;
