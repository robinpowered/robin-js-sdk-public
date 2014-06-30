/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinUtil = require('../util'),
    q = require('q'),
    request = require('request');

/**
 * This is a somewhat abstract base class for modules
 * Methods implemented:
 * * get
 * * add
 * * update
 * *
 * @return {Function} A constructor
 */
module.exports = (function () {

  function RequestBase (robin) {
    RobinUtil.__copyProperties(this, robin);
  }

    /**
   * Checks to make sure the request was a success
   * @param  {Object}  error An error object from the request
   * @param  {Object}  res   A response object
   * @return {Boolean}       A boolean denoting whether the request was a success
   */
  RequestBase.prototype.isSuccess = function (error, res) {
    var success = function (status) {
      return status >= 200 && status < 300;
    };
    if (!error && res && success(res.statusCode)) {
      return true;
    }
    return false;
  };

  RequestBase.prototype.sendRequest = function (endpoint, method, payload, usePlacesAPI) {
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
                payload = (payload === undefined || !payload) ? {} : payload;
                payload.page = _pageNum;
                payload['per_page'] = pageSize;
                return self.sendRequest(endpoint, method, payload, usePlacesAPI);
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

  RequestBase.prototype.buildOptions = function (endpoint, method, payload, usePlacesAPI) {
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

  RequestBase.prototype.rejectRequest = function (message) {
    var deferred = q.defer();
    deferred.reject(message);
    return deferred.promise;
  };

  /**
   * Implement HTTP request methods, to make requests easier
   */

  RequestBase.prototype.GET = function (identifier, params, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'GET', params, usePlacesApi);
  };

  RequestBase.prototype.HEAD = function (identifier, params, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'HEAD', params, usePlacesApi);
  };

  RequestBase.prototype.POST = function (identifier, data, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'POST', data, usePlacesApi);
  };

  RequestBase.prototype.PUT = function (identifier, data, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'PUT', data, usePlacesApi);
  };

  RequestBase.prototype.PATCH = function (identifier, data, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'PATCH', data, usePlacesApi);
  };

  RequestBase.prototype.DELETE = function (identifier, data, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'DELETE', data, usePlacesApi);
  };

  RequestBase.prototype.OPTIONS = function (identifier, data, usePlacesApi) {
    var endpoint = this.endpoint;
    if (identifier) {
      endpoint += '/' + identifier;
    }
    return this.sendRequest(endpoint, 'OPTIONS', data, usePlacesApi);
  };

  return RequestBase;
}).call(this);
