'use strict';

var status_filter = require('./tweets.events');
// After user request we throw it to events to handle streaming

exports.stream_by_word = function (req, res) {
  switch (req.params.status) {
    case "start":
      status_filter.emit_start_by_word(req.body.words);
      res.status(200).json({status: "start by words emitted"})
      break;
    case "stop":
      status_filter.emit_stop();
      res.status(200).json({status: "stop by words emitted"})
      break;
    default:
      res.status(400).json({reason: "bad request"})
  }
}

exports.stream_by_user = function (req, res) {
  switch (req.params.status) {
    case "start":
      status_filter.emit_start_by_user(req.body.users);
      res.status(200).json({status: "start by users emitted"})
      break;
    case "stop":
      status_filter.emit_stop();
      res.status(200).json({status: "stop by users emitted"})
      break;
    default:
      res.status(400).json({reason: "bad request"})
  }
}
