/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */
var Robin, util, EventEmitter, config;

var RobinApi = require('./lib/api'),
  RobinGrid = require('./lib/grid'),
  util = require('./lib/util'),
  config = require('./config'),
  EventEmitter = require('events').EventEmitter;

Robin = (function(_super) {

  function Robin (accessToken) {
    Robin.__super__.constructor.call(this);
    this.api = new RobinApi(accessToken, config.apiUrl);
    this.grid = new RobinGrid(accessToken, config.gridUrl);
  }

  util.__extends(Robin, _super);

  return Robin;

})(EventEmitter);

module.exports = Robin;
