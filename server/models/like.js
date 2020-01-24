'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
  	Like.belongsTo(models.Post,{foreingKey:'postId',as:'post'})
  };
  return Like;
};