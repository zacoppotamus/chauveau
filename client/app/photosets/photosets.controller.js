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

    console.log(this.photoset);

    if (form.$valid) {
      this.$http.post('/api/photosets', {
        name: this.photoset.name,
        narrative: this.photoset.narrative,
        location: this.photoset.location
      });
    }
  }
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
