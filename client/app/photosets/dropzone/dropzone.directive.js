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
        scope.signedRequests = []; // Store all signed requests for uploaded images
        scope.fileTypes = [];


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

            scope.photoURLs.push(data.data.url);

            if (!data.data.signed_request) {
              return cb('Failed to receive an upload url');
            }
            scope.signedRequests.push(data.data.signed_request);
            scope.fileTypes.push(data.data.file_type);
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
            url: 'http://chauveau.s3.amazonaws.com/',
            maxFilesize: 30,
            paramName: "uploadfile",
            maxThumbnailFilesize: 10,
            acceptedMimeTypes: "image/bmp,image/jpg,image/jpeg,image/png",
            parallelUploads: 10,
            autoProcessQueue: false,
            accept: scope.getUploadUrl,
            // headers: [{ "x-amz-acl": "public-read", "Content-Type": "image/jpg"}],
            method: 'PUT',
            sending: function(file, xhr) {

              xhr.open('PUT', scope.signedRequests.pop());
              var _send = xhr.send;
              xhr.send = function() {
                _send.call(xhr, file);
              };

              // var xhr = new XMLHttpRequest();
              // console.log(file);
              // xhr.open('PUT', scope.signedRequests.pop());
              // xhr.setRequestHeader('x-amz-acl', 'public-read');
              // console.log(scope.fileTypes);
              // xhr.setRequestHeader('Content-Type', file.type);
              // xhr.onload = function() {
              //   // alert("upload successful");
              // };
              // xhr.onerror = function() {
              //   alert("Could not upload file.");
              // };
              // xhr.send(file);
            },
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
          // this.options.headers.push({
          //   'Content-Type': scope.fileType
          // });
          this.options.signed_request = scope.file.signed_request;
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
