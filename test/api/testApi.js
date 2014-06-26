/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Api = require('../../lib/api'),
    chai = require('chai'),
    expect = chai.expect;

describe('api', function () {
  describe('instantiate', function () {
    it('should instantiate without error', function () {
      var api = new Api();
      expect(api).to.be.an.instanceof(Api);
    });
  });
});
