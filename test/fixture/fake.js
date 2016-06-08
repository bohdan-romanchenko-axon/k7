'use strict';

class Fake {

    load(callback) {

        return callback(new Error('Error on load all models'));
    }
}

module.exports = Fake;

