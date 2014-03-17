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

var robinObjects = require("./index"),
  q = require("q");

exports.testGetAllDevices = function (test) {

  test.expect(3);
  var firstResp;
  try {
    var robin = robinObjects.admin();
  }
  catch (e) {
    console.log(e.stack);
    return;
  }
  robin.api.devices.getAll().then(function (resp) {
    console.log("First Response");
    firstResp = resp;
    test.ok(resp);
    return resp.nextPage();
  })
  .then(function (nextPageResp) {
    console.log("Next Page Response");
    test.ok(nextPageResp);
    return nextPageResp.prevPage();
  })
  .then(function (prevPageResp) {
    console.log("Previous Page Response");
    console.log("Should be the same as the first response");
    //Only test meta and data properties
    test.deepEqual([prevPageResp.meta, prevPageResp.data], [firstResp.meta, firstResp.data], "First and last responses don't match");
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