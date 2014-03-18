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

var robinObjects = require("./");

exports.testGetAllDeviceManifests = function (test) {

  test.expect(1);

  var robin;
  robin = robinObjects.admin();
  console.log(robin.api);
  robin.api.devicemanifests.getAll()
  .then(function (resp) {
    console.log(resp);
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Error", err);
    return false;
  })
  .then(function () {
    test.done();
  });

};

