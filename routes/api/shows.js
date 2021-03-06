const express = require('express'),
	router = express.Router(),
	{ check, validationResult } = require('express-validator'),
	auth = require('../../middlewares/auth'),
	User = require('../../models/User'),
	Show = require('../../models/Show');

// @route POST api/shows
// @desc Add/post/give a show recommendation to user 'userId'
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('type', 'Type is required').not().isEmpty(),
			check('description', 'Description is required').not().isEmpty(),
			check('targetUser', 'You need to select a user to recommend to')
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		// Check for validation errors; return status error 400 if there are
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() }); // Return bad request code if there's an error
		}

		try {
			// Create new Show using form data from req body
			const show = new Show(req.body);

			// Add recommender's ID to fromUser property
			show.fromUser = req.user.id;

			// Add target user's ID by finding it with the name used in form
			const targetUser = await User.findOne({ name: req.body.targetUser });
			show.targetUser = targetUser._id;

			// If genre is empty, set it as '-'
			if (show.genre === null) {
				show.genre = '-';
			}

			// Save show details to DB
			await show.save();

			res.send(show);
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Server error');
		}
	}
);

// @route GET api/shows
// @desc Show all recommended shows for logged in user
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		// Find show recommendations that have same targetUser ID as current user's ID
		const shows = await Show.find({
			targetUser: req.user.id,
		}).populate('fromUser', ['name']);

		res.json(shows);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send('Server error');
	}
});

// @route GET api/shows/:showId
// @desc Show specific recommended shows for logged in user
// @access Private
router.get('/:showId', auth, async (req, res) => {
	try {
		// Find details of the recommendation IF targetUser ID == current user's ID
		let show = await Show.findOne({
			targetUser: req.user.id,
			_id: req.params.showId,
		}).populate('fromUser', ['name']);

		// If recommendation is retrieved for 1st time, set seen property to true
		if (!show.seen) {
			show = await Show.findOneAndUpdate(
				{ _id: req.params.showId },
				{ seen: true }
			);
			await show.save();
		}

		res.send(show);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send('Server error');
	}
});

module.exports = router;
