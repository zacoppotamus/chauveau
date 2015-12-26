'use strict';

class PhotosetController {
  constructor($http, $state, Auth) {
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedIn;
    this.currentUser = Auth.getCurrentUser();
    console.log(this.currentUser);

    if (this.isLoggedIn() === false) {
      this.$state.go('main');
    }

  };

  addPhotoset() {
    this.$http.post('/api/photosets', {
      name: this.photosetName,
      narrative: this.photosetNarrative,
      location: this.photosetLocation
    });
  }
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
