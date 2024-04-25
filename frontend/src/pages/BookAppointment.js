import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

import { showLoading, hideLoading } from '../redux/alertsSlice';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import moment from 'moment';

const BookAppointment = () => {
	const { user } = useSelector((state) => state.user);

	const [doctor, setDoctor] = useState(null);
	const [isAvailable, setIsAvailable] = useState(false);
	const [date, setDate] = useState();
	const [time, setTime] = useState(moment().startOf('day'));

	const params = useParams();
	const dispatch = useDispatch();
	const getDoctorData = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/doctor/get-doctor-info-by-id',
				{
					doctorId: params?.doctorId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);

			dispatch(hideLoading());
			if (response.data.success) {
				setDoctor(response.data.data);
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
			toast.error('Error getting doctor data');
		}
	};

	console.log('time', moment(time).format('HH:mm'));
	const checkAvailability = () => {
		try {
			dispatch(showLoading());
			const response = axios.post(
				'/api/user/check-availability',
				{
					doctorId: params?.doctorId,
					date,
					time,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);

			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				// setIsAvailable(response.data.available);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
			toast.error('Error getting doctor data');
		}
	};

	const bookNow = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/user/book-appointment',
				{
					doctorId: params?.doctorId,
					userId: user._id,
					doctorInfo: doctor,
					userInfo: user,
					time: moment(time).format('HH:mm'),
					date: date,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);

			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
			toast.error('Error getting doctor data');
		}
	};

	useEffect(() => {
		getDoctorData();
	}, []);

	console.log('time', moment(time).format('HH:mm'));

	return (
		<Layout>
			{doctor && (
				<div>
					<h1 className='page-title'>
						{doctor?.firstName} {doctor?.lastName}
					</h1>

					<hr />

					<Row>
						<Col span={8} sm={24} xs={24} lg={8}>
							<h1 className='normal-text'>
								<b>Timings :</b> {doctor?.timings[0]} - {doctor?.timings[1]}
							</h1>

							<div className='d-flex flex-column pt-2'>
								<DatePicker
									format='DD-MM-YYYY'
									onChange={(value) =>
										setDate(moment(value).format('DD-MM-YYYY'))
									}
								/>
								<TimePicker
									format='HH:mm'
									className='mt-3'
									defaultValue={time}
									onChange={(value) => setTime(value)}
								/>

								<Button
									onClick={checkAvailability}
									className='primary-button mt-3 full-width-button'
								>
									Check Availability
								</Button>

								<Button
									className='primary-button mt-3 full-width-button'
									onClick={bookNow}
								>
									Book Now
								</Button>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Layout>
	);
};

export default BookAppointment;
