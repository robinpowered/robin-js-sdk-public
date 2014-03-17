var Users, q;
q = require('q');

Users = (function () {

  var _robin;

  function Users (robin) {
    _robin = robin;
  }

  Users.prototype.findUsers = function(params) {
    d = q.defer();
    if (params && params.query) {
      _robin.sendRequest('/users', 'GET', d, null, params.query)
    } else {
      d.reject('Bad Request. An query Object must be supplied in params object.');
    }
    return d.promise;
  }

  return Users;

})();

module.exports = Users;