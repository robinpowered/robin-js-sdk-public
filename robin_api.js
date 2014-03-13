'use strict';

/*
* Begin RobinApi
*/

var robinApiModules,
  fs = require('fs'),
  path = require('path'),
  q = require('q'),
  request = require('request'),
  inheritance = require('./inheritance');

inheritance.setup();

function RobinApiBase () {

  if (!(this instanceof RobinApiBase)) {
    return new RobinApiBase();
  }

  this.init();

  return this;

};

RobinApiBase.prototype.init = function () {

  this.setAuthToken = function(token) {
    if (token) {
      this._authToken = token;
    }
  };

  this.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  this.isSuccess = function(error, res) {
    if (!error && success(res.statusCode)) {
      return true;
    }
    return false;

    function success(status) {
      return 200 <= status && status < 300;
    }
  };

  this.sendRequest = function(endpoint, method, deferred, json, queryStringObj) {
    var options = this.buildOptions(endpoint, method, json, queryStringObj);
    var self = this;
    request(options, function(error, response, body) {
      body = typeof body === 'string' ? JSON.parse(body) : body;
      self.isSuccess(error, response) ? deferred.resolve(body) : deferred.reject(body);
    });
  };

  this.buildOptions = function(endpoint, method, json, queryStringObj) {
    var options = {
      uri: this._baseUrl + endpoint,
      method: method,
      headers: {
        Authorization: 'Access-Token ' + this._authToken
      }
    }

    if (json) {
      options.json = json;
    }

    if (queryStringObj) {
      options.qs = queryStringObj;
    }

    return options;

  };

  this.getCurrentUser = function() {
    var d = q.defer();
    this.sendRequest('/me', 'GET', d);
    return d.promise;
  };

};

robinApiModules = (function () {

  var _module, _moduleName, _modules = {};

  fs.readdirSync(__dirname + '/lib/').forEach(function (file) {
    if (path.extname(file) === '.js' && file !== 'index.js') {
      _moduleName = file.replace('.js', '');
      _module = require ('./lib/' + _moduleName);
      _modules[_moduleName] = _module;
    }
  });

  return _modules;

})();

function RobinApi () {

  if (!(this instanceof RobinApi)) {
    return new RobinApi();
  }

  RobinApiBase.apply(this, arguments);

  this.init();

  return this;

}

////
//  Need to have RobinApi expose socket operations, but also the API.
////

RobinApi.inherits(RobinApiBase);

RobinApi.prototype.init = function () {

  RobinApiBase.prototype.init.apply(this, arguments);

  // Load Public RobinApi Modules
  for (var _rm in robinApiModules) {
    var _module = robinApiModules[_rm];
    this[_rm] = (function (RobinApi) {
      if (typeof(_module) === 'function') {
        return _module.apply(null, [RobinApi]);
      }
      else {
        return _module;
      }
    })(this);
  };
}

module.exports = RobinApi;
