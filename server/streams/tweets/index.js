'use strict';

var express = require('express');
var controller = require('./tweets.controller');

var router = express.Router();

router.post('/by_word/:status', controller.stream_by_word);
router.post('/by_user/:status', controller.stream_by_user);

module.exports = router;
