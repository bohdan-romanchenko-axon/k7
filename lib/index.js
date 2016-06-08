'use strict';

// Load Modules

const Loader = require('./loader');

exports.register = (server, options, next) => {

    const loader = new Loader(server, options);

    loader.load((err, database) => {

        if (err) {
            return next(err);
        }

        server.decorate('server', 'database', database);

        return next();
    });
};

exports.register.attributes = {
    pkg: require('../package.json')
};
