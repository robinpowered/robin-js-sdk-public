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

module.exports.__extends = function (child, parent) {

  if (typeof Object.create !== 'function') {
    Object.create = function (o) {
      function F() {}
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

module.exports.__bind = function (func, me) {
  return function () {
    func.apply(me, arguments);
  };
};
