/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */
var Robin;

var RobinApi = require('./lib/api'),
  util = require('./lib/util'),
  EventEmitter = require('events').EventEmitter;

Robin = (function(_super) {

  function Robin (_apiToken, _baseUrl) {
    Robin.__super__.constructor.call(this);
    this.api = new RobinApi(_apiToken, _baseUrl);
  }

  util.__extends(Robin, _super);

  return Robin;

})(EventEmitter);

module.exports = Robin;
