'use strict';

var path = require('path');

// All configurations will extend these options
// ============================================
var all = {
  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // MongoDB connection
  mongo: {
    uri: 'mongodb://localhost/hrm-tweet-stream',
    options: {
      db: {
        safe: true
      }
    }
  },

  twitter_credential: {
    consumer_key: 'r4QPz8jpwCCy8CsNXCz7D5jQ5',
    consumer_secret: 'Fj0RtJSW7tw0ifIpWag2c3C0k9ATM053JHloT8CM0hsoutfSM8',
    access_token: '737296206833975296-LHmZY9Nj9qgdc8uHEs6TUqIDI6HuiPh',
    access_token_secret: 'Eq4JYoGS2TmmJsrP2GINrkxlhghTeLP7xIcWhRhodyeVv'
  }
  
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
