/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var robinObjects = require('./');

exports.testGetAllDeviceManifests = function (test) {

  test.expect(1);

  var robin;
  robin = robinObjects.admin();
  robin.api.devicemanifests.getAll()
  .then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log('Error', err);
    return false;
  })
  .then(function () {
    test.done();
  });

};

