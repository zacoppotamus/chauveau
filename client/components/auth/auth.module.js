'use strict';

angular.module('sqlChauveauApp.auth', [
  'sqlChauveauApp.constants',
  'sqlChauveauApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
