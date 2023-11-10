const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define the Comment model that extends from Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with the specified attributes and configuration
Comment.init(
  {
    // Define the 'body' attribute with a STRING data type and allowNull set to false
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Pass the sequelize instance for database connection
    sequelize
  }
);

// Export the Comment model for use in other files
module.exports = Comment;
