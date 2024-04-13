const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const DoctorModel = require('../models/doctorModel');

// Point: Register end point
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

// Point: Login End point
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

// Point : protected routes
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.userId });
		user.password = undefined;
		if (!user)
			return res
				.status(200)
				.send({ message: 'User does not exist', success: false });

		res.status(200).send({
			success: true,
			data: user,
		});
	} catch (error) {
		console.log('Error getting user info', error);
		res
			.status(500)
			.send({ message: 'Error getting user info', success: false });
	}
});

// Point : Apply Doctor
router.post('/apply-doctor-account', authMiddleware, async (req, res) => {
	try {
		const newDoctor = new DoctorModel({ ...req.body, status: 'pending' });
		await newDoctor.save();
		const adminUser = await User.findOne({ isAdmin: true }); // will only have one admin

		const unseenNotifications = adminUser.unseenNotifications;
		unseenNotifications.push({
			type: 'new-doctor-request',
			message: `A new doctor account has been requested for ${newDoctor.firstName} ${newDoctor.lastName}`,
			data: {
				doctorId: newDoctor._id,
				name: newDoctor.firstName + ' ' + newDoctor.lastName,
			},
			onClickPath: '/admin/doctorslist',
		});
		await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

		res.status(200).send({
			success: true,
			message: 'Doctor account applied request sent successfully',
		});
	} catch (error) {
		console.log('Error applying doctor account', error);
		res
			.status(500)
			.send({ message: 'Error applying doctor account', success: false });
	}
});

// Point :User Notification all seen endpoint:
router.post(
	'/mark-all-notifications-as-seen',
	authMiddleware,
	async (req, res) => {
		const user = await User.findOne({ _id: req.body.userId });
		const unseenNotifications = user.unseenNotifications;
		const seenNotifications = user.seenNotifications;
		seenNotifications.push(...unseenNotifications);
		user.unseenNotifications = [];
		user.seenNotifications = seenNotifications;
		const updateUser = await User.findByIdAndUpdate(user._id, user);

		updateUser.password = undefined;

		res.status(200).send({
			success: true,
			message: 'All notifications marked as seen',
			data: updateUser,
		});
		try {
		} catch (error) {
			console.log('Error while marking all notifications as seen', error);
			res.status(500).send({
				message: 'Error while marking all notifications as seen',
				success: false,
			});
		}
	},
);

// Point: Delete all Notifications end point;
router.post('/delete-all-notifications', authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.userId });
		user.seenNotifications = [];
		user.unseenNotifications = [];

		const updatedUser = await User.findByIdAndUpdate(user._id, user);
		updatedUser.password = undefined;

		res.status(200).send({
			success: true,
			message: 'All notifications deleted successfully',
			data: updatedUser,
		});
	} catch (error) {
		console.log('Error while deleting all notifications', error);
		res.status(500).send({
			message: 'Error while deleting all notifications',
			success: false,
		});
	}
});

// Point: get all doctors Approved list.
router.get('/get-all-approved-doctors', authMiddleware, async (req, res) => {
	try {
		const doctors = await DoctorModel.find({ status: 'approved' });

		res.status(200).send({
			message: 'Doctors fetched successfully',
			success: true,
			data: doctors,
		});
	} catch (error) {
		console.log('Error getting all doctors', error);
		res
			.status(500)
			.send({ message: 'Error getting all doctors', success: false });
	}
});

module.exports = router;
