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
 * A function that copies all the properties of one object into
 * another
 * @param  {Object} child  The object receiving the properties
 * @param  {Object} parent The object whose properties are being copied
 */
var __copyProperties = function (child, parent) {
  // This means we have a previously instantiated class,
  // so just pass in the properties
  if (parent !== child) {
    for (var key in parent) {
      if (parent.hasOwnProperty(key)) {
        child[key] = parent[key];
      }
    }
    // child.super_ = parent;
  }
};

module.exports.__copyProperties = __copyProperties;

/**
 * Determines whether a value is a function
 * @param  {*}  value     A variable of any type
 * @return {Boolean}      A boolean denoting whether `value` is a function or not.
 */
var isFunction = function (value) {
  return value && typeof value === 'function';
};

module.exports.isFunction = isFunction;

/**
 * Determines whether a value is a true object
 * @param  {*}  value      A variable of any type
 * @return {Boolean}       A boolean denoting whether `value` is an object
 */
var isObject = function (value) {
  return value && Object.prototype.toString.call(value) === '[object Object]';
};

module.exports.isObject = isObject;

/**
 * Apply a scope to all object properties that are functions
 * @param  {Object} object An object
 * @param  {Object} scope  A scope (e.g. `this`)
 */
var applyScope = function (object, scope) {
  var key,
      value;
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      value = object[key];
      if (isFunction(value)) {
        object[key] = value.bind(scope);
      } else if (isObject(value)) {
        applyScope(value, scope);
      }
    }
  }
  return object;
};

module.exports.applyScope = applyScope;

/**
 * Clone a javascript object
 * @param  {Object} object The object to be cloned
 * @return {Object}        A clone of the object argument.
 */
var cloneObject = function (object) {
  var clone;
  if (object === null || !isObject(object)) {
    return object;
  }
  clone = object.constructor();
  __copyProperties(clone, object);
  return clone;
};

module.exports.cloneObject = cloneObject;
