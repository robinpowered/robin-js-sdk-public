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
RobinApiBase = require('./base');

RobinApi = (function (_super) {

  function _RobinApi (accessToken, baseUrl) {
    _RobinApi.__super__.constructor.apply(this, arguments);
    this.setAccessToken(accessToken);
    this.setBaseUrl(baseUrl);
    this.loadModules();
  }

  util.__extends(_RobinApi, _super);

  _RobinApi.prototype.authorize = function (accessToken) {
    this.setAccessToken(accessToken);
  };

  _RobinApi.prototype.loadModules = function () {
    var ApiModule, _robinApiModules, _this, _newModules;
    _this = this;
    _robinApiModules = getRobinApiModules();
    _newModules = {};
    for (var _rm in _robinApiModules) {
      ApiModule = _robinApiModules[_rm];
      //Have the next typof check for legacy modules.
      _newModules[_rm] = new ApiModule(_this);
    }
    for (var _nm in _newModules) {
      this[_nm] = _newModules[_nm];
    }
  };

  _RobinApi.prototype.getCurrentUser = function() {
    var d = q.defer();
    this.sendRequest('/me', 'GET', d);
    return d.promise;
  };

  // TODO: Move modules into a modules/ directory,
  // so that this loading process is easier?
  var getRobinApiModules = function () {
    var _module,
        _moduleName,
        _modules = {},
        _moduleDir = __dirname + '/modules/';

    fs.readdirSync(_moduleDir).forEach(function (file) {
      if (path.extname(file) === '.js') {
        _moduleName = file.replace('.js', '');
        _module = require (_moduleDir + _moduleName);
        _modules[_moduleName] = _module;
      }
    });

    return _modules;

  };

  return _RobinApi;

}).apply(this, [RobinApiBase]);


module.exports = RobinApi;
