'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User,{foreingKey:'friendId',as:'friend'})
    Follow.belongsTo(models.User,{foreingKey:'userId',as:'user'})
  };
  return Follow;
};