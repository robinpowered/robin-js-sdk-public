/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 * When this module is required in JavaScript source, it will allow a
 * child class to extend a parent class, by invoking the function exported
 * by this module.
 */

var Organizations,q;
q = require('q');

Organizations = (function () {

  var _robin;

  function Organizations (robin) {
    _robin = robin;
  }

  Organizations.prototype.createOrganization = function (params) {
    var d = q.defer();
    if (params && params.data) {
      _robin.sendRequest('/organizations', 'POST', d, params.data);
    } else {
      d.reject('Bad Request. Data must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.updateOrganization = function (params) {
    var d = q.defer();
    if (params && params.id && params.data) {
      _robin.sendRequest('/organizations/' + params.id, 'PATCH', d, params.data);
    } else {
      d.reject('Bad Request. An id and data must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getUserOrganizations = function () {
    var d = q.defer();
    _robin.sendRequest('/me/organizations/', 'GET', d);
    return d.promise;
  };

  Organizations.prototype.getOrganization = function (params) {
    var d = q.defer();
    if (params && params.id) {
      _robin.sendRequest('/organizations/' + params.id, 'GET', d);
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getOrganizationUsers = function (params) {
    var d = q.defer();
    if (params && params.id) {
      _robin.sendRequest('/organizations/' + params.id + '/users', 'GET', d);
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.getOrganizationUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      _robin.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'GET', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.addUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      _robin.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'PUT', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  Organizations.prototype.removeUser = function (params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      _robin.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'DELETE', d);
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  };

  return Organizations;

})();

module.exports = Organizations;
