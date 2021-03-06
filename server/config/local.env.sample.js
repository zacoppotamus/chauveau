'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'sqlchauveau-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',

  AWS_ACCESS_KEY: "xxx",
  AWS_SECRET_KEY: "xxx",
  S3_BUCKET: "xxx",
  S3_REGION: "xxx",

  // RDS Remote database
  DB_NAME: "XXX",
  DB_USER: "XXX",
  DB_PASSWORD: "XXX-XXX",
  DB_HOST: "XXX.XXX.XXX-XXX-XXX.XXX.XXX.XXX"
};
