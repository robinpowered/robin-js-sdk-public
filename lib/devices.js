var q = require ('q');

Devices = function (robin) {

  this._robin = robin;

  this.test = function () {
    return this._robin._utils._authToken;
  };

}

module.exports = Devices;