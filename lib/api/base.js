/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

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

  return RobinApiBase;
}).apply(this, arguments);
