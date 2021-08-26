require('dotenv').config({
	path: '.env',
});

const express = require('express'),
	app = express(),
	axios = require('axios'),
	cors = require('cors'),
	connectDB = require('./config/db');
path = require('path');

connectDB();

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000'
			: 'http://example.com',
});

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/shows', require('./routes/api/shows'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

module.exports = instance;
