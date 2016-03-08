'use strict';

let internals = {};

module.exports = internals.Adapter = function (options) {};

internals.Adapter.attributes = {
  name: 'Example',
  version: '1.0.0'
};

internals.Adapter.prototype.load = function () {
  return {};
};
