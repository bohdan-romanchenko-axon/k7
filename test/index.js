'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

// Load example

const Adapter = require('./adapter');

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;
const describe = lab.describe;

describe('K7', () => {
  let server;
  let options = {
    connectionString: 'mongodb://localhost:27017/k7',
    models: 'test/**/model.js',
    adapter: Adapter
  };

  it('should register the plugin', (done) => {
    server = new Hapi.Server();
    const register = {
      register: require('../index'),
      options
    };

    server.register([register], (err) => {
      // No errors

      expect(err).to.not.exist;

      // Instance of K7 should be registered

      expect(server).to.deep.include('database');
      expect(server.database).to.be.an.object();

      done();
    });
  });

  it('should register the plugin with an array of models in options', (done) => {
    server = new Hapi.Server();

    options.models = [options.models];

    const register = {
      register: require('../index'),
      options
    };

    server.register([register], (err) => {
      // No errors

      expect(err).to.not.exist;

      // Instance of K7 should be registered

      expect(server).to.deep.include('database');
      expect(server.database).to.be.an.object();

      done();
    });
  });

  it('should register the plugin with adapter as string', (done) => {
    server = new Hapi.Server();
    options.adapter = '../test/adapter';

    const register = {
      register: require('../index'),
      options
    };

    server.register([register], (err) => {
      // No errors

      expect(err).to.not.exist;

      // Instance of K7 should be registered

      expect(server).to.deep.include('database');
      expect(server.database).to.be.an.object();

      done();
    });
  });
});
