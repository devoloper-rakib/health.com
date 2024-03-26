import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { showLoading, hideLoading } from '../redux/alertsSlice';
import Layout from '../components/Layout';
const ApplyDoctor = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const onFinish = async (values) => {
		console.log('Apply Doctor', values);

		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/user/apply-doctor-account',
				{
					...values,
					userId: user._id,
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
				navigate('/');
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error('Something went wrong');
		}
	};
	return (
		<Layout>
			<h1 className='page-title'>Apply Doctor</h1>
			<hr />
			<Form layout='vertical' onFinish={onFinish} autoComplete='true'>
				<h1 className='card-title mt-3'>Personal Information</h1>
				<Row gutter={20}>
					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='First Name'
							name='firstName'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter First Your Name' type='text' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Last Name'
							name='lastName'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your Last Name' type='text' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Phone'
							name='phoneNumber'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your Phone Number' type='text' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Website'
							name='website'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your Website Url' type='text' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Address'
							name='address'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your address' type='text' />
						</Form.Item>
					</Col>
				</Row>
				<hr />

				<h1 className='card-title mt-3'>Professional Information</h1>
				<Row gutter={20}>
					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Specialize In '
							name='specialization'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your Specialize Sector' type='text' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Experience'
							name='experience'
							rules={[{ required: true }]}
						>
							<Input placeholder='Experience' type='number' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Fee Per Consultation'
							name='feePerConsultation'
							rules={[{ required: true }]}
						>
							<Input placeholder='Enter Your Consultation Fee' type='number' />
						</Form.Item>
					</Col>

					<Col span={8} lg={8} xs={24} sm={24}>
						<Form.Item
							required
							label='Timings'
							name='timings'
							rules={[{ required: true }]}
						>
							<TimePicker.RangePicker />
						</Form.Item>
					</Col>
				</Row>

				<div className='d-flex justify-content-end'>
					<Button htmlType='submit' className='primary-button '>
						Submit
					</Button>
				</div>
			</Form>
		</Layout>
	);
};

export default ApplyDoctor;
