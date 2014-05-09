/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Organizations, q, util;
util = require('../../util');
q = require('q');

Organizations = (function () {

  function Organizations (robin) {
    util.__copyProperties(this, robin);
  }

  Organizations.prototype.getAll = function () {
    return this.sendRequest('/organizations/', 'GET');
  };

  Organizations.prototype.get = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. An organization id must be supplied.');
    }
  };

  Organizations.prototype.create = function (data) {
    if (data) {
      return this.sendRequest('/organizations', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Organization data must be supplied.');
    }
  };

  Organizations.prototype.update = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  Organizations.prototype.remove = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  /*
   * Organization Users
   */

  Organizations.prototype.getUsers = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/users/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.getManagers = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/managers/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.getUser = function (organizationId, userId) {
    if (organizationId && userId) {
      return this.sendRequest('/organizations/' + organizationId + '/users/' + userId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  Organizations.prototype.addUser = function (organizationId, userId) {
    if (organizationId && userId) {
      return this.sendRequest('/organizations/' + organizationId + '/users/' + userId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  Organizations.prototype.removeUser = function (organizationId, userId) {
    if (organizationId && userId) {
      return this.sendRequest('/organizations/' + organizationId + '/users/' + userId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  /*
   * Organization Apps
   */

  Organizations.prototype.getApps = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/apps/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createApp = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/apps/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Organizations
   */

  Organizations.prototype.getOrganizations = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/organizations/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createDevice = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/organizations/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Projects
   */

  Organizations.prototype.getProjects = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/projects/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createProject = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/projects/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

   /*
   * Organization External Accounts
   */

  Organizations.prototype.getExternalAccounts = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/external-accounts/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createExternalAccounts = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/external-accounts/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Channels
   */

  Organizations.prototype.getAllChannels = function (organizationId) {
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/channels/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createChannel = function (organizationId, data) {
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/channels/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and channel data must be supplied.');
    }
  };

  Organizations.prototype.addChannel = function (organizationId, channelId) {
    if (organizationId && channelId) {
      return this.sendRequest('/organizations/' + organizationId + '/channels/' + channelId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. An id and a channel id must be supplied.');
    }
  };

  Organizations.prototype.removeChannel = function (organizationId, channelId) {
    if (organizationId && channelId) {
      return this.sendRequest('/organizations/' + organizationId + '/channels/' + channelId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id and channel id must be supplied.');
    }
  };

  /*
   * PLACES API IMPLEMENTATIONS
   */

  /*
   * Organization Locations
   */

  Organizations.prototype.getAllLocations = function (organizationId) {
    var usePlacesApi = true;
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/locations/', 'GET', null, null, usePlacesApi);
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createLocation = function (organizationId, data) {
    var usePlacesApi = true;
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/locations/', 'POST', data, null, usePlacesApi);
    } else {
      return this.rejectRequest('Bad Request. An id and channel data must be supplied.');
    }
  };

  /*
   * Organization Walls
   */

  Organizations.prototype.getAllWalls = function (organizationId) {
    var usePlacesApi = true;
    if (organizationId) {
      return this.sendRequest('/organizations/' + organizationId + '/walls/', 'GET', null, null, usePlacesApi);
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createWall = function (organizationId, data) {
    var usePlacesApi = true;
    if (organizationId && data) {
      return this.sendRequest('/organizations/' + organizationId + '/walls/', 'POST', data, null, usePlacesApi);
    } else {
      return this.rejectRequest('Bad Request. An id and channel data must be supplied.');
    }
  };

  return Organizations;

}).apply(this, arguments);

module.exports = Organizations;
