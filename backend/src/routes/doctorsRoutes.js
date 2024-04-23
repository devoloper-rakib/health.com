const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const DoctorModel = require('../models/doctorModel');

// Point:  Get Doctor info by user id
router.post('/get-doctor-info-by-user-id', authMiddleware, async (req, res) => {
	try {
		console.log('userId', req.body.userId);
		const doctor = await DoctorModel.findOne({ userId: req.body.userId });

		res.status(200).send({
			message: 'Doctor info fetched successfully',
			success: true,
			data: doctor,
		});
	} catch (error) {
		console.log('Error getting doctor info by user id', error);
		res.status(500).send({
			message: 'Error getting doctor info by user id',
			success: false,
		});
	}
});

// Point : Get Doctor Information by id
router.post('/get-doctor-info-by-id', authMiddleware, async (req, res) => {
	try {
		const doctor = await DoctorModel.findOne({ _id: req.body.doctorId });

		res.status(200).send({
			message: 'Doctor info fetched successfully',
			success: true,
			data: doctor,
		});
	} catch (error) {
		console.log('Error getting doctor info by user id', error);
		res.status(500).send({
			message: 'Error getting doctor info by user id',
			success: false,
		});
	}
});

// Point: Update Doctor Profile endpoint
router.post('/update-doctor-profile', authMiddleware, async (req, res) => {
	try {
		const doctor = await DoctorModel.findOneAndUpdate(
			{ userId: req.body.userId },
			req.body,
			{ new: true },
		);

		res.status(200).send({
			message: 'Doctor profile updated successfully',
			success: true,
			data: doctor,
		});
	} catch (error) {
		console.log('Error while updating doctor profile', error);
		res.status(500).send({
			message: 'Error while updating doctor profile',
			success: false,
			error,
		});
	}
});

module.exports = router;
