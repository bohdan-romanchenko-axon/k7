'use strict';

// Load modules

const Hoek = require('hoek');

// Declare internals

let internals = {};

internals.defaults = {
  connectionString: '',
  connectionOptions: {},
  models: ''
};

module.exports = internals.K7 = function (server, options) {
  options = options || {};

  Hoek.assert(this instanceof internals.K7, 'K7 must be instantiated using new');
  Hoek.assert(server, 'server required to create k7');

  options = Hoek.applyToDefaults(internals.defaults, options);

  this.settings = options;
  this.database = {};

  if (!Array.isArray(this.settings.models)) {
    this.settings.models = [this.settings.models];
  }
};

internals.K7.prototype.load = function (cb) {
  let Adapter = this.settings.adapter;

  if (typeof this.settings.adapter === 'string') {
    Adapter = require(this.settings.adapter);
  }

  const reachOptions = {
    functions: true
  };

  const adapterName = Hoek.reach(Adapter, 'attributes.name', reachOptions) || 'adapter';

  Hoek.assert(typeof Adapter === 'function', adapterName + ' must be a constructor function');

  this.adapter = new Adapter(this.settings);

  Hoek.assert(typeof this.adapter.load === 'function', adapterName + ' must be a load function');

  this.database = this.adapter.load();
};
