var request = require('request');

var SdkUtils = {
  extend: function extend(dst) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.forEach(function(obj) {
      if (obj !== dst) {
        for (var key in obj) {
          dst[key] = obj[key];
        }
      }
    });
  },

  setAuthToken: function(token) {
    if (token) {
      this._authToken = token;
    }
  },

  setBaseUrl: function(baseUrl) {
    if (baseUrl) {
      this._baseUrl = baseUrl;
    }
  },

  isSuccess: function(error, res) {
    if (!error && success(res.statusCode)) {
      return true;
    }
    return false;

    function success(status) {
      return 200 <= status && status < 300;
    }
  },

  sendRequest: function(endpoint, method, deferred, json, queryStringObj) {
    var options = this.buildOptions(endpoint, method, json, queryStringObj);
    var self = this;
    request(options, function(error, response, body) {
      body = typeof body === 'string' ? JSON.parse(body) : body;
      self.isSuccess(error, response) ? deferred.resolve(body) : deferred.reject(body);
    });
  },

  buildOptions: function(endpoint, method, json, queryStringObj) {
    var options = {
      uri: this._baseUrl + endpoint,
      method: method,
      headers: {
        Authorization: 'Access-Token ' + this._authToken
      }
    }

    if (json) {
      options.json = json;
    }

    if (queryStringObj) {
      options.qs = queryStringObj;
    }

    return options;

  }
}

module.exports = SdkUtils;