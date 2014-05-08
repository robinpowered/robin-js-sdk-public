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
    if (params && params.data) {
      return this.sendRequest('/organizations', 'POST', params.data);
    } else {
      return this.rejectRequest('Bad Request. Data must be supplied in params object.');
    }
  };

  Organizations.prototype.updateOrganization = function (params) {
    if (params && params.id && params.data) {
      return this.sendRequest('/organizations/' + params.id, 'PATCH', params.data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied in params object.');
    }
  };

  Organizations.prototype.getUserOrganizations = function () {
    return this.sendRequest('/me/organizations/', 'GET');
  };

  Organizations.prototype.getOrganization = function (params) {
    if (params && params.id) {
      return this.sendRequest('/organizations/' + params.id, 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied in params object.');
    }
  };

  Organizations.prototype.getOrganizationUsers = function (params) {
    if (params && params.id) {
      return this.sendRequest('/organizations/' + params.id + '/users', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied in params object.');
    }
  };

  Organizations.prototype.getOrganizationUser = function (params) {
    if (params && params.id && params.userId) {
      return this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied in params object.');
    }
  };

  Organizations.prototype.addUser = function (params) {
    if (params && params.id && params.userId) {
      return this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied in params object.');
    }
  };

  Organizations.prototype.removeUser = function (params) {
    if (params && params.id && params.userId) {
      return this.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied in params object.');
    }
  };

  return Organizations;

}).apply(this, arguments);

module.exports = Organizations;
