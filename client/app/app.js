'use strict';

angular.module('sqlChauveauApp', [
  'sqlChauveauApp.auth',
  'sqlChauveauApp.admin',
  'sqlChauveauApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .animation('.reveal-animation', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(400, done);
        return function() {
          element.stop();
        }
      },
      leave: function(element, done) {
        element.fadeOut(0, done)
        return function() {
          element.stop();
          element.remove();
        }
      }
    }
  });
