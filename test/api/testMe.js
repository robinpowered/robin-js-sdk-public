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

robinObjects = require('./');

exports.testGetMe = function (test) {

  test.expect(1);

  var robin;

  robin = robinObjects.user();
  // console.log(robin.api);
  robin.api.me.get()
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
