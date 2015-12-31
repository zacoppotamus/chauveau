'use strict';

class PhotosetController {
  photoset = {};
  errors = {};

  constructor($http, $state, $stateParams, Auth, $scope) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.isLoggedIn = Auth.isLoggedIn;
    this.currentUser = Auth.getCurrentUser();
    this.currentUserId = this.currentUser._id;
    this.photosetId = null;
    this.$scope = $scope;
    this.partialDownloadLink = 'http://localhost:8080/download?filename=';
    this.photosets = null;
    this.photos = null;

    if(this.$state.current.name === "photosets") {
      this.getPhotosets();
    }

    if(this.$state.current.name === "photoset" || this.$state.current.name === "editPhotoset") {
      // Populate photos for photoset
      this.getPhotos()
      var photosetId = this.$stateParams.photosetId;

      // Get pictures belonging to this photoset
      this.$http.get('/api/photos/photoset/' + photosetId)
        .then((response) => {
          this.photos = response.data
          console.log(this.photos);
        })
    }

    if (this.isLoggedIn() === false) {
      this.$state.go('main');
    }

  };

  // Get photos from current photoset
  getPhotos(photosetName) {
    return;
  }

  // Get Photosets belonging to current user
  getPhotosets() {
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

    this.$http.get('/api/photosets/user/' + this.currentUserId, {
        params: params
      }).then((response) => {
        this.photosets = response.data;
        console.log(this.photosets);
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
    }).then(() => {
      alert("done");
      this.$state.go("editPhotoset", {photosetId: this.photosetId});
    });

  };

  resetDropzone() {
    this.$scope.resetDropzone();
  };
}

angular.module('sqlChauveauApp')
  .controller('PhotosetsCtrl', PhotosetController);
