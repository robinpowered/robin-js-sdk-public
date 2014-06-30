/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var _apiModules,
    _placesApiModules,
    util = require('util'),
    RbnUtil = require('../util'),
    RobinApiBase = require('./base'),
    RequestBase = require('./requestBase');

// Having an object here is an awful hack, but it has to be done for browserify.
_apiModules = {
  accounts: require('./modules/accounts'),
  apps: require('./modules/apps'),
  auth: require('./modules/auth'),
  channels: require('./modules/channels'),
  devicemanifests: require('./modules/devicemanifests'),
  devices: require('./modules/devices'),
  identifiers: require('./modules/identifiers'),
  me: require('./modules/me'),
  // Organizations use both core and places api, but put them in core by default
  organizations: require('./modules/organizations'),
  projects: require('./modules/projects'),
  triggers: require('./modules/triggers'),
  users: require('./modules/users')
};

// Places API Module
_placesApiModules = {
  events: require('./modules/events'),
  locations: require('./modules/locations'),
  personas: require('./modules/personas'),
  spaces: require('./modules/spaces')
};

module.exports = (function () {
  /**
   * The Robin API constructor
   * @param {String} accessToken      A Robin Access Token
   * @param {String} baseUrl          The Base URL for the Core API.
   * @param {String} placesApiBaseUrl The Base URL for the Places API
   */
  function RobinApi (accessToken, baseUrl, placesApiBaseUrl) {
    RobinApiBase.apply(this, arguments);
    this.setAccessToken(accessToken);
    this.setCoreUrl(baseUrl);
    this.setPlacesUrl(placesApiBaseUrl);
    this.loadModules();
    this.requests = new RequestBase(this);
  }

  util.inherits(RobinApi, RobinApiBase);

  /**
   * Load the API modules as members of this class.
   */
  RobinApi.prototype.loadModules = function () {
    var ApiModule,
        _newModules = {},
        tempBaseUrl = this.baseUrl;
    // Load Core API Modules
    for (var _am in _apiModules) {
      ApiModule = _apiModules[_am];
      _newModules[_am] = new ApiModule(this);
    }

    // Load Places API Modules with the special places API url
    this.baseUrl = this.placesApiBaseUrl;
    for (var _pm in _placesApiModules) {
      ApiModule = _placesApiModules[_pm];
      _newModules[_pm] = new ApiModule(this);
    }

    // Set the base url back to the core base url
    this.baseUrl = tempBaseUrl;

    for (var _nm in _newModules) {
      this[_nm] = _newModules[_nm];
    }
  };

  return RobinApi;
}).call(this);
