/**
 * statusFilter model events
 */

'use strict';

var config = require('../../config/local.env');
var EventEmitter = require('events').EventEmitter;
var FilterEmitter = new EventEmitter;

var Twit = require('twit');
var twitter = new Twit({
  consumer_key: config.twitter_credential.consumer_key,
  consumer_secret: config.twitter_credential.consumer_secret,
  access_token: config.twitter_credential.access_token,
  access_token_secret: config.twitter_credential.access_token_secret
});

var Tweet = require('./tweets.model');

var stream = {};

//listeners
exports.register = function(socket){
  FilterEmitter.on('start:words', function (words) {
      try {
        stream.stop();
      } catch (e) {
        console.info("no stream to stop!");
      } finally {
        stream = twitter.stream('statuses/filter', { track: words });
        stream.on('tweet', function(tweet) {
          console.info(tweet);
          var data = {};
          data.name = tweet.user.name;
          data.screen_name = tweet.user.screen_name;
          data.text = tweet.text;
          data.user_profile_image = tweet.user.profile_image_url;
          socket.emit('word_tweets', data);

          var instance = new Tweet();
          instance.text = tweet.text;
          instance.source = tweet.source;
          instance.user.push({
            name: tweet.user.name,
            screen_name: tweet.user.screen_name,
            location: tweet.user.location || "",
            lang: tweet.user.lang,
            profile_image_url: tweet.user.profile_image_url
          })
          instance.save(function (err) {
            if (!err) console.log('tweet saved!');
          });

        });
      }
  });

  FilterEmitter.on('start:users', function (users) {
    try {
      stream.stop();
    } catch (e) {
      console.info("no stream to stop!");
    } finally {
      stream = twitter.stream('user', { track: users });
      stream.on('tweet', function(tweet) {
        console.info(tweet);
        var data = {};
        data.name = tweet.user.name;
        data.screen_name = tweet.user.screen_name;
        data.text = tweet.text;
        data.user_profile_image = tweet.user.profile_image_url;
        socket.emit('user_tweets', data);

        var instance = new Tweet();
        instance.text = tweet.text;
        instance.source = tweet.source;
        instance.user.push({
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          location: tweet.user.location || "",
          lang: tweet.user.lang,
          profile_image_url: tweet.user.profile_image_url
        })
        instance.save(function (err) {
          if (!err) console.log('tweet saved!');
        });
        
      });
    }
  });

  FilterEmitter.on('stop', function(){
    console.info("stop word");
    stream.stop();
  });
};

//Emitters
exports.emit_start_by_word = function(words){
  FilterEmitter.emit('start:words', words);
};

exports.emit_start_by_user = function(users){
  FilterEmitter.emit('start:users', users);
};

exports.emit_stop = function(event){
  FilterEmitter.emit('stop');
};
