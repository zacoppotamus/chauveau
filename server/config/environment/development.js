'use strict';

var config = require('../local.env');

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    options: {
      logging: false,
      // storage: 'dev2.sqlite',
      // url: 'chauveaudb.cftwonydwgt6.eu-central-1.rds.amazonaws.com',
      port: 3306,
      host: config.DB_HOST,
      dialect: 'mysql',
      dialectOptions: {
        ssl: 'Amazon RDS'
      },
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
