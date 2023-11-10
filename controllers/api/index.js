const express = require('express');
const router = express.Router();

// Import routes for different entities
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Use the imported routes for their respective paths
router.use('/user', userRoutes);       // Use userRoutes for '/user'
router.use('/post', postRoutes);       // Use postRoutes for '/post'
router.use('/comment', commentRoutes); // Use commentRoutes for '/comment'

// Export the router instance for use in other files
module.exports = router;
