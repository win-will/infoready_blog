// import models
const Posts = require('./Posts');
const User = require('./User');

// Users have many Posts
User.hasMany(Posts);

//Each post belongs to one user
Posts.belongsTo(User);

module.exports = {
  Posts,
  User,
};
