const sequelize = require('../config/connection');
const { User } = require('../models');
const { Posts } = require('../models');
const { Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Posts.bulkCreate(postData);

  await Comments.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
