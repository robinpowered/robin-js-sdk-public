/*
* Setup Inheritance
*/

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

Function.prototype.inherits = function (parent) {
  // Don't instantiate parent class
  this.prototype = Object.create(parent.prototype);
  // Assign the child constructor to itself
  this.prototype.constructor = this;
  // Make sure the constructor is non-enumerable
  Object.defineProperty(this.prototype, 'constructor', {
    enumerable: false,
    value: this
  });
};

/*
* Begin Robin
*/

var robinModules,
  fs = require('fs'),
  path = require('path');

robinModules = (function () {

  var _module, _moduleName, _modules = {};

  fs.readdirSync(__dirname + '/lib/').forEach(function (file) {
    if (path.extname(file) === '.js' && file !== 'index.js') {
      _moduleName = file.replace('.js', '');
      _module = require ('./lib/' + _moduleName);
      _modules[_moduleName] = _module;
    }
  });

  return _modules;

})();

function RobinBase () {

  if (!(this instanceof RobinBase)) {
    return new RobinBase();
  }

  // We should add sdk_utils into this base class for Robin to extend.
  this.foo = function () {
    return 'bar';
  }
};


function Robin () {

  if (!(this instanceof Robin)) {
    return new Robin();
  }

  RobinBase.apply(this, arguments);

  // Keep utils private, but it's going to be needed in sub-modules
  this._util = robinModules.sdk_utils;

  // Expose setAuthToken method, so a user can authenticate
  // Do we want to do this in a constructor instead?
  this.setAuthToken = function (token) {
    return this._util.setAuthToken(token);
  };

  this.getAuthToken = function () {
    return this._util._authToken || null;
  };

  this.setBaseUrl = function (baseUrl) {
    return this._util.setBaseUrl(baseUrl);
  };

  this.init();

  return this;

}

Robin.inherits(RobinBase);

Robin.prototype.init = function () {
  // Load Public Robin Modules
  for (var _rm in robinModules) {
    _module = robinModules[_rm];
    this[_rm] = (function (robin) {
      if (typeof(_module) === 'function') {
        return _module.apply(null, [robin]);
      }
      else {
        return _module;
      }
    })(this);
  };
}

module.exports = Robin;