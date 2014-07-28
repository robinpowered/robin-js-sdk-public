/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var rbnUtil = require('../lib/util.js'),
    chai = require('chai'),
    expect = chai.expect;

// Constants
var validApiTestUrl = 'http://api.test.robinpowered.com/v1.0',
    validApiStagingUrl = 'https://api.staging.robinpowered.com/v1.0',
    validApiProductionUrl = 'https://api.robinpowered.com/v1.0',
    validAppsTestUrl = 'http://apps.test.robinpowered.com/v1.0',
    validAppsStagingUrl = 'https://apps.staging.robinpowered.com/v1.0',
    validAppsProductionUrl = 'https://apps.robinpowered.com/v1.0',
    validGridTestUrl = 'http://grid.test.robinpowered.com/v1.0',
    validGridStagingUrl = 'https://grid.staging.robinpowered.com/v1.0',
    validGridProductionUrl = 'https://grid.robinpowered.com/v1.0';

describe('robin util', function () {
  describe('construct robin url', function () {
    describe('nonsense', function () {
      it('should throw an error when creating a test url', function () {
        var testUrl;
        expect(function () {
          testUrl = rbnUtil.constructRobinUrl('nonsense', 'test');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a staging url', function () {
        var stagingUrl;
        expect(function () {
          stagingUrl = rbnUtil.constructRobinUrl('nonsense', 'staging');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a production url', function () {
        var productionUrl;
        expect(function () {
          productionUrl = rbnUtil.constructRobinUrl('nonsense', 'production');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a production url', function () {
        var productionUrl;
        expect(function () {
          productionUrl = rbnUtil.constructRobinUrl('nonsense');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a nonsense url', function () {
        var fooUrl;
        expect(function () {
          fooUrl = rbnUtil.constructRobinUrl('nonsense', 'foo');
        }).to.throw(TypeError);
      });
    });
    describe('api', function () {
      describe('test env argument', function () {
        it('should construct a valid api test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('api', 'test');
          expect(testUrl).to.equal(validApiTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid api staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('api', 'staging');
          expect(stagingUrl).to.equal(validApiStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid api production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('api', 'production');
          expect(productionUrl).to.equal(validApiProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid api production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('api');
          expect(productionUrl).to.equal(validApiProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should construct a valid api production url', function () {
          var fooUrl = rbnUtil.constructRobinUrl('api', 'foo');
          expect(fooUrl).to.equal(validApiProductionUrl);
        });
      });
    });
    describe('apps', function () {
      describe('test env argument', function () {
        it('should construct a valid apps test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('apps', 'test');
          expect(testUrl).to.equal(validAppsTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid apps staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('apps', 'staging');
          expect(stagingUrl).to.equal(validAppsStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid apps production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('apps', 'production');
          expect(productionUrl).to.equal(validAppsProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid apps production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('apps');
          expect(productionUrl).to.equal(validAppsProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should construct a valid apps production url', function () {
          var fooUrl = rbnUtil.constructRobinUrl('apps', 'foo');
          expect(fooUrl).to.equal(validAppsProductionUrl);
        });
      });
    });
    describe('grid', function () {
      describe('test env argument', function () {
        it('should construct a valid grid test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('grid', 'test');
          expect(testUrl).to.equal(validGridTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid grid staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('grid', 'staging');
          expect(stagingUrl).to.equal(validGridStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid grid production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('grid', 'production');
          expect(productionUrl).to.equal(validGridProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid grid production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('grid');
          expect(productionUrl).to.equal(validGridProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should construct a valid grid production url', function () {
          var fooUrl = rbnUtil.constructRobinUrl('grid', 'foo');
          expect(fooUrl).to.equal(validGridProductionUrl);
        });
      });
    });
  });
});
