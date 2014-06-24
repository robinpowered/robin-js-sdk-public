/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Connection = require('../../lib/grid/connection'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('grid - connection', function () {
  describe('instantiate', function () {
    it('should throw an error', function () {
      expect(function () {
        var connection = new Connection();
      }).to.throw(TypeError);
    });
  });
});
