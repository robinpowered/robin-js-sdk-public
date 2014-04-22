/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinGrid,
    RobinGridBase,
    util = require('../util'),
    config = require('../../config'),
    q = require('q'),
    faye = require('faye');

/**
 * This is the base class for the Robin Grid integration. This should be the
 * place where authentication and authorization is set up.
 * @return {Function} The base class object..
 */
RobinGridBase = (function () {

  function _RobinGridBase() {

  }

  _RobinGridBase.prototype.setAccessToken = function(token) {
    if (token) {
      this._accessToken = token;
    }
  };

  _RobinGridBase.prototype.getAccessToken = function() {
    if (this._accessToken) {
      return this._accessToken;
    }
  };

  _RobinGridBase.prototype.setBaseUrl = function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  };

  _RobinGridBase.prototype.setupFayeClient = function () {
    if (this._baseUrl) {

    }
    else {
      this.fayeClient = new faye.Client(this._baseUrl);
    }
  };

  return _RobinGridBase;

})();

/**
 * This is the Robin Grid class
 * @return {[type]} [description]
 */
RobinGrid = (function (_super) {

  function _RobinGrid (accessToken, baseUrl) {
    RobinApi.__super__.constructor.apply(this, arguments);
    this.setAccessToken(accessToken);
    this.setBaseUrl(baseUrl);
  }

  util.__extends(RobinApi, _super);

  return _RobinGrid;

}).call(RobinGridBase);
