const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		doctorId: {
			type: String,
			required: true,
		},
		doctorInfo: {
			type: Object,
			required: true,
		},
		userId: {
			type: Object,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'pending',
		},
	},
	{
		timestamps: true,
	},
);

const AppointmentModel = mongoose.model('appointments', AppointmentSchema);

module.exports = AppointmentModel;
