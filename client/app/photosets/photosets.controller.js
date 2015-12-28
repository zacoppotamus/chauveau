'use strict';

class PhotosetController {
  photoset = {};
  errors = {};

  constructor($http, $state, Auth, $scope) {
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedIn;
    this.currentUser = Auth.getCurrentUser();
    this.$scope = $scope;
    this.partialDownloadLink = 'http://localhost:8080/download?filename=';
    // console.log(partialDownloadLink);

    if (this.isLoggedIn() === false) {
      this.$state.go('main');
    }

  };

  getSignedRequest(file) {
    this.$http.get('/api/storage/sign_s3', {
      // headers: {'x-amz-acl', 'public-read'},
      file_name: "zzz",
      file_type: "zzz"
    })
  }

  addPhotoset(form) {
    this.submitted = true;

    if (form.$valid) {
      // Upload dropzone pictures here, if any
      // this.uploadFile();


      this.$http.post('/api/photosets', {
        name: this.photoset.name,
        narrative: this.photoset.narrative,
        location: this.photoset.location
      });
    }
  }

  uploadFile() {
      this.$scope.processDropzone();
  };

  resetDropzone() {
    alert("resetting");
    this.$scope.resetDropzone();
  };
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
