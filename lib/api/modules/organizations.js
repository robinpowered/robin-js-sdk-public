/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Organizations, q, util;
util = require('../../util');
q = require('q');

Organizations = (function () {

  function Organizations (robin) {
    util.__copyProperties(this, robin);
  }

  Organizations.prototype.createOrganization = function (params) {
    var d = q.defer();
    if (params && params.data) {
      this.sendRequest('/organizations', 'POST', d, params.data);
    } else {
      d.reject('Bad Request. Data must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.updateOrganization = function (params) {
    var d = q.defer();
    if (params && params.id && params.data) {
      this.sendRequest('/organizations/' + params.id, 'PATCH', d, params.data);
    } else {
      d.reject('Bad Request. An id and data must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getUserOrganizations = function () {
    var d = q.defer();
    this.sendRequest('/me/organizations/', 'GET', d);
    return d.promise;
  };

  Organizations.prototype.getOrganization = function (params) {
    var d = q.defer();
    if (params && params.id) {
      this.sendRequest('/organizations/' + params.id, 'GET', d);
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getOrganizationUsers = function (params) {
    var d = q.defer();
    if (params && params.id) {
      this.sendRequest('/organizations/' + params.id + '/users', 'GET', d);
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getOrganizationUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'GET', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.addUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'PUT', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.removeUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'DELETE', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  return Organizations;

})();

module.exports = Organizations;
