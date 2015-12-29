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
      location: this.photoset.location
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
