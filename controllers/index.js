const express = require('express');
const router = express.Router();

// Import routes for different parts of the application
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Use the imported routes for their respective paths
router.use('/', homeRoutes);          // Use homeRoutes for '/'
router.use('/dashboard', dashboardRoutes);  // Use dashboardRoutes for '/dashboard'
router.use('/api', apiRoutes);        // Use apiRoutes for '/api'

// Export the router instance for use in other files
module.exports = router;