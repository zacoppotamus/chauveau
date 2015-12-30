'use strict';

angular.module('sqlChauveauApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('photosets', {
        url: '/photosets',
        templateUrl: 'app/photosets/photosets.html',
        controller: 'PhotosetsCtrl',
        controllerAs: 'vm'
      })
      .state('addPhotoset', {
        url: '/add_photoset',
        templateUrl: 'app/photosets/add_photoset.html',
        controller: 'PhotosetsCtrl',
        controllerAs: 'vm'
      })
      .state('photoset', {
        url: '/photoset/:photosetId',
        templateUrl: 'app/photosets/photoset.html',
        controller: 'PhotosetsCtrl',
        controllerAs: 'vm'
      })
  });
