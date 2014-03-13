'use strict';

var sdkUtils = require('./sdk_utils');
var q = require('q');
var orgs = require('./organizations');
var users = require('./users');
var settings = require('./settings');

var CoreSdk = {

  setAuthToken: function(token) {
    if (token) {
      this._authToken = token;
      sdkUtils.setAuthToken(token);
    }
  },

  setBaseUrl: function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
      sdkUtils.setBaseUrl(baseUrl);
    }
  },

  getCurrentUser: function() {
    var d = q.defer();
    sdkUtils.sendRequest('/me', 'GET', d);
    return d.promise;
  }

}

sdkUtils.extend(CoreSdk, orgs, users, settings);

module.exports = CoreSdk;
