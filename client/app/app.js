'use strict';

angular.module('sqlChauveauApp', [
  'sqlChauveauApp.auth',
  'sqlChauveauApp.admin',
  'sqlChauveauApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
