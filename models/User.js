const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// Create the User model that extends from Sequelize's Model class
class Users extends Model {
  // Set up a method to run on instance data (per user) to check the password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with the specified attributes and configuration
Users.init(
  {
    // Define the 'id' attribute with INTEGER data type and other constraints
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    // Define the 'username' attribute with STRING data type and allowNull set to false
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    // Define the 'password' attribute with STRING data type, allowNull set to false,
    // and length validation requiring a minimum of 4 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // Set up beforeCreate and beforeUpdate lifecycle hooks to hash the password
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    
    // Pass the sequelize instance for database connection
    sequelize,
    
    // Configure additional model options
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

// Export the User model for use in other files
module.exports = Users;
