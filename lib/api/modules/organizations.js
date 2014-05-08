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

  Organizations.prototype.get = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug, 'GET');
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

  Organizations.prototype.update = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  Organizations.prototype.update = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  /*
   * Organization Users
   */

  Organizations.prototype.getUsers = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/users/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.getManagers = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/managers/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.getUser = function (id_or_slug, userId) {
    if (id_or_slug && userId) {
      return this.sendRequest('/organizations/' + id_or_slug + '/users/' + userId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  Organizations.prototype.addUser = function (id_or_slug, userId) {
    if (id_or_slug && userId) {
      return this.sendRequest('/organizations/' + id_or_slug + '/users/' + userId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  Organizations.prototype.removeUser = function (id_or_slug, userId) {
    if (id_or_slug && userId) {
      return this.sendRequest('/organizations/' + id_or_slug + '/users/' + userId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id and userId must be supplied.');
    }
  };

  /*
   * Organization Apps
   */

  Organizations.prototype.getApps = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/apps/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createApp = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug + '/apps/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Organizations
   */

  Organizations.prototype.getOrganizations = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/organizations/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createDevice = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug + '/organizations/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Projects
   */

  Organizations.prototype.getProjects = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/projects/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createProject = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug + '/projects/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Tokens - NOT YET!!
   */

   /*
   * Organization External Accounts
   */

  Organizations.prototype.getExternalAccounts = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/external-accounts/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createExternalAccounts = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug + '/external-accounts/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and data must be supplied.');
    }
  };

  /*
   * Organization Channels
   */

  Organizations.prototype.getAllChannels = function (id_or_slug) {
    if (id_or_slug) {
      return this.sendRequest('/organizations/' + id_or_slug + '/channels/', 'GET');
    } else {
      return this.rejectRequest('Bad Request. An id must be supplied.');
    }
  };

  Organizations.prototype.createChannel = function (id_or_slug, data) {
    if (id_or_slug && data) {
      return this.sendRequest('/organizations/' + id_or_slug + '/channels/', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. An id and channel data must be supplied.');
    }
  };

  Organizations.prototype.addChannel = function (id_or_slug, channelId) {
    if (id_or_slug && channelId) {
      return this.sendRequest('/organizations/' + id_or_slug + '/channels/' + channelId, 'PUT');
    } else {
      return this.rejectRequest('Bad Request. An id and a channel id must be supplied.');
    }
  };

  Organizations.prototype.removeChannel = function (id_or_slug, channelId) {
    if (id_or_slug && channelId) {
      return this.sendRequest('/organizations/' + id_or_slug + '/channels/' + channelId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. An id and channel id must be supplied.');
    }
  };

  return Organizations;

}).apply(this, arguments);

module.exports = Organizations;
