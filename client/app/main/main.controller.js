'use strict';

(function() {

class MainController {

  constructor($http, Auth) {
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedIn;
  }
}

angular.module('sqlChauveauApp')
  .controller('MainController', MainController);

})();
