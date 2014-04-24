/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Me, q, util;
util = require('../../util');
q = require('q');

Me = (function () {

  function Me (robin) {
    util.__copyProperties(this, robin);
  }

  Me.prototype.get = function () {
    var d = q.defer();
    this.sendRequest('/me/', 'GET', d);
    return d.promise;
  };

  // update
  Me.prototype.update = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/me/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. User data must be supplied');
    }
  };

  // updatePrimaryEmail
  Me.prototype.updatePrimaryEmail = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/me/email/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. User email data must be supplied');
    }
  };

  /*
   * Organizations
   */

  Me.prototype.getAllOrganizations = function () {
    var d = q.defer();
    this.sendRequest('/me/organizations/', 'GET', d);
    return d.promise;
  };

  /*
   * Devices
   */

  Me.prototype.getAllDevices = function (params) {
    var d = q.defer();
    this.sendRequest('/me/devices/', 'GET', d, null, params);
    return d.promise;
  };

  Me.prototype.addDevice = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/me/devices/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Device data must be included');
    }
    return d.promise;
  };

  /*
   * Projects
   */

  Me.prototype.getAllProjects = function (params) {
    var d = q.defer();
    this.sendRequest('/me/projects/', 'GET', d, null, params);
    return d.promise;
  };

  Me.prototype.addProject = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/me/projects/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Project data must be included');
    }
    return d.promise;
  };

  /*
   * Channels
   */

  Me.prototype.getAllChannels = function () {
    var d = q.defer();
    this.sendRequest('/me/channels/', 'GET', d);
    return d.promise;
  };

  Me.prototype.createChannel = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/me/channels/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Channel data must be supplied.');
    }
    return d.promise;
  };

  Me.prototype.addChannel = function (channelId) {
    var d = q.defer();
    if (channelId) {
      this.sendRequest('/me/channels/' + channelId, 'PUT', d);
    }
    else {
      d.reject('Bad Request. A channel id must be supplied.');
    }
    return d.promise;
  };

  Me.prototype.removeChannel = function (channelId) {
    var d = q.defer();
    if (channelId) {
      this.sendRequest('/me/channels/' + channelId, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. A channel id must be supplied.');
    }
    return d.promise;
  };


  /*
   * Identifiers
   */

  // getAllIdentifiers
  Me.prototype.getAllIdentifiers = function () {
    var d = q.defer();
    if (deviceId) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/', 'GET', d);
    }
    else {
      d.reject('Bad Request. A device id must be supplied.');
    }
    return d.promise;
  };

  // createIdentifier
  Me.prototype.createIdentifier = function (data) {
    var d = q.defer();
    if (data) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/', 'POST', d, data);
    }
    else {
      d.reject('Bad Request. Identifier data must be supplied.');
    }
    return d.promise;
  };

  // addIdentifier
  Me.prototype.addIdentifier = function (identifier) {
    var d = q.defer();
    if (identifier) {
      this.sendRequest('/devices/' + deviceId + '/identifiers/' + identifier, 'PUT', d, data);
    }
    else {
      d.reject('Bad Request. An identifier must be supplied.');
    }
    return d.promise;
  };

  // remove
  Me.prototype.removeIdentifier = function (identifier) {
    var d = q.defer();
    if (identifier) {
      this.sendRequest('/me/identifiers/' + identifier, 'DELETE', d);
    }
    else {
      d.reject('Bad Request. An identifier must be supplied.');
    }
    return d.promise;
  };

  return Me;

})();

module.exports = Me;
