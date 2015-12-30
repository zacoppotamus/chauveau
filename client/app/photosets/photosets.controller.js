'use strict';

class PhotosetController {
  photoset = {};
  errors = {};

  constructor($http, $state, Auth, $scope) {
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedIn;
    this.currentUser = Auth.getCurrentUser();
    this.currentUserId = this.currentUser._id;
    this.photosetId = null;
    this.$scope = $scope;
    this.partialDownloadLink = 'http://localhost:8080/download?filename=';
    this.photosets = null;

    this.getPhotosets();

    if (this.isLoggedIn() === false) {
      this.$state.go('main');
    }

  };

  // Get Photosets belonging to current user
  getPhotosets() {
    console.log(this.currentUser);
    var params = {
      user_id: this.currentUserId
    };

    // this.$http({
    //   url: '/api/photosets',
    //   method: 'GET',
    //   params: params
    // }).then((response) => {
    //   console.log(this.currentUserId);
    //   console.log(response);
    //   this.photosets = response;
    // });

    this.$http.get('/api/photosets', {
        user_id: 32
      }).then((response) => {
        console.log(this.currentUserId);
        console.log(response);
        this.photosets = response;
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
        location: this.photoset.location,
        user_id: this.currentUserId
      }).then((response) => {
        this.photosetId = response.data.photoset_id;
      });


    }
  }

  uploadFiles() {
    this.submitted = true;

    // if (form.$valid) {}
      // Upload dropzone pictures here, if any
      // TO DO: What happens with empty files

    var that = this;
    this.$http.post('/api/photosets', {
      name: this.photoset.name,
      narrative: this.photoset.narrative,
      location: this.photoset.location,
      user_id: this.currentUserId
    }).then((response) => {

      this.photosetId = response.data.photoset_id;

      // Upload to S3
      this.$scope.processDropzone();

      // Push individual photos here as a photo model
      var photosetId = this.photosetId;
      var currentUserId = this.currentUserId;
      console.log("photosetId", photosetId);
      _.each(this.$scope.photoURLs, d => {
        this.$http.post('/api/photos', {
          imageURL: d,
          imageSource: d,
          photoset_id: photosetId,
          user_id: currentUserId
        })
      });
    });

  };

  resetDropzone() {
    this.$scope.resetDropzone();
  };
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
