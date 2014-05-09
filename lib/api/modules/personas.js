/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Personas, q, util;
util = require('../../util');
q = require('q');

Personas = (function () {

  function Personas (robin) {
    util.__copyProperties(this, robin);
  }

  Personas.prototype.get = function (personaId) {
    if (personaId) {
      return this.sendRequest('/personas/' + personaId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Persona personaId must be supplied.');
    }
  };

  Personas.prototype.update = function (personaId, data) {
    if (personaId && data) {
      return this.sendRequest('/personas/' + personaId, 'PATCH', data);
    } else {
      return this.rejectRequest('Bad Request. A Persona personaId must be supplied.');
    }
  };

  Personas.prototype.remove = function (personaId) {
    if (personaId) {
      return this.sendRequest('/personas/' + personaId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Persona personaId must be supplied.');
    }
  };

  /*
   * Persona Attributes
   */

  Personas.prototype.getAttributes = function (personaId) {
    if (personaId) {
      return this.sendRequest('/personas/' + personaId + '/attributes', 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Persona id must be supplied.');
    }
  };

  Personas.prototype.getAttribute = function (personaId, attributeId) {
    if (personaId && attributeId) {
      return this.sendRequest('/personas/' + personaId + '/attributes/' + attributeId, 'GET');
    } else {
      return this.rejectRequest('Bad Request. A Persona id and an Attribute id must be supplied.');
    }
  };

  Personas.prototype.addAttribute = function (personaId, attributeId, attributeData) {
    if (personaId && attributeId && attributeData) {
      return this.sendRequest('/personas/' + personaId + '/attributes/' + attributeId, 'PUT', attributeData);
    } else {
      return this.rejectRequest('Bad Request. Persona id, attribute id and attribute data must be supplied.');
    }
  };

  Personas.prototype.updateAttribute = function (personaId, attributeId, attributeData) {
    if (personaId && attributeId && attributeData) {
      return this.sendRequest('/personas/' + personaId + '/attributes/' + attributeId, 'PATCH', attributeData);
    } else {
      return this.rejectRequest('Bad Request. Persona id, attribute id and attribute data must be supplied.');
    }
  };

  Personas.prototype.removeAttribute = function (personaId, attributeId) {
    if (personaId && attributeId) {
      return this.sendRequest('/personas/' + personaId + '/attributes/' + attributeId, 'DELETE');
    } else {
      return this.rejectRequest('Bad Request. A Persona id and an Attribute id must be supplied.');
    }
  };

  return Personas;

}).apply(this, arguments);

module.exports = Personas;
