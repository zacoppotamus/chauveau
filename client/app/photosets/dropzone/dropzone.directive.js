'use strict';

angular.module('sqlChauveauApp')
  .directive('dropzone', ['$http', 'Auth', function ($http, Auth) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.user = Auth.getCurrentUser();
        scope.file = {};
        scope.photoURLs = []; // Store all URLs for uploaded images


        scope.getUploadUrl = function(file, cb) {
          var params = {
            fileName: file.name,
            fileType: file.type,
          };

          $http({
            method: 'GET',
            url: '/storage/sign_s3',

            params: {
              file_type: file.type,
              file_name: file.name,
              email: scope.user.email
            },
          }).then(function(data) {
            console.log(data);
            console.log(data.data.signed_request);
            console.log(data.data.url);

            scope.photoURLs.push(data.data.url);
            console.log(scope.photoURLs);

            if (!data.data.signed_request) {
              return cb('Failed to receive an upload url');
            }
            scope.file.fileType = file.type;
            scope.file.uploadUrl = data.data.signed_request;
            scope.file.signed_request = data.data.signed_request;
            cb();
          }, function(data, cb) {;
            if (!data.data.signed_request) {
              return cb('Failed to receive an upload url');
            }
          })
        };


        var config = {
            url: 'http://chauveau-us.s3.amazonaws.com/',
            maxFilesize: 30,
            paramName: "uploadfile",
            maxThumbnailFilesize: 10,
            acceptedMimeTypes: "image/bmp,image/jpg,image/jpeg,image/png",
            parallelUploads: 10,
            autoProcessQueue: false,
            accept: scope.getUploadUrl,
            headers: [{ "x-amz-acl": "public-read"}],
            method: 'PUT',
            // sending: function(file, xhr) {
            //   var xhr = new XMLHttpRequest();
            //   xhr.open('PUT', this.options.signed_request);
            //   xhr.setRequestHeader('x-amz-acl', 'public-read');
            //   xhr.setRequestHeader('Content-Type', 'image/jpeg');
            //   xhr.onload = function() {
            //     // alert("upload successful");
            //   };
            //   xhr.onerror = function() {
            //     alert("Could not upload file.");
            //   };
            //   xhr.send(file);
            // },
        };


        var dropzone = new Dropzone(element[0], config);

        var eventHandlers = {
            'addedfile': function(file) {
                scope.file = file;
                // Turn them upside down
                // if (this.files[1]!=null) {
                //     this.removeFile(this.files[0]);
                // }
                scope.$apply(function() {
                    scope.fileAdded = true;
                });
            },

            'success': function (file, response) {
            }
        };

        angular.forEach(eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });

        dropzone.on('processing', function(file) {
          // Change url before sending
          this.options.url = scope.file.uploadUrl;
          this.options.headers.push({
            'Content-Type': scope.fileType
          });
          this.options.signed_request = scope.file.signed_request;
          console.log('processing', this.options.signed_request);
        });


        scope.processDropzone = function() {
            dropzone.processQueue();
        };

        scope.resetDropzone = function() {
            dropzone.removeAllFiles();
        }


      }
    };
  }]);
