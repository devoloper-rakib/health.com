const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const DoctorModel = require('../models/doctorModel');

// Point : Get All Doctors;
router.get('/get-all-doctors', authMiddleware, async (req, res) => {
	try {
		const doctors = await DoctorModel.find({});

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

router.get('/get-all-users', authMiddleware, async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).send({
			message: 'Users fetched successfully',
			success: true,
			data: users,
		});
	} catch (error) {
		console.log('Error getting all users', error);
		res.status(500).send({
			message: 'Error getting all users',
			success: false,
			error,
		});
	}
});

// Point: Change doctor status (pending => approved || approved => blocked)
router.post(
	'/change-doctor-account-status',
	authMiddleware,
	async (req, res) => {
		try {
			const { doctorId, status } = req.body;

			const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status });

			const user = await User.findOne({ _id: doctor.userId });

			const unseenNotifications = user.unseenNotifications;
			unseenNotifications.push({
				type: 'doctor-approval-request',
				message: `Your doctor account has been ${status}`,

				onClickPath: '/notifications',
			});

			user.isDoctor = status === 'approved' ? true : false;

			await user.save();

			res.status(200).send({
				message: 'Doctor status updated successfully',
				success: true,
				data: doctor,
			});
		} catch (error) {
			console.log('Error getting all users', error);
			res.status(500).send({
				message: 'Error getting all users',
				success: false,
				error,
			});
		}
	},
);

module.exports = router;
