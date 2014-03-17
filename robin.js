'use strict';
/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 * When this module is required in JavaScript source, it will allow a
 * child class to extend a parent class, by invoking the function exported
 * by this module.
 */
var Robin;

var RobinApi = require('./lib/api'),
  util = require('./lib/util'),
  io = require('socket.io'),
  EventEmitter = require('events').EventEmitter;

Robin = (function(_super) {
  util.__extends(_Robin, _super);

  function _Robin () {
    _Robin.__super__.constructor.apply(this, arguments);
    this.api = new RobinApi();
  }

  return _Robin;

})(EventEmitter);

module.exports = Robin;

