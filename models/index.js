// import models
const Posts = require('./Posts');
const User = require('./User');

// Users have many Posts
User.hasMany(Posts);

module.exports = {
  Posts,
  User,
};
