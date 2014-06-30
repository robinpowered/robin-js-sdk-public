/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var q = require('q'),
    request = require('request');

module.exports = (function () {
  /**
   * The Robin API Base class constructor
   */
  function RobinApiBase () {
  }

  /**
   * Set the base url for the core api
   * @param {String} baseUrl The url of the core api.
   */
  RobinApiBase.prototype.setCoreUrl = function (baseUrl) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  };

  /**
   * Get the base url of the core api.
   * @return {String} The base url of the Core API
   */
  RobinApiBase.prototype.getCoreUrl = function () {
    if (this.baseUrl) {
      return this.baseUrl;
    }
  };

  /**
   * Set the base url for the places api
   * @param {String} placesApiBaseUrl The url of the places api.
   */
  RobinApiBase.prototype.setPlacesUrl = function (placesApiBaseUrl) {
    if (placesApiBaseUrl) {
      this.placesApiBaseUrl = placesApiBaseUrl;
    }
  };

  /**
   * Get the base url of the places api.
   * @return {String} The base url of the Places API
   */
  RobinApiBase.prototype.getPlacesUrl = function () {
    if (this.placesApiBaseUrl) {
      return this.placesApiBaseUrl;
    }
  };

  /**
   * Set the Robin Access Token
   * @param {String} token A Robin Access Token
   */
  RobinApiBase.prototype.setAccessToken = function (token) {
    if (token) {
      this._accessToken = token;
    }
  };

  /**
   * Get the Robin Access Token
   * @return {String} A Robin Access Token
   */
  RobinApiBase.prototype.getAccessToken = function () {
    if (this._accessToken) {
      return this._accessToken;
    }
  };

  /**
   * Set the Robin Relay Identifier
   * @return {String} relayIdentifier A Robin Relay Identifier
   */
  RobinApiBase.prototype.setRelayIdentifier = function (relayIdentifier) {
    if (relayIdentifier) {
      this._relayIdentifier = relayIdentifier;
    }
  };

  /**
   * Get the Robin Relay Identifier
   * @return {String} A Robin Relay Identifier
   */
  RobinApiBase.prototype.getRelayIdentifier = function () {
    if (this._relayIdentifier) {
      return this._relayIdentifier;
    }
  };

  /**
   * Checks to make sure the request was a success
   * @param  {Object}  error An error object from the request
   * @param  {Object}  res   A response object
   * @return {Boolean}       A boolean denoting whether the request was a success
   */
  RobinApiBase.prototype.isSuccess = function (error, res) {
    var success = function (status) {
      return status >= 200 && status < 300;
    };
    if (!error && res && success(res.statusCode)) {
      return true;
    }
    return false;
  };

  RobinApiBase.prototype.sendRequest = function (endpoint, method, payload, usePlacesAPI) {
    var options,
        self = this,
        deferred = q.defer();

    // Have to do this check because we need to transparently handle both the places and core API in the same module.
    try {
      if (usePlacesAPI) {
        options = this.buildOptions(endpoint, method, payload, usePlacesAPI);
      } else {
        options = this.buildOptions(endpoint, method, payload);
      }
      request(options, function (error, response, body) {
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
            pageSize = resp.body.paging['per_page'];
            thisPage = resp.body.paging.page;
            prevPage = (thisPage === 1 ? thisPage : thisPage - 1);
            nextPage = thisPage + 1;
            pageFunc = function (pageNum) {
              var _pageNum;
              _pageNum = pageNum;
              return function () {
                queryStringObj = (queryStringObj === undefined || !queryStringObj) ? {} : queryStringObj;
                queryStringObj.page = _pageNum;
                queryStringObj['per_page'] = pageSize;
                return self.sendRequest(endpoint, method, json, queryStringObj, usePlacesAPI);
              };
            };
            resp.nextPage = pageFunc(nextPage);
            resp.prevPage = pageFunc(prevPage);
          }
          return deferred.resolve(resp);
        } else {
          return deferred.reject(resp);
        }
      });
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  };

  RobinApiBase.prototype.buildOptions = function (endpoint, method, payload, usePlacesAPI) {
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

    if (method && method.toUpperCase() === 'GET') {
      options.qs = payload;
    } else {
      options.json = payload;
    }
    return options;
  };

  RobinApiBase.prototype.rejectRequest = function (message) {
    var deferred = q.defer();
    deferred.reject(message);
    return deferred.promise;
  };

  return RobinApiBase;
}).apply(this, arguments);
