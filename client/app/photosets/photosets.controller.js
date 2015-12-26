'use strict';

class PhotosetController {
  photoset = {};
  errors = {};

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

  addPhotoset(form) {
    this.submitted = true;

    if (form.$valid) {
      this.$http.post('/api/photosets', {
        name: this.photoset.photosetName,
        narrative: this.photoset.photosetNarrative,
        location: this.photoset.photosetLocation
      });
    }
  }
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
