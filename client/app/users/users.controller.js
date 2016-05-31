(function(){
  'use strict';

  angular
    .module('hrmTweetStream')
    .controller('StreamByUserController', StreamByUserController);

  StreamByUserController.$inject = ['$state', '$stateParams', '$http'];

  function StreamByUserController ($state, $stateParams, $http) {

    var self = this;

    self.start_stream = function() {
      $http.post('http://localhost:3000/stream/by_user/start', {words: self.users})
        .then(function(res) {
          console.info(res);
        }, function (reason) {
          console.error(reason);
        });
    }

    self.stop_stream = function() {
      $http.post('http://localhost:3000/stream/by_user/stop')
        .then(function(res) {
          console.info(res);
        }, function (reason) {
          console.error(reason);
        });
    }

  }

})();
