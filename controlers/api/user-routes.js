const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model and provided username and password
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Save user information to the session and respond with the new user in JSON format
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // If no user is found, respond with a 400 status and a message
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = user.checkPassword(req.body.password);

    // If the password is not valid, respond with a 400 status and a message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Save user information to the session and respond with the user and a success message
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handle errors and return a 500 status with the error details
    res.status(500).json(err);
  }
});

// Route to log out a user
router.post('/logout', (req, res) => {
  // If the user is logged in, destroy the session; otherwise, respond with a 404 status
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export the router instance for use in other files
module.exports = router;
