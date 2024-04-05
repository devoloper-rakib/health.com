import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

import DoctorForm from '../../components/DoctorForm';
import Layout from '../../components/Layout';
import { showLoading, hideLoading } from '../../redux/alertsSlice';

const Profile = () => {
	const dispatch = useDispatch();

	const [doctor, setDoctor] = useState(null);

	const navigate = useNavigate();
	const params = useParams();
	const { user } = useSelector((state) => state.user);

	const onFinish = async (values) => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/doctor/update-doctor-profile',
				{
					...values,
					userId: user?._id,
					timings: [
						moment(values?.timings[0]).format('HH:mm'),
						moment(values?.timings[1]).format('HH:mm'),
					],
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
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error('Something went wrong');
		}
	};
	console.log('userId', params.userId);
	const getDoctorData = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/doctor/get-doctor-info-by-user-id',
				{
					userId: params?.userId,
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

	useEffect(() => {
		getDoctorData();
	}, []);

	return (
		<Layout>
			<h1 className='page-title'>Doctor Profile</h1>
			<hr />
			{doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
		</Layout>
	);
};

export default Profile;
