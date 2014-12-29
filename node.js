'use strict';

var sandbox = require('sandboxed-module');

module.exports = function(window) {
  return sandbox.require('./index', {
    globals: {
      document: window.document
    }
  });
};
