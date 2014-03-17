var sdkUtils = require('./sdk_utils');
var q = require('q');

var Settings = {

  changePassword: function(params) {
    var d = q.defer();
    if (params && params.data && params.data.password && params.data.confirmPassword) {
      if (params.data.password === params.data.confirmPassword) {
        sdkUtils.sendRequest('/me/password', 'PUT', d, params.data)
      } else {
        d.reject('Passwords do not match.');
      }
    } else {
      d.reject('Bad Request. Data must be supplied in params object with a password and confirmPassword.');
    }
    return d.promise;
  }

}

module.exports = Settings;