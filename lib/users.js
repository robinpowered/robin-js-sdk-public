var sdkUtils = require('./sdk_utils');
var q = require('q');

var Users = {
  findUsers: function(params) {
    d = q.defer();
    if (params && params.query) {
      sdkUtils.sendRequest('/users', 'GET', d, null, params.query)
    } else {
      d.reject('Bad Request. An query Object must be supplied in params object.');
    }
    return d.promise;
  }
}

module.exports = Users;