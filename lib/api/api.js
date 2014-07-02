/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var apiModules,
    util = require('util'),
    RbnUtil = require('../util'),
    RobinApiBase = require('./base'),
    RequestBase = require('./requestBase');

// Having an object here is an awful hack, but it has to be done for browserify.
apiModules = {
  accounts: require('./modules/accounts'),
  apps: require('./modules/apps'),
  auth: require('./modules/auth'),
  channels: require('./modules/channels'),
  devicemanifests: require('./modules/devicemanifests'),
  devices: require('./modules/devices'),
  identifiers: require('./modules/identifiers'),
  me: require('./modules/me'),
  organizations: require('./modules/organizations'),
  projects: require('./modules/projects'),
  triggers: require('./modules/triggers'),
  users: require('./modules/users'),
  events: require('./modules/events'),
  locations: require('./modules/locations'),
  personas: require('./modules/personas'),
  spaces: require('./modules/spaces')
};

module.exports = (function () {
  /**
   * The Robin API constructor
   * @param {String} accessToken      A Robin Access Token
   * @param {String} coreUrl          The Base URL for the Core API.
   * @param {String} placesUrl        The Base URL for the Places API
   */
  function RobinApi (accessToken, coreUrl, placesUrl) {
    RobinApi.super_.apply(this, arguments);
    this.setAccessToken(accessToken);
    this.setupCore(coreUrl);
    this.setupPlaces(placesUrl);
    this.loadApiModules();
  }

  util.inherits(RobinApi, RobinApiBase);

  /**
   * Setup requests to the Core API
   * @param  {String} coreUrl The url of the core API.
   */
  RobinApi.prototype.setupCore = function (coreUrl) {
    var coreApi;
    if (coreUrl) {
      coreApi = new RequestBase();
      this.Core = RbnUtil.applyScope(coreApi, this);
      this.Core.setBaseUrl(coreUrl);
    } else {
      throw new TypeError('The url of the places API is not present or malformed');
    }
  };

  /**
   * Setup requests to the Places API
   * @param  {String} placesUrl The url of the places API.
   */
  RobinApi.prototype.setupPlaces = function (placesUrl) {
    var placesApi;
    if (placesUrl) {
      placesApi = new RequestBase();
      this.Places = RbnUtil.applyScope(placesApi, this);
      this.Places.setBaseUrl(placesUrl);
    } else {
      throw new TypeError('The url of the places API is not present or malformed');
    }
  };

  /**
   * Load the API module objects and bind their functions to this API class.
   */
  RobinApi.prototype.loadApiModules = function () {
    var module,
        moduleName;
    for (moduleName in apiModules) {
      module = apiModules[moduleName];
      this[moduleName] = RbnUtil.applyScope(module, this);
    }
  };

  return RobinApi;
}).call(this);
