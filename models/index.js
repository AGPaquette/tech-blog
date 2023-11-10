const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establish a relationship: A Post belongs to a User
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Establish a relationship: A Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Establish a relationship: A Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Export the User, Comment, and Post models along with their relationships
module.exports = {
  User,
  Comment,
  Post
};