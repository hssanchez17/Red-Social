'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post,{foreingKey:'postId',as:'post'})
    Comment.belongsTo(models.User,{foreingKey:'userId',as:'user'})
  };
  return Comment;
};