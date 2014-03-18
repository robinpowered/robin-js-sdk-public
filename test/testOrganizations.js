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

exports.testGetUserOrganizations = function (test) {

  test.expect(1);

  var robin;

  robin = robinObjects.user();
  robin.api.organizations.getUserOrganizations()
  .then(function (resp) {
    test.ok(resp);
  })
  .catch(function (err) {
    console.log("Err", err);
  })
  .then(function () {
    test.done();
  });

};
