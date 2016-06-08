'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

// Load example

const Adapter = require('./fixture/adapter');

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;
const describe = lab.describe;

const adapterOptions = {
    connectionString: 'mongodb://localhost:27017/k7',
    models: 'test/**/model.js',
    adapter: Adapter
};

describe('k7', () => {

    let server;

    it('should register the plugin', { plan: 3 }, (done) => {

        server = new Hapi.Server();
        const register = {
            register: require('../lib/index'),
            options: adapterOptions
        };

        server.register([register], (err) => {
            // No errors

            expect(err).to.not.exist();

            // Instance of K7 should be registered

            expect(server).to.include('database');
            expect(server.database).to.be.an.object();

            done();
        });
    });

    it('should register the plugin with an array of models in options', { plan: 3 }, (done) => {

        server = new Hapi.Server();

        adapterOptions.models = [adapterOptions.models];

        const register = {
            register: require('../lib/index'),
            options: adapterOptions
        };

        server.register([register], (err) => {
            // No errors

            expect(err).to.not.exist();

            // Instance of K7 should be registered

            expect(server).to.include('database');
            expect(server.database).to.be.an.object();

            done();
        });
    });

    it('should register the plugin with adapter as string', { plan: 3 }, (done) => {

        server = new Hapi.Server();
        adapterOptions.adapter = '../test/fixture/adapter';

        const register = {
            register: require('../lib/index'),
            options: adapterOptions
        };

        server.register([register], (err) => {
            // No errors

            expect(err).to.not.exist();

            // Instance of K7 should be registered

            expect(server).to.include('database');
            expect(server.database).to.be.an.object();

            done();
        });
    });

    it('should register the plugin with adapter as string', { plan: 1 }, (done) => {

        server = new Hapi.Server();
        adapterOptions.adapter = '../test/fixture/fake';

        const register = {
            register: require('../lib/index'),
            options: adapterOptions
        };

        server.register([register], (err) => {
            // No errors

            expect(err).to.exist();

            done();
        });
    });
});
