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
  /**
   * The Request Base Class Constructor. It contains private and privileged variables
   * and methods.
   */
  function RequestBase () {
    // `_baseUrl` and `self` are private variables
    var _baseUrl,
        self = this;

    this.getBaseUrl = function () {
      if (_baseUrl) {
        return _baseUrl;
      }
    };

    this.setBaseUrl = function (baseUrl) {
      _baseUrl = baseUrl;
    };

    /**
     * Checks to make sure the request was a success
     * @param  {Object}  error An error object from the request
     * @param  {Object}  res   A response object
     * @return {Boolean}       A boolean denoting whether the request was a success
     */
    this.isSuccess = function (error, res) {
      var success = function (status) {
        return status >= 200 && status < 300;
      };
      if (!error && res && success(res.statusCode)) {
        return true;
      }
      return false;
    };

    this.buildOptions = function (path, method, payload) {
      var options,
          accessToken = this.getAccessToken(),
          relayIdentifier = this.getRelayIdentifier(),
          baseUrl = self.getBaseUrl(),
          url = self.constructUrl(baseUrl, path);

      options = {
        uri: url,
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


    this.constructUrl = function (url, path) {
      if (url.slice(-1) === '/' && path.slice(0, 1) === '/') {
        return url.slice(0, -1) + path;
      } else if (url.slice(-1) !== '/' && path.slice(0, 1) !== '/') {
        return url + '/' + path;
      }
      return url + path;
    };

    this.sendRequest = function (path, method, payload) {
      var options,
          deferred = q.defer();
      try {
        options = self.buildOptions(path, method, payload);
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
                  return self.sendRequest(path, method, payload);
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
  }

  /**
   * Implement HTTP request methods, to make requests easier
   */

  RequestBase.prototype.GET = function (path, params) {
    return this.sendRequest(path, 'GET', params);
  };

  RequestBase.prototype.HEAD = function (path, params) {
    return this.sendRequest(path, 'HEAD', params);
  };

  RequestBase.prototype.POST = function (path, data) {
    return this.sendRequest(path, 'POST', data);
  };

  RequestBase.prototype.PUT = function (path, data) {
    return this.sendRequest(path, 'PUT', data);
  };

  RequestBase.prototype.PATCH = function (path, data) {
    return this.sendRequest(path, 'PATCH', data);
  };

  RequestBase.prototype.DELETE = function (path, data) {
    return this.sendRequest(path, 'DELETE', data);
  };

  RequestBase.prototype.OPTIONS = function (path, data) {
    return this.sendRequest(path, 'OPTIONS', data);
  };

  return RequestBase;
}).call(this);
