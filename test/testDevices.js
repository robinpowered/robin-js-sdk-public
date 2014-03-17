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

var robinObjects = require("./robin"),
  q = require("q");

exports.testGetAllDevices = function (test) {

  test.expect(3);
  try {
    var robin = robinObjects.admin();
  }
  catch (e) {
    console.log(e.stack);
    return;
  }
  robin.api.devices.getAll().then(function (resp) {
    console.log("First Response");
    console.log("resp", resp);
    test.ok(resp);
    return resp.nextPage();
  })
  .then(function (nextPageResp) {
    console.log("nextPageResp", nextPageResp);
    test.ok(nextPageResp);
    return nextPageResp.prevPage();
  })
  .then(function (prevPageResp) {
    console.log("Should be the same as the first response");
    console.log("prevPageResp", prevPageResp);
    test.ok(prevPageResp);
  })
  .catch(function (err) {
    console.log("Err", err);
  })
  .then(function () {
    test.done();
  });

}

exports.testGetUserDevices = function (test) {

  test.expect(1);
  var robin = robinObjects.user();
  robin.api.devices.getUserDevices().then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Err", err);
  })
  .then(function () {
    test.done();
  });

}