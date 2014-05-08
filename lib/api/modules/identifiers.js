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
    return this.sendRequest('/identifiers/', 'GET');
  };

  Identifiers.prototype.get = function (identifier) {
    if (identifier) {
      return this.sendRequest('/identifiers/' + identifier, 'GET');
    }
    else {
      return this.rejectRequest('Bad Request. An identifier must be supplied.');
    }
  };

  Identifiers.prototype.remove = function (identifier) {
    if (identifier) {
      return this.sendRequest('/identifiers/' + identifier, 'DELETE');
    }
    else {
      return this.rejectRequest('Bad Request. An identifier must be supplied.');
    }
  };

  return Identifiers;

}).apply(this, arguments);

module.exports = Identifiers;
