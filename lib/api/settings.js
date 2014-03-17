var Settings, q;
q = require('q');

Settings = (function () {

  var robin;

  function Settings(robin) {
    _robin = robin;
  }

  Settings.prototype.changePassword = function(params) {
    var d = q.defer();
    if (params && params.data && params.data.password && params.data.confirmPassword) {
      if (params.data.password === params.data.confirmPassword) {
        this._robin.sendRequest('/me/password', 'PUT', d, params.data)
      } else {
        d.reject('Passwords do not match.');
      }
    } else {
      d.reject('Bad Request. Data must be supplied in params object with a password and confirmPassword.');
    }
    return d.promise;
  }

  return Settings;

})();

module.exports = Settings;