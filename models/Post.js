const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define the Post model that extends from Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with the specified attributes and configuration
Post.init(
  {
    // Define the 'title' attribute with a STRING data type
    title: DataTypes.STRING,
    
    // Define the 'body' attribute with a STRING data type
    body: DataTypes.STRING
  },
  {
    // Pass the sequelize instance for database connection
    sequelize
  }
);

// Export the Post model for use in other files
module.exports = Post;
