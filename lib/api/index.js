'use strict';
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

var RobinApi, RobinApiBase;

var fs = require('fs');
var path = require('path');
var q = require('q');
var request = require('request');
var util = require('../util');

RobinApiBase = (function () {

  function _RobinApiBase () {
  }

  _RobinApiBase.prototype.init = function () {
  }

  _RobinApiBase.prototype.setAuthToken = function(token) {
    if (token) {
      this._authToken = token;
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
      body = typeof body === 'string' ? JSON.parse(body) : body;
      if (self.isSuccess(error, response)) {
        var thisPage = body.paging.page;
        var prevPage = (thisPage === 1 ? thisPage : thisPage - 1)
        var nextPage = thisPage + 1;
        var pageFunc;

        pageFunc = function (pageNum) {
          return function () {
            var _defer;
            _defer = q.defer();
            queryStringObj = (queryStringObj === undefined || !queryStringObj) ? {}: queryStringObj;
            queryStringObj.page = pageNum;
            self.sendRequest(endpoint, method, _defer, json, queryStringObj);
            return _defer.promise;
          }
        };

        body.nextPage = pageFunc(nextPage);
        body.prevPage = pageFunc(prevPage);

        return deferred.resolve(body);
      }
      else {
        return deferred.reject(body);
      }
    });
  };

  _RobinApiBase.prototype.buildOptions = function(endpoint, method, json, queryStringObj) {
    var options = {
      uri: this._baseUrl + endpoint,
      method: method,
      headers: {
        Authorization: 'Access-Token ' + this._authToken
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

  _RobinApiBase.prototype.getCurrentUser = function() {
    var d = q.defer();
    this.sendRequest('/me', 'GET', d);
    return d.promise;
  };


  return _RobinApiBase;

})();

RobinApi = (function (_super) {
  util.__extends(RobinApi, _super);

  function RobinApi () {
    RobinApi.__super__.constructor.apply(this, arguments);
    this.init();
  }

  RobinApi.prototype.init = function () {

    RobinApi.__super__.init.apply(this, arguments);

    // this.requireRobinApiModules();
    var ApiModule, _robinApiModules, _this;
    _this = this;
    _robinApiModules = getRobinApiModules();
    for (var _rm in _robinApiModules) {
      ApiModule = _robinApiModules[_rm];
      //Have the next typof check for legacy modules.
      if (typeof(ApiModule) === 'function') {
        this[_rm] = new ApiModule(this);
      }
      else {
        this[_rm] = ApiModule;
      }

    }

  };

  var getRobinApiModules = function () {
    var _module, _moduleName, _modules = {};

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
