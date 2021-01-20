const express = require('express'),
	router = express.Router(),
	Show = require('../../models/Show');

// @route GET api/:userId/shows
// @desc Show all recommended shows for a certain user
// @access Public
router.get('/', (req, res) => {
	res.send('Show route');
});

// @route POST api/:userId/shows/recommend
// @desc Add/post/give a show recommendation to user 'userId'
// @access Private
router.post('/recommend', (req, res) => {
	res.send('Recommending route');
});

module.exports = router;
