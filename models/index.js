// import models
const Posts = require('./Posts');
const User = require('./User');
const Comments = require('./Comments');

// Users have many Posts
User.hasMany(Posts);

//Each post belongs to one user
Posts.belongsTo(User);

// Posts have many Comments
Posts.hasMany(Comments);

//Each Comment belongs to one Post
Comments.belongsTo(Posts);

// Comments belongTo Users Through Posts
Comments.belongsTo(User, { through: Posts });

module.exports = {
  Posts,
  User,
  Comments,
};
