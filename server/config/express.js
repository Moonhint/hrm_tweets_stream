/**
 * Express configuration
 */

'use strict';

var morgan  = require('morgan');
var express = require('express');
var path = require('path');
var config = require('./environment');
var bodyParser = require('body-parser');

exports.default = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hogan-express'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.set('appPath', path.join(config.root, 'client'));

  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));
}
