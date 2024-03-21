const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/userModel');

router.post('/register', async (req, res) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res
				.status(200)
				.send({ message: 'User already exists', success: false });
		}

		const password = req.body.password;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		req.body.password = hashedPassword;
		const newUser = new User(req.body);
		const user = await newUser.save();
		res
			.status(200)
			.send({ message: 'User created successfully', success: true });
	} catch (error) {
		console.log('Error creating user', error);
		res.status(500).send({ message: 'Error creating user', success: false });
	}
});

router.post('/login', async (req, res) => {
	try {
	} catch (error) {}
});

module.exports = router;
