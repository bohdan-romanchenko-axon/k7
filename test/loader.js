'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

// Load example

const Loader = require('../lib/loader');
const Adapter = require('./fixture/adapter');

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;
const describe = lab.describe;

const internals = {
    defaultOpt: {
        connectionString: 'mongodb://localhost:27017/k7',
        models: 'test/**/model.js',
        adapter: Adapter
    },

    loaderFactory(server, options) {

        const adapterOptions = Object.assign({}, internals.defaultOpt, options);
        return new Loader(server, adapterOptions);
    }
};

describe('Loader', () => {

    describe('constructor()', () => {

        it('when no options are sent', { plan: 7 }, (done) => {

            const loader = internals.loaderFactory(new Hapi.Server());

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['test/**/model.js']);

            return done();
        });

        it('when the models are not sent', { plan: 5 }, (done) => {

            const loader = internals.loaderFactory(new Hapi.Server(), { models: null });

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.models).to.not.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);

            return done();
        });

        it('when the models are an array', { plan: 7 }, (done) => {

            const loader = internals.loaderFactory(new Hapi.Server(), { models: ['models/*.js'] });

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['models/*.js']);

            return done();
        });
    });

    describe('load()', () => {

        it('load an Adapter class', { plan: 9 }, (done) => {

            const loader = internals.loaderFactory(new Hapi.Server());

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['test/**/model.js']);

            loader.load((err, database) => {

                expect(err).to.not.exist();
                expect(database).to.be.empty();

                return done();
            });
        });

        it('load a simple function as an adapter', { plan: 9 }, (done) => {

            const adapter = function () {

                return {
                    load(callback) {

                        return callback(null, {});
                    }
                };
            };

            const loader = internals.loaderFactory(new Hapi.Server(), { adapter });

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['test/**/model.js']);

            loader.load((err, database) => {

                expect(err).to.not.exist();
                expect(database).to.be.empty();

                return done();
            });
        });

        it('load an Adapter without a load function', (done) => {

            const adapter = function () {

                return {};
            };

            const loader = internals.loaderFactory(new Hapi.Server(), { adapter });

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['test/**/model.js']);

            expect(loader.load.bind(loader)).to.throw(Error, 'adapter must be a load function');

            return done();
        });

        it('load an Object as an Adapter', (done) => {

            const adapter = {};

            const loader = internals.loaderFactory(new Hapi.Server(), { adapter });

            expect(loader._settings).to.exist();
            expect(loader._settings.adapter).to.exist();
            expect(loader._settings.connectionOptions).to.be.empty();

            expect(loader._settings.connectionString).to.be.equal(internals.defaultOpt.connectionString);
            expect(loader._settings.models).to.be.an.array();
            expect(loader._settings.models).to.have.length(1);
            expect(loader._settings.models).to.be.equal(['test/**/model.js']);

            expect(loader.load.bind(loader)).to.throw(Error, 'adapter must be a constructor function');

            return done();
        });


    });
});

