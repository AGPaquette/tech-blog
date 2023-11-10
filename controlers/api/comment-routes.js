const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to handle the creation of a new comment with authentication
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new comment using the Comment model and user session information
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });

    // Respond with the newly created comment in JSON format
    res.json(newComment);
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Export the router instance for use in other files
module.exports = router;
