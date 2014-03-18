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
  EventEmitter = require('events').EventEmitter;

Robin = (function(_super) {

  function Robin () {
    Robin.__super__.constructor.apply(this, arguments);

  }

  util.__extends(Robin, _super);

  Robin.prototype.api = (function () {
    return new RobinApi();
  })();

  return Robin;

})(EventEmitter);

module.exports = Robin;
