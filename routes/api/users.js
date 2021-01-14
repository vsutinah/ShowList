const express = require('express'),
	bcrypt = require('bcryptjs'),
	config = require('config'),
	jwt = require('jsonwebtoken'),
	router = express.Router(),
	{ check, validationResult } = require('express-validator'),
	User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 7 or more characters'
		).isLength({ min: 7 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() }); // Return bad request code if there's an error
		}

		try {
			const { name, email, password } = req.body;
			// See if user exists
			let user = await User.findOne({ email: email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}
			user = new User({
				name,
				email,
				password,
			});
			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save(); // Save user

			// Return jsonwebtoken
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

			console.log('User created');
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Server error');
		}
	}
);

module.exports = router;
