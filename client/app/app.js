'use strict';

angular.module('hrmTweetStream', [
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider) {
    // Routes
    $urlRouterProvider.otherwise('/options');

    $stateProvider
      .state('options',{
        url: '/options',
        templateUrl: 'app/options/options.html',
        controller: 'OptionsController',
        controllerAs: 'o_ctrl',
      })
      .state('words', {
        url: '/words',
        templateUrl: 'app/words/words.html',
        controller: 'StreamByWordController',
        controllerAs: 'w_ctrl',
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'StreamByUserController',
        controllerAs: 'u_ctrl',
      });
  });
