const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
	console.log('MongoDB Connection is successful :)');
});

connection.on('error', (error) => {
	console.log('MongoDB connection failed', error);
});

module.exports = connection;
