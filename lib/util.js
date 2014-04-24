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

/**
 * A function that allows a class extend the prototype of the
 * another class.
 * @param  {Object} child  The class extending another
 * @param  {Object} parent The class being extended
 * @return {Object}        The extended class
 */
module.exports.__extends = function (child, parent) {
  if (typeof Object.create !== 'function') {
    Object.create = function (o) {
      function F() {
        // Function left intentionally empty
      }
      F.prototype = o;
      return new F();
    };
  }
  // Don't instantiate parent class
  child.prototype = Object.create(parent.prototype);
  // Assign the child constructor to itself
  child.prototype.constructor = child;
  // Make sure the constructor is non-enumerable
  Object.defineProperty(child.prototype, 'constructor', {
    enumerable: false,
    value: child
  });
  child.__super__ = parent.prototype;
  return child;
};

/**
 * A function that copies all the properties of one object into
 * another
 * @param  {Object} child  The object receiving the properties
 * @param  {Object} parent The object whose properties are being copied
 */
module.exports.__copyProperties = function (child, parent) {
  // This means we have a previously instantiated class,
  // so just pass in the properties
  if (parent !== child) {
    for (var key in parent) {
      child[key] = parent[key];
    }
    child.__super__ = parent;
  }
};

/**
 * A function that binds a scope to a function
 * @param  {Function} func A function
 * @param  {Object} me   A scope to apply to the first argument.
 */
module.exports.__bind = function (func, me) {
  return function () {
    func.apply(me, arguments);
  };
};
