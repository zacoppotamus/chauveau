/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Photo = db.sequelize.import('../api/photo/photo.model');
db.Photoset = db.sequelize.import('../api/photoset/photoset.model');

db.Photo.belongsTo(db.Photoset, {foreignKey: 'photoset_id'});
db.Photo.belongsTo(db.User, {foreignKey: 'user_id'});
db.Photoset.belongsTo(db.User, {foreignKey: 'user_id'});
// db.Photoset.hasMany(db.Photo, {as: 'Photos'})
// db.User.hasMany(db.Photoset);

export default db;
