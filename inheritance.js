'use strict';

/*
* Setup Inheritance
*/

exports.setup = function () {

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

};