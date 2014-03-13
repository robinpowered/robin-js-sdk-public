'use strict';

var sdkUtils = require('./sdk_utils');
var q = require('q');

var Organizations = {

  createOrganization: function(params) {
    var d = q.defer();
    if (params && params.data) {
      sdkUtils.sendRequest('/organizations', 'POST', d, params.data)
    } else {
      d.reject('Bad Request. Data must be supplied in params object.');
    }
    return d.promise;
  },

  updateOrganization: function(params) {
    var d = q.defer();
    if (params && params.id && params.data) {
      sdkUtils.sendRequest('/organizations/' + params.id, 'PATCH', d, params.data)
    } else {
      d.reject('Bad Request. An id and data must be supplied in params object.');
    }
    return d.promise;
  },

  getUserOrganizations: function() {
    var d = q.defer();
    sdkUtils.sendRequest('/me/organizations/', 'GET', d);
    return d.promise;
  },

  getOrganization: function(params) {
    var d = q.defer();
    if (params && params.id) {
      sdkUtils.sendRequest('/organizations/' + params.id, 'GET', d);
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  },

  getOrganizationUsers: function(params) {
    var d = q.defer();
    if (params && params.id) {
      sdkUtils.sendRequest('/organizations/' + params.id + '/users', 'GET', d)
    } else {
      d.reject('Bad Request. An id must be supplied in params object.');
    }
    return d.promise;
  },

  getOrganizationUser: function(params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      sdkUtils.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'GET', d)
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  },

  addUser: function(params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      sdkUtils.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'PUT', d)
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  },

  removeUser: function(params) {
    var d = q.defer();
    if (params && params.id && params.userId) {
      sdkUtils.sendRequest('/organizations/' + params.id + '/users/' + params.userId, 'DELETE', d)
    } else {
      d.reject('Bad Request. An id and userId must be supplied in params object.');
    }
    return d.promise;
  }

}

module.exports = Organizations;