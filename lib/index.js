'use strict';

// Load Modules

const K7 = require('./k7');

exports.register = (server, options, next) => {
  const k7 = new K7(server, options);

  server.expose('k7', k7);

  k7.load();

  server.decorate('server', 'database', k7.database);

  return next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
