'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
module.exports = {
  env     : process.env.NODE_ENV,

  // Root path of server
  root    : path.normalize(__dirname + '/../../..'),

  // Server port
  port    : process.env.PORT || 8080,

  api     : {
    url : 'https://www.ovh.com/engine/apiv6',
    login: 'https://www.ovh.com/engine/api/session'
  },
  aapi     : {
    url : (process.env.NODE_ENV === 'production') ? 'http://localhost:8081' : 'http://localhost:8080',
    prodUrl: 'https://www.ovh.com/engine/2api'
  },
  apiv7: {
    url: 'https://www.ovh.com/engine/apiv7'
  }
};
