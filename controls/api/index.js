const router = require('express').Router();

const userRoutes = require('./routesUser.js');
const postRoutes = require('./routesPost.js');
const commentRoutes = require('./routesComments.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;