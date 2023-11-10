const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post with authentication
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new post using the Post model and user session information
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to update a post by ID with authentication
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post with the specified ID
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if the update was successful
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to delete a post by ID with authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post with the specified ID
    const [affectedRows] = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if the deletion was successful
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Export the router instance for use in other files
module.exports = router;
