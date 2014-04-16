/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var robinObjects, channelId;

robinObjects = require("./");

exports.testGetAllChannels = function (test) {

  test.expect(1);
  var robin;

  robin = robinObjects.admin();
  robin.api.channels.getAll()
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

exports.testAddChannel = function (test) {
  test.expect(1);

  var robin, channelData;
  robin = robinObjects.user();
  channelData = {
    name: 'Test Channel: ' + new Date().toString(),
    units: 'testing units',
    type: 1
  };

  robin.api.channels.add(channelData)
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
