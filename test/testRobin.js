/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Robin = require('../robin'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('robin', function () {
  describe('instantiate', function () {
    it('should throw an error', function () {
      expect(function () {
        var robin = new Robin();
      }).to.throw(TypeError);
    });
    it('should instantiate without error', function () {
      var robin = new Robin('SampleAccessToken');
      expect(robin).to.be.an.instanceof(Robin);
    });
  });
});
