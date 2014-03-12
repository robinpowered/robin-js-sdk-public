var robinObjects = require("./robin"),
  q = require("q");

exports.testGetAllDevices = function (test) {

  test.expect(1);
  var robin = robinObjects.admin();
  robin.devices.getAll().then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Err", err);
  })
  .then(function () {
    test.done();
  });

}

exports.testGetUserDevices = function (test) {

  test.expect(1);
  var robin = robinObjects.user();
  robin.devices.getUserDevices().then(function (resp) {
    test.ok(resp);
  })
  .fail(function (err) {
    console.log("Err", err);
  })
  .then(function () {
    test.done();
  });

}