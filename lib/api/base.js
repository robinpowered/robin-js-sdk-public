/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinApiBase, fs, path, q, request, util;
fs = require('fs');
path = require('path');
q = require('q');
request = require('request');
util = require('../util');

RobinApiBase = (function () {

  function _RobinApiBase () {
    this.baseUrl = null;
    this.placesApiBaseUrl = null;
  }

  _RobinApiBase.prototype.setCoreUrl = function (baseUrl) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  };

  _RobinApiBase.prototype.getCoreUrl = function () {
    if (this.baseUrl) {
      return this.baseUrl;
    }
  };

  _RobinApiBase.prototype.setPlacesUrl = function (placesApiBaseUrl) {
    if (placesApiBaseUrl) {
      this.placesApiBaseUrl = placesApiBaseUrl;
    }
  };

  _RobinApiBase.prototype.getPlacesUrl = function () {
    if (this.placesApiBaseUrl) {
      return this.placesApiBaseUrl;
    }
  };

  _RobinApiBase.prototype.setAccessToken = function(token) {
    if (token) {
      this._accessToken = token;
    }
  };

  _RobinApiBase.prototype.getAccessToken = function() {
    if (this._accessToken) {
      return this._accessToken;
    }
  };

  _RobinApiBase.prototype.setRelayIdentifier = function(relayIdentifier) {
    if (relayIdentifier) {
      this._relayIdentifier = relayIdentifier;
    }
  };

  _RobinApiBase.prototype.getRelayIdentifier = function() {
    if (this._relayIdentifier) {
      return this._relayIdentifier;
    }
  };

  _RobinApiBase.prototype.isSuccess = function(error, res) {
    var success = function (status) {
      return 200 <= status && status < 300;
    };
    if (!error && res && success(res.statusCode)) {
      return true;
    }
    return false;
  };

  _RobinApiBase.prototype.sendRequest = function(endpoint, method, json, queryStringObj, usePlacesAPI) {
    var options,
        self = this,
        deferred = q.defer();

    // Have to do this check because we need to transparently handle both the places and core API in the same module.
    try {
      if (usePlacesAPI) {
        options = this.buildOptions(endpoint, method, json, queryStringObj, usePlacesAPI);
      } else {
        options = this.buildOptions(endpoint, method, json, queryStringObj);
      }
      request(options, function(error, response, body) {
        var resp = {},
            responseBody;
        try {
          if (typeof body === 'string') {
            responseBody = JSON.parse(body);
          } else {
            responseBody = body;
          }
        } catch (err) {
          return deferred.reject('An error occurred parsing the following response from the server: ' + body);
        }
        resp.body = responseBody;
        if (self.isSuccess(error, response)) {
          if (method === 'GET' && resp.body.paging) {
            var pageSize, thisPage, prevPage, nextPage, pageFunc;
            pageSize = resp.body.paging.per_page;
            thisPage = resp.body.paging.page;
            prevPage = (thisPage === 1 ? thisPage : thisPage - 1);
            nextPage = thisPage + 1;
            pageFunc = function (pageNum) {
              var _pageNum;
              _pageNum = pageNum;
              return function () {
                queryStringObj = (queryStringObj === undefined || !queryStringObj) ? {}: queryStringObj;
                queryStringObj.page = _pageNum;
                queryStringObj.per_page = pageSize;
                return self.sendRequest(endpoint, method, json, queryStringObj, usePlacesAPI);
              };
            };
            resp.nextPage = pageFunc(nextPage);
            resp.prevPage = pageFunc(prevPage);
          }
          return deferred.resolve(resp);
        }
        else {
          return deferred.reject(resp);
        }
      });
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  };

  _RobinApiBase.prototype.buildOptions = function(endpoint, method, json, queryStringObj, usePlacesAPI) {
    var options,
        baseUrl,
        accessToken = this.getAccessToken(),
        relayIdentifier = this.getRelayIdentifier();

    if (usePlacesAPI) {
      baseUrl = this.getPlacesUrl();
    } else {
      baseUrl = this.getCoreUrl();
    }

    options = {
      uri: baseUrl + endpoint,
      method: method,
      headers: {}
    };

    if (accessToken) {
      options.headers.Authorization = 'Access-Token ' + accessToken;
    } else {
      throw new Error('The required Access Token is missing or malformed');
    }

    if (relayIdentifier) {
      options.headers['Relay-Identifier'] = relayIdentifier;
    }

    if (json) {
      options.json = json;
    }

    if (queryStringObj) {
      options.qs = queryStringObj;
    }
    return options;
  };

  _RobinApiBase.prototype.rejectRequest = function (message) {
    var deferred = q.defer();
    deferred.reject(message);
    return deferred.promise;
  };

  return _RobinApiBase;

}).apply(this, arguments);

module.exports = RobinApiBase;
