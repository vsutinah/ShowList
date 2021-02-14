const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	bcrypt = require('bcryptjs'),
	config = require('config'),
	{ check, validationResult } = require('express-validator'),
	jwt = require('jsonwebtoken'),
	User = require('../../models/User');

// @route GET api/auth
// @desc Get user auth
// @access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/auth
// @desc Authenticate user and get JWT to login
// @access Public
router.post(
	'/',
	[
		check('email', 'Please include valid email').isEmail(),
		check('password', 'Password is required').exists(), // Check for email and password in req.body
	],
	async (req, res) => {
		const errors = validationResult(req); // Check for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() }); // Return bad request code if there's an error
		}

		try {
			const { email, password } = req.body;
			// See if user exists and retrieve user details from DB
			let user = await User.findOne({ email });
			// Return error if user doesn't exist
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			// Compare input password with hashed password in DB
			const isMatch = await bcrypt.compare(password, user.password);
			// Return 400 error if the password does not match
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			// Return jsonwebtoken
			// Create payload with user ID in it for the JWT
			const payload = {
				user: {
					id: user.id,
				},
			};
			// Sign JWT with payload and secret
			// Will use JWT to gain access to protected routes
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600000 }, // Expires in 3600000 secs
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

			// Set last login property to current date
			user = await User.findOneAndUpdate(
				{ email: email },
				{ lastLogin: user.currentLogin, currentLogin: Date.now() }
			);
			await user.save();
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Server error');
		}
	}
);

module.exports = router;
