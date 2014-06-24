/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Grid = require('../../lib/grid'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('grid', function () {
  describe('instantiate', function () {
    it('should instantiate without error', function () {
      var grid = new Grid();
      expect(grid).to.be.an.instanceof(Grid);
    });
  });
});
