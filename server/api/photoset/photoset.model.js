'use strict';

import {Photo} from '../../sqldb';

export default function(sequelize, DataTypes) {
  var Photoset = sequelize.define('Photoset', {
    photoset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    narrative: DataTypes.TEXT,
    coverImageURL: DataTypes.TEXT,
    location: DataTypes.STRING,
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
  }, {
    classMethods: {
      associate: function(db) {
        Photoset.hasMany(db.Photo);
        Photoset.belongsTo(db.User, {foreignKey: 'user_id'});
      }
    }
  });

  var Photo = require('../../sqldb').Photo;

  // Photoset.hasMany(Photo, {as: 'Photos'});

  return Photoset;
}
