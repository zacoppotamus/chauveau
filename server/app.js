/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Set up S3 storing
// var s3_config = require('./config/local.env');
// var AWS_ACCESS_KEY = s3_config.AWS_ACCESS_KEY;
// var AWS_SECRET_KEY = s3_config.AWS_SECRET_KEY;
// var S3_BUCKET = s3_config.S3_BUCKET;
// import aws from 'aws-sdk';
// aws.config.update({
//   accessKeyId: AWS_ACCESS_KEY,
//   secretAccessKey: AWS_SECRET_KEY,
//   region: 'Frankfurt',
//   signatureVersion: 'v4'
// });

// var s3 = new aws.S3();
// var s3_params = {
//   Bucket: s3_config.S3_BUCKET
// }

// console.log(AWS_SECRET_KEY);

// Expose app
exports = module.exports = app;
