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

  Apps.prototype.getAll = function() {
    var d = q.defer();
    this.sendRequest('/apps/', 'GET', d);
    return d.promise;
  };

  Apps.prototype.get = function (id_or_slug) {
    var d = q.defer();
    if (id_or_slug) {
      this.sendRequest('/apps/' + id_or_slug, 'GET', d);
    }
    else {
      d.reject('Bad Request. An id or slug must be supplied for this operation.');
    }
    return d.promise;
  };

  Apps.prototype.update = function (id_or_slug, data) {
    var d = q.defer();
    if (id_or_slug && data) {
      this.sendRequest('/apps/' + id_or_slug, 'POST', d, data);
    }
    else {
      d.reject('Bad Request. An id or slug along with a data object must be supplied for this operation.');
    }
    return d.promise;
  };

  Apps.prototype.remove = function (id_or_slug) {
    var d = q.defer();
    if (id_or_slug) {
      this.sendRequest('/apps/' + id_or_slug, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. An id or slug must be supplied for this operation.');
    }
    return d.promise;
  };

  return Apps;

})();

module.exports = Apps;
