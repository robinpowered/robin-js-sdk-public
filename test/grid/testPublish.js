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

robinObjects = require('../');

exports.testJoinInvalidChannel = function (test) {

  test.expect(1);

  var robin = robinObjects.user();

  robin.on('error', function (err) {
    test.ok(err, '[ERROR]' + err);
    test.done();
  });

  robin.grid.join('/devices/55/', function (resp) {
    test.ok(true);
    test.done();
  });
};

exports.testJoinValidChannel = function (test) {

  test.expect(1);

  var robin = robinObjects.user();

  robin.on('error', function (err) {
    test.ok(err, '[ERROR]' + err);
    test.done();
  });

  robin.grid.join('/devices/55', function (resp) {
    test.ok(true, resp);
    test.done();
  });
};

exports.testLeaveUnjoinedChannel = function (test) {

  test.expect(1);

  var robin = robinObjects.user();

  robin.on('error', function (err) {
    test.ok(err, '[ERROR]' + err);
    test.done();
  });

  robin.grid.leave('/devices/55', function (resp) {
    test.ok(true, resp);
    test.done();
  });
};

exports.testJoinChannelThenLeave = function (test) {

  test.expect(1);

  var robin = robinObjects.user();

  robin.on('error', function (err) {
    test.ok(err, '[ERROR]' + err);
    test.done();
  });

  robin.grid.join('/devices/55', function (resp) {
    robin.grid.leave('/devices/55', function (resp) {
      test.ok(true, resp);
      test.done();
    });
  });

};
