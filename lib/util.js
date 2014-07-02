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

/**
 * An object that contains useful constants for the SDK
 * @type {Object}
 */
var constants = {
  ACCOUNT: 'account',
  ACCOUNTS: 'accounts',
  APP: 'app',
  APPS: 'apps',
  AUTH: 'auth',
  AUTHORIZATIONS: 'authorizations',
  CHANNELS: 'channels',
  DATA: 'data',
  DEVICE_MANIFESTS: 'device-manifests',
  DEVICES: 'devices',
  EMAIL: 'email',
  EVENTS: 'events',
  FEEDS: 'feeds',
  IDENTIFIERS: 'identifiers',
  LOCATIONS: 'locations',
  MANAGERS: 'managers',
  ME: 'me',
  ORGANIZATIONS: 'organizations',
  PASSWORD: 'password',
  PERSONAS: 'personas',
  PRESENCE: 'presence',
  PROJECTS: 'projects',
  SPACES: 'spaces',
  TRIGGERS: 'triggers',
  USERS: 'users'
};

module.exports.constants = constants;

/**
 * Construct a robin url for the api, grid or whatever other platform we have
 * @param  {String} robinType The type of Robin app we're using. Currently 'grid' or 'api'
 * @param  {String} env       An optional environment type we can use to
 *                            direct our requests to. If blank, defaults to production -
 *                            otherwise goes to 'staging' or 'test'.
 * @return {String}           The url for the selected Robin platform
 */
exports.constructRobinUrl = function (robinType, env) {
  var _robinUrl = '',
      _env = '',
      _version = 'v1.0',
      _robinStub = '.robinpowered.com',
      _protocol = 'https://';

  if (!robinType) {
    throw new TypeError('`robinType` is a required parameter');
  }

  if (env) {
    _env = '.' + env;
    if (env === 'test') {
      _protocol = 'http://';
    }
  }

  _robinUrl = _protocol + robinType + _env + _robinStub + '/' + _version;

  return _robinUrl;
};
