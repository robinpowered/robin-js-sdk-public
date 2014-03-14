'use strict';

var RobinApi = require('./robin_api'),
  inheritance = require('./inheritance'),
  io = require('socket.io'),
  EventEmitter = require('events').EventEmitter;

inheritance.setup();

function Robin () {

  if (!(this instanceof Robin)) {
    return new Robin();
  }

  EventEmitter.apply(this, arguments);

  this.api = new RobinApi();

  return this;
}

Robin.inherits(EventEmitter);

try {
  var r = Robin();
}
catch (e) {
  console.log(e.stack);
}

module.exports = Robin;