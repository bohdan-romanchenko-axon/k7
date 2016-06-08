'use strict';

// Load modules

const Hoek = require('hoek');

// Declare internals

const internals = {
    defaults: {
        connectionString: '',
        connectionOptions: {},
        models: null,
        adapter: ''
    }
};

class Loader {
    constructor(server, options) {

        Hoek.assert(server, 'server is required to create k7');

        options = Hoek.applyToDefaults(internals.defaults, options);

        this._settings = options;

        if (this._settings.models && !Array.isArray(this._settings.models)) {
            this._settings.models = [this._settings.models];
        }
    }

    load(callback) {

        let Adapter = this._settings.adapter;

        if (typeof this._settings.adapter === 'string') {
            Adapter = require(this._settings.adapter);
        }

        const adapterName = Adapter.name || 'adapter';

        Hoek.assert(typeof Adapter === 'function', `${adapterName} must be a constructor function`);

        const adapter = new Adapter(this._settings);

        Hoek.assert(typeof adapter.load === 'function', `${adapterName} must be a load function`);

        return adapter.load(callback);
    }
}

module.exports = Loader;
