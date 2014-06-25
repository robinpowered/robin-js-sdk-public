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
    Api = require('../lib/api'),
    Grid = require('../lib/grid'),
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
  describe('relay identifier', function () {
    var robin = new Robin('SampleAccessToken'),
        relayIdentifier = 'foo';
    before(function () {
      robin.setRelayIdentifier(relayIdentifier)
    });
    it('should be the expected api relay identifier', function () {
      expect(robin.grid.getRelayIdentifier()).to.equal(relayIdentifier);
    });
    it('should be the expected grid relay identifier', function () {
      expect(robin.api.getRelayIdentifier()).to.equal(relayIdentifier);
    });
  });
});
