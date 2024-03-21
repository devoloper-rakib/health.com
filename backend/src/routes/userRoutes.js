const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res
				.status(200)
				.send({ message: 'User not found', success: false });
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res
				.status(200)
				.send({ message: 'Incorrect password', success: false });
		} else {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '1d',
			});
			return res
				.status(200)
				.send({ message: 'Login successful', success: true, token });
		}
	} catch (error) {
		console.log('Error logging in', error);
		res.status(500).send({ message: 'Error logging in', success: false });
	}
});

module.exports = router;
