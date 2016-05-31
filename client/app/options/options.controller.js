(function(){
  'use strict';

  angular
    .module('hrmTweetStream')
    .controller('OptionsController', OptionsController);

  OptionsController.$inject = ['$state', '$stateParams'];

  function OptionsController ($state, $stateParams) {

    var self = this;
    self.go_to_words = function() {
      $state.go('words');
    }
    self.go_to_users = function() {
      $state.go('users');
    }

  }

})();
