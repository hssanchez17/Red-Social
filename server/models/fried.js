'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fried = sequelize.define('Fried', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  Fried.associate = function(models) {
    Fried.belongsTo(models.User,{foreingKey:'friendId',as:'friend'})
    Fried.belongsTo(models.User,{foreingKey:'userId',as:'user'})
  };
  return Fried;
};