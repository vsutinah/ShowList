const express = require('express'),
	app = express(),
	connectDB = require('./config/db');

connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/shows', require('./routes/api/shows'));

app.get('/', (req, res) => res.send('API running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
