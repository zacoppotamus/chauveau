'use strict';

export default function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    imageSource: DataTypes.STRING
  }, {
      classMethods: {
        associate: function(db) {
          Photo.belongsTo(db.Photoset, {foreignKey: 'photoset_id'});
          Photo.belongsTo(db.User, {foreignKey: 'user_id'});
        }
      }
  });

  return Photo;
}
