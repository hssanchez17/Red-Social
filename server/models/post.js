'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    public_id: DataTypes.STRING,
    title:DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Like,{ foreignKey: 'postId', as:'like'});
    Post.hasMany(models.Comment,{foreignKey:'postId',as:'comments'})
  };
  return Post;
};