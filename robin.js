var RobinApi = require('./robin_api'),
  inheritance = require('./inheritance'),
  socketio = require('socket.io');

inheritance.setup();

function Robin () {

  if (!(this instanceof Robin)) {
    return new Robin();
  }

  this.api = RobinApi();

  return this;
}

module.exports = Robin;