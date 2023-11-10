const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all posts including user information
    const postData = await Post.findAll({
      include: [User],
    });

    // Convert the retrieved data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts' template with the posts data
    res.render('all-posts', { posts });
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to get a single post with associated user and comments
router.get('/post/:id', async (req, res) => {
  try {
    // Find the post with the specified ID, including user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // Convert the retrieved data to a plain object
      const post = postData.get({ plain: true });

      // Render the 'single-post' template with the post data
      res.render('single-post', { post });
    } else {
      // If post not found, return a 404 status
      res.status(404).end();
    }
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the 'login' template
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the 'signup' template
  res.render('signup');
});

// Export the router instance for use in other files
module.exports = router;