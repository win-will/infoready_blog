// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Posts model (table) by extending off Sequelize's Model class
class Posts extends Model {}

// set up fields and rules for Product model
Posts.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    // userid: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Posts;

// metaTitle: {
//     type: DataTypes.STRING(100)
//   },
//   slug: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//     unique: true
//   },
// published: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false
//   },
//   publishedAt: {
//     type: DataTypes.DATE
//   },

