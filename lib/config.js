/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

exports.getUrl = function (robinType, env, protocol) {
  var _robinUrl = '',
      _env = '',
      _version = 1.0,
      _robinStub = '.robinpowered.com',
      _protocol = (protocol === 'ssl') ? 'https://' : 'http://';

  if (!robinType) {
    throw new TypeError('`robinType` is a required parameter');
  }
  if (env) {
    if (env === 'test' || env === 'staging') {
      _env = '.' + env;
    }
  }

  _robinUrl = _protocol + robinType + _env + _robinStub + '/' + _version;

  return _robinUrl;
};
