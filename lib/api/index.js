/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinApi, RobinApiBase, fs, path, q, request, util;
fs = require('fs');
path = require('path');
q = require('q');
request = require('request');
util = require('../util');

RobinApiBase = (function () {

  function _RobinApiBase () {
  }

  _RobinApiBase.prototype.setAuthToken = function(token) {
    if (token) {
      this._authToken = token;
    }
  };

  _RobinApiBase.prototype.getAuthToken = function() {
    if (this._authToken) {
      return this._authToken;
    }
  };

  _RobinApiBase.prototype.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  _RobinApiBase.prototype.isSuccess = function(error, res) {
    var success = function (status) {
      return 200 <= status && status < 300;
    };

    if (!error && success(res.statusCode)) {
      return true;
    }
    return false;

  };

  _RobinApiBase.prototype.sendRequest = function(endpoint, method, deferred, json, queryStringObj) {
    var options = this.buildOptions(endpoint, method, json, queryStringObj);
    var self = this;
    request(options, function(error, response, body) {
      var resp;
      resp = {};
      body = typeof body === 'string' ? JSON.parse(body) : body;
      resp.body = body;
      if (self.isSuccess(error, response)) {
        if (method === 'GET' && body.paging !== undefined) {
          var pageSize, thisPage, prevPage, nextPage, pageFunc;
          pageSize = body.paging.per_page;
          thisPage = body.paging.page;
          prevPage = (thisPage === 1 ? thisPage : thisPage - 1);
          nextPage = thisPage + 1;
          pageFunc = function (pageNum) {
            var _pageNum;
            _pageNum = pageNum;
            return function () {
              var _defer;
              _defer = q.defer();
              queryStringObj = (queryStringObj === undefined || !queryStringObj) ? {}: queryStringObj;
              queryStringObj.page = _pageNum;
              queryStringObj.per_page = pageSize;
              self.sendRequest(endpoint, method, _defer, json, queryStringObj);
              return _defer.promise;
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
  };

  _RobinApiBase.prototype.buildOptions = function(endpoint, method, json, queryStringObj) {
    var options = {
      uri: this._baseUrl + endpoint,
      method: method,
      headers: {
        Authorization: 'Access-Token ' + this.getAuthToken()
      }
    };

    if (json) {
      options.json = json;
    }

    if (queryStringObj) {
      options.qs = queryStringObj;
    }

    return options;

  };

  return _RobinApiBase;

})();

RobinApi = (function (_super) {

  function RobinApi (authToken, baseUrl) {
    RobinApi.__super__.constructor.apply(this, arguments);
    this.setAuthToken(authToken);
    this.setBaseUrl(baseUrl);
    this.loadModules();
  }

  util.__extends(RobinApi, _super);

  RobinApi.prototype.authorize = function (authToken) {
    this.setAuthToken(authToken);
  };

  RobinApi.prototype.loadModules = function () {
    var ApiModule, _robinApiModules, _this, _newModules;
    _this = this;
    _robinApiModules = getRobinApiModules();
    _newModules = {}
    for (var _rm in _robinApiModules) {
      ApiModule = _robinApiModules[_rm];
      //Have the next typof check for legacy modules.
      _newModules[_rm] = new ApiModule(_this);
    }
    for (var _nm in _newModules) {
      this[_nm] = _newModules[_nm];
    }
  };

  RobinApi.prototype.getCurrentUser = function() {
    var d = q.defer();
    this.sendRequest('/me', 'GET', d);
    return d.promise;
  };

  var getRobinApiModules = function () {
    var _module, _moduleName, _modules;
    _modules = {};

    fs.readdirSync(__dirname + '').forEach(function (file) {
      if (path.extname(file) === '.js' && file !== 'index.js') {
        _moduleName = file.replace('.js', '');
        _module = require ('./' + _moduleName);
        _modules[_moduleName] = _module;
      }
    });

    return _modules;

  };

  return RobinApi;

})(RobinApiBase);


module.exports = RobinApi;
