'use strict';

var mongoose = require('mongoose');
var db = mongoose.connections[0];

var userSch = new mongoose.Schema({
  name: {type:String},
  screen_name: {type:String},
  location: {type:String},
  lang: {type: String},
  profile_image_url: {type: String}
});

var tweetSch = new mongoose.Schema({
	text : {type:String},
	source : {type:String},
  created_at: { type: Date, default: Date.now },
  user: [userSch]
});

var Tweet = db.model('tweets', tweetSch);

module.exports = Tweet;
