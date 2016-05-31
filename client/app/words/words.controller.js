(function(){
  'use strict';

  angular
    .module('hrmTweetStream')
    .controller('StreamByWordController', StreamByWordController);

  StreamByWordController.$inject = ['$state', '$stateParams', '$http'];

  function StreamByWordController ($state, $stateParams, $http) {

    var self = this;

    self.start_stream = function() {
      $http.post('http://localhost:3000/stream/by_word/start', {words: self.words})
        .then(function(res) {
          console.info(res);
        }, function (reason) {
          console.error(reason);
        });
    }

    self.stop_stream = function() {
      $http.post('http://localhost:3000/stream/by_word/stop')
        .then(function(res) {
          console.info(res);
        }, function (reason) {
          console.error(reason);
        });
    }

  }

})();
