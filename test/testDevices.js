/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var robinObjects;

robinObjects = require("./");

exports.testGetAllDevices = function (test) {

  test.expect(3);
  var firstResp, robin;

  robin = robinObjects.admin();
  robin.api.devices.getAll()
  .then(function (resp) {
    firstResp = resp;
    test.ok(resp);
    return resp.nextPage();
  })
  .then(function (nextPageResp) {
    test.ok(nextPageResp);
    return nextPageResp.prevPage();
  })
  .then(function (prevPageResp) {
    //Only test for equal meta and data properties
    test.deepEqual([prevPageResp.meta, prevPageResp.data], [firstResp.meta, firstResp.data], "First and last responses don't match");
  })
  .fail(function (err) {
    console.log("Err", err);
    console.log(err.stack);
    return false;
  })
  .then(function () {
    test.done();
  });
};

exports.testGetUserDevices = function (test) {

  test.expect(1);
  var robin;
  robin = robinObjects.user();
  robin.api.devices.getUserDevices()
  .then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Err", err);
    console.log(err.stack);
    return false;
  })
  .then(function () {
    test.done();
  });

};

exports.testAddUserDevice = function (test) {

  test.expect(1);
  var robin, postData;
  robin = robinObjects.user();
  postData = {
    is_relay: false,
    mac: Math.random().toString(),
    name: "New Generic TestCase Device - " + new Date().toString()
  };
  robin.api.devices.addUserDevice(postData)
  .then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Error: ", err);
    console.log(err.stack);
    return false;
  })
  .then(function () {
    test.done();
  });

};
