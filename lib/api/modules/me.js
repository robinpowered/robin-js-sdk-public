/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var constants = require('../../util').constants;

module.exports = {
  /**
   * Get /me, which is an alias for /users/:id, where :id is the id of the current user
   * @param  {Object}   params A querystring object
   * @return {Function}        A promise
   */
  get: function (params) {
    var path = this.constructPath(constants.ME);
    return this.Core.GET(path);
  },

  /**
   * Update the current user
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  update: function (data) {
    if (data) {
      var path = this.constructPath(constants.ME);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A data object is required');
    }
  },

  /**
   * Update the current user's email
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  updateEmail: function (data) {
    if (data) {
      var path = this.constructPath(constants.ME, constants.EMAIL);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A data object is required');
    }
  },

  /**
   * Delete the current user
   * @return {Function} A Promise
   */
  delete: function ()  {
    var path = this.constructPath(constants.ME);
    return this.Core.DELETE(path);
  }
};

// Me = (function () {

//   function Me (robin) {
//     // RobinUtil.__copyProperties(this, robin);
//     this.endpoint = '/me/';
//   }

//   util.inherits(Me, RequestBase);

//   Me.prototype.get = function () {
//     return this.sendRequest('/me/', 'GET');
//   };

//   // update
//   Me.prototype.update = function (data) {
//     if (data) {
//       return this.sendRequest('/me/', 'PATCH', data);
//     } else {
//       return this.rejectRequest('Bad Request. User data must be supplied');
//     }
//   };

//   // updatePrimaryEmail
//   Me.prototype.updatePrimaryEmail = function (data) {
//     if (data) {
//       return this.sendRequest('/me/email/', 'POST', data);
//     } else {
//       return this.rejectRequest('Bad Request. User email data must be supplied');
//     }
//   };

//   /*
//    * Organizations
//    */

//   Me.prototype.getAllOrganizations = function () {
//     return this.sendRequest('/me/organizations/', 'GET');
//   };

//   /*
//    * Devices
//    */

//   Me.prototype.getAllDevices = function (params) {
//     return this.sendRequest('/me/devices/', 'GET', null, params);
//   };

//   Me.prototype.addDevice = function (data) {
//     if (data) {
//       return this.sendRequest('/me/devices/', 'POST', data);
//     } else {
//       return this.rejectRequest('Bad Request. Device data must be included');
//     }
//   };

//   /*
//    * Projects
//    */

//   Me.prototype.getAllProjects = function (params) {
//     return this.sendRequest('/me/projects/', 'GET', null, params);
//   };

//   Me.prototype.addProject = function (data) {
//     if (data) {
//       return this.sendRequest('/me/projects/', 'POST', data);
//     } else {
//       return this.rejectRequest('Bad Request. Project data must be included');
//     }
//   };

//   /*
//    * Channels
//    */

//   Me.prototype.getAllChannels = function () {
//     return this.sendRequest('/me/channels/', 'GET');
//   };

//   Me.prototype.createChannel = function (data) {
//     if (data) {
//       return this.sendRequest('/me/channels/', 'POST', data);
//     } else {
//       return this.rejectRequest('Bad Request. Channel data must be supplied.');
//     }
//   };

//   Me.prototype.addChannel = function (channelId) {
//     if (channelId) {
//       return this.sendRequest('/me/channels/' + channelId, 'PUT');
//     } else {
//       return this.rejectRequest('Bad Request. A channel id must be supplied.');
//     }
//   };

//   Me.prototype.removeChannel = function (channelId) {
//     if (channelId) {
//       return this.sendRequest('/me/channels/' + channelId, 'DELETE');
//     } else {
//       return this.rejectRequest('Bad Request. A channel id must be supplied.');
//     }
//   };


//   /*
//    * Identifiers
//    */

//   // getAllIdentifiers
//   Me.prototype.getAllIdentifiers = function () {
//     return this.sendRequest('/me/identifiers/', 'GET');
//   };

//   // createIdentifier
//   Me.prototype.createIdentifier = function (data) {
//     if (data) {
//       return this.sendRequest('/me/identifiers/', 'POST', data);
//     } else {
//       return this.rejectRequest('Bad Request. Identifier data must be supplied.');
//     }
//   };

//   // addIdentifier
//   Me.prototype.addIdentifier = function (identifier) {
//     if (identifier) {
//       return this.sendRequest('/me/identifiers/' + identifier, 'PUT');
//     } else {
//       return this.rejectRequest('Bad Request. An identifier must be supplied.');
//     }
//   };

//   // remove
//   Me.prototype.removeIdentifier = function (identifier) {
//     if (identifier) {
//       return this.sendRequest('/me/identifiers/' + identifier, 'DELETE');
//     } else {
//       return this.rejectRequest('Bad Request. An identifier must be supplied.');
//     }
//   };

//   return Me;

// }).apply(this, arguments);

// module.exports = Me;
