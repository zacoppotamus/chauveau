'use strict';

import express from 'express';
// import config from '../config/environment';
// import aws from 'aws_sdk';
var aws = require('aws-sdk');

// Set up credentials for S3
var s3_config = require('../config/local.env');
var AWS_ACCESS_KEY = s3_config.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = s3_config.AWS_SECRET_KEY;
var S3_BUCKET = s3_config.S3_BUCKET;
var AWS_REGION = s3_config.S3_REGION;

var router = express.Router();

/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
router.get('/sign_s3', function(req, res, next) {
  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
    signatureVersion: 'v4'
  });

  var s3 = new aws.S3();
  console.log(req.query.file_name);
  var s3_params = {
      Bucket: S3_BUCKET,
      Key: 'test/'+req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          var return_data = {
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
          };
          res.write(JSON.stringify(return_data));
          res.end();
      }
  });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
router.post('/submit_form', function(req, res){
    username = req.body.username;
    full_name = req.body.full_name;
    photo_url = req.body.photo_url;
    // update_account(username, full_name, photo_url); // TODO: create this function
    // TODO: Return something useful or redirect
});



export default router;
