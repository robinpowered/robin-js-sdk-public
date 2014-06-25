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
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
    });
    it('should instantiate without error', function () {
      expect(grid).to.be.an.instanceof(Grid);
    });
  });
  describe('access token', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
    });
    it('should retrieve the access token correctly', function () {
      expect(grid.getAccessToken()).to.equal(accessToken);
    });
  });
  describe('no url', function () {
    var grid,
        accessToken = 'foo';
    it('should throw an error', function () {
      expect(function () {
        grid = new Grid(accessToken);
      }).to.throw(Error);
    });
  });
  describe('event handlers', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
      grid.setupGridMessageHandler();
    });
    it('should emit an error', function (done) {
      grid.on('error', function (err) {
        done();
      });
      grid.gridClient.emit('transport:down');
    });
  });
});
