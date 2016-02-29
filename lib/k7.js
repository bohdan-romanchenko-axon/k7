'use strict';

// Load modules

const Glob = require('glob');
const Hoek = require('hoek');
const Path = require('path');

const cwd = process.cwd();

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

// internals.K7.loadModels = function () {
  // let files = this.settings.models.reduce((arr, model) => {
  //   return arr.concat(glob.sync(model, { nodir: true }));
  // }, []); 
  //
  // this._modelsFiles = files;

  // this._models = files.reduce((db, model) => {
  //   let modelPath = Path.isAbsolute(model) ? model : Path.join(cwd, file);
  //
  //   try {
  //     let modelName = file.split('/').unshift();
  //     modelName = modelName[0].toUpperCase() + modelName.slice(1);
  //
  //     db[modelName] = require(modelPath); 
  //   } catch (err) {
  //     console.warn(modelPath, 'is not  a valid model');
  //   }
  //
  //   return db;
  //
  // }, {});
// };
