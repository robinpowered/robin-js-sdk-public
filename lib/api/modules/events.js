/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Events, q, util;
util = require('../../util');
q = require('q');

Events = (function () {

  function Events (robin) {
    util.__copyProperties(this, robin);
  }

  Events.prototype.create = function (data) {
    if (data) {
      return this.sendRequest('/events', 'POST', data);
    } else {
      return this.rejectRequest('Bad Request. Event data must be supplied.');
    }
  };

  return Events;

}).apply(this, arguments);

module.exports = Events;
