'use strict';

angular.module('sqlChauveauApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('photosets', {
        url: '/photosets',
        templateUrl: 'app/photosets/photosets.html',
        controller: 'PhotosetsCtrl'
      });
  });
