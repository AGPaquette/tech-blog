const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to display all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts for the logged-in user
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    // Convert the retrieved data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts-admin' template with the posts data
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    // Redirect to login page in case of an error
    res.redirect('login');
  }
});

// Route to render the form for creating a new post
router.get('/new', withAuth, (req, res) => {
  // Render the 'new-post' template
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// Route to render the form for editing a specific post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the post with the specified ID
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // Convert the retrieved data to a plain object
      const post = postData.get({ plain: true });

      // Render the 'edit-post' template with the post data
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      // If post not found, return a 404 status
      res.status(404).end();
    }
  } catch (err) {
    // Redirect to login page in case of an error
    res.redirect('login');
  }
});

// Export the router instance for use in other files
module.exports = router;