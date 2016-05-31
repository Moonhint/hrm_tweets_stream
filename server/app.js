// var morgan  = require('morgan');
// var express = require('express');
// var app     = express();
// var server  = require('http').createServer(app);
// var port    = process.env.PORT || 3000;
// var router  = express.Router();
// var search_term = "back"
//
// app.set('view engine', 'html');
// app.engine('html', require('hogan-express'));
// // app.set('views', './views');
// // app.set('view engine', 'jade');
//
// app.use(express.static(__dirname + '/public'));
//
// // Middelware
// app.use(morgan('dev'));
//
// // Routes using Routing engine
// router.get('/', function(req, res) {
//   res.render('index', { header: 'Searching twitter realtime for "'+ search_term +'"' });
// });
//
// // router.get('/contact', function(req, res) {
// //   res.render('contact', { header: 'contact!'});
// // });
//
// // router.get('/about', function(req, res) {
// //   res.render('about', { header: 'about!'});
// // });
//
// // !important
// app.use('/', router);
//
// server.listen(port);
// console.log('Server started on ' + port);
//
// // Integrate socket
// var io = require('socket.io')(server);
//
// var Twit = require('twit');
// var twitter = new Twit({
//   consumer_key: 'r4QPz8jpwCCy8CsNXCz7D5jQ5',
//   consumer_secret: 'Fj0RtJSW7tw0ifIpWag2c3C0k9ATM053JHloT8CM0hsoutfSM8',
//   access_token: '737296206833975296-LHmZY9Nj9qgdc8uHEs6TUqIDI6HuiPh',
//   access_token_secret: 'Eq4JYoGS2TmmJsrP2GINrkxlhghTeLP7xIcWhRhodyeVv'
// });
//
// var stream = twitter.stream('statuses/filter', { track: search_term });
//
// io.on('connect', function(socket) {
//   stream.on('tweet', function(tweet) {
//     var data = {};
//     data.name = tweet.user.name;
//     data.screen_name = tweet.user.screen_name;
//     data.text = tweet.text;
//     data.user_profile_image = tweet.user.profile_image_url;
//     socket.emit('tweets', data);
//   });
// });
//


/**
 * Main application file
 */

'use strict';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var http = require('http');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server);
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.hrmTweetStream = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d', config.port);
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
